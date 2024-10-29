import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sistema Matricula",
  description: "Sistema de matricula para la PUCEM",
};

export default function Home() {
  redirect("/login");
}
