import { Elysia } from "elysia";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const region = process.env.AWS_REGION || "us-east-1";
const bucket = process.env.AWS_S3_BUCKET!;

const s3 = new S3Client({ region });

export const uploadRoutes = new Elysia({ prefix: "/uploads" }).post(
  "/image",
  async ({ body, set }: any) => {
    const { fileName, contentType, base64 } = body;

    if (!fileName || !contentType || !base64) {
      set.status = 400;
      return { error: "fileName, contentType, dan base64 wajib diisi" };
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

    if (!allowedTypes.includes(contentType)) {
      set.status = 400;
      return { error: "Format gambar harus JPG, PNG, atau WEBP" };
    }

    const cleanBase64 = base64.includes(",") ? base64.split(",")[1] : base64;
    const buffer = Buffer.from(cleanBase64, "base64");

    const ext = fileName.split(".").pop() || "jpg";
    const key = `posts/${Date.now()}-${crypto.randomUUID()}.${ext}`;

    await s3.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: buffer,
        ContentType: contentType,
      }),
    );

    const cloudfrontUrl = process.env.CLOUDFRONT_URL;

    if (!cloudfrontUrl) {
      set.status = 500;
      return { error: "CLOUDFRONT_URL belum diatur" };
    }

    const image_url = `${cloudfrontUrl.replace(/\/$/, "")}/${key}`;

    return { image_url };
  },
);