'use client';

import {CustomerLocationData} from '@/components/customer-location-data';

export default function CustomerLocationDataPage() {
  return (
    <main className="flex min-h-screen flex-col items-start justify-start p-12">
      <h1 className="text-4xl font-bold mb-8">Customer Location Data</h1>
      <CustomerLocationData />
    </main>
  );
}
