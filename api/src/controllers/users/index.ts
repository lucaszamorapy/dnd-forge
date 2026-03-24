import { FastifyInstance } from "fastify";
import { IRegisterUserInputDto } from "../../dto/users/index.js";
import { CustomError } from "../../errors/index.js";
import { UsersService } from "../../services/users.js";
import { FastifyReply } from "fastify"

const usersService = new UsersService();
export class UsersController {
  app: FastifyInstance
  constructor(app: FastifyInstance) {
    this.app = app
  }
  async post(body: IRegisterUserInputDto, reply: FastifyReply) {
    try {
      const res = await usersService.register(body)
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