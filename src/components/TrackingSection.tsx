'use client'

import {
  faBarcode,
  faClock,
  faDownload,
  faExclamationTriangle,
  faPrint
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import InteractiveMap from './InteractiveMap'
// --- Type Definitions ---

interface Package {
  id?: string | number
  quantity: number
  piece_type: string
  description: string
  length?: number
  width?: number
  height?: number
  weight?: number
}

interface HistoryItem {
  id?: string | number
  date: string
  time: string
  location: string
  status: string
  updated_by?: string
  remarks?: string
  coordinates?: [number, number]
}

interface TrackingData {
  tracking_number: string
  sender_name: string
  sender_address: string
  sender_phone: string
  sender_email: string
  sender_coordinates?: [number, number]
  receiver_name: string
  receiver_address: string
  receiver_phone: string
  receiver_email: string
  receiver_coordinates?: [number, number]
  status: string
  weight?: number
  shipment_type?: string
  shipping_mode?: string
  payment_mode?: string
  total_freight?: number
  origin_country?: string
  destination_country?: string
  expected_delivery_date?: string
  packages?: Package[]
  history?: HistoryItem[]
  carrier?: string
  carrier_reference?: string
  comments?: string;
  created_at?: string;
  updated_at?: string;
}

interface HeroTrackingData {
  trackingCode: string
  trackingData: TrackingData
}

interface TrackingSectionProps {
  heroTrackingData?: HeroTrackingData | null;  
}

// --- Component ---

export default function TrackingSection({ heroTrackingData }: TrackingSectionProps) {
  const searchParams = useSearchParams();
const urlTrackingCode = searchParams.get('code');

const [trackingCode, setTrackingCode] = useState<string>('');
const [isLoading, setIsLoading] = useState<boolean>(false);
const [error, setError] = useState<string | null>(null);
const [trackingData, setTrackingData] = useState<TrackingData | null>(null);
const [currentSpeed, setCurrentSpeed] = useState<number>(1);

// Generate route points for the map
const generateRoutePoints = (data: TrackingData | null) => {
  if (!data) return [];

  const points: {
    lat: number;
    lng: number;
    name: string;
    status: string;
    date: string;
    remarks?: string;
    updated_by?: string;
    type: string;
  }[] = [];

  if (data.sender_coordinates?.length === 2) {
    points.push({
      lat: data.sender_coordinates[0],
      lng: data.sender_coordinates[1],
      name: `${data.sender_name} - ${data.sender_address}`,
      status: "Shipped",
      date: data.created_at ? new Date(data.created_at).toLocaleString('en-GB') : "N/A",
      type: "sender"
    });
  }

  data.history?.forEach((historyItem, index) => {
    if (historyItem.coordinates?.length === 2) {
      points.push({
        lat: historyItem.coordinates[0],
        lng: historyItem.coordinates[1],
        name: historyItem.location || `Point ${index + 1}`,
        status: historyItem.status || "In transit",
        date: `${new Date(historyItem.date).toLocaleDateString('en-GB')} ${historyItem.time}`,
        remarks: historyItem.remarks,
        updated_by: historyItem.updated_by,
        type: "history"
      });
    }
  });

  if (data.receiver_coordinates?.length === 2) {
    const isDelivered = data.status === 'delivered';
    points.push({
      lat: data.receiver_coordinates[0],
      lng: data.receiver_coordinates[1],
      name: `${data.receiver_name} - ${data.receiver_address}`,
      status: isDelivered ? "Delivered" : "Destination",
      date: data.expected_delivery_date
        ? new Date(data.expected_delivery_date).toLocaleDateString('en-GB')
        : "N/A",
      type: "receiver"
    });
  }

  return points;
};

// Receive heroTrackingData
useEffect(() => {
  if (heroTrackingData) {
    setTrackingCode(heroTrackingData.trackingCode);
    setTrackingData(heroTrackingData.trackingData);
    setError(null);
  }
}, [heroTrackingData]);

// Handle URL tracking code
useEffect(() => {
  if (urlTrackingCode && !heroTrackingData) {
    setTrackingCode(urlTrackingCode);
    fetchTrackingData(urlTrackingCode);
  }
}, [urlTrackingCode, heroTrackingData]);

const fetchTrackingData = async (code: string) => {
  setIsLoading(true);
  setError(null);

  const apiUrl = process.env.NEXT_PUBLIC_DJNANGO_API_URL;
  const url = `${apiUrl}${code}/`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      if (response.status === 404) throw new Error('Tracking code not found.');
      throw new Error(`Failed to fetch data (Status: ${response.status})`);
    }
    const data: TrackingData = await response.json();
    setTrackingData(data);
  } catch (err: unknown) {
    if (err instanceof Error) {
      setError(err.message);
    } else {
      setError('An unknown error occurred.');
    }
    setTrackingData(null);
  } finally {
    setIsLoading(false);
  }
};

