
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogIn, ChevronRight, CheckSquare, Shield } from "lucide-react";

interface LoginCTAProps {
  className?: string;
  variant?: "default" | "compact" | "inline" | "prominent";
}

const LoginCTA = ({ className, variant = "default" }: LoginCTAProps) => {
  const navigate = useNavigate();
  
  if (variant === "compact") {
    return (
      <Button 
        onClick={() => navigate("/login")} 
        className={`${className} button-effect`}
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
        className={`${className} text-primary hover:text-primary/80 font-medium`}
      >
        Sign in to participate
      </Button>
    );
  }
  
  if (variant === "prominent") {
    return (
      <div className={`p-6 bg-gradient-to-r from-primary/90 to-blue-700 rounded-lg border border-primary/20 text-center shadow-md ${className}`}>
        <h3 className="text-lg font-medium mb-2 text-white">Ready to make an impact?</h3>
        <p className="text-white/90 mb-4">Sign in to report issues, engage with your community, and track resolutions</p>
        <Button 
          onClick={() => navigate("/login")} 
          className="gap-2 bg-white text-primary hover:bg-white/90 hover:text-primary/90 button-effect shadow-lg"
        >
          <LogIn className="h-4 w-4" />
          Sign In to Participate
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    );
  }
  
  return (
    <div className={`p-6 bg-gradient-to-r from-blue-50 to-indigo-100 rounded-lg border border-blue-200 text-center shadow-md ${className}`}>
      <h3 className="text-lg font-medium mb-2 text-blue-800">Ready to get involved?</h3>
      <p className="text-blue-700/80 mb-4">Sign in to report issues, engage with the community, and track resolutions</p>
      
      <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
        <div className="flex items-center gap-2 text-blue-700">
          <CheckSquare className="h-4 w-4 text-blue-600" />
          <span>Report local issues</span>
        </div>
        <div className="flex items-center gap-2 text-blue-700">
          <CheckSquare className="h-4 w-4 text-blue-600" />
          <span>Track resolution status</span>
        </div>
        <div className="flex items-center gap-2 text-blue-700">
          <CheckSquare className="h-4 w-4 text-blue-600" />
          <span>Vote on important topics</span>
        </div>
        <div className="flex items-center gap-2 text-blue-700">
          <CheckSquare className="h-4 w-4 text-blue-600" />
          <span>Rate government services</span>
        </div>
      </div>
      
      <Button 
        onClick={() => navigate("/login")} 
        className="gap-2 bg-blue-700 hover:bg-blue-800 text-white button-effect shadow-md"
      >
        <LogIn className="h-4 w-4" />
        Sign In to Participate
      </Button>
    </div>
  );
};

export default LoginCTA;
