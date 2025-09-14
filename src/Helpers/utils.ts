const bcrypt = require("bcrypt");
import "dotenv/config";
const protobuf = require("protobufjs");
const Buffer = require("buffer").Buffer;

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

export function getBase64Protobuf(message) {
  const root = protobuf.Root.fromJSON({
    nested: {
      Message: {
        fields: {
          param1: { id: 1, type: "string" },
          param2: { id: 2, type: "string" },
        },
      },
    },
  });
  const MessageType = root.lookupType("Message");
  const buffer = MessageType.encode(message).finish();
  return Buffer.from(buffer).toString("base64");
}

export function transcriptToPlainText(segments: any[]): string {
  return segments
    .map((s) => {
      const seg = s.transcriptSegmentRenderer;
      if (!seg) return "";

      return seg.snippet?.runs
        ?.map((run: any) => run.text)
        .join("")
        .trim();
    })
    .filter(Boolean)
    .join(" ");
}
