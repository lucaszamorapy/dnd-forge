import "dotenv/config"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IRegisterUserInputDto, IRegisterUserOutputDto, IUser } from "../../dto/users/index.js";
import { CustomError } from "../../errors/index.js";
import { prisma } from "../../lib/db.js";
import { GeralService } from "../global/index.js";
import { MultipartFile } from "@fastify/multipart";

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN as
  | "15m"
  | "1h"
  | "1d"
  | number;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN as
  | "15m"
  | "1h"
  | "1d"
  | number;



export class UsersService {
  async register(dto: IRegisterUserInputDto): Promise<IRegisterUserOutputDto> {
    let imageUrl: string | null = null
    const geralService = new GeralService();
    const userExist = await prisma.users.findFirst({ where: { email: dto.email } })
    if (userExist) {
      throw new CustomError("Usuário já cadastrado", "BAD_REQUEST")
    }
    const hashedPassword = await bcrypt.hash(
      dto.password,
      10
    );
    const createdUser = await prisma.users.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: hashedPassword,
        image: null, // temporário
      },
    });

    if (dto.image) {
      imageUrl = await geralService.uploadFile({
        file: dto.image as MultipartFile,
        id: createdUser.userId,
        pathFolder: `users/${createdUser.userId}/avatar`,
      })

      await prisma.users.update({
        where: { userId: createdUser.userId },
        data: { image: imageUrl },
      });
    }

    const accessToken = this.acessToken(createdUser)
    const refreshToken = this.refreshToken(createdUser)
    return {
      accessToken: accessToken!,
      refreshToken: refreshToken!,
      userId: createdUser.userId,
      name: createdUser.name,
      image: imageUrl,
      message: `Bem-vindo(a) ${createdUser.name}`,
      createdAt: geralService.toBRDate(new Date()),
      updatedAt: geralService.toBRDate(new Date()),
    }
  }
  acessToken(user: IUser) {
    if (!user) return;
    const accessToken = jwt.sign(
      { sub: user.userId, email: user.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );
    return accessToken
  }
  refreshToken(user: IUser) {
    if (!user) return;
    const refreshToken = jwt.sign(
      { sub: user.userId },
      JWT_REFRESH_SECRET,
      { expiresIn: JWT_REFRESH_EXPIRES_IN }
    );
    return refreshToken
  }
  decodeToken(token: string) {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  }
}