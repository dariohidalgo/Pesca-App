import React from 'react';
import { Helmet } from 'react-helmet-async';
import ReactMarkdown from 'react-markdown';
import { Calendar, User, Clock, ArrowLeft } from 'lucide-react';
import { Link, useParams, Navigate } from 'react-router-dom';
import SchemaOrg from './SchemaOrg';
import { POSTS } from '../data/posts';

export default function BlogPost() {
    const { slug } = useParams();
    const post = POSTS.find(p => p.slug === slug);

    if (!post) {
        return <Navigate to="/blog" replace />;
    }

    return (
        <>
            <Helmet>
                <title>{post.title} | PescaApp</title>
                <meta name="description" content={post.description} />
                <meta name="author" content={post.author} />
                <meta property="og:title" content={`${post.title} | PescaApp`} />
                <meta property="og:description" content={post.description} />
                <meta property="og:type" content="article" />
                <meta property="og:url" content={`https://www.pescacordoba.com.ar/blog/${post.slug}`} />
                <meta property="article:published_time" content={post.date} />
                <meta property="article:author" content={post.author} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={post.title} />
                <meta name="twitter:description" content={post.description} />
            </Helmet>

            <SchemaOrg schema={{
                "@context": "https://schema.org",
                "@type": "Article",
                "headline": post.title,
                "description": post.description,
                "author": {
                    "@type": "Person",
                    "name": post.author
                },
                "publisher": {
                    "@type": "Organization",
                    "name": "Pesca Córdoba",
                    "logo": {
                        "@type": "ImageObject",
                        "url": "https://www.pescacordoba.com.ar/pesca.svg"
                    }
                },
                "datePublished": post.date,
                "mainEntityOfPage": {
                    "@type": "WebPage",
                    "@id": `https://www.pescacordoba.com.ar/blog/${post.slug}`
                }
            }} />

            <SchemaOrg schema={{
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://www.pescacordoba.com.ar/" },
                    { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://www.pescacordoba.com.ar/blog" },
                    { "@type": "ListItem", "position": 3, "name": post.title, "item": `https://www.pescacordoba.com.ar/blog/${post.slug}` }
                ]
            }} />

            <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 mt-8">
                <div className="max-w-3xl mx-auto">
                    <Link
                        to="/blog"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors mb-6"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Volver a los artículos
                    </Link>

                    <article className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 sm:p-12">
                        <header className="mb-10 border-b border-slate-100 pb-8">
                            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
                                {post.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 font-medium">
                                <div className="flex items-center gap-2">
                                    <User className="h-4 w-4 text-slate-400" />
                                    {post.author}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-slate-400" />
                                    {post.dateDisplay}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-slate-400" />
                                    {post.readTime}
                                </div>
                            </div>
                        </header>

                        <div className="prose prose-slate max-w-none prose-headings:font-bold prose-h1:hidden prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl prose-a:text-blue-600 prose-p:text-slate-600 prose-p:leading-relaxed prose-li:text-slate-600">
                            <ReactMarkdown
                                components={{
                                    h2: ({ ...props }) => <h3 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2" {...props} />,
                                    h3: ({ ...props }) => <h4 className="text-xl font-bold mt-6 mb-3 text-slate-800" {...props} />,
                                    p: ({ ...props }) => <p className="text-slate-600 leading-relaxed mb-6 text-lg" {...props} />,
                                    ul: ({ ...props }) => <ul className="list-disc pl-6 mb-6 text-slate-600 text-lg space-y-2" {...props} />,
                                    ol: ({ ...props }) => <ol className="list-decimal pl-6 mb-6 text-slate-600 text-lg space-y-2" {...props} />,
                                    li: ({ ...props }) => <li className="pl-2" {...props} />,
                                    strong: ({ ...props }) => <strong className="font-semibold text-slate-900" {...props} />,
                                }}
                            >
                                {post.content}
                            </ReactMarkdown>
                        </div>
                    </article>
                </div>
            </div>
        </>
    );
}
