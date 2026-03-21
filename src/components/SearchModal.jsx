import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight } from 'lucide-react';
import { search } from '../data/searchIndex';

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setResults([]);
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    setResults(search(query));
    setSelectedIndex(0);
  }, [query]);

  const handleSelect = useCallback((item) => {
    navigate(item.path);
    onClose();
  }, [navigate, onClose]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(i => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      handleSelect(results[selectedIndex]);
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  const categoryColors = {
    'Nudos': 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300',
    'Pesqueros': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300',
    'Especies': 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300',
    'Secciones': 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
    'Blog': 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300',
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center pt-[15vh]" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-xl mx-4 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-200 dark:border-slate-700">
          <Search className="h-5 w-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Buscar nudos, especies, pesqueros..."
            className="flex-1 bg-transparent outline-none text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
          />
          <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-xs font-mono text-slate-400 bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
            ESC
          </kbd>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto">
          {query.length >= 2 && results.length === 0 && (
            <div className="px-4 py-8 text-center text-slate-500 dark:text-slate-400">
              <p className="font-medium">Sin resultados para "{query}"</p>
              <p className="text-sm mt-1">Probá con otros términos</p>
            </div>
          )}

          {query.length < 2 && (
            <div className="px-4 py-8 text-center text-slate-400 dark:text-slate-500">
              <p>Escribí al menos 2 caracteres para buscar</p>
            </div>
          )}

          {results.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => handleSelect(item)}
              onMouseEnter={() => setSelectedIndex(idx)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                idx === selectedIndex
                  ? 'bg-blue-50 dark:bg-blue-900/30'
                  : 'hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-slate-900 dark:text-slate-100 truncate">{item.name}</span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider shrink-0 ${categoryColors[item.category] || categoryColors['Secciones']}`}>
                    {item.category}
                  </span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 truncate mt-0.5">{item.description}</p>
              </div>
              <ArrowRight className={`h-4 w-4 shrink-0 transition-colors ${idx === selectedIndex ? 'text-blue-500' : 'text-slate-300 dark:text-slate-600'}`} />
            </button>
          ))}
        </div>

        {results.length > 0 && (
          <div className="px-4 py-2 border-t border-slate-200 dark:border-slate-700 flex items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1"><kbd className="px-1 py-0.5 bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 font-mono">↑↓</kbd> Navegar</span>
            <span className="flex items-center gap-1"><kbd className="px-1 py-0.5 bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 font-mono">↵</kbd> Seleccionar</span>
          </div>
        )}
      </div>
    </div>
  );
}

export function SearchButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-3 py-2 text-sm text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors border border-slate-200 dark:border-slate-700"
    >
      <Search className="h-4 w-4" />
      <span className="hidden sm:inline">Buscar...</span>
      <kbd className="hidden md:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-600">
        Ctrl+K
      </kbd>
    </button>
  );
}
