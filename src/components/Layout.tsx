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
  X
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
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-orange-500/30">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-500 to-yellow-500 flex items-center justify-center">
              <span className="font-bold text-black text-sm">DF</span>
            </div>
            <span className="text-xl font-bold tracking-tight">DeFi SuperApp</span>
          </div>
          
          <div className="hidden md:flex items-center gap-4">
            <ConnectButton client={client} theme="dark" />
          </div>

          <button 
            className="md:hidden p-2 text-gray-400 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        {/* Sidebar Navigation */}
        <aside className={cn(
          "md:w-64 shrink-0 md:block",
          isMobileMenuOpen ? "block" : "hidden"
        )}>
          <nav className="flex flex-col gap-2 sticky top-24">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                    isActive 
                      ? "bg-white/10 text-white font-medium" 
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <Icon size={20} className={isActive ? "text-orange-500" : ""} />
                  {item.name}
                </Link>
              );
            })}
            
            <div className="mt-8 pt-8 border-t border-white/10">
              <div className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Admin & Compliance
              </div>
              <Link to="/admin" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors">
                Admin Panel
              </Link>
              <Link to="/terms" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors">
                Terms & Privacy
              </Link>
            </div>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
