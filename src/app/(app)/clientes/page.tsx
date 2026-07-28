import { Suspense } from "react";
import { CustomersPage } from "@/components/entity-pages";

export default function Page() {
  return <Suspense><CustomersPage /></Suspense>;
}
