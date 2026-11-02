/** Tipos del Headless API de Tebex (solo los campos que usamos). */

export type TebexWebstore = {
  id: number;
  description: string;
  name: string;
  webstore_url: string;
  currency: string;
  lang: string;
  logo: string | null;
  platform_type: string;
  platform_type_id: string;
  disabled: boolean;
  created_at: string;
  supports_usernames: boolean;
  supports_gifting: boolean;
};

export type TebexMedia = {
  type: "video" | "image";
  name: string | null;
  url: string;
  featured: boolean;
  primary: boolean;
};

export type TebexPackage = {
  id: number;
  name: string;
  description: string;
  image: string | null;
  type: string;
  category: { id: number; name: string };
  base_price: number;
  sales_tax: number;
  total_price: number;
  currency: string;
  prorate_price?: number | null;
  discount: number;
  disable_quantity: boolean;
  disable_gifting: boolean;
  expiration_date: string | null;
  media: TebexMedia[];
  order: number;
  slug: string;
  user_limit: number;
  options?: unknown[];
  variables?: unknown[];
  created_at: string;
  updated_at: string;
  ident: string;
};

export type TebexCategory = {
  id: number;
  name: string;
  slug: string | null;
  parent: { id: number; name: string } | null;
  tiered: boolean;
  description: string;
  packages?: TebexPackage[] | null;
  order: number;
  display_type: "list" | "grid";
  image_url: string | null;
  dynamic: boolean;
};

export type TebexBasketPackage = {
  id: number;
  description: string;
  image: string;
  name: string;
  slug: string;
  in_basket: {
    quantity: number;
    price: number;
    gift_username_id?: string;
    gift_username?: string;
  };
  type: "single" | "subscription";
  is_recurring: boolean;
};

export type TebexBasket = {
  id: string;
  ident: string;
  complete: boolean;
  email: string | null;
  username: string | null;
  coupons: { code: string }[];
  creator_code?: string;
  cancel_url: string;
  complete_url: string | null;
  complete_auto_redirect: boolean;
  country: string;
  ip: string;
  username_id: number;
  base_price: number;
  sales_tax: number;
  total_price: number;
  currency: string;
  packages: TebexBasketPackage[];
  custom: Record<string, unknown> | null;
  links: { payment?: string; checkout?: string };
};

export type Catalog = {
  store: TebexWebstore;
  categories: TebexCategory[];
  packages: TebexPackage[];
  demo: boolean;
  demoReason?: string;
};

export type ApiError = {
  error: string;
  code?: string;
  details?: unknown;
};
