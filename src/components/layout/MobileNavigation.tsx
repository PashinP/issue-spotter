
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Home, PlusCircle, PieChart, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const MobileNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  
  const navigationItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/report", label: "Report", icon: PlusCircle },
    { path: "/tracking", label: "Track", icon: PieChart },
    { path: "/profile", label: "Profile", icon: User },
  ];
  
  const handleNavigate = (path: string) => {
    navigate(path);
    setOpen(false);
  };
  
  return (
    <>
      {/* Bottom Navigation for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border md:hidden">
        <div className="flex items-center justify-around h-16">
          {navigationItems.map((item) => (
            <Button
              key={item.path}
              variant="ghost"
              size="icon"
              className={cn(
                "flex flex-col items-center justify-center h-full rounded-none px-0",
                location.pathname === item.path && "text-primary bg-transparent"
              )}
              onClick={() => navigate(item.path)}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-[10px] mt-1">{item.label}</span>
            </Button>
          ))}
          
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="flex flex-col items-center justify-center h-full rounded-none px-0">
                <Menu className="h-5 w-5" />
                <span className="text-[10px] mt-1">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85%] sm:w-[385px] pt-12">
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Citizen Connect</h2>
                <p className="text-muted-foreground text-sm">
                  Your platform for civic engagement
                </p>
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-1">
                {[
                  { path: "/", label: "Dashboard", icon: Home },
                  { path: "/report", label: "Report Issue", icon: PlusCircle },
                  { path: "/tracking", label: "Track Issues", icon: PieChart },
                  { path: "/profile", label: "My Profile", icon: User },
                ].map((item) => (
                  <Button
                    key={item.path}
                    variant={location.pathname === item.path ? "default" : "ghost"}
                    className="w-full justify-start mb-1"
                    onClick={() => handleNavigate(item.path)}
                  >
                    <item.icon className="mr-2 h-5 w-5" />
                    {item.label}
                  </Button>
                ))}
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-1">
                <Button
                  variant="ghost"
                  className="w-full justify-start mb-1"
                  onClick={() => {
                    localStorage.removeItem("auth");
                    window.location.href = "/login";
                  }}
                >
                  Sign Out
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      
      {/* Spacer for bottom navigation */}
      <div className="h-16 md:hidden" />
    </>
  );
};

export default MobileNavigation;