const handleSubmit = (e?: React.FormEvent) => {
  e?.preventDefault();
  if (!trackingCode.trim()) {
    setError('Please enter a tracking code');
    return;
  }
  fetchTrackingData(trackingCode.trim());
};

const routePoints = generateRoutePoints(trackingData);

// Helper display functions
const getStatusDisplayText = (status: string) => {
  const statusMap: Record<string, string> = {
    'pre_transit': 'Pre-transit',
    'in_transit': 'In transit',
    'out_for_delivery': 'Out for delivery',
    'delivered': 'Delivered',
    'returned': 'Returned'
  };
  return statusMap[status] || status;
};

const getShippingModeText = (mode?: string) => {
  const modeMap: Record<string, string> = {
    'land': 'Land transport',
    'air': 'Air transport',
    'sea': 'Sea transport'
  };
  return mode ? modeMap[mode] || mode : '';
};

const getPaymentModeText = (mode?: string) => {
  const paymentMap: Record<string, string> = {
    'bacs': 'BACS',
    'credit_card': 'Credit card',
    'paypal': 'PayPal'
  };
  return mode ? paymentMap[mode] || mode : '';
};
const downloadTicket = () => {
  if (!trackingData) return;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    console.error("Canvas 2D context could not be initialized.");
    return;
  }

  // Canvas size
  canvas.width = 600;
  canvas.height = 700;

  // Background
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Header
  ctx.fillStyle = "#333";
  ctx.font = "bold 20px Arial";
  let y = 40;
  ctx.fillText("📦 Shipment Receipt", 180, y);
  y += 40;

  ctx.font = "16px Arial";
  const lineHeight = 24;

  // Helper function
  const write = (label: string, value: string | number | null | undefined) => {
    ctx.fillText(`${label}: ${value ?? "—"}`, 40, y);
    y += lineHeight;
  };

  // Main info
  write("Tracking Number", trackingData.tracking_number);
  write("Status", trackingData.status);
  y += 10;

  ctx.fillStyle = "#999";
  ctx.fillRect(40, y, 520, 1);
  ctx.fillStyle = "#333";
  y += 20;

  // Sender info
  write("Sender", trackingData.sender_name);
  write("Sender Address", trackingData.sender_address);
  write("Sender Phone", trackingData.sender_phone);
  y += 10;

  ctx.fillStyle = "#999";
  ctx.fillRect(40, y, 520, 1);
  ctx.fillStyle = "#333";
  y += 20;

  // Receiver info
  write("Receiver", trackingData.receiver_name);
  write("Receiver Address", trackingData.receiver_address);
  write("Receiver Phone", trackingData.receiver_phone);
  y += 10;

  ctx.fillStyle = "#999";
  ctx.fillRect(40, y, 520, 1);
  ctx.fillStyle = "#333";
  y += 20;

  // Shipment info
  write("Origin", trackingData.origin_country);
  write("Destination", trackingData.destination_country);
  write("Shipment Type", trackingData.shipment_type);
  write("Weight (kg)", trackingData.weight);
  write("Total Freight (€)", trackingData.total_freight);
  write("Expected Delivery", trackingData.expected_delivery_date);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  write("Pickup Date", (trackingData as any).pickup_date);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  write("Pickup Time", (trackingData as any).pickup_time);

  y += 20;
  ctx.fillStyle = "#999";
  ctx.fillRect(40, y, 520, 1);
  ctx.fillStyle = "#333";
  y += 30;

  // Packages list
  ctx.font = "bold 16px Arial";
  ctx.fillText("Packages:", 40, y);
  y += 25;
  ctx.font = "14px Arial";

  trackingData.packages.forEach((pkg, i) => {
    ctx.fillText(
      `${i + 1}. ${pkg.piece_type} — ${pkg.description} (${pkg.quantity} pcs, ${pkg.length}x${pkg.width}x${pkg.height} cm, ${pkg.weight ?? "?"} kg)`,
      60,
      y
    );
    y += 22;
  });

  y += 20;
  ctx.fillStyle = "#999";
  ctx.fillRect(40, y, 520, 1);
  ctx.fillStyle = "#333";
  y += 30;

  // Footer
  ctx.font = "italic 14px Arial";
  ctx.fillText(`Generated on ${new Date().toLocaleString()}`, 40, y);

  // Export to PNG
  const imageURL = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = imageURL;
  link.download = `ticket-${trackingData.tracking_number}.png`;
  link.click();
};


