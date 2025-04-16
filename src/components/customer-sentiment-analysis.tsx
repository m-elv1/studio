'use client';

import {Textarea} from '@/components/ui/textarea';
import {Button} from '@/components/ui/button';
import {useState} from 'react';
import {analyzeCustomerSentiment} from '@/ai/flows/customer-sentiment-analysis';

export function CustomerSentimentAnalysis() {
  const [customerInteractions, setCustomerInteractions] = useState<string>('');
  const [sentimentAnalysis, setSentimentAnalysis] = useState<{
    overallSentiment: string;
    keyPhrases: string;
    suggestedActions: string;
  } | null>(null);

  const handleSentimentAnalysis = async () => {
    if (!customerInteractions) {
      alert('Please enter customer interactions.');
      return;
    }

    try {
      const analysis = await analyzeCustomerSentiment({customerInteractions});
      setSentimentAnalysis({
        overallSentiment: analysis.overallSentiment,
        keyPhrases: analysis.keyPhrases,
        suggestedActions: analysis.suggestedActions,
      });
    } catch (error: any) {
      console.error('Error analyzing sentiment:', error);
      alert(`Failed to analyze sentiment: ${error.message}`);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Customer Sentiment Analysis</h2>

      <div className="mb-4">
        <Textarea
          placeholder="Enter customer interactions..."
          value={customerInteractions}
          onChange={(e) => setCustomerInteractions(e.target.value)}
          className="w-full"
        />
      </div>

      <Button onClick={handleSentimentAnalysis} className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700">Analyze Sentiment</Button>

      {sentimentAnalysis && (
        <div className="mt-4 p-4 border rounded-md bg-white shadow-sm">
          <h3 className="text-lg font-semibold mb-2 text-gray-700">Sentiment Analysis Results:</h3>
          <p className="text-gray-600">
            <strong>Overall Sentiment:</strong> {sentimentAnalysis.overallSentiment}
          </p>
          <p className="text-gray-600">
            <strong>Key Phrases:</strong> {sentimentAnalysis.keyPhrases}
          </p>
          <p className="text-gray-600">
            <strong>Suggested Actions:</strong> {sentimentAnalysis.suggestedActions}
          </p>
        </div>
      )}
    </div>
  );
}
