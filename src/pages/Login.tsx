
import AuthForm from "@/components/auth/AuthForm";

const Login = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="hidden md:block relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-secondary/80"></div>
        <img 
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
          alt="Background" 
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
        />
        <div className="relative z-10 flex flex-col justify-center items-center h-full text-white p-12">
          <h1 className="text-4xl font-bold mb-4">Citizen Connect</h1>
          <p className="text-xl max-w-md text-center">
            Report civic issues and track their resolution with your local government
          </p>
        </div>
      </div>
      
      <div className="flex flex-col justify-center p-6 md:p-12">
        <AuthForm />
      </div>
    </div>
  );
};

export default Login;
