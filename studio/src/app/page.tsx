'use client';

import {SalesDashboard} from '@/components/sales-dashboard';

export default function Home() {
  return (
    <main className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-4">Sales Dashboard</h1>
      <SalesDashboard />
    </main>
  );
}
