import React from 'react';
import SEO from './SEO';
import ReactMarkdown from 'react-markdown';
import { Calendar, User, Clock, ArrowLeft } from 'lucide-react';
import { Link, useParams, Navigate } from 'react-router-dom';
import SchemaOrg from './SchemaOrg';
import { POSTS } from '../data/posts';
import AdBanner from './AdBanner';

export default function BlogPost() {
    const { slug } = useParams();
    const post = POSTS.find(p => p.slug === slug);

    if (!post) {
        return <Navigate to="/blog" replace />;
    }

    const canonicalUrl = `https://pesca-app.com/blog/${post.slug}`;

    return (
        <>
            <SEO
                title={`${post.title} | Pesca Córdoba`}
                description={post.description}
                canonical={canonicalUrl}
                type="article"
                publishedTime={post.date}
                author={post.author}
                image="https://pesca-app.com/img/SEO.webp"
            />

            <SchemaOrg schema={{
                "@context": "https://schema.org",
                "@type": "Article",
                "headline": post.title,
                "description": post.description,
                "image": "https://pesca-app.com/img/SEO.webp",
                "author": {
                    "@type": "Person",
                    "name": post.author
                },
                "publisher": {
                    "@type": "Organization",
                    "name": "Pesca Córdoba",
                    "logo": {
                        "@type": "ImageObject",
                        "url": "https://pesca-app.com/pesca.svg"
                    }
                },
                "datePublished": post.date,
                "mainEntityOfPage": {
                    "@type": "WebPage",
                    "@id": canonicalUrl
                }
            }} />

            <SchemaOrg schema={{
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://pesca-app.com/" },
                    { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://pesca-app.com/blog" },
                    { "@type": "ListItem", "position": 3, "name": post.title, "item": canonicalUrl }
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

                    <article className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-8 sm:p-12">
                        <header className="mb-10 border-b border-slate-100 dark:border-slate-800 pb-8">
                            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-6">
                                {post.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 dark:text-slate-400 font-medium">
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

                        <div className="max-w-none">
                            <ReactMarkdown
                                components={{
                                    h1: () => null,
                                    h2: ({ ...props }) => <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-2" {...props} />,
                                    h3: ({ ...props }) => <h3 className="text-xl font-bold mt-6 mb-3 text-slate-800 dark:text-slate-100" {...props} />,
                                    p: ({ ...props }) => <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6 text-lg" {...props} />,
                                    ul: ({ ...props }) => <ul className="list-disc pl-6 mb-6 text-slate-600 dark:text-slate-300 text-lg space-y-2" {...props} />,
                                    ol: ({ ...props }) => <ol className="list-decimal pl-6 mb-6 text-slate-600 dark:text-slate-300 text-lg space-y-2" {...props} />,
                                    li: ({ ...props }) => <li className="pl-2" {...props} />,
                                    strong: ({ ...props }) => <strong className="font-semibold text-slate-900 dark:text-white" {...props} />,
                                    em: ({ ...props }) => <em className="italic text-slate-700 dark:text-slate-200" {...props} />,
                                    a: ({ href, children, ...props }) => (
                                        <a
                                            href={href}
                                            target={href?.startsWith('http') ? '_blank' : undefined}
                                            rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                                            className="text-blue-600 dark:text-blue-400 hover:underline font-medium transition-colors"
                                            {...props}
                                        >
                                            {children}
                                        </a>
                                    ),
                                    blockquote: ({ ...props }) => (
                                        <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-6 italic text-slate-600 dark:text-slate-300 bg-blue-50/40 dark:bg-slate-800/50 rounded-r-lg" {...props} />
                                    ),
                                    hr: () => <hr className="my-8 border-slate-200 dark:border-slate-800" />,
                                }}
                            >
                                {post.content}
                            </ReactMarkdown>
                        </div>

                        {/* Enlaces contextuales a contenidos y guías relacionadas */}
                        <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                                Guías y recursos relacionados
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                                <Link
                                    to="/diques"
                                    className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors border border-slate-100 dark:border-slate-700/60 flex flex-col justify-between"
                                >
                                    <span className="font-semibold text-slate-900 dark:text-slate-100 mb-1">Guías por Dique</span>
                                    <span className="text-xs text-slate-500 dark:text-slate-400">Accesos públicos, especies y estado en embalses cordobeses.</span>
                                </Link>
                                <Link
                                    to="/lineas"
                                    className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors border border-slate-100 dark:border-slate-700/60 flex flex-col justify-between"
                                >
                                    <span className="font-semibold text-slate-900 dark:text-slate-100 mb-1">Tutoriales de Líneas</span>
                                    <span className="text-xs text-slate-500 dark:text-slate-400">Esquemas paso a paso para flote, paternoster y fondo.</span>
                                </Link>
                                <Link
                                    to="/reglamento"
                                    className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors border border-slate-100 dark:border-slate-700/60 flex flex-col justify-between"
                                >
                                    <span className="font-semibold text-slate-900 dark:text-slate-100 mb-1">Reglamento Oficial</span>
                                    <span className="text-xs text-slate-500 dark:text-slate-400">Carnet CiDi, vedas y cupos vigentes en Córdoba.</span>
                                </Link>
                                <Link
                                    to="/nudos"
                                    className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors border border-slate-100 dark:border-slate-700/60 flex flex-col justify-between"
                                >
                                    <span className="font-semibold text-slate-900 dark:text-slate-100 mb-1">Catálogo de Nudos</span>
                                    <span className="text-xs text-slate-500 dark:text-slate-400">Atados confiables para anzuelos, esmerillones y líderes.</span>
                                </Link>
                            </div>
                        </div>

                        <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800">
                            <AdBanner slot="3228900466" />
                        </div>
                    </article>
                </div>
            </div>
        </>
    );
}
