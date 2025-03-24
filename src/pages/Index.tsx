
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import { useToast } from "@/hooks/use-toast";
import IssueFeed from "@/components/feed/IssueFeed";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  PlusCircle, 
  TrendingUp, 
  Search, 
  MapPin, 
  Clock, 
  CheckCircle,
  Star, 
  MessageSquare, 
  LineChart,
  SlidersHorizontal,
  HelpCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";

const Index = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Check if user is authenticated
  const isAuthenticated = localStorage.getItem("auth") !== null;
  
  // If not authenticated, redirect to login
  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = "/login";
    }
  }, [isAuthenticated]);
  
  useEffect(() => {
    // Show welcome message if first time visiting homepage
    const welcomeShown = localStorage.getItem("welcomeShown");
    if (!welcomeShown && isAuthenticated) {
      setTimeout(() => {
        toast({
          title: "Welcome to Citizen Connect!",
          description: "Empowering citizens to improve their communities through civic engagement.",
          duration: 5000,
        });
        localStorage.setItem("welcomeShown", "true");
      }, 500);
    }
  }, [toast, isAuthenticated]);
  
  if (!isAuthenticated) {
    return null;
  }
  
  // Handle quick link clicks
  const handleQuickLinkClick = (linkType: string) => {
    switch (linkType) {
      case "Trending Issues":
        navigate("/trending");
        break;
      case "Nearby Issues":
        toast({
          title: "Nearby Issues",
          description: "Loading issues from your area. This feature is coming soon!",
        });
        break;
      case "Recent Reports":
        navigate("/tracking");
        break;
      case "Resolved Cases":
        navigate("/tracking?filter=resolved");
        break;
      case "Rate Services":
        navigate("/profile");
        break;
      default:
        break;
    }
  };
  
  // Use this as a placeholder for features that aren't fully implemented
  const handleComingSoonFeature = (featureName: string) => {
    toast({
      title: `${featureName} Coming Soon`,
      description: "This feature is currently under development. Stay tuned!",
    });
  };
  
  const quickLinks = [
    { icon: TrendingUp, label: "Trending Issues", color: "bg-pink-100 text-pink-600" },
    { icon: MapPin, label: "Nearby Issues", color: "bg-blue-100 text-blue-600" },
    { icon: Clock, label: "Recent Reports", color: "bg-orange-100 text-orange-600" },
    { icon: CheckCircle, label: "Resolved Cases", color: "bg-green-100 text-green-600" },
    { icon: Star, label: "Rate Services", color: "bg-purple-100 text-purple-600" }
  ];
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative overflow-hidden rounded-xl mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/30"></div>
        <img 
          src="https://images.unsplash.com/photo-1522543558187-768b6df7c25c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80" 
          alt="City skyline" 
          className="absolute inset-0 h-full w-full object-cover mix-blend-overlay opacity-20"
        />
        
        <div className="relative p-6 md:p-8">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-bold mb-2">Welcome to Citizen Connect</h1>
            <p className="text-muted-foreground mb-4">
              Empowering citizens to report civic issues, track government responses, 
              and build better communities through transparent engagement.
            </p>
            
            <div className="flex flex-wrap gap-3 mt-4">
              <Button onClick={() => navigate("/report")} className="gap-1">
                <PlusCircle className="mr-1 h-4 w-4" />
                Report Issue
              </Button>
              <Button variant="outline" onClick={() => navigate("/tracking")}>
                Track My Issues
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-4 mb-8">
        {quickLinks.map((link, index) => (
          <Card 
            key={index} 
            className="cursor-pointer hover:shadow-md transition-all"
            onClick={() => handleQuickLinkClick(link.label)}
          >
            <CardContent className="p-3 md:p-4 text-center">
              <div className="flex flex-col items-center">
                <div className={cn("p-2 rounded-full mb-2 mt-1", link.color)}>
                  <link.icon className="h-5 w-5" />
                </div>
                <span className="text-xs font-medium">{link.label}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-semibold mb-1">Community Feed</h2>
            <p className="text-muted-foreground text-sm">
              Stay updated with issues in your area and help by upvoting important concerns
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="hidden md:flex gap-1"
              onClick={() => handleComingSoonFeature("Issue Analytics")}
            >
              <MessageSquare className="h-4 w-4" />
              <span>Most Active</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="hidden md:flex gap-1"
              onClick={() => handleComingSoonFeature("Community Statistics")}
            >
              <LineChart className="h-4 w-4" />
              <span>Statistics</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-1"
              onClick={() => handleComingSoonFeature("Advanced Filters")}
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span className="hidden md:inline">Filters</span>
            </Button>
          </div>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Card className="p-4 mb-6 flex items-center justify-between bg-orange-50 border-orange-200 text-orange-800 cursor-pointer hover:bg-orange-100 transition-colors">
              <div className="flex items-center gap-3">
                <div className="bg-orange-100 p-2 rounded-full">
                  <HelpCircle className="h-5 w-5 text-orange-500" />
                </div>
                <div>
                  <h3 className="font-medium">How it works</h3>
                  <p className="text-sm text-orange-700">Report issues, upvote community concerns, and track resolution progress</p>
                </div>
              </div>
              <Button size="sm" variant="outline" className="border-orange-300 text-orange-700 hover:bg-orange-100">
                Learn More
              </Button>
            </Card>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>How Citizen Connect Works</DialogTitle>
              <DialogDescription>
                Your guide to effectively engaging with your local government and community
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 bg-primary/10 p-2 rounded-full">
                  <PlusCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Report an Issue</h4>
                  <p className="text-sm text-muted-foreground">
                    Document problems in your community with photos and detailed descriptions. Your reports go directly to the relevant government departments.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 bg-primary/10 p-2 rounded-full">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Upvote Community Concerns</h4>
                  <p className="text-sm text-muted-foreground">
                    Support issues that matter to you. Higher votes help prioritize important community problems.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 bg-primary/10 p-2 rounded-full">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Track Resolution Progress</h4>
                  <p className="text-sm text-muted-foreground">
                    Follow the status of your reports and see how local governments are responding to community needs.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 bg-primary/10 p-2 rounded-full">
                  <Star className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Rate Government Services</h4>
                  <p className="text-sm text-muted-foreground">
                    Provide feedback on the quality and timeliness of issue resolution to improve accountability.
                  </p>
                </div>
              </div>
            </div>
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Got it, thanks!
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        <Separator className="mb-6" />
        
        <IssueFeed />
      </div>
    </div>
  );
};

export default Index;
