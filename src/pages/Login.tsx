
import { useEffect } from "react";
import AuthForm from "@/components/auth/AuthForm";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, MapPin, MessageSquare, CheckCircle } from "lucide-react";

const Login = () => {
  // Background images for the carousel
  const bgImages = [
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80",
    "https://images.unsplash.com/photo-1614111345870-b05fab8ace98?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80",
    "https://images.unsplash.com/photo-1531905117563-ba59d5f28de4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80"
  ];

  // Set initial bg image
  useEffect(() => {
    const bgIndex = Math.floor(Math.random() * bgImages.length);
    document.getElementById("login-bg")?.style.setProperty(
      "background-image", 
      `url(${bgImages[bgIndex]})`
    );
  }, []);

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-5">
      <div className="hidden md:block md:col-span-3 relative overflow-hidden">
        <div id="login-bg" className="absolute inset-0 bg-cover bg-center bg-no-repeat">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-secondary/80 mix-blend-multiply"></div>
        </div>
        
        <div className="relative z-10 flex flex-col justify-center h-full text-white p-12">
          <h1 className="text-5xl font-bold mb-6">Citizen Connect</h1>
          <p className="text-2xl font-light mb-8 max-w-xl">
            Your voice matters. Report civic issues and make your community better.
          </p>
          
          <div className="grid grid-cols-2 gap-6 max-w-xl">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-6 text-white">
                <div className="flex items-start space-x-4">
                  <MessageSquare className="h-8 w-8 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Report Issues</h3>
                    <p className="text-sm opacity-90">Report civic problems directly to the relevant government department</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-6 text-white">
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-8 w-8 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Track Progress</h3>
                    <p className="text-sm opacity-90">Follow the status of your reports from submission to resolution</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-6 text-white">
                <div className="flex items-start space-x-4">
                  <Building2 className="h-8 w-8 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Rate Services</h3>
                    <p className="text-sm opacity-90">Provide feedback on government department responses</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-6 text-white">
                <div className="flex items-start space-x-4">
                  <MapPin className="h-8 w-8 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Map View</h3>
                    <p className="text-sm opacity-90">See reported issues in your area on an interactive map</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <div className="md:col-span-2 flex flex-col justify-center p-6 md:p-12 bg-white">
        <div className="md:hidden text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Citizen Connect</h1>
          <p className="text-muted-foreground">Your voice matters in civic governance</p>
        </div>
        
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="login">Sign In</TabsTrigger>
            <TabsTrigger value="register">Create Account</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <AuthForm initialMode="login" />
          </TabsContent>
          
          <TabsContent value="register">
            <AuthForm initialMode="register" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Login;
