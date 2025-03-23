
import { Issue } from "@/components/feed/IssueCard";

export const DEPARTMENTS = [
  { id: "mcd", name: "Municipal Corporation of Delhi (MCD)", 
    description: "Deals with basic civic infrastructure and services", 
    icon: "building" },
  { id: "pwd", name: "Public Works Department (PWD)", 
    description: "Responsible for construction and maintenance of public infrastructure",
    icon: "construction" },
  { id: "dda", name: "Delhi Development Authority (DDA)", 
    description: "Handles urban planning and development", 
    icon: "building2" },
  { id: "police", name: "Delhi Police", 
    description: "Handles law enforcement and public safety",
    icon: "shield" },
  { id: "water", name: "Delhi Jal Board", 
    description: "Responsible for water supply and sewage treatment",
    icon: "droplet" },
  { id: "electricity", name: "BSES Rajdhani Power Ltd", 
    description: "Manages electricity distribution",
    icon: "zap" },
];

export const DEPARTMENT_ISSUES = {
  mcd: [
    { id: "potholes", name: "Potholes in my area", icon: "mapIcon", 
      description: "Report potholes or damaged roads that need repair" },
    { id: "garbage", name: "Garbage not collected", icon: "trash2",
      description: "Report issues with garbage collection or dumping" },
    { id: "drains", name: "Clogged drains", icon: "droplet",
      description: "Report clogged or overflowing drains" },
    { id: "streetlight", name: "Streetlight not working", icon: "lightbulbOff",
      description: "Report broken or non-functional street lighting" },
  ],
  pwd: [
    { id: "roads", name: "Road maintenance", icon: "mapIcon",
      description: "Report issues with road maintenance or construction" },
    { id: "bridges", name: "Bridge safety concerns", icon: "arrowRightLeft",
      description: "Report safety concerns with bridges or overpasses" },
    { id: "footpaths", name: "Damaged footpaths", icon: "footprints",
      description: "Report damaged or blocked footpaths" },
  ],
  dda: [
    { id: "illegal_construction", name: "Illegal construction", icon: "construction",
      description: "Report unauthorized building or construction activity" },
    { id: "park_maintenance", name: "Park maintenance", icon: "palmtree",
      description: "Report issues with public parks and green spaces" },
    { id: "land_encroachment", name: "Land encroachment", icon: "fence",
      description: "Report encroachment on public or protected land" },
  ],
  police: [
    { id: "traffic", name: "Traffic violations", icon: "car",
      description: "Report traffic violations or congestion" },
    { id: "public_safety", name: "Public safety concern", icon: "shield",
      description: "Report public safety concerns in your area" },
    { id: "noise", name: "Noise pollution", icon: "volume2",
      description: "Report excessive noise from events, construction, etc." },
  ],
  water: [
    { id: "water_leakage", name: "Water leakage", icon: "droplet",
      description: "Report water pipe leakages or bursts" },
    { id: "water_quality", name: "Poor water quality", icon: "flame",
      description: "Report issues with water quality" },
    { id: "water_supply", name: "No water supply", icon: "xCircle",
      description: "Report interrupted or no water supply" },
  ],
  electricity: [
    { id: "power_outage", name: "Power outage", icon: "zap",
      description: "Report electricity outages in your area" },
    { id: "faulty_wiring", name: "Faulty wiring/poles", icon: "plugZap",
      description: "Report dangerous or faulty electrical infrastructure" },
    { id: "billing_issues", name: "Billing issues", icon: "receipt",
      description: "Report issues with electricity billing" },
  ],
};

