'use client';

import { faBullseye, faEye, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { HeroTrackingData } from '../interfaces/TrackingDataInterface';

interface HeroSectionProps {
  onTrackingSuccess?: (data: HeroTrackingData) => void;
}

export default function HeroSection({ onTrackingSuccess }: HeroSectionProps) {
  const [trackingCode, setTrackingCode] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleTrack = async () => {
    console.log('Hero handleTrack called, trackingCode:', trackingCode);
    
    if (!trackingCode.trim()) {
      setError('Please enter a tracking code');
      return;
    }

    setIsLoading(true);
    setError(null);

    const url = `${process.env.NEXT_PUBLIC_DJNANGO_API_URL}${trackingCode.trim()}/`;
    console.log('Hero Fetching URL:', url);

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      console.log('Hero Response status:', response.status);

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Code de suivi non trouvé');
        }
        throw new Error(`Échec de récupération des données (Status: ${response.status})`);
      }

      const data = await response.json();
      console.log('Hero Received data:', data);

      if (onTrackingSuccess) {
        onTrackingSuccess({
          trackingCode: trackingCode.trim(),
          trackingData: data
        });
      }

      setTimeout(() => {
        const trackingSection = document.getElementById('tracking');
        if (trackingSection) {
          trackingSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);

    } catch (err: unknown) {
    console.error('Hero Fetch error:', err);
    if (err instanceof Error) {
      setError(err.message);
    } else {
      setError('Une erreur inconnue est survenue.');
    }
  }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleTrack();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTrackingCode(e.target.value);
  };

  return (
    <section id="home" className="pt-16 min-h-screen hero-image">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="bg-white/90 dark:bg-gray-900/90 p-8 rounded-xl backdrop-blur-sm">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
              Global Trade Solutions
            </h1>
            <p className="text-xl mb-8 text-gray-600 dark:text-gray-300">
              Connecting businesses worldwide through seamless import, export, and logistics solutions. Your trusted partner for international trade success.
            </p>

            {/* Quick Tracking Form */}
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-6 rounded-xl shadow-lg mb-8">
              <h3 className="text-lg font-semibold mb-4">Suivi Rapide de Colis</h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={trackingCode}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Entrez votre code de suivi..."
                  className="flex-1 px-4 py-3 text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                  disabled={isLoading}
                />
                <button
                  className="bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center min-w-[120px]"
                  onClick={handleTrack}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Suivi...
                    </>
                  ) : (
                    'Suivre'
                  )}
                </button>
              </div>
              
              {error && (
                <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="text-red-700 dark:text-red-300 text-sm flex items-center">
                    <span className="mr-2">⚠️</span>
                    {error}
                  </p>
                </div>
              )}
              
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Essayez : GT2024001234</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                Obtenir un Devis
              </button>
              <a href="#services" className="text-primary hover:underline">
                <button className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                Nos Services
                </button>
              </a>
            </div>

            {/* Mission, Vision, Values */}
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="text-center">
                <FontAwesomeIcon icon={faBullseye} className="text-3xl text-primary mb-3" />
                <h3 className="font-semibold mb-2">Mission</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Simplifier le commerce mondial</p>
              </div>
              <div className="text-center">
                <FontAwesomeIcon icon={faEye} className="text-3xl text-primary mb-3" />
                <h3 className="font-semibold mb-2">Vision</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Solutions commerciales leaders</p>
              </div>
              <div className="text-center">
                <FontAwesomeIcon icon={faHeart} className="text-3xl text-primary mb-3" />
                <h3 className="font-semibold mb-2">Valeurs</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Confiance & Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
