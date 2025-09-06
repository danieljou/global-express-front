'use client';

import logo from '@/components/logo.png';
import { faFacebook, faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faMapMarkerAlt, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { JSX } from 'react';

interface LinkItem {
  text: string;
  href: string;
}

interface LinkSection {
  title: string;
  items: LinkItem[];
}

export default function Footer(): JSX.Element {
  const links: LinkSection[] = [
    {
      title: "Services",
      items: [
        { text: "Import Services", href: "#" },
        { text: "Export Solutions", href: "#" },
        { text: "Logistics Management", href: "#" },
        { text: "Customs Clearance", href: "#" }
      ]
    },
    {
      title: "Quick Links",
      items: [
        { text: "About Us", href: "#about" },
        { text: "Track Package", href: "#tracking" },
        { text: "Contact", href: "#contact" },
        { text: "Blog", href: "#blog" }
      ]
    }
  ];

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <Image src={logo} alt="Global Trade Solutions" className="mr-3" width={40} height={40} />
              <span className="font-bold text-xl">Global Trade Solutions</span>
            </div>

            <p className="text-gray-300 mb-4">
              Your trusted partner for international trade excellence. Connecting businesses worldwide since 2003.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-primary">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary">
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </div>
          </div>

          {/* Links */}
          {links.map((section: LinkSection, index: number) => (
            <div key={index}>
              <h4 className="font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2 text-gray-300">
                {section.items.map((item: LinkItem, i: number) => (
                  <li key={i}>
                    <a href={item.href} className="hover:text-primary">{item.text}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <div className="space-y-2 text-gray-300">
              <p><FontAwesomeIcon icon={faPhone} className="mr-2" />+1 (555) 123-4567</p>
              <p><FontAwesomeIcon icon={faEnvelope} className="mr-2" />info@globaltradesolutions.com</p>
              <p><FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />123 Trade Center Blvd, NY</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center text-gray-300">
          <p>&copy; 2024 Global Trade Solutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
