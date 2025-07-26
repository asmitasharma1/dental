import ServiceDetailPage from "./service-detail-page"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function ServiceDetail({ params }: PageProps) {
  const { id } = await params
  return <ServiceDetailPage serviceId={id} />
}
