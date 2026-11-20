
export interface UserRole {
  _id: string;
  name: string;
  slug: string;
  isActive: boolean;
}

export interface UserProfile {
  _id: string;
  name: string;
  email: string;
  image?: string;
  role: string;
  bio?: string;
  phone?: string;
  location?: string;
  createdAt: string;
}

export interface ProfileContentProps {
  profile: UserProfile;
  roles: UserRole[];
  isOwnProfile: boolean;
  onEdit?: () => void;
  onMessage?: () => void;
}
