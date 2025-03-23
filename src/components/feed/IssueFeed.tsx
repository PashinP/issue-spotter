
import { useState, useEffect } from "react";
import IssueCard, { Issue } from "./IssueCard";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, Search, Filter, User, MessageCircle, ThumbsUp, 
  Clock, Star, SlidersHorizontal, ArrowUpDown, Check,
  Share, Send
} from "lucide-react";
import { MOCK_ISSUES, DEPARTMENTS } from "@/lib/mock-data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const IssueFeed = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [filteredIssues, setFilteredIssues] = useState<Issue[]>([]);
  const [activeTab, setActiveTab] = useState("trending");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [commentText, setCommentText] = useState("");
  const [filters, setFilters] = useState({
    departments: [] as string[],
    types: [] as string[],
    status: [] as string[],
  });
  
  const { toast } = useToast();
  
  useEffect(() => {
    // Get stored complaints and combine with mock data
    const storedComplaints = localStorage.getItem("complaints");
    const localIssues = storedComplaints ? JSON.parse(storedComplaints) : [];
    
    // Simulate API call to fetch issues
    setTimeout(() => {
      setIssues([...MOCK_ISSUES, ...localIssues]);
      setFilteredIssues([...MOCK_ISSUES, ...localIssues]);
    }, 500);
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
    
    // Apply filters
    if (filters.departments.length > 0) {
      result = result.filter(issue => 
        filters.departments.includes(issue.department.toLowerCase())
      );
    }
    
    if (filters.types.length > 0) {
      result = result.filter(issue => 
        filters.types.includes(issue.type)
      );
    }
    
    if (filters.status.length > 0) {
      result = result.filter(issue => 
        filters.status.includes(issue.status)
      );
    }
    
    // Sort based on active tab
    switch (activeTab) {
      case "trending":
        result = result.sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes));
        break;
      case "recent":
        result = result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case "resolved":
        result = result.filter(issue => issue.status === "resolved");
        break;
      case "rated":
        result = result.filter(issue => issue.rating !== undefined)
          .sort((a, b) => {
            // Calculate average ratings
            const aRating = a.rating ? 
              (a.rating.satisfaction + a.rating.responseTime + a.rating.workQuality) / 3 : 0;
            const bRating = b.rating ? 
              (b.rating.satisfaction + b.rating.responseTime + b.rating.workQuality) / 3 : 0;
            return bRating - aRating;
          });
        break;
      case "my-issues":
        // In a real app, filter by current user's ID
        result = result.filter(issue => issue.user.name === "John Smith");
        break;
    }
    
    setFilteredIssues(result);
  }, [issues, activeTab, searchQuery, filters]);
  
  const submitComment = () => {
    if (!commentText.trim()) return;
    
    if (selectedIssue) {
      // In a real app, send comment to backend
      // For demo, just update the local issue
      const updatedIssue = {
        ...selectedIssue,
        comments: selectedIssue.comments + 1
      };
      
      // Update the issues array
      const updatedIssues = issues.map(issue => 
        issue.id === selectedIssue.id ? updatedIssue : issue
      );
      
      setIssues(updatedIssues);
      setFilteredIssues(updatedIssues);
      setSelectedIssue(updatedIssue);
      setCommentText("");
      
      toast({
        title: "Comment added",
        description: "Your comment has been added successfully."
      });
    }
  };
  
  return (
    <>
      <div className="mb-6 space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search issues..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="outline">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Filter Issues</DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
                By Department
              </DropdownMenuLabel>
              {DEPARTMENTS.map((dept) => (
                <DropdownMenuCheckboxItem
                  key={dept.id}
                  checked={filters.departments.includes(dept.id)}
                  onCheckedChange={(checked) => {
                    setFilters(prev => ({
                      ...prev,
                      departments: checked 
                        ? [...prev.departments, dept.id] 
                        : prev.departments.filter(d => d !== dept.id)
                    }));
                  }}
                >
                  {dept.name.split(" ")[0]}
                </DropdownMenuCheckboxItem>
              ))}
              
              <DropdownMenuSeparator />
              
              <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
                By Status
              </DropdownMenuLabel>
              <DropdownMenuCheckboxItem
                checked={filters.status.includes("pending")}
                onCheckedChange={(checked) => {
                  setFilters(prev => ({
                    ...prev,
                    status: checked 
                      ? [...prev.status, "pending"] 
                      : prev.status.filter(s => s !== "pending")
                  }));
                }}
              >
                Pending
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filters.status.includes("in_progress")}
                onCheckedChange={(checked) => {
                  setFilters(prev => ({
                    ...prev,
                    status: checked 
                      ? [...prev.status, "in_progress"] 
                      : prev.status.filter(s => s !== "in_progress")
                  }));
                }}
              >
                In Progress
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filters.status.includes("resolved")}
                onCheckedChange={(checked) => {
                  setFilters(prev => ({
                    ...prev,
                    status: checked 
                      ? [...prev.status, "resolved"] 
                      : prev.status.filter(s => s !== "resolved")
                  }));
                }}
              >
                Resolved
              </DropdownMenuCheckboxItem>
              
              <DropdownMenuSeparator />
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full justify-start text-xs font-normal"
                onClick={() => setFilters({
                  departments: [],
                  types: [],
                  status: []
                })}
              >
                Reset Filters
              </Button>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="outline">
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40">
              <DropdownMenuLabel>Sort By</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={activeTab === "trending"}
                onCheckedChange={() => setActiveTab("trending")}
              >
                Most Upvoted
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={activeTab === "recent"}
                onCheckedChange={() => setActiveTab("recent")}
              >
                Most Recent
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <Tabs defaultValue="trending" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-5 w-full">
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="resolved">Resolved</TabsTrigger>
            <TabsTrigger value="rated">Rated</TabsTrigger>
            <TabsTrigger value="my-issues">My Issues</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex items-center justify-between text-sm">
          <p className="text-muted-foreground">
            {filteredIssues.length} {filteredIssues.length === 1 ? 'issue' : 'issues'} found
          </p>
          {Object.values(filters).some(filter => filter.length > 0) && (
            <Button variant="link" size="sm" className="h-auto p-0 text-xs" onClick={() => setFilters({
              departments: [],
              types: [],
              status: []
            })}>
              Clear all filters
            </Button>
          )}
        </div>
      </div>
      
      <div className="space-y-4">
        {filteredIssues.length === 0 ? (
          <div className="text-center py-12 bg-muted/30 rounded-lg">
            <Filter className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No issues found</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              {searchQuery 
                ? `No issues matching "${searchQuery}"` 
                : activeTab === "my-issues"
                ? "You haven't filed any complaints yet."
                : "No issues found with the current filters."}
            </p>
            {activeTab === "my-issues" && (
              <Button className="mt-4" onClick={() => window.location.href = "/report"}>
                Report an Issue
              </Button>
            )}
          </div>
        ) : (
          filteredIssues.map(issue => (
            <IssueCard 
              key={issue.id} 
              issue={issue} 
              onClick={() => setSelectedIssue(issue)}
            />
          ))
        )}
      </div>
      
      <Dialog open={!!selectedIssue} onOpenChange={(open) => !open && setSelectedIssue(null)}>
        {selectedIssue && (
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <div className="flex items-center gap-2 mb-1">
                <Badge className="rounded-full px-2 py-0 text-xs">
                  {selectedIssue.department}
                </Badge>
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
                  {selectedIssue.status.replace("_", " ").charAt(0).toUpperCase() + selectedIssue.status.slice(1).replace("_", " ")}
                </Badge>
                <Badge variant="outline" className="rounded-full px-2 py-0 text-xs">
                  <span className="capitalize">{selectedIssue.type}</span>
                </Badge>
                
                {selectedIssue.isAnonymous && (
                  <Badge variant="secondary" className="rounded-full px-2 py-0 text-xs">
                    Anonymous
                  </Badge>
                )}
              </div>
              
              <DialogTitle className="text-xl">{selectedIssue.title}</DialogTitle>
              
              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span>{selectedIssue.location}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  {!selectedIssue.isAnonymous ? (
                    <>
                      <User className="h-3 w-3" />
                      <span>{selectedIssue.user.name}</span>
                    </>
                  ) : (
                    <span>Anonymous User</span>
                  )}
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{new Date(selectedIssue.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </DialogHeader>
            
            <p className="text-sm text-muted-foreground">
              {selectedIssue.description}
            </p>
            
            {selectedIssue.hasImage && (
              <div className="rounded-md overflow-hidden my-2 bg-muted/50">
                <img 
                  src={selectedIssue.type === "pothole" 
                    ? "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    : selectedIssue.type === "garbage" 
                    ? "https://images.unsplash.com/photo-1604187351574-c75ca79f5807?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    : selectedIssue.type === "construction"
                    ? "https://images.unsplash.com/photo-1503387837-b154d5074bd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    : selectedIssue.type === "streetlight"
                    ? "https://images.unsplash.com/photo-1551405780-3c5faab76c4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    : `https://source.unsplash.com/random/800x600?${selectedIssue.type}`
                  }
                  alt={selectedIssue.title}
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>
            )}
            
            {selectedIssue.officialResponse && (
              <div className="bg-accent/50 rounded-md p-3 text-sm">
                <div className="flex items-center gap-2 text-primary font-medium mb-1">
                  <Badge variant="outline" className="bg-primary/10">Official Response</Badge>
                </div>
                <p className="text-muted-foreground">{selectedIssue.officialResponse}</p>
              </div>
            )}
            
            {selectedIssue.rating && selectedIssue.status === "resolved" && (
              <div className="bg-muted/30 rounded-md p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600">User Rating</Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <p className="text-muted-foreground mb-1">Response Time</p>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          className={cn(
                            "h-3 w-3", 
                            star <= (selectedIssue.rating?.responseTime || 0) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                          )} 
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Work Quality</p>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          className={cn(
                            "h-3 w-3", 
                            star <= (selectedIssue.rating?.workQuality || 0) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                          )} 
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Satisfaction</p>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          className={cn(
                            "h-3 w-3", 
                            star <= (selectedIssue.rating?.satisfaction || 0) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                          )} 
                        />
                      ))}
                    </div>
                  </div>
                </div>
                
                {selectedIssue.rating.comment && (
                  <p className="text-xs text-muted-foreground mt-2 italic">
                    "{selectedIssue.rating.comment}"
                  </p>
                )}
              </div>
            )}
            
            <Separator />
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="h-4 w-4" />
                    <span className="text-sm">{selectedIssue.upvotes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" />
                    <span className="text-sm">{selectedIssue.comments} comments</span>
                  </div>
                </div>
                
                <div className="space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline"
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
                    <Share className="h-4 w-4 mr-1" />
                    Share
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium">Add a comment</p>
                <div className="flex items-start gap-2">
                  <Textarea 
                    placeholder="Write your comment here..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="min-h-[80px] flex-1"
                  />
                  <Button 
                    size="icon" 
                    onClick={submitComment}
                    disabled={!commentText.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Be respectful and constructive in your comments
                </p>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
};

export default IssueFeed;
