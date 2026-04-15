import { useActiveAccount } from "thirdweb/react";
import { ArrowRightLeft } from "lucide-react";
import { PayEmbed } from "thirdweb/react";
import { client } from "../client";

export default function Payments() {
  const account = useActiveAccount();

  if (!account) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-orange-500/10 border border-white/10">
          <ArrowRightLeft className="w-10 h-10 text-zinc-400" />
        </div>
        <h1 className="text-4xl font-bold mb-4 tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">Payments & Transfers</h1>
        <p className="text-zinc-400 max-w-md mb-8 text-lg">
          Connect your wallet to send crypto, create payment links, and manage invoices.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Payments</h1>
        <p className="text-zinc-400">Buy crypto with fiat or send tokens.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <PayEmbed
            client={client}
            theme="dark"
            payOptions={{
              mode: "fund_wallet",
              buyWithFiat: true,
              buyWithCrypto: false,
            }}
          />
        </div>
        <div className="flex-1 space-y-4">
          <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6 backdrop-blur-sm">
            <h3 className="text-xl font-semibold mb-2">Your Wallet Address</h3>
            <div className="bg-white/5 p-3 rounded-xl break-all font-mono text-sm text-zinc-300">
              {account.address}
            </div>
            <p className="text-zinc-400 text-sm mt-4">
              Share this address to receive funds on any supported network.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
