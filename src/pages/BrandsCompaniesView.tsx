import React, { useState } from 'react';
import { 
  Building2, Sparkles, Pill, Plus, Search, Filter, 
  Trash2, Edit2, Globe, CheckCircle2, XCircle, Image as ImageIcon,
  Check, X, ChevronRight, Tag
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Brand } from '../types';

export const BrandsCompaniesView: React.FC = () => {
  const { brands, addBrand, updateBrand, deleteBrand, medicines, cosmetics } = useApp();

  const [activeTab, setActiveTab] = useState<'ALL' | 'COSMETICS' | 'MEDICINE'>('ALL');
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);

  // Form State (Image/Logo is strictly optional!)
  const initialForm = {
    name: '',
    type: 'COSMETICS' as 'COSMETICS' | 'MEDICINE',
    category: 'Skincare & Cosmetics',
    originCountry: 'United States',
    description: '',
    logo: '', // Optional!
    status: 'Active' as 'Active' | 'Inactive'
  };

  const [formData, setFormData] = useState(initialForm);

  // Filter brands based on search and tab
  const filteredBrands = brands.filter(b => {
    const matchesTab = activeTab === 'ALL' || b.type === activeTab;
    const matchesSearch = 
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.category.toLowerCase().includes(search.toLowerCase()) ||
      b.originCountry.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleOpenAdd = (defaultType?: 'COSMETICS' | 'MEDICINE') => {
    setEditingBrand(null);
    setFormData({
      ...initialForm,
      type: defaultType || (activeTab === 'MEDICINE' ? 'MEDICINE' : 'COSMETICS'),
      category: defaultType === 'MEDICINE' ? 'Pharmaceuticals' : 'Skincare & Beauty'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (brand: Brand) => {
    setEditingBrand(brand);
    setFormData({
      name: brand.name,
      type: brand.type,
      category: brand.category,
      originCountry: brand.originCountry,
      description: brand.description || '',
      logo: brand.logo || '',
      status: brand.status
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBrand) {
      updateBrand(editingBrand.id, formData);
    } else {
      addBrand({
        ...formData,
        productsCount: 0
      });
    }
    setIsModalOpen(false);
  };

  const cosmeticsBrandsCount = brands.filter(b => b.type === 'COSMETICS').length;
  const medicineCompaniesCount = brands.filter(b => b.type === 'MEDICINE').length;

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      
      {/* Top Banner */}
      <div className="bg-white/85 backdrop-blur-md rounded-2xl border border-white/60 shadow-lg p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
              Brands & Pharmaceutical Companies
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-pink-100 text-pink-800 text-xs font-bold uppercase tracking-wider">
              Directory & Supply Catalog
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            Manage authenticated cosmetics beauty brands and verified pharmaceutical manufacturers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleOpenAdd('COSMETICS')}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-all active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>+ Add Makeup Brand</span>
          </button>

          <button
            onClick={() => handleOpenAdd('MEDICINE')}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-700 to-emerald-700 hover:from-teal-800 hover:to-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-all active:scale-95"
          >
            <Pill className="w-3.5 h-3.5" />
            <span>+ Add Pharma Company</span>
          </button>
        </div>
      </div>

      {/* Main Filter & Grid Container */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-white/70 shadow-lg p-5 sm:p-6 space-y-6">
        
        {/* Filter Navigation Tabs + Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
          
          {/* Pill Tabs */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold">
            <button
              onClick={() => setActiveTab('ALL')}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeTab === 'ALL' 
                  ? 'bg-white text-slate-900 shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Directory ({brands.length})
            </button>
            <button
              onClick={() => setActiveTab('COSMETICS')}
              className={`px-4 py-2 rounded-lg flex items-center gap-1.5 transition-all ${
                activeTab === 'COSMETICS' 
                  ? 'bg-pink-600 text-white shadow-xs' 
                  : 'text-slate-600 hover:text-pink-600'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Makeup & Cosmetics ({cosmeticsBrandsCount})</span>
            </button>
            <button
              onClick={() => setActiveTab('MEDICINE')}
              className={`px-4 py-2 rounded-lg flex items-center gap-1.5 transition-all ${
                activeTab === 'MEDICINE' 
                  ? 'bg-teal-700 text-white shadow-xs' 
                  : 'text-slate-600 hover:text-teal-700'
              }`}
            >
              <Pill className="w-3.5 h-3.5" />
              <span>Pharma Companies ({medicineCompaniesCount})</span>
            </button>
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search brand, company, country..."
              className="pl-9 pr-4 py-2 rounded-xl border border-slate-300 bg-white text-xs text-slate-800 focus:outline-hidden focus:border-blue-500 w-full sm:w-64 shadow-2xs"
            />
          </div>
        </div>

        {/* Brand Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredBrands.length === 0 ? (
            <div className="col-span-full py-16 text-center text-slate-400 text-xs">
              No brands or pharmaceutical companies found matching the filter.
            </div>
          ) : (
            filteredBrands.map((brand) => {
              const isCosmetic = brand.type === 'COSMETICS';

              return (
                <div
                  key={brand.id}
                  className={`p-4 rounded-2xl border transition-all hover:shadow-md flex flex-col justify-between group ${
                    isCosmetic
                      ? 'bg-gradient-to-b from-pink-50/50 to-white border-pink-100 hover:border-pink-300'
                      : 'bg-gradient-to-b from-teal-50/50 to-white border-teal-100 hover:border-teal-300'
                  }`}
                >
                  <div>
                    {/* Top Type Tag & Status */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1 ${
                        isCosmetic
                          ? 'bg-pink-100 text-pink-700'
                          : 'bg-teal-100 text-teal-800'
                      }`}>
                        {isCosmetic ? <Sparkles className="w-3 h-3" /> : <Pill className="w-3 h-3" />}
                        <span>{isCosmetic ? 'Makeup Brand' : 'Pharma Co.'}</span>
                      </span>

                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        brand.status === 'Active' 
                          ? 'bg-emerald-100 text-emerald-700' 
                          : 'bg-slate-100 text-slate-500'
                      }`}>
                        {brand.status}
                      </span>
                    </div>

                    {/* Logo/Image Avatar (Optional - graceful fallback!) */}
                    <div className="flex items-center gap-3 mb-3">
                      {brand.logo ? (
                        <div className="w-12 h-12 rounded-xl bg-white p-1 border border-slate-200 overflow-hidden shrink-0 shadow-2xs">
                          <img
                            src={brand.logo}
                            alt={brand.name}
                            className="w-full h-full object-cover rounded-lg"
                            onError={(e) => {
                              // Fallback on broken image
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                        </div>
                      ) : (
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-sm uppercase shrink-0 shadow-2xs ${
                          isCosmetic
                            ? 'bg-pink-200 text-pink-800'
                            : 'bg-teal-200 text-teal-900'
                        }`}>
                          {brand.name.substring(0, 2)}
                        </div>
                      )}

                      <div className="min-w-0">
                        <h3 className="font-heading font-black text-base text-slate-900 truncate">
                          {brand.name}
                        </h3>
                        <div className="text-[11px] text-slate-500 flex items-center gap-1 truncate">
                          <Globe className="w-3 h-3 text-slate-400 shrink-0" />
                          <span>{brand.originCountry}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-xs font-semibold text-slate-700 mb-1">
                      {brand.category}
                    </div>

                    {brand.description && (
                      <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed mb-3">
                        {brand.description}
                      </p>
                    )}
                  </div>

                  {/* Footer with Product Count & Action buttons */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs mt-2">
                    <span className="text-[11px] font-bold text-slate-500">
                      {brand.productsCount} Products listed
                    </span>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenEdit(brand)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                        title="Edit Brand"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Remove brand ${brand.name} from directory?`)) {
                            deleteBrand(brand.id);
                          }
                        }}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Delete Brand"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>

      {/* Add / Edit Brand Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full p-6 animate-scaleUp">
            <div className="flex items-center justify-between border-b pb-3 mb-4">
              <h3 className="font-heading font-extrabold text-lg text-slate-900">
                {editingBrand ? 'Edit Brand / Company' : 'Register New Brand / Company'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 rounded-lg hover:bg-slate-100 text-slate-500">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Entity Type</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: 'COSMETICS' })}
                    className={`py-2 rounded-xl font-bold flex items-center justify-center gap-1.5 border transition-all ${
                      formData.type === 'COSMETICS'
                        ? 'bg-pink-600 text-white border-pink-600 shadow-2xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Makeup / Beauty</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: 'MEDICINE' })}
                    className={`py-2 rounded-xl font-bold flex items-center justify-center gap-1.5 border transition-all ${
                      formData.type === 'MEDICINE'
                        ? 'bg-teal-700 text-white border-teal-700 shadow-2xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <Pill className="w-3.5 h-3.5" />
                    <span>Pharmaceutical</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Brand / Company Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. AVON, L'Oréal, GSK, Pfizer"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Primary Category</label>
                  <input
                    type="text"
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g. Body Care, Antibiotics"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Country of Origin</label>
                  <input
                    type="text"
                    required
                    value={formData.originCountry}
                    onChange={(e) => setFormData({ ...formData, originCountry: e.target.value })}
                    placeholder="e.g. United States, France"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-bold text-slate-700">Logo / Image URL</label>
                  <span className="text-[10px] text-slate-400 font-semibold">(Optional)</span>
                </div>
                <input
                  type="url"
                  value={formData.logo}
                  onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                  placeholder="https://... (Leave blank to use dynamic initials)"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Description / Notes</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief summary of certifications, specialties, or product line."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-hidden"
                />
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
                <span className="font-bold text-slate-700">Operational Status</span>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="px-2.5 py-1 rounded-lg border border-slate-300 bg-white font-semibold"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold shadow-xs"
                >
                  {editingBrand ? 'Update' : 'Save Brand'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
