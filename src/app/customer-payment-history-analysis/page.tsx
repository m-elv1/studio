import {CustomerPaymentHistoryAnalysis} from '@/components/customer-payment-history-analysis';

export default function CustomerPaymentHistoryAnalysisPage() {
  return (
    <main className="flex min-h-screen flex-col items-start justify-start p-12">
      <h1 className="text-4xl font-bold mb-8">Customer Payment History Analysis</h1>
      <CustomerPaymentHistoryAnalysis />
    </main>
  );
}
