import { FastifyInstance, FastifyRequest } from "fastify";
import { IRegisterUserInputDto } from "../../dto/users/index.js";
import { CustomError } from "../../errors/index.js";
import { FastifyReply } from "fastify"
import { UsersService } from "../../services/users/index.js";
import { UserCreateSchemaCreate } from "../../schemas/users/index.js";
import { MultipartFile } from "@fastify/multipart";

const usersService = new UsersService();
export class UsersController {
  app: FastifyInstance
  constructor(app: FastifyInstance) {
    this.app = app
  }
  async post(req: FastifyRequest, reply: FastifyReply) {
    try {
      const body = req.body as Record<string, any>;

      const fields = {
        name: body.name?.value,
        email: body.email?.value,
        password: body.password?.value,
      };

      const imageFile: MultipartFile | null = body.image ?? null;

      const bodyValidation = UserCreateSchemaCreate.safeParse(fields);
      if (!bodyValidation.success) {
        return reply.status(400).send({
          error: bodyValidation.error.flatten(),
          code: "BAD_REQUEST",
        });
      }

      const res = await usersService.register({
        ...bodyValidation.data,
        image: imageFile,
      });
      return reply.status(201).send(res)
    } catch (error) {

      this.app.log.error(error);
      if (error instanceof CustomError) {
        return reply.status(error.number).send({
          error: error.message,
          code: error.code,
        });
      }
      if (error instanceof Error) {
        return reply.status(500).send({
          error: error.message,
          code: "INTERNAL_SERVER_ERROR",
        });
      }
      return reply.status(500).send({
        error: "Internal server error",
        code: "INTERNAL_SERVER_ERROR",
      });
    }
  }
}