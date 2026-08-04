import { UseCaseDetail } from "../_components/UseCaseDetail";

export const metadata = {
  title: "Healthcare — Use Cases — Veloxiz",
  description: "How healthcare IT teams use Veloxiz to surface EHR workflow anomalies before they affect patient outcomes.",
};

export default function HealthcarePage() {
  return (
    <UseCaseDetail uc={{
      industry:    "Healthcare",
      headline:    "Surface EHR workflow anomalies before patient impact",
      description: "Healthcare data workflows — from EHR data entry to lab result processing to care coordination — must operate with near-zero error tolerance. Process failures in these pipelines can directly affect patient outcomes.",
      problem:     "Healthcare IT teams manage dozens of integrations with minimal observability. Workflow anomalies often go undetected until a clinician reports a problem — sometimes hours after a patient has been affected.",
      solution:    "Veloxiz monitors EHR data flows, HL7/FHIR message pipelines, and care coordination workflows for structural anomalies and processing delays, routing alerts to on-call teams before clinical staff notice.",
      metrics: [
        { label: "Missed workflow handoffs",       before: "~9 per month",  after: "3 per month",  delta: "↓67%"      },
        { label: "Pipeline issue resolution time", before: "4–8 hours",     after: "< 45 minutes", delta: "6× faster" },
        { label: "Audit trail completeness",       before: "Partial",       after: "100%",         delta: "automated" },
      ],
      outcomes: [
        "HL7 and FHIR message integrity monitoring",
        "Care handoff anomaly detection",
        "HIPAA-compliant audit trail generation",
        "Alert routing to on-call clinical systems team",
      ],
      quote: {
        text:    "We integrated Veloxiz into our HL7 pipeline and immediately found three recurring anomalies that had been causing delayed lab result delivery.",
        author:  "Director of Digital Health",
        company: "MediCore Systems",
      },
      next: { label: "E-Commerce", href: "/use-cases/ecommerce" },
    }} />
  );
}
