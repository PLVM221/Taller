export type Supplier = { id: string; name: string; taxId: string; contact: string; phone: string; email: string; address: string; terms: string };
export type PurchaseItem = { description: string; quantity: number; unitPrice: number };
export type Payment = { id: string; date: string; amount: number; method: string };
export type PurchaseOrder = { id: string; number: string; date: string; supplierId: string; status: "Pendiente" | "Parcial" | "Pagado"; items: PurchaseItem[]; payments: Payment[] };

export const demoSuppliers: Supplier[] = [
  { id: "s1", name: "Repuestos del Plata", taxId: "30-71284591-8", contact: "Carolina Ruiz", phone: "11 4632-8840", email: "ventas@repuestosdelplata.com", address: "Av. Warnes 1842, CABA", terms: "Cuenta corriente 30 días" },
  { id: "s2", name: "Lubricantes Sur", taxId: "30-69840211-3", contact: "Diego Benítez", phone: "11 4256-9021", email: "pedidos@lubricantessur.com", address: "Av. Hipólito Yrigoyen 7820, Banfield", terms: "Transferencia contra entrega" },
  { id: "s3", name: "Frenos Centro", taxId: "30-71660882-1", contact: "Mariela Soto", phone: "11 4855-3372", email: "comercial@frenoscentro.com", address: "Juan B. Justo 3310, CABA", terms: "Cuenta corriente 15 días" }
];

export const demoOrders: PurchaseOrder[] = [
  { id: "p1", number: "PED-00124", date: "2026-07-28", supplierId: "s1", status: "Parcial", items: [{ description: "Kit embrague Ford Transit", quantity: 1, unitPrice: 438000 }, { description: "Rulemán de empuje", quantity: 1, unitPrice: 86200 }], payments: [{ id: "pay1", date: "2026-07-28", amount: 250000, method: "Transferencia" }] },
  { id: "p2", number: "PED-00123", date: "2026-07-25", supplierId: "s2", status: "Pagado", items: [{ description: "Aceite sintético 5W-30 4 L", quantity: 8, unitPrice: 43200 }, { description: "Filtro aceite PH7317", quantity: 10, unitPrice: 11900 }], payments: [{ id: "pay2", date: "2026-07-25", amount: 464600, method: "Transferencia" }] },
  { id: "p3", number: "PED-00122", date: "2026-07-22", supplierId: "s3", status: "Pendiente", items: [{ description: "Pastillas delanteras Corolla", quantity: 2, unitPrice: 78000 }], payments: [] }
];
