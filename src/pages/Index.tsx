
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import IssueFeed from "@/components/feed/IssueFeed";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

const Index = () => {
  // Check if user is authenticated
  const isAuthenticated = localStorage.getItem("auth") !== null;
  
  // If not authenticated, redirect to login
  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = "/login";
    }
  }, [isAuthenticated]);
  
  if (!isAuthenticated) {
    return null;
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Community Feed</h1>
          <p className="text-muted-foreground">
            Stay updated with issues in your area
          </p>
        </div>
        
        <Button onClick={() => window.location.href = "/report"}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Report Issue
        </Button>
      </div>
      
      <IssueFeed />
    </div>
  );
};

export default Index;
