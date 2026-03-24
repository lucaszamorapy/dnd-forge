import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../generated/prisma/client.js"

const adapter = new PrismaMariaDb({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Betoven2606",
  database: "dnd_forge",
  connectionLimit: 5,
});
export const prisma = new PrismaClient({ adapter });