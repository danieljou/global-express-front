'use client';

import { useState } from 'react';

// Types for route points and history items
interface RoutePoint {
  lat: number;
  lng: number;
  name: string;
  status: string;
  date: string;
}

interface HistoryItem {
  date: string;
  status: string;
  location: string;
  active: boolean;
}

// Main tracking data type
export interface TrackingData {
  trackingCode: string;
  status: string;
  carrier: string;
  shipDate: string;
  estimatedDelivery: string;
  transitTime: string;
  routePoints: RoutePoint[];
  history: HistoryItem[];
}

// Hook return type
interface UseTrackingReturn {
  trackingData: TrackingData | null;
  loading: boolean;
  error: string | null;
  trackPackage: (trackingCode: string) => Promise<void>;
}

export default function useTracking(): UseTrackingReturn {
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const trackPackage = async (trackingCode: string) => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Simulated tracking data
      const data: TrackingData = {
        trackingCode,
        status: 'In Transit',
        carrier: 'Global Trade Express',
        shipDate: '2024-01-15',
        estimatedDelivery: '2024-01-22',
        transitTime: '7-10 business days',
        routePoints: [
          { lat: 31.2304, lng: 121.4737, name: "Shanghai, China", status: "Shipped", date: "01/15 14:00" },
          { lat: 34.0522, lng: -118.2437, name: "Los Angeles, CA", status: "Arrived at Port", date: "01/18 12:30" },
          { lat: 39.7392, lng: -104.9903, name: "Denver, CO", status: "In Transit", date: "Estimated: 01/20" },
          { lat: 41.8781, lng: -87.6298, name: "Chicago, IL", status: "Destination", date: "Estimated: 01/22" }
        ],
        history: [
          { date: '2024-01-15 14:00', status: 'Shipped', location: 'Shanghai, China - International Sorting Center', active: false },
          { date: '2024-01-16 09:00', status: 'In Transit', location: 'Pacific Ocean - MSC Bellissima', active: false },
          { date: '2024-01-18 12:30', status: 'Arrived at Port', location: 'Los Angeles, CA - Port Terminal', active: true },
          { date: 'Estimated: 2024-01-19', status: 'Customs Clearance', location: 'Los Angeles, CA - Customs Office', active: false },
          { date: 'Estimated: 2024-01-20', status: 'Ground Transport', location: 'Denver, CO - Distribution Center', active: false },
          { date: 'Estimated: 2024-01-22', status: 'Final Delivery', location: 'Chicago, IL - Destination Address', active: false }
        ]
      };

      setTrackingData(data);
    } catch (err) {
      console.error(err);
      setError('Failed to track package. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return { trackingData, loading, error, trackPackage };
}
