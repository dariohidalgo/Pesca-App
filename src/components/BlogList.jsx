import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import SchemaOrg from './SchemaOrg';
import { POSTS } from '../data/posts';

export default function BlogList() {
    return (
        <>
            <Helmet>
                <title>Blog de Pesca Deportiva | PescaApp</title>
                <meta name="description" content="Artículos sobre técnicas, equipos, aparejos y consejos para la pesca deportiva en Córdoba. Guías de pejerrey, tararira, carpa y más." />
                <meta property="og:title" content="Blog de Pesca Deportiva | PescaApp" />
                <meta property="og:type" content="website" />
            </Helmet>

            <SchemaOrg schema={{
                "@context": "https://schema.org",
                "@type": "CollectionPage",
                "name": "Blog de Pesca Deportiva",
                "description": "Artículos y guías sobre pesca deportiva en Córdoba.",
                "url": "https://www.pescacordoba.com.ar/blog",
                "mainEntity": {
                    "@type": "ItemList",
                    "numberOfItems": POSTS.length,
                    "itemListElement": POSTS.map((post, i) => ({
                        "@type": "ListItem",
                        "position": i + 1,
                        "url": `https://www.pescacordoba.com.ar/blog/${post.slug}`
                    }))
                }
            }} />

            <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 mt-8">
                <div className="mb-8">
                    <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Volver al Inicio
                    </Link>
                    <h1 className="text-4xl font-extrabold text-slate-900 mt-6 tracking-tight dark:text-white">Últimos Artículos</h1>
                    <p className="text-slate-500 mt-2 text-lg dark:text-white">Consejos y guías para pescar mejor.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {POSTS.map(post => (
                        <Link
                            key={post.id}
                            to={`/blog/${post.slug}`}
                            className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-8 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 flex flex-col h-full group"
                        >
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold text-slate-900 tracking-tight leading-tight mb-4 group-hover:text-blue-600 transition-colors">
                                    {post.title}
                                </h2>
                                <p className="text-slate-600 mb-6 line-clamp-3">
                                    {post.description}
                                </p>
                            </div>

                            <div className="mt-auto border-t border-slate-50 pt-6">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-slate-500 font-medium">
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-2">
                                            <User className="h-4 w-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
                                            {post.author}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
                                            {post.dateDisplay}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-blue-600">
                                        <span>Leer más</span>
                                        <svg className="h-4 w-4 transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}
