
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

interface LoginCTAProps {
  className?: string;
  variant?: "default" | "compact" | "inline";
}

const LoginCTA = ({ className, variant = "default" }: LoginCTAProps) => {
  const navigate = useNavigate();
  
  if (variant === "compact") {
    return (
      <Button 
        onClick={() => navigate("/login")} 
        className={className}
        size="sm"
      >
        <LogIn className="h-4 w-4 mr-1" />
        Sign In
      </Button>
    );
  }
  
  if (variant === "inline") {
    return (
      <Button 
        onClick={() => navigate("/login")} 
        variant="link" 
        className={className}
      >
        Sign in to participate
      </Button>
    );
  }
  
  return (
    <div className={`p-6 bg-gradient-to-r from-primary/5 to-secondary/10 rounded-lg border border-border/50 text-center ${className}`}>
      <h3 className="text-lg font-medium mb-2">Ready to get involved?</h3>
      <p className="text-muted-foreground mb-4">Sign in to report issues, engage with the community, and track resolutions</p>
      <Button onClick={() => navigate("/login")} className="gap-2">
        <LogIn className="h-4 w-4" />
        Sign In to Participate
      </Button>
    </div>
  );
};

export default LoginCTA;
