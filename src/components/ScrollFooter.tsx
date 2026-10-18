import React, { useState, useEffect } from 'react';
import {
  ArrowUp,
  Award,
  Printer,
  FileText,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  ExternalLink,
  MessageCircle
} from 'lucide-react';
import { ModuleId, UserPermission } from '../types';
import { BRAND_DETAILS } from '../data/initialData';

interface ScrollFooterProps {
  activeModule: ModuleId;
  onSelectModule: (id: ModuleId) => void;
  currentUser: UserPermission;
  onOpenWhatsApp: () => void;
}

export const ScrollFooter: React.FC<ScrollFooterProps> = ({
  activeModule,
  onSelectModule,
  currentUser,
  onOpenWhatsApp,
}) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {/* 1. Floating Scroll To Top Action Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          title="উপরে স্ক্রোল করুন (Scroll to top)"
          className="no-print fixed bottom-20 right-4 md:bottom-8 md:right-8 z-50 p-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 shadow-2xl shadow-amber-500/40 hover:from-amber-400 hover:to-amber-500 border border-amber-300 transition-all transform hover:scale-110 active:scale-95 flex items-center justify-center group"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" />
        </button>
      )}

      {/* 2. Full Luxury Brand Scroll Footer */}
      <footer className="no-print bg-neutral-950 border-t border-amber-900/30 pt-10 pb-28 md:pb-10 text-neutral-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Column 1: Brand Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <span className="font-serif-luxury text-xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500">
                  {BRAND_DETAILS.name}
                </span>
                <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  Luxury
                </span>
              </div>
              <p className="text-neutral-400 text-xs leading-relaxed">
                {BRAND_DETAILS.tagline}। খাঁটি সিলেট শ্রীমঙ্গলের ঐতিহ্যবাহী আগর কাঠ ও প্রিমিয়াম ফরাসি ফর্মুলায় তৈরি আতর ও পারফিউম।
              </p>
              <div className="pt-1 flex items-center space-x-2 text-neutral-400 text-xs">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{BRAND_DETAILS.address}</span>
              </div>
            </div>

            {/* Column 2: Quick Navigation & All 8 Modules */}
            <div>
              <h4 className="text-neutral-200 font-semibold tracking-wider uppercase text-xs mb-3 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                সরাসরি মডিউলে যান
              </h4>
              <div className="grid grid-cols-2 gap-1.5 text-xs">
                <button
                  onClick={() => { onSelectModule(1); scrollToTop(); }}
                  className={`text-left py-1 px-1.5 rounded hover:text-amber-300 transition-colors ${activeModule === 1 ? 'text-amber-400 font-medium' : ''}`}
                >
                  ১. ইউজার এক্সেস
                </button>
                <button
                  onClick={() => { onSelectModule(2); scrollToTop(); }}
                  className={`text-left py-1 px-1.5 rounded hover:text-amber-300 transition-colors ${activeModule === 2 ? 'text-amber-400 font-medium' : ''}`}
                >
                  ২. সেলস রিপোর্ট
                </button>
                <button
                  onClick={() => { onSelectModule(3); scrollToTop(); }}
                  className={`text-left py-1 px-1.5 rounded hover:text-amber-300 transition-colors ${activeModule === 3 ? 'text-amber-400 font-medium' : ''}`}
                >
                  ৩. জেমিনai ফর্মুলা
                </button>
                <button
                  onClick={() => { onSelectModule(4); scrollToTop(); }}
                  className={`text-left py-1 px-1.5 rounded hover:text-amber-300 transition-colors ${activeModule === 4 ? 'text-amber-400 font-medium' : ''}`}
                >
                  ৪. পারফিউম ভল্ট
                </button>
                <button
                  onClick={() => { onSelectModule(5); scrollToTop(); }}
                  className={`text-left py-1 px-1.5 rounded hover:text-amber-300 transition-colors ${activeModule === 5 ? 'text-amber-400 font-medium' : ''}`}
                >
                  ৫. P&L হিসাব
                </button>
                <button
                  onClick={() => { onSelectModule(6); scrollToTop(); }}
                  className={`text-left py-1 px-1.5 rounded hover:text-amber-300 transition-colors ${activeModule === 6 ? 'text-amber-400 font-medium' : ''}`}
                >
                  ৬. ইনভয়েস জেনারেটর
                </button>
                <button
                  onClick={() => { onSelectModule(7); scrollToTop(); }}
                  className={`text-left py-1 px-1.5 rounded hover:text-amber-300 font-semibold text-amber-300 transition-colors bg-amber-500/10 border border-amber-500/20`}
                >
                  ৭. থার্মাল স্টিকার 🖨️
                </button>
                <button
                  onClick={() => { onSelectModule(8); scrollToTop(); }}
                  className={`text-left py-1 px-1.5 rounded hover:text-amber-300 font-semibold text-amber-300 transition-colors bg-amber-500/10 border border-amber-500/20`}
                >
                  ৮. থ্যাঙ্ক ইউ কার্ড 🏆
                </button>
              </div>
            </div>

            {/* Column 3: Contact & Support */}
            <div className="space-y-2.5">
              <h4 className="text-neutral-200 font-semibold tracking-wider uppercase text-xs mb-3 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                যোগাযোগ ও সাপোর্ট
              </h4>
              <div className="flex items-center space-x-2 text-neutral-300">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>হটলাইন: {BRAND_DETAILS.mobile}</span>
              </div>
              <div className="flex items-center space-x-2 text-neutral-300">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>ইমেইল: {BRAND_DETAILS.email}</span>
              </div>
              <div className="pt-2">
                <button
                  onClick={onOpenWhatsApp}
                  className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-600/30 text-xs transition-all"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>হোয়াটসঅ্যাপ মেসেজ পাঠান</span>
                </button>
              </div>
            </div>

            {/* Column 4: System Security & Quick Scroll Back */}
            <div className="space-y-3">
              <h4 className="text-neutral-200 font-semibold tracking-wider uppercase text-xs mb-3 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                সুরক্ষা ও সেশন
              </h4>
              <p className="text-[11px] text-neutral-400">
                লগইন সেশন: <span className="text-neutral-200 font-medium">{currentUser.fullName}</span> ({currentUser.role})
              </p>
              <div className="p-2.5 rounded-xl bg-neutral-900/80 border border-neutral-800 text-[11px] text-neutral-400 space-y-1">
                <div>ভার্সন: v1.2.0 (Enterprise)</div>
                <div className="text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  সিস্টেম স্ট্যাটাস: অনলাইন ও সুরক্ষিত
                </div>
              </div>
              <button
                onClick={scrollToTop}
                className="w-full flex items-center justify-center space-x-1.5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-850 text-amber-400 border border-neutral-800 hover:border-amber-500/40 text-xs transition-all active:scale-98"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>পেজের শুরুতে ফিরে যান</span>
              </button>
            </div>
          </div>

          {/* Bottom Copyright Strip */}
          <div className="pt-6 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-[11px] text-neutral-400">
            <div>
              © {new Date().getFullYear()} <span className="text-amber-400 font-medium">{BRAND_DETAILS.name}</span>. সর্বস্বত্ব সংরক্ষিত।
            </div>
            <div className="flex items-center space-x-4">
              <span>শ্রীমঙ্গল, মৌলভীবাজার</span>
              <span>•</span>
              <button onClick={() => { onSelectModule(7); scrollToTop(); }} className="hover:text-amber-400">
                পেজ ৭: স্টিকার
              </button>
              <span>•</span>
              <button onClick={() => { onSelectModule(8); scrollToTop(); }} className="hover:text-amber-400">
                পেজ ৮: কার্ড
              </button>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
