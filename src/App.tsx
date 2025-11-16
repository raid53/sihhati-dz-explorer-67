
import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Routes, Route } from "react-router-dom";
import { useAdmin } from "./contexts/AdminContext";
import SplashScreen from "./components/SplashScreen";
import MaintenancePage from "./pages/MaintenancePage";
import Auth from "./pages/Auth";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import ClinicDetails from "./pages/ClinicDetails";
import ServiceDetails from "./pages/ServiceDetails";
import Services from "./pages/Services";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Support from "./pages/Support";
import Payment from "./pages/Payment";
import AIServices from "./pages/AIServices";
import LiveChat from "./pages/LiveChat";
import Pharmacy from "./pages/Pharmacy";
import Clinics from "./pages/Clinics";
import Doctors from "./pages/Doctors";
import Hospitals from "./pages/Hospitals";
import Emergency from "./pages/Emergency";
import Booking from "./pages/Booking";
import Telemedicine from "./pages/Telemedicine";
import HomeCare from "./pages/HomeCare";
import AddictionCenters from "./pages/AddictionCenters";
import LabTests from "./pages/LabTests";
import MedicalRecords from "./pages/MedicalRecords";
import Insurance from "./pages/Insurance";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Contact from "./pages/Contact";
import HospitalDetails from "./pages/HospitalDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import ProviderDashboard from "./pages/ProviderDashboard";
import DeliverySearch from "./pages/DeliverySearch";
import StoreList from "./pages/StoreList";
import StorePage from "./pages/StorePage";
import OrderBooking from "./pages/OrderBooking";
import OrderTracking from "./pages/OrderTracking";
import TelemedicineBooking from "./pages/TelemedicineBooking";

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const { isSiteActive } = useAdmin();

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Routes>
        {/* Auth Routes */}
        <Route path="/auth" element={<Auth />} />
        
        {/* Admin Routes - Always Accessible */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          } 
        />

        {/* Public Routes - Check Site Status */}
        {!isSiteActive ? (
          <Route path="*" element={<MaintenancePage />} />
        ) : (
          <>
            <Route path="/" element={<Index />} />
        <Route path="/clinic-details/:id" element={<ClinicDetails />} />
        <Route path="/hospital-details/:id" element={<HospitalDetails />} />
        <Route path="/clinic/:id" element={<ClinicDetails />} />
        <Route path="/service/:id" element={<ServiceDetails />} />
        <Route path="/services" element={<Services />} />
        <Route path="/pharmacy" element={<Pharmacy />} />
        <Route path="/clinics" element={<Clinics />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/hospitals" element={<Hospitals />} />
        <Route path="/emergency" element={<Emergency />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/telemedicine" element={<Telemedicine />} />
        <Route path="/home-care" element={<HomeCare />} />
        <Route path="/addiction-centers" element={<AddictionCenters />} />
        <Route path="/lab-tests" element={<LabTests />} />
        <Route path="/medical-records" element={<MedicalRecords />} />
        <Route path="/insurance" element={<Insurance />} />
        <Route path="/about" element={<About />} />
        <Route path="/support" element={<Support />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/ai-services" element={<AIServices />} />
        <Route path="/live-chat" element={<LiveChat />} />
        <Route path="/delivery-search" element={<DeliverySearch />} />
        <Route path="/stores" element={<StoreList />} />
        <Route path="/store/:id" element={<StorePage />} />
        <Route path="/order-booking" element={<OrderBooking />} />
        <Route path="/order-tracking" element={<OrderTracking />} />
        <Route path="/telemedicine-booking" element={<TelemedicineBooking />} />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/provider-dashboard" 
          element={
            <ProtectedRoute>
              <ProviderDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/payment/:appointmentId?" 
          element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          } 
        />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </>
        )}
      </Routes>
    </TooltipProvider>
  );
};

export default App;
