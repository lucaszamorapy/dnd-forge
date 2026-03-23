// Import the framework and instantiate it
import Fastify from 'fastify'
import "dotenv/config";
import fastifyCors from '@fastify/cors';
import fastifySwagger from '@fastify/swagger';
import fastifyApiReference from '@scalar/fastify-api-reference';
import { jsonSchemaTransform, serializerCompiler, validatorCompiler, ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

const app = Fastify({
  logger: true
})

app.setValidatorCompiler(validatorCompiler) //Valida entrada usando Zod
app.setSerializerCompiler(serializerCompiler) //Valida saída usando Zod

//plugin do swagger para gerar a documentação da api, usando o jsonSchemaTransform para transformar os schemas do zod em json schema
await app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'D&D Forge API',
      description: 'API para o projeto D&D Forge',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:8082',
        description: 'Servidor local',
      }
    ],
  },
  transform: jsonSchemaTransform,
});

await app.register(fastifyApiReference, {
  routePrefix: "/docs",
  configuration: {
    sources: [
      {
        title: "D&D Forge API",
        slug: "glowesfit-api",
        url: "/swagger.json",
      },
    ],
  },
});

await app.register(fastifyCors, {
  origin: process.env.WEB_URL || "http://localhost:3000",
  credentials: true,
});


app.withTypeProvider<ZodTypeProvider>().route({
  method: "GET",
  url: "/swagger.json",
  schema: {
    hide: true,
  },
  handler: async () => {
    return app.swagger();
  },
});

app.withTypeProvider<ZodTypeProvider>().route({
  method: 'GET',
  url: "/",
  schema: {
    description: "Hello world",
    tags: ["Hello world"],
    response: {
      200: z.object({
        message: z.string(),
      })
    }
  },
  handler: () => {
    return { message: "Hello world" }
  }
});

// Run the server!
try {
  await app.listen({ port: Number(process.env.PORT) })
} catch (err) {
  app.log.error(err)
  process.exit(1)
}