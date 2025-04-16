'use client';

import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {getSalesMetrics} from '@/services/sales-data';
import {useEffect, useState} from 'react';

export function SalesDashboard() {
  const [totalSales, setTotalSales] = useState(0);
  const [averageDealSize, setAverageDealSize] = useState(0);
  const [conversionRate, setConversionRate] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      const salesMetrics = await getSalesMetrics();
      setTotalSales(salesMetrics.totalSales);
      setAverageDealSize(salesMetrics.averageDealSize);
      setConversionRate(salesMetrics.conversionRate);
    };

    loadData();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="bg-white shadow-md rounded-lg">
        <CardHeader>
          <CardTitle className="text-gray-700">Total Sales</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">${totalSales}</div>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-md rounded-lg">
        <CardHeader>
          <CardTitle className="text-gray-700">Average Deal Size</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">${averageDealSize}</div>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-md rounded-lg">
        <CardHeader>
          <CardTitle className="text-gray-700">Conversion Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">{(conversionRate * 100).toFixed(2)}%</div>
        </CardContent>
      </Card>
    </div>
  );
}
