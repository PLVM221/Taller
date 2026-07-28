"use client";

import { CarFront, ChevronRight, Mail, MoreHorizontal, Phone, Plus, Search, UserRound, X } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { customers as initialCustomers, vehicles as initialVehicles } from "@/lib/demo-data";
import { money } from "@/lib/utils";

function PageHeader({ eyebrow, title, description, action, onAction }: { eyebrow: string; title: string; description: string; action: string; onAction: () => void }) {
  return <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-sm font-bold text-brand-700">{eyebrow}</p><h1 className="mt-1 font-display text-3xl font-bold tracking-tight">{title}</h1><p className="mt-1 text-sm text-black/50">{description}</p></div><button onClick={onAction} className="btn-primary"><Plus size={18} />{action}</button></div>;
}

function Dialog({ title, open, onClose, children }: { title: string; open: boolean; onClose: () => void; children: React.ReactNode }) {
  if (!open) return null;
  return <div className="fixed inset-0 z-[80] grid place-items-center overflow-y-auto bg-black/40 p-4 backdrop-blur-sm" onMouseDown={onClose}><section className="my-8 w-full max-w-xl rounded-2xl bg-white shadow-2xl" onMouseDown={(e) => e.stopPropagation()} role="dialog" aria-modal="true"><header className="flex items-center justify-between border-b border-black/[.07] p-5"><h2 className="font-display text-xl font-bold">{title}</h2><button onClick={onClose} aria-label="Cerrar"><X /></button></header>{children}</section></div>;
}

const field = "focus-ring h-11 w-full rounded-xl border border-black/10 bg-white px-3 text-sm placeholder:text-black/30";

export function CustomersPage() {
  const params = useSearchParams();
  const [rows, setRows] = useState(initialCustomers);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(params.get("nuevo") === "1");
  const filtered = useMemo(() => rows.filter((c) => [c.name, c.document, c.phone, c.email].join(" ").toLowerCase().includes(query.toLowerCase())), [query, rows]);
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); const data = new FormData(e.currentTarget); const name = String(data.get("name"));
    setRows((r) => [{ id: crypto.randomUUID(), name, initials: name.split(" ").map((x) => x[0]).slice(0, 2).join("").toUpperCase(), document: String(data.get("document")), phone: String(data.get("phone")), email: String(data.get("email")), tags: ["Nuevo"], vehicles: 0, balance: 0, lastVisit: "Sin visitas" }, ...r]); setOpen(false);
  }
  return <div className="mx-auto max-w-[1500px] space-y-6">
    <PageHeader eyebrow="Base comercial" title="Clientes" description={`${rows.length} clientes activos en Casa central`} action="Nuevo cliente" onAction={() => setOpen(true)} />
    <section className="card overflow-hidden">
      <div className="flex flex-col gap-3 border-b border-black/[.06] p-4 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex h-11 w-full items-center gap-2 rounded-xl border border-black/10 bg-white px-3 sm:max-w-sm"><Search size={18} className="text-black/35" /><input value={query} onChange={(e) => setQuery(e.target.value)} className="min-w-0 flex-1 bg-transparent text-sm outline-none" placeholder="Nombre, DNI, teléfono..." /></label>
        <p className="text-sm font-semibold text-black/45">{filtered.length} resultados</p>
      </div>
      <div className="divide-y divide-black/[.05]">
        {filtered.map((c, index) => <Link href={`/clientes/${c.id}`} key={c.id} className="grid items-center gap-3 p-4 transition hover:bg-brand-50/40 sm:grid-cols-[2fr_1.2fr_1fr_1fr_auto] sm:px-5">
          <div className="flex min-w-0 items-center gap-3"><span className={`grid size-11 shrink-0 place-items-center rounded-xl font-bold ${["bg-emerald-100 text-emerald-800","bg-blue-100 text-blue-800","bg-violet-100 text-violet-800"][index % 3]}`}>{c.initials}</span><span className="min-w-0"><b className="block truncate">{c.name}</b><small className="text-black/45">{c.document}</small></span></div>
          <div className="hidden sm:block"><span className="flex items-center gap-1.5 text-sm"><Phone size={14} className="text-black/35" />{c.phone}</span><span className="mt-1 flex items-center gap-1.5 truncate text-xs text-black/45"><Mail size={13} />{c.email}</span></div>
          <div className="hidden sm:block"><b className="text-sm">{c.vehicles} vehículo{c.vehicles !== 1 && "s"}</b><small className="block text-black/45">Última visita: {c.lastVisit}</small></div>
          <div className="hidden sm:block"><b className={c.balance > 0 ? "text-red-600" : "text-brand-700"}>{c.balance ? money.format(c.balance) : "Al día"}</b><small className="block text-black/45">Cuenta corriente</small></div>
          <ChevronRight size={18} className="hidden text-black/30 sm:block" />
        </Link>)}
        {!filtered.length && <div className="p-14 text-center"><UserRound className="mx-auto text-black/20" size={35} /><b className="mt-3 block">No encontramos clientes</b><p className="text-sm text-black/45">Probá con otro dato.</p></div>}
      </div>
    </section>
    <Dialog title="Nuevo cliente" open={open} onClose={() => setOpen(false)}><form onSubmit={submit} className="grid gap-4 p-5 sm:grid-cols-2"><label className="sm:col-span-2"><span className="mb-1.5 block text-xs font-bold">Nombre completo *</span><input name="name" className={field} required autoFocus placeholder="Ej. Ana García" /></label><label><span className="mb-1.5 block text-xs font-bold">DNI / CUIT</span><input name="document" className={field} placeholder="Sin puntos" /></label><label><span className="mb-1.5 block text-xs font-bold">Teléfono *</span><input name="phone" className={field} required /></label><label className="sm:col-span-2"><span className="mb-1.5 block text-xs font-bold">Email</span><input name="email" type="email" className={field} /></label><div className="mt-2 flex justify-end gap-2 sm:col-span-2"><button type="button" onClick={() => setOpen(false)} className="btn-secondary">Cancelar</button><button className="btn-primary">Guardar cliente</button></div></form></Dialog>
  </div>;
}

