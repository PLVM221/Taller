import { Construction } from "lucide-react";
import Link from "next/link";

export function NextPhase({ title, phase }: { title: string; phase: number }) {
  return <div className="mx-auto grid min-h-[65vh] max-w-2xl place-items-center"><section className="card w-full p-10 text-center"><span className="mx-auto grid size-14 place-items-center rounded-2xl bg-amber-50 text-amber-700"><Construction /></span><p className="mt-5 text-sm font-bold text-brand-700">Planificado · Fase {phase}</p><h1 className="mt-1 font-display text-3xl font-bold">{title}</h1><p className="mx-auto mt-3 max-w-md text-sm leading-6 text-black/50">Módulo fuera del alcance de Fase 1. La navegación ya reserva su ubicación sin simular acciones inexistentes.</p><Link href="/dashboard" className="btn-secondary mt-6">Volver al inicio</Link></section></div>;
}
