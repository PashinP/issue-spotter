
import { useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowUp, ArrowDown, MessageCircle, Share2, User, MapPin, 
  ThumbsUp, AlertTriangle, Trash2, Construction, LightbulbOff,
  MapIcon, Calendar, Star
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface Issue {
  id: string;
  title: string;
  description: string;
  location: string;
  department: string;
  type: "pothole" | "garbage" | "construction" | "streetlight" | "custom";
  status: "pending" | "in_progress" | "resolved";
  upvotes: number;
  downvotes: number;
  comments: number;
  createdAt: string;
  user: {
    name: string;
    constituency: string;
  };
  userVote?: "up" | "down" | null;
  hasImage?: boolean;
  hasFeedback?: boolean;
  isAnonymous?: boolean;
  officialResponse?: string | null;
  rating?: {
    responseTime: number;
    workQuality: number;
    satisfaction: number;
    comment?: string;
  };
}

interface IssueCardProps {
  issue: Issue;
  onClick?: () => void;
}

const IssueCard = ({ issue, onClick }: IssueCardProps) => {
  const [votes, setVotes] = useState({
    upvotes: issue.upvotes,
    downvotes: issue.downvotes,
    userVote: issue.userVote
  });
  
  const handleVote = (type: "up" | "down") => {
    setVotes(prev => {
      if (prev.userVote === type) {
        return {
          upvotes: type === "up" ? prev.upvotes - 1 : prev.upvotes,
          downvotes: type === "down" ? prev.downvotes - 1 : prev.downvotes,
          userVote: null
        };
      }
      
      if (prev.userVote) {
        return {
          upvotes: type === "up" ? prev.upvotes + 1 : prev.upvotes - 1,
          downvotes: type === "down" ? prev.downvotes + 1 : prev.downvotes - 1,
          userVote: type
        };
      }
      
      return {
        upvotes: type === "up" ? prev.upvotes + 1 : prev.upvotes,
        downvotes: type === "down" ? prev.downvotes + 1 : prev.downvotes,
        userVote: type
      };
    });
  };
  
  const getIssueIcon = () => {
    switch (issue.type) {
      case "pothole":
        return <MapIcon className="h-4 w-4" />;
      case "garbage":
        return <Trash2 className="h-4 w-4" />;
      case "construction":
        return <Construction className="h-4 w-4" />;
      case "streetlight":
        return <LightbulbOff className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };
  
  const getStatusColor = () => {
    switch (issue.status) {
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
  
  const renderRatingStars = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star 
            key={star} 
            className={cn(
              "h-3 w-3", 
              star <= rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
            )} 
          />
        ))}
      </div>
    );
  };
  
  return (
    <div 
      className="rounded-xl transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px] border bg-card p-0 overflow-hidden"
      onClick={onClick}
    >
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex flex-col items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              className={cn(
                "rounded-full", 
                votes.userVote === "up" && "text-green-500"
              )}
              onClick={(e) => {
                e.stopPropagation();
                handleVote("up");
              }}
            >
              <ArrowUp className="h-5 w-5" />
            </Button>
            <span className="text-sm font-medium">{votes.upvotes - votes.downvotes}</span>
            <Button 
              variant="ghost" 
              size="icon" 
              className={cn(
                "rounded-full", 
                votes.userVote === "down" && "text-red-500"
              )}
              onClick={(e) => {
                e.stopPropagation();
                handleVote("down");
              }}
            >
              <ArrowDown className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Badge className="rounded-full px-2 py-0 text-xs">
                {issue.department}
              </Badge>
              <Badge className={cn("rounded-full px-2 py-0 text-xs", getStatusColor())}>
                {issue.status.replace("_", " ").charAt(0).toUpperCase() + issue.status.slice(1).replace("_", " ")}
              </Badge>
              <Badge variant="outline" className="rounded-full px-2 py-0 text-xs flex items-center gap-1">
                {getIssueIcon()}
                <span className="capitalize">{issue.type}</span>
              </Badge>
              
              {issue.isAnonymous && (
                <Badge variant="secondary" className="rounded-full px-2 py-0 text-xs">
                  Anonymous
                </Badge>
              )}
            </div>
            
            <h3 className="text-base font-medium mb-1">{issue.title}</h3>
            
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {issue.description}
            </p>
            
            {issue.hasImage && (
              <div className="rounded-md overflow-hidden mb-3 bg-muted/50 h-48 flex items-center justify-center">
                <img 
                  src={issue.type === "pothole" 
                    ? "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    : issue.type === "garbage" 
                    ? "https://images.unsplash.com/photo-1604187351574-c75ca79f5807?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    : issue.type === "construction"
                    ? "https://images.unsplash.com/photo-1503387837-b154d5074bd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    : issue.type === "streetlight"
                    ? "https://images.unsplash.com/photo-1551405780-3c5faab76c4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    : `https://source.unsplash.com/random/800x600?${issue.type}`
                  }
                  alt={issue.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            )}
            
            {issue.officialResponse && (
              <div className="bg-accent/50 rounded-md p-3 mb-3 text-sm">
                <div className="flex items-center gap-2 text-primary font-medium mb-1">
                  <Badge variant="outline" className="bg-primary/10">Official Response</Badge>
                </div>
                <p className="text-muted-foreground">{issue.officialResponse}</p>
              </div>
            )}
            
            {issue.rating && issue.status === "resolved" && (
              <div className="bg-muted/30 rounded-md p-3 mb-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600">User Rating</Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <p className="text-muted-foreground mb-1">Response Time</p>
                    {renderRatingStars(issue.rating.responseTime)}
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Work Quality</p>
                    {renderRatingStars(issue.rating.workQuality)}
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Satisfaction</p>
                    {renderRatingStars(issue.rating.satisfaction)}
                  </div>
                </div>
                
                {issue.rating.comment && (
                  <p className="text-xs text-muted-foreground mt-2 italic">
                    "{issue.rating.comment}"
                  </p>
                )}
              </div>
            )}
            
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                <span>{issue.location}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                {!issue.isAnonymous ? (
                  <>
                    <User className="h-3 w-3" />
                    <span>{issue.user.name}</span>
                  </>
                ) : (
                  <span>Anonymous User</span>
                )}
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{formatDate(issue.createdAt)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Separator />
      
      <div className="px-4 py-2 flex items-center justify-between">
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-xs gap-1"
          onClick={(e) => {
            e.stopPropagation();
            // Handle comment click
          }}
        >
          <MessageCircle className="h-4 w-4" />
          <span>{issue.comments} Comments</span>
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-xs gap-1"
          onClick={(e) => {
            e.stopPropagation();
            navigator.share({
              title: issue.title,
              text: issue.description,
              url: window.location.href,
            }).catch(() => {
              // Fallback
              navigator.clipboard.writeText(window.location.href);
            });
          }}
        >
          <Share2 className="h-4 w-4" />
          <span>Share</span>
        </Button>
      </div>
    </div>
  );
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    if (diffHours === 0) {
      const diffMinutes = Math.floor(diffTime / (1000 * 60));
      return `${diffMinutes} min${diffMinutes !== 1 ? 's' : ''} ago`;
    }
    return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
  } else if (diffDays < 7) {
    return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
  } else {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  }
}

export default IssueCard;
