import "dotenv/config"
import { prisma } from "../lib/db.js";
import { CustomError } from "../errors/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IRegisterUserInputDto, IRegisterUserOutputDto, IUser } from "../dto/users/index.js";

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
    const userExist = await prisma.users.findFirst({ where: { email: dto.email } })
    if (userExist) {
      throw new CustomError("Usuário já cadastrado", "BAD_REQUEST")
    }
    const hashedPassword = await bcrypt.hash(
      dto.password,
      10
    );
    const user: IRegisterUserInputDto = {
      ...dto,
      password: hashedPassword
    }
    const createuser = await prisma.users.create({ data: user })
    const accessToken = this.acessToken(createuser)
    const refreshToken = this.refreshToken(createuser)
    return {
      accessToken: accessToken!,
      refreshToken: refreshToken!,
      userId: createuser.userId,
      name: createuser.name,
      image: createuser.image ?? "",
      message: `Bem-vindo(a) ${createuser.name}`
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