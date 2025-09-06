const bcrypt = require("bcrypt");
import 'dotenv/config'

export default async function hashPassword(password: string) {
  const saltRounds = 10;
  const secret = process.env.SECRET_HASH || "";

  const passwordWithSecret = password + secret;

  try {
    const hash = await bcrypt.hash(passwordWithSecret, saltRounds);
    return hash;
  } catch (err) {
    console.error("Erro ao gerar hash:", err);
    throw err;
  }
}

export async function comparePassword(password: string, hash: string) {
  const secret = process.env.SECRET_HASH || "";
  const passwordWithSecret = password + secret;

  return await bcrypt.compare(passwordWithSecret, hash);
}
