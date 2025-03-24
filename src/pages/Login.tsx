
import { useEffect, useState } from "react";
import AuthForm from "@/components/auth/AuthForm";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, MapPin, MessageSquare, CheckCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // Background images for the carousel
  const bgImages = [
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80",
    "https://images.unsplash.com/photo-1614111345870-b05fab8ace98?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80",
    "https://images.unsplash.com/photo-1531905117563-ba59d5f28de4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80"
  ];

  const navigate = useNavigate();
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  // Set initial bg image and rotate backgrounds
  useEffect(() => {
    const bgIndex = Math.floor(Math.random() * bgImages.length);
    setCurrentBgIndex(bgIndex);
    
    const interval = setInterval(() => {
      setCurrentBgIndex(prevIndex => (prevIndex + 1) % bgImages.length);
    }, 10000); // Change background every 10 seconds
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-5">
      <div className="hidden md:block md:col-span-3 relative overflow-hidden">
        <div 
          id="login-bg" 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000"
          style={{ backgroundImage: `url(${bgImages[currentBgIndex]})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-800/85 to-indigo-900/85 mix-blend-multiply"></div>
        </div>
        
        <div className="relative z-10 flex flex-col justify-center h-full text-white p-12">
          <Button 
            variant="ghost" 
            className="absolute top-4 left-4 text-white hover:bg-white/10 w-auto" 
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          
          <div className="max-w-xl mx-auto animate-fade-in">
            <div className="inline-block p-2 bg-white/10 backdrop-blur-sm rounded-lg mb-4">
              <svg width="40" height="40" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="32" rx="8" fill="white" fillOpacity="0.2" />
                <path d="M16 6L19.8 9.8L16 13.6L12.2 9.8L16 6Z" fill="white" />
                <path d="M6 16L9.8 12.2L13.6 16L9.8 19.8L6 16Z" fill="white" />
                <path d="M26 16L22.2 19.8L18.4 16L22.2 12.2L26 16Z" fill="white" />
                <path d="M16 26L12.2 22.2L16 18.4L19.8 22.2L16 26Z" fill="white" />
              </svg>
            </div>
            <h1 className="text-5xl font-bold mb-4 text-white tracking-tight">Citizen Connect</h1>
            <div className="h-1 w-20 bg-white/30 mb-6 rounded-full"></div>
            <p className="text-2xl font-light mb-8 max-w-xl leading-relaxed">
              Your voice matters. Report civic issues and make your community better.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-6 max-w-xl mx-auto mt-4">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 animate-slide-in-bottom" style={{animationDelay: "100ms"}}>
              <CardContent className="p-6 text-white">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-white/10 rounded-lg">
                    <MessageSquare className="h-6 w-6 flex-shrink-0" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Report Issues</h3>
                    <p className="text-sm opacity-90 leading-relaxed">Report civic problems directly to the relevant government department</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 animate-slide-in-bottom" style={{animationDelay: "200ms"}}>
              <CardContent className="p-6 text-white">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-white/10 rounded-lg">
                    <CheckCircle className="h-6 w-6 flex-shrink-0" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Track Progress</h3>
                    <p className="text-sm opacity-90 leading-relaxed">Follow the status of your reports from submission to resolution</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 animate-slide-in-bottom" style={{animationDelay: "300ms"}}>
              <CardContent className="p-6 text-white">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-white/10 rounded-lg">
                    <Building2 className="h-6 w-6 flex-shrink-0" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Rate Services</h3>
                    <p className="text-sm opacity-90 leading-relaxed">Provide feedback on government department responses</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 animate-slide-in-bottom" style={{animationDelay: "400ms"}}>
              <CardContent className="p-6 text-white">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-white/10 rounded-lg">
                    <MapPin className="h-6 w-6 flex-shrink-0" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Map View</h3>
                    <p className="text-sm opacity-90 leading-relaxed">See reported issues in your area on an interactive map</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <div className="md:col-span-2 flex flex-col justify-center p-6 md:p-12 bg-gradient-to-b from-white to-gray-50">
        <div className="md:hidden text-center mb-8">
          <div className="flex justify-center mb-4">
            <Button 
              variant="ghost" 
              className="absolute top-4 left-4" 
              onClick={() => navigate("/")}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="inline-block p-2 bg-blue-50 rounded-lg">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="32" rx="8" fill="currentColor" fillOpacity="0.1" />
                <path d="M16 6L19.8 9.8L16 13.6L12.2 9.8L16 6Z" fill="currentColor" />
                <path d="M6 16L9.8 12.2L13.6 16L9.8 19.8L6 16Z" fill="currentColor" />
                <path d="M26 16L22.2 19.8L18.4 16L22.2 12.2L26 16Z" fill="currentColor" />
                <path d="M16 26L12.2 22.2L16 18.4L19.8 22.2L16 26Z" fill="currentColor" />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">Citizen Connect</h1>
          <p className="text-muted-foreground">Your voice matters in civic governance</p>
        </div>
        
        <div className="max-w-md mx-auto w-full bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="login">Sign In</TabsTrigger>
              <TabsTrigger value="register">Create Account</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="animate-fade-in">
              <AuthForm initialMode="login" />
            </TabsContent>
            
            <TabsContent value="register" className="animate-fade-in">
              <AuthForm initialMode="register" />
            </TabsContent>
          </Tabs>
        </div>
        
        <p className="text-center text-muted-foreground text-sm mt-6">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default Login;
