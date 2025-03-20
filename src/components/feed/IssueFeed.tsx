
import { useState, useEffect } from "react";
import IssueCard, { Issue } from "./IssueCard";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { MapPin, Search, Filter, User, MessageCircle, ThumbsUp, Clock } from "lucide-react";
import { MOCK_ISSUES } from "@/lib/mock-data";

const IssueFeed = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [filteredIssues, setFilteredIssues] = useState<Issue[]>([]);
  const [activeTab, setActiveTab] = useState("trending");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  
  useEffect(() => {
    // Simulate API call to fetch issues
    setTimeout(() => {
      setIssues(MOCK_ISSUES);
      setFilteredIssues(MOCK_ISSUES);
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
      case "my-issues":
        // In a real app, filter by current user's ID
        result = result.filter(issue => issue.user.name === "John Smith");
        break;
    }
    
    setFilteredIssues(result);
  }, [issues, activeTab, searchQuery]);
  
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
          <Button size="icon" variant="outline">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        
        <Tabs defaultValue="trending" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="resolved">Resolved</TabsTrigger>
            <TabsTrigger value="my-issues">My Issues</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="space-y-4">
        {filteredIssues.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No issues found.</p>
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
                  className={`rounded-full px-2 py-0 text-xs ${
                    selectedIssue.status === "pending" 
                      ? "bg-yellow-500 text-white" 
                      : selectedIssue.status === "in_progress" 
                      ? "bg-blue-500 text-white" 
                      : "bg-green-500 text-white"
                  }`}
                >
                  {selectedIssue.status.replace("_", " ").charAt(0).toUpperCase() + selectedIssue.status.slice(1).replace("_", " ")}
                </Badge>
                <Badge variant="outline" className="rounded-full px-2 py-0 text-xs">
                  <span className="capitalize">{selectedIssue.type}</span>
                </Badge>
              </div>
              
              <DialogTitle className="text-xl">{selectedIssue.title}</DialogTitle>
              
              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span>{selectedIssue.location}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  <span>{selectedIssue.user.name}</span>
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
                  src={`https://source.unsplash.com/random/800x600?${selectedIssue.type}`} 
                  alt={selectedIssue.title}
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>
            )}
            
            <Separator />
            
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
                <Button size="sm" variant="outline">Share</Button>
                <Button size="sm">Comment</Button>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
};

export default IssueFeed;