export function VehiclesPage() {
  const params = useSearchParams();
  const [rows, setRows] = useState(initialVehicles);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(params.get("nuevo") === "1");
  const filtered = useMemo(() => rows.filter((v) => [v.plate, v.brand, v.model, v.customer].join(" ").toLowerCase().includes(query.toLowerCase())), [query, rows]);
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); const data = new FormData(e.currentTarget); const customer = initialCustomers.find(c => c.id === data.get("customer"));
    setRows(r => [{ id: crypto.randomUUID(), plate: String(data.get("plate")).toUpperCase(), brand: String(data.get("brand")), model: String(data.get("model")), year: Number(data.get("year")), mileage: Number(data.get("mileage")), color: String(data.get("color")), customer: customer?.name ?? "Sin asignar", customerId: customer?.id ?? "", lastService: "Sin visitas", status: "Al día" }, ...r]); setOpen(false);
  }
  return <div className="mx-auto max-w-[1500px] space-y-6">
    <PageHeader eyebrow="Parque automotor" title="Vehículos" description={`${rows.length} vehículos registrados`} action="Nuevo vehículo" onAction={() => setOpen(true)} />
    <section className="card p-4"><label className="flex h-11 max-w-sm items-center gap-2 rounded-xl border border-black/10 bg-white px-3"><Search size={18} className="text-black/35" /><input value={query} onChange={(e) => setQuery(e.target.value)} className="min-w-0 flex-1 bg-transparent text-sm outline-none" placeholder="Patente, marca, propietario..." /></label></section>
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {filtered.map((v) => <Link href={`/vehiculos/${v.id}`} key={v.id} className="card group p-5 transition hover:-translate-y-0.5 hover:border-brand-500/30">
        <div className="flex items-start justify-between"><span className="grid size-12 place-items-center rounded-xl bg-canvas text-brand-700"><CarFront size={24} /></span><span className={`rounded-full px-2.5 py-1 text-xs font-bold ${v.status === "En taller" ? "bg-blue-50 text-blue-700" : v.status === "Atención" ? "bg-red-50 text-red-700" : "bg-brand-50 text-brand-700"}`}>{v.status}</span></div>
        <div className="mt-4 flex items-end justify-between"><div><p className="font-display text-2xl font-bold tracking-wide">{v.plate}</p><p className="font-semibold">{v.brand} {v.model}</p></div><button aria-label="Más opciones"><MoreHorizontal className="text-black/30" /></button></div>
        <div className="mt-4 grid grid-cols-2 gap-3 border-t border-black/[.06] pt-4 text-sm"><div><small className="block text-black/40">Propietario</small><b>{v.customer}</b></div><div><small className="block text-black/40">Kilometraje</small><b>{v.mileage.toLocaleString("es-AR")} km</b></div><div><small className="block text-black/40">Modelo</small><b>{v.year} · {v.color}</b></div><div><small className="block text-black/40">Última visita</small><b>{v.lastService}</b></div></div>
      </Link>)}
    </section>
    <Dialog title="Nuevo vehículo" open={open} onClose={() => setOpen(false)}><form onSubmit={submit} className="grid gap-4 p-5 sm:grid-cols-2"><label><span className="mb-1.5 block text-xs font-bold">Patente *</span><input name="plate" className={field} required autoFocus placeholder="AA 123 BB" /></label><label><span className="mb-1.5 block text-xs font-bold">Propietario *</span><select name="customer" className={field} required>{initialCustomers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select></label><label><span className="mb-1.5 block text-xs font-bold">Marca *</span><input name="brand" className={field} required /></label><label><span className="mb-1.5 block text-xs font-bold">Modelo *</span><input name="model" className={field} required /></label><label><span className="mb-1.5 block text-xs font-bold">Año</span><input name="year" type="number" defaultValue={2020} className={field} /></label><label><span className="mb-1.5 block text-xs font-bold">Kilometraje</span><input name="mileage" type="number" defaultValue={0} className={field} /></label><label className="sm:col-span-2"><span className="mb-1.5 block text-xs font-bold">Color</span><input name="color" className={field} /></label><div className="mt-2 flex justify-end gap-2 sm:col-span-2"><button type="button" onClick={() => setOpen(false)} className="btn-secondary">Cancelar</button><button className="btn-primary">Guardar vehículo</button></div></form></Dialog>
  </div>;
}
