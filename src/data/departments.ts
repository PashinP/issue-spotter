
import { 
  MapPin, Trash2, Construction, LightbulbOff, Plus, FileText,
  Building, Shield, AlertTriangle, Droplets, Zap, Wifi, 
  Map as MapIcon, Bus, Wind, Landmark, User, Briefcase,
  BookOpen, GraduationCap, Stethoscope, Road, Bus as BusIcon
} from "lucide-react";
import { LucideIcon } from "lucide-react";

export interface IssueType {
  id: string;
  name: string;
  icon: LucideIcon;
  description: string;
}

export interface Department {
  id: string;
  name: string;
  issues: IssueType[];
}

export interface RepresentativeDetails {
  name: string;
  party: string;
  education: string;
  initiatives: string[];
  history: string;
}

// Department data with specific issue categories
export const DEPARTMENTS: Department[] = [
  { 
    id: "mcd", 
    name: "Municipal Corporation of Delhi (MCD)",
    issues: [
      { id: "pothole", name: "Potholes in my area", icon: MapIcon, description: "Report potholes or damaged roads that need repair" },
      { id: "garbage", name: "Garbage not collected", icon: Trash2, description: "Report issues with garbage collection or dumping" },
      { id: "drainage", name: "Drainage issues", icon: Droplets, description: "Report clogged drains or water logging problems" },
      { id: "park", name: "Park maintenance", icon: MapIcon, description: "Report issues with public parks or green spaces" }
    ]
  },
  { 
    id: "pwd", 
    name: "Public Works Department (PWD)",
    issues: [
      { id: "road", name: "Road damage", icon: MapIcon, description: "Report damages to major roads or highways" },
      { id: "bridge", name: "Bridge/flyover issues", icon: MapIcon, description: "Report issues with bridges or flyovers" },
      { id: "construction", name: "Illegal construction", icon: Construction, description: "Report unauthorized building activity" },
      { id: "sidewalk", name: "Sidewalk problems", icon: MapIcon, description: "Report damaged footpaths or sidewalks" }
    ]
  },
  { 
    id: "dda", 
    name: "Delhi Development Authority (DDA)",
    issues: [
      { id: "land", name: "Land encroachment", icon: MapIcon, description: "Report unauthorized encroachment on DDA land" },
      { id: "housing", name: "Housing scheme issues", icon: Building, description: "Report issues with DDA housing schemes" },
      { id: "park", name: "Park maintenance", icon: MapIcon, description: "Report issues with DDA parks or recreational areas" },
      { id: "construction", name: "Unauthorized construction", icon: Construction, description: "Report illegal construction on DDA property" }
    ]
  },
  { 
    id: "water", 
    name: "Delhi Jal Board (DJB)",
    issues: [
      { id: "supply", name: "Water supply issues", icon: Droplets, description: "Report problems with water supply" },
      { id: "quality", name: "Water quality concerns", icon: Droplets, description: "Report issues with water quality" },
      { id: "leakage", name: "Water leakage", icon: Droplets, description: "Report water pipe leakage or bursts" },
      { id: "billing", name: "Water billing problems", icon: AlertTriangle, description: "Report issues with water bills" }
    ]
  },
  { 
    id: "electricity", 
    name: "BSES Rajdhani Power Ltd",
    issues: [
      { id: "outage", name: "Power outage", icon: Zap, description: "Report power outages in your area" },
      { id: "voltage", name: "Voltage fluctuation", icon: Zap, description: "Report voltage fluctuation issues" },
      { id: "billing", name: "Electricity billing", icon: AlertTriangle, description: "Report issues with electricity bills" },
      { id: "wiring", name: "Dangerous wiring", icon: AlertTriangle, description: "Report exposed or dangerous electrical wiring" }
    ]
  },
  { 
    id: "transport", 
    name: "Transport Department",
    issues: [
      { id: "signals", name: "Traffic signal issues", icon: AlertTriangle, description: "Report broken or malfunctioning traffic signals" },
      { id: "busservice", name: "Bus service problems", icon: Bus, description: "Report issues with public bus services" },
      { id: "rto", name: "RTO-related issues", icon: FileText, description: "Report problems with vehicle registration or licensing" },
      { id: "transport", name: "Public transport complaints", icon: Bus, description: "General complaints about public transportation" }
    ]
  },
  { 
    id: "dpcc", 
    name: "Delhi Pollution Control Committee (DPCC)",
    issues: [
      { id: "air", name: "Air pollution", icon: Wind, description: "Report air pollution or smoke-related issues" },
      { id: "noise", name: "Noise pollution", icon: AlertTriangle, description: "Report excessive noise from industrial or commercial activities" },
      { id: "industrial", name: "Industrial waste", icon: Trash2, description: "Report improper disposal of industrial waste" },
      { id: "environment", name: "Environmental hazards", icon: AlertTriangle, description: "Report environmental violations or concerns" }
    ]
  },
  { 
    id: "revenue", 
    name: "Revenue Department (DMs, SDMs)",
    issues: [
      { id: "land", name: "Land disputes", icon: MapIcon, description: "Report land ownership or boundary disputes" },
      { id: "certificates", name: "Certificate issues", icon: FileText, description: "Report problems with official certificates or documents" },
      { id: "district", name: "District-level grievances", icon: Landmark, description: "Report issues that need district magistrate attention" },
      { id: "revenue", name: "Revenue-related complaints", icon: FileText, description: "Issues related to land revenue or property taxes" }
    ]
  },
  { 
    id: "lg", 
    name: "Lieutenant Governor's Office (LG)",
    issues: [
      { id: "governance", name: "Governance issues", icon: Landmark, description: "Report issues related to Delhi governance" },
      { id: "listening", name: "LG Listening Post", icon: User, description: "Submit complaints directly to the LG's office" },
      { id: "policy", name: "Policy implementation", icon: Briefcase, description: "Report issues with policy implementation" },
      { id: "other", name: "Other LG-related issues", icon: FileText, description: "Other issues that need LG office attention" }
    ]
  },
  { 
    id: "cmo", 
    name: "Chief Minister's Office (CMO)",
    issues: [
      { id: "pgms", name: "PGMS Delhi complaints", icon: FileText, description: "File complaints through Public Grievance Monitoring System" },
      { id: "governance", name: "State governance issues", icon: Landmark, description: "Report issues related to state governance" },
      { id: "policy", name: "State policy issues", icon: Briefcase, description: "Report problems with state policies" },
      { id: "services", name: "Government service issues", icon: User, description: "Report issues with government services" }
    ]
  },
  { 
    id: "mla", 
    name: "MLA/MP Representative",
    issues: [
      { id: "budget", name: "Budget allocation concerns", icon: Briefcase, description: "Report issues with local budget allocation and spending" },
      { id: "infrastructure", name: "Road and infrastructure", icon: Road, description: "Report infrastructure development needs in your area" },
      { id: "transport", name: "Public transport issues", icon: BusIcon, description: "Report public transportation problems to your representative" },
      { id: "education", name: "Education concerns", icon: GraduationCap, description: "Report education-related issues in your constituency" },
      { id: "healthcare", name: "Healthcare concerns", icon: Stethoscope, description: "Report healthcare access or quality issues" },
      { id: "utilities", name: "Water and electricity", icon: Droplets, description: "Report utility supply problems to your representative" },
      { id: "custom", name: "Other MLA/MP concerns", icon: FileText, description: "Submit other concerns to your local representative" }
    ]
  },
];

