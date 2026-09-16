import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { HowItWorks } from "./pages/HowItWorks";
import { Features } from "./pages/Features";
import { Dashboard } from "./pages/Dashboard";
import { Pricing } from "./pages/Pricing";
import { Faq } from "./pages/Faq";
import { EarlyAccess } from "./pages/EarlyAccess";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { TermsOfService } from "./pages/TermsOfService";
import { NotFound } from "./pages/NotFound";
import { Login } from "./app/pages/Login";
import { Overview } from "./app/pages/Overview";
import { CustomersPage } from "./app/pages/CustomersPage";
import { CustomerDetailPage } from "./app/pages/CustomerDetailPage";
import { DevicesPage } from "./app/pages/DevicesPage";
import { DeviceDetailPage } from "./app/pages/DeviceDetailPage";
import { PaymentsPage } from "./app/pages/PaymentsPage";
import { PlansPage } from "./app/pages/PlansPage";
import { AnalyticsPage } from "./app/pages/AnalyticsPage";
import { EventLogsPage } from "./app/pages/EventLogsPage";
import { SettingsPage } from "./app/pages/SettingsPage";
import { ProtectedRoute } from "./app/components/ProtectedRoute";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const { pathname } = useLocation();
  const isAppRoute = pathname.startsWith("/app");

  return (
    <AuthProvider>
      <div className="flex min-h-screen flex-col">
        <ScrollToTop />
        {!isAppRoute && <Navbar />}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/features" element={<Features />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/early-access" element={<EarlyAccess />} />
            <Route path="/legal/privacy" element={<PrivacyPolicy />} />
            <Route path="/legal/terms" element={<TermsOfService />} />
            <Route path="/app/login" element={<Login />} />
            <Route
              path="/app"
              element={
                <ProtectedRoute>
                  <Overview />
                </ProtectedRoute>
              }
            />
            <Route
              path="/app/customers"
              element={
                <ProtectedRoute>
                  <CustomersPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/app/customers/:id"
              element={
                <ProtectedRoute>
                  <CustomerDetailPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/app/devices"
              element={
                <ProtectedRoute>
                  <DevicesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/app/devices/:id"
              element={
                <ProtectedRoute>
                  <DeviceDetailPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/app/payments"
              element={
                <ProtectedRoute>
                  <PaymentsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/app/plans"
              element={
                <ProtectedRoute>
                  <PlansPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/app/analytics"
              element={
                <ProtectedRoute>
                  <AnalyticsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/app/events"
              element={
                <ProtectedRoute>
                  <EventLogsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/app/settings"
              element={
                <ProtectedRoute>
                  <SettingsPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        {!isAppRoute && <Footer />}
      </div>
    </AuthProvider>
  );
}
