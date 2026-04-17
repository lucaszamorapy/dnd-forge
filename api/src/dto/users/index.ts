import { MultipartFile } from "@fastify/multipart";

export interface IRegisterUserInputDto {
  name: string,
  email: string,
  image: MultipartFile | null,
  password: string
}

export interface IRegisterUserOutputDto {
  accessToken: string,
  refreshToken: string,
  userId: string,
  name: string,
  image: string | null,
  message: string,
  createdAt: String,
  updatedAt: String,
}

export interface IUser {
  userId: string,
  password: string,
  email: string,
  name: string,
  image: string | null,
  createdAt: Date,
  updatedAt: Date,
}