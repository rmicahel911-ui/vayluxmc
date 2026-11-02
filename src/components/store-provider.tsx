"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

import type { TebexBasket } from "@/lib/types";

const USERNAME_KEY = "vaylux:username";
const PLATFORM_KEY = "vaylux:platform";

export type MinecraftPlatform = "java" | "bedrock";

const usernameListeners = new Set<() => void>();

function subscribeUsername(listener: () => void) {
  usernameListeners.add(listener);
  return () => {
    usernameListeners.delete(listener);
  };
}

function readStoredUsername() {
  try {
    return window.localStorage.getItem(USERNAME_KEY);
  } catch {
    return null;
  }
}

function readStoredPlatform(): MinecraftPlatform {
  try {
    return window.localStorage.getItem(PLATFORM_KEY) === "bedrock" ? "bedrock" : "java";
  } catch {
    return "java";
  }
}

function writeStoredUsername(name: string | null) {
  try {
    if (name) window.localStorage.setItem(USERNAME_KEY, name);
    else window.localStorage.removeItem(USERNAME_KEY);
  } catch {
    // El almacenamiento puede estar bloqueado; la sesión del servidor sigue funcionando.
  }

  for (const listener of usernameListeners) listener();
}

function writeStoredPlatform(platform: MinecraftPlatform) {
  try {
    window.localStorage.setItem(PLATFORM_KEY, platform);
  } catch {
    // El almacenamiento puede estar bloqueado; la sesión del servidor sigue funcionando.
  }

  for (const listener of usernameListeners) listener();
}

type StoreContextValue = {
  username: string | null;
  platform: MinecraftPlatform;
  saveUsername: (name: string, platform?: MinecraftPlatform) => Promise<void>;
  logout: () => Promise<void>;
  basket: TebexBasket | null;
  basketCount: number;
  basketTotal: number;
  basketCurrency: string;
  loadingBasket: boolean;
  refreshBasket: () => Promise<void>;
  loginOpen: boolean;
  openLogin: () => void;
  closeLogin: () => void;
  demo: boolean;
  toast: string | null;
  showToast: (message: string) => void;
};

const StoreContext = createContext<StoreContextValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const username = useSyncExternalStore(subscribeUsername, readStoredUsername, () => null);
  const platform = useSyncExternalStore(subscribeUsername, readStoredPlatform, () => "java" as const);
  const [basket, setBasket] = useState<TebexBasket | null>(null);
  const [loadingBasket, setLoadingBasket] = useState(true);
  const [loginOpen, setLoginOpen] = useState(false);
  const [demo, setDemo] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((message: string) => {
    setToast(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 4200);
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  const refreshBasket = useCallback(async () => {
    const storedName = readStoredUsername();

    try {
      const response = await fetch("/api/basket", { cache: "no-store" });
      const data = (await response.json()) as {
        basket: TebexBasket | null;
        demo: boolean;
        error?: string;
      };

      if (!response.ok) {
        setBasket(null);
        return;
      }

      setBasket(data.basket ?? null);
      setDemo(Boolean(data.demo));

      if (!storedName && data.basket?.username) {
        writeStoredUsername(data.basket.username);
      }
    } catch {
      setBasket(null);
    } finally {
      setLoadingBasket(false);
    }
  }, []);

  useEffect(() => {
    // Cargar el carrito al montar es una sincronización con el servidor, no un render en cascada.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void refreshBasket();
  }, [refreshBasket]);

  const saveUsername = useCallback(
    async (raw: string, nextPlatform?: MinecraftPlatform) => {
      const clean = raw.trim().replace(/\s+/g, " ").replace(/^\.+/, "").slice(0, 32);
      if (!clean) return;

      const targetPlatform = nextPlatform ?? readStoredPlatform();
      // Bedrock (Geyser/Floodgate) suele identificar a los jugadores con un punto inicial.
      const displayName = targetPlatform === "bedrock" ? `.${clean}` : clean;

      writeStoredUsername(displayName);
      writeStoredPlatform(targetPlatform);

      if (basket && basket.username && basket.username.toLowerCase() !== displayName.toLowerCase()) {
        await fetch("/api/basket", { method: "DELETE" });
        setBasket(null);
        showToast("Nick actualizado. El carrito anterior se ha vaciado.");
      } else {
        showToast(
          `Nick guardado: ${displayName} (${targetPlatform === "java" ? "Java" : "Bedrock"})`,
        );
      }

      setLoginOpen(false);
    },
    [basket, showToast],
  );

  const logout = useCallback(async () => {
    writeStoredUsername(null);
    await fetch("/api/basket", { method: "DELETE" });
    setBasket(null);
    setLoginOpen(false);
    showToast("Has salido de la tienda.");
  }, [showToast]);

  const basketCount = useMemo(
    () => basket?.packages.reduce((total, item) => total + item.in_basket.quantity, 0) ?? 0,
    [basket],
  );

  const basketTotal = basket?.total_price ?? 0;
  const basketCurrency = basket?.currency ?? "USD";

  const value = useMemo<StoreContextValue>(
    () => ({
      username,
      platform,
      saveUsername,
      logout,
      basket,
      basketCount,
      basketTotal,
      basketCurrency,
      loadingBasket,
      refreshBasket,
      loginOpen,
      openLogin: () => setLoginOpen(true),
      closeLogin: () => setLoginOpen(false),
      demo,
      toast,
      showToast,
    }),
    [
      username,
      platform,
      saveUsername,
      logout,
      basket,
      basketCount,
      basketTotal,
      basketCurrency,
      loadingBasket,
      refreshBasket,
      loginOpen,
      demo,
      toast,
      showToast,
    ],
  );

  return (
    <StoreContext.Provider value={value}>
      {children}
      {toast ? (
        <div className="fixed bottom-5 left-1/2 z-[80] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 animate-rise">
          <div className="surface flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-white">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-brand-600/20 text-brand-300">
              ✓
            </span>
            <span className="leading-snug">{toast}</span>
          </div>
        </div>
      ) : null}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore debe usarse dentro de StoreProvider.");
  return context;
}
