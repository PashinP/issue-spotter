
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NavMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const menuItems = [
    { path: "/", label: "Home" },
    { path: "/report", label: "Report Issue" },
    { path: "/tracking", label: "Track Issues" },
    { path: "/profile", label: "Profile" },
  ];
  
  return (
    <nav className="flex overflow-x-auto py-2 px-4 md:px-0 gap-2 no-scrollbar">
      {menuItems.map((item) => (
        <Button
          key={item.path}
          variant={location.pathname === item.path ? "default" : "ghost"}
          className={cn(
            "rounded-full text-sm transition-all",
            location.pathname === item.path 
              ? "bg-primary text-primary-foreground" 
              : "text-muted-foreground hover:text-foreground"
          )}
          onClick={() => navigate(item.path)}
        >
          {item.label}
        </Button>
      ))}
    </nav>
  );
};

export default NavMenu;
