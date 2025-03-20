
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { 
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Tabs, TabsContent, TabsList, TabsTrigger 
} from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import {
  Road, Trash2, Construction, LightbulbOff, Plus, 
  Check, Upload, Camera, Map, Building, LoaderCircle,
  Government, ArrowLeft, ArrowRight, Image
} from "lucide-react";
import { cn } from "@/lib/utils";

const DEPARTMENTS = [
  { id: "mcd", name: "Municipal Corporation of Delhi (MCD)" },
  { id: "pwd", name: "Public Works Department (PWD)" },
  { id: "dda", name: "Delhi Development Authority (DDA)" },
  { id: "police", name: "Delhi Police" },
  { id: "water", name: "Delhi Jal Board" },
  { id: "electricity", name: "BSES Rajdhani Power Ltd" },
];

const PROBLEM_TYPES = [
  { 
    id: "pothole", 
    name: "Potholes in my area", 
    icon: Road,
    description: "Report potholes or damaged roads that need repair"
  },
  { 
    id: "garbage", 
    name: "Garbage not collected", 
    icon: Trash2,
    description: "Report issues with garbage collection or dumping"
  },
  { 
    id: "construction", 
    name: "Illegal construction", 
    icon: Construction,
    description: "Report unauthorized building or construction activity"
  },
  { 
    id: "streetlight", 
    name: "Streetlight not working", 
    icon: LightbulbOff,
    description: "Report broken or non-functional street lighting"
  },
  { 
    id: "custom", 
    name: "Custom complaint", 
    icon: Plus,
    description: "File a different type of complaint not listed above"
  },
];

const CONSTITUENCIES = ["Rohini", "Dwarka", "Chandni Chowk", "Saket", "Mayur Vihar"];

type FormStep = "location" | "type" | "details" | "submit" | "success";

