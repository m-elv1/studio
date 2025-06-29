'use server';

/**
 * @fileOverview An AI agent that analyzes the payment history of customer.
 *
 * - analyzeCustomerPaymentHistory - A function that handles the payment history analysis process.
 * - AnalyzeCustomerPaymentHistoryInput - The input type for the analyzeCustomerPaymentHistory function.
 * - AnalyzeCustomerPaymentHistoryOutput - The return type for the analyzeCustomerPaymentHistory function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const AnalyzeCustomerPaymentHistoryInputSchema = z.object({
  customerPaymentHistory: z
    .string()
    .describe(
      'A list of recent customer payment history, such as invoices, payments, and outstanding balances.'
    ),
});
export type AnalyzeCustomerPaymentHistoryInput = z.infer<typeof AnalyzeCustomerPaymentHistoryInputSchema>;

const AnalyzeCustomerPaymentHistoryOutputSchema = z.object({
  paymentBehavior: z
    .string()
    .describe(
      'The payment behavior of the customer (e.g., on-time, late, inconsistent).'
    ),
  potentialIssues: z
    .string()
    .describe(
      'Potential issues or concerns related to the customer payment history (e.g., frequent late payments, increasing outstanding balance).'
    ),
  suggestedActions: z
    .string()
    .describe(
      'Suggested actions for the sales representative based on the payment history analysis (e.g., contact customer, offer payment plan).'
    ),
});
export type AnalyzeCustomerPaymentHistoryOutput = z.infer<typeof AnalyzeCustomerPaymentHistoryOutputSchema>;

export async function analyzeCustomerPaymentHistory(
  input: AnalyzeCustomerPaymentHistoryInput
): Promise<AnalyzeCustomerPaymentHistoryOutput> {
  return analyzeCustomerPaymentHistoryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'customerPaymentHistoryPrompt',
  input: {
    schema: z.object({
      customerPaymentHistory: z
        .string()
        .describe(
          'A list of recent customer payment history, such as invoices, payments, and outstanding balances.'
        ),
    }),
  },
  output: {
    schema: z.object({
      paymentBehavior: z
        .string()
        .describe(
          'The payment behavior of the customer (e.g., on-time, late, inconsistent).'
        ),
      potentialIssues: z
        .string()
        .describe(
          'Potential issues or concerns related to the customer payment history (e.g., frequent late payments, increasing outstanding balance).'
        ),
      suggestedActions: z
        .string()
        .describe(
          'Suggested actions for the sales representative based on the payment history analysis (e.g., contact customer, offer payment plan).'
        ),
    }),
  },
  prompt: `You are an AI assistant that analyzes customer payment history.

  Analyze the following customer payment history:
  {{customerPaymentHistory}}

  Provide the payment behavior, potential issues, and suggested actions for the sales representative.
  `,
});

const analyzeCustomerPaymentHistoryFlow = ai.defineFlow<
  typeof AnalyzeCustomerPaymentHistoryInputSchema,
  typeof AnalyzeCustomerPaymentHistoryOutputSchema
>(
  {
    name: 'analyzeCustomerPaymentHistoryFlow',
    inputSchema: AnalyzeCustomerPaymentHistoryInputSchema,
    outputSchema: AnalyzeCustomerPaymentHistoryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
