"use client";

import { useRef, useState, type MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M4 6.5L12 12.5L20 6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4.5" y="10.5" width="15" height="9.5" rx="2.2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M7.5 10.5V7.5a4.5 4.5 0 0 1 9 0v3" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function EyeIcon({ open }: { open: boolean }) {
  return open ? (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M2 12C3.9 7.6 7.6 5 12 5s8.1 2.6 10 7c-1.9 4.4-5.6 7-10 7S3.9 16.4 2 12Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  ) : (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3.5 3.5l17 17M9.9 9.9a3 3 0 0 0 4.2 4.2M6.2 6.6C4.3 8 3 10 2 12c1.9 4.4 5.6 7 10 7 1.7 0 3.2-.36 4.6-1.02M14.6 5.4A10.6 10.6 0 0 1 22 12c-.6 1.4-1.4 2.63-2.4 3.66"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M23.52 12.27c0-.85-.07-1.47-.22-2.12H12v3.85h6.6c-.13 1.06-.85 2.66-2.45 3.73l-.02.15 3.56 2.76.25.02c2.26-2.09 3.58-5.17 3.58-8.39" />
      <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.95-2.92l-3.79-2.93c-1.01.7-2.38 1.2-4.16 1.2-3.18 0-5.88-2.1-6.84-5l-.14.01-3.7 2.86-.05.14C3.36 21.3 7.36 24 12 24" />
      <path fill="#FBBC05" d="M5.16 14.35a7.4 7.4 0 0 1-.4-2.35c0-.82.15-1.6.39-2.35l-.01-.16-3.75-2.9-.12.06A11.96 11.96 0 0 0 0 12c0 1.93.47 3.76 1.27 5.35l3.89-3" />
      <path fill="#EA4335" d="M12 4.75c2.25 0 3.77.97 4.63 1.78l3.38-3.3C17.95 1.2 15.24 0 12 0 7.36 0 3.36 2.7 1.27 6.65l3.88 3c.97-2.9 3.67-4.9 6.85-4.9" />
    </svg>
  );
}

function ShopBagIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 8.5h12l-1 12a2 2 0 0 1-2 1.8H9a2 2 0 0 1-2-1.8l-1-12Z"
        stroke="#8FBF6B"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M9 8.5V6a3 3 0 0 1 6 0v2.5" stroke="#8FBF6B" strokeWidth="1.4" />
    </svg>
  );
}

function SparkIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M12 2.5L14.2 9.6L21.5 12L14.2 14.4L12 21.5L9.8 14.4L2.5 12L9.8 9.6L12 2.5Z"
        stroke="url(#loginMark)"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient id="loginMark" x1="2.5" y1="2.5" x2="21.5" y2="21.5">
          <stop offset="0%" stopColor="#E8C766" />
          <stop offset="100%" stopColor="#B8860B" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function FeatureRow({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex items-start gap-3.5">
      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#C9A227]/20 bg-[#101114]">
        {icon}
      </div>
      <div>
        <p className="text-[13.5px] font-medium text-[#F3F1EA]">{title}</p>
        <p className="mt-0.5 text-[12.5px] leading-relaxed text-[#8B857C]">{desc}</p>
      </div>
    </div>
  );
}

