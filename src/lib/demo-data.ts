export type Customer = {
  id: string;
  name: string;
  initials: string;
  document: string;
  phone: string;
  email: string;
  tags: string[];
  vehicles: number;
  balance: number;
  lastVisit: string;
};

export type Vehicle = {
  id: string;
  plate: string;
  brand: string;
  model: string;
  year: number;
  mileage: number;
  color: string;
  customer: string;
  customerId: string;
  lastService: string;
  status: "En taller" | "Al día" | "Atención";
};

export const customers: Customer[] = [
  { id: "c1", name: "Lucía Fernández", initials: "LF", document: "27-28440921-4", phone: "11 5892-4431", email: "lucia.fernandez@email.com", tags: ["Frecuente", "Flota"], vehicles: 2, balance: 0, lastVisit: "Hoy" },
  { id: "c2", name: "Nicolás Romero", initials: "NR", document: "33.892.144", phone: "11 4401-8892", email: "nico.romero@email.com", tags: ["Particular"], vehicles: 1, balance: 194800, lastVisit: "Hoy" },
  { id: "c3", name: "Camila Acosta", initials: "CA", document: "30.201.884", phone: "11 6120-7854", email: "camila.acosta@email.com", tags: ["Premium"], vehicles: 1, balance: 0, lastVisit: "Ayer" },
  { id: "c4", name: "Esteban Méndez", initials: "EM", document: "20-24112880-9", phone: "11 3982-1102", email: "compras@logisticamendez.com", tags: ["Empresa", "Cuenta corriente"], vehicles: 6, balance: 612300, lastVisit: "22 jul" },
  { id: "c5", name: "Sofía Paz", initials: "SP", document: "35.119.027", phone: "11 5022-7811", email: "sofiapaz@email.com", tags: ["Particular"], vehicles: 1, balance: 0, lastVisit: "18 jul" },
  { id: "c6", name: "Javier Morales", initials: "JM", document: "28.991.028", phone: "11 4480-1210", email: "javier.morales@email.com", tags: ["Frecuente"], vehicles: 2, balance: 48500, lastVisit: "14 jul" }
];

export const vehicles: Vehicle[] = [
  { id: "v1", plate: "AF 482 QN", brand: "Toyota", model: "Corolla XEI", year: 2021, mileage: 48720, color: "Blanco", customer: "Lucía Fernández", customerId: "c1", lastService: "Hoy", status: "En taller" },
  { id: "v2", plate: "AC 119 ZK", brand: "Volkswagen", model: "Amarok Comfortline", year: 2019, mileage: 112430, color: "Gris", customer: "Nicolás Romero", customerId: "c2", lastService: "Hoy", status: "En taller" },
  { id: "v3", plate: "AG 771 LP", brand: "Peugeot", model: "208 Allure", year: 2023, mileage: 18400, color: "Azul", customer: "Camila Acosta", customerId: "c3", lastService: "Ayer", status: "En taller" },
  { id: "v4", plate: "AE 304 RT", brand: "Ford", model: "Transit", year: 2020, mileage: 156900, color: "Blanco", customer: "Esteban Méndez", customerId: "c4", lastService: "22 jul", status: "Atención" },
  { id: "v5", plate: "AB 928 VX", brand: "Renault", model: "Sandero Stepway", year: 2018, mileage: 89600, color: "Rojo", customer: "Sofía Paz", customerId: "c5", lastService: "18 jul", status: "Al día" },
  { id: "v6", plate: "AD 540 MK", brand: "Chevrolet", model: "Cruze LTZ", year: 2020, mileage: 74120, color: "Negro", customer: "Javier Morales", customerId: "c6", lastService: "14 jul", status: "Al día" }
];

export const workshopJobs = [
  { plate: "AF 482 QN", car: "Toyota Corolla", service: "Service 50.000 km", customer: "Lucía Fernández", state: "En reparación", tone: "blue", time: "3h 12m", technician: "Marcos" },
  { plate: "AC 119 ZK", car: "Volkswagen Amarok", service: "Ruido tren delantero", customer: "Nicolás Romero", state: "Esperando aprobación", tone: "amber", time: "1h 48m", technician: "Sin asignar" },
  { plate: "AG 771 LP", car: "Peugeot 208", service: "Testigo motor", customer: "Camila Acosta", state: "Diagnóstico", tone: "purple", time: "52m", technician: "Gonzalo" },
  { plate: "AE 304 RT", car: "Ford Transit", service: "Embrague completo", customer: "Esteban Méndez", state: "Esperando repuesto", tone: "red", time: "2d 4h", technician: "Damián" },
  { plate: "AB 928 VX", car: "Renault Sandero", service: "Aceite y filtros", customer: "Sofía Paz", state: "Listo para entregar", tone: "green", time: "4h 20m", technician: "Marcos" }
];

