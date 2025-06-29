'use client';

import {CustomerLocationData} from '@/components/customer-location-data';

export default function CustomerLocationDataPage() {
  return (
    <main className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-4">Customer Location Data</h1>
      <CustomerLocationData />
    </main>
  );
}
