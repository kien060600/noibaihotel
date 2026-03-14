import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useTranslation } from '../hooks/useTranslation';

const blogImages = [
  "https://images.unsplash.com/photo-1555899434-94d1368aa7af?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&q=80",
];

export default function BlogPage() {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>Khám phá &amp; Cẩm nang | Noi Bai Airport Hotel</title>
        <meta name="description" content="Khám phá các mẹo du lịch, thông tin chặng bay và các hướng dẫn khám phá Hà Nội thiết thực nhất cho khách lưu trú." />
      </Head>

      <section className="page-header">
        <div className="container">
          <h1 className="page-title fade-in-up">{t.blog.title}</h1>
          <p className="page-subtitle fade-in-up" style={{ animationDelay: '0.1s' }}>
            {t.blog.subtitle}
          </p>
        </div>
      </section>

      <section className="section bg-light">
        <div className="container">
          <div className="blog-grid">
            {t.blog.posts.map((post, index) => (
              <article key={index} className="post-card">
                <div className="post-image" style={{ backgroundImage: `url(${blogImages[index]})` }}>
                  <div className="post-category">{post.category}</div>
                </div>
                <div className="post-content">
                  <div className="post-date">{post.date}</div>
                  <h2 className="post-title">
                    <Link href="#">{post.title}</Link>
                  </h2>
                  <p className="post-excerpt">{post.excerpt}</p>
                  <Link href="#" className="read-more">{t.blog.readMore}</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        .page-header { padding-top: calc(var(--nav-height) + var(--space-12)); padding-bottom: var(--space-12); background-color: var(--color-primary); color: var(--color-white); text-align: center; }
        .page-title { font-size: clamp(1.5rem, 5vw, var(--text-4xl)); margin-bottom: var(--space-4); color: var(--color-white); }
        .page-subtitle { font-size: var(--text-base); color: var(--color-gray-300); max-width: 600px; margin: 0 auto; }
        .bg-light { background-color: var(--color-gray-50); }
        .blog-grid { display: grid; grid-template-columns: 1fr; gap: var(--space-8); }
        @media (min-width: 768px) { .blog-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px) { .blog-grid { grid-template-columns: repeat(3, 1fr); } }
        .post-card { background: var(--color-white); border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--shadow-sm); transition: transform var(--transition-normal); }
        .post-card:hover { transform: translateY(-8px); box-shadow: var(--shadow-md); }
        .post-image { aspect-ratio: 16 / 9; background-size: cover; background-position: center; position: relative; }
        .post-category { position: absolute; top: var(--space-4); left: var(--space-4); background: var(--color-accent); color: var(--color-white); padding: var(--space-1) var(--space-3); font-size: var(--text-xs); font-weight: var(--font-medium); text-transform: uppercase; border-radius: var(--radius-sm); }
        .post-content { padding: var(--space-6); }
        .post-date { font-size: var(--text-xs); color: var(--color-gray-500); margin-bottom: var(--space-2); text-transform: uppercase; }
        .post-title { font-size: var(--text-xl); margin-bottom: var(--space-3); line-height: var(--leading-tight); }
        .post-title a { color: var(--color-primary); }
        .post-title a:hover { color: var(--color-accent); }
        .post-excerpt { font-size: var(--text-sm); color: var(--color-gray-600); margin-bottom: var(--space-4); }
        .read-more { font-size: var(--text-sm); font-weight: var(--font-bold); text-transform: uppercase; letter-spacing: 0.05em; }
      `}</style>
    </>
  );
}
