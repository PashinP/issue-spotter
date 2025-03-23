
import { useState, useEffect } from "react";
import IssueTracker from "@/components/tracking/IssueTracker";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Star, MapPin, CheckCircle2, Clock, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";
import RatingStars from "@/components/ratings/RatingStars";

const Tracking = () => {
  const [userStats, setUserStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0,
    rated: 0
  });
  
  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem("auth") !== null;
    
    // If not authenticated, redirect to login
    if (!isAuthenticated) {
      window.location.href = "/login";
      return;
    }
    
    // Get user's complaints and calculate stats
    const storedComplaints = localStorage.getItem("complaints");
    if (storedComplaints) {
      const complaints = JSON.parse(storedComplaints);
      setUserStats({
        total: complaints.length,
        pending: complaints.filter((c: any) => c.status === "pending").length,
        inProgress: complaints.filter((c: any) => c.status === "in_progress").length,
        resolved: complaints.filter((c: any) => c.status === "resolved").length,
        rated: complaints.filter((c: any) => c.rating).length
      });
    }
  }, []);
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Track Your Issues</h1>
        <p className="text-muted-foreground">
          Monitor the status of your reported issues and rate the resolution
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className={cn("border-l-4 border-l-yellow-500")}>
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm flex items-center justify-between">
              <span>Pending</span>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="text-2xl font-bold">{userStats.pending}</p>
          </CardContent>
        </Card>
        
        <Card className={cn("border-l-4 border-l-blue-500")}>
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm flex items-center justify-between">
              <span>In Progress</span>
              <BarChart3 className="h-4 w-4 text-blue-500" />
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="text-2xl font-bold">{userStats.inProgress}</p>
          </CardContent>
        </Card>
        
        <Card className={cn("border-l-4 border-l-green-500")}>
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm flex items-center justify-between">
              <span>Resolved</span>
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="text-2xl font-bold">{userStats.resolved}</p>
          </CardContent>
        </Card>
        
        <Card className={cn("border-l-4 border-l-yellow-400")}>
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm flex items-center justify-between">
              <span>Rated</span>
              <Star className="h-4 w-4 text-yellow-400" />
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="text-2xl font-bold">{userStats.rated}</p>
          </CardContent>
        </Card>
      </div>
      
      {userStats.rated > 0 && (
        <Card className="mb-8">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-400" />
              Your Department Ratings
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Municipal Corporation</span>
                <div className="flex items-center gap-2">
                  <RatingStars initialRating={4} size="sm" readOnly />
                  <span className="text-sm font-medium">4.0</span>
                </div>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-sm">Public Works Department</span>
                <div className="flex items-center gap-2">
                  <RatingStars initialRating={3} size="sm" readOnly />
                  <span className="text-sm font-medium">3.0</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      <IssueTracker />
    </div>
  );
};

export default Tracking;