export const MOCK_ISSUES: Issue[] = [
  {
    id: "1",
    title: "Massive pothole on Main Street causing accidents",
    description: "There's a huge pothole on Main Street near the market that has already caused several accidents. It's been there for weeks and is getting bigger. Multiple vehicles have been damaged. The authorities need to fix this urgently before someone gets seriously hurt.",
    location: "Main Street Market, Rohini Sector 3",
    department: "MCD",
    type: "pothole",
    status: "resolved",
    upvotes: 145,
    downvotes: 2,
    comments: 32,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    user: {
      name: "Raj Sharma",
      constituency: "Rohini"
    },
    hasImage: true,
    hasFeedback: true,
    isAnonymous: false,
    officialResponse: "Thank you for bringing this to our attention. We have dispatched a repair team and the pothole has been fixed. Please let us know if you notice any other issues in the area.",
    rating: {
      responseTime: 4,
      workQuality: 5,
      satisfaction: 4,
      comment: "Great work! They fixed it quickly and the repair seems durable. Very happy with the response."
    }
  },
  {
    id: "2",
    title: "Garbage not collected for 2 weeks in Sector 7",
    description: "The garbage collection service has not come to our area for the past 2 weeks. Waste is piling up and causing a health hazard. There's a terrible smell and stray animals are spreading the garbage around. We've tried calling the local sanitation department multiple times but no action has been taken.",
    location: "D-Block, Sector 7, Rohini",
    department: "MCD",
    type: "garbage",
    status: "in_progress",
    upvotes: 89,
    downvotes: 0,
    comments: 17,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    user: {
      name: "Priya Patel",
      constituency: "Rohini"
    },
    hasImage: true,
    hasFeedback: false,
    isAnonymous: false,
    officialResponse: "We apologize for the inconvenience. Due to staff shortages, there has been a delay in garbage collection. We have rescheduled and a team will visit your area tomorrow morning. We're implementing a more regular schedule to prevent this from happening again."
  },
  {
    id: "3",
    title: "Illegal construction in residential zone",
    description: "There is unauthorized construction happening in our residential area. They are building a commercial complex in a zone marked for residential use only. Construction goes on late at night causing disturbance to residents. They don't seem to have proper permits and are ignoring building codes.",
    location: "Plot 23, E-Block, Dwarka Sector 12",
    department: "DDA",
    type: "construction",
    status: "pending",
    upvotes: 56,
    downvotes: 4,
    comments: 8,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    user: {
      name: "Vikram Singh",
      constituency: "Dwarka"
    },
    hasImage: false,
    hasFeedback: false,
    isAnonymous: true,
    officialResponse: null
  },
  {
    id: "4",
    title: "Street lights not working for over a month",
    description: "All the street lights on our road have been non-functional for over a month now. The entire street is completely dark at night making it unsafe for residents, especially women and elderly people. There have been reports of thefts and safety incidents in the area due to the darkness.",
    location: "Road 5, Chandni Chowk Market Area",
    department: "BSES Rajdhani Power Ltd",
    type: "streetlight",
    status: "resolved",
    upvotes: 72,
    downvotes: 1,
    comments: 14,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString(),
    user: {
      name: "Anjali Kapoor",
      constituency: "Chandni Chowk"
    },
    hasImage: false,
    hasFeedback: true,
    isAnonymous: false,
    officialResponse: "Our maintenance team has repaired the street lights in your area. The issue was due to a damaged underground cable which has now been replaced.",
    rating: {
      responseTime: 2,
      workQuality: 3,
      satisfaction: 3,
      comment: "They fixed the lights but it took longer than promised. Some lights are still dimmer than they should be."
    }
  },
  {
    id: "5",
    title: "Water contamination issue in Saket",
    description: "The water supply in our area has been contaminated for the past week. The water appears brownish and has a foul smell. Several residents have reported stomach illness. We need immediate intervention as this is affecting the health of many families including young children and elderly people.",
    location: "B-Block, Saket",
    department: "Delhi Jal Board",
    type: "custom",
    status: "in_progress",
    upvotes: 211,
    downvotes: 3,
    comments: 47,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
    user: {
      name: "Rahul Mehta",
      constituency: "Saket"
    },
    hasImage: true,
    hasFeedback: false,
    isAnonymous: false,
    officialResponse: "We've identified the source of contamination and are working to fix it. Meanwhile, water tankers have been arranged for your area. We're conducting thorough testing and expect the issue to be resolved within 48 hours."
  },
  {
    id: "6",
    title: "Dangerous traffic junction needs signals",
    description: "The intersection at Main Road and Market Street is extremely dangerous. There are no traffic signals and vehicles come from all directions at high speed. I've witnessed three accidents there in the past month alone. This junction urgently needs traffic signals and speed breakers before a major accident happens.",
    location: "Main Road & Market Street Junction, Mayur Vihar",
    department: "Delhi Police",
    type: "custom",
    status: "pending",
    upvotes: 123,
    downvotes: 5,
    comments: 28,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    user: {
      name: "Sanjay Khanna",
      constituency: "Mayur Vihar"
    },
    hasImage: false,
    hasFeedback: false,
    isAnonymous: false,
    officialResponse: null
  },
  {
    id: "7",
    title: "Park in poor condition, needs maintenance",
    description: "The public park in our sector is in terrible condition. The play equipment is broken and unsafe for children, the walking paths are cracked, and there's overgrown vegetation everywhere. This used to be a great community space but now it's unusable and becoming a hangout for anti-social elements due to lack of proper lighting and maintenance.",
    location: "Community Park, Rohini Sector 9",
    department: "DDA",
    type: "custom",
    status: "in_progress",
    upvotes: 67,
    downvotes: 2,
    comments: 19,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    user: {
      name: "Meera Agarwal",
      constituency: "Rohini"
    },
    hasImage: true,
    hasFeedback: false,
    isAnonymous: false,
    officialResponse: "We have assigned a maintenance team to address the issues in the park. Work has begun on repairing the play equipment and clearing overgrown areas. We expect the improvements to be completed within 2 weeks."
  }
];
