
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, ArrowUp, MessageSquare, Clock, MapPin, Send, User, Calendar, Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Issue } from "@/components/feed/IssueCard";

// Define a custom type for Trending issues
interface TrendingIssue {
  id: number;
  title: string;
  description: string;
  department: string;
  votes: number;
  comments: number;
  hoursAgo: number;
  location?: string;
  image?: string;
  status?: "pending" | "in_progress" | "resolved";
}

const TrendingIssues = () => {
  const { toast } = useToast();
  const [selectedIssue, setSelectedIssue] = useState<TrendingIssue | null>(null);
  const [commentText, setCommentText] = useState("");
  
  // Check if user is authenticated
  const isAuthenticated = localStorage.getItem("auth") !== null;
  
  // If not authenticated, redirect to login
  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = "/login";
    }
  }, [isAuthenticated]);
  
  // Sample trending issues data
  const trendingIssues: TrendingIssue[] = [
    {
      id: 1,
      title: "Water shortage in Rohini Sector 3",
      department: "Delhi Jal Board",
      votes: 324,
      comments: 45,
      hoursAgo: 12,
      location: "Rohini Sector 3, Delhi",
      description: "There has been no water supply in our area for the last 3 days. Multiple complaints to the local office haven't resulted in any action. The entire sector is affected and residents are forced to buy water from tankers at high prices.",
      image: "https://images.unsplash.com/photo-1531241124660-d7e173a5cd2f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      status: "pending"
    },
    {
      id: 2,
      title: "Broken traffic light at Dwarka Sector 12 crossing",
      department: "Delhi Traffic Police",
      votes: 287,
      comments: 32,
      hoursAgo: 8,
      location: "Dwarka Sector 12, Delhi",
      description: "The traffic light at the main crossing has been non-functional for over a week, causing significant traffic congestion during peak hours. This is leading to dangerous situations with vehicles coming from all directions without proper traffic management.",
      image: "https://images.unsplash.com/photo-1597176116047-876a32798fcc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      status: "in_progress"
    },
    {
      id: 3,
      title: "Garbage collection delays in Mayur Vihar",
      department: "MCD",
      votes: 256,
      comments: 38,
      hoursAgo: 24,
      location: "Mayur Vihar Phase 1, Delhi",
      description: "Garbage hasn't been collected for the past 10 days in our colony. The bins are overflowing and waste is spreading onto the streets causing health hazards and foul smell. Several senior citizens in the area are falling ill due to the unsanitary conditions.",
      image: "https://images.unsplash.com/photo-1604187351574-c75ca79f5807?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      status: "pending"
    },
    {
      id: 4,
      title: "Broken drainage system causing waterlogging in Chandni Chowk",
      department: "MCD",
      votes: 224,
      comments: 29,
      hoursAgo: 36,
      location: "Chandni Chowk, Old Delhi",
      description: "The main drainage system is broken and causing severe waterlogging in the commercial area. Shops and businesses are suffering, and pedestrians are unable to walk through the area. This issue has persisted for months without any resolution.",
      status: "in_progress"
    },
    {
      id: 5,
      title: "Power outages in Saket",
      department: "BSES",
      votes: 198,
      comments: 26,
      hoursAgo: 6,
      location: "Saket, South Delhi",
      description: "We're experiencing daily power cuts lasting 4-5 hours. Despite multiple complaints to BSES, no explanation or timeline for resolution has been provided. Local businesses are suffering significant losses due to these outages.",
      image: "https://images.unsplash.com/photo-1551405780-3c5faab76c4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      status: "resolved"
    }
  ];
  
  const handleVote = (id: number) => {
    toast({
      title: "Vote Recorded",
      description: "Thank you for supporting this issue!",
    });
  };
  
  const handleViewDetails = (issue: TrendingIssue) => {
    setSelectedIssue(issue);
  };
  
  const handleCommentSubmit = () => {
    if (!commentText.trim()) return;
    
    toast({
      title: "Comment Added",
      description: "Your comment has been posted successfully.",
    });
    
    setCommentText("");
  };
  
  const getStatusBadgeClass = (status?: "pending" | "in_progress" | "resolved") => {
    switch (status) {
      case "pending":
        return "bg-yellow-500 text-white";
      case "in_progress":
        return "bg-blue-500 text-white";
      case "resolved":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };
  
  // Function to handle image loading errors
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
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
          <Card key={issue.id} className="overflow-hidden hover:shadow-lg transition-all cursor-pointer">
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
                  onClick={(e) => {
                    e.stopPropagation();
                    handleVote(issue.id);
                  }}
                >
                  <ArrowUp className="h-4 w-4" />
                  <span>{issue.votes}</span>
                </Button>
              </div>
            </CardHeader>
            
            {issue.image && (
              <div className="px-6 pb-3">
                <div className="w-full h-48 rounded-md overflow-hidden bg-muted/50">
                  <img 
                    src={issue.image} 
                    alt={issue.title}
                    className="w-full h-full object-cover"
                    onError={handleImageError}
                  />
                </div>
              </div>
            )}
            
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
                  <span>
                    {issue.status ? 
                      issue.status.replace("_", " ").charAt(0).toUpperCase() + issue.status.slice(1).replace("_", " ") : 
                      "Pending"}
                  </span>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleViewDetails(issue);
                }}
              >
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {/* Issue Details Dialog */}
      <Dialog open={!!selectedIssue} onOpenChange={(open) => !open && setSelectedIssue(null)}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedIssue && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2 mb-1">
                  <Badge className="rounded-full px-2 py-0 text-xs">
                    {selectedIssue.department}
                  </Badge>
                  
                  {selectedIssue.status && (
                    <Badge 
                      className={cn(
                        "rounded-full px-2 py-0 text-xs",
                        getStatusBadgeClass(selectedIssue.status)
                      )}
                    >
                      {selectedIssue.status.replace("_", " ").charAt(0).toUpperCase() + selectedIssue.status.slice(1).replace("_", " ")}
                    </Badge>
                  )}
                </div>
                
                <DialogTitle className="text-xl">{selectedIssue.title}</DialogTitle>
                
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                  {selectedIssue.location && (
                    <>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>{selectedIssue.location}</span>
                      </div>
                      <span>•</span>
                    </>
                  )}
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    <span>John Smith</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{selectedIssue.hoursAgo} hours ago</span>
                  </div>
                </div>
              </DialogHeader>
              
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">{selectedIssue.description}</p>
                
                {selectedIssue.image && (
                  <div className="rounded-md overflow-hidden bg-muted/50">
                    <img 
                      src={selectedIssue.image} 
                      alt={selectedIssue.title}
                      className="w-full h-auto object-cover"
                      onError={handleImageError}
                    />
                  </div>
                )}
                
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                      onClick={() => handleVote(selectedIssue.id)}
                    >
                      <ArrowUp className="h-4 w-4" />
                      <span>{selectedIssue.votes} Upvotes</span>
                    </Button>
                    <div className="flex items-center gap-1 text-muted-foreground text-sm">
                      <MessageSquare className="h-4 w-4" />
                      <span>{selectedIssue.comments} comments</span>
                    </div>
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => {
                      navigator.share({
                        title: selectedIssue.title,
                        text: selectedIssue.description,
                        url: window.location.href,
                      }).catch(() => {
                        navigator.clipboard.writeText(window.location.href);
                        toast({
                          title: "Link copied",
                          description: "The link has been copied to your clipboard."
                        });
                      });
                    }}
                  >
                    <Share2 className="h-4 w-4" />
                    <span>Share</span>
                  </Button>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Add a comment</h3>
                  <div className="flex items-start gap-2">
                    <Textarea
                      placeholder="Write your comment here..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      className="min-h-[80px] flex-1"
                    />
                    <Button
                      size="icon"
                      onClick={handleCommentSubmit}
                      disabled={!commentText.trim()}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Be respectful and constructive in your comments
                  </p>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Comments ({selectedIssue.comments})</h3>
                  
                  <div className="bg-muted/30 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-1">
                          <p className="text-sm font-medium">Rahul Kumar</p>
                          <span className="text-xs text-muted-foreground">• 2 hours ago</span>
                        </div>
                        <p className="text-sm text-muted-foreground">I've been facing this issue too. The authorities need to take immediate action.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-muted/30 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-1">
                          <p className="text-sm font-medium">Priya Singh</p>
                          <span className="text-xs text-muted-foreground">• 5 hours ago</span>
                        </div>
                        <p className="text-sm text-muted-foreground">This has been going on for too long. I've filed multiple complaints but no response.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TrendingIssues;
