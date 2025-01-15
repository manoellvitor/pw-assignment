import "dotenv/config";

import * as OTPAuth from "otpauth";

export async function generateOTP(): Promise<string> {
  let totp = new OTPAuth.TOTP({
    algorithm: "SHA1",
    digits: 6,
    period: 30,
    secret: process.env.SECRET_KEY,
  });

  let token = String(totp.generate());
  return token;
}

export async function is2FaEnabled(env?: string): Promise<boolean> {
  return env === "prod" || env === "staging" ? true : false;
}
