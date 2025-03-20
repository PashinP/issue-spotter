
import { Issue } from "@/components/feed/IssueCard";

export const MOCK_ISSUES: Issue[] = [
  {
    id: "1",
    title: "Large pothole on Sector 3 main road",
    description: "There's a large pothole that's been causing accidents near the Sector 3 market entrance. It's approximately 3 feet wide and has damaged several vehicles already. This needs immediate attention as it's a major safety hazard, especially at night when visibility is poor.",
    location: "Sector 3 Main Road, Rohini",
    department: "Municipal Corporation of Delhi (MCD)",
    type: "pothole",
    status: "in_progress",
    upvotes: 42,
    downvotes: 3,
    comments: 15,
    createdAt: "2023-07-15T08:30:00Z",
    user: {
      name: "Rahul Sharma",
      constituency: "Rohini"
    },
    userVote: null,
    hasImage: true
  },
  {
    id: "2",
    title: "Garbage not collected for 5 days",
    description: "The garbage hasn't been collected from our street for the past 5 days. There's a large pile accumulating near the community park, causing foul smell and attracting stray animals. We've called the local collection agency multiple times but no action has been taken.",
    location: "Pocket D, Sector 8, Rohini",
    department: "Municipal Corporation of Delhi (MCD)",
    type: "garbage",
    status: "pending",
    upvotes: 27,
    downvotes: 2,
    comments: 8,
    createdAt: "2023-07-18T14:20:00Z",
    user: {
      name: "Priya Singh",
      constituency: "Rohini"
    },
    userVote: null,
    hasImage: true
  },
  {
    id: "3",
    title: "Illegal construction in residential area",
    description: "There's an unauthorized construction happening in our residential area. The builder is clearly violating the floor area ratio norms and building beyond the permitted height. Several residents have complained but no action has been taken yet.",
    location: "Block C, Sector 11, Rohini",
    department: "Delhi Development Authority (DDA)",
    type: "construction",
    status: "pending",
    upvotes: 19,
    downvotes: 5,
    comments: 12,
    createdAt: "2023-07-20T09:15:00Z",
    user: {
      name: "Amit Kumar",
      constituency: "Rohini"
    },
    userVote: null,
    hasImage: false
  },
  {
    id: "4",
    title: "Streetlight not working for weeks",
    description: "The streetlight near the children's park in Sector 5 has not been working for over three weeks now. This has made the area unsafe at night, especially for women and children. Several residents avoid using this route after sunset due to safety concerns.",
    location: "Children's Park, Sector 5, Rohini",
    department: "BSES Rajdhani Power Ltd",
    type: "streetlight",
    status: "resolved",
    upvotes: 31,
    downvotes: 0,
    comments: 7,
    createdAt: "2023-07-10T18:45:00Z",
    user: {
      name: "Sneha Gupta",
      constituency: "Rohini"
    },
    userVote: null,
    hasImage: true,
    hasFeedback: true
  },
  {
    id: "5",
    title: "Water supply disruption for 3 days",
    description: "There has been no water supply in our area for the past 3 days. We've been relying on water tankers which are irregular and insufficient. This is causing severe hardship, especially for elderly residents and families with young children.",
    location: "Pocket F, Sector 9, Rohini",
    department: "Delhi Jal Board",
    type: "custom",
    status: "in_progress",
    upvotes: 38,
    downvotes: 1,
    comments: 22,
    createdAt: "2023-07-17T11:30:00Z",
    user: {
      name: "Vikram Malhotra",
      constituency: "Rohini"
    },
    userVote: null,
    hasImage: false
  },
  {
    id: "6",
    title: "Broken sewage line causing overflow",
    description: "The main sewage line in Sector 7 market area is broken and overflowing onto the street. This is causing unsanitary conditions and making it difficult for pedestrians and shoppers. The smell is unbearable and businesses in the area are suffering.",
    location: "Market Complex, Sector 7, Rohini",
    department: "Municipal Corporation of Delhi (MCD)",
    type: "custom",
    status: "resolved",
    upvotes: 45,
    downvotes: 3,
    comments: 18,
    createdAt: "2023-07-05T13:10:00Z",
    user: {
      name: "Deepak Verma",
      constituency: "Rohini"
    },
    userVote: null,
    hasImage: true
  },
  {
    id: "7",
    title: "Traffic signal malfunctioning at major intersection",
    description: "The traffic signal at the intersection of Outer Ring Road and Sector 3 entrance is malfunctioning. It's showing green for all directions simultaneously, causing confusion and near-miss accidents. Traffic police have been informed but no action taken yet.",
    location: "Outer Ring Road & Sector 3 Intersection, Rohini",
    department: "Delhi Traffic Police",
    type: "custom",
    status: "pending",
    upvotes: 33,
    downvotes: 2,
    comments: 14,
    createdAt: "2023-07-19T16:25:00Z",
    user: {
      name: "Rajiv Malhotra",
      constituency: "Rohini"
    },
    userVote: null,
    hasImage: false
  },
  {
    id: "8",
    title: "Park maintenance neglected for months",
    description: "The community park in Sector 6 has been neglected for months. The grass is overgrown, play equipment is broken, and there's litter everywhere. This used to be a vibrant community space but is now unusable, especially for children.",
    location: "Community Park, Sector 6, Rohini",
    department: "Municipal Corporation of Delhi (MCD)",
    type: "custom",
    status: "in_progress",
    upvotes: 29,
    downvotes: 4,
    comments: 16,
    createdAt: "2023-07-16T10:45:00Z",
    user: {
      name: "Neha Sharma",
      constituency: "Rohini"
    },
    userVote: null,
    hasImage: true
  }
];
