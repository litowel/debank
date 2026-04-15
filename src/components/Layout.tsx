import { Link, Outlet, useLocation } from 'react-router-dom';
import { ConnectButton } from 'thirdweb/react';
import { client } from '../client';
import { 
  LayoutDashboard, 
  ArrowRightLeft, 
  Wallet, 
  HeartHandshake, 
  Banknote, 
  ShieldCheck,
  ImagePlus,
  Menu,
  X,
  Sparkles
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '../lib/utils';

export default function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Payments', path: '/payments', icon: Wallet },
    { name: 'Swaps', path: '/swaps', icon: ArrowRightLeft },
    { name: 'Donations', path: '/donations', icon: HeartHandshake },
    { name: 'Funding', path: '/funding', icon: Banknote },
    { name: 'NFT Lending', path: '/nft-lending', icon: ShieldCheck },
    { name: 'Mint NFT', path: '/mint-nft', icon: ImagePlus },
  ];

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-50 font-sans selection:bg-orange-500/30 flex flex-col relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-orange-500/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-yellow-500/5 blur-[120px]" />
      </div>

      {/* Top Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#09090b]/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-500 to-yellow-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
              <Sparkles className="w-5 h-5 text-black" />
            </div>
            <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent">NovaFi</span>
          </div>
          
          <div className="hidden md:flex items-center gap-4">
            <ConnectButton client={client} theme="dark" />
          </div>

          <button 
            className="md:hidden p-2 text-zinc-400 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 flex-1 relative z-10">
        {/* Sidebar Navigation */}
        <aside className={cn(
          "md:w-64 shrink-0 md:flex flex-col",
          isMobileMenuOpen ? "block" : "hidden"
        )}>
          <nav className="flex flex-col gap-2 sticky top-24 flex-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300",
                    isActive 
                      ? "bg-white/10 text-white font-medium shadow-sm border border-white/5" 
                      : "text-zinc-400 hover:bg-white/5 hover:text-white border border-transparent"
                  )}
                >
                  <Icon size={20} className={isActive ? "text-orange-500" : ""} />
                  {item.name}
                </Link>
              );
            })}
            
            <div className="mt-8 pt-8 border-t border-white/5">
              <div className="px-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">
                Admin & Compliance
              </div>
              <Link to="/admin" className="flex items-center gap-3 px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors">
                Admin Panel
              </Link>
              <Link to="/terms" className="flex items-center gap-3 px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors">
                Terms & Privacy
              </Link>
            </div>
          </nav>

          {/* Powered By Footer */}
          <div className="mt-8 pt-6 border-t border-white/5 sticky bottom-6">
            <div className="px-4 flex flex-col gap-1">
              <span className="text-xs text-zinc-500 font-medium">Powered by</span>
              <a 
                href="https://upfrica.africa" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sm font-bold bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent hover:opacity-80 transition-opacity inline-block w-fit"
              >
                Upfrica.africa
              </a>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 pb-12">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
