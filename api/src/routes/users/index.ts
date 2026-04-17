import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { UsersController } from "../../controllers/users/index.js";
import { UserCreateSchemaCreate, UserCreateSchemaResponse } from "../../schemas/users/index.js";
import { ErrorSchema } from "../../schemas/errors/index.js";

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
      return await usersControllers.post(request, reply)
    },
  });
}