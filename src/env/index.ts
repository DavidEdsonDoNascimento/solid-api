import "dotenv/config";
import { z } from "zod";

// validates the environment variables
// z.coerce vai fazer com q variáveis de ambiente mesmo sendo informadas como string sejam convertidas para number
const envSchema = z.object({
  NODE_ENV: z.enum(["dev", "test", "production"]).default("dev"),
  PORT: z.coerce.number().default(3333),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  const msg = "❌ Invalid environment variables";
  console.log(msg, _env.error.format());
  throw new Error(msg);
}

export const env = _env.data;
