import {CustomerSentimentAnalysis} from '@/components/customer-sentiment-analysis';

export default function CustomerSentimentAnalysisPage() {
  return (
    <main className="flex min-h-screen flex-col items-start justify-start p-12">
      <h1 className="text-4xl font-bold mb-8">Customer Sentiment Analysis</h1>
      <CustomerSentimentAnalysis />
    </main>
  );
}

