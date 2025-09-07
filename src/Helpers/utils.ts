const bcrypt = require("bcrypt");
import "dotenv/config";

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

export function refineCaptions(captionXml: string): string {
  if (!captionXml) return "";

  const decodeHtmlEntities = (str: string): string => {
    const entities: { [key: string]: string } = {
      "&quot;": '"',
      "&amp;": "&",
      "&lt;": "<",
      "&gt;": ">",
      "&nbsp;": " ",
      "&apos;": "'",
      "&#39;": "'",
      "&#34;": '"',
      "&#x27;": "'",
      "&#x22;": '"',
    };

    return str.replace(/&(?:[a-z]+|#\d+|#x[\da-f]+);/gi, (match) => {
      return entities[match] || match;
    });
  };

  const plainText = captionXml
    .match(/<p [^>]*>(.*?)<\/p>/g)
    ?.map((p) => p.replace(/<[^>]+>/g, ""))
    .map(decodeHtmlEntities)
    .join("\n");

  if (!plainText) return "";

  const lines = plainText
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line);

  const refined = lines.join(" ");

  return refined
    .replace(/\s*>>\s*/g, " ")
    .replace(/\[\s*__\s*\]/g, "")
    .replace(/\s+/g, " ")
    .replace(/\s([.,!?;:])/g, "$1")
    .replace(/([.,!?;:])([a-zA-Z])/g, "$1 $2")
    .replace(/([a-zA-Z])([.,!?;:])/g, "$1$2")
    .replace(/([.,!?;:])\s+/g, "$1 ")
    .replace(/([.,!?;:])([.,!?;:])+/g, "$1")
    .replace(/\s+$/g, "")
    .replace(/^\s+/g, "")
    .trim();
}
