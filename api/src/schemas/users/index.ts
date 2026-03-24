import z from "zod"

export const UserCreateSchemaCreate = z.object({
  name: z.string(),
  email: z.email(),
  image: z.string(),
  password: z.string()
})

export const UserCreateSchemaResponse = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  name: z.string(),
  userId: z.string(),
  image: z.string(),
  message: z.string()
})