"use server";

import { auth } from "@/lib/auth";

export const signInAction = async (email: string, password: string) => {
  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    return {
      success: true,
      message: "Logged in successfully",
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: { error: e.message || "An unknown error occurred" },
    };
  }
};
