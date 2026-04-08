import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AnimatedBackground } from "@/components/layout/AnimatedBackground";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate successful login
    console.log("Logging in with:", { email, password });
    navigate("/admin/dashboard");
  };

  return (
    <main className="w-full h-screen relative flex items-center justify-center overflow-hidden font-sans">
      {/* Persisting Animated Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <AnimatedBackground />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md px-4"
      >
        <Card className="border-white/20 bg-white/40 backdrop-blur-xl shadow-2xl">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-3xl font-serif font-medium text-slate-900">Admin Login</CardTitle>
            <CardDescription className="text-slate-600">
              Enter your credentials to access the dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-700">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/50 border-slate-200 focus:border-blue-400 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-700">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white/50 border-slate-200 focus:border-blue-400 transition-colors"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="w-full h-14 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] font-semibold text-lg hover:-translate-y-1 transition-all duration-300 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-500/30 text-slate-800 hover:bg-blue-50/50 backdrop-blur-md border border-solid"
              >
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </main>
  );
}
