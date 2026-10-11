import { getToolUsageData } from "@/lib/actions/toolUsage";
import { ToolUsageClient } from "@/components/tools/ToolUsageClient";

export const metadata = {
  title: "Tool Usage Analytics | Tralance Admin",
};

export default async function ToolUsagePage() {
  const data = await getToolUsageData();
  return <ToolUsageClient data={data} />;
}
