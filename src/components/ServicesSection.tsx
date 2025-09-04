'use client'

import { faCheck, faDownload, faTruck, faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from "@fortawesome/fontawesome-svg-core"

interface Service {
  icon: IconProp
  title: string
  description: string
  features: string[]
}

const services: Service[] = [
  {
    icon: faDownload,
    title: 'Import Services',
    description: 'Streamlined import processes with full customs clearance, documentation, and compliance management.',
    features: ['Customs Clearance', 'Documentation Support', 'Compliance Management'],
  },
  {
    icon: faUpload,
    title: 'Export Solutions',
    description: 'End-to-end export services helping you reach global markets efficiently and cost-effectively.',
    features: ['Market Analysis', 'Export Documentation', 'Shipping Coordination'],
  },
  {
    icon: faTruck,
    title: 'Logistics Management',
    description: 'Comprehensive logistics solutions including warehousing, transportation, and supply chain optimization.',
    features: ['Warehousing', 'Transportation', 'Supply Chain Optimization'],
  },
]

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            We provide top-notch solutions for import, export, and logistics management.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <div key={index} className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg">
              <FontAwesomeIcon icon={service.icon} className="text-4xl text-primary mb-6" />
              <h3 className="text-xl font-bold mb-4">{service.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">{service.description}</p>
              <ul className="space-y-2 text-sm">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <FontAwesomeIcon icon={faCheck} className="text-accent mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
