
import { useEffect, useState } from "react";
import AuthForm from "@/components/auth/AuthForm";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Login = () => {
  const [currentTab, setCurrentTab] = useState("login");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#ECEFF1] relative overflow-hidden">
      {/* Subtle background pattern - dots */}
      <div className="absolute inset-0 pointer-events-none" 
           style={{ 
             backgroundImage: "radial-gradient(#CFD8DC 2px, transparent 2px)", 
             backgroundSize: "30px 30px"
           }}>
      </div>

      <div className="w-full max-w-md z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-poppins text-gray-800 mb-2">Login</h1>
          <p className="text-base text-gray-600 font-poppins font-light">Join the Community</p>
        </div>

        <Card className="bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] border-0">
          <CardContent className="p-8">
            <Tabs defaultValue="login" className="w-full" onValueChange={setCurrentTab}>
              <TabsList className="grid grid-cols-2 mb-8 bg-gray-100 p-1 rounded-lg">
                <TabsTrigger 
                  value="login" 
                  className="rounded-md data-[state=active]:bg-white data-[state=active]:text-[#26A69A] data-[state=active]:shadow-sm font-medium font-poppins"
                >
                  Sign In
                </TabsTrigger>
                <TabsTrigger 
                  value="register" 
                  className="rounded-md data-[state=active]:bg-white data-[state=active]:text-[#26A69A] data-[state=active]:shadow-sm font-medium font-poppins"
                >
                  Create Account
                </TabsTrigger>
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
        
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 font-poppins">
            Built by the Community, for the Community
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
