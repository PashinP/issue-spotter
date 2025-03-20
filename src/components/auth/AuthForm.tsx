
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, User, Mail, Phone, Lock, ArrowRight, LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type AuthMode = "login" | "register";

const CONSTITUENCIES = ["Rohini", "Dwarka", "Chandni Chowk", "Saket", "Mayur Vihar"];

const AuthForm = () => {
  const [mode, setMode] = useState<AuthMode>("login");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    constituency: "Rohini"
  });
  
  const { toast } = useToast();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      if (mode === "login") {
        // For demo purposes, allow any login
        localStorage.setItem("auth", JSON.stringify({ 
          user: { email: formData.email, constituency: "Rohini" } 
        }));
        
        toast({
          title: "Welcome back!",
          description: "You have successfully logged in.",
        });
        
        window.location.href = "/";
      } else {
        // Register new user
        localStorage.setItem("auth", JSON.stringify({ 
          user: { 
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            constituency: formData.constituency
          } 
        }));
        
        toast({
          title: "Account created!",
          description: "Your account has been successfully created.",
        });
        
        window.location.href = "/";
      }
    }, 1500);
  };
  
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold mb-2">Citizen Connect</h1>
        <p className="text-muted-foreground">
          {mode === "login" ? "Sign in to your account" : "Create a new account"}
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Registration fields */}
        {mode === "register" && (
          <>
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Smith"
                  className="pl-10"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="9876543210"
                  className="pl-10"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="address"
                  name="address"
                  type="text"
                  placeholder="123 Main Street"
                  className="pl-10"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="constituency">Constituency</Label>
              <div className="relative">
                <select
                  id="constituency"
                  name="constituency"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-10 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={formData.constituency}
                  onChange={handleChange}
                  required
                >
                  {CONSTITUENCIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              </div>
            </div>
          </>
        )}
        
        {/* Common fields for both login and register */}
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              className="pl-10"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              className="pl-10"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <Button 
          type="submit" 
          className="w-full mt-6 group"
          disabled={isLoading}
        >
          {isLoading ? (
            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <>
              {mode === "login" ? "Sign In" : "Create Account"}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </Button>
      </form>
      
      <div className="mt-6 text-center text-sm">
        <p className="text-muted-foreground">
          {mode === "login" ? "Don't have an account?" : "Already have an account?"}
          <button
            type="button"
            className="ml-1 text-primary hover:underline font-medium"
            onClick={() => setMode(mode === "login" ? "register" : "login")}
          >
            {mode === "login" ? "Sign up" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
