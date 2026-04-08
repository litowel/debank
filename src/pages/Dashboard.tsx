import { useActiveAccount } from "thirdweb/react";
import { ArrowUpRight, ArrowDownRight, Activity, Wallet, CreditCard } from "lucide-react";

export default function Dashboard() {
  const account = useActiveAccount();

  if (!account) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6">
          <Wallet className="w-8 h-8 text-gray-400" />
        </div>
        <h1 className="text-3xl font-bold mb-4 tracking-tight">Welcome to DeFi SuperApp</h1>
        <p className="text-gray-400 max-w-md mb-8">
          Connect your wallet to access payments, swaps, instant funding, and NFT-collateral lending.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Dashboard</h1>
        <p className="text-gray-400">Welcome back, {account.address.slice(0, 6)}...{account.address.slice(-4)}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#151515] border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400 font-medium">Total Balance</h3>
            <Wallet className="w-5 h-5 text-gray-500" />
          </div>
          <div className="text-4xl font-light tracking-tight mb-2">$15,420.50</div>
          <div className="flex items-center text-sm text-green-500">
            <ArrowUpRight className="w-4 h-4 mr-1" />
            <span>+2.4% this week</span>
          </div>
        </div>

        <div className="bg-[#151515] border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400 font-medium">Active Loans</h3>
            <CreditCard className="w-5 h-5 text-gray-500" />
          </div>
          <div className="text-4xl font-light tracking-tight mb-2">$2,500.00</div>
          <div className="flex items-center text-sm text-orange-500">
            <span>Next payment: $250 in 5 days</span>
          </div>
        </div>

        <div className="bg-[#151515] border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400 font-medium">Monthly Volume</h3>
            <Activity className="w-5 h-5 text-gray-500" />
          </div>
          <div className="text-4xl font-light tracking-tight mb-2">$8,240.00</div>
          <div className="flex items-center text-sm text-gray-400">
            <span>Across 12 transactions</span>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-[#151515] border border-white/10 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-xl font-semibold">Recent Activity</h2>
        </div>
        <div className="divide-y divide-white/5">
          {[
            { type: 'Received', amount: '+$500.00', asset: 'USDC', date: 'Today, 2:45 PM', icon: ArrowDownRight, color: 'text-green-500' },
            { type: 'Swapped', amount: '-1.5 ETH', asset: 'ETH → USDC', date: 'Yesterday, 10:20 AM', icon: ArrowRightLeft, color: 'text-blue-500' },
            { type: 'Loan Repayment', amount: '-$250.00', asset: 'USDC', date: 'Oct 12, 2023', icon: ArrowUpRight, color: 'text-gray-400' },
          ].map((tx, i) => (
            <div key={i} className="p-4 sm:p-6 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                  <tx.icon className={`w-5 h-5 ${tx.color}`} />
                </div>
                <div>
                  <div className="font-medium">{tx.type}</div>
                  <div className="text-sm text-gray-400">{tx.date}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">{tx.amount}</div>
                <div className="text-sm text-gray-400">{tx.asset}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
