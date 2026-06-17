import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useStore, initAuth } from '@/stores/useStore';
import Navbar from '@/components/Navbar';
import KimmyMenu from '@/components/KimmyMenu';
import Toast from '@/components/Toast';
import AIChatWidget from '@/components/AIChatWidget';
import LoadingScreen from '@/components/LoadingScreen';

// Lazy load pages
const HomePage = lazy(() => import('@/pages/HomePage'));
const CatalogPage = lazy(() => import('@/pages/CatalogPage'));
const ProductDetailPage = lazy(() => import('@/pages/ProductDetailPage'));
const CartPage = lazy(() => import('@/pages/CartPage'));
const CheckoutPage = lazy(() => import('@/pages/CheckoutPage'));
const InvoicePage = lazy(() => import('@/pages/InvoicePage'));
const TrackPage = lazy(() => import('@/pages/TrackPage'));
const MissionsPage = lazy(() => import('@/pages/MissionsPage'));
const ProfilePage = lazy(() => import('@/pages/ProfilePage'));
const WalletPage = lazy(() => import('@/pages/WalletPage'));
const SettingsPage = lazy(() => import('@/pages/SettingsPage'));
const SearchPage = lazy(() => import('@/pages/SearchPage'));
const LoginPage = lazy(() => import('@/pages/LoginPage'));
const RegisterPage = lazy(() => import('@/pages/RegisterPage'));
const DonationPage = lazy(() => import('@/pages/DonationPage'));
const EventsPage = lazy(() => import('@/pages/EventsPage'));
const VoucherPage = lazy(() => import('@/pages/VoucherPage'));
const PurchasesPage = lazy(() => import('@/pages/PurchasesPage'));
const HostingPage = lazy(() => import('@/pages/HostingPage'));
const BotWhatsappPage = lazy(() => import('@/pages/BotWhatsappPage'));
const AdminLoginPage = lazy(() => import('@/pages/AdminLoginPage'));
const AdminDashboard = lazy(() => import('@/pages/admin/AdminDashboard'));
const AdminProducts = lazy(() => import('@/pages/admin/AdminProducts'));
const AdminOrders = lazy(() => import('@/pages/admin/AdminOrders'));
const AdminUsers = lazy(() => import('@/pages/admin/AdminUsers'));
const AdminMissions = lazy(() => import('@/pages/admin/AdminMissions'));
const AdminVouchers = lazy(() => import('@/pages/admin/AdminVouchers'));
const AdminDonations = lazy(() => import('@/pages/admin/AdminDonations'));
const AdminEvents = lazy(() => import('@/pages/admin/AdminEvents'));
const AdminSettings = lazy(() => import('@/pages/admin/AdminSettings'));
const PrivacyPage = lazy(() => import('@/pages/PrivacyPage'));

function App() {
  const { loading } = useStore();

  useEffect(() => {
    initAuth();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#0B0F1A] text-[#F9FAFB]">
        <Navbar />
        <KimmyMenu />
        <Toast />
        <AIChatWidget />
        <main className="pt-16">
          <Suspense fallback={<LoadingScreen />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/catalog" element={<CatalogPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/invoice/:id" element={<InvoicePage />} />
              <Route path="/track" element={<TrackPage />} />
              <Route path="/missions" element={<MissionsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/wallet" element={<WalletPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/donation" element={<DonationPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/voucher" element={<VoucherPage />} />
              <Route path="/purchases" element={<PurchasesPage />} />
              <Route path="/hosting" element={<HostingPage />} />
              <Route path="/bot-whatsapp" element={<BotWhatsappPage />} />
              <Route path="/vx-admin-login" element={<AdminLoginPage />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/products" element={<AdminProducts />} />
              <Route path="/admin/orders" element={<AdminOrders />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/missions" element={<AdminMissions />} />
              <Route path="/admin/vouchers" element={<AdminVouchers />} />
              <Route path="/admin/donations" element={<AdminDonations />} />
              <Route path="/admin/events" element={<AdminEvents />} />
              <Route path="/admin/settings" element={<AdminSettings />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