const printTicket = () => {
  const content = document.getElementById('track');
  if (!content) return;

  // Crée une nouvelle fenêtre pour l'impression
  const printWindow = window.open('', '', 'width=900,height=700');
  if (!printWindow) return;

  // Clone le contenu du head (styles, liens, icônes)
  const headContent = document.head.innerHTML;

  // Injecte le contenu avec les styles actuels
  printWindow.document.write(`
    <html>
      <head>
        ${headContent}
        <title>Shipment Tracking</title>
        <style>
          @media print {
            body { margin: 0; background: white; }
          }
        </style>
      </head>
      <body>
        ${content.innerHTML}
      </body>
    </html>
  `);

  printWindow.document.close();

  // Attend un peu pour que les styles se chargent
  printWindow.onload = () => {
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };
};


  // window.print()
 return (
  <section id="tracking" className="py-20 bg-white dark:bg-gray-900">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-3 text-gray-900 dark:text-white tracking-tight">
            Advanced Parcel Tracking
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
            Track your shipments in real time with our interactive map
          </p>
        </div>

        {/* Tracking Form */}
        <div className="bg-gray-100 dark:bg-gray-900 p-8 rounded-xl shadow-lg mb-10">
          <form className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={trackingCode}
              onChange={(e) => setTrackingCode(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
              placeholder="Enter your tracking code..."
              className="flex-1 px-5 py-3 text-base border border-gray-300 dark:border-gray-600 rounded-lg 
                         focus:outline-none focus:ring-4 focus:ring-primary/40 dark:bg-gray-800 dark:text-white"
              disabled={isLoading}
              aria-label="Tracking code"
            />
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={isLoading}
              className="bg-primary hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed 
                         text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center min-w-[160px]"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  Tracking in progress...
                </>
              ) : (
                'Track Package'
              )}
            </button>
          </form>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 italic">Try: GT2024001235</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-8 max-w-3xl mx-auto">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-700 rounded-lg p-5">
              <div className="flex items-center space-x-3">
                <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-600 dark:text-red-400" />
                <p className="text-red-700 dark:text-red-300 font-medium">{error}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Tracking Results */}
      {trackingData && (
        <div id="track" className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          {/* Header with Barcode and Actions */}
          <div className="bg-gray-100 dark:bg-gray-700 px-8 py-4 border-b border-gray-200 dark:border-gray-600">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <FontAwesomeIcon icon={faBarcode} className="text-2xl text-gray-600" />
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    Package No. {trackingData.tracking_number}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    SHIPMENT STATUS - IN TRANSIT
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={printTicket}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center"
                >
                  <FontAwesomeIcon icon={faPrint} className="mr-2" />
                  <span>Print</span>
                </button>
                <button 
                  onClick={downloadTicket}
                  className="bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center"
                >
                  <FontAwesomeIcon icon={faDownload} className="mr-2" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* Sender and Recipient Information */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white border-b pb-2">
                  Sender Information
                </h4>
                <div className="space-y-2 text-sm">
                  <p><strong>{trackingData.sender_name}</strong></p>
                  <p>{trackingData.sender_address}</p>
                  <p>{trackingData.sender_phone}</p>
                  <p className="text-blue-600">{trackingData.sender_email}</p>
                  {trackingData.sender_coordinates && (
                    <p className="text-gray-500 text-xs">
                      Coordinates: {trackingData.sender_coordinates[0].toFixed(6)}, {trackingData.sender_coordinates[1].toFixed(6)}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white border-b pb-2">
                  Receiver Information
                </h4>
                <div className="space-y-2 text-sm">
                  <p><strong>{trackingData.receiver_name}</strong></p>
                  <p>{trackingData.receiver_address}</p>
                  <p>{trackingData.receiver_phone}</p>
                  <p className="text-blue-600">{trackingData.receiver_email}</p>
                  {trackingData.receiver_coordinates && (
                    <p className="text-gray-500 text-xs">
                      Coordinates: {trackingData.receiver_coordinates[0].toFixed(6)}, {trackingData.receiver_coordinates[1].toFixed(6)}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Shipment Information */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white border-b pb-2">
                Shipment Information
              </h4>
              <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Origin:</p>
                  <p className="font-semibold">{trackingData.origin_country}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Destination:</p>
                  <p className="font-semibold">{trackingData.destination_country}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Weight:</p>
                  <p className="font-semibold">{trackingData.weight}kg</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Type:</p>
                  <p className="font-semibold">{trackingData.shipment_type}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Freight:</p>
                  <p className="font-semibold">{trackingData.total_freight}€</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Delivery Date:</p>
                  <p className="font-semibold">
                    {trackingData.expected_delivery_date
                      ? new Date(trackingData.expected_delivery_date).toLocaleDateString('en-GB')
                      : "—"}
                  </p>
                </div>
              </div>
            </div>

            {/* Package Details */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white border-b pb-2">
                Package Details
              </h4>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="flex items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Packages:</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{trackingData.packages?.length || 0}</p>
                    <p className="text-sm text-green-600 dark:text-green-400">
                      {getStatusDisplayText(trackingData.status)}
                    </p>
                  </div>
                </div>
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Carrier:</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{trackingData.carrier}</p>
                  <p className="text-sm text-blue-600">Ref: {trackingData.carrier_reference}</p>
                </div>
                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Shipping Mode:</p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {getShippingModeText(trackingData.shipping_mode)}
                  </p>
                </div>
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Payment Mode:</p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {getPaymentModeText(trackingData.payment_mode)}
                  </p>
                </div>
              </div>
            </div>

            {/* Package Specifications Table */}
            {trackingData.packages && trackingData.packages.length > 0 && (
              <div className="mb-8">
                <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  Package Specifications
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
                    <thead>
                      <tr className="bg-green-600 text-white">
                        <th className="border border-gray-300 px-4 py-2 text-left">Qty</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Piece Type</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Length (cm)</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Width (cm)</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Height (cm)</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Weight (kg)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {trackingData.packages.map((pkg, index) => (
                        <tr key={pkg.id || index} className="bg-white dark:bg-gray-800">
                          <td className="border border-gray-300 px-4 py-2">{pkg.quantity}</td>
                          <td className="border border-gray-300 px-4 py-2">{pkg.piece_type}</td>
                          <td className="border border-gray-300 px-4 py-2">{pkg.description}</td>
                          <td className="border border-gray-300 px-4 py-2">{pkg.length || '-'}</td>
                          <td className="border border-gray-300 px-4 py-2">{pkg.width || '-'}</td>
                          <td className="border border-gray-300 px-4 py-2">{pkg.height || '-'}</td>
                          <td className="border border-gray-300 px-4 py-2">{pkg.weight || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Interactive Map Section */}
            {routePoints.length > 0 && (
              <div className="mb-8">
                <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Package Route</h4>

                <div className="flex gap-2 mb-4">
                  <button 
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${currentSpeed === 0.5 ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
                    onClick={() => setCurrentSpeed(0.5)}
                  >
                    Slow
                  </button>
                  <button 
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${currentSpeed === 1 ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
                    onClick={() => setCurrentSpeed(1)}
                  >
                    Normal
                  </button>
                  <button 
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${currentSpeed === 2 ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
                    onClick={() => setCurrentSpeed(2)}
                  >
                    Fast
                  </button>
                </div>

                <div className="rounded-lg overflow-hidden shadow-lg">
                  <InteractiveMap routePoints={routePoints} currentSpeed={currentSpeed} />
                </div>

                <div className="mt-4 flex items-center text-gray-700 dark:text-gray-300">
                  <FontAwesomeIcon icon={faClock} className="mr-2" />
                  <strong>Expected delivery date:</strong> 
                  {trackingData.expected_delivery_date && (
                    <span className="ml-2">
                      {new Date(trackingData.expected_delivery_date).toLocaleDateString('en-GB')}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Tracking History */}
            {trackingData.history && trackingData.history.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Shipment History</h4>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
                    <thead>
                      <tr className="bg-green-600 text-white">
                        <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Time</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Location</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Updated By</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Remarks</th>
                      </tr>
                    </thead>
                    <tbody>
                      {trackingData.history.map((historyItem, index) => (
                        <tr key={historyItem.id || index} className="bg-blue-50 dark:bg-blue-900/20">
                          <td className="border border-gray-300 px-4 py-2 font-medium">
                            {new Date(historyItem.date).toLocaleDateString('en-GB')}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">{historyItem.time}</td>
                          <td className="border border-gray-300 px-4 py-2">{historyItem.location}</td>
                          <td className="border border-gray-300 px-4 py-2">
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              {historyItem.status}
                            </span>
                          </td>
                          <td className="border border-gray-300 px-4 py-2">{historyItem.updated_by}</td>
                          <td className="border border-gray-300 px-4 py-2">{historyItem.remarks || 'N/A'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Comments Section */}
            {trackingData.comments && (
              <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h5 className="font-semibold mb-2 text-gray-900 dark:text-white">Comments:</h5>
                <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                  {trackingData.comments}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  </section>
)
}