function AuthCard() {
  const router = useRouter();
  const supabase = createClient();
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [oauthLoading, setOauthLoading] = useState<"google" | "shopify" | null>(null);

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: px, y: py });
  };

  const handleLeave = () => {
    setHover(false);
    setTilt({ x: 0, y: 0 });
  };

  async function handleSubmit() {
    setError(null);
    setMessage(null);

    if (!email || !password) {
      setError("Enter your email and password to continue.");
      return;
    }

    setIsSubmitting(true);

    if (mode === "signin") {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setIsSubmitting(false);
        setError(signInError.message);
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } else {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      });

      setIsSubmitting(false);

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      setMessage("Account created. Check your email to confirm, then sign in.");
      setMode("signin");
    }
  }

  function handlePasswordKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleSubmit();
    }
  }

  async function handleGoogleLogin() {
    setError(null);
    setOauthLoading("google");
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (oauthError) {
      setError(oauthError.message);
      setOauthLoading(null);
    }
  }

  function handleShopifyLogin() {
    setError(null);
    const shop = window.prompt("Enter your Shopify store domain (e.g. your-store.myshopify.com):");
    if (!shop) return;
    setOauthLoading("shopify");
    window.location.href = `/api/shopify/install?shop=${encodeURIComponent(shop.trim())}`;
  }

  return (
    <div style={{ perspective: 1400 }}>
      <div
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={handleLeave}
        style={{
          transform: `rotateX(${-tilt.y * 3}deg) rotateY(${tilt.x * 3}deg) translateY(${
            hover ? -6 : 0
          }px) scale(${hover ? 1.006 : 1})`,
          transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
          transformStyle: "preserve-3d",
        }}
        className="relative w-full max-w-[420px] overflow-hidden rounded-[22px] border border-[#C9A227]/20 bg-gradient-to-b from-[#15161A] to-[#0F1013] p-1.5 shadow-[0_60px_140px_-50px_rgba(0,0,0,0.95),0_0_0_1px_rgba(201,162,39,0.05)]"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[22px] opacity-0 transition-opacity duration-500"
          style={{
            opacity: hover ? 1 : 0,
            background: `radial-gradient(260px circle at ${(tilt.x + 0.5) * 100}% ${
              (tilt.y + 0.5) * 100
            }%, rgba(232,199,102,0.08), transparent 70%)`,
          }}
        />

        <div className="relative rounded-[17px] border border-[#F3F1EA]/[0.05] bg-[#0F1013] px-7 py-8 sm:px-9 sm:py-9">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#C9A227]/25 bg-[#101114]">
              <SparkIcon />
            </div>
            <h1 className="mt-4 font-serif text-[22px] text-[#F3F1EA]">
              {mode === "signin" ? "Welcome back" : "Create your account"}
            </h1>
            <p className="mt-1.5 text-[13px] text-[#8B857C]">
              {mode === "signin"
                ? "Sign in to your ShopPilot AI account"
                : "Start your free ShopPilot AI trial"}
            </p>
          </div>

          <div className="mt-7 flex items-center gap-6 border-b border-[#F3F1EA]/[0.08]">
            {(["signin", "signup"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => {
                  setMode(m);
                  setError(null);
                  setMessage(null);
                }}
                className={`relative pb-3 text-[13px] font-medium capitalize transition-colors duration-300 ${
                  mode === m ? "text-[#F3F1EA]" : "text-[#6E6A63] hover:text-[#9C968C]"
                }`}
              >
                {m === "signin" ? "Sign in" : "Sign up"}
                {mode === m && (
                  <span className="absolute inset-x-0 -bottom-px h-[1.5px] bg-gradient-to-r from-[#C9A227] to-[#E8C766]" />
                )}
              </button>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-3.5">
            <label className="group flex items-center gap-3 rounded-xl border border-[#F3F1EA]/[0.09] bg-[#101114] px-4 py-3.5 transition-colors duration-300 focus-within:border-[#C9A227]/40">
              <span className="text-[#6E6A63] transition-colors duration-300 group-focus-within:text-[#C9A227]">
                <MailIcon />
              </span>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                className="w-full bg-transparent text-[13.5px] text-[#F3F1EA] placeholder:text-[#6E6A63] focus:outline-none disabled:opacity-60"
              />
            </label>

            <label className="group flex items-center gap-3 rounded-xl border border-[#F3F1EA]/[0.09] bg-[#101114] px-4 py-3.5 transition-colors duration-300 focus-within:border-[#C9A227]/40">
              <span className="text-[#6E6A63] transition-colors duration-300 group-focus-within:text-[#C9A227]">
                <LockIcon />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handlePasswordKeyDown}
                disabled={isSubmitting}
                className="w-full bg-transparent text-[13.5px] text-[#F3F1EA] placeholder:text-[#6E6A63] focus:outline-none disabled:opacity-60"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="shrink-0 text-[#6E6A63] transition-colors duration-300 hover:text-[#9C968C]"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <EyeIcon open={showPassword} />
              </button>
            </label>

            {mode === "signin" && (
              <div className="mt-1 flex items-center justify-end text-[12px]">
                <a href="#" className="text-[#C9A227] transition-colors hover:text-[#E8C766]">
                  Forgot password?
                </a>
              </div>
            )}

            {error && <p className="text-[12px] text-[#E5786E]">{error}</p>}
            {message && <p className="text-[12px] text-[#8FBF6B]">{message}</p>}

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="group relative mt-1 inline-flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-[#E8C766] via-[#C9A227] to-[#B8860B] py-3.5 text-[13.5px] font-medium text-black transition-transform duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting
                ? mode === "signin"
                  ? "Signing in..."
                  : "Creating account..."
                : mode === "signin"
                ? "Sign in"
                : "Create account"}
            </button>
          </div>

          <div className="my-6 flex items-center gap-3">
            <span className="h-px flex-1 bg-[#F3F1EA]/[0.08]" />
            <span className="text-[11px] uppercase tracking-wider text-[#6E6A63]">
              or continue with
            </span>
            <span className="h-px flex-1 bg-[#F3F1EA]/[0.08]" />
          </div>

          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={oauthLoading !== null}
              className="flex items-center justify-center gap-2.5 rounded-xl border border-[#F3F1EA]/[0.1] bg-[#101114] py-3 text-[13px] text-[#F3F1EA] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#F3F1EA]/20 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <GoogleIcon />
              {oauthLoading === "google" ? "Redirecting..." : "Continue with Google"}
            </button>
            <button
              type="button"
              onClick={handleShopifyLogin}
              disabled={oauthLoading !== null}
              className="flex items-center justify-center gap-2.5 rounded-xl border border-[#F3F1EA]/[0.1] bg-[#101114] py-3 text-[13px] text-[#F3F1EA] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#F3F1EA]/20 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <ShopBagIcon />
              {oauthLoading === "shopify" ? "Redirecting..." : "Continue with Shopify"}
            </button>
          </div>

          <p className="mt-6 text-center text-[11px] text-[#6E6A63]">
            Secure · Private · Your data is safe
          </p>
        </div>
      </div>
    </div>
  );
}

