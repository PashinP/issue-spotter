
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
  DialogFooter, DialogHeader, DialogTitle
} from "@/components/ui/dialog";
import { 
  CheckCircle2, Clock, Search, Star, MapPin, AlertTriangle,
  ArrowUpRight, Hourglass, LoaderCircle, FileCheck, User, Calendar,
  ImageOff
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Issue } from "../feed/IssueCard";
import { MOCK_ISSUES } from "@/lib/mock-data";
import FeedbackForm from "../ratings/FeedbackForm";
import RatingStars from "../ratings/RatingStars";

const IssueTracker = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [filteredIssues, setFilteredIssues] = useState<Issue[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [imageStates, setImageStates] = useState<Record<string, { loaded: boolean, error: boolean }>>({});
  
  const { toast } = useToast();
  
  useEffect(() => {
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
    
    if (searchQuery) {
      result = result.filter(
        issue => 
          issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          issue.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          issue.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (activeTab !== "all") {
      result = result.filter(issue => issue.status === activeTab);
    }
    
    setFilteredIssues(result);
    
    // Initialize image states for new issues
    const initialStates: Record<string, { loaded: boolean, error: boolean }> = { ...imageStates };
    result.forEach(issue => {
      if (!initialStates[issue.id]) {
        initialStates[issue.id] = { loaded: false, error: false };
      }
    });
    setImageStates(initialStates);
  }, [issues, searchQuery, activeTab]);

  const handleFeedbackSubmitted = () => {
    setShowFeedbackModal(false);
    
    const storedComplaints = localStorage.getItem("complaints");
    if (storedComplaints) {
      const parsedComplaints = JSON.parse(storedComplaints);
      setIssues([...parsedComplaints, ...MOCK_ISSUES.slice(0, 2)]);
    }
    
    toast({
      title: "Feedback submitted",
      description: "Thank you for rating the department's service",
    });
  };
  
  // Handle image error
  const handleImageError = (issueId: string) => {
    console.log("Image failed to load for issue:", issueId);
    setImageStates(prev => ({
      ...prev,
      [issueId]: { ...prev[issueId], error: true }
    }));
  };
  
  // Handle image loaded successfully
  const handleImageLoaded = (issueId: string) => {
    setImageStates(prev => ({
      ...prev,
      [issueId]: { ...prev[issueId], loaded: true }
    }));
  };
  
  // Get a reliable image URL based on issue type
  const getIssueImageUrl = (issue: Issue) => {
    try {
      const baseUrl = "https://images.unsplash.com/";
      switch(issue.type) {
        case "pothole":
          return `${baseUrl}photo-1515162816999-a0c47dc192f7?q=80&w=800&auto=format&fit=crop`;
        case "garbage":
          return `${baseUrl}photo-1604187351574-c75ca79f5807?q=80&w=800&auto=format&fit=crop`;
        case "construction":
          return `${baseUrl}photo-1503387837-b154d5074bd2?q=80&w=800&auto=format&fit=crop`;
        case "streetlight":
          return `${baseUrl}photo-1551405780-3c5faab76c4a?q=80&w=800&auto=format&fit=crop`;
        default:
          return `${baseUrl}photo-1517178271410-0b2a6480952c?q=80&w=800&auto=format&fit=crop`;
      }
    } catch (error) {
      console.error("Error getting issue image URL:", error);
      return `${baseUrl}photo-1517178271410-0b2a6480952c?q=80&w=800&auto=format&fit=crop`;
    }
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
                  className="overflow-hidden hover:shadow-md transition-all cursor-pointer"
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
                      
                      {issue.rating && (
                        <div className="mt-2">
                          <div className="flex items-center gap-1">
                            <RatingStars 
                              initialRating={
                                (issue.rating.responseTime + issue.rating.workQuality + issue.rating.satisfaction) / 3
                              } 
                              size="sm"
                              readOnly
                            />
                            <span className="text-xs text-muted-foreground">
                              You rated this issue
                            </span>
                          </div>
                        </div>
                      )}
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
          {selectedIssue && (
            <FeedbackForm
              departmentId={selectedIssue.department.toLowerCase()}
              departmentName={selectedIssue.department}
              issueId={selectedIssue.id}
              issueTitle={selectedIssue.title}
              onSubmitSuccess={handleFeedbackSubmitted}
              onCancel={() => setShowFeedbackModal(false)}
            />
          )}
        </DialogContent>
      </Dialog>
      
      <Dialog open={!!selectedIssue && !showFeedbackModal} onOpenChange={(open) => !open && setSelectedIssue(null)}>
        {selectedIssue && (
          <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
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
              <div className="rounded-md overflow-hidden bg-muted/50 relative">
                {!imageStates[selectedIssue.id]?.loaded && !imageStates[selectedIssue.id]?.error && (
                  <div className="absolute inset-0 flex items-center justify-center bg-muted">
                    <span className="text-muted-foreground text-sm">Loading image...</span>
                  </div>
                )}
                
                {imageStates[selectedIssue.id]?.error ? (
                  <div className="w-full h-48 flex items-center justify-center bg-muted/80">
                    <ImageOff className="h-8 w-8 text-muted-foreground opacity-60 mr-2" />
                    <span className="text-muted-foreground">Image unavailable</span>
                  </div>
                ) : (
                  <img 
                    src={getIssueImageUrl(selectedIssue)} 
                    alt={selectedIssue.title}
                    className={cn(
                      "w-full h-auto object-cover max-h-64",
                      !imageStates[selectedIssue.id]?.loaded && "opacity-0"
                    )}
                    onError={() => handleImageError(selectedIssue.id)}
                    onLoad={() => handleImageLoaded(selectedIssue.id)}
                  />
                )}
              </div>
            )}
            
            {selectedIssue.rating && (
              <div className="bg-muted/30 rounded-md p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600">
                    Your Rating
                  </Badge>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Response Time</p>
                    <RatingStars
                      initialRating={selectedIssue.rating.responseTime}
                      size="sm"
                      readOnly
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Work Quality</p>
                    <RatingStars
                      initialRating={selectedIssue.rating.workQuality}
                      size="sm"
                      readOnly
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Satisfaction</p>
                    <RatingStars
                      initialRating={selectedIssue.rating.satisfaction}
                      size="sm"
                      readOnly
                    />
                  </div>
                </div>
                
                {selectedIssue.rating.comment && (
                  <div className="mt-3 text-sm italic text-muted-foreground border-t border-border pt-2">
                    "{selectedIssue.rating.comment}"
                  </div>
                )}
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
                  setShowFeedbackModal(true);
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
