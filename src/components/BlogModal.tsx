'use client';

import blogArticles from '@/utils/blogArticles.mjs';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Article, BlogModalProps } from '../interfaces/BlogArticleInterface';

export default function BlogModal({ articleId, onClose }: BlogModalProps) {
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    if (articleId && articleId in blogArticles) {
      const key = articleId as keyof typeof blogArticles;
      setArticle(blogArticles[key]?.en ?? null);
    }

  }, [articleId]);

  if (!article) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{article.title}</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <FontAwesomeIcon icon={faTimes} className="text-xl" />
          </button>
        </div>
        <div 
          className="prose dark:prose-invert max-w-none" 
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </div>
    </div>
  );
}
