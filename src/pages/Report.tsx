
import IssueReportForm from "@/components/report/IssueReportForm";

const Report = () => {
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
        <h1 className="text-3xl font-bold mb-2">Report an Issue</h1>
        <p className="text-muted-foreground">
          Submit your complaint to the relevant government department
        </p>
      </div>
      
      <IssueReportForm />
    </div>
  );
};

export default Report;
