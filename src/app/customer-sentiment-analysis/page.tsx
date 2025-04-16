import {CustomerSentimentAnalysis} from '@/components/customer-sentiment-analysis';

export default function CustomerSentimentAnalysisPage() {
  return (
    <main className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-4">Customer Sentiment Analysis</h1>
      <CustomerSentimentAnalysis />
    </main>
  );
}
