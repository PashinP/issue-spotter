
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, Mail, Phone, MapPin, Edit2, Save, LoaderCircle, BarChart4
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    constituency: "Rohini"
  });
  
  const { toast } = useToast();
  
  // Check if user is authenticated
  const isAuthenticated = localStorage.getItem("auth") !== null;
  
  useEffect(() => {
    if (isAuthenticated) {
      // Get user data from localStorage
      const authData = JSON.parse(localStorage.getItem("auth") || "{}");
      if (authData.user) {
        setProfile({
          name: authData.user.name || "John Smith",
          email: authData.user.email || "john.smith@example.com",
          phone: authData.user.phone || "9876543210",
          address: authData.user.address || "123 Main Street, Rohini, Delhi",
          constituency: authData.user.constituency || "Rohini"
        });
      }
    } else {
      // Redirect to login if not authenticated
      window.location.href = "/login";
    }
  }, [isAuthenticated]);
  
  if (!isAuthenticated) {
    return null;
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSave = () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setIsEditing(false);
      
      // Update user data in localStorage
      const authData = JSON.parse(localStorage.getItem("auth") || "{}");
      localStorage.setItem("auth", JSON.stringify({
        ...authData,
        user: profile
      }));
      
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
    }, 1500);
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Profile</h1>
        <p className="text-muted-foreground">
          Manage your account information and track your activity
        </p>
      </div>
      
      <Tabs defaultValue="account" className="space-y-6">
        <TabsList className="grid grid-cols-2 w-full max-w-md">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Manage your personal details
                  </CardDescription>
                </div>
                <Button 
                  variant={isEditing ? "default" : "outline"} 
                  size="sm"
                  onClick={() => {
                    if (isEditing) {
                      handleSave();
                    } else {
                      setIsEditing(true);
                    }
                  }}
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
                      <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : isEditing ? (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save
                    </>
                  ) : (
                    <>
                      <Edit2 className="mr-2 h-4 w-4" />
                      Edit
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="name"
                    name="name"
                    placeholder="John Smith"
                    className="pl-10"
                    value={profile.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                    readOnly={!isEditing}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john.smith@example.com"
                    className="pl-10"
                    value={profile.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    readOnly={!isEditing}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="9876543210"
                    className="pl-10"
                    value={profile.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                    readOnly={!isEditing}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="address"
                    name="address"
                    placeholder="123 Main Street, Rohini, Delhi"
                    className="pl-10"
                    value={profile.address}
                    onChange={handleChange}
                    disabled={!isEditing}
                    readOnly={!isEditing}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="constituency">Constituency</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="constituency"
                    name="constituency"
                    placeholder="Rohini"
                    className="pl-10"
                    value={profile.constituency}
                    onChange={handleChange}
                    disabled={true}
                    readOnly={true}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Constituency cannot be changed. Please contact support for assistance.
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Account Security</CardTitle>
              <CardDescription>
                Manage your password and security settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full sm:w-auto">
                Change Password
              </Button>
              <Button variant="outline" className="w-full sm:w-auto">
                Enable Two-Factor Authentication
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="stats">
          <Card>
            <CardHeader>
              <CardTitle>Your Activity</CardTitle>
              <CardDescription>
                Statistics about your reported issues and contributions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="bg-muted/40 rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold mb-1">3</p>
                  <p className="text-sm text-muted-foreground">Total Issues Reported</p>
                </div>
                <div className="bg-muted/40 rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold mb-1 text-green-500">1</p>
                  <p className="text-sm text-muted-foreground">Resolved Issues</p>
                </div>
                <div className="bg-muted/40 rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold mb-1 text-yellow-500">2</p>
                  <p className="text-sm text-muted-foreground">Pending Issues</p>
                </div>
                <div className="bg-muted/40 rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold mb-1">12</p>
                  <p className="text-sm text-muted-foreground">Upvotes Given</p>
                </div>
              </div>
              
              <div className="pt-4">
                <h3 className="text-lg font-medium mb-4">Issue Category Distribution</h3>
                <div className="flex items-center h-10 mb-4">
                  <div className="w-32 text-sm">Potholes</div>
                  <div className="flex-1 bg-muted rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full rounded-full" style={{ width: "40%" }}></div>
                  </div>
                  <div className="w-8 text-right text-sm">40%</div>
                </div>
                <div className="flex items-center h-10 mb-4">
                  <div className="w-32 text-sm">Garbage</div>
                  <div className="flex-1 bg-muted rounded-full overflow-hidden">
                    <div className="bg-green-500 h-full rounded-full" style={{ width: "25%" }}></div>
                  </div>
                  <div className="w-8 text-right text-sm">25%</div>
                </div>
                <div className="flex items-center h-10 mb-4">
                  <div className="w-32 text-sm">Construction</div>
                  <div className="flex-1 bg-muted rounded-full overflow-hidden">
                    <div className="bg-yellow-500 h-full rounded-full" style={{ width: "20%" }}></div>
                  </div>
                  <div className="w-8 text-right text-sm">20%</div>
                </div>
                <div className="flex items-center h-10">
                  <div className="w-32 text-sm">Streetlight</div>
                  <div className="flex-1 bg-muted rounded-full overflow-hidden">
                    <div className="bg-purple-500 h-full rounded-full" style={{ width: "15%" }}></div>
                  </div>
                  <div className="w-8 text-right text-sm">15%</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
