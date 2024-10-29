import LoginForm from "@/components/login-user-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Sistema Matricula",
  description: "Sistema de matricula para la PUCEM",
};

export default function LoginPage() {
  return (
    <main className="flex flex-col justify-center items-center min-h-screen w-full">
      <LoginForm />
    </main>
  );
}
