export interface IRegisterUserInputDto {
  name: string,
  email: string,
  image: string | null,
  password: string
}

export interface IRegisterUserOutputDto {
  accessToken: string,
  refreshToken: string,
  userId: string,
  name: string,
  image: string | null
  message: string
}

export interface IUser {
  userId: string;
  password: string;
  email: string;
  name: string;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
}