import { createClient } from "@supabase/supabase-js";

// Both values below are meant to be public — the URL is just the API
// endpoint, and the publishable/anon key only grants whatever access our
// Row Level Security policies allow (see lockpilot-backend/migrations).
// The actual secret (the service_role key) never goes anywhere near this
// codebase.
const SUPABASE_URL = "https://laqcafhkqmgkpuapthdq.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_kimtZuvvkcQnNmAKQY-Fwg_dLNWxT8H";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
