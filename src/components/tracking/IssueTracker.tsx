
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { 
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { 
  Dialog, DialogContent, DialogDescription, 
  DialogFooter, DialogHeader, DialogTitle, DialogTrigger 
} from "@/components/ui/dialog";
import { 
  CheckCircle2, Clock, Search, Star, MapPin, AlertTriangle,
  ArrowUpRight, Hourglass, LoaderCircle, FileCheck, User, Calendar
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Issue } from "../feed/IssueCard";
import { MOCK_ISSUES } from "@/lib/mock-data";

const IssueTracker = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [filteredIssues, setFilteredIssues] = useState<Issue[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedback, setFeedback] = useState({
    responseTime: 0,
    workQuality: 0,
    satisfaction: 0,
    comments: ""
  });
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);
  
  const { toast } = useToast();
  
  useEffect(() => {
    // Get complaints from localStorage or use mock data
    const storedComplaints = localStorage.getItem("complaints");
    if (storedComplaints) {
      const parsedComplaints = JSON.parse(storedComplaints);
      setIssues([...parsedComplaints, ...MOCK_ISSUES.slice(0, 2)]);
    } else {
      setIssues(MOCK_ISSUES.slice(0, 5));
    }
  }, []);
  
  useEffect(() => {
    let result = [...issues];
    
    // Filter by search query
    if (searchQuery) {
      result = result.filter(
        issue => 
          issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          issue.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          issue.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by tab
    if (activeTab !== "all") {
      result = result.filter(issue => issue.status === activeTab);
    }
    
    setFilteredIssues(result);
  }, [issues, searchQuery, activeTab]);
  
  const handleFeedbackChange = (type: keyof typeof feedback, value: number | string) => {
    setFeedback(prev => ({ ...prev, [type]: value }));
  };
  
  const submitFeedback = () => {
    setIsSubmittingFeedback(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmittingFeedback(false);
      setShowFeedbackModal(false);
      
      // Update the issue in the local state
      if (selectedIssue) {
        const updatedIssues = issues.map(issue => 
          issue.id === selectedIssue.id 
            ? { ...issue, hasFeedback: true } 
            : issue
        );
        setIssues(updatedIssues);
      }
      
      toast({
        title: "Feedback submitted",
        description: "Thank you for your feedback!",
      });
    }, 1500);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search your complaints..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="all">All Issues</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="in_progress">In Progress</TabsTrigger>
          <TabsTrigger value="resolved">Resolved</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="mt-6">
          {filteredIssues.length === 0 ? (
            <div className="text-center py-8">
              <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No complaints found</h3>
              <p className="text-muted-foreground">
                {activeTab === "all" 
                  ? "You haven't filed any complaints yet." 
                  : `You don't have any ${activeTab.replace("_", " ")} complaints.`}
              </p>
              <Button className="mt-4" onClick={() => window.location.href = "/report"}>
                Report an Issue
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredIssues.map((issue) => (
                <Card 
                  key={issue.id}
                  className="overflow-hidden hover:shadow-md transition-all"
                  onClick={() => setSelectedIssue(issue)}
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="flex-1 p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge 
                          className={cn(
                            "rounded-full px-2 py-0 text-xs",
                            issue.status === "pending" 
                              ? "bg-yellow-500 text-white" 
                              : issue.status === "in_progress" 
                              ? "bg-blue-500 text-white" 
                              : "bg-green-500 text-white"
                          )}
                        >
                          {issue.status === "pending" && "Pending"}
                          {issue.status === "in_progress" && "In Progress"}
                          {issue.status === "resolved" && "Resolved"}
                        </Badge>
                        
                        <Badge className="rounded-full px-2 py-0 text-xs">
                          {issue.department}
                        </Badge>
                      </div>
                      
                      <h3 className="font-medium mb-1">{issue.title}</h3>
                      
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{issue.location}</span>
                        </div>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(issue.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground line-clamp-2">{issue.description}</p>
                    </div>
                    
                    <div className="flex md:flex-col justify-between border-t md:border-t-0 md:border-l border-border md:w-48 p-4 bg-muted/30">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Status</p>
                        <div className="flex items-center">
                          {issue.status === "pending" && (
                            <Hourglass className="h-4 w-4 text-yellow-500 mr-1" />
                          )}
                          {issue.status === "in_progress" && (
                            <LoaderCircle className="h-4 w-4 text-blue-500 mr-1" />
                          )}
                          {issue.status === "resolved" && (
                            <CheckCircle2 className="h-4 w-4 text-green-500 mr-1" />
                          )}
                          <span className="font-medium text-sm capitalize">
                            {issue.status.replace("_", " ")}
                          </span>
                        </div>
                      </div>
                      
                      <Button 
                        size="sm" 
                        className="text-xs"
                        variant={issue.status === "resolved" && !issue.hasFeedback ? "default" : "outline"}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (issue.status === "resolved" && !issue.hasFeedback) {
                            setSelectedIssue(issue);
                            setShowFeedbackModal(true);
                          } else {
                            setSelectedIssue(issue);
                          }
                        }}
                      >
                        {issue.status === "resolved" && !issue.hasFeedback ? (
                          <>
                            <Star className="h-3 w-3 mr-1" />
                            Rate
                          </>
                        ) : (
                          <>
                            <ArrowUpRight className="h-3 w-3 mr-1" />
                            View
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      <Dialog open={showFeedbackModal} onOpenChange={setShowFeedbackModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Rate Your Experience</DialogTitle>
            <DialogDescription>
              Help us improve by rating the resolution of your complaint.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">Response Time</p>
              <div className="flex items-center justify-between">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Button
                    key={star}
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "rounded-full h-10 w-10",
                      feedback.responseTime >= star ? "text-yellow-500" : "text-muted"
                    )}
                    onClick={() => handleFeedbackChange("responseTime", star)}
                  >
                    <Star className="h-6 w-6" fill={feedback.responseTime >= star ? "currentColor" : "none"} />
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-medium">Work Quality</p>
              <div className="flex items-center justify-between">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Button
                    key={star}
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "rounded-full h-10 w-10",
                      feedback.workQuality >= star ? "text-yellow-500" : "text-muted"
                    )}
                    onClick={() => handleFeedbackChange("workQuality", star)}
                  >
                    <Star className="h-6 w-6" fill={feedback.workQuality >= star ? "currentColor" : "none"} />
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-medium">Overall Satisfaction</p>
              <div className="flex items-center justify-between">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Button
                    key={star}
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "rounded-full h-10 w-10",
                      feedback.satisfaction >= star ? "text-yellow-500" : "text-muted"
                    )}
                    onClick={() => handleFeedbackChange("satisfaction", star)}
                  >
                    <Star className="h-6 w-6" fill={feedback.satisfaction >= star ? "currentColor" : "none"} />
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="comments" className="text-sm font-medium">
                Additional Comments
              </label>
              <textarea
                id="comments"
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Share your experience..."
                value={feedback.comments}
                onChange={(e) => handleFeedbackChange("comments", e.target.value)}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowFeedbackModal(false)}>
              Cancel
            </Button>
            <Button 
              onClick={submitFeedback} 
              disabled={isSubmittingFeedback || !feedback.satisfaction}
            >
              {isSubmittingFeedback ? (
                <>
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Feedback"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={!!selectedIssue && !showFeedbackModal} onOpenChange={(open) => !open && setSelectedIssue(null)}>
        {selectedIssue && (
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <div className="flex items-center gap-2 mb-1">
                <Badge 
                  className={cn(
                    "rounded-full px-2 py-0 text-xs",
                    selectedIssue.status === "pending" 
                      ? "bg-yellow-500 text-white" 
                      : selectedIssue.status === "in_progress" 
                      ? "bg-blue-500 text-white" 
                      : "bg-green-500 text-white"
                  )}
                >
                  {selectedIssue.status === "pending" && "Pending"}
                  {selectedIssue.status === "in_progress" && "In Progress"}
                  {selectedIssue.status === "resolved" && "Resolved"}
                </Badge>
                <Badge className="rounded-full px-2 py-0 text-xs">
                  {selectedIssue.department}
                </Badge>
              </div>
              
              <DialogTitle>{selectedIssue.title}</DialogTitle>
              
              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span>{selectedIssue.location}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>{new Date(selectedIssue.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </DialogHeader>
            
            <p className="text-sm">{selectedIssue.description}</p>
            
            {selectedIssue.hasImage && (
              <div className="rounded-md overflow-hidden bg-muted/50">
                <img 
                  src={`https://source.unsplash.com/random/800x600?${selectedIssue.type}`} 
                  alt={selectedIssue.title}
                  className="w-full h-auto object-cover"
                />
              </div>
            )}
            
            <div className="bg-muted rounded-md p-4 space-y-3">
              <h4 className="text-sm font-medium">Complaint Timeline</h4>
              <ol className="space-y-4">
                <li className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="rounded-full w-6 h-6 bg-green-500 flex items-center justify-center">
                      <CheckCircle2 className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-grow w-px bg-border h-full"></div>
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="text-sm font-medium">Complaint Filed</p>
                    <p className="text-xs text-muted-foreground">{new Date(selectedIssue.createdAt).toLocaleString()}</p>
                  </div>
                </li>
                
                <li className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className={cn(
                      "rounded-full w-6 h-6 flex items-center justify-center",
                      selectedIssue.status === "pending" 
                        ? "bg-muted border border-yellow-500" 
                        : "bg-green-500"
                    )}>
                      {selectedIssue.status === "pending" ? (
                        <Clock className="h-4 w-4 text-yellow-500" />
                      ) : (
                        <CheckCircle2 className="h-4 w-4 text-white" />
                      )}
                    </div>
                    <div className={cn(
                      "flex-grow w-px h-full",
                      selectedIssue.status === "pending" ? "bg-muted" : "bg-border"
                    )}></div>
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="text-sm font-medium">Under Review</p>
                    <p className="text-xs text-muted-foreground">
                      {selectedIssue.status === "pending" 
                        ? "Estimated: 1-2 business days" 
                        : "Completed on " + new Date(Date.parse(selectedIssue.createdAt) + 86400000).toLocaleDateString()}
                    </p>
                  </div>
                </li>
                
                <li className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className={cn(
                      "rounded-full w-6 h-6 flex items-center justify-center",
                      selectedIssue.status === "pending" || selectedIssue.status === "in_progress" 
                        ? "bg-muted border border-yellow-500" 
                        : "bg-green-500"
                    )}>
                      {selectedIssue.status === "pending" || selectedIssue.status === "in_progress" ? (
                        <Clock className="h-4 w-4 text-yellow-500" />
                      ) : (
                        <CheckCircle2 className="h-4 w-4 text-white" />
                      )}
                    </div>
                    <div className={cn(
                      "flex-grow w-px h-full",
                      selectedIssue.status === "pending" || selectedIssue.status === "in_progress" ? "bg-muted" : "bg-border"
                    )}></div>
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="text-sm font-medium">Assigned to Department</p>
                    <p className="text-xs text-muted-foreground">
                      {selectedIssue.status === "pending" 
                        ? "Pending"
                        : selectedIssue.status === "in_progress"
                        ? "In progress"
                        : "Completed on " + new Date(Date.parse(selectedIssue.createdAt) + 172800000).toLocaleDateString()}
                    </p>
                  </div>
                </li>
                
                <li className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className={cn(
                      "rounded-full w-6 h-6 flex items-center justify-center",
                      selectedIssue.status !== "resolved" 
                        ? "bg-muted border border-yellow-500" 
                        : "bg-green-500"
                    )}>
                      {selectedIssue.status !== "resolved" ? (
                        <Clock className="h-4 w-4 text-yellow-500" />
                      ) : (
                        <CheckCircle2 className="h-4 w-4 text-white" />
                      )}
                    </div>
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="text-sm font-medium">Issue Resolved</p>
                    <p className="text-xs text-muted-foreground">
                      {selectedIssue.status !== "resolved" 
                        ? "Estimated completion date: " + new Date(Date.parse(selectedIssue.createdAt) + 604800000).toLocaleDateString()
                        : "Completed on " + new Date(Date.parse(selectedIssue.createdAt) + 345600000).toLocaleDateString()}
                    </p>
                  </div>
                </li>
              </ol>
            </div>
            
            <DialogFooter>
              {selectedIssue.status === "resolved" && !selectedIssue.hasFeedback && (
                <Button onClick={() => {
                  setSelectedIssue(null);
                  setTimeout(() => {
                    setSelectedIssue(selectedIssue);
                    setShowFeedbackModal(true);
                  }, 100);
                }}>
                  <Star className="mr-2 h-4 w-4" />
                  Provide Feedback
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default IssueTracker;
