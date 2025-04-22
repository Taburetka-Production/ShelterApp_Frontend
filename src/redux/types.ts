export interface Address {
  id: string | null;
  country: string;
  region: string;
  city: string;
  street: string;
  district?: string;
  apartments?: string;
  lng?: number;
  lat?: number;
}

export interface Shelter {
  id: string | null;
  name: string;
  rating: number;
  reviewsCount: number;
  animalsCount: number;
  description: string;
  imageUrl: string;
  addressId: string | null;
  address: Address;
  slug: string;
  animals?: Animal[];
  feedbacks?: Feedback[];
}

export interface User {
  id: string;
  avatarUrl: string | null;
  name: string;
  surname: string;
  age: number;
  email: string;
  userName?: string;
  phone?: string;
  roles: string[];
}

export interface Animal {
  id: string | null;
  name: string;
  species: string;
  status: string;
  slug: string;
  primaryPhotoUrl: string;
  isSaved: boolean;
}

export interface Feedback {
  comment: string;
  rating: number;
  user: User;
  createdAtUtc: string;
}

export interface SearchState {
  searchQuery: string;
  sortOrder: "asc" | "desc";
  regions: string[];
}
