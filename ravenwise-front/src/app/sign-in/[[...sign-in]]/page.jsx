// src/app/sign-in/[[...sign-in]]/page.jsx
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0c1524]">
      <div className="w-full max-w-md">
        <SignIn
          appearance={{
            elements: {
              formButtonPrimary: "bg-[#FDC758] text-[#0F1B2A] hover:bg-opacity-90",
              card: "bg-[#182b4a] shadow-xl border border-gray-700",
              headerTitle: "text-white",
              headerSubtitle: "text-gray-300",
              formFieldInput: "bg-[#1D2D40] text-white border border-gray-700",
            },
          }}
        />
      </div>
    </div>
  );
}