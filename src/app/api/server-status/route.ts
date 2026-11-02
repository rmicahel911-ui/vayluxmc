import { NextResponse } from "next/server";

import { site } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type McSrvStat = {
  online?: boolean;
  ip?: string;
  port?: number;
  players?: { online?: number; max?: number };
  version?: string;
  motd?: { clean?: string[] };
  icon?: string;
};

export async function GET() {
  const ip = site.server.javaIp;

  if (!ip || ip.includes("tu-dominio") || ip === "play.vayluxmc.net") {
    return NextResponse.json({
      configured: false,
      online: false,
      players: null,
      version: null,
      motd: null,
      ip,
    });
  }

  try {
    const response = await fetch(`https://api.mcsrvstat.us/3/${encodeURIComponent(ip)}`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 60 },
    });

    if (!response.ok) throw new Error(`Status ${response.status}`);
    const data = (await response.json()) as McSrvStat;

    return NextResponse.json({
      configured: true,
      online: Boolean(data.online),
      players: data.players ?? null,
      version: data.version ?? null,
      motd: data.motd?.clean?.join(" ") ?? null,
      icon: data.icon ?? null,
      ip,
    });
  } catch {
    return NextResponse.json({
      configured: true,
      online: false,
      players: null,
      version: null,
      motd: null,
      ip,
      error: true,
    });
  }
}
