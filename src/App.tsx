import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, Mail, Phone, Briefcase, Users, LayoutTemplate, 
  Target, CheckCircle2, MessageCircle, Image as ImageIcon,
  Award, Mic, Sparkles, MapPin, Linkedin, PenTool, X, Crown
} from 'lucide-react';

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, className?: string, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.7, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

const GlassCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white/[0.03] backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-white/[0.05] hover:border-blue-500/30 transition-all duration-500 shadow-[0_8px_30px_rgb(0,0,0,0.12)] group ${className}`}>
    {children}
  </div>
);

const WorkCard = ({ image, category, className = "", isFeatured = false, itemsCount = 0, onClick }: { image: string, category: string, className?: string, isFeatured?: boolean, itemsCount?: number, onClick?: () => void }) => (
  <FadeIn delay={0.1} className={className}>
    <div 
      onClick={onClick}
      className="group relative overflow-hidden rounded-3xl bg-[#0B0F19] border border-white/5 hover:border-blue-500/30 transition-all duration-500 h-full cursor-pointer"
    >
      <div className={`${isFeatured ? 'h-full min-h-[400px] md:min-h-[600px]' : 'aspect-[4/5]'} overflow-hidden bg-black/40 flex items-center justify-center relative p-6`}>
        {image ? (
          <img 
            src={image} 
            alt={category} 
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700" 
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="flex flex-col items-center justify-center gap-3 opacity-50">
            <ImageIcon className="w-8 h-8 text-gray-500" />
            <span className="text-xs font-mono uppercase tracking-widest text-gray-400">Placeholder</span>
          </div>
        )}
        {/* Gradient overlays only the bottom area to enhance text visibility without darkening the whole image */}
        <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none" />
        
        {/* Badge */}
        {itemsCount > 0 && (
          <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md border border-white/10 rounded-full px-3 py-1.5 flex items-center shadow-lg group-hover:bg-blue-600/80 group-hover:border-blue-400/50 transition-colors duration-300 z-10">
            <span className="text-[11px] font-medium text-white tracking-wide">+{itemsCount} Posts</span>
          </div>
        )}
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
        <h4 className="text-xl font-bold text-white drop-shadow-lg mb-2">{category}</h4>
        <p className="text-xs text-white/90 font-mono leading-relaxed drop-shadow-md">Handled strategy, content direction, and execution across multiple teams</p>
      </div>
    </div>
  </FadeIn>
);

const CampaignCard = ({ metric, cost, desc, isMain = false }: { metric: string, cost: string, desc: string, isMain?: boolean }) => (
  <GlassCard className={`flex flex-col justify-center ${isMain ? "md:col-span-2 lg:col-span-2" : ""}`}>
    <div className="mb-4">
      <span className={`font-mono tracking-tighter font-bold drop-shadow-sm ${isMain ? "text-5xl md:text-6xl text-blue-400" : "text-4xl text-blue-500"}`}>
        {metric}
      </span>
    </div>
    <div className="mb-6 flex flex-col gap-1">
      <span className="text-lg text-gray-200 font-medium">{cost}</span>
      {isMain && <span className="text-lg text-gray-300">20-day execution</span>}
    </div>
    <div className="mt-auto pt-6 border-t border-white/5">
      <p className="text-sm text-gray-400 font-light leading-relaxed">{desc}</p>
    </div>
  </GlassCard>
);

interface WorkItem {
  type: 'post' | 'reel';
  image: string;
}

interface CategoryData {
  id: string;
  title: string;
  mainImage: string;
  isFeatured?: boolean;
  className?: string;
  items: WorkItem[];
}

const workCategories: CategoryData[] = [
  {
    id: 'medical',
    title: 'Medical',
    className: "md:col-span-2 lg:col-span-2 md:row-span-2",
    isFeatured: true,
    mainImage: 'https://aistudio.google.com/_/upload/48306713-81ca-4824-93d5-4e9b852e484d/attachment/1776627422.791336000/blobstore/prod/makersuite/spanner_managed/global::000054e2ea70026d:0000015f:2:000054e2ea70026d:0000000000000001::3038978dd04b4f7a:000001f5f96018bc:00064fd54e68d6cf',
    items: [
      { type: 'post', image: 'https://aistudio.google.com/_/upload/48306713-81ca-4824-93d5-4e9b852e484d/attachment/1776627422.791336000/blobstore/prod/makersuite/spanner_managed/global::000054e2ea70026d:0000015f:2:000054e2ea70026d:0000000000000001::3038978dd04b4f7a:000001f5f96018bc:00064fd54e68d6cf' },
      { type: 'post', image: 'https://aistudio.google.com/_/upload/48306713-81ca-4824-93d5-4e9b852e484d/attachment/1776672452.424934000/blobstore/prod/makersuite/spanner_managed/global::000054e2ea70026d:0000015f:2:000054e2ea70026d:0000000000000001::5e262e1f098ba7c2:000001f5f96018bc:00064fdfca62600f' }
    ]
  },
  {
    id: 'hospitality',
    title: 'Hotel & Hospitality',
    mainImage: 'https://aistudio.google.com/_/upload/48306713-81ca-4824-93d5-4e9b852e484d/attachment/1776670558.967424000/blobstore/prod/makersuite/spanner_managed/global::000054e2ea70026d:0000015f:2:000054e2ea70026d:0000000000000001::f8146d527d356c96:000001f5f96018bc:00064fdf598664df',
    items: [
      { type: 'reel', image: 'https://aistudio.google.com/_/upload/48306713-81ca-4824-93d5-4e9b852e484d/attachment/1776670558.967424000/blobstore/prod/makersuite/spanner_managed/global::000054e2ea70026d:0000015f:2:000054e2ea70026d:0000000000000001::f8146d527d356c96:000001f5f96018bc:00064fdf598664df' },
      { type: 'post', image: 'https://aistudio.google.com/_/upload/48306713-81ca-4824-93d5-4e9b852e484d/attachment/1776672778.848805000/blobstore/prod/makersuite/spanner_managed/global::000054e2ea70026d:0000015f:2:000054e2ea70026d:0000000000000001::e9d0812fca4365fb:000001f5f96018bc:00064fdfddd8955f' },
      { type: 'post', image: 'https://aistudio.google.com/_/upload/48306713-81ca-4824-93d5-4e9b852e484d/attachment/1776673043.73252000/blobstore/prod/makersuite/spanner_managed/global::000054e2ea70026d:0000015f:2:000054e2ea70026d:0000000000000001::8acd3d6efe81d9b4:000001f5f96018bc:00064fdfed965d1f' }
    ]
  },
  {
    id: 'beauty',
    title: 'Beauty & Product',
    mainImage: 'https://aistudio.google.com/_/upload/48306713-81ca-4824-93d5-4e9b852e484d/attachment/1776670761.911097000/blobstore/prod/makersuite/spanner_managed/global::000054e2ea70026d:0000015f:2:000054e2ea70026d:0000000000000001::efbf28a4745af653:000001f5f96018bc:00064fdf659f0eff',
    items: [
      { type: 'reel', image: 'https://aistudio.google.com/_/upload/48306713-81ca-4824-93d5-4e9b852e484d/attachment/1776670761.911097000/blobstore/prod/makersuite/spanner_managed/global::000054e2ea70026d:0000015f:2:000054e2ea70026d:0000000000000001::efbf28a4745af653:000001f5f96018bc:00064fdf659f0eff' },
      { type: 'post', image: 'https://aistudio.google.com/_/upload/48306713-81ca-4824-93d5-4e9b852e484d/attachment/1776673202.26715000/blobstore/prod/makersuite/spanner_managed/global::000054e2ea70026d:0000015f:2:000054e2ea70026d:0000000000000001::2b7b473f2a13cbdc:000001f5f96018bc:00064fdff710037f' },
      { type: 'post', image: 'https://aistudio.google.com/_/upload/48306713-81ca-4824-93d5-4e9b852e484d/attachment/1776673387.324964000/blobstore/prod/makersuite/spanner_managed/global::000054e2ea70026d:0000015f:2:000054e2ea70026d:0000000000000001::a702d7f7b56aba8d:000001f5f96018bc:00064fe0021bb30f' },
      { type: 'reel', image: 'https://aistudio.google.com/_/upload/48306713-81ca-4824-93d5-4e9b852e484d/attachment/1776669333.498197000/blobstore/prod/makersuite/spanner_managed/global::000054e2ea70026d:0000015f:2:000054e2ea70026d:0000000000000001::617d5acb4e2ef409:000001f5f96018bc:00064fdf107b84df' }
    ]
  },
  {
    id: 'events',
    title: 'Events',
    mainImage: 'https://aistudio.google.com/_/upload/48306713-81ca-4824-93d5-4e9b852e484d/attachment/1776670888.597750000/blobstore/prod/makersuite/spanner_managed/global::000054e2ea70026d:0000015f:2:000054e2ea70026d:0000000000000001::8427da108e4a4b78:000001f5f96018bc:00064fdf6d2bd2ff',
    items: [
      { type: 'reel', image: 'https://aistudio.google.com/_/upload/48306713-81ca-4824-93d5-4e9b852e484d/attachment/1776670888.597750000/blobstore/prod/makersuite/spanner_managed/global::000054e2ea70026d:0000015f:2:000054e2ea70026d:0000000000000001::8427da108e4a4b78:000001f5f96018bc:00064fdf6d2bd2ff' },
      { type: 'post', image: 'https://aistudio.google.com/_/upload/48306713-81ca-4824-93d5-4e9b852e484d/attachment/1776672908.274282000/blobstore/prod/makersuite/spanner_managed/global::000054e2ea70026d:0000015f:2:000054e2ea70026d:0000000000000001::3d68ff498d651447:000001f5f96018bc:00064fdfe58c152f' },
      { type: 'reel', image: '' },
      { type: 'post', image: '' },
      { type: 'post', image: '' }
    ]
  },
  {
    id: 'tech',
    title: 'Tech',
    mainImage: 'https://aistudio.google.com/_/upload/48306713-81ca-4824-93d5-4e9b852e484d/attachment/1776671047.527742000/blobstore/prod/makersuite/spanner_managed/global::000054e2ea70026d:0000015f:2:000054e2ea70026d:0000000000000001::a84c432724424138:000001f5f96018bc:00064fdf76a5444f',
    items: [
      { type: 'post', image: 'https://aistudio.google.com/_/upload/48306713-81ca-4824-93d5-4e9b852e484d/attachment/1776671047.527742000/blobstore/prod/makersuite/spanner_managed/global::000054e2ea70026d:0000015f:2:000054e2ea70026d:0000000000000001::a84c432724424138:000001f5f96018bc:00064fdf76a5444f' },
      { type: 'post', image: 'https://aistudio.google.com/_/upload/48306713-81ca-4824-93d5-4e9b852e484d/attachment/1776672648.796832000/blobstore/prod/makersuite/spanner_managed/global::000054e2ea70026d:0000015f:2:000054e2ea70026d:0000000000000001::ef80355841fe8941:000001f5f96018bc:00064fdfd61822cf' }
    ]
  }
];

const GalleryModal = ({ isOpen, onClose, category }: { isOpen: boolean, onClose: () => void, category: CategoryData | null }) => {
  if (!isOpen || !category) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-12"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-[#0f1423] border border-white/10 rounded-3xl w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden relative shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/[0.02]">
          <div>
            <h3 className="text-2xl font-semibold text-white">{category.title}</h3>
            <p className="text-sm text-gray-400 mt-1">Handled strategy, content direction, and execution</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {category.items.map((item, index) => (
              <div key={index} className={`relative rounded-2xl overflow-hidden bg-black/40 border border-white/5 group ${item.type === 'reel' ? 'aspect-[9/16]' : 'aspect-square'}`}>
                {item.image ? (
                  <img 
                    src={item.image} 
                    alt={`${category.title} item ${index + 1}`} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center gap-2 h-full opacity-30">
                    <ImageIcon className="w-8 h-8 text-gray-500" />
                    <span className="text-xs font-mono uppercase tracking-widest text-gray-400">{item.type} Placeholder</span>
                  </div>
                )}
                
                {/* Type badge */}
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-white/90">
                    {item.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryData | null>(null);

  // Stop body scroll when modal is open
  useEffect(() => {
    if (selectedCategory) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-[#0B0F19] bg-gradient-to-br from-[#0B0F19] to-[#111827] text-gray-200 font-sans selection:bg-blue-500/30 relative overflow-x-hidden">
      
      {/* Decorative Glow Backgrounds */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-purple-600/10 blur-[130px] mix-blend-screen" />
        <div className="absolute top-[30%] -right-[10%] w-[40%] h-[50%] rounded-full bg-teal-600/5 blur-[120px] mix-blend-screen" />
        <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[40%] rounded-full bg-blue-600/10 blur-[140px] mix-blend-screen" />
      </div>

      <div className="relative z-10 w-full">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0B0F19]/60 backdrop-blur-xl border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 h-20 flex items-center justify-between">
            <div className="font-medium tracking-tight text-lg text-gray-200 flex items-center gap-2">
               Hossam Shawaqfeh
            </div>
            <a href="#contact" className="text-sm font-medium text-gray-400 hover:text-white transition-all">Contact Me</a>
          </div>
        </nav>

        {/* 1. Hero Section */}
        <section 
          className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden bg-cover bg-no-repeat animate-fade-in-down"
          style={{
            backgroundImage: `url('https://storage.googleapis.com/mweb-assets/gemini/user_files/02700388-c71d-4074-b52b-2a21def853e8/2.jpg')`,
            backgroundPosition: 'center 20%'
          }}
        >
          {/* Light dark overlay (max opacity 30%) - kept minimal so image is clear */}
          <div className="absolute inset-0 bg-black/20 z-0 pointer-events-none" />
          
          {/* Bottom gradient blending into the next section */}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0B0F19] to-transparent z-0 pointer-events-none" />

          <div className="relative z-10 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto w-full flex flex-col items-center text-center mt-20">
            <FadeIn>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-[1.1] text-white drop-shadow-2xl">
                Real Results. <br className="hidden sm:block"/> Real Strategy.
              </h1>
              
              <p className="mt-6 text-xl md:text-3xl text-gray-100 font-medium leading-relaxed max-w-3xl drop-shadow-lg mx-auto">
                I manage campaigns, content, and performance — not just posts.
              </p>

              <div className="mt-12 flex justify-center">
                <a href="#work" className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-10 py-5 rounded-full font-medium text-lg hover:bg-blue-500 transition-all shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] backdrop-blur-md border border-white/10">
                  View My Work <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* 2. What I Do */}
        <section className="py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto border-t border-white/5">
          <FadeIn className="mb-16 max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-medium text-white mb-6">What I Do</h2>
            <p className="text-lg text-gray-400 font-light leading-relaxed">
              I work at the intersection of content, coordination, and execution — making sure ideas move smoothly from planning to publishing.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <GlassCard>
              <Briefcase className="w-8 h-8 text-blue-400 mb-6 drop-shadow-sm" />
              <h3 className="text-xl font-medium text-gray-200 mb-3">Account Management</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Managing multiple client accounts and keeping workflows organized.</p>
            </GlassCard>
            <GlassCard>
              <PenTool className="w-8 h-8 text-purple-400 mb-6 drop-shadow-sm" />
              <h3 className="text-xl font-medium text-gray-200 mb-3">Content Strategy</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Building content directions based on brand and audience.</p>
            </GlassCard>
            <GlassCard>
              <Users className="w-8 h-8 text-teal-400 mb-6 drop-shadow-sm" />
              <h3 className="text-xl font-medium text-gray-200 mb-3">Creative Coordination</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Working with designers, videographers, and editors.</p>
            </GlassCard>
            <GlassCard>
              <Target className="w-8 h-8 text-blue-500 mb-6 drop-shadow-sm" />
              <h3 className="text-xl font-medium text-gray-200 mb-3">Campaign Support</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Supporting ads with content, angles, and execution.</p>
            </GlassCard>
            <GlassCard>
              <LayoutTemplate className="w-8 h-8 text-gray-300 mb-6 drop-shadow-sm" />
              <h3 className="text-xl font-medium text-gray-200 mb-3">Quality Control</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Reviewing visuals and maintaining consistency.</p>
            </GlassCard>
          </div>
        </section>

        {/* 3. How I Work */}
        <section className="py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto border-t border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5">
              <FadeIn>
                <h2 className="text-3xl md:text-4xl font-medium text-white mb-6">How I Work</h2>
                <p className="text-lg text-gray-400 font-light leading-relaxed mb-8">
                  My role is to connect the dots between clients, teams, and execution — ensuring work flows efficiently across multiple accounts, even under pressure.
                </p>
                <a href="#contact" className="inline-flex items-center gap-2 text-blue-400 font-medium hover:text-blue-300 transition-colors">
                  Contact for availability <ArrowRight className="w-4 h-4" />
                </a>
              </FadeIn>
            </div>
            
            <div className="lg:col-span-7">
              <FadeIn delay={0.2} className="space-y-4">
                {[
                  "Managing 10+ clients simultaneously",
                  "Coordinating cross-functional teams",
                  "Adapting content across industries",
                  "Delivering under tight timelines",
                  "Keeping workflow structured and consistent"
                ].map((item, i) => (
                  <GlassCard key={i} className="!p-5 flex items-center gap-4">
                    <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />
                    <span className="text-gray-200">{item}</span>
                  </GlassCard>
                ))}
              </FadeIn>
            </div>
          </div>
        </section>

        {/* 4. Selected Work */}
        <section id="work" className="py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto border-t border-white/5">
          <FadeIn className="mb-16">
            <h2 className="text-3xl md:text-4xl font-medium text-white mb-6">Selected Work Across Industries</h2>
            <p className="text-lg text-gray-400 font-light leading-relaxed max-w-3xl">
              A selection of content I worked on across hospitality, beauty, medical, events, tech, and e-commerce.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
            {workCategories.map((cat) => (
              <WorkCard 
                key={cat.id}
                image={cat.mainImage}
                category={cat.title}
                isFeatured={cat.isFeatured}
                className={cat.className}
                itemsCount={cat.items.length}
                onClick={() => setSelectedCategory(cat)}
              />
            ))}
          </div>
        </section>

        {/* 5. Campaign Highlights */}
        <section className="py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto border-t border-white/5 relative">
          <FadeIn className="mb-16">
            <h2 className="text-3xl md:text-4xl font-medium text-white mb-4">Campaign Highlights</h2>
            <p className="text-lg text-gray-400 font-light leading-relaxed">
              Focused on efficient results using practical budgets and consistent execution.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <CampaignCard 
              isMain={true}
              metric="840+ Conv."
              cost="~$0.08 per conversation"
              desc="Generated across multiple campaigns and client accounts"
            />
            <CampaignCard 
              metric="61 Conv."
              cost="~$0.09 per conversation"
              desc="Micro-budget efficiency"
            />
            <CampaignCard 
              metric="45 Conv."
              cost="~$0.54 per conversation"
              desc="Messaging-focused campaign"
            />
            <CampaignCard 
              metric="150 Conv."
              cost="~$0.27 per conversation"
              desc="Short-cycle campaign"
            />
            <CampaignCard 
              metric="68 Conv."
              cost="~$0.18 per conversation"
              desc="Targeted campaign"
            />
          </div>
        </section>

        {/* 6. AI Storyboards */}
        <section className="py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto border-t border-white/5">
          <FadeIn className="mb-16 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-medium text-white mb-6">Creative Concepts & AI Storyboards</h2>
            <p className="text-lg text-gray-400 font-light leading-relaxed">
              I use AI tools to visualize ideas and build content concepts before execution, helping speed up creative direction.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 gap-6">
            <FadeIn>
              <div className="bg-[#0A0F1C] border border-white/5 rounded-2xl overflow-hidden hover:border-blue-500/20 transition-all p-4 group">
                 {/*  User: Upload your HanDiva storyboard image to the workspace and replace the src here */}
                 <div className="relative aspect-[16/9] sm:aspect-auto sm:h-[600px] w-full rounded-xl overflow-hidden bg-black/50 border border-white/5 flex items-center justify-center">
                   <img 
                    src="https://aistudio.google.com/_/upload/48306713-81ca-4824-93d5-4e9b852e484d/attachment/1776675525.367657000/blobstore/prod/makersuite/spanner_managed/global::000054e2ea70026d:0000015f:2:000054e2ea70026d:0000000000000001::f5e4809fc4fbd7b9:000001f5f96018bc:00064fe0818c46ff" 
                    alt="HanDiva AI Storyboard" 
                    className="w-full h-full object-contain group-hover:scale-[1.02] transition-transform duration-500" 
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                      (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                    }}
                   />
                   <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 hidden">
                     <Sparkles className="w-8 h-8 mb-3 opacity-50" />
                     <span className="text-xs font-mono uppercase tracking-widest text-center px-4">Image not found</span>
                   </div>
                 </div>
                 <div className="mt-6 px-2">
                    <h3 className="text-white font-medium text-xl">HanDiva Storyboard</h3>
                    <p className="text-gray-400 text-sm mt-2">AI-generated storyboard visualizing the creative concept and scenes (Approach, Overwhelmed, Decision, Transformation, Confidence) for the HanDiva campaign.</p>
                 </div>
              </div>
            </FadeIn>

            <FadeIn>
              <div className="bg-[#0A0F1C] border border-white/5 rounded-2xl overflow-hidden hover:border-blue-500/20 transition-all p-4 group">
                 <div className="relative aspect-[16/9] sm:h-[600px] w-full rounded-xl overflow-hidden flex items-center justify-center bg-black/20 border border-white/5">
                   <img 
                    src="https://aistudio.google.com/_/upload/48306713-81ca-4824-93d5-4e9b852e484d/attachment/1776675762.147550000/blobstore/prod/makersuite/spanner_managed/global::000054e2ea70026d:0000015f:2:000054e2ea70026d:0000000000000001::8907e297d90f2ca1:000001f5f96018bc:00064fe08fa81fbf" 
                    alt="HanDiva Fish Concept" 
                    className="absolute max-w-[150%] max-h-[150%] -rotate-90 object-contain hidden sm:block" 
                    style={{ width: '600px', height: '1000px' }}
                    onLoad={(e) => {
                      (e.target as HTMLImageElement).classList.remove('hidden');
                      const fallback = (e.target as HTMLImageElement).nextElementSibling;
                      if(fallback) fallback.classList.add('hidden');
                    }}
                    onError={(e) => {
                      const fallback = (e.target as HTMLImageElement).nextElementSibling?.nextElementSibling;
                      if(fallback) fallback.classList.remove('hidden');
                    }}
                   />
                   
                   {/* Mobile specific sizing */}
                   <img 
                    src="https://aistudio.google.com/_/upload/48306713-81ca-4824-93d5-4e9b852e484d/attachment/1776675762.147550000/blobstore/prod/makersuite/spanner_managed/global::000054e2ea70026d:0000015f:2:000054e2ea70026d:0000000000000001::8907e297d90f2ca1:000001f5f96018bc:00064fe08fa81fbf" 
                    alt="HanDiva Fish Concept Mobile" 
                    className="absolute max-w-[200%] max-h-[200%] -rotate-90 object-contain sm:hidden hidden" 
                    style={{ width: '400px', height: '600px' }}
                    onLoad={(e) => {
                      (e.target as HTMLImageElement).classList.remove('hidden');
                    }}
                   />

                   <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 bg-black/50 border border-white/5 rounded-xl z-[-1]">
                     <Sparkles className="w-8 h-8 mb-3 opacity-50 text-blue-500" />
                     <span className="text-xs font-mono uppercase tracking-widest text-center px-4">Waiting for Image URL...<br/><span className="text-[10px] text-gray-600 mt-2 block">(Ready to rotate and preview)</span></span>
                   </div>
                 </div>
                 <div className="mt-6 px-2">
                    <h3 className="text-white font-medium text-xl">HanDiva "Fish" Concept Storyboard</h3>
                    <p className="text-gray-400 text-sm mt-2">Humorous AI-generated storyboard exploring an alternative comedic angle (Scenes 1-12) where a fish delivers the luxury touch.</p>
                 </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* 7. Recognition & Certifications */}
        <section className="py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto border-t border-white/5">
          <FadeIn className="mb-16">
            <h2 className="text-3xl md:text-4xl font-medium text-white mb-6">Recognition & Certifications</h2>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
             <div className="space-y-6">
               <h3 className="text-xl font-medium text-blue-400 flex items-center gap-3 border-b border-white/5 pb-4">
                 <Mic className="w-5 h-5 text-gray-400" /> Speaking & Recognition
               </h3>
               <div className="space-y-4">
                 <GlassCard className="!p-6 flex items-start gap-4">
                   <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                   <p className="text-gray-300">Selected among 3000+ participants</p>
                 </GlassCard>
                 <GlassCard className="!p-6 flex items-start gap-4">
                   <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 shrink-0 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                   <p className="text-gray-300">Represented youth in regional initiatives</p>
                 </GlassCard>
                 <GlassCard className="!p-6 flex items-start gap-4">
                   <div className="w-2 h-2 rounded-full bg-teal-500 mt-2 shrink-0 shadow-[0_0_8px_rgba(20,184,166,0.8)]" />
                   <p className="text-gray-300">Speaker in official programs</p>
                 </GlassCard>
               </div>
             </div>

             <div className="space-y-6">
               <h3 className="text-xl font-medium text-blue-400 flex items-center gap-3 border-b border-white/5 pb-4">
                 <Award className="w-5 h-5 text-gray-400" /> Certifications
               </h3>
               <div className="space-y-4">
                 <div className="flex items-center gap-5 p-5 rounded-2xl bg-[#0A0F1C] border border-white/5 hover:border-blue-500/30 hover:bg-white/[0.02] hover:scale-[1.02] transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.08)] group cursor-default">
                   <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover:scale-110 transition-transform duration-300">
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6">
                       <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                       <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                       <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                       <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                     </svg>
                   </div>
                   <div>
                     <h4 className="text-white font-medium text-lg leading-snug">Google Digital Marketing</h4>
                     <p className="text-sm text-gray-400 mt-0.5">Google Professional Certification</p>
                   </div>
                 </div>

                 <div className="flex items-center gap-5 p-5 rounded-2xl bg-[#0A0F1C] border border-white/5 hover:border-blue-500/30 hover:bg-white/[0.02] hover:scale-[1.02] transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.08)] group cursor-default">
                   <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover:scale-110 transition-transform duration-300">
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 28 28" className="w-8 h-8">
                       <path fill="#0668E1" d="M19.782 12c0-3.344-2.871-6.155-6.526-6.155-2.584 0-4.851 1.334-5.882 3.332C6.342 7.178 4.075 5.845 1.492 5.845v4.062c1.782 0 3.23.953 3.23 2.093 0 1.141-1.448 2.093-3.23 2.093v4.063c2.583 0 4.85-1.334 5.882-3.333 1.031 1.999 3.298 3.333 5.882 3.333 3.655 0 6.526-2.81 6.526-6.155zM12.98 12c0-1.636 1.258-2.903 2.802-2.903 1.543 0 2.801 1.267 2.801 2.903s-1.258 2.903-2.801 2.903c-1.544 0-2.802-1.267-2.802-2.903z"/>
                     </svg>
                   </div>
                   <div>
                     <h4 className="text-white font-medium text-lg leading-snug">Meta Marketing Analytics</h4>
                     <p className="text-sm text-gray-400 mt-0.5">Meta Professional Certification</p>
                   </div>
                 </div>

                 <div className="flex items-center gap-5 p-5 rounded-2xl bg-[#0A0F1C] border border-white/5 hover:border-red-500/30 hover:bg-white/[0.02] hover:scale-[1.02] transition-all duration-300 hover:shadow-[0_0_20px_rgba(239,68,68,0.08)] group cursor-default">
                   <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover:scale-110 transition-transform duration-300">
                     <Crown className="w-6 h-6 text-red-500" />
                   </div>
                   <div>
                     <h4 className="text-white font-medium text-lg leading-snug">The King's Trust International</h4>
                     <p className="text-sm text-gray-400 mt-0.5">Official Program & Certification</p>
                   </div>
                 </div>
               </div>
             </div>
          </div>
        </section>

        {/* 8. About Me */}
        <section className="py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto border-t border-white/5 text-center">
          <FadeIn className="max-w-4xl mx-auto">
            <h2 className="text-sm font-mono uppercase tracking-widest text-gray-500 mb-8">About Me</h2>
            <p className="text-2xl md:text-3xl leading-[1.6] font-light text-gray-300">
              I started in content writing, then expanded into account management, team coordination, and campaign execution. Over time, I became responsible for connecting content, teams, and delivery — <span className="text-white font-medium">making sure work gets done efficiently and consistently.</span>
            </p>
          </FadeIn>
        </section>

        {/* 9. Final CTA */}
        <section id="contact" className="py-32 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto border-t border-white/5 text-center">
          <FadeIn className="max-w-3xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-medium text-white mb-6">Let's Work Together</h2>
            <p className="text-xl text-gray-400 font-light leading-relaxed mb-12">
              If you need someone who can manage multiple accounts, coordinate teams, and keep content and campaigns moving — let's connect.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
               <a href="mailto:hossam.shawaqfeh0@gmail.com" className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-full font-medium hover:bg-blue-500 transition-colors shadow-lg">
                 <Mail className="w-5 h-5" /> 
                 Email
               </a>
               <a href="https://wa.me/962779866110" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#111827] border border-white/10 text-gray-200 px-8 py-4 rounded-full font-medium hover:bg-white/5 transition-all">
                 <MessageCircle className="w-5 h-5" /> 
                 WhatsApp
               </a>
               <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#111827] border border-white/10 text-gray-200 px-8 py-4 rounded-full font-medium hover:bg-white/5 transition-all">
                 <Linkedin className="w-5 h-5" /> 
                 LinkedIn
               </a>
            </div>
          </FadeIn>
        </section>

        {/* Footer */}
        <footer className="py-8 text-center text-sm text-gray-600 border-t border-white/5">
          <p>© {new Date().getFullYear()} Hossam Shawaqfeh. Account Manager & Content Strategist.</p>
        </footer>
      </div>

      {/* Gallery Modal */}
      <AnimatePresence>
        {selectedCategory && (
          <GalleryModal 
            isOpen={!!selectedCategory}
            onClose={() => setSelectedCategory(null)}
            category={selectedCategory}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
