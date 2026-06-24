import { createBrowserClient, createServerClient as createSSRServerClient } from "@supabase/ssr";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/** Supabase client for use in Client Components. */
export function createClient() {
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}

type CookieStore = {
  getAll: () => { name: string; value: string }[];
  set: (name: string, value: string, options?: Record<string, unknown>) => void;
};

/**
 * Supabase client for use in Server Components, Route Handlers and Server Actions.
 * Pass the result of `cookies()` from `next/headers` at the call site — keeping that
 * import out of this file is what lets `createClient` above stay safe to bundle
 * into Client Components.
 */
export function createServerClient(cookieStore: CookieStore) {
  return createSSRServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Called from a Server Component — session refresh is handled in middleware.
        }
      },
    },
  });
}

/** Service-role Supabase client for trusted server-side admin operations. Bypasses RLS. */
export function createAdminClient() {
  return createSupabaseClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
}
