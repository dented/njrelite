export type StaffType = "Coaches" | "Support";

export type StaffMember = {
  id: string;
  name: string;
  type: StaffType;
  role: string;
  bio: string;
  photo: string;
};

export const staff: StaffMember[] = [
  {
    id: "staff-1",
    name: "Jane Smith",
    type: "Coaches",
    role: "Head Coach",
    bio: "Skill development, systems, and leadership habits.",
    photo: "/images/coach-01.jpg",
  },
  {
    id: "staff-2",
    name: "Mike Johnson",
    type: "Coaches",
    role: "Assistant Coach",
    bio: "Video review, special teams, and game preparation.",
    photo: "/images/coach-02.jpg",
  },
  {
    id: "staff-3",
    name: "Sarah Lee",
    type: "Support",
    role: "Goalie Development",
    bio: "Positioning, tracking, and elite goalie habits.",
    photo: "/images/coach-03.jpg",
  },
  {
    id: "staff-4",
    name: "Chris Martin",
    type: "Support",
    role: "Athletic Therapist",
    bio: "Recovery planning, injury prevention, and return-to-play support.",
    photo: "/images/coach-01.jpg",
  },
];
