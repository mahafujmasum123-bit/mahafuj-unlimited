import React from 'react';
import { Advertisement } from '../../../types';
import { AdminDrawer } from '../common/modal';
import {
  Megaphone,
  Eye,
  MousePointerClick,
  Calendar,
  Smartphone,
  ExternalLink,
  Edit2,
  Layers,
  Sparkles,
  BarChart2,
} from 'lucide-react';

interface AdvertisementDetailsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  advertisement: Advertisement | null;
  onEdit?: (ad: Advertisement) => void;
}

export const AdvertisementDetailsDrawer: React.FC<AdvertisementDetailsDrawerProps> = ({
  isOpen,
  onClose,
  advertisement,
  onEdit,
}) => {
  if (!advertisement) return null;

  const ctr =
    advertisement.impressions && advertisement.impressions > 0
      ? (((advertisement.clicks || 0) / advertisement.impressions) * 100).toFixed(2)
      : '0.00';

  return (
    <AdminDrawer
      isOpen={isOpen}
      onClose={onClose}
      width="xl"
      icon={<Megaphone className="w-5 h-5" />}
      title={advertisement.title}
      subtitle={`Campaign: ${advertisement.name}`}
      badge={
        <span
          className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
            advertisement.status === 'published'
              ? 'bg-emerald-100 text-emerald-800'
              : 'bg-amber-100 text-amber-800'
          }`}
        >
          {advertisement.status}
        </span>
      }
      footer={
        <div className="w-full flex items-center justify-between gap-3">
          <span className="text-[11px] font-mono text-slate-400">
            Priority: {advertisement.priority || 1}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Close
            </button>
            {onEdit && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onEdit(advertisement);
                }}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit Advertisement</span>
              </button>
            )}
          </div>
        </div>
      }
    >
      {/* 1. Live Banner Card Preview */}
      <div className="space-y-2">
        <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>Visual Rendering Preview</span>
        </h4>
        <div
          className={`w-full rounded-2xl overflow-hidden p-5 bg-gradient-to-r ${advertisement.gradient || 'from-blue-950 via-slate-900 to-slate-950'} border border-slate-800 text-white flex items-center justify-between gap-4`}
          style={{ backgroundColor: advertisement.backgroundColor || '#051329' }}
        >
          <div className="space-y-2 max-w-sm">
            {advertisement.promoBadge && (
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-blue-500 text-white font-extrabold text-[10px] uppercase">
                {advertisement.promoBadge}
              </span>
            )}
            <h3 className="text-base font-black leading-tight text-white">{advertisement.title}</h3>
            {advertisement.subtitle && (
              <p className="text-xs text-slate-300 font-medium">{advertisement.subtitle}</p>
            )}
            {advertisement.cta?.enabled && (
              <div className="pt-1">
                <span className="inline-block px-4 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold shadow-xs">
                  {advertisement.cta.label || 'Shop Now'} →
                </span>
              </div>
            )}
          </div>

          {advertisement.mainImage && (
            <img
              src={advertisement.mainImage}
              alt={advertisement.title}
              className="w-28 h-28 object-contain drop-shadow-lg shrink-0"
            />
          )}
        </div>
      </div>

      {/* 2. Campaign Metrics */}
      <div className="space-y-2">
        <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
          <BarChart2 className="w-3.5 h-3.5 text-blue-600" />
          <span>Performance Analytics</span>
        </h4>
        <div className="grid grid-cols-3 gap-2.5">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
              Impressions
            </span>
            <span className="text-sm font-black text-slate-900 tabular-nums">
              {(advertisement.impressions || 0).toLocaleString()}
            </span>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
              Clicks
            </span>
            <span className="text-sm font-black text-blue-600 tabular-nums">
              {(advertisement.clicks || 0).toLocaleString()}
            </span>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
              CTR %
            </span>
            <span className="text-sm font-black text-emerald-600 tabular-nums">
              {ctr}%
            </span>
          </div>
        </div>
      </div>

      {/* 3. Targeted Placements */}
      <div className="space-y-2 text-xs">
        <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-blue-600" />
          <span>Active Storefront Placements ({advertisement.placements?.length || 0})</span>
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {advertisement.placements?.map((p, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 font-mono text-[11px] font-bold"
            >
              {p}
            </span>
          ))}
        </div>
      </div>

      {/* 4. Scheduling & Dismissal Details */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
        <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
          Configuration & Policy
        </h4>
        <div className="grid grid-cols-2 gap-2 text-[11px]">
          <div>
            <span className="text-slate-400 font-semibold block">Device Targeting:</span>
            <span className="font-bold text-slate-800 capitalize">
              {advertisement.deviceTargeting || 'All Devices'}
            </span>
          </div>
          <div>
            <span className="text-slate-400 font-semibold block">Dismissal Policy:</span>
            <span className="font-bold text-slate-800 capitalize">
              {advertisement.closeButton?.dismissalPolicy || 'Session'}
            </span>
          </div>
          {advertisement.startDate && (
            <div>
              <span className="text-slate-400 font-semibold block">Flight Start:</span>
              <span className="font-mono text-slate-800">
                {new Date(advertisement.startDate).toLocaleDateString()}
              </span>
            </div>
          )}
          {advertisement.endDate && (
            <div>
              <span className="text-slate-400 font-semibold block">Flight End:</span>
              <span className="font-mono text-slate-800">
                {new Date(advertisement.endDate).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>
      </div>
    </AdminDrawer>
  );
};
