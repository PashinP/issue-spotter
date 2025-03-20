
import { useEffect, useState } from "react";
import { useLocation, Outlet, useNavigate } from "react-router-dom";
import { Sidebar, SidebarContent, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Bell, Home, LogOut, MessageSquare, PieChart, Settings, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import NavMenu from "./NavMenu";

const MainLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showHelp, setShowHelp] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is on authentication pages
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  useEffect(() => {
    // Check if user has authenticated before
    const auth = localStorage.getItem("auth");
    if (auth) {
      setIsAuthenticated(true);
    } else {
      navigate("/login");
    }
    
    // Show welcome toast when app first loads
    if (location.pathname === "/" && !localStorage.getItem("welcomeShown")) {
      setTimeout(() => {
        toast({
          title: "Welcome to Citizen Connect",
          description: "Report and track civic issues in your community.",
          duration: 5000,
        });
        localStorage.setItem("welcomeShown", "true");
      }, 1000);
    }
  }, [location.pathname, toast, navigate]);

  // If on auth page, just show children without layout
  if (isAuthPage) {
    return <Outlet />;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background animate-fade-in">
        {isAuthenticated && (
          <Sidebar className="border-r border-border/40">
            <div className="flex flex-col h-full">
              <div className="p-4">
                <div className="flex items-center justify-center mb-6 mt-2">
                  <h1 className="text-xl font-medium">Citizen Connect</h1>
                </div>
              </div>
              
              <SidebarContent className="px-2">
                <ul className="space-y-2">
                  <NavItem icon={<Home size={20} />} to="/" label="Home" />
                  <NavItem icon={<MessageSquare size={20} />} to="/report" label="Report Issue" />
                  <NavItem icon={<PieChart size={20} />} to="/tracking" label="Track Issues" />
                  <NavItem icon={<Settings size={20} />} to="/profile" label="Profile" />
                </ul>
              </SidebarContent>
              
              <div className="mt-auto p-4">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start py-6 mb-2"
                  onClick={() => {
                    localStorage.removeItem("auth");
                    navigate("/login");
                  }}
                >
                  <LogOut size={20} className="mr-2" />
                  <span>Sign Out</span>
                </Button>
              </div>
            </div>
          </Sidebar>
        )}
        
        <div className="flex-1 flex flex-col min-h-screen">
          {isAuthenticated && (
            <header className="border-b border-border/40 bg-white/80 backdrop-blur-sm sticky top-0 z-30">
              <div className="flex h-16 items-center justify-between px-6">
                <div className="flex items-center gap-2">
                  <SidebarTrigger />
                  <h2 className="text-lg font-medium">
                    {getPageTitle(location.pathname)}
                  </h2>
                </div>
                
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="icon" className="rounded-full" onClick={() => toast({ title: "No new notifications" })}>
                    <Bell size={20} />
                  </Button>
                  <Avatar>
                    <User className="h-5 w-5" />
                  </Avatar>
                </div>
              </div>
            </header>
          )}
          
          <main className={cn(
            "flex-1 overflow-auto",
            isAuthenticated ? "px-6 py-6" : ""
          )}>
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

const NavItem = ({ icon, to, label }: { icon: React.ReactNode; to: string; label: string }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = location.pathname === to;
  
  return (
    <li>
      <button
        onClick={() => navigate(to)}
        className={cn(
          "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
          isActive 
            ? "bg-primary text-primary-foreground" 
            : "text-muted-foreground hover:bg-secondary hover:text-foreground"
        )}
      >
        {icon}
        <span>{label}</span>
      </button>
    </li>
  );
};

// Helper to determine page title based on current route
function getPageTitle(path: string): string {
  switch (path) {
    case "/":
      return "Dashboard";
    case "/report":
      return "Report an Issue";
    case "/tracking":
      return "Track Issues";
    case "/profile":
      return "User Profile";
    default:
      return "Citizen Connect";
  }
}

export default MainLayout;
