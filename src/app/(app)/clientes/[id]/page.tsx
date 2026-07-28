import { ArrowLeft, CarFront, Mail, Phone, Plus } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { customers, vehicles } from "@/lib/demo-data";
import { money } from "@/lib/utils";

export default async function CustomerDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; const customer = customers.find(c => c.id === id); if (!customer) notFound();
  const owned = vehicles.filter(v => v.customerId === id);
  return <div className="mx-auto max-w-6xl space-y-6">
    <Link href="/clientes" className="inline-flex items-center gap-2 text-sm font-bold text-black/50 hover:text-ink"><ArrowLeft size={16} />Volver a clientes</Link>
    <section className="card p-6"><div className="flex flex-col gap-5 sm:flex-row sm:items-center"><span className="grid size-16 place-items-center rounded-2xl bg-brand-100 font-display text-xl font-bold text-brand-800">{customer.initials}</span><div className="flex-1"><h1 className="font-display text-3xl font-bold">{customer.name}</h1><p className="mt-1 text-sm text-black/45">{customer.document} · Cliente desde 2021</p></div><button className="btn-secondary"><Plus size={17} />Nueva orden</button></div>
      <div className="mt-6 grid gap-3 border-t border-black/[.06] pt-5 sm:grid-cols-3"><p className="flex items-center gap-2 text-sm"><Phone size={16} className="text-brand-600" />{customer.phone}</p><p className="flex items-center gap-2 text-sm"><Mail size={16} className="text-brand-600" />{customer.email}</p><div><small className="text-black/40">Saldo</small><b className={`ml-2 ${customer.balance ? "text-red-600" : "text-brand-700"}`}>{customer.balance ? money.format(customer.balance) : "Al día"}</b></div></div>
    </section>
    <div className="grid gap-5 lg:grid-cols-[1.2fr_.8fr]"><section className="card p-5"><h2 className="font-display text-lg font-bold">Vehículos</h2><div className="mt-4 space-y-3">{owned.length ? owned.map(v => <Link href={`/vehiculos/${v.id}`} key={v.id} className="flex items-center gap-3 rounded-xl border border-black/[.07] p-4 hover:bg-canvas"><span className="grid size-10 place-items-center rounded-lg bg-canvas text-brand-700"><CarFront size={20} /></span><span className="flex-1"><b className="block">{v.plate}</b><small className="text-black/45">{v.brand} {v.model} · {v.year}</small></span><span className="text-sm font-semibold">{v.mileage.toLocaleString("es-AR")} km</span></Link>) : <p className="py-8 text-center text-sm text-black/40">Todavía no tiene vehículos.</p>}</div></section>
    <section className="card p-5"><h2 className="font-display text-lg font-bold">Actividad</h2><div className="mt-5 border-l-2 border-brand-100 pl-5"><div className="relative pb-7"><span className="absolute -left-[26px] top-1 size-3 rounded-full bg-brand-500 ring-4 ring-white" /><b className="text-sm">Ficha actualizada</b><p className="text-xs text-black/45">Hoy, 10:42 · Martín Suárez</p></div><div className="relative"><span className="absolute -left-[26px] top-1 size-3 rounded-full bg-blue-400 ring-4 ring-white" /><b className="text-sm">Última visita</b><p className="text-xs text-black/45">{customer.lastVisit} · Recepción</p></div></div></section></div>
  </div>;
}
