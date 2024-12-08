export interface User {
  user_id: string;
  name: string;
  email: string;
  address: string;
  longitude: string | number | null;
  latitude: string | number | null;
  isAuthenticated: boolean;
  role?: string;
  phone_number: string;
}
