export type StaffType = "Coaches" | "Support";

export type StaffMember = {
  id: string;
  name: string;
  type: StaffType;
  role: string;
  bio: string;
  photo: string;
  sortOrder: number;
};
