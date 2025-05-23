'use client';

import {Textarea} from '@/components/ui/textarea';
import {Button} from '@/components/ui/button';
import {useState} from 'react';
import {analyzeCustomerPaymentHistory} from '@/ai/flows/analyze-customer-payment-history';

export function CustomerPaymentHistoryAnalysis() {
  const [customerPaymentHistory, setCustomerPaymentHistory] = useState<string>('');
  const [paymentHistoryAnalysis, setPaymentHistoryAnalysis] = useState<{
    paymentBehavior: string;
    potentialIssues: string;
    suggestedActions: string;
  } | null>(null);

  const handlePaymentHistoryAnalysis = async () => {
    if (!customerPaymentHistory) {
      alert('Please enter customer payment history.');
      return;
    }

    try {
      const analysis = await analyzeCustomerPaymentHistory({customerPaymentHistory});
      setPaymentHistoryAnalysis({
        paymentBehavior: analysis.paymentBehavior,
        potentialIssues: analysis.potentialIssues,
        suggestedActions: analysis.suggestedActions,
      });
    } catch (error: any) {
      console.error('Error analyzing payment history:', error);
      alert(`Failed to analyze payment history: ${error.message}`);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Customer Payment History Analysis</h2>

      <div className="mb-4">
        <Textarea
          placeholder="Enter customer payment history..."
          value={customerPaymentHistory}
          onChange={(e) => setCustomerPaymentHistory(e.target.value)}
          className="w-full"
        />
      </div>

      <Button onClick={handlePaymentHistoryAnalysis} className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700">Analyze Payment History</Button>

      {paymentHistoryAnalysis && (
        <div className="mt-4 p-4 border rounded-md bg-white shadow-sm">
          <h3 className="text-lg font-semibold mb-2 text-gray-700">Payment History Analysis Results:</h3>
          <p className="text-gray-600">
            <strong>Payment Behavior:</strong> {paymentHistoryAnalysis.paymentBehavior}
          </p>
          <p className="text-gray-600">
            <strong>Potential Issues:</strong> {paymentHistoryAnalysis.potentialIssues}
          </p>
          <p className="text-gray-600">
            <strong>Suggested Actions:</strong> {paymentHistoryAnalysis.suggestedActions}
          </p>
        </div>
      )}
    </div>
  );
}
