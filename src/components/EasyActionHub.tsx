import React from 'react';
import {
  FileText,
  Printer,
  Award,
  BarChart3,
  Sparkles,
  FlaskConical,
  Info
} from 'lucide-react';
import { ModuleId, UserPermission } from '../types';

interface EasyActionHubProps {
  activeModule: ModuleId;
  onSelectModule: (id: ModuleId) => void;
  currentUser: UserPermission;
  theme?: 'bright' | 'dark';
  onToggleTheme?: () => void;
}

export const EasyActionHub: React.FC<EasyActionHubProps> = ({
  activeModule,
  onSelectModule,
  currentUser,
}) => {
  const [isExpanded, setIsExpanded] = React.useState(true);

  // Friendly step-by-step helper texts for each module in easy Bengali
  const getModuleHelp = (id: ModuleId) => {
    switch (id) {
      case 1:
        return {
          title: 'ইউজার ও কর্মী এক্সেস নিয়ন্ত্রণ',
          desc: 'আপনার দোকানের স্টাফ বা পার্টনারদের জন্য আলাদা একাউন্ট তৈরি করুন এবং কে কোন পেজ দেখতে পারবে তা নির্ধারণ করুন।',
          badge: '১ নং পেজ',
        };
      case 2:
        return {
          title: 'কাস্টমার ডাটা ও বিক্রয় রিপোর্ট',
          desc: 'দৈনিক মোট কত টাকার আতর ও পারফিউম বিক্রি হলো, কোন কাস্টমার কতবার কিনল এবং বকেয়া হিসাব এক নজরে দেখুন।',
          badge: '২ নং পেজ',
        };
      case 3:
        return {
          title: 'জেমিনাই ৩.৮ AI পারফিউম কনসালটেন্ট',
          desc: 'কৃত্রিম বুদ্ধিমত্তার কাছে যেকোনো নতুন সুগন্ধি, তামাক-ভ্যানিলা নোট কম্বিনেশন বা ব্যবসায়িক পরামর্শ বাংলায় লিখে জানতে চান।',
          badge: '৩ নং পেজ',
        };
      case 4:
        return {
          title: 'খাঁটি আগর ও পারফিউম ফর্মুলা ভল্ট',
          desc: 'আপনার গোপন আতর রেসিপি, সিলেট শ্রীমঙ্গলের খাঁটি আগর তেলের অনুপাত এবং ম্যাসারেশন দিনপঞ্জি নিরাপদে সংরক্ষণ করুন।',
          badge: '৪ নং পেজ',
        };
      case 5:
        return {
          title: 'লাভ-ক্ষতি ও খরচের হিসাব (P&L)',
          desc: 'প্যাকেজিং খরচ, আগর কাঠ কেনা, বোতল, স্টিকার ও বিজ্ঞাপনের খরচ বাদ দিয়ে নিট লাভ কত হলো তা হিসাব করুন।',
          badge: '৫ নং পেজ',
        };
      case 6:
        return {
          title: 'কুরিয়ার ইনভয়েস ও অর্ডার জেনারেটর',
          desc: 'কাস্টমারের নাম, ফোন, ঠিকানা ও পারফিউম নির্বাচন করে ক্যাশ অন ডেলিভারি (COD) সহ প্রফেশনাল ইনভয়েস তৈরি ও প্রিন্ট করুন।',
          badge: '৬ নং পেজ',
        };
      case 7:
        return {
          title: 'থার্মাল স্টিকার প্রিন্টার (Courier Sticker - Rongta/Any)',
          desc: 'স্টিডফাস্ট, পাঠাও বা রেডএক্স পার্সেল বক্সের ওপর লাগানোর জন্য ৩"×২" বা ৪"×৬" সাইজে বারকোডসহ স্টিকার সরাসরি প্রিন্ট দিন।',
          badge: '৭ নং পেজ (স্টিকার)',
        };
      case 8:
        return {
          title: 'লাক্সারি থ্যাঙ্ক ইউ ও পারফিউম কেয়ার কার্ড',
          desc: 'কাস্টমার পার্সেল খুললেই যেন রাজকীয় অনুভূতি পায়—তার জন্য গোল্ডেন বর্ডার থ্যাঙ্ক ইউ এবং পারফিউম ব্যবহার বিধি কার্ড প্রিন্ট করুন।',
          badge: '৮ নং পেজ (কার্ড)',
        };
    }
  };

  const currentHelp = getModuleHelp(activeModule);

  return (
    <div className="no-print mb-4 transition-all">
      {/* 1. Friendly Mode Header Banner */}
      <div className="bg-[#121824] border border-amber-500/40 rounded-2xl p-3 sm:p-4 shadow-xl mb-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-400 text-slate-950 flex items-center justify-center font-black text-xl shadow-md shrink-0">
              V
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-extrabold text-white flex items-center gap-1.5 tracking-wide">
                  সহজ ড্যাশবোর্ড • VELLURE Luxury Fragrances
                </h2>
                <span className="text-[10px] font-bold bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/40">
                  {currentUser.role}
                </span>
              </div>
              <p className="text-xs text-slate-200 font-medium mt-0.5">
                সবকটি কাজ সহজে করার জন্য নিচের বড় বাটনগুলোতে ক্লিক করে সরাসরি পছন্দের পেজে যান।
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 self-end sm:self-center shrink-0">
            {/* Collapse/Expand Hub Button */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="px-3 py-1.5 rounded-xl text-xs font-bold text-white hover:text-amber-300 bg-[#1c2436] hover:bg-[#253046] border border-slate-600 transition-all cursor-pointer"
            >
              {isExpanded ? 'শর্টকাট লুকান ▲' : 'শর্টকাট দেখান ▼'}
            </button>
          </div>
        </div>

        {/* 2. Big, Easy, Friendly Quick Shortcut Cards */}
        {isExpanded && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-2.5 mt-3 pt-3 border-t border-slate-700/80">
            {/* Action 1: New Invoice */}
            <button
              onClick={() => onSelectModule(6)}
              className={`p-3 rounded-xl text-left transition-all border group relative flex flex-col justify-between cursor-pointer ${
                activeModule === 6
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg ring-2 ring-amber-300'
                  : 'bg-[#182235] hover:bg-[#223049] text-white border-slate-700 hover:border-amber-500/60 shadow-md'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`p-1.5 rounded-lg ${activeModule === 6 ? 'bg-slate-950 text-amber-400' : 'bg-amber-500/20 text-amber-300'}`}>
                  <FileText className="w-5 h-5" />
                </span>
                <span className={`text-[11px] font-black px-2 py-0.5 rounded ${activeModule === 6 ? 'bg-slate-950 text-white' : 'bg-[#101725] text-amber-300 border border-slate-700'}`}>
                  ৬ নং
                </span>
              </div>
              <div>
                <div className={`text-xs font-black leading-snug ${activeModule === 6 ? 'text-slate-950' : 'text-white'}`}>
                  ইনভয়েস তৈরি
                </div>
                <div className={`text-[11px] font-semibold mt-0.5 ${activeModule === 6 ? 'text-slate-900' : 'text-slate-200'}`}>
                  অর্ডার এন্ট্রি ও বিল
                </div>
              </div>
            </button>

            {/* Action 2: Thermal Courier Stickers (Page 7) */}
            <button
              onClick={() => onSelectModule(7)}
              className={`p-3 rounded-xl text-left transition-all border group relative flex flex-col justify-between cursor-pointer ${
                activeModule === 7
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg ring-2 ring-amber-300'
                  : 'bg-[#182235] hover:bg-[#223049] text-white border-amber-500/50 hover:border-amber-400 shadow-md'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`p-1.5 rounded-lg ${activeModule === 7 ? 'bg-slate-950 text-amber-400' : 'bg-amber-500/25 text-amber-300 border border-amber-500/40'}`}>
                  <Printer className="w-5 h-5" />
                </span>
                <span className={`text-[11px] font-black px-2 py-0.5 rounded ${activeModule === 7 ? 'bg-slate-950 text-white' : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'}`}>
                  ৭ নং পেজ
                </span>
              </div>
              <div>
                <div className={`text-xs font-black leading-snug ${activeModule === 7 ? 'text-slate-950' : 'text-amber-300'}`}>
                  থার্মাল স্টিকার 🖨️
                </div>
                <div className={`text-[11px] font-semibold mt-0.5 ${activeModule === 7 ? 'text-slate-900' : 'text-slate-200'}`}>
                  কুরিয়ার লেবেল প্রিন্ট
                </div>
              </div>
            </button>

            {/* Action 3: Luxury Thank You Cards (Page 8) */}
            <button
              onClick={() => onSelectModule(8)}
              className={`p-3 rounded-xl text-left transition-all border group relative flex flex-col justify-between cursor-pointer ${
                activeModule === 8
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg ring-2 ring-amber-300'
                  : 'bg-[#182235] hover:bg-[#223049] text-white border-amber-500/50 hover:border-amber-400 shadow-md'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`p-1.5 rounded-lg ${activeModule === 8 ? 'bg-slate-950 text-amber-400' : 'bg-amber-500/25 text-amber-300 border border-amber-500/40'}`}>
                  <Award className="w-5 h-5" />
                </span>
                <span className={`text-[11px] font-black px-2 py-0.5 rounded ${activeModule === 8 ? 'bg-slate-950 text-white' : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'}`}>
                  ৮ নং পেজ
                </span>
              </div>
              <div>
                <div className={`text-xs font-black leading-snug ${activeModule === 8 ? 'text-slate-950' : 'text-amber-300'}`}>
                  থ্যাঙ্ক ইউ কার্ড 🏆
                </div>
                <div className={`text-[11px] font-semibold mt-0.5 ${activeModule === 8 ? 'text-slate-900' : 'text-slate-200'}`}>
                  পার্সেল গোল্ডেন কার্ড
                </div>
              </div>
            </button>

            {/* Action 4: Sales Analytics */}
            <button
              onClick={() => onSelectModule(2)}
              className={`p-3 rounded-xl text-left transition-all border group relative flex flex-col justify-between cursor-pointer ${
                activeModule === 2
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg ring-2 ring-amber-300'
                  : 'bg-[#182235] hover:bg-[#223049] text-white border-slate-700 hover:border-amber-500/60 shadow-md'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`p-1.5 rounded-lg ${activeModule === 2 ? 'bg-slate-950 text-emerald-400' : 'bg-emerald-500/20 text-emerald-300'}`}>
                  <BarChart3 className="w-5 h-5" />
                </span>
                <span className={`text-[11px] font-black px-2 py-0.5 rounded ${activeModule === 2 ? 'bg-slate-950 text-white' : 'bg-[#101725] text-slate-200 border border-slate-700'}`}>
                  ২ নং
                </span>
              </div>
              <div>
                <div className={`text-xs font-black leading-snug ${activeModule === 2 ? 'text-slate-950' : 'text-white'}`}>
                  বিক্রয় ও কাস্টমার
                </div>
                <div className={`text-[11px] font-semibold mt-0.5 ${activeModule === 2 ? 'text-slate-900' : 'text-slate-200'}`}>
                  দৈনিক সেলস চার্ট
                </div>
              </div>
            </button>

            {/* Action 5: Gemini AI Advisor */}
            <button
              onClick={() => onSelectModule(3)}
              className={`p-3 rounded-xl text-left transition-all border group relative flex flex-col justify-between cursor-pointer ${
                activeModule === 3
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg ring-2 ring-amber-300'
                  : 'bg-[#182235] hover:bg-[#223049] text-white border-slate-700 hover:border-amber-500/60 shadow-md'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`p-1.5 rounded-lg ${activeModule === 3 ? 'bg-slate-950 text-amber-400' : 'bg-purple-500/20 text-purple-300'}`}>
                  <Sparkles className="w-5 h-5" />
                </span>
                <span className={`text-[11px] font-black px-2 py-0.5 rounded ${activeModule === 3 ? 'bg-slate-950 text-white' : 'bg-[#101725] text-slate-200 border border-slate-700'}`}>
                  ৩ নং
                </span>
              </div>
              <div>
                <div className={`text-xs font-black leading-snug ${activeModule === 3 ? 'text-slate-950' : 'text-white'}`}>
                  জেমিনাই AI
                </div>
                <div className={`text-[11px] font-semibold mt-0.5 ${activeModule === 3 ? 'text-slate-900' : 'text-slate-200'}`}>
                  স্মার্ট পরামর্শ ও রেসিপি
                </div>
              </div>
            </button>

            {/* Action 6: Formulas & Vault */}
            <button
              onClick={() => onSelectModule(4)}
              className={`p-3 rounded-xl text-left transition-all border group relative flex flex-col justify-between cursor-pointer ${
                activeModule === 4
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg ring-2 ring-amber-300'
                  : 'bg-[#182235] hover:bg-[#223049] text-white border-slate-700 hover:border-amber-500/60 shadow-md'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`p-1.5 rounded-lg ${activeModule === 4 ? 'bg-slate-950 text-amber-400' : 'bg-amber-500/20 text-amber-300'}`}>
                  <FlaskConical className="w-5 h-5" />
                </span>
                <span className={`text-[11px] font-black px-2 py-0.5 rounded ${activeModule === 4 ? 'bg-slate-950 text-white' : 'bg-[#101725] text-slate-200 border border-slate-700'}`}>
                  ৪ নং
                </span>
              </div>
              <div>
                <div className={`text-xs font-black leading-snug ${activeModule === 4 ? 'text-slate-950' : 'text-white'}`}>
                  পারফিউম ভল্ট
                </div>
                <div className={`text-[11px] font-semibold mt-0.5 ${activeModule === 4 ? 'text-slate-900' : 'text-slate-200'}`}>
                  আগর ফর্মুলা রেসিপি
                </div>
              </div>
            </button>
          </div>
        )}
      </div>

      {/* 3. Current Page Friendly Guidance Bar */}
      <div className="flex items-start sm:items-center justify-between gap-3 px-4 py-3 rounded-xl border border-amber-500/40 bg-[#121824] shadow-md">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-amber-500 text-slate-950 font-black shrink-0">
            <Info className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-extrabold text-white tracking-wide">
                {currentHelp.badge}: {currentHelp.title}
              </span>
            </div>
            <p className="text-xs text-slate-200 font-medium leading-relaxed mt-0.5">
              {currentHelp.desc}
            </p>
          </div>
        </div>

        {/* Quick direct jump to Page 7 or Page 8 if not currently there */}
        {activeModule !== 7 && activeModule !== 8 && (
          <div className="hidden sm:flex items-center space-x-2 shrink-0">
            <button
              onClick={() => onSelectModule(7)}
              className="px-3 py-1.5 rounded-lg text-xs font-black bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors shadow-md cursor-pointer"
            >
              ৭ নং পেজ (স্টিকার)
            </button>
            <button
              onClick={() => onSelectModule(8)}
              className="px-3 py-1.5 rounded-lg text-xs font-black bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors shadow-md cursor-pointer"
            >
              ৮ নং পেজ (কার্ড)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
