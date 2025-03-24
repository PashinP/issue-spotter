import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  MapPin, User, Mail, Phone, Lock, ArrowRight, 
  LoaderCircle, Shield, EyeOff, Eye
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type AuthMode = "login" | "register" | "verify";

const CONSTITUENCIES = ["Rohini", "Dwarka", "Chandni Chowk", "Saket", "Mayur Vihar"];

interface AuthFormProps {
  initialMode?: AuthMode;
}

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /^[0-9]{10}$/;

const AuthForm = ({ initialMode = "login" }: AuthFormProps) => {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [isLoading, setIsLoading] = useState(false);
  const [verificationProgress, setVerificationProgress] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    constituency: "Rohini",
    verificationCode: ""
  });
  
  const [errors, setErrors] = useState({
    email: "",
    phone: "",
    password: ""
  });
  
  const { toast } = useToast();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === "email") {
      setErrors(prev => ({
        ...prev,
        email: !value ? "" : emailRegex.test(value) ? "" : "Please enter a valid email address"
      }));
    } else if (name === "phone") {
      setErrors(prev => ({
        ...prev,
        phone: !value ? "" : phoneRegex.test(value) ? "" : "Please enter a valid 10-digit phone number"
      }));
    } else if (name === "password") {
      setErrors(prev => ({
        ...prev,
        password: value.length < 8 ? "Password must be at least 8 characters" : ""
      }));
    }
  };
  
  const handleConstituencyChange = (value: string) => {
    setFormData(prev => ({ ...prev, constituency: value }));
  };
  
  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };
    
    if (mode === "register" || mode === "login") {
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
        isValid = false;
      }
      
      if (formData.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters";
        isValid = false;
      }
    }
    
    if (mode === "register") {
      if (!phoneRegex.test(formData.phone)) {
        newErrors.phone = "Please enter a valid 10-digit phone number";
        isValid = false;
      }
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Invalid form data",
        description: "Please correct the errors in the form.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    if (mode === "login") {
      setTimeout(() => {
        setIsLoading(false);
        
        if (emailRegex.test(formData.email)) {
          localStorage.setItem("auth", JSON.stringify({ 
            user: { 
              email: formData.email, 
              name: "John Smith", 
              constituency: "Rohini",
              verified: true 
            } 
          }));
          
          toast({
            title: "Welcome back!",
            description: "You have successfully logged in.",
          });
          
          window.location.href = "/";
        } else {
          toast({
            title: "Invalid email",
            description: "Please enter a valid email address.",
            variant: "destructive"
          });
        }
      }, 1500);
    } else if (mode === "register") {
      setTimeout(() => {
        setIsLoading(false);
        setMode("verify");
        
        toast({
          title: "Verification code sent",
          description: `A verification code has been sent to ${formData.email} and ${formData.phone}.`,
        });
        
        let progress = 0;
        const interval = setInterval(() => {
          progress += 1;
          setVerificationProgress(progress);
          if (progress >= 100) {
            clearInterval(interval);
          }
        }, 300);
      }, 1500);
    } else if (mode === "verify") {
      setTimeout(() => {
        setIsLoading(false);
        
        if (formData.verificationCode === "123456") {
          localStorage.setItem("auth", JSON.stringify({ 
            user: { 
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              address: formData.address,
              constituency: formData.constituency,
              verified: true
            } 
          }));
          
          toast({
            title: "Account created!",
            description: "Your account has been successfully verified and created.",
          });
          
          window.location.href = "/";
        } else {
          toast({
            title: "Invalid verification code",
            description: "The verification code you entered is incorrect. Please try again.",
            variant: "destructive"
          });
        }
      }, 1500);
    }
  };
  
  return (
    <div className="w-full max-w-md mx-auto">
      {mode === "verify" && (
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-1">
            <span>Verification code expires in:</span>
            <span>{Math.floor((100 - verificationProgress) * 0.3)} seconds</span>
          </div>
          <Progress value={verificationProgress} className="h-2" />
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
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
                  className={cn("pl-10", errors.phone && "border-destructive")}
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
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
                <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground pointer-events-none z-10" />
                <Select 
                  value={formData.constituency}
                  onValueChange={handleConstituencyChange}
                >
                  <SelectTrigger id="constituency" className="pl-10">
                    <SelectValue placeholder="Select constituency" />
                  </SelectTrigger>
                  <SelectContent>
                    {CONSTITUENCIES.map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </>
        )}
        
        {mode === "verify" && (
          <div className="space-y-2">
            <Label htmlFor="verificationCode">Verification Code</Label>
            <div className="relative">
              <Shield className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input
                id="verificationCode"
                name="verificationCode"
                type="text"
                placeholder="Enter 6-digit code"
                className="pl-10 text-center tracking-widest"
                value={formData.verificationCode}
                onChange={handleChange}
                required
                maxLength={6}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Enter the 6-digit code we sent to your email and phone number.
              <br />
              <span className="font-semibold">(For demo, use code: 123456)</span>
            </p>
          </div>
        )}
        
        {(mode === "login" || mode === "register") && (
          <>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className={cn("pl-10", errors.email && "border-destructive")}
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={cn("pl-10 pr-10", errors.password && "border-destructive")}
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-2.5 text-muted-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
            </div>
          </>
        )}
        
        <Button 
          type="submit" 
          className="w-full mt-6 group"
          disabled={isLoading}
        >
          {isLoading ? (
            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <>
              {mode === "login" ? "Sign In" : mode === "register" ? "Create Account" : "Verify Account"}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </Button>
      </form>
      
      {mode === "verify" && (
        <div className="mt-4 text-center">
          <Button 
            variant="link" 
            onClick={() => {
              setVerificationProgress(0);
              setMode("register");
            }}
            className="text-sm"
          >
            Back to Registration
          </Button>
        </div>
      )}
    </div>
  );
};

export default AuthForm;
