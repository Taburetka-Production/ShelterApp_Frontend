export interface Address {
  id: string | null;
  country: string;
  region: string;
  district?: string;
  city: string;
  street: string;
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

export interface SearchState {
  searchQuery: string;
  sortOrder: "asc" | "desc";
  regions: string[];
}
