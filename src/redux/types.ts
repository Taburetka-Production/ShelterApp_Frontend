export interface Address {
  id: string | null;
  country: string;
  region: string;
  city: string;
  street: string;
  district?: string;
  apartments?: string;
  coordinates?: string;
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
}

export interface User {
  id: string;
  avatarUrl: string | null;
  name: string;
  surname: string;
  age: number;
  email: string;
  userName: string;
  phone: string;
  roles: string[];
}

export interface SearchState {
  searchQuery: string;
  sortOrder: "asc" | "desc";
  regions: string[];
}
