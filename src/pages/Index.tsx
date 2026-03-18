import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Index = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Você saiu da conta.");
    navigate("/auth");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background">
      <h1 className="text-5xl font-bold text-foreground">Hello World 🌍</h1>
      <Button variant="outline" onClick={handleLogout}>
        <LogOut className="mr-2 h-4 w-4" />
        Sair
      </Button>
    </div>
  );
};

export default Index;
