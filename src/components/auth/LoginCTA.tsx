
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogIn, ChevronRight, CheckSquare, Shield, Sparkles } from "lucide-react";

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
        className={`${className} button-effect shadow-sm`}
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
      <div className={`p-6 bg-gradient-to-r from-blue-600/95 to-indigo-700 rounded-lg border border-blue-400/20 text-center shadow-lg ${className}`}>
        <div className="absolute top-0 right-0 w-24 h-24 opacity-10">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 0L61 36H100L69 58L80 95L50 73L20 95L31 58L0 36H39L50 0Z" fill="white" />
          </svg>
        </div>
        <h3 className="text-xl font-bold mb-3 text-white">Join Our Community</h3>
        <p className="text-white/90 mb-5 leading-relaxed">Sign in to report issues, engage with your community, and help make your city better</p>
        <Button 
          onClick={() => navigate("/login")} 
          className="gap-2 bg-white text-indigo-700 hover:bg-white/90 hover:text-indigo-800 button-effect shadow-lg"
          size="lg"
        >
          <LogIn className="h-4 w-4" />
          Sign In to Participate
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    );
  }
  
  return (
    <div className={`p-6 bg-gradient-to-r from-blue-50 to-indigo-100 rounded-lg border border-blue-200 text-center shadow-md relative overflow-hidden ${className}`}>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-500"></div>
      <div className="absolute -top-12 -right-12 w-28 h-28 opacity-5">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 0L61 36H100L69 58L80 95L50 73L20 95L31 58L0 36H39L50 0Z" fill="currentColor" />
        </svg>
      </div>
      <h3 className="text-xl font-bold mb-3 text-blue-800">Make Your Voice Heard</h3>
      <p className="text-blue-700/90 mb-5 leading-relaxed">Sign in to report issues, engage with the community, and track resolutions in real-time</p>
      
      <div className="grid grid-cols-2 gap-3 mb-5 text-sm">
        <div className="flex items-center gap-2 text-blue-700 bg-blue-50/50 p-2 rounded-md border border-blue-100">
          <CheckSquare className="h-4 w-4 text-blue-600" />
          <span>Report local issues</span>
        </div>
        <div className="flex items-center gap-2 text-blue-700 bg-blue-50/50 p-2 rounded-md border border-blue-100">
          <CheckSquare className="h-4 w-4 text-blue-600" />
          <span>Track resolution status</span>
        </div>
        <div className="flex items-center gap-2 text-blue-700 bg-blue-50/50 p-2 rounded-md border border-blue-100">
          <CheckSquare className="h-4 w-4 text-blue-600" />
          <span>Vote on important topics</span>
        </div>
        <div className="flex items-center gap-2 text-blue-700 bg-blue-50/50 p-2 rounded-md border border-blue-100">
          <CheckSquare className="h-4 w-4 text-blue-600" />
          <span>Rate government services</span>
        </div>
      </div>
      
      <Button 
        onClick={() => navigate("/login")} 
        className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white button-effect shadow-md"
        size="lg"
      >
        <LogIn className="h-4 w-4" />
        Sign In to Participate
        <Sparkles className="h-4 w-4 ml-1" />
      </Button>
    </div>
  );
};

export default LoginCTA;
