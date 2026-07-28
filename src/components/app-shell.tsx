"use client";

import {
  Bell, CalendarDays, CarFront, ChevronDown, CircleDollarSign, Command,
  Gauge, LayoutDashboard, Menu, Package, Plus, Search, Settings, ShoppingCart, Truck, Users, Wrench, X
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const navigation = [
  { href: "/dashboard", label: "Inicio", icon: LayoutDashboard },
  { href: "/taller", label: "Taller en vivo", icon: Gauge },
  { href: "/turnos", label: "Turnos", icon: CalendarDays },
  { href: "/clientes", label: "Clientes", icon: Users },
  { href: "/vehiculos", label: "Vehículos", icon: CarFront },
  { href: "/ordenes", label: "Órdenes", icon: Wrench },
  { href: "/inventario", label: "Inventario", icon: Package },
  { href: "/proveedores", label: "Proveedores", icon: Truck },
  { href: "/compras", label: "Pedidos", icon: ShoppingCart },
  { href: "/caja", label: "Caja", icon: CircleDollarSign }
];

const commands = [
  { label: "Nueva orden", href: "/ordenes?nueva=1" },
  { label: "Nuevo cliente", href: "/clientes?nuevo=1" },
  { label: "Nuevo vehículo", href: "/vehiculos?nuevo=1" },
  { label: "Nuevo proveedor", href: "/proveedores?nuevo=1" },
  { label: "Nuevo pedido", href: "/compras?nuevo=1" },
  { label: "Crear turno", href: "/turnos?nuevo=1" },
  { label: "Ver caja", href: "/caja" }
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobile, setMobile] = useState(false);
  const [palette, setPalette] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPalette((open) => !open);
      }
      if (event.key === "Escape") { setPalette(false); setCreateOpen(false); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const filtered = commands.filter((item) => item.label.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[248px_1fr]">
      {mobile && <button className="fixed inset-0 z-40 bg-black/30 lg:hidden" onClick={() => setMobile(false)} aria-label="Cerrar menú" />}
      <aside className={cn("fixed inset-y-0 left-0 z-50 flex w-[248px] -translate-x-full flex-col border-r border-black/[.06] bg-[#10251e] text-white transition lg:sticky lg:top-0 lg:h-screen lg:translate-x-0", mobile && "translate-x-0")}>
        <div className="flex h-20 items-center gap-3 px-5">
          <div className="grid size-10 place-items-center rounded-xl bg-brand-500"><Wrench size={21} strokeWidth={2.5} /></div>
          <div><p className="font-display text-lg font-bold leading-none">Taller Norte</p><p className="mt-1 text-[11px] font-semibold uppercase tracking-[.15em] text-white/45">Casa central</p></div>
          <button className="ml-auto lg:hidden" onClick={() => setMobile(false)} aria-label="Cerrar menú"><X /></button>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-4" aria-label="Navegación principal">
          {navigation.map(({ href, label, icon: Icon }) => {
            const active = pathname.startsWith(href);
            return <Link key={href} href={href} onClick={() => setMobile(false)} className={cn("focus-ring flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-white/60 transition hover:bg-white/[.06] hover:text-white", active && "bg-white/10 text-white")}><Icon size={19} /><span>{label}</span>{active && <span className="ml-auto size-1.5 rounded-full bg-brand-500" />}</Link>;
          })}
        </nav>
        <div className="border-t border-white/10 p-3">
          <Link href="/configuracion" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-white/60 hover:bg-white/[.06] hover:text-white"><Settings size={19} />Configuración</Link>
          <div className="mt-2 flex items-center gap-3 rounded-xl bg-white/[.06] p-3">
            <div className="grid size-9 place-items-center rounded-full bg-amber text-sm font-extrabold text-ink">MS</div>
            <div className="min-w-0 flex-1"><p className="truncate text-sm font-bold">Martín Suárez</p><p className="text-xs text-white/45">Propietario</p></div>
            <ChevronDown size={15} className="text-white/40" />
          </div>
        </div>
      </aside>

      <main className="min-w-0">
        <header className="sticky top-0 z-30 flex h-20 items-center gap-3 border-b border-black/[.06] bg-canvas/90 px-4 backdrop-blur-xl sm:px-7">
          <button className="btn-secondary !p-2.5 lg:hidden" onClick={() => setMobile(true)} aria-label="Abrir menú"><Menu size={20} /></button>
          <button onClick={() => setPalette(true)} className="focus-ring flex h-11 min-w-0 flex-1 items-center gap-3 rounded-xl border border-black/[.08] bg-white px-3 text-left text-sm text-black/40 shadow-sm sm:max-w-md">
            <Search size={18} /><span className="truncate">Buscar patente, cliente, orden...</span><span className="ml-auto hidden items-center gap-1 rounded-md border border-black/10 bg-canvas px-2 py-1 text-[11px] font-bold sm:flex"><Command size={11} /> K</span>
          </button>
          <button className="focus-ring relative grid size-11 place-items-center rounded-xl border border-black/[.08] bg-white" aria-label="Notificaciones"><Bell size={19} /><span className="absolute right-2 top-2 size-2 rounded-full border-2 border-white bg-red-500" /></button>
          <button onClick={() => setCreateOpen(true)} className="btn-primary"><Plus size={18} /><span className="hidden sm:inline">Crear</span></button>
        </header>
        <div className="p-4 sm:p-7">{children}</div>
      </main>

      {(palette || createOpen) && (
        <div className="fixed inset-0 z-[70] grid place-items-start bg-black/40 px-4 pt-[12vh] backdrop-blur-sm" onMouseDown={() => { setPalette(false); setCreateOpen(false); }}>
          <section className="mx-auto w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl" onMouseDown={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={palette ? "Búsqueda global" : "Crear"}>
            <div className="flex items-center gap-3 border-b border-black/[.07] p-4">
              {palette ? <Search size={20} className="text-brand-600" /> : <Plus size={20} className="text-brand-600" />}
              <input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder={palette ? "¿Qué necesitás?" : "Elegí qué querés crear"} className="min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-black/35" />
              <button onClick={() => { setPalette(false); setCreateOpen(false); }} aria-label="Cerrar"><X size={19} /></button>
            </div>
            <div className="p-2">
              {(createOpen ? commands.filter((item) => item.label !== "Ver caja") : filtered).map((item) => (
                <button key={item.href} onClick={() => { router.push(item.href); setPalette(false); setCreateOpen(false); }} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-bold hover:bg-canvas"><span className="grid size-8 place-items-center rounded-lg bg-brand-50 text-brand-700"><Plus size={16} /></span>{item.label}</button>
              ))}
              {!filtered.length && <p className="p-6 text-center text-sm text-black/45">Sin resultados.</p>}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
