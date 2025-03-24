
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import { useToast } from "@/hooks/use-toast";
import IssueFeed from "@/components/feed/IssueFeed";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import LoginCTA from "@/components/auth/LoginCTA";
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
  HelpCircle,
  LogIn,
  ArrowRight,
  BarChart3,
  AlertCircle,
  Sparkles
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
  
  useEffect(() => {
    // Show welcome message if first time visiting homepage
    const welcomeShown = localStorage.getItem("welcomeShown");
    if (!welcomeShown) {
      setTimeout(() => {
        toast({
          title: "Welcome to Citizen Connect!",
          description: "Empowering citizens to improve their communities through civic engagement.",
          duration: 5000,
        });
        localStorage.setItem("welcomeShown", "true");
      }, 500);
    }
  }, [toast]);
  
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
        if (isAuthenticated) {
          navigate("/tracking");
        } else {
          promptLogin("view your reports");
        }
        break;
      case "Resolved Cases":
        if (isAuthenticated) {
          navigate("/tracking?filter=resolved");
        } else {
          promptLogin("view resolved cases");
        }
        break;
      case "Rate Services":
        if (isAuthenticated) {
          navigate("/profile");
        } else {
          promptLogin("rate services");
        }
        break;
      default:
        break;
    }
  };
  
  // Show login prompt for protected features
  const promptLogin = (action: string) => {
    toast({
      title: "Authentication Required",
      description: `Please log in to ${action}`,
      action: (
        <Button variant="default" size="sm" onClick={() => navigate("/login")} className="button-effect">
          Sign In
        </Button>
      ),
    });
  };
  
  // Use this as a placeholder for features that aren't fully implemented
  const handleComingSoonFeature = (featureName: string) => {
    toast({
      title: `${featureName} Coming Soon`,
      description: "This feature is currently under development. Stay tuned!",
    });
  };
  
  const quickLinks = [
    { icon: TrendingUp, label: "Trending Issues", color: "bg-rose-100 text-rose-600" },
    { icon: MapPin, label: "Nearby Issues", color: "bg-blue-100 text-blue-600" },
    { icon: Clock, label: "Recent Reports", color: "bg-amber-100 text-amber-600" },
    { icon: CheckCircle, label: "Resolved Cases", color: "bg-emerald-100 text-emerald-600" },
    { icon: Star, label: "Rate Services", color: "bg-purple-100 text-purple-600" }
  ];
  
  const handleReportIssue = () => {
    if (isAuthenticated) {
      navigate("/report");
    } else {
      promptLogin("report an issue");
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="relative overflow-hidden rounded-xl mb-8 shadow-lg group">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-700/90 to-indigo-800/95"></div>
        <img 
          src="https://images.unsplash.com/photo-1522543558187-768b6df7c25c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80" 
          alt="City skyline" 
          className="absolute inset-0 h-full w-full object-cover mix-blend-overlay opacity-40 transform transition-transform duration-10000 ease-in-out group-hover:scale-105"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent"></div>
        
        <div className="relative p-7 md:p-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full mb-4 text-blue-50 text-sm">
              <Sparkles className="h-3 w-3" />
              <span>Empowering communities through civic engagement</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white tracking-tight leading-tight">
              Your City. Your Voice.<br />
              <span className="text-blue-200">Make a Difference Today</span>
            </h1>
            <p className="text-white/90 mb-6 text-base md:text-lg leading-relaxed">
              Report civic issues, track government responses, 
              and build better communities through transparent engagement.
            </p>
            
            <div className="flex flex-wrap gap-3 mt-6">
              <Button 
                onClick={handleReportIssue} 
                className="gap-1 shadow-lg hover:shadow-xl transition-all bg-white text-blue-700 hover:bg-white/90 button-effect"
                size="lg"
              >
                <PlusCircle className="mr-1 h-4 w-4" />
                Report an Issue
              </Button>
              {isAuthenticated ? (
                <Button 
                  variant="outline" 
                  onClick={() => navigate("/tracking")}
                  className="bg-blue-700/20 text-white border-white/30 hover:bg-blue-700/30 hover:text-white button-effect"
                  size="lg"
                >
                  Track My Issues
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              ) : (
                <Button 
                  variant="outline" 
                  onClick={() => navigate("/login")} 
                  className="gap-1 bg-blue-700/20 text-white border-white/30 hover:bg-blue-700/30 hover:text-white button-effect"
                  size="lg"
                >
                  <LogIn className="mr-1 h-4 w-4" />
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-400 via-indigo-500 to-blue-600"></div>
      </div>
      
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-blue-800">
        <div className="h-8 w-1 bg-blue-700 rounded-full"></div>
        Quick Access
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-4 mb-9">
        {quickLinks.map((link, index) => (
          <Card 
            key={index} 
            className="quick-link-card card-hover border-gray-100"
            onClick={() => handleQuickLinkClick(link.label)}
          >
            <CardContent className="p-4 md:p-5 text-center">
              <div className="flex flex-col items-center">
                <div className={cn("quick-link-icon rounded-lg p-3", link.color)}>
                  <link.icon className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium mt-2">{link.label}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2 text-blue-800">
              <div className="h-8 w-1 bg-blue-700 rounded-full"></div>
              Community Feed
            </h2>
            <p className="text-muted-foreground">
              Stay updated with issues in your area and help by upvoting important concerns
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="hidden md:flex gap-1 hover:border-blue-300 hover:bg-blue-50"
              onClick={() => handleComingSoonFeature("Issue Analytics")}
            >
              <MessageSquare className="h-4 w-4" />
              <span>Most Active</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="hidden md:flex gap-1 hover:border-blue-300 hover:bg-blue-50"
              onClick={() => handleComingSoonFeature("Community Statistics")}
            >
              <LineChart className="h-4 w-4" />
              <span>Statistics</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-1 hover:border-blue-300 hover:bg-blue-50"
              onClick={() => handleComingSoonFeature("Advanced Filters")}
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span className="hidden md:inline">Filters</span>
            </Button>
          </div>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Card className="info-card from-blue-50 to-sky-50 border-blue-200 text-blue-800 card-hover mb-5">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <HelpCircle className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">How it works</h3>
                  <p className="text-sm text-blue-700">Report issues, upvote community concerns, and track resolution progress</p>
                </div>
              </div>
              <Button size="sm" variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100 button-effect">
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
                <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg">
                  <PlusCircle className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Report an Issue</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Document problems in your community with photos and detailed descriptions. Your reports go directly to the relevant government departments.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Upvote Community Concerns</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Support issues that matter to you. Higher votes help prioritize important community problems.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg">
                  <Clock className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Track Resolution Progress</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Follow the status of your reports and see how local governments are responding to community needs.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg">
                  <Star className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Rate Government Services</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
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
              {!isAuthenticated && (
                <Button 
                  type="button" 
                  variant="default" 
                  onClick={() => navigate("/login")}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Sign In to Participate
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        <Card className="info-card mt-4 from-amber-50 to-yellow-50 border-amber-200 text-amber-800 card-hover">
          <div className="flex items-center gap-3">
            <div className="bg-amber-100 p-3 rounded-lg">
              <AlertCircle className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <h3 className="font-semibold">Community Statistics</h3>
              <p className="text-sm text-amber-700">View issue resolution rates, response times, and department performance</p>
            </div>
          </div>
          <Button 
            size="sm" 
            variant="outline" 
            className="border-amber-300 text-amber-700 hover:bg-amber-100 button-effect"
            onClick={() => handleComingSoonFeature("Community Statistics Dashboard")}
          >
            View Stats
          </Button>
        </Card>
        
        <Separator className="my-7" />
        
        <div className="bg-gradient-to-b from-gray-50 to-white p-5 rounded-lg border border-gray-100 shadow-sm mb-6">
          <h3 className="text-lg font-semibold mb-3 text-blue-800">Recent Community Reports</h3>
          <IssueFeed />
        </div>
        
        {!isAuthenticated && (
          <div className="mt-8">
            <LoginCTA variant="prominent" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
