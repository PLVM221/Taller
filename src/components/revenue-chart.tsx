"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { money } from "@/lib/utils";

const data = [
  { day: "Lun", value: 420000 }, { day: "Mar", value: 610000 }, { day: "Mié", value: 545000 },
  { day: "Jue", value: 830000 }, { day: "Vie", value: 760000 }, { day: "Sáb", value: 940000 }
];

export function RevenueChart() {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ left: -15, right: 8, top: 12 }}>
          <defs><linearGradient id="revenue" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1aa36f" stopOpacity={0.3} /><stop offset="100%" stopColor="#1aa36f" stopOpacity={0} /></linearGradient></defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#16231f12" />
          <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#66736e" }} dy={10} />
          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#66736e" }} tickFormatter={(v) => `$${v / 1000}k`} />
          <Tooltip formatter={(v) => money.format(Number(v))} contentStyle={{ borderRadius: 12, border: "1px solid #16231f12", boxShadow: "0 8px 24px #00000012" }} />
          <Area type="monotone" dataKey="value" stroke="#11845a" strokeWidth={3} fill="url(#revenue)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

