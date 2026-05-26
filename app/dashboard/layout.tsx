import Header from "@/components/Header";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="mx-auto max-w-5xl px-6 py-8">{children}</div>
    </div>
  );
}
