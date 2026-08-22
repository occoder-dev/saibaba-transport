import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { EnquiryForm, type EnquiryField } from "@/components/site/enquiry-form";
import { listVehicleTypes, listMaterialCategories } from "@/lib/services/pricing";

export const metadata: Metadata = {
  title: "Request a Quote",
  description: "Request a formal transportation quotation from Saibaba Transport for your shipment.",
};

export default async function QuotePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const [vehicleTypes, materialCategories, params] = await Promise.all([
    listVehicleTypes({ onlyActive: true }),
    listMaterialCategories({ onlyActive: true }),
    searchParams,
  ]);

  // Pre-fill from the transport cost calculator's "Convert to a Formal
  // Quote Request" link, if the customer arrived from there.
  const initialValues: Record<string, string> = {};
  for (const key of ["pickup", "delivery", "material", "vehicle", "weight", "message"]) {
    const value = params[key];
    if (typeof value === "string" && value.trim()) {
      initialValues[key] = value;
    }
  }

  const fields: EnquiryField[] = [
    { type: "text", name: "companyName", label: "Company Name", placeholder: "Your company name", required: true },
    { type: "text", name: "contactPerson", label: "Contact Person", placeholder: "Full name", required: true },
    { type: "tel", name: "mobile", label: "Mobile Number", placeholder: "+91 98765 43210", required: true },
    { type: "email", name: "email", label: "Email Address", placeholder: "you@company.com", required: true },
    { type: "location", name: "pickup", label: "Pickup Location", placeholder: "Search city or address", required: true },
    { type: "location", name: "delivery", label: "Delivery Location", placeholder: "Search city or address", required: true },
    {
      type: "select",
      name: "material",
      label: "Material Type",
      options: materialCategories.map((m) => m.name),
      required: true,
    },
    { type: "text", name: "weight", label: "Approximate Weight", placeholder: "e.g. 5 tons" },
    { type: "select", name: "vehicle", label: "Vehicle Requirement", options: vehicleTypes.map((v) => v.name) },
    {
      type: "select",
      name: "frequency",
      label: "Shipment Frequency",
      options: ["One-time", "Weekly", "Fortnightly", "Monthly", "Regular / Contract Basis"],
    },
    { type: "textarea", name: "message", label: "Message", placeholder: "Any additional details about your requirement...", span: 2 },
  ];

  return (
    <>
      <PageHero
        eyebrow="Request a Quote"
        title="Get a formal transportation quotation"
        description="Share your shipment details and our team will get back to you with a formal quote based on your exact requirement."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Request a Quote" }]}
      />
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <EnquiryForm
            fields={fields}
            enquiryType="QUOTE"
            submitLabel="Submit Quote Request"
            successTitle="Quote request received"
            successDescription="Thank you for your enquiry. Our team will review your shipment details and get back to you with a formal quotation shortly."
            initialValues={initialValues}
          />
        </div>
      </section>
    </>
  );
}
