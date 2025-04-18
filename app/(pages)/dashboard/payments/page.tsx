import Index from "@/components/payment";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payments Management | Manage and analyze payments",
  description: "Manage and analyze payments",
};

export default function PaymentsPage() {
  return (
    <div className="flex flex-col gap-4">
      <Index />
    </div>
  );
}
