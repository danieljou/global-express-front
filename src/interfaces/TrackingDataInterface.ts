// src/interfaces/TrackingDataInterface.ts

export interface Package {
  id?: string | number;
  quantity: number;
  piece_type: string;
  description: string;
  length?: number;
  width?: number;
  height?: number;
  weight?: number;
}

export interface HistoryItem {
  id?: string | number;
  date: string;
  time: string;
  location: string;
  status: string;
  updated_by?: string;
  remarks?: string;
  coordinates?: [number, number];
}

export interface TrackingData {
  tracking_number: string;
  sender_name: string;
  sender_address: string;
  sender_phone: string;
  sender_email: string;
  sender_coordinates?: [number, number];
  receiver_name: string;
  receiver_address: string;
  receiver_phone: string;
  receiver_email: string;
  receiver_coordinates?: [number, number];
  status: string;
  weight?: number;
  shipment_type?: string;
  shipping_mode?: string;
  payment_mode?: string;
  total_freight?: number;
  origin_country?: string;
  destination_country?: string;
  expected_delivery_date?: string;
  packages?: Package[];
  history?: HistoryItem[];
  carrier?: string;
  carrier_reference?: string;
  comments?: string;
  created_at?: string;
  updated_at?: string;
}

export interface HeroTrackingData {
  trackingCode: string;
  trackingData: TrackingData;
}

export interface TrackingSectionProps {
  trackingCode: string;
  trackingData: TrackingData | null;
  onTrackingSuccess?: (data: HeroTrackingData) => void;
}