export const CONSTITUENCIES = ["Rohini", "Dwarka", "Chandni Chowk", "Saket", "Mayur Vihar"];

// Helper function to get problem types for a given department
export const getProblemTypes = (departmentId: string) => {
  const selectedDepartment = DEPARTMENTS.find(dept => dept.id === departmentId);
  return selectedDepartment ? selectedDepartment.issues : GENERIC_PROBLEM_TYPES;
};

// Representative details by constituency
export const REPRESENTATIVE_DETAILS: Record<string, RepresentativeDetails> = {
  "Rohini": {
    name: "Vijender Gupta",
    party: "Bharatiya Janata Party",
    education: "B.Com, LLB",
    initiatives: [
      "Local park development project",
      "Road infrastructure improvement",
      "Water supply enhancement initiative"
    ],
    history: "Serving as MLA since 2015, previously worked as municipal councilor and focused on urban development issues."
  },
  "Dwarka": {
    name: "Vinay Kumar Mishra",
    party: "Aam Aadmi Party",
    education: "MBA",
    initiatives: [
      "Metro connectivity extension",
      "School renovation project",
      "Community healthcare centers"
    ],
    history: "First-time MLA elected in 2020, previously worked in corporate sector with focus on infrastructure development."
  },
  "Chandni Chowk": {
    name: "Parlad Singh Sawhney",
    party: "Aam Aadmi Party",
    education: "Graduate",
    initiatives: [
      "Heritage conservation project",
      "Market area redevelopment",
      "Tourism promotion initiative"
    ],
    history: "Senior politician with over 25 years of experience in public service, focused on heritage preservation and local business development."
  },
  "Saket": {
    name: "Anil Kumar Bajpai",
    party: "Bharatiya Janata Party",
    education: "Post Graduate",
    initiatives: [
      "Water harvesting project",
      "Senior citizen welfare program",
      "Public safety enhancement"
    ],
    history: "Serving second term as MLA, previously worked in social service sector with focus on community development."
  },
  "Mayur Vihar": {
    name: "Madan Lal",
    party: "Aam Aadmi Party",
    education: "B.Sc., MBA",
    initiatives: [
      "Sports facility development",
      "Youth employment program",
      "Public transport improvement"
    ],
    history: "Elected in 2020, former sports personality who has focused on youth development and sports infrastructure."
  }
};

// Generic issues that can be used with any department
export const GENERIC_PROBLEM_TYPES: IssueType[] = [
  { 
    id: "pothole", 
    name: "Potholes in my area", 
    icon: MapIcon,
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
    description: "Report unauthorized building activity"
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
    icon: FileText,
    description: "File a different type of complaint not listed above"
  },
];

// Helper function to get representative details by constituency
export const getRepresentativeDetails = (constituency: string): RepresentativeDetails => {
  return REPRESENTATIVE_DETAILS[constituency] || REPRESENTATIVE_DETAILS["Rohini"];
};

