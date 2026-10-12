import { getPromoSettings } from "@/app/actions/promo";
import PromoAdminClient from "@/components/PromoAdminClient";

export default async function PromoPage() {
  const initialSettings = await getPromoSettings();
  
  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 bg-[#FFFDF5] dark:bg-[#18181B] border-2 border-[#171717] dark:border-[#383838] shadow-[4px_4px_0px_0px_#171717] dark:shadow-[4px_4px_0px_0px_#000000]">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-wider text-[#171717] dark:text-[#FFFDF5]">Promo Bar</h1>
          <p className="text-subtle text-sm font-medium mt-1">
            Manage the global promotional announcement bar that appears above the navigation.
          </p>
        </div>
      </div>

      <PromoAdminClient initialSettings={initialSettings} />
    </div>
  );
}
