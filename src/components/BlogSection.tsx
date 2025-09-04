'use client';

import { faBalanceScale, faChartLine, faClock, faFileAlt, faHandshake, faLeaf, faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import BlogModal from './BlogModal';
import { JSX } from 'react';
import { BlogPost, QuickTip } from '../interfaces/BlogSectionInterface';

export default function BlogSection(): JSX.Element {
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);

  const blogPosts: BlogPost[] = [
    {
      id: 'trade-trends',
      icon: faChartLine,
      gradient: 'from-blue-500 to-indigo-600',
      date: 'January 15, 2024',
      title: 'Global Trade Trends 2024',
      description: 'Discover the emerging trends shaping international trade in 2024, from digital transformation to sustainable logistics.'
    },
    {
      id: 'sustainable-supply',
      icon: faLeaf,
      gradient: 'from-green-500 to-emerald-600',
      date: 'January 10, 2024',
      title: 'Sustainable Supply Chains',
      description: 'Learn how to build environmentally responsible supply chains that reduce costs and improve efficiency.'
    },
    {
      id: 'customs-compliance',
      icon: faShieldAlt,
      gradient: 'from-purple-500 to-pink-600',
      date: 'January 5, 2024',
      title: 'Customs Compliance Guide',
      description: 'Essential tips for maintaining customs compliance and avoiding costly delays in your international shipments.'
    }
  ];

  const quickTips: QuickTip[] = [
    { icon: faFileAlt, title: 'Documentation', description: 'Always prepare complete paperwork' },
    { icon: faBalanceScale, title: 'Compliance', description: 'Stay updated with regulations' },
    { icon: faClock, title: 'Timing', description: 'Plan for customs delays' },
    { icon: faHandshake, title: 'Partnership', description: 'Choose reliable partners' }
  ];

  return (
    <section id="blog" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest News & Insights</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Stay updated with the latest trends in international trade
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map((post: BlogPost) => (
            <article key={post.id} className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden">
              <div className={`bg-gradient-to-r ${post.gradient} h-48 flex items-center justify-center`}>
                <FontAwesomeIcon icon={post.icon} className="text-4xl text-white" />
              </div>
              <div className="p-6">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">{post.date}</div>
                <h3 className="text-xl font-bold mb-3">{post.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{post.description}</p>
                <button 
                  onClick={() => setSelectedArticle(post.id)}
                  className="text-primary font-semibold hover:underline"
                >
                  Read More
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Tips Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center mb-8">Quick Tips for Importers & Exporters</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickTips.map((tip: QuickTip, index: number) => (
              <div key={index} className="text-center">
                <FontAwesomeIcon icon={tip.icon} className="text-3xl text-primary mb-3" />
                <h4 className="font-semibold mb-2">{tip.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Blog Article Modal */}
      {selectedArticle && (
        <BlogModal 
          articleId={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}
    </section>
  );
}
