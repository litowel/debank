import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Funding from './pages/Funding';
import NFTLending from './pages/NFTLending';
import Payments from './pages/Payments';
import Swaps from './pages/Swaps';
import Donations from './pages/Donations';
import Admin from './pages/Admin';
import Terms from './pages/Terms';
import MintNFT from './pages/MintNFT';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="payments" element={<Payments />} />
        <Route path="swaps" element={<Swaps />} />
        <Route path="donations" element={<Donations />} />
        <Route path="funding" element={<Funding />} />
        <Route path="nft-lending" element={<NFTLending />} />
        <Route path="mint-nft" element={<MintNFT />} />
        <Route path="admin" element={<Admin />} />
        <Route path="terms" element={<Terms />} />
      </Route>
    </Routes>
  );
}
