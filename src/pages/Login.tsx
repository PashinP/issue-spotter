
import { useEffect, useState } from "react";
import AuthForm from "@/components/auth/AuthForm";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, CheckCircle, Building2, MapPin, ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const Login = () => {
  // Background images for the carousel
  const bgImages = [
    "https://images.unsplash.com/photo-1531905117563-ba59d5f28de4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80",
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80",
    "https://images.unsplash.com/photo-1614111345870-b05fab8ace98?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80"
  ];
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Handle background image carousel
  useEffect(() => {
    // Set initial random bg image
    const randomIndex = Math.floor(Math.random() * bgImages.length);
    setCurrentImageIndex(randomIndex);
    
    // Preload all images
    bgImages.forEach(imageUrl => {
      const img = new Image();
      img.src = imageUrl;
    });
    
    // Cycle through images every 8 seconds
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % bgImages.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Handle image loading
  useEffect(() => {
    const img = new Image();
    img.src = bgImages[currentImageIndex];
    img.onload = () => setIsLoading(false);
    
    return () => {
      img.onload = null;
    };
  }, [currentImageIndex]);

  const scrollToContent = () => {
    document.getElementById('auth-content')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
          style={{ 
            backgroundImage: `url(${bgImages[currentImageIndex]})`,
            opacity: isLoading ? 0 : 1
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-secondary/80 mix-blend-multiply"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 text-white">
          <div className="max-w-3xl animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
              Your Voice <span className="text-white/90">Shapes</span> Your City
            </h1>
            <p className="text-xl md:text-2xl font-light mb-8 max-w-2xl">
              Join thousands of citizens making an impact in their communities through 
              transparent reporting and collaborative problem-solving.
            </p>
            
            <div className="flex flex-wrap gap-3 mb-12">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-colors duration-300 w-full sm:w-auto">
                <CardContent className="p-4 text-white flex items-start gap-3">
                  <MessageSquare className="h-6 w-6 mt-1 flex-shrink-0" />
                  <span className="text-sm">Report civic issues directly</span>
                </CardContent>
              </Card>
              
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-colors duration-300 w-full sm:w-auto">
                <CardContent className="p-4 text-white flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 mt-1 flex-shrink-0" />
                  <span className="text-sm">Track resolution progress</span>
                </CardContent>
              </Card>
              
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-colors duration-300 w-full sm:w-auto">
                <CardContent className="p-4 text-white flex items-start gap-3">
                  <MapPin className="h-6 w-6 mt-1 flex-shrink-0" />
                  <span className="text-sm">View issues on interactive maps</span>
                </CardContent>
              </Card>
            </div>
            
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-primary flex items-center gap-2 group"
              onClick={scrollToContent}
            >
              Get Started
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown 
              className="h-8 w-8 text-white/70 cursor-pointer hover:text-white" 
              onClick={scrollToContent}
            />
          </div>
          
          {/* Image indicator dots */}
          <div className="absolute bottom-12 right-12 flex gap-2">
            {bgImages.map((_, index) => (
              <button 
                key={index}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  currentImageIndex === index ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/70'
                }`}
                onClick={() => setCurrentImageIndex(index)}
                aria-label={`View image ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Auth Section */}
      <div 
        id="auth-content" 
        className="min-h-screen flex items-center py-16 px-4 md:px-8 bg-gradient-to-b from-primary/5 to-secondary/5"
      >
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
            <div className="md:col-span-2 animate-fade-in">
              <div className="text-center md:text-left mb-8 md:mb-0">
                <h2 className="text-3xl font-bold mb-4 text-primary">Citizen Connect</h2>
                <p className="text-lg mb-6 text-gray-600">
                  Your civic participation platform for reporting issues, tracking resolutions, and making your community better.
                </p>
                
                <div className="space-y-6 hidden md:block">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <MessageSquare className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Report Issues</h3>
                      <p className="text-gray-500 text-sm">Submit problems with photos, location data, and detailed descriptions</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Building2 className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Department Communication</h3>
                      <p className="text-gray-500 text-sm">Direct connection to the relevant government departments</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <CheckCircle className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Resolution Tracking</h3>
                      <p className="text-gray-500 text-sm">Follow your reports from submission to completion</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-3 animate-fade-in">
              <Card className="border-none shadow-lg bg-white rounded-xl">
                <CardContent className="p-6 md:p-8">
                  <Tabs defaultValue="login" className="w-full">
                    <TabsList className="grid grid-cols-2 mb-8 bg-gray-100 p-1">
                      <TabsTrigger value="login" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Sign In</TabsTrigger>
                      <TabsTrigger value="register" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Create Account</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="login">
                      <AuthForm initialMode="login" />
                    </TabsContent>
                    
                    <TabsContent value="register">
                      <AuthForm initialMode="register" />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
