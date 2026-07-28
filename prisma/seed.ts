import { PrismaClient, Priority, WorkOrderStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const company = await prisma.company.upsert({
    where: { id: "demo-company" },
    update: {},
    create: { id: "demo-company", name: "Taller Norte" }
  });
  const branch = await prisma.branch.upsert({
    where: { id: "demo-branch" },
    update: {},
    create: {
      id: "demo-branch",
      companyId: company.id,
      name: "Casa central",
      address: "Av. San Martín 2840, CABA"
    }
  });
  await prisma.user.upsert({
    where: { email: "admin@tallernorte.com" },
    update: {},
    create: {
      companyId: company.id,
      branchId: branch.id,
      name: "Martín Suárez",
      email: "admin@tallernorte.com",
      passwordHash: await bcrypt.hash("Taller2026!", 12),
      role: "OWNER"
    }
  });

  const records = [
    { id: "c1", firstName: "Lucía", lastName: "Fernández", document: "27-28440921-4", phone: "11 5892-4431", email: "lucia.fernandez@email.com", tags: ["Frecuente", "Flota"], plate: "AF 482 QN", brand: "Toyota", model: "Corolla", year: 2021, mileage: 48720, color: "Blanco", status: WorkOrderStatus.REPAIRING, priority: Priority.HIGH, description: "Service 50.000 km y revisión de frenos", total: 286500 },
    { id: "c2", firstName: "Nicolás", lastName: "Romero", document: "33.892.144", phone: "11 4401-8892", email: "nico.romero@email.com", tags: ["Particular"], plate: "AC 119 ZK", brand: "Volkswagen", model: "Amarok", year: 2019, mileage: 112430, color: "Gris", status: WorkOrderStatus.WAITING_APPROVAL, priority: Priority.NORMAL, description: "Ruido tren delantero", total: 194800 },
    { id: "c3", firstName: "Camila", lastName: "Acosta", document: "30.201.884", phone: "11 6120-7854", email: "camila.acosta@email.com", tags: ["Premium"], plate: "AG 771 LP", brand: "Peugeot", model: "208", year: 2023, mileage: 18400, color: "Azul", status: WorkOrderStatus.DIAGNOSIS, priority: Priority.NORMAL, description: "Testigo de motor encendido", total: 85000 },
    { id: "c4", firstName: "Esteban", lastName: "Méndez", document: "20-24112880-9", phone: "11 3982-1102", email: "compras@logisticamendez.com", tags: ["Empresa", "Cuenta corriente"], plate: "AE 304 RT", brand: "Ford", model: "Transit", year: 2020, mileage: 156900, color: "Blanco", status: WorkOrderStatus.WAITING_PARTS, priority: Priority.URGENT, description: "Embrague completo", total: 612300 },
    { id: "c5", firstName: "Sofía", lastName: "Paz", document: "35.119.027", phone: "11 5022-7811", email: "sofiapaz@email.com", tags: ["Particular"], plate: "AB 928 VX", brand: "Renault", model: "Sandero", year: 2018, mileage: 89600, color: "Rojo", status: WorkOrderStatus.READY, priority: Priority.NORMAL, description: "Cambio de aceite y filtros", total: 138900 }
  ];

  for (const row of records) {
    const customer = await prisma.customer.upsert({
      where: { id: row.id },
      update: {},
      create: {
        id: row.id,
        companyId: company.id,
        firstName: row.firstName,
        lastName: row.lastName,
        document: row.document,
        phone: row.phone,
        email: row.email,
        tags: row.tags
      }
    });
    const vehicle = await prisma.vehicle.upsert({
      where: { plate: row.plate },
      update: {},
      create: {
        id: `v-${row.id}`,
        customerId: customer.id,
        plate: row.plate,
        brand: row.brand,
        model: row.model,
        year: row.year,
        mileage: row.mileage,
        color: row.color
      }
    });
    await prisma.workOrder.upsert({
      where: { id: `wo-${row.id}` },
      update: {},
      create: {
        id: `wo-${row.id}`,
        branchId: branch.id,
        customerId: customer.id,
        vehicleId: vehicle.id,
        status: row.status,
        priority: row.priority,
        description: row.description,
        estimatedTotal: row.total,
        promisedAt: new Date(Date.now() + 86400000)
      }
    });
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
