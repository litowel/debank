import { useActiveAccount } from "thirdweb/react";
import { ShieldAlert, Users, Activity, Settings } from "lucide-react";

export default function Admin() {
  const account = useActiveAccount();

  if (!account) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6">
          <ShieldAlert className="w-8 h-8 text-gray-400" />
        </div>
        <h1 className="text-3xl font-bold mb-4 tracking-tight">Admin Dashboard</h1>
        <p className="text-gray-400 max-w-md mb-8">
          Connect your admin wallet to access platform management tools.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Admin Dashboard</h1>
        <p className="text-gray-400">Platform overview, risk management, and user administration.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#151515] border border-white/10 rounded-2xl p-6">
          <div className="text-gray-400 text-sm mb-2">Total Users</div>
          <div className="text-3xl font-semibold">1,248</div>
        </div>
        <div className="bg-[#151515] border border-white/10 rounded-2xl p-6">
          <div className="text-gray-400 text-sm mb-2">Active Loans</div>
          <div className="text-3xl font-semibold">156</div>
        </div>
        <div className="bg-[#151515] border border-white/10 rounded-2xl p-6">
          <div className="text-gray-400 text-sm mb-2">Total Value Locked</div>
          <div className="text-3xl font-semibold">$4.2M</div>
        </div>
        <div className="bg-[#151515] border border-white/10 rounded-2xl p-6">
          <div className="text-gray-400 text-sm mb-2">Platform Fees (30d)</div>
          <div className="text-3xl font-semibold text-green-500">$12,450</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Loan Management */}
        <div className="bg-[#151515] border border-white/10 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-white/10 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Pending Loan Approvals</h2>
            <button className="text-sm text-gray-400 hover:text-white">View All</button>
          </div>
          <div className="divide-y divide-white/5">
            {[
              { user: '0x1234...5678', amount: '$5,000', type: 'Unsecured', risk: 'Low' },
              { user: '0x8765...4321', amount: '$25,000', type: 'NFT Backed', risk: 'Medium' },
            ].map((loan, i) => (
              <div key={i} className="p-6 flex items-center justify-between">
                <div>
                  <div className="font-medium mb-1">{loan.user}</div>
                  <div className="text-sm text-gray-400">{loan.type} • {loan.amount}</div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`text-xs px-2 py-1 rounded-full ${loan.risk === 'Low' ? 'bg-green-500/10 text-green-500' : 'bg-orange-500/10 text-orange-500'}`}>
                    {loan.risk} Risk
                  </span>
                  <button className="px-3 py-1.5 bg-white text-black text-sm font-medium rounded-lg hover:bg-gray-100">
                    Review
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Status */}
        <div className="bg-[#151515] border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-6">System Status</h2>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="font-medium">Smart Contracts</span>
              </div>
              <span className="text-sm text-gray-400">Operational</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="font-medium">Liquidity Pools</span>
              </div>
              <span className="text-sm text-gray-400">Healthy ($2.1M Available)</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="font-medium">Price Oracles</span>
              </div>
              <span className="text-sm text-gray-400">Synced (12s ago)</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                <span className="font-medium">KYC Provider API</span>
              </div>
              <span className="text-sm text-orange-500">Degraded Performance</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
