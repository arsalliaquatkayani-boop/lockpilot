import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";
import type { Shop, Staff } from "../lib/types";

const DEVICE_TOKEN_KEY = "lp_device_token";

function getDeviceToken(): string {
  let token = localStorage.getItem(DEVICE_TOKEN_KEY);
  if (!token) {
    token = crypto.randomUUID();
    localStorage.setItem(DEVICE_TOKEN_KEY, token);
  }
  return token;
}

type AuthContextValue = {
  session: Session | null;
  staff: Staff | null;
  shop: Shop | null;
  isPlatformAdmin: boolean;
  loading: boolean;
  deviceVerified: boolean | null;
  error: string | null;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  sendDeviceCode: () => Promise<{ error: string | null }>;
  verifyDeviceCode: (code: string) => Promise<{ error: string | null }>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [staff, setStaff] = useState<Staff | null>(null);
  const [shop, setShop] = useState<Shop | null>(null);
  const [isPlatformAdmin, setIsPlatformAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [deviceVerified, setDeviceVerified] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function loadUserContext(userId: string) {
    const { data: adminRow } = await supabase
      .from("platform_admins")
      .select("id")
      .eq("id", userId)
      .maybeSingle();

    if (adminRow) {
      setIsPlatformAdmin(true);
      setStaff(null);
      setShop(null);
      return;
    }
    setIsPlatformAdmin(false);

    const { data: staffRow, error: staffError } = await supabase
      .from("staff")
      .select("*")
      .eq("id", userId)
      .single();

    if (staffError || !staffRow) {
      setError(
        "Logged in, but no shop is linked to this account yet — contact LockPilot support.",
      );
      setStaff(null);
      setShop(null);
      return;
    }

    setStaff(staffRow);

    const { data: shopRow } = await supabase
      .from("shops")
      .select("*")
      .eq("id", staffRow.shop_id)
      .single();

    setShop(shopRow ?? null);
  }

  async function checkDeviceTrust(userId: string): Promise<boolean> {
    const token = getDeviceToken();
    const { data } = await supabase
      .from("trusted_devices")
      .select("id")
      .eq("user_id", userId)
      .eq("device_token", token)
      .maybeSingle();

    if (data) {
      supabase
        .from("trusted_devices")
        .update({ last_used_at: new Date().toISOString() })
        .eq("id", data.id)
        .then();
      setDeviceVerified(true);
      return true;
    }

    setDeviceVerified(false);
    return false;
  }

  async function handleSession(newSession: Session | null) {
    setSession(newSession);
    if (!newSession) {
      setStaff(null);
      setShop(null);
      setIsPlatformAdmin(false);
      setDeviceVerified(null);
      return;
    }

    const trusted = await checkDeviceTrust(newSession.user.id);
    if (trusted) {
      await loadUserContext(newSession.user.id);
    }
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      handleSession(data.session).finally(() => setLoading(false));
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      handleSession(newSession);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  async function signIn(email: string, password: string) {
    setError(null);
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (signInError) {
      setError(signInError.message);
      return { error: signInError.message };
    }
    return { error: null };
  }

  async function signOut() {
    await supabase.auth.signOut();
  }

  async function sendDeviceCode() {
    if (!session?.user.email) return { error: "No active session." };
    const { error: otpError } = await supabase.auth.signInWithOtp({
      email: session.user.email,
      options: { shouldCreateUser: false },
    });
    if (otpError) return { error: otpError.message };
    return { error: null };
  }

  async function verifyDeviceCode(code: string) {
    if (!session?.user.email) return { error: "No active session." };
    const { error: verifyError } = await supabase.auth.verifyOtp({
      email: session.user.email,
      token: code,
      type: "email",
    });
    if (verifyError) return { error: verifyError.message };

    const token = getDeviceToken();
    await supabase.from("trusted_devices").insert({
      user_id: session.user.id,
      device_token: token,
      user_agent: navigator.userAgent,
    });
    setDeviceVerified(true);
    await loadUserContext(session.user.id);
    return { error: null };
  }

  return (
    <AuthContext.Provider
      value={{
        session,
        staff,
        shop,
        isPlatformAdmin,
        loading,
        deviceVerified,
        error,
        signIn,
        signOut,
        sendDeviceCode,
        verifyDeviceCode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
