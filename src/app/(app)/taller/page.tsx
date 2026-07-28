import { Clock3, UserRound } from "lucide-react";
import { workshopJobs } from "@/lib/demo-data";

const columns = ["Diagnóstico", "Esperando aprobación", "Esperando repuesto", "En reparación", "Listo para entregar"];
const tones: Record<string, string> = { "Diagnóstico": "border-violet-300", "Esperando aprobación": "border-amber-300", "Esperando repuesto": "border-red-300", "En reparación": "border-blue-300", "Listo para entregar": "border-emerald-300" };

export default function WorkshopPage() {
  return <div className="mx-auto max-w-[1700px] space-y-6"><div><p className="text-sm font-bold text-brand-700">Operación en tiempo real</p><h1 className="mt-1 font-display text-3xl font-bold">Taller en vivo</h1><p className="mt-1 text-sm text-black/50">5 vehículos activos · actualizado ahora</p></div>
    <div className="grid gap-4 overflow-x-auto pb-4 xl:grid-cols-5">{columns.map(col => <section className="min-w-[280px] rounded-2xl bg-black/[.025] p-3" key={col}><header className="mb-3 flex items-center justify-between px-1"><h2 className="text-sm font-bold">{col}</h2><span className="grid size-6 place-items-center rounded-full bg-white text-xs font-bold">{workshopJobs.filter(j => j.state === col).length}</span></header>{workshopJobs.filter(j => j.state === col).map(job => <article className={`rounded-xl border-l-4 bg-white p-4 shadow-card ${tones[col]}`} key={job.plate}><div className="flex justify-between"><b className="font-display text-lg tracking-wide">{job.plate}</b><span className="text-xs font-bold text-black/40">{job.time}</span></div><p className="text-sm font-semibold">{job.car}</p><div className="my-3 border-t border-black/[.06]" /><b className="text-sm">{job.service}</b><p className="mt-1 text-xs text-black/45">{job.customer}</p><div className="mt-4 flex items-center justify-between text-xs"><span className="flex items-center gap-1 text-black/50"><UserRound size={13} />{job.technician}</span><Clock3 size={14} className="text-black/30" /></div></article>)}</section>)}</div>
  </div>;
}
