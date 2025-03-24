
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Home, PlusCircle, PieChart, User, LogIn } from "lucide-react";

interface MobileNavigationProps {
  isAuthenticated?: boolean;
}

const MobileNavigation = ({ isAuthenticated = false }: MobileNavigationProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: PlusCircle, label: "Report", path: "/report" },
    ...(isAuthenticated ? [
      { icon: PieChart, label: "Track", path: "/tracking" },
      { icon: User, label: "Profile", path: "/profile" }
    ] : [
      { icon: LogIn, label: "Sign In", path: "/login" }
    ])
  ];
  
  return (
    <div className="fixed bottom-0 left-0 right-0 border-t border-border/40 bg-background z-50">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <Button
              key={item.path}
              variant="ghost"
              size="sm"
              className={cn(
                "flex flex-col items-center rounded-lg py-2 px-2 gap-1",
                isActive ? "text-primary font-medium" : "text-muted-foreground"
              )}
              onClick={() => navigate(item.path)}
            >
              <item.icon size={20} />
              <span className="text-xs">{item.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default MobileNavigation;
