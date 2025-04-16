'use client';

import {SalesDashboard} from '@/components/sales-dashboard';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-start justify-start p-12">
      <h1 className="text-4xl font-bold mb-8">Sales Dashboard</h1>
      <SalesDashboard />
    </main>
  );
}

