
import { useState, useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  MapPin, User, Mail, Phone, Lock, ArrowRight, 
  LoaderCircle, Shield, EyeOff, Eye, 
  MessageSquare, GithubIcon, KeyRound
} from "lucide-react";
import GoogleIcon from "@/components/icons/GoogleIcon";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

type AuthMode = "login" | "register" | "verify" | "otp";

const CONSTITUENCIES = ["Rohini", "Dwarka", "Chandni Chowk", "Saket", "Mayur Vihar"];

interface AuthFormProps {
  initialMode?: AuthMode;
  darkMode?: boolean;
}

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /^[0-9]{10}$/;

// Custom social button component for consistency
const SocialButton = ({ children, onClick, icon, label, darkMode }: { 
  children: React.ReactNode, 
  onClick: () => void, 
  icon: React.ReactNode,
  label: string,
  darkMode?: boolean
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex items-center justify-center gap-2 w-full p-2.5 
      ${darkMode 
        ? 'border-white/20 bg-white/5 hover:bg-white/10 text-white/90' 
        : 'border-gray-200 bg-white hover:bg-gray-50 text-gray-800'
      } rounded-lg backdrop-blur-sm transition-all duration-300 font-medium
      shadow-sm hover:shadow-md transform hover:scale-[1.02] active:scale-[0.98]`}
    aria-label={label}
  >
    {icon}
    {children}
  </button>
);

const AuthForm = ({ initialMode = "login", darkMode = false }: AuthFormProps) => {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [isLoading, setIsLoading] = useState(false);
  const [verificationProgress, setVerificationProgress] = useState(0);
  const [verificationTimeLeft, setVerificationTimeLeft] = useState(30);
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
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [canResend, setCanResend] = useState(false);
  const [activeLoginMethod, setActiveLoginMethod] = useState<string | null>(null);
  
  // Handle verification timer
  useEffect(() => {
    if (mode === "verify" || mode === "otp") {
      setVerificationTimeLeft(30);
      setCanResend(false);
      setVerificationProgress(0);
      
      // Clear any existing timer
      if (timerRef.current) clearInterval(timerRef.current);
      
      // Set up timer
      timerRef.current = setInterval(() => {
        setVerificationTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
        
        setVerificationProgress(prev => Math.min(prev + (100/30), 100));
      }, 1000);
    }
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [mode]);
  
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
  
  const handleResendCode = () => {
    if (!canResend) return;
    
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      setCanResend(false);
      setVerificationTimeLeft(30);
      setVerificationProgress(0);
      
      toast({
        title: "Verification code resent",
        description: `A new verification code has been sent.`,
      });
      
      // Restart timer
      if (timerRef.current) clearInterval(timerRef.current);
      
      timerRef.current = setInterval(() => {
        setVerificationTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
        
        setVerificationProgress(prev => Math.min(prev + (100/30), 100));
      }, 1000);
    }, 1500);
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
    // Highlight the selected method with animation
    setActiveLoginMethod(provider);
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      setActiveLoginMethod(null);
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
    setActiveLoginMethod("OTP");
    setTimeout(() => {
      setMode("otp");
      setActiveLoginMethod(null);
    }, 300);
  };

  const getVerificationCodeInput = () => {
    return (
      <div className="space-y-2">
        <Label htmlFor="verificationCode" className={`${darkMode ? 'text-white/80' : 'text-gray-700'} font-medium`}>Verification Code</Label>
        <div className="relative">
          <Shield className={`absolute left-3 top-2.5 h-5 w-5 ${darkMode ? 'text-white/50' : 'text-gray-400'}`} />
          <Input
            id="verificationCode"
            name="verificationCode"
            type="text"
            placeholder="Enter 6-digit code"
            className={cn(
              "pl-10 text-center tracking-widest", 
              darkMode 
                ? "border-white/10 bg-white/5 focus:border-white/30 text-white placeholder:text-white/40" 
                : "border-gray-300 bg-white focus:border-blue-300 text-gray-800 placeholder:text-gray-400",
              "rounded-lg transition-all duration-300"
            )}
            value={formData.verificationCode}
            onChange={handleChange}
            required
            maxLength={6}
          />
        </div>
        <p className={`text-xs ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
          Enter the 6-digit code we sent to your {formData.otpPhone ? 'phone number' : 'email and phone number'}.
          <br />
          <span className={`font-semibold ${darkMode ? 'text-white/80' : 'text-gray-700'}`}>(For demo, use code: 123456)</span>
        </p>
      </div>
    );
  };
  
  return (
    <div className={`w-full max-w-md mx-auto ${darkMode ? 'text-white/90' : 'text-gray-800'} transition-colors duration-300`}>
      {(mode === "verify" || mode === "otp") && (
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-1">
            <span className={darkMode ? 'text-white/80' : 'text-gray-600'}>Verification code expires in:</span>
            <span className="font-medium">{verificationTimeLeft} seconds</span>
          </div>
          <Progress 
            value={verificationProgress} 
            className={`h-2 ${darkMode ? 'bg-white/10' : 'bg-gray-100'} rounded-full overflow-hidden`} 
          />
        </div>
      )}
      
      {mode === "otp" ? (
        <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in">
          <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white/90' : 'text-gray-800'} font-poppins`}>Login with OTP</h3>
          
          <div className="space-y-2">
            <Label htmlFor="otpPhone" className={`${darkMode ? 'text-white/80' : 'text-gray-700'} font-medium`}>Phone Number</Label>
            <div className="relative">
              <Phone className={`absolute left-3 top-2.5 h-5 w-5 ${darkMode ? 'text-white/50' : 'text-gray-400'}`} />
              <Input
                id="otpPhone"
                name="otpPhone"
                type="tel"
                placeholder="Enter your phone number"
                className={cn(
                  "pl-10", 
                  darkMode 
                    ? "border-white/10 bg-white/5 focus:border-white/30 text-white placeholder:text-white/40" 
                    : "border-gray-300 bg-white focus:border-blue-300 text-gray-800 placeholder:text-gray-400",
                  "rounded-lg transition-all duration-300"
                )}
                value={formData.otpPhone}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <Button 
            type="submit" 
            className={`w-full mt-6 group rounded-lg font-medium
              transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300
              ${darkMode 
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white' 
                : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:opacity-90 text-white'
              } shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30`}
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
              className={`text-sm ${darkMode ? 'text-white/70 hover:text-white' : 'text-blue-600 hover:text-blue-700'}`}
            >
              Back to Login
            </Button>
          </div>
        </form>
      ) : mode === "verify" ? (
        <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in">
          {getVerificationCodeInput()}
          
          <Button 
            type="submit" 
            className={`w-full mt-6 group rounded-lg font-medium
              transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300
              ${darkMode 
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white' 
                : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:opacity-90 text-white'
              } shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30`}
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
          
          <div className="flex justify-between items-center mt-4">
            <Button 
              variant="link" 
              onClick={() => {
                setVerificationProgress(0);
                setMode(formData.otpPhone ? "otp" : "register");
              }}
              type="button"
              className={`text-sm ${darkMode ? 'text-white/70 hover:text-white' : 'text-blue-600 hover:text-blue-700'}`}
            >
              Back to {formData.otpPhone ? "OTP Login" : "Registration"}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              type="button"
              onClick={handleResendCode}
              disabled={!canResend || isLoading}
              className={`text-xs ${darkMode ? 'text-white/70 hover:text-white' : 'text-blue-600 hover:text-blue-700'}
                ${!canResend ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-50/10'}`}
            >
              Resend Code
            </Button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in">
          {mode === "register" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="name" className={`${darkMode ? 'text-white/80' : 'text-gray-700'} font-medium`}>Full Name</Label>
                <div className="relative">
                  <User className={`absolute left-3 top-2.5 h-5 w-5 ${darkMode ? 'text-white/50' : 'text-gray-400'}`} />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Smith"
                    className={cn(
                      "pl-10", 
                      darkMode 
                        ? "border-white/10 bg-white/5 focus:border-white/30 text-white placeholder:text-white/40" 
                        : "border-gray-300 bg-white focus:border-blue-300 text-gray-800 placeholder:text-gray-400",
                      "rounded-lg transition-all duration-300"
                    )}
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone" className={`${darkMode ? 'text-white/80' : 'text-gray-700'} font-medium`}>Phone Number</Label>
                <div className="relative">
                  <Phone className={`absolute left-3 top-2.5 h-5 w-5 ${darkMode ? 'text-white/50' : 'text-gray-400'}`} />
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="9876543210"
                    className={cn(
                      "pl-10", 
                      darkMode 
                        ? "border-white/10 bg-white/5 focus:border-white/30 text-white placeholder:text-white/40" 
                        : "border-gray-300 bg-white focus:border-blue-300 text-gray-800 placeholder:text-gray-400",
                      errors.phone && (darkMode ? "border-red-500/50" : "border-red-500"),
                      "rounded-lg transition-all duration-300"
                    )}
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                {errors.phone && <p className={`text-xs ${darkMode ? 'text-red-400' : 'text-red-500'}`}>{errors.phone}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address" className={`${darkMode ? 'text-white/80' : 'text-gray-700'} font-medium`}>Address</Label>
                <div className="relative">
                  <MapPin className={`absolute left-3 top-2.5 h-5 w-5 ${darkMode ? 'text-white/50' : 'text-gray-400'}`} />
                  <Input
                    id="address"
                    name="address"
                    type="text"
                    placeholder="123 Main Street"
                    className={cn(
                      "pl-10", 
                      darkMode 
                        ? "border-white/10 bg-white/5 focus:border-white/30 text-white placeholder:text-white/40" 
                        : "border-gray-300 bg-white focus:border-blue-300 text-gray-800 placeholder:text-gray-400",
                      "rounded-lg transition-all duration-300"
                    )}
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="constituency" className={`${darkMode ? 'text-white/80' : 'text-gray-700'} font-medium`}>Constituency</Label>
                <div className="relative">
                  <MapPin className={`absolute left-3 top-2.5 h-5 w-5 ${darkMode ? 'text-white/50' : 'text-gray-400'} z-10`} />
                  <Select 
                    value={formData.constituency}
                    onValueChange={handleConstituencyChange}
                  >
                    <SelectTrigger 
                      id="constituency" 
                      className={cn(
                        "pl-10", 
                        darkMode 
                          ? "border-white/10 bg-white/5 focus:border-white/30 text-white" 
                          : "border-gray-300 bg-white focus:border-blue-300 text-gray-800",
                        "rounded-lg transition-all duration-300"
                      )}
                    >
                      <SelectValue placeholder="Select constituency" />
                    </SelectTrigger>
                    <SelectContent className={darkMode ? "bg-gray-800/90 backdrop-blur-xl border-white/10 text-white" : "bg-white border-gray-200 text-gray-800"}>
                      {CONSTITUENCIES.map((c) => (
                        <SelectItem 
                          key={c} 
                          value={c} 
                          className={darkMode ? "focus:bg-white/10 focus:text-white" : "focus:bg-blue-50 focus:text-blue-800"}
                        >
                          {c}
                        </SelectItem>
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
                <Label htmlFor="email" className={`${darkMode ? 'text-white/80' : 'text-gray-700'} font-medium`}>Email Address</Label>
                <div className="relative">
                  <Mail className={`absolute left-3 top-2.5 h-5 w-5 ${darkMode ? 'text-white/50' : 'text-gray-400'}`} />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    className={cn(
                      "pl-10", 
                      darkMode 
                        ? "border-white/10 bg-white/5 focus:border-white/30 text-white placeholder:text-white/40" 
                        : "border-gray-300 bg-white focus:border-blue-300 text-gray-800 placeholder:text-gray-400",
                      errors.email && (darkMode ? "border-red-500/50" : "border-red-500"),
                      "rounded-lg transition-all duration-300"
                    )}
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                {errors.email && <p className={`text-xs ${darkMode ? 'text-red-400' : 'text-red-500'}`}>{errors.email}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className={`${darkMode ? 'text-white/80' : 'text-gray-700'} font-medium`}>Password</Label>
                <div className="relative">
                  <Lock className={`absolute left-3 top-2.5 h-5 w-5 ${darkMode ? 'text-white/50' : 'text-gray-400'}`} />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className={cn(
                      "pl-10 pr-10", 
                      darkMode 
                        ? "border-white/10 bg-white/5 focus:border-white/30 text-white placeholder:text-white/40" 
                        : "border-gray-300 bg-white focus:border-blue-300 text-gray-800 placeholder:text-gray-400",
                      errors.password && (darkMode ? "border-red-500/50" : "border-red-500"),
                      "rounded-lg transition-all duration-300"
                    )}
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className={`absolute right-3 top-2.5 ${darkMode ? 'text-white/50 hover:text-white/80' : 'text-gray-400 hover:text-gray-600'} transition-colors duration-200`}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && <p className={`text-xs ${darkMode ? 'text-red-400' : 'text-red-500'}`}>{errors.password}</p>}
              </div>
              
              <Button 
                type="submit" 
                className={`w-full mt-6 group rounded-lg font-medium
                  transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300
                  ${darkMode 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white' 
                    : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:opacity-90 text-white'
                  } shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30`}
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
                    className={`text-sm ${darkMode ? 'text-white/70 hover:text-white' : 'text-blue-600 hover:text-blue-700'}`}
                  >
                    Forgot password?
                  </Button>
                </div>
              )}
              
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <Separator className={`w-full border-t ${darkMode ? 'border-white/10' : 'border-gray-200'}`} />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className={`${darkMode ? 'bg-black/30 backdrop-blur-sm text-white/60' : 'bg-white text-gray-500'} px-2`}>
                    Or continue with
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className={`transition-all duration-300 transform ${activeLoginMethod === 'Google' ? 'scale-105' : ''} rounded-lg`}>
                  <SocialButton 
                    onClick={() => handleSocialLogin("Google")} 
                    icon={<GoogleIcon className="h-5 w-5" />}
                    label="Login with Google"
                    darkMode={darkMode}
                  >
                    Google
                  </SocialButton>
                </div>
                
                <div className={`transition-all duration-300 transform ${activeLoginMethod === 'GitHub' ? 'scale-105' : ''} rounded-lg`}>
                  <SocialButton 
                    onClick={() => handleSocialLogin("GitHub")} 
                    icon={<GithubIcon className="h-5 w-5" />}
                    label="Login with GitHub"
                    darkMode={darkMode}
                  >
                    GitHub
                  </SocialButton>
                </div>
                
                <div className={`transition-all duration-300 transform ${activeLoginMethod === 'OTP' ? 'scale-105' : ''} rounded-lg`}>
                  <SocialButton 
                    onClick={handleOtpLogin} 
                    icon={<KeyRound className="h-5 w-5" />}
                    label="Login with OTP"
                    darkMode={darkMode}
                  >
                    OTP
                  </SocialButton>
                </div>
              </div>
            </>
          )}
        </form>
      )}
    </div>
  );
};

export default AuthForm;
