export interface Order {
  id: string;
  transaction_id: string;
  status: string;
  customer: {
    name: string;
    email?: string;
    phone_number?: string;
    address?: string;
    user_id: string;
    latitude: string;
    longitude: string;
  };
  payment_method: string;
  longitude: string;
  latitude: string;
  total_amount: number;
}
