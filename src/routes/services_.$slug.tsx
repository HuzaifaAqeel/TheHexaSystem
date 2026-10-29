import { createFileRoute, notFound } from '@tanstack/react-router';
import Layout from '@/site/Layout';
import ServiceDetail from '@/site/pages/ServiceDetail';
import { services, pageMeta } from '@/site/content';
export const Route = createFileRoute('/services_/$slug')({
  loader: ({ params }) => { const service = services.find(s => s.slug === params.slug); if (!service) throw notFound(); return service; },
  head: ({ loaderData }) => pageMeta(loaderData?.title ?? 'Service unavailable', loaderData?.metaDescription ?? 'Explore marketing, AI automation and web services from Hexa Systems.'),
  component: ServicePage,
});
function ServicePage() { const { slug } = Route.useParams(); return <Layout><ServiceDetail slug={slug} /></Layout>; }