import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Login realizado com sucesso!");
        navigate("/");
      } else {
        if (password.length < 6) {
          toast.error("A senha deve ter pelo menos 6 caracteres.");
          setLoading(false);
          return;
        }
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin },
        });
        if (error) throw error;
        toast.success("Cadastro realizado! Verifique seu email para confirmar.");
      }
    } catch (error: any) {
      toast.error(error.message || "Ocorreu um erro.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black">
      {/* Background gradient overlay — Netflix vibe */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.95) 100%), radial-gradient(ellipse at top, hsl(0 72% 30% / 0.4) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-md px-4">
        {/* Logo / Brand */}
        <h1
          className="mb-10 text-center text-5xl font-extrabold tracking-tight"
          style={{ color: "hsl(0, 79%, 50%)" }}
        >
          MYAPP
        </h1>

        {/* Card */}
        <div className="rounded-md bg-black/75 p-10 shadow-2xl backdrop-blur-sm">
          <h2 className="mb-8 text-3xl font-bold text-white">
            {isLogin ? "Entrar" : "Criar conta"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-12 rounded border-0 bg-[hsl(0,0%,20%)] text-white placeholder:text-[hsl(0,0%,50%)] focus-visible:ring-1 focus-visible:ring-white/30"
            />
            <Input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="h-12 rounded border-0 bg-[hsl(0,0%,20%)] text-white placeholder:text-[hsl(0,0%,50%)] focus-visible:ring-1 focus-visible:ring-white/30"
            />
            <Button
              type="submit"
              disabled={loading}
              className="h-12 w-full rounded text-base font-bold text-white"
              style={{ backgroundColor: "hsl(0, 79%, 50%)" }}
            >
              {loading ? "Carregando..." : isLogin ? "Entrar" : "Criar conta"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-[hsl(0,0%,60%)] hover:text-white hover:underline transition-colors"
            >
              {isLogin ? "Novo por aqui? Crie uma conta." : "Já tem conta? Faça login."}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
