export default function Terms() {
  return (
    <div className="max-w-3xl mx-auto space-y-8 py-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-4">Terms & Compliance</h1>
        <p className="text-gray-400">Last updated: October 2023</p>
      </div>

      <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">1. Risk Disclaimer</h2>
          <p>
            Trading and lending digital assets involves significant risk and can result in the loss of your invested capital. You should not invest more than you can afford to lose and should ensure that you fully understand the risks involved.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">2. Lending & Partner Liquidity</h2>
          <p>
            Our platform acts as a technology provider and interface. We do not use personal or corporate funds to issue loans. All loan capital is supplied by external <strong>partner lenders</strong>, <strong>liquidity providers</strong>, <strong>pooled funding</strong>, or <strong>protocol-controlled liquidity</strong>.
          </p>
          <p>
            By accepting a loan, you are entering into a smart contract agreement with the respective liquidity pool or partner lender. The platform facilitates the transaction and may charge a service fee, but does not act as the lender of record.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">3. NFT Collateral & Liquidation</h2>
          <p>
            When you use an NFT as collateral, it is locked in a secure smart contract. If the floor price of the NFT collection drops below the agreed-upon Loan-to-Value (LTV) liquidation threshold, the smart contract may automatically liquidate (sell) the NFT to repay the lender.
          </p>
          <p>
            Users are responsible for monitoring their collateral health and adding additional collateral or repaying the loan to avoid liquidation.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">4. Fees</h2>
          <p>
            The platform charges various fees for its services, including but not limited to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Processing fees for payments and checkout links.</li>
            <li>Platform service fees on loan origination.</li>
            <li>Swap routing fees.</li>
            <li>Premium account subscriptions.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">5. Privacy Policy</h2>
          <p>
            We collect and process wallet addresses and transaction history to provide our services, determine funding eligibility, and prevent fraud. We do not sell your data to third parties.
          </p>
        </section>
      </div>
    </div>
  );
}
