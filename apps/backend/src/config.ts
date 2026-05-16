import { SSMClient, GetParametersCommand } from "@aws-sdk/client-ssm";

const ssm = new SSMClient({ region: "us-east-1" });

const SSM_PARAMS = [
  "/monorepo/DATABASE_URL",
  "/monorepo/DB_AUTH_TOKEN",
  "/monorepo/GOOGLE_CLIENT_ID",
  "/monorepo/GOOGLE_CLIENT_SECRET",
  "/monorepo/GOOGLE_REDIRECT_URI",
  "/monorepo/JWT_SECRET",
  "/monorepo/SECRET_KEY",
  "/monorepo/API_KEY",
  "/monorepo/FRONTEND_URL",
];

let isLoaded = false;

export const loadConfig = async () => {
  if (isLoaded) return;
  const command = new GetParametersCommand({
    Names: SSM_PARAMS,
    WithDecryption: true,
  });

  let response;
  try {
    response = await ssm.send(command);
  } catch (err) {
    // Jika SSM gagal (mis. tidak ada kredensial di dev), jangan langsung crash.
    // Lanjutkan — kita akan cek apakah env penting sudah tersedia secara lokal.
    console.warn("Could not load SSM parameters (continuing):", err?.message || err);
    response = undefined as any;
  }

  if (response && response.InvalidParameters && response.InvalidParameters.length) {
    console.warn("SSM missing parameters:", response.InvalidParameters);
  }

  response?.Parameters?.forEach((param) => {
    if (!param.Name || !param.Value) return;
    const key = param.Name.split("/").pop()!;
    process.env[key] = param.Value;
  });

  // Validasi memerlukan env vars setelah load
  const required = ["JWT_SECRET", "SECRET_KEY", "DATABASE_URL"];
  const missing = required.filter((k) => !process.env[k]);
  if (missing.length) {
    const msg = `Missing required env vars after load: ${missing.join(", ")}`;
    // Fail-fast only in production; di development cukup warn agar `bun run dev` tetap jalan.
    if (process.env.NODE_ENV === "production") {
      console.error(msg);
      throw new Error(msg);
    } else {
      console.warn(msg);
    }
  }

  isLoaded = true;
};