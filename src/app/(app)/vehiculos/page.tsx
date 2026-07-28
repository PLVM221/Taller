import { Suspense } from "react";
import { VehiclesPage } from "@/components/entity-pages";

export default function Page() {
  return <Suspense><VehiclesPage /></Suspense>;
}
