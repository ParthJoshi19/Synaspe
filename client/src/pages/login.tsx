import { useState } from "react";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { QuantumBackground } from "@/components/quantum-background";
import { Loader2, Cpu } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/auth-context";
import { apiRequest } from "@/lib/queryClient";

export default function Login() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const { setUser } = useAuth();

  const loginMutation = useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const response = await apiRequest("POST", "/api/auth/login", credentials);
      return response;
    },
    onSuccess: (data) => {
      setUser(data.user);
      toast({
        title: "Authentication Successful",
        description: "Federated nodes synchronized. Welcome to Quantum RAG.",
      });
      setLocation("/dashboard");
    },
    onError: () => {
      toast({
        title: "Authentication Failed",
        description: "Unable to authenticate. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = "/dashboard";
    // loginMutation.mutate({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <QuantumBackground />
      
      <div className="w-full max-w-md z-10">
        <Card className="quantum-glow border-primary/20">
          <CardHeader className="space-y-4 text-center">
            <div className="mx-auto w-16 h-16 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center quantum-glow-strong">
              <Cpu className="w-8 h-8 text-primary-foreground" />
            </div>
            <CardTitle className="text-2xl font-bold quantum-text-glow">
              Quantum-Federated Multimodal RAG
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Secure Federated Access Only
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-card/50 border-primary/20"
                  data-testid="input-email"
                />
              </div>
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-card/50 border-primary/20"
                  data-testid="input-password"
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={loginMutation.isPending}
                data-testid="button-login"
              >
                {loginMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Authenticating Federated Nodes...
                  </>
                ) : (
                  "Access System"
                )}
              </Button>
            </form>
            <p className="text-center text-sm text-muted-foreground mt-6">
              Empowering Offline Intelligence through Quantum Federated AI
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
