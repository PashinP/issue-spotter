
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { EyeOff, Send, LoaderCircle } from "lucide-react";
import RatingStars from "./RatingStars";

interface FeedbackFormProps {
  departmentId: string;
  departmentName: string;
  issueId: string;
  issueTitle: string;
  onSubmitSuccess: () => void;
  onCancel: () => void;
}

const FeedbackForm = ({
  departmentId,
  departmentName,
  issueId,
  issueTitle,
  onSubmitSuccess,
  onCancel
}: FeedbackFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    responseTime: 0,
    workQuality: 0,
    satisfaction: 0,
    comment: "",
    isAnonymous: false,
    publishFeedback: true
  });

  const { toast } = useToast();

  const handleRatingChange = (type: 'responseTime' | 'workQuality' | 'satisfaction', value: number) => {
    setFormData(prev => ({ ...prev, [type]: value }));
  };

  const isFormValid = () => {
    return formData.responseTime > 0 && formData.workQuality > 0 && formData.satisfaction > 0;
  };

  const handleSubmit = () => {
    if (!isFormValid()) {
      toast({
        title: "Please complete your rating",
        description: "All rating categories are required",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    // In a real app, this would be an API call
    setTimeout(() => {
      // Store the feedback in localStorage for now
      const feedbacks = JSON.parse(localStorage.getItem("feedbacks") || "[]");
      
      const newFeedback = {
        id: Date.now().toString(),
        issueId,
        issueTitle,
        departmentId,
        departmentName,
        rating: {
          responseTime: formData.responseTime,
          workQuality: formData.workQuality,
          satisfaction: formData.satisfaction,
        },
        comment: formData.comment,
        isAnonymous: formData.isAnonymous,
        published: formData.publishFeedback,
        createdAt: new Date().toISOString()
      };

      feedbacks.push(newFeedback);
      localStorage.setItem("feedbacks", JSON.stringify(feedbacks));

      // If user wants to publish feedback, update the issue with rating
      if (formData.publishFeedback) {
        const complaints = JSON.parse(localStorage.getItem("complaints") || "[]");
        const updatedComplaints = complaints.map((complaint: any) => {
          if (complaint.id === issueId) {
            return {
              ...complaint,
              rating: {
                responseTime: formData.responseTime,
                workQuality: formData.workQuality,
                satisfaction: formData.satisfaction,
                comment: formData.comment,
              },
              hasFeedback: true
            };
          }
          return complaint;
        });
        localStorage.setItem("complaints", JSON.stringify(updatedComplaints));
      }

      setIsSubmitting(false);
      
      toast({
        title: "Feedback submitted",
        description: "Thank you for your feedback!"
      });
      
      onSubmitSuccess();
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">Rate Your Experience</h3>
        <p className="text-sm text-muted-foreground">
          Please rate your experience with {departmentName}'s handling of your issue:
          "{issueTitle}"
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Response Time</Label>
            <RatingStars 
              initialRating={formData.responseTime} 
              onChange={(rating) => handleRatingChange('responseTime', rating)}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Work Quality</Label>
            <RatingStars 
              initialRating={formData.workQuality} 
              onChange={(rating) => handleRatingChange('workQuality', rating)}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label>Overall Satisfaction</Label>
          <RatingStars 
            initialRating={formData.satisfaction}
            onChange={(rating) => handleRatingChange('satisfaction', rating)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="comment">Additional Comments (Optional)</Label>
          <Textarea
            id="comment"
            placeholder="Share your experience..."
            value={formData.comment}
            onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
          />
        </div>
        
        <div className="space-y-4 bg-muted/30 p-4 rounded-md">
          <div className="flex items-center justify-between">
            <Label htmlFor="anonymous" className="flex items-center gap-2 cursor-pointer">
              <EyeOff className="h-4 w-4" />
              Submit Anonymously
            </Label>
            <Switch
              id="anonymous"
              checked={formData.isAnonymous}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isAnonymous: checked }))}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="publish" className="flex items-center gap-2 cursor-pointer">
              <span>Publish feedback publicly</span>
            </Label>
            <Switch
              id="publish"
              checked={formData.publishFeedback}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, publishFeedback: checked }))}
            />
          </div>
          
          <p className="text-xs text-muted-foreground mt-2">
            {formData.publishFeedback 
              ? "Your feedback will be visible to other users on the platform."
              : "Your feedback will only be shared with the department."}
          </p>
        </div>
      </div>
      
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        
        <Button onClick={handleSubmit} disabled={isSubmitting || !isFormValid()}>
          {isSubmitting ? (
            <>
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Submit Feedback
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default FeedbackForm;
