import { getAnalyticsMetrics } from "@/lib/actions/analytics";
import { AnalyticsClient } from "@/components/analytics/AnalyticsClient";

export const metadata = {
  title: "Business Analytics | Tralance Admin",
};

export default async function AnalyticsPage() {
  const data = await getAnalyticsMetrics();
  return <AnalyticsClient data={data} />;
}
