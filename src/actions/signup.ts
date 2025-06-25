"use server";

import { auth } from "@/lib/auth";

export const signUpAction = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
      },
    });

    return {
      success: true,
      message: "Signed up successfully, verification link send on mail",
    };
  } catch (error) {
    const e = error as Error;
    console.log(e);

    return {
      success: false,
      message: e.message || "An unknown error occurred.",
    };
  }
};
