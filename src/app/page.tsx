import { getServerSession } from "next-auth";
import AuthForm from "@/components/AuthForm";
import LoginForm from "../components/LoginForm";

export default async function Home() {
  const session = await getServerSession();
  console.log("session", session);

  return (
    <>
      <AuthForm
        title="Login to your account"
        description="Enter your email to login to quick release"
        isLoginForm={true}
      >
        <LoginForm />
      </AuthForm>
    </>
  );
}
