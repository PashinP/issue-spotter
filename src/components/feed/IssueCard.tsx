
import { useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowUp, ArrowDown, MessageCircle, Share2, User, MapPin, 
  ThumbsUp, AlertTriangle, Trash2, Road, Construction, LightbulbOff 
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
      // If already voted this type, remove vote
      if (prev.userVote === type) {
        return {
          upvotes: type === "up" ? prev.upvotes - 1 : prev.upvotes,
          downvotes: type === "down" ? prev.downvotes - 1 : prev.downvotes,
          userVote: null
        };
      }
      
      // If changing vote
      if (prev.userVote) {
        return {
          upvotes: type === "up" ? prev.upvotes + 1 : prev.upvotes - 1,
          downvotes: type === "down" ? prev.downvotes + 1 : prev.downvotes - 1,
          userVote: type
        };
      }
      
      // If new vote
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
        return <Road className="h-4 w-4" />;
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
  
  return (
    <div 
      className="glass-card overflow-hidden transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px]"
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
            </div>
            
            <h3 className="text-base font-medium mb-1">{issue.title}</h3>
            
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {issue.description}
            </p>
            
            {issue.hasImage && (
              <div className="rounded-md overflow-hidden mb-3 bg-muted/50 h-48 flex items-center justify-center">
                <img 
                  src={`https://source.unsplash.com/random/800x600?${issue.type}`} 
                  alt={issue.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            )}
            
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                <span>{issue.location}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <User className="h-3 w-3" />
                <span>{issue.user.name}</span>
              </div>
              <span>•</span>
              <span>{formatDate(issue.createdAt)}</span>
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

// Helper function to format date
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
