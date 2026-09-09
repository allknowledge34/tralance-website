import { getPromoSettings } from "@/app/actions/promo";
import PromoAdminClient from "@/components/PromoAdminClient";

export default async function PromoPage() {
  const initialSettings = await getPromoSettings();
  
  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Promo Bar</h1>
        <p className="text-subtle mt-1 text-sm">
          Manage the global promotional announcement bar that appears above the navigation.
        </p>
      </div>

      <PromoAdminClient initialSettings={initialSettings} />
    </div>
  );
}
