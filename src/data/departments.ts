
import { 
  MapPin, Trash2, Construction, LightbulbOff, Plus, 
  Map, Building, Shield, AlertTriangle, Droplets, Zap, Wifi
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

// Department data with specific issue categories
export const DEPARTMENTS: Department[] = [
  { 
    id: "mcd", 
    name: "Municipal Corporation of Delhi (MCD)",
    issues: [
      { id: "pothole", name: "Potholes in my area", icon: Map, description: "Report potholes or damaged roads that need repair" },
      { id: "garbage", name: "Garbage not collected", icon: Trash2, description: "Report issues with garbage collection or dumping" },
      { id: "drainage", name: "Drainage issues", icon: Droplets, description: "Report clogged drains or water logging problems" },
      { id: "park", name: "Park maintenance", icon: Map, description: "Report issues with public parks or green spaces" }
    ]
  },
  { 
    id: "pwd", 
    name: "Public Works Department (PWD)",
    issues: [
      { id: "road", name: "Road damage", icon: Map, description: "Report damages to major roads or highways" },
      { id: "bridge", name: "Bridge/flyover issues", icon: Map, description: "Report issues with bridges or flyovers" },
      { id: "construction", name: "Illegal construction", icon: Construction, description: "Report unauthorized building activity" },
      { id: "sidewalk", name: "Sidewalk problems", icon: Map, description: "Report damaged footpaths or sidewalks" }
    ]
  },
  { 
    id: "dda", 
    name: "Delhi Development Authority (DDA)",
    issues: [
      { id: "land", name: "Land encroachment", icon: Map, description: "Report unauthorized encroachment on DDA land" },
      { id: "housing", name: "Housing scheme issues", icon: Building, description: "Report issues with DDA housing schemes" },
      { id: "park", name: "Park maintenance", icon: Map, description: "Report issues with DDA parks or recreational areas" },
      { id: "construction", name: "Unauthorized construction", icon: Construction, description: "Report illegal construction on DDA property" }
    ]
  },
  { 
    id: "police", 
    name: "Delhi Police",
    issues: [
      { id: "security", name: "Security concerns", icon: Shield, description: "Report security concerns in your area" },
      { id: "traffic", name: "Traffic violations", icon: AlertTriangle, description: "Report persistent traffic rule violations" },
      { id: "noise", name: "Noise pollution", icon: AlertTriangle, description: "Report excessive noise in residential areas" },
      { id: "harassment", name: "Public harassment", icon: AlertTriangle, description: "Report harassment or disturbance in public areas" }
    ]
  },
  { 
    id: "water", 
    name: "Delhi Jal Board",
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
];

// Generic issues that can be used with any department
export const GENERIC_PROBLEM_TYPES: IssueType[] = [
  { 
    id: "pothole", 
    name: "Potholes in my area", 
    icon: Map,
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
    icon: Plus,
    description: "File a different type of complaint not listed above"
  },
];

export const CONSTITUENCIES = ["Rohini", "Dwarka", "Chandni Chowk", "Saket", "Mayur Vihar"];

// Helper function to get problem types for a given department
export const getProblemTypes = (departmentId: string) => {
  const selectedDepartment = DEPARTMENTS.find(dept => dept.id === departmentId);
  return selectedDepartment ? selectedDepartment.issues : GENERIC_PROBLEM_TYPES;
};
