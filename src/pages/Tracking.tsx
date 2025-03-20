
import IssueTracker from "@/components/tracking/IssueTracker";

const Tracking = () => {
  // Check if user is authenticated
  const isAuthenticated = localStorage.getItem("auth") !== null;
  
  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    window.location.href = "/login";
    return null;
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Track Your Issues</h1>
        <p className="text-muted-foreground">
          Monitor the status of your reported issues and rate the resolution
        </p>
      </div>
      
      <IssueTracker />
    </div>
  );
};

export default Tracking;
