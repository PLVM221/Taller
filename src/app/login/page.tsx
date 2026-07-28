import { CheckCircle2, Wrench } from "lucide-react";
import { login } from "./actions";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  return <main className="grid min-h-screen bg-[#10251e] lg:grid-cols-2">
    <section className="hidden flex-col justify-between p-14 text-white lg:flex">
      <div className="flex items-center gap-3"><span className="grid size-11 place-items-center rounded-xl bg-brand-500"><Wrench /></span><span className="font-display text-xl font-bold">Taller Norte</span></div>
      <div className="max-w-xl"><p className="mb-4 text-sm font-bold uppercase tracking-[.2em] text-brand-500">El taller, bajo control</p><h1 className="font-display text-5xl font-bold leading-[1.08]">Menos administración.<br />Más taller en marcha.</h1><div className="mt-10 grid gap-4 text-sm text-white/70">{["Todo el trabajo en una sola vista", "Decisiones rápidas con datos claros", "Historial completo de cada vehículo"].map(x => <p className="flex items-center gap-3" key={x}><CheckCircle2 className="text-brand-500" size={19} />{x}</p>)}</div></div>
      <p className="text-xs text-white/35">Gestión pensada para talleres argentinos.</p>
    </section>
    <section className="grid place-items-center bg-canvas p-5 lg:rounded-l-[36px]">
      <form action={login} className="w-full max-w-md rounded-3xl border border-black/[.06] bg-white p-7 shadow-card sm:p-9">
        <div className="mb-8 lg:hidden"><span className="grid size-11 place-items-center rounded-xl bg-brand-600 text-white"><Wrench /></span></div>
        <p className="text-sm font-bold text-brand-700">Bienvenido</p><h2 className="mt-1 font-display text-3xl font-bold">Ingresá a tu taller</h2><p className="mt-2 text-sm text-black/45">Usá las credenciales demo para explorar.</p>
        {error && <p className="mt-5 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-700">Email o contraseña incorrectos.</p>}
        <label className="mt-7 block"><span className="mb-2 block text-xs font-bold">Email</span><input name="email" type="email" required defaultValue="admin@tallernorte.com" className="focus-ring h-12 w-full rounded-xl border border-black/10 px-3" /></label>
        <label className="mt-4 block"><span className="mb-2 block text-xs font-bold">Contraseña</span><input name="password" type="password" required defaultValue="Taller2026!" className="focus-ring h-12 w-full rounded-xl border border-black/10 px-3" /></label>
        <button className="btn-primary mt-6 h-12 w-full">Ingresar</button>
        <p className="mt-5 text-center text-xs text-black/40">Demo: admin@tallernorte.com · Taller2026!</p>
      </form>
    </section>
  </main>;
}