const IssueReportForm = () => {
  const [step, setStep] = useState<FormStep>("location");
  const [progress, setProgress] = useState(25);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    constituency: "Rohini",
    department: "",
    problemType: "",
    problemTypeName: "",
    details: "",
    location: "",
    images: [] as File[],
    previewUrls: [] as string[],
  });
  
  const { toast } = useToast();
  
  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    const newImages = Array.from(files);
    const newPreviewUrls = newImages.map(file => URL.createObjectURL(file));
    
    updateFormData({
      images: [...formData.images, ...newImages],
      previewUrls: [...formData.previewUrls, ...newPreviewUrls]
    });
  };
  
  const removeImage = (index: number) => {
    const newImages = [...formData.images];
    const newPreviewUrls = [...formData.previewUrls];
    
    // Revoke the object URL to prevent memory leaks
    URL.revokeObjectURL(newPreviewUrls[index]);
    
    newImages.splice(index, 1);
    newPreviewUrls.splice(index, 1);
    
    updateFormData({
      images: newImages,
      previewUrls: newPreviewUrls
    });
  };
  
  const nextStep = () => {
    if (step === "location") {
      if (!formData.department) {
        toast({
          title: "Please select a department",
          variant: "destructive"
        });
        return;
      }
      setStep("type");
      setProgress(50);
    } else if (step === "type") {
      if (!formData.problemType) {
        toast({
          title: "Please select a problem type",
          variant: "destructive"
        });
        return;
      }
      setStep("details");
      setProgress(75);
    } else if (step === "details") {
      if (!formData.details || !formData.location) {
        toast({
          title: "Please fill all required fields",
          variant: "destructive"
        });
        return;
      }
      setStep("submit");
      setProgress(90);
    } else if (step === "submit") {
      submitComplaint();
    }
  };
  
  const prevStep = () => {
    if (step === "type") {
      setStep("location");
      setProgress(25);
    } else if (step === "details") {
      setStep("type");
      setProgress(50);
    } else if (step === "submit") {
      setStep("details");
      setProgress(75);
    }
  };
  
  const submitComplaint = () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setStep("success");
      setProgress(100);
      
      // Store complaint in localStorage
      const complaints = JSON.parse(localStorage.getItem("complaints") || "[]");
      complaints.push({
        id: Date.now().toString(),
        title: formData.problemTypeName || PROBLEM_TYPES.find(t => t.id === formData.problemType)?.name,
        description: formData.details,
        location: formData.location,
        department: DEPARTMENTS.find(d => d.id === formData.department)?.name,
        type: formData.problemType,
        status: "pending",
        upvotes: 0,
        downvotes: 0,
        comments: 0,
        createdAt: new Date().toISOString(),
        user: {
          name: "John Smith", // Would come from auth in real app
          constituency: formData.constituency
        },
        hasImage: formData.previewUrls.length > 0
      });
      localStorage.setItem("complaints", JSON.stringify(complaints));
    }, 2000);
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <Progress value={progress} className="h-2" />
      </div>
      
      <div className={cn(
        "transition-all duration-500",
        step === "success" ? "max-w-md mx-auto text-center" : ""
      )}>
        {step === "location" && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Select Location & Department</h2>
              <p className="text-muted-foreground">
                Choose your constituency and the relevant government department for your complaint.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="constituency">Constituency</Label>
                <Select 
                  value={formData.constituency}
                  onValueChange={(value) => updateFormData({ constituency: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select constituency" />
                  </SelectTrigger>
                  <SelectContent>
                    {CONSTITUENCIES.map((constituency) => (
                      <SelectItem key={constituency} value={constituency}>
                        {constituency}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Government Department</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  {DEPARTMENTS.map((dept) => (
                    <Card 
                      key={dept.id}
                      className={cn(
                        "cursor-pointer transition-all hover:shadow-md",
                        formData.department === dept.id 
                          ? "border-primary border-2" 
                          : "border border-border"
                      )}
                      onClick={() => updateFormData({ department: dept.id })}
                    >
                      <CardHeader className="p-4 pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-sm flex items-center">
                            <Government className="h-4 w-4 mr-2" />
                            {dept.name.split(" ")[0]}
                          </CardTitle>
                          {formData.department === dept.id && (
                            <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                              <Check className="h-3 w-3 text-primary-foreground" />
                            </div>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <CardDescription className="text-xs">
                          {dept.name}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => window.history.back()}
              >
                Cancel
              </Button>
              <Button 
                size="lg"
                onClick={nextStep}
              >
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
        
        {step === "type" && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Select Problem Type</h2>
              <p className="text-muted-foreground">
                Choose the category that best describes your issue.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PROBLEM_TYPES.map((type) => (
                <Card 
                  key={type.id}
                  className={cn(
                    "cursor-pointer hover:shadow-md transition-all overflow-hidden",
                    formData.problemType === type.id 
                      ? "border-primary border-2" 
                      : "border border-border"
                  )}
                  onClick={() => updateFormData({ 
                    problemType: type.id,
                    problemTypeName: type.name
                  })}
                >
                  <div className="relative">
                    {type.id !== "custom" && (
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                    )}
                    
                    <div className="p-6 flex flex-col items-center text-center relative z-10">
                      <div className={cn(
                        "flex items-center justify-center rounded-full p-3 mb-4",
                        type.id === "pothole" ? "bg-orange-100 text-orange-600" :
                        type.id === "garbage" ? "bg-green-100 text-green-600" :
                        type.id === "construction" ? "bg-blue-100 text-blue-600" :
                        type.id === "streetlight" ? "bg-yellow-100 text-yellow-600" :
                        "bg-purple-100 text-purple-600"
                      )}>
                        <type.icon className="h-6 w-6" />
                      </div>
                      
                      <h3 className="font-medium mb-2">{type.name}</h3>
                      <p className="text-xs text-muted-foreground">{type.description}</p>
                      
                      {formData.problemType === type.id && (
                        <div className="absolute top-2 right-2 h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                          <Check className="h-3 w-3 text-primary-foreground" />
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                size="lg"
                onClick={prevStep}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button 
                size="lg"
                onClick={nextStep}
              >
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
        
        {step === "details" && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Add Details</h2>
              <p className="text-muted-foreground">
                Provide more information about your issue.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="location">Specific Location</Label>
                <div className="relative">
                  <Map className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="location"
                    placeholder="e.g. Near ABC Mall, Sector 3, Rohini"
                    className="pl-10"
                    value={formData.location}
                    onChange={(e) => updateFormData({ location: e.target.value })}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="details">Complaint Details</Label>
                <Textarea
                  id="details"
                  placeholder="Describe your issue in detail"
                  className="min-h-[120px]"
                  value={formData.details}
                  onChange={(e) => updateFormData({ details: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Upload Photos (Optional)</Label>
                <div className="flex items-center justify-center border-2 border-dashed border-muted rounded-lg p-6 transition-colors hover:border-muted-foreground/50">
                  <label 
                    htmlFor="image-upload" 
                    className="flex flex-col items-center justify-center w-full cursor-pointer"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <Camera className="h-10 w-10 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Drag and drop or click to upload
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        JPG, PNG or GIF (max 10MB)
                      </p>
                    </div>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
                
                {formData.previewUrls.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {formData.previewUrls.map((url, index) => (
                      <div 
                        key={index} 
                        className="relative aspect-square rounded-md overflow-hidden"
                      >
                        <img
                          src={url}
                          alt={`Preview ${index}`}
                          className="w-full h-full object-cover"
                        />
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-1 right-1 h-6 w-6 rounded-full"
                          onClick={() => removeImage(index)}
                        >
                          <span>×</span>
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                size="lg"
                onClick={prevStep}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button 
                size="lg"
                onClick={nextStep}
              >
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
        
        {step === "submit" && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Review & Submit</h2>
              <p className="text-muted-foreground">
                Please review your complaint details before submitting.
              </p>
            </div>
            
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Complaint Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">Constituency</p>
                      <p className="text-sm text-muted-foreground">{formData.constituency}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Department</p>
                      <p className="text-sm text-muted-foreground">
                        {DEPARTMENTS.find(d => d.id === formData.department)?.name}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Problem Type</p>
                      <p className="text-sm text-muted-foreground">
                        {PROBLEM_TYPES.find(t => t.id === formData.problemType)?.name}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Location</p>
                      <p className="text-sm text-muted-foreground">{formData.location}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium">Details</p>
                    <p className="text-sm text-muted-foreground">{formData.details}</p>
                  </div>
                  
                  {formData.previewUrls.length > 0 && (
                    <div>
                      <p className="text-sm font-medium">Uploaded Images</p>
                      <div className="grid grid-cols-4 gap-2 mt-2">
                        {formData.previewUrls.map((url, index) => (
                          <div 
                            key={index} 
                            className="aspect-square rounded-md overflow-hidden"
                          >
                            <img
                              src={url}
                              alt={`Preview ${index}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                size="lg"
                onClick={prevStep}
                disabled={isSubmitting}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button 
                size="lg"
                onClick={submitComplaint}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Complaint
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
        
        {step === "success" && (
          <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col items-center justify-center">
              <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
                <Check className="h-10 w-10 text-green-600" />
              </div>
              
              <h2 className="text-2xl font-semibold mb-2">Complaint Submitted!</h2>
              <p className="text-muted-foreground text-center max-w-sm">
                Your complaint has been successfully submitted to the relevant department. You can track its status from your dashboard.
              </p>
            </div>
            
            <div className="space-y-4">
              <Button 
                size="lg" 
                className="w-full"
                onClick={() => window.location.href = "/tracking"}
              >
                Track My Complaint
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full"
                onClick={() => window.location.href = "/"}
              >
                Back to Home
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IssueReportForm;
