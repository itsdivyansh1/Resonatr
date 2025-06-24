import { Button } from "@/components/ui/button";
import Link from "next/link";

const LoginPage = () => {
  return (
    <>
      <h1>Login Page</h1>
      <Button asChild variant={"link"}>
        <Link href={"/"}>Go to home</Link>
      </Button>
    </>
  );
};

export default LoginPage;
