import {SalesDashboard} from '@/components/sales-dashboard';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-12">
      <h1 className="text-4xl font-bold mb-8">TradeFlow Sales Dashboard</h1>
      <SalesDashboard />
    </main>
  );
}
