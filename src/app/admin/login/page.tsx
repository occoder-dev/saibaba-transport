import type { Metadata } from "next";
import Image from "next/image";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
  searchParams,
}: PageProps<"/admin/login">) {
  const params = await searchParams;
  const nextRaw = params?.next;
  const next = typeof nextRaw === "string" ? nextRaw : undefined;

  return (
    <div className="flex min-h-svh items-center justify-center bg-[radial-gradient(circle_at_top,_var(--brand-charcoal)_0%,_#0a0a0a_70%)] px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <Image
            src="/logo-transparent.png"
            alt="Saibaba Transport"
            width={220}
            height={70}
            className="h-14 w-auto bg-white rounded-xl p-1"
            priority
          />
          <div>
            <h1 className="text-lg font-semibold text-white">Admin Panel</h1>
            <p className="text-sm text-white/50">Sign in to manage the website</p>
          </div>
        </div>
        <LoginForm next={next} />
      </div>
    </div>
  );
}
