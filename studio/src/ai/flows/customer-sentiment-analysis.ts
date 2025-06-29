// Use server directive is needed to import this in a React component.
'use server';

/**
 * @fileOverview An AI agent that analyzes the sentiment of customer interactions.
 *
 * - analyzeCustomerSentiment - A function that handles the sentiment analysis process.
 * - AnalyzeCustomerSentimentInput - The input type for the analyzeCustomerSentiment function.
 * - AnalyzeCustomerSentimentOutput - The return type for the analyzeCustomerSentiment function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const AnalyzeCustomerSentimentInputSchema = z.object({
  customerInteractions: z
    .string()
    .describe(
      'A list of recent customer interactions, such as emails, chat logs, or call transcripts.'
    ),
});
export type AnalyzeCustomerSentimentInput = z.infer<typeof AnalyzeCustomerSentimentInputSchema>;

const AnalyzeCustomerSentimentOutputSchema = z.object({
  overallSentiment: z
    .string()
    .describe(
      'The overall sentiment of the customer interactions (e.g., positive, negative, neutral).'
    ),
  keyPhrases: z
    .string()
    .describe(
      'Important words or phrases extracted from the customer interactions that indicate the sentiment.'
    ),
  suggestedActions: z
    .string()
    .describe(
      'Suggested actions for the sales representative based on the sentiment analysis (e.g., follow up with customer, address concerns).'
    ),
});
export type AnalyzeCustomerSentimentOutput = z.infer<typeof AnalyzeCustomerSentimentOutputSchema>;

export async function analyzeCustomerSentiment(
  input: AnalyzeCustomerSentimentInput
): Promise<AnalyzeCustomerSentimentOutput> {
  return analyzeCustomerSentimentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'customerSentimentPrompt',
  input: {
    schema: z.object({
      customerInteractions: z
        .string()
        .describe(
          'A list of recent customer interactions, such as emails, chat logs, or call transcripts.'
        ),
    }),
  },
  output: {
    schema: z.object({
      overallSentiment: z
        .string()
        .describe(
          'The overall sentiment of the customer interactions (e.g., positive, negative, neutral).'
        ),
      keyPhrases: z
        .string()
        .describe(
          'Important words or phrases extracted from the customer interactions that indicate the sentiment.'
        ),
      suggestedActions: z
        .string()
        .describe(
          'Suggested actions for the sales representative based on the sentiment analysis (e.g., follow up with customer, address concerns).'
        ),
    }),
  },
  prompt: `You are an AI assistant that analyzes customer sentiment from recent interactions.

  Analyze the following customer interactions:
  {{customerInteractions}}

  Provide the overall sentiment, key phrases that indicate the sentiment, and suggested actions for the sales representative.
  `,
});

const analyzeCustomerSentimentFlow = ai.defineFlow<
  typeof AnalyzeCustomerSentimentInputSchema,
  typeof AnalyzeCustomerSentimentOutputSchema
>(
  {
    name: 'analyzeCustomerSentimentFlow',
    inputSchema: AnalyzeCustomerSentimentInputSchema,
    outputSchema: AnalyzeCustomerSentimentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
