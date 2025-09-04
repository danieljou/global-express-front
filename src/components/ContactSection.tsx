'use client';

import { faClock, faEnvelope, faMapMarkerAlt, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { JSX } from 'react';

export default function ContactSection(): JSX.Element {
  return (
    <section id="contact" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Get in touch for a consultation or quote
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h3 className="text-xl font-bold mb-6">Send us a message</h3>
            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="First Name" 
                  className="w-full px-4 py-3 text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:text-white"
                />
                <input 
                  type="text" 
                  placeholder="Last Name" 
                  className="w-full px-4 py-3 text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:text-white"
                />
              </div>
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full px-4 py-3 text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:text-white"
              />
              <input 
                type="tel" 
                placeholder="Phone Number" 
                className="w-full px-4 py-3 text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:text-white"
              />
              <select className="w-full px-4 py-3 text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:text-white">
                <option>Select Service</option>
                <option>Import Services</option>
                <option>Export Solutions</option>
                <option>Logistics Management</option>
                <option>Customs Clearance</option>
              </select>
              <textarea 
                rows={5} 
                placeholder="Your Message" 
                className="w-full px-4 py-3 text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:text-white"
              ></textarea>
              <button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-bold mb-6">Contact Information</h3>
            <div className="space-y-6">
              <div className="flex items-start">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-2xl text-primary mr-4 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Address</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    123 Trade Center Blvd<br />
                    International Business District<br />
                    New York, NY 10001, USA
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <FontAwesomeIcon icon={faPhone} className="text-2xl text-primary mr-4 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Phone</h4>
                  <p className="text-gray-600 dark:text-gray-300">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start">
                <FontAwesomeIcon icon={faEnvelope} className="text-2xl text-primary mr-4 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Email</h4>
                  <p className="text-gray-600 dark:text-gray-300">info@globaltradesolutions.com</p>
                </div>
              </div>
              <div className="flex items-start">
                <FontAwesomeIcon icon={faClock} className="text-2xl text-primary mr-4 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Business Hours</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Monday - Friday: 9:00 AM - 6:00 PM<br />
                    Saturday: 9:00 AM - 2:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive Map Placeholder */}
            <div className="mt-8">
              <h4 className="font-semibold mb-4">Find Us</h4>
              <div className="bg-gray-200 dark:bg-gray-700 h-64 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="text-4xl text-primary mb-2" />
                  <p className="text-gray-600 dark:text-gray-300">Interactive Map</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">123 Trade Center Blvd, NY</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
