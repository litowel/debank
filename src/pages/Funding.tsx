import { useActiveAccount } from "thirdweb/react";
import { Banknote, CheckCircle2, Clock, ChevronRight } from "lucide-react";

export default function Funding() {
  const account = useActiveAccount();

  if (!account) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6">
          <Banknote className="w-8 h-8 text-gray-400" />
        </div>
        <h1 className="text-3xl font-bold mb-4 tracking-tight">Instant Funding</h1>
        <p className="text-gray-400 max-w-md mb-8">
          Connect your wallet to check your eligibility for instant funding from our partner liquidity pools.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Instant Funding</h1>
        <p className="text-gray-400">Get instant liquidity from our partner lenders based on your wallet history.</p>
      </div>

      {/* Eligibility Status */}
      <div className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-orange-500/20 rounded-2xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span className="font-medium text-green-500">You are eligible for funding</span>
            </div>
            <h2 className="text-2xl font-semibold mb-2">Up to $50,000.00</h2>
            <p className="text-sm text-gray-400">Based on your wallet activity and connected assets.</p>
          </div>
          <button className="px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-gray-100 transition-colors whitespace-nowrap">
            Apply Now
          </button>
        </div>
      </div>

      <h2 className="text-xl font-semibold pt-4">Available Offers</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Offer 1 */}
        <div className="bg-[#151515] border border-white/10 rounded-2xl p-6 hover:border-orange-500/50 transition-colors cursor-pointer group">
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="text-sm text-gray-400 mb-1">Unsecured Credit Line</div>
              <div className="text-2xl font-semibold">$10,000</div>
            </div>
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-orange-500/10 group-hover:text-orange-500 transition-colors">
              <ChevronRight className="w-5 h-5" />
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Interest Rate</span>
              <span className="font-medium">8.5% APR</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Duration</span>
              <span className="font-medium">Up to 90 days</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Provider</span>
              <span className="font-medium">Liquidity Pool Alpha</span>
            </div>
          </div>
        </div>

        {/* Offer 2 */}
        <div className="bg-[#151515] border border-white/10 rounded-2xl p-6 hover:border-orange-500/50 transition-colors cursor-pointer group">
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="text-sm text-gray-400 mb-1">NFT-Backed Loan</div>
              <div className="text-2xl font-semibold">Up to $50,000</div>
            </div>
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-orange-500/10 group-hover:text-orange-500 transition-colors">
              <ChevronRight className="w-5 h-5" />
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Interest Rate</span>
              <span className="font-medium">4.5% APR</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Duration</span>
              <span className="font-medium">Flexible</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Provider</span>
              <span className="font-medium">Partner Lenders</span>
            </div>
          </div>
        </div>
      </div>

      {/* Active Loans */}
      <h2 className="text-xl font-semibold pt-8">Active Loans</h2>
      <div className="bg-[#151515] border border-white/10 rounded-2xl overflow-hidden">
        <div className="p-6 flex items-center justify-between border-b border-white/10">
          <div>
            <div className="font-medium text-lg mb-1">Credit Line Alpha</div>
            <div className="text-sm text-gray-400">Provided by Liquidity Pool Alpha</div>
          </div>
          <div className="text-right">
            <div className="font-medium text-lg mb-1">$2,500.00</div>
            <div className="text-sm text-orange-500">Next payment: $250 in 5 days</div>
          </div>
        </div>
        <div className="p-6 bg-white/[0.02]">
          <div className="flex items-center justify-between mb-2 text-sm">
            <span className="text-gray-400">Repayment Progress</span>
            <span className="font-medium">25% ($2,500 / $10,000)</span>
          </div>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-orange-500 w-1/4 rounded-full"></div>
          </div>
          <div className="mt-6 flex gap-3">
            <button className="flex-1 py-2 bg-white text-black font-medium rounded-lg hover:bg-gray-100 transition-colors">
              Make Payment
            </button>
            <button className="flex-1 py-2 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition-colors">
              View Schedule
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
