import { Dock } from "@/components/ui/dock";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-foreground/20 font-sans overflow-x-hidden">
      <Dock />
      
      <main className="relative z-10 flex flex-col min-h-screen pb-32 pt-16 px-6 md:px-12 max-w-3xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}
