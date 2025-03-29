
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  Mail, Lock, ArrowRight, 
  LoaderCircle, EyeOff, Eye, 
  MessageSquare, GithubIcon, KeyRound,
  Phone, Shield, User, MapPin
} from "lucide-react";
import GoogleIcon from "@/components/icons/GoogleIcon";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type AuthMode = "login" | "register" | "verify" | "otp";

const CONSTITUENCIES = ["Rohini", "Dwarka", "Chandni Chowk", "Saket", "Mayur Vihar"];

interface AuthFormProps {
  initialMode?: AuthMode;
}

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /^[0-9]{10}$/;

const SocialButton = ({ children, onClick, icon, label }: { 
  children: React.ReactNode, 
  onClick: () => void, 
  icon: React.ReactNode,
  label: string 
}) => (
  <button
    type="button"
    onClick={onClick}
    className="flex items-center justify-center gap-2 w-full p-2.5 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 transition-all text-gray-700 font-medium"
    aria-label={label}
  >
    {icon}
    {children}
  </button>
);

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
    verificationCode: "",
    otpPhone: ""
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
    
    if (mode === "otp") {
      if (!formData.otpPhone || !phoneRegex.test(formData.otpPhone)) {
        toast({
          title: "Invalid phone number",
          description: "Please enter a valid 10-digit phone number",
          variant: "destructive"
        });
        return;
      }
      
      setIsLoading(true);
      
      setTimeout(() => {
        setIsLoading(false);
        setMode("verify");
        
        toast({
          title: "OTP sent",
          description: `A verification code has been sent to ${formData.otpPhone}`,
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
      
      return;
    }
    
    if (!validateForm() && mode !== "verify") {
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
              name: formData.name || "Demo User",
              email: formData.email || `user${Math.floor(Math.random() * 10000)}@example.com`,
              phone: formData.phone || formData.otpPhone,
              address: formData.address || "Sample Address",
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

  const handleSocialLogin = (provider: string) => {
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      localStorage.setItem("auth", JSON.stringify({ 
        user: { 
          email: `${provider.toLowerCase()}user@example.com`, 
          name: `${provider} User`, 
          constituency: "Rohini",
          verified: true 
        } 
      }));
      
      toast({
        title: `${provider} login successful!`,
        description: `You have successfully logged in with ${provider}.`,
      });
      
      window.location.href = "/";
    }, 1000);
  };
  
  const handleOtpLogin = () => {
    setMode("otp");
  };
  
  return (
    <div className="w-full max-w-md mx-auto text-gray-800 font-poppins">
      {mode === "verify" && (
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Verification code expires in:</span>
            <span className="font-medium">{Math.floor((100 - verificationProgress) * 0.3)} seconds</span>
          </div>
          <Progress value={verificationProgress} className="h-2 bg-gray-100" />
        </div>
      )}
      
      {mode === "otp" ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 font-poppins">Login with OTP</h3>
          
          <div className="space-y-2">
            <Label htmlFor="otpPhone" className="text-gray-700 font-medium">Phone Number</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <Input
                id="otpPhone"
                name="otpPhone"
                type="tel"
                placeholder="Enter your phone number"
                className="pl-10 border-[#CFD8DC] bg-white focus:border-[#26A69A] focus:ring-[#26A69A] text-gray-800 placeholder:text-gray-400 rounded-lg"
                value={formData.otpPhone}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full mt-6 group bg-[#26A69A] hover:bg-[#26A69A]/90 rounded-lg font-medium transition-transform hover:scale-[1.05]"
            disabled={isLoading}
          >
            {isLoading ? (
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <>
                Send OTP
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </Button>
          
          <div className="mt-4 text-center">
            <Button 
              variant="link" 
              type="button"
              onClick={() => setMode("login")}
              className="text-sm text-[#26A69A] hover:text-[#26A69A]/80"
            >
              Back to Login
            </Button>
          </div>
        </form>
      ) : mode === "verify" ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="verificationCode" className="text-gray-700 font-medium">Verification Code</Label>
            <div className="relative">
              <Shield className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <Input
                id="verificationCode"
                name="verificationCode"
                type="text"
                placeholder="Enter 6-digit code"
                className="pl-10 text-center tracking-widest border-[#CFD8DC] bg-white focus:border-[#26A69A] focus:ring-[#26A69A] text-gray-800 placeholder:text-gray-400 rounded-lg"
                value={formData.verificationCode}
                onChange={handleChange}
                required
                maxLength={6}
              />
            </div>
            <p className="text-xs text-gray-500">
              Enter the 6-digit code we sent to your email and phone number.
              <br />
              <span className="font-semibold text-gray-600">(For demo, use code: 123456)</span>
            </p>
          </div>
          
          <Button 
            type="submit" 
            className="w-full mt-6 group bg-[#26A69A] hover:bg-[#26A69A]/90 rounded-lg font-medium transition-transform hover:scale-[1.05]"
            disabled={isLoading}
          >
            {isLoading ? (
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <>
                Verify Account
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </Button>
          
          <div className="mt-4 text-center">
            <Button 
              variant="link" 
              onClick={() => {
                setVerificationProgress(0);
                setMode(formData.otpPhone ? "otp" : "register");
              }}
              type="button"
              className="text-sm text-[#26A69A] hover:text-[#26A69A]/80"
            >
              Back to {formData.otpPhone ? "OTP Login" : "Registration"}
            </Button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "register" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700 font-medium">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Smith"
                    className="pl-10 border-[#CFD8DC] bg-white focus:border-[#26A69A] focus:ring-[#26A69A] text-gray-800 placeholder:text-gray-400 rounded-lg transition-all duration-300"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-gray-700 font-medium">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="9876543210"
                    className={cn("pl-10 border-[#CFD8DC] bg-white focus:border-[#26A69A] focus:ring-[#26A69A] text-gray-800 placeholder:text-gray-400 rounded-lg transition-all duration-300", errors.phone && "border-red-500")}
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address" className="text-gray-700 font-medium">Address</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <Input
                    id="address"
                    name="address"
                    type="text"
                    placeholder="123 Main Street"
                    className="pl-10 border-[#CFD8DC] bg-white focus:border-[#26A69A] focus:ring-[#26A69A] text-gray-800 placeholder:text-gray-400 rounded-lg transition-all duration-300"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="constituency" className="text-gray-700 font-medium">Constituency</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 z-10" />
                  <Select 
                    value={formData.constituency}
                    onValueChange={handleConstituencyChange}
                  >
                    <SelectTrigger id="constituency" className="pl-10 border-[#CFD8DC] bg-white focus:border-[#26A69A] text-gray-800 rounded-lg">
                      <SelectValue placeholder="Select constituency" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-[#CFD8DC] text-gray-800 rounded-lg">
                      {CONSTITUENCIES.map((c) => (
                        <SelectItem key={c} value={c} className="focus:bg-[#26A69A]/10 focus:text-[#26A69A]">{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </>
          )}
          
          {(mode === "login" || mode === "register") && (
            <>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    className={cn("pl-10 border-[#CFD8DC] bg-white focus:border-[#26A69A] focus:ring-[#26A69A] text-gray-800 placeholder:text-gray-400 rounded-lg transition-all duration-300", errors.email && "border-red-500")}
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className={cn("pl-10 pr-10 border-[#CFD8DC] bg-white focus:border-[#26A69A] focus:ring-[#26A69A] text-gray-800 placeholder:text-gray-400 rounded-lg transition-all duration-300", errors.password && "border-red-500")}
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
              </div>
              
              <Button 
                type="submit" 
                className="w-full mt-6 group bg-[#26A69A] hover:bg-[#26A69A]/90 rounded-lg font-medium shadow-md shadow-[#26A69A]/20 transition-transform hover:scale-[1.05] text-white py-6"
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
              
              {mode === "login" && (
                <div className="mt-2 text-center">
                  <Button 
                    variant="link" 
                    type="button"
                    className="text-sm text-[#26A69A] hover:text-[#26A69A]/80"
                  >
                    Forgot password?
                  </Button>
                </div>
              )}
              
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">Or continue with</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <SocialButton 
                  onClick={() => handleSocialLogin("Google")} 
                  icon={<GoogleIcon className="h-5 w-5" />}
                  label="Login with Google"
                >
                  Google
                </SocialButton>
                
                <SocialButton 
                  onClick={() => handleSocialLogin("GitHub")} 
                  icon={<GithubIcon className="h-5 w-5" />}
                  label="Login with GitHub"
                >
                  GitHub
                </SocialButton>
                
                <SocialButton 
                  onClick={handleOtpLogin} 
                  icon={<KeyRound className="h-5 w-5" />}
                  label="Login with OTP"
                >
                  OTP
                </SocialButton>
              </div>
            </>
          )}
        </form>
      )}
    </div>
  );
};

export default AuthForm;
