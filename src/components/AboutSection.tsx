'use client';

import { faCertificate, faHistory, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { JSX } from 'react';

export default function AboutSection(): JSX.Element {
  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Global Trade Solutions</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Over 20 years of excellence in international trade, connecting businesses across continents with reliable, efficient solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {/* History */}
          <div className="text-center">
            <FontAwesomeIcon icon={faHistory} className="text-4xl text-primary mb-6" />
            <h3 className="text-xl font-bold mb-4">Our History</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Founded in 2003, we&apos;ve grown from a small freight forwarder to a global trade solutions leader, serving over 5,000 clients worldwide.
            </p>
          </div>

          {/* Team */}
          <div className="text-center">
            <FontAwesomeIcon icon={faUsers} className="text-4xl text-primary mb-6" />
            <h3 className="text-xl font-bold mb-4">Expert Team</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Our team of 150+ trade professionals brings decades of combined experience in customs, logistics, and international regulations.
            </p>
          </div>

          {/* Certifications */}
          <div className="text-center">
            <FontAwesomeIcon icon={faCertificate} className="text-4xl text-primary mb-6" />
            <h3 className="text-xl font-bold mb-4">Certifications</h3>
            <p className="text-gray-600 dark:text-gray-300">
              ISO 9001:2015 certified, AEO status, and member of FIATA. Our commitment to quality and compliance is unmatched.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-primary mb-2">5,000+</div>
            <div className="text-gray-600 dark:text-gray-300">Happy Clients</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">95%</div>
            <div className="text-gray-600 dark:text-gray-300">On-Time Delivery</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">150+</div>
            <div className="text-gray-600 dark:text-gray-300">Countries Served</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">24/7</div>
            <div className="text-gray-600 dark:text-gray-300">Support</div>
          </div>
        </div>
      </div>
    </section>
  );
}
