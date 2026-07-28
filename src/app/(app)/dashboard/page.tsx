import { ArrowRight, CalendarClock, CircleDollarSign, Clock3, PackageX, TrendingUp, Wrench } from "lucide-react";
import Link from "next/link";
import { RevenueChart } from "@/components/revenue-chart";
import { workshopJobs } from "@/lib/demo-data";
import { money } from "@/lib/utils";

const metrics = [
  { label: "Vehículos en taller", value: "12", detail: "8 en reparación", icon: Wrench, tone: "bg-brand-50 text-brand-700" },
  { label: "Turnos de hoy", value: "9", detail: "Próximo 11:30", icon: CalendarClock, tone: "bg-blue-50 text-blue-700" },
  { label: "Facturación hoy", value: "$ 1,24 M", detail: "+18% vs. martes", icon: CircleDollarSign, tone: "bg-violet-50 text-violet-700" },
  { label: "Pendiente de cobro", value: "$ 856 mil", detail: "6 comprobantes", icon: Clock3, tone: "bg-amber-50 text-amber-700" }
];

const toneMap: Record<string, string> = {
  blue: "bg-blue-50 text-blue-700", amber: "bg-amber-50 text-amber-700", purple: "bg-violet-50 text-violet-700",
  red: "bg-red-50 text-red-700", green: "bg-brand-50 text-brand-700"
};

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-[1500px] space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div><p className="text-sm font-bold text-brand-700">Martes, 28 de julio</p><h1 className="mt-1 font-display text-3xl font-bold tracking-tight">Buen día, Lucas</h1><p className="mt-1 text-sm text-black/50">Esto está pasando en tu taller ahora.</p></div>
        <Link href="/taller" className="btn-secondary">Abrir taller en vivo <ArrowRight size={17} /></Link>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map(({ label, value, detail, icon: Icon, tone }) => (
          <article className="card p-5" key={label}>
            <div className="flex items-start justify-between"><p className="text-sm font-bold text-black/50">{label}</p><span className={`grid size-10 place-items-center rounded-xl ${tone}`}><Icon size={19} /></span></div>
            <p className="mt-3 font-display text-3xl font-bold">{value}</p><p className="mt-1 text-xs font-semibold text-black/45">{detail}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.45fr_.8fr]">
        <article className="card p-5 sm:p-6">
          <div className="flex items-start justify-between"><div><h2 className="font-display text-lg font-bold">Facturación semanal</h2><p className="text-sm text-black/45">Ingresos confirmados por día</p></div><span className="flex items-center gap-1 rounded-lg bg-brand-50 px-2.5 py-1.5 text-xs font-bold text-brand-700"><TrendingUp size={14} /> 12,4%</span></div>
          <div className="mt-4"><RevenueChart /></div>
        </article>
        <article className="card p-5 sm:p-6">
          <h2 className="font-display text-lg font-bold">Atención requerida</h2><p className="text-sm text-black/45">Prioridades para resolver hoy</p>
          <div className="mt-5 space-y-3">
            <Link href="/taller" className="flex items-center gap-3 rounded-xl border border-red-100 bg-red-50/60 p-3.5 hover:bg-red-50"><span className="grid size-9 place-items-center rounded-lg bg-red-100 text-red-700"><Clock3 size={18} /></span><span className="min-w-0 flex-1"><b className="block text-sm">2 trabajos demorados</b><small className="text-black/45">Más de 24 h fuera de plazo</small></span><ArrowRight size={16} /></Link>
            <Link href="/inventario" className="flex items-center gap-3 rounded-xl border border-amber-100 bg-amber-50/60 p-3.5 hover:bg-amber-50"><span className="grid size-9 place-items-center rounded-lg bg-amber-100 text-amber-700"><PackageX size={18} /></span><span className="min-w-0 flex-1"><b className="block text-sm">7 repuestos con stock bajo</b><small className="text-black/45">3 afectan órdenes activas</small></span><ArrowRight size={16} /></Link>
            <Link href="/ordenes" className="flex items-center gap-3 rounded-xl border border-blue-100 bg-blue-50/60 p-3.5 hover:bg-blue-50"><span className="grid size-9 place-items-center rounded-lg bg-blue-100 text-blue-700"><Wrench size={18} /></span><span className="min-w-0 flex-1"><b className="block text-sm">4 presupuestos pendientes</b><small className="text-black/45">$ 1.193.200 en decisión</small></span><ArrowRight size={16} /></Link>
          </div>
        </article>
      </section>

      <section className="card overflow-hidden">
        <div className="flex items-center justify-between border-b border-black/[.06] p-5 sm:px-6"><div><h2 className="font-display text-lg font-bold">Taller en vivo</h2><p className="text-sm text-black/45">Últimos movimientos</p></div><Link href="/taller" className="text-sm font-bold text-brand-700 hover:underline">Ver tablero</Link></div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-canvas/70 text-xs uppercase tracking-wider text-black/40"><tr><th className="px-6 py-3">Vehículo</th><th>Trabajo</th><th>Estado</th><th>Técnico</th><th>Tiempo</th><th /></tr></thead>
            <tbody>{workshopJobs.map((job) => <tr key={job.plate} className="border-t border-black/[.05]"><td className="px-6 py-4"><b className="block">{job.plate}</b><span className="text-xs text-black/45">{job.car}</span></td><td><b className="font-semibold">{job.service}</b><span className="block text-xs text-black/45">{job.customer}</span></td><td><span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${toneMap[job.tone]}`}>{job.state}</span></td><td>{job.technician}</td><td className="font-semibold">{job.time}</td><td className="pr-5"><ArrowRight size={16} className="text-black/35" /></td></tr>)}</tbody>
          </table>
        </div>
      </section>
      <p className="sr-only">Facturación mensual: {money.format(6780000)}</p>
    </div>
  );
}