function OverviewCard() {
  return (
    <div className="hero-glass relative w-[230px] rounded-[16px] border border-[#C9A227]/20 bg-[#101114]/80 p-4 shadow-[0_40px_100px_-40px_rgba(0,0,0,0.9)]">
      <div className="flex items-center justify-between">
        <p className="text-[10px] uppercase tracking-wider text-[#6E6A63]">Today&apos;s overview</p>
        <span className="flex items-center gap-1 text-[10px] text-[#8FBF6B]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#8FBF6B]" />
          Live
        </span>
      </div>
      <p className="mt-3 text-[10.5px] text-[#6E6A63]">Revenue</p>
      <div className="mt-0.5 flex items-baseline gap-2">
        <span className="font-serif text-[21px] text-[#F3F1EA]">$24,560</span>
        <span className="text-[11px] text-[#8FBF6B]">↑ 18.4%</span>
      </div>
      <svg className="mt-3 h-9 w-full" viewBox="0 0 200 40" fill="none" preserveAspectRatio="none">
        <path
          d="M0 30 C 25 24, 45 32, 65 22 S 105 8, 140 14 S 180 4, 200 8"
          stroke="#E8C766"
          strokeWidth="1.4"
        />
      </svg>
      <div className="mt-3 grid grid-cols-2 gap-3 border-t border-[#F3F1EA]/[0.06] pt-3">
        <div>
          <p className="text-[13px] text-[#F3F1EA]">312</p>
          <p className="text-[10px] text-[#8FBF6B]">↑ 12%</p>
        </div>
        <div>
          <p className="text-[13px] text-[#F3F1EA]">3.48%</p>
          <p className="text-[10px] text-[#8FBF6B]">↑ 6%</p>
        </div>
      </div>
    </div>
  );
}

