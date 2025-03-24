
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Users, ArrowUp, MessageSquare, Clock } from "lucide-react";
import { useEffect } from "react";

const TrendingIssues = () => {
  const { toast } = useToast();
  
  // Check if user is authenticated
  const isAuthenticated = localStorage.getItem("auth") !== null;
  
  // If not authenticated, redirect to login
  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = "/login";
    }
  }, [isAuthenticated]);
  
  // Sample trending issues data
  const trendingIssues = [
    {
      id: 1,
      title: "Water shortage in Rohini Sector 3",
      department: "Delhi Jal Board",
      votes: 324,
      comments: 45,
      hoursAgo: 12
    },
    {
      id: 2,
      title: "Broken traffic light at Dwarka Sector 12 crossing",
      department: "Delhi Traffic Police",
      votes: 287,
      comments: 32,
      hoursAgo: 8
    },
    {
      id: 3,
      title: "Garbage collection delays in Mayur Vihar",
      department: "MCD",
      votes: 256,
      comments: 38,
      hoursAgo: 24
    },
    {
      id: 4,
      title: "Broken drainage system causing waterlogging in Chandni Chowk",
      department: "MCD",
      votes: 224,
      comments: 29,
      hoursAgo: 36
    },
    {
      id: 5,
      title: "Power outages in Saket",
      department: "BSES",
      votes: 198,
      comments: 26,
      hoursAgo: 6
    }
  ];
  
  const handleVote = (id: number) => {
    toast({
      title: "Vote Recorded",
      description: "Thank you for supporting this issue!",
    });
  };
  
  const handleViewDetails = (id: number) => {
    toast({
      title: "Issue Details",
      description: "Detailed view coming soon. This feature is under development.",
    });
  };
  
  if (!isAuthenticated) {
    return null;
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <div className="bg-primary/10 p-2 rounded-full">
          <TrendingUp className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Trending Issues</h1>
          <p className="text-muted-foreground">The most supported issues in your community</p>
        </div>
      </div>
      
      <div className="space-y-4">
        {trendingIssues.map((issue) => (
          <Card key={issue.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{issue.title}</CardTitle>
                  <CardDescription>
                    {issue.department} • {issue.hoursAgo} hours ago
                  </CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-1"
                  onClick={() => handleVote(issue.id)}
                >
                  <ArrowUp className="h-4 w-4" />
                  <span>{issue.votes}</span>
                </Button>
              </div>
            </CardHeader>
            <CardFooter className="pt-2 flex justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-muted-foreground text-sm">
                  <Users className="h-4 w-4" />
                  <span>1.2k people affected</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground text-sm">
                  <MessageSquare className="h-4 w-4" />
                  <span>{issue.comments} comments</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground text-sm">
                  <Clock className="h-4 w-4" />
                  <span>In progress</span>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => handleViewDetails(issue.id)}
              >
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TrendingIssues;
