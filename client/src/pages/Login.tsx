import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, User, Eye, EyeOff, Activity } from "lucide-react";

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    setTimeout(() => {
      if (username === "aayushabhatta" && password === "1234") {
        localStorage.setItem("medpredict_auth", "true");
        onLogin();
      } else {
        setError("Invalid username or password. Please try again.");
      }
      setIsLoading(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#1f2121] flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md relative"
      >
        <div className="glass-card rounded-2xl p-8 md:p-10 border border-white/10">
          {/* Logo */}
          <div className="flex flex-col items-center mb-10">
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/15 border border-primary/30 mb-4">
              <Activity className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-display font-bold text-white">MedPredict</h1>
            <p className="text-muted-foreground text-sm mt-1">AI Disease Prediction Platform</p>
          </div>

          <h2 className="text-lg font-semibold text-white mb-6">Sign in to continue</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">Username</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  data-testid="input-username"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all"
                  autoComplete="username"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  data-testid="input-password"
                  className="w-full pl-10 pr-12 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  data-testid="button-toggle-password"
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
                data-testid="text-login-error"
              >
                {error}
              </motion.div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading || !username || !password}
              data-testid="button-login"
              className="w-full py-3.5 rounded-xl font-semibold bg-gradient-to-r from-primary to-teal-400 text-white shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : "Sign In"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