function InsightCard() {
  return (
    <div className="hero-glass relative w-[230px] rounded-[16px] border border-[#F3F1EA]/[0.08] bg-[#0F1013]/70 p-4 shadow-[0_40px_100px_-40px_rgba(0,0,0,0.9)]">
      <div className="flex items-center gap-2">
        <div className="flex h-6 w-6 items-center justify-center rounded-full border border-[#C9A227]/25 bg-[#101114]">
          <SparkIcon className="h-3 w-3" />
        </div>
        <p className="text-[10px] uppercase tracking-wider text-[#6E6A63]">AI insight</p>
      </div>
      <p className="mt-2.5 text-[12px] leading-relaxed text-[#F3F1EA]">
        Your best-selling product &ldquo;Aria Tote&rdquo; will sell out in 3 days at the current pace.
      </p>
      <p className="mt-2 text-[11px] text-[#C9A227]">View insight →</p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0B0C0E]">
      <style>{`
        .hero-glass { backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); }
        @keyframes loginFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .login-float-a { animation: loginFloat 6.5s ease-in-out infinite; }
        .login-float-b { animation: loginFloat 7.5s ease-in-out 1.2s infinite; }
      `}</style>

      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 -top-32 h-[520px] w-[520px] rounded-full opacity-[0.08] blur-[130px]"
        style={{ background: "radial-gradient(circle, #C9A227 0%, transparent 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-10%] right-[-10%] h-[420px] w-[420px] rounded-full opacity-[0.06] blur-[120px]"
        style={{ background: "radial-gradient(circle, #E8C766 0%, transparent 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(243,241,234,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(243,241,234,0.5) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 30% 40%, black 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 30% 40%, black 30%, transparent 100%)",
        }}
      />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-8 lg:flex-row lg:items-center lg:gap-16 lg:px-12">
        <div className="flex w-full flex-col lg:w-1/2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#E8C766] to-[#B8860B]">
                <span className="font-serif text-[14px] font-semibold text-black">S</span>
              </div>
              <span className="text-[15px] font-medium text-[#F3F1EA]">
                ShopPilot <span className="text-[#C9A227]">AI</span>
              </span>
            </div>
            <button className="flex items-center gap-1.5 rounded-full border border-[#F3F1EA]/[0.1] px-3.5 py-1.5 text-[12px] text-[#9C968C] transition-colors hover:border-[#F3F1EA]/20">
              English
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className="mt-14 lg:mt-20">
            <h2 className="max-w-md font-serif text-[36px] leading-[1.12] text-[#F3F1EA] sm:text-[42px]">
              AI for Smarter Stores.
              <br />
              <span className="text-[#C9A227]">Real Results.</span>
            </h2>
            <p className="mt-4 max-w-sm text-[14px] leading-relaxed text-[#8B857C]">
              Your all-in-one AI copilot for Shopify growth, insights, and automation.
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-6">
            <FeatureRow
              icon={<SparkIcon className="h-4 w-4" />}
              title="Real-time Insights"
              desc="Instant analytics that matter"
            />
            <FeatureRow
              icon={<SparkIcon className="h-4 w-4" />}
              title="AI Recommendations"
              desc="Actionable insights for more sales"
            />
            <FeatureRow
              icon={<SparkIcon className="h-4 w-4" />}
              title="All Your Data, One Place"
              desc="Shopify, ads, analytics and more"
            />
          </div>

          <div className="mt-12 flex items-center gap-3">
            <div className="flex -space-x-2.5">
              {["A", "R", "M", "K"].map((letter) => (
                <div
                  key={letter}
                  className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#0B0C0E] bg-[#15161A] text-[11px] text-[#9C968C]"
                >
                  {letter}
                </div>
              ))}
            </div>
            <span className="rounded-full border border-[#C9A227]/25 bg-[#101114] px-2.5 py-1 text-[11px] text-[#C9A227]">
              +2.4K stores
            </span>
            <span className="text-[12px] text-[#6E6A63]">Trusted by modern merchants worldwide</span>
          </div>

          <div className="mt-16 hidden text-[11px] text-[#6E6A63] lg:flex lg:items-center lg:gap-6">
            <span>© 2026 ShopPilot AI. All rights reserved.</span>
            <a href="#" className="transition-colors hover:text-[#9C968C]">Privacy</a>
            <a href="#" className="transition-colors hover:text-[#9C968C]">Terms</a>
            <a href="#" className="transition-colors hover:text-[#9C968C]">Status</a>
          </div>
        </div>

        <div className="relative mt-16 flex w-full items-center justify-center lg:mt-0 lg:w-1/2">
          <div className="relative flex w-full max-w-[420px] items-center justify-center">
            <div className="pointer-events-none absolute -left-16 top-4 hidden 2xl:block">
              <div className="login-float-a">
                <OverviewCard />
              </div>
            </div>
            <div className="pointer-events-none absolute -right-12 bottom-6 hidden 2xl:block">
              <div className="login-float-b">
                <InsightCard />
              </div>
            </div>

            <AuthCard />
          </div>
        </div>

        <div className="mt-10 flex items-center gap-6 text-[11px] text-[#6E6A63] lg:hidden">
          <span>© 2026 ShopPilot AI.</span>
          <a href="#" className="transition-colors hover:text-[#9C968C]">Privacy</a>
          <a href="#" className="transition-colors hover:text-[#9C968C]">Terms</a>
          <a href="#" className="transition-colors hover:text-[#9C968C]">Status</a>
        </div>
      </div>
    </div>
  );
}