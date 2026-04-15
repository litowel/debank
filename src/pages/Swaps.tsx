import { useActiveAccount } from "thirdweb/react";
import { ArrowRightLeft } from "lucide-react";
import { PayEmbed } from "thirdweb/react";
import { client } from "../client";

export default function Swaps() {
  const account = useActiveAccount();

  if (!account) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-orange-500/10 border border-white/10">
          <ArrowRightLeft className="w-10 h-10 text-zinc-400" />
        </div>
        <h1 className="text-4xl font-bold mb-4 tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">Token Swaps</h1>
        <p className="text-zinc-400 max-w-md mb-8 text-lg">
          Connect your wallet to swap tokens instantly across multiple networks.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <div className="w-full max-w-md">
        <PayEmbed
          client={client}
          theme="dark"
          payOptions={{
            mode: "fund_wallet",
            buyWithFiat: false, // Disable fiat on-ramp for Swaps page
            buyWithCrypto: true,
          }}
        />
      </div>
    </div>
  );
}

