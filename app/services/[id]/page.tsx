import { notFound } from "next/navigation"
import ServiceDetailPage from "@/app/services/[id]/service-detail-page"
import { getServiceById, servicesData } from "@/lib/services-data"

interface PageProps {
  params: Promise<{ id: string }>
}

// Generate static params for all services
export async function generateStaticParams() {
  return servicesData.map((service) => ({
    id: service.id.toString(),
  }))
}

export default async function ServiceDetail({ params }: PageProps) {
  const { id } = await params
  const service = getServiceById(id)

  if (!service) {
    notFound()
  }

  return <ServiceDetailPage serviceId={id} />
}
