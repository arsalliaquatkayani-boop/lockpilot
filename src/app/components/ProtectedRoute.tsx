import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "../../context/AuthContext";

function LoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-deep font-mono text-[13.5px] text-slate">
      Loading…
    </div>
  );
}

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { session, loading, deviceVerified, isPlatformAdmin } = useAuth();

  if (loading || (session && deviceVerified === null)) {
    return <LoadingScreen />;
  }

  if (!session) {
    return <Navigate to="/app/login" replace />;
  }

  if (!deviceVerified) {
    return <Navigate to="/app/verify-device" replace />;
  }

  if (isPlatformAdmin) {
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
}

export function AdminProtectedRoute({ children }: { children: ReactNode }) {
  const { session, loading, deviceVerified, isPlatformAdmin } = useAuth();

  if (loading || (session && deviceVerified === null)) {
    return <LoadingScreen />;
  }

  if (!session) {
    return <Navigate to="/app/login" replace />;
  }

  if (!deviceVerified) {
    return <Navigate to="/app/verify-device" replace />;
  }

  if (!isPlatformAdmin) {
    return <Navigate to="/app" replace />;
  }

  return <>{children}</>;
}
