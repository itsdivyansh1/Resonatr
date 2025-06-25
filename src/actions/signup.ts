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
        name,
        email,
        password,
      },
    });

    return {
      success: true,
      message: "Registered successfully",
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: { error: e.message || "An unknown error occurred" },
    };
  }
};
