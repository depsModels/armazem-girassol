"use client";

import React from "react";
import { Category } from "@/types";
import { Search, X, SlidersHorizontal } from "lucide-react";

export type SortOption =
  | "relevance"
  | "price-asc"
  | "price-desc"
  | "best-seller"
  | "rating";

interface FilterSidebarProps {
  categories: Category[];
  selectedCategory: string | null;
  sortBy: SortOption;
  searchQuery: string;
  onCategoryChange: (slug: string | null) => void;
  onSortChange: (sort: SortOption) => void;
  onSearchChange: (query: string) => void;
  onClearFilters: () => void;
  totalResults: number;
  isLoading?: boolean;
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "relevance", label: "Relevância" },
  { value: "best-seller", label: "Mais Vendidos" },
  { value: "rating", label: "Melhor Avaliação" },
  { value: "price-asc", label: "Menor Preço" },
  { value: "price-desc", label: "Maior Preço" },
];

export default function FilterSidebar({
  categories,
  selectedCategory,
  sortBy,
  searchQuery,
  onCategoryChange,
  onSortChange,
  onSearchChange,
  onClearFilters,
  totalResults,
  isLoading = false,
}: FilterSidebarProps) {
  const hasActiveFilters =
    selectedCategory !== null ||
    sortBy !== "relevance" ||
    searchQuery.trim() !== "";

  return (
    <aside className="w-full h-full lg:h-auto lg:w-64 xl:w-72 shrink-0 flex flex-col">
      <div className="sticky top-24 flex-1 lg:flex-initial bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden flex flex-col lg:max-h-[calc(100vh-8rem)]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-black/5">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-amber-900" />
            <span className="font-bold text-amber-950 text-sm">Filtros</span>
            {isLoading ? (
              <span className="text-xs text-gray-300 font-normal">(...)</span>
            ) : (
              <span className="text-xs text-gray-400 font-normal">
                ({totalResults} produto{totalResults !== 1 ? "s" : ""})
              </span>
            )}
          </div>
          {!isLoading && hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="text-xs text-[#2E8B57] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
            >
              <X className="w-3 h-3" />
              Limpar
            </button>
          )}
        </div>

        <div className="p-5 flex flex-col gap-6 flex-1 overflow-y-auto scrollbar-thin">
          {/* Search */}
          <div className="shrink-0">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">
              Buscar
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Nome do produto..."
                className="w-full pl-9 pr-3 py-2 text-sm border border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400 bg-gray-50 placeholder:text-gray-400 transition"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-black/5 shrink-0" />

          {/* Category Filter */}
          <div className="flex flex-col shrink-0">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 block">
              Categoria
            </label>
            <div className="flex flex-col gap-1">
              {isLoading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-9 bg-gray-100 rounded-lg animate-pulse"
                    style={{ opacity: 1 - i * 0.1 }}
                  />
                ))
              ) : (
                <>
                  <button
                    onClick={() => onCategoryChange(null)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${selectedCategory === null
                        ? "bg-amber-950 text-white"
                        : "text-gray-600 hover:bg-gray-50 hover:text-amber-950"
                      }`}
                  >
                    Todas as categorias
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => onCategoryChange(cat.slug)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${selectedCategory === cat.slug
                          ? "bg-amber-950 text-white"
                          : "text-gray-600 hover:bg-gray-50 hover:text-amber-950"
                        }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </>
              )}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-black/5 shrink-0" />

          {/* Sort */}
          <div className="shrink-0">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 block">
              Ordenar por
            </label>
            <div className="flex flex-col gap-1">
              {sortOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => onSortChange(opt.value)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer flex items-center gap-2 ${sortBy === opt.value
                      ? "text-[#2E8B57] bg-emerald-50 font-semibold"
                      : "text-gray-600 hover:bg-gray-50 hover:text-amber-950"
                    }`}
                >
                  {sortBy === opt.value && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2E8B57] shrink-0" />
                  )}
                  {sortBy !== opt.value && (
                    <span className="w-1.5 h-1.5 rounded-full bg-transparent shrink-0" />
                  )}
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
