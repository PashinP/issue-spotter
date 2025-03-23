
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import IssueReportForm from "@/components/report/IssueReportForm";

const Report = () => {
  const navigate = useNavigate();
  
  // Check if user is authenticated
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("auth") !== null;
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate]);
  
  return (
    <div className="max-w-4xl mx-auto py-6">
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
