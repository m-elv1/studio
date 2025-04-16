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

      <Button onClick={handleSentimentAnalysis}>Analyze Sentiment</Button>

      {sentimentAnalysis && (
        <div className="mt-4 p-4 border rounded-md">
          <h3>Sentiment Analysis Results:</h3>
          <p>
            <strong>Overall Sentiment:</strong> {sentimentAnalysis.overallSentiment}
          </p>
          <p>
            <strong>Key Phrases:</strong> {sentimentAnalysis.keyPhrases}
          </p>
          <p>
            <strong>Suggested Actions:</strong> {sentimentAnalysis.suggestedActions}
          </p>
        </div>
      )}
    </div>
  );
}
