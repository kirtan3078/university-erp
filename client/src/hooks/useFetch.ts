import { useState, useEffect } from 'react';

export default function useFetch<T = unknown>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;

    async function fetcher() {
      setLoading(true);
      try {
        const res = await fetch(url);
        const json = await res.json();
        if (mounted) setData(json as T);
      } catch (e) {
        // noop - placeholder
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetcher();

    return () => { mounted = false; };
  }, [url]);

  return { data, loading } as { data: T | null; loading: boolean };
}
