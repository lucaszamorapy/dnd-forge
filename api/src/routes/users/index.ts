import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { UsersController } from "../../controllers/users/index.js";
import { LoginSchema, UserCreateSchemaResponse, UserUpdateSchema, UserUpdateSchemaResponse } from "../../schemas/users/index.js";
import { ErrorSchema } from "../../schemas/errors/index.js";
import { DataDeleteSchemaResponse } from "../../schemas/global/index.js";

export const usersRoutes = async (app: FastifyInstance) => {
  const usersControllers = new UsersController(app)
  app.withTypeProvider<ZodTypeProvider>().route({
    method: "POST",
    url: "/",
    schema: {
      operationId: "createUser",
      tags: ["Usuário"],
      summary: "Criar conta de usuário",
      response: {
        201: UserCreateSchemaResponse,
        400: ErrorSchema,
        401: ErrorSchema,
        404: ErrorSchema,
        500: ErrorSchema,
      },
    },
    handler: async (request, reply) => {
      return await usersControllers.post(request.body as Record<string, any>, reply)
    },
  });

  app.withTypeProvider<ZodTypeProvider>().route({
    method: "POST",
    url: "/auth/login",
    schema: {
      operationId: "loginUser",
      tags: ["Usuário"],
      summary: "Logar usuário no sistema",
      body: LoginSchema,
      response: {
        201: UserCreateSchemaResponse,
        400: ErrorSchema,
        401: ErrorSchema,
        404: ErrorSchema,
        500: ErrorSchema,
      },
    },
    handler: async (request, reply) => {
      return await usersControllers.postLogin(request.body, reply)
    },
  });

  app.withTypeProvider<ZodTypeProvider>().route({
    method: "PUT",
    url: "/:id",
    schema: {
      operationId: "putUser",
      tags: ["Usuário"],
      summary: "Alterar usuário no sistema",
      response: {
        200: UserUpdateSchemaResponse,
        400: ErrorSchema,
        401: ErrorSchema,
        404: ErrorSchema,
        500: ErrorSchema,
      },
    },
    handler: async (request, reply) => {
      const { id } = request.params as { id: string }
      return await usersControllers.put(request.body as Record<string, any>, id, reply)
    },
  });

  app.withTypeProvider<ZodTypeProvider>().route({
    method: "DELETE",
    url: "/:id",
    schema: {
      operationId: "deleteUser",
      tags: ["Usuário"],
      summary: "Alterar usuário no sistema",
      response: {
        200: DataDeleteSchemaResponse,
        400: ErrorSchema,
        401: ErrorSchema,
        404: ErrorSchema,
        500: ErrorSchema,
      },
    },
    handler: async (request, reply) => {
      return await usersControllers.delete(request, reply)
    },
  });
}