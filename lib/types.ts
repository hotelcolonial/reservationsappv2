export type EventType = {
  id: string;
  name: string;
  slug: string;
  eventDate: string;
  createdAt: string;
  updatedAt: string;
};

export type Reservation = {
  id: number;
  event_type_id: string;
  name: string;
  email: string;
  adults: number;
  children_0_6: number;
  children_7_11: number;
  total: number;
  locator: string | null;
  is_verified: boolean;
  createdAt: string;
  updatedAt: string;
};
