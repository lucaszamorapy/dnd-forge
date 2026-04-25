import z from "zod"

export const DataDeleteSchemaResponse = z.object({
  message: z.string(),
});