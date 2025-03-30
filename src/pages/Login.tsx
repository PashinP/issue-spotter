
import { useEffect, useState } from "react";
import AuthForm from "@/components/auth/AuthForm";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, CheckCircle, Building2, MapPin, ArrowRight, ChevronDown, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

// Updated civic engagement themed background images
const bgImages = [
  "https://images.unsplash.com/photo-1493397212122-2b85dda8106b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80", // Modern urban architecture
  "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80", // Community engagement
  "https://images.unsplash.com/photo-1460574283810-2aab119d8511?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80"  // City perspective
];

const Login = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  // Handle background image carousel
  useEffect(() => {
    // Set initial random bg image
    const randomIndex = Math.floor(Math.random() * bgImages.length);
    setCurrentImageIndex(randomIndex);
    
    // Check for system dark mode preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
    
    // Preload all images
    bgImages.forEach(imageUrl => {
      const img = new Image();
      img.src = imageUrl;
    });
    
    // Cycle through images every 10 seconds
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % bgImages.length);
    }, 10000);
    
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

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'dark' : ''}`}>
      {/* Theme Toggle */}
      <button 
        onClick={toggleDarkMode}
        className="fixed top-5 right-5 z-50 p-2 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 text-white hover:bg-white/20 transition-all duration-300 shadow-lg"
        aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
      >
        {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </button>

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with dark gradient overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
          style={{ 
            backgroundImage: `url(${bgImages[currentImageIndex]})`,
            opacity: isLoading ? 0 : 1
          }}
        >
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-primary/70 to-secondary/60"></div>
          
          {/* Subtle blur for depth */}
          <div className="absolute inset-0 backdrop-blur-[2px]"></div>
        </div>
        
        {/* Decorative floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="floating-shape top-[15%] left-[10%] w-24 h-24 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 animate-float blur-xl"></div>
          <div className="floating-shape top-[65%] left-[80%] w-32 h-32 rounded-full bg-gradient-to-r from-indigo-500/20 to-pink-500/20 animate-float-delay blur-xl"></div>
          <div className="floating-shape top-[35%] left-[85%] w-16 h-16 rounded-full bg-gradient-to-r from-green-500/20 to-blue-500/20 animate-float-alt blur-xl"></div>
          <div className="floating-shape top-[80%] left-[20%] w-20 h-20 rounded-full bg-gradient-to-r from-yellow-500/20 to-red-500/20 animate-float blur-xl"></div>
        </div>
        
        {/* Main Content - Glassmorphic Card */}
        <div className="relative z-20 w-full max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center animate-fade-in">
          {/* Left Column - Platform Info */}
          <div className="text-white space-y-8">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 font-poppins tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                जनConnect
              </h1>
              <p className="text-xl font-light mb-8 text-white/90 font-inter max-w-lg">
                Empower Your City. Report. Track. Transform.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card className="bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1 group rounded-xl">
                <CardContent className="p-4 text-white flex items-start gap-3">
                  <MessageSquare className="h-6 w-6 flex-shrink-0 group-hover:scale-110 transition-transform text-blue-300" />
                  <span className="text-sm font-inter">Report issues directly</span>
                </CardContent>
              </Card>
              
              <Card className="bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1 group rounded-xl">
                <CardContent className="p-4 text-white flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 flex-shrink-0 group-hover:scale-110 transition-transform text-green-300" />
                  <span className="text-sm font-inter">Track progress</span>
                </CardContent>
              </Card>
              
              <Card className="bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1 group rounded-xl">
                <CardContent className="p-4 text-white flex items-start gap-3">
                  <MapPin className="h-6 w-6 flex-shrink-0 group-hover:scale-110 transition-transform text-purple-300" />
                  <span className="text-sm font-inter">Interactive maps</span>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-4">
              <p className="text-lg font-medium mb-4 text-white/80 font-poppins">
                Your Direct Link to Civic Action
              </p>
              <p className="text-white/70 text-sm">
                Join thousands of citizens making an impact in their communities through 
                collaborative civic engagement. Together we build better cities.
              </p>
            </div>
          </div>
          
          {/* Right Column - Auth Form */}
          <div className="w-full">
            <Card className="glass-card dark:bg-black/30 overflow-hidden rounded-2xl border border-white/10 dark:border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-xl">
              <CardContent className="p-6 md:p-8">
                <Tabs defaultValue="login" className="w-full">
                  <TabsList className="grid grid-cols-2 mb-8 bg-white/10 dark:bg-white/5 p-1 rounded-lg">
                    <TabsTrigger 
                      value="login" 
                      className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-white/15 data-[state=active]:text-primary dark:data-[state=active]:text-white data-[state=active]:shadow-sm font-medium transition-all duration-300"
                    >
                      Sign In
                    </TabsTrigger>
                    <TabsTrigger 
                      value="register" 
                      className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-white/15 data-[state=active]:text-primary dark:data-[state=active]:text-white data-[state=active]:shadow-sm font-medium transition-all duration-300"
                    >
                      Create Account
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="login" className="animate-fade-in">
                    <AuthForm initialMode="login" darkMode={darkMode} />
                  </TabsContent>
                  
                  <TabsContent value="register" className="animate-fade-in">
                    <AuthForm initialMode="register" darkMode={darkMode} />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Image indicator dots */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
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
        
        {/* Footer text */}
        <div className="absolute bottom-3 w-full text-center z-20">
          <p className="text-white/60 text-sm font-inter">
            Built by the Community, for the Community
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
