import { useCallback, useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import type { Shop } from "../../lib/types";

export function useAdminShops() {
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    const { data, error: fetchError } = await supabase
      .from("shops")
      .select("*")
      .order("created_at", { ascending: false });

    if (fetchError) {
      setError(fetchError.message);
    } else {
      setError(null);
      setShops(data ?? []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  return { shops, loading, error, reload };
}
