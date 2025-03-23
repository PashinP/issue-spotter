
import { useEffect, useState } from "react";
import { useLocation, Outlet, useNavigate } from "react-router-dom";
import { Sidebar, SidebarContent, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Bell, Home, LogOut, MessageSquare, PieChart, Settings, User, PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import NavMenu from "./NavMenu";
import MobileNavigation from "./MobileNavigation";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const MainLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [showHelp, setShowHelp] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  // Check if user is on authentication pages
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  useEffect(() => {
    // Check if user has authenticated before
    const auth = localStorage.getItem("auth");
    if (auth) {
      setIsAuthenticated(true);
      setUserData(JSON.parse(auth).user);
    } else {
      navigate("/login");
    }
  }, [location.pathname, toast, navigate]);

  // If on auth page, just show children without layout
  if (isAuthPage) {
    return <Outlet />;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background animate-fade-in">
        {isAuthenticated && !isMobile && (
          <Sidebar className="border-r border-border/40">
            <div className="flex flex-col h-full">
              <div className="p-4">
                <div className="flex items-center justify-center gap-2 mb-6 mt-2">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="32" height="32" rx="8" fill="currentColor" fillOpacity="0.1" />
                    <path d="M16 6L19.8 9.8L16 13.6L12.2 9.8L16 6Z" fill="currentColor" />
                    <path d="M6 16L9.8 12.2L13.6 16L9.8 19.8L6 16Z" fill="currentColor" />
                    <path d="M26 16L22.2 19.8L18.4 16L22.2 12.2L26 16Z" fill="currentColor" />
                    <path d="M16 26L12.2 22.2L16 18.4L19.8 22.2L16 26Z" fill="currentColor" />
                  </svg>
                  <h1 className="text-xl font-medium">Citizen Connect</h1>
                </div>
              </div>
              
              <SidebarContent className="px-2">
                <ul className="space-y-2">
                  <NavItem icon={<Home size={20} />} to="/" label="Home" />
                  <NavItem icon={<PlusCircle size={20} />} to="/report" label="Report Issue" />
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
              <div className="flex h-16 items-center justify-between px-4 md:px-6">
                <div className="flex items-center gap-2">
                  {!isMobile && <SidebarTrigger />}
                  
                  <div className="flex items-center md:hidden">
                    <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                      <rect width="32" height="32" rx="8" fill="currentColor" fillOpacity="0.1" />
                      <path d="M16 6L19.8 9.8L16 13.6L12.2 9.8L16 6Z" fill="currentColor" />
                      <path d="M6 16L9.8 12.2L13.6 16L9.8 19.8L6 16Z" fill="currentColor" />
                      <path d="M26 16L22.2 19.8L18.4 16L22.2 12.2L26 16Z" fill="currentColor" />
                      <path d="M16 26L12.2 22.2L16 18.4L19.8 22.2L16 26Z" fill="currentColor" />
                    </svg>
                    <h2 className="text-lg font-medium">
                      {getPageTitle(location.pathname)}
                    </h2>
                  </div>
                  
                  {!isMobile && (
                    <h2 className="text-lg font-medium">
                      {getPageTitle(location.pathname)}
                    </h2>
                  )}
                </div>
                
                <div className="flex items-center gap-2 md:gap-4">
                  <Button variant="ghost" size="icon" className="rounded-full" onClick={() => toast({ title: "No new notifications" })}>
                    <Bell size={20} />
                  </Button>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <Avatar>
                          <User className="h-5 w-5" />
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>
                        <div>
                          <p className="font-medium">{userData?.name || "User"}</p>
                          <p className="text-xs text-muted-foreground">{userData?.email}</p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => navigate("/profile")}>
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate("/tracking")}>
                        <PieChart className="mr-2 h-4 w-4" />
                        <span>My Reports</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={() => {
                          localStorage.removeItem("auth");
                          navigate("/login");
                        }}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </header>
          )}
          
          <main className={cn(
            "flex-1 overflow-auto",
            isAuthenticated ? "px-4 py-6 md:px-6" : ""
          )}>
            <Outlet />
          </main>
          
          {isAuthenticated && isMobile && <MobileNavigation />}
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
