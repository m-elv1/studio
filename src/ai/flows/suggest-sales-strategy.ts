// The AI analyzes sales data and suggests personalized sales strategies for each team member.
'use server';

import {ai} from '@/ai/ai-instance';
import {SalesTeamMember, getAllSalesTeamMembers, getSalesActivities} from '@/services/sales-data';
import {z} from 'genkit';

const SuggestSalesStrategyInputSchema = z.object({
  teamMemberId: z.string().describe('The ID of the team member to generate a sales strategy for.'),
  startDate: z.string().optional().describe('The start date to filter activities by. Format: YYYY-MM-DD'),
  endDate: z.string().optional().describe('The end date to filter activities by. Format: YYYY-MM-DD'),
});
export type SuggestSalesStrategyInput = z.infer<typeof SuggestSalesStrategyInputSchema>;

const SuggestSalesStrategyOutputSchema = z.object({
  strategy: z.string().describe('A personalized sales strategy for the team member.'),
});
export type SuggestSalesStrategyOutput = z.infer<typeof SuggestSalesStrategyOutputSchema>;

export async function suggestSalesStrategy(input: SuggestSalesStrategyInput): Promise<SuggestSalesStrategyOutput> {
  return suggestSalesStrategyFlow(input);
}

const suggestSalesStrategyPrompt = ai.definePrompt({
  name: 'suggestSalesStrategyPrompt',
  input: {
    schema: z.object({
      teamMemberId: z.string().describe('The ID of the team member to generate a sales strategy for.'),
      startDate: z.string().optional().describe('The start date to filter activities by. Format: YYYY-MM-DD'),
      endDate: z.string().optional().describe('The end date to filter activities by. Format: YYYY-MM-DD'),
      teamMember: z.object({
        id: z.string(),
        name: z.string(),
        email: z.string(),
        phone: z.string(),
        bio: z.string(),
        performance: z.object({
          totalSales: z.number(),
          averageDealSize: z.number(),
          conversionRate: z.number(),
        }),
      }).describe('Sales team member profile information and performance stats.'),
      recentActivities: z.string().describe('A list of recent sales activities for the team member.'),
    }),
  },
  output: {
    schema: z.object({
      strategy: z.string().describe('A personalized sales strategy for the team member.'),
    }),
  },
  prompt: `You are an AI sales strategy assistant. Analyze the sales data and activities for a sales team member and suggest a personalized sales strategy. 

  Consider the following information about the team member:
  Team Member ID: {{{teamMemberId}}}
  Name: {{{teamMember.name}}}
  Email: {{{teamMember.email}}}
  Phone: {{{teamMember.phone}}}
  Bio: {{{teamMember.bio}}}
  Total Sales: {{{teamMember.performance.totalSales}}}
  Average Deal Size: {{{teamMember.performance.averageDealSize}}}
  Conversion Rate: {{{teamMember.performance.conversionRate}}}

  Analyze the recent sales activities:
  {{{recentActivities}}}

  Based on this information, provide a concise and actionable sales strategy for this team member:
  `,
});

const suggestSalesStrategyFlow = ai.defineFlow<
  typeof SuggestSalesStrategyInputSchema,
  typeof SuggestSalesStrategyOutputSchema
>({
  name: 'suggestSalesStrategyFlow',
  inputSchema: SuggestSalesStrategyInputSchema,
  outputSchema: SuggestSalesStrategyOutputSchema,
}, async (input) => {
  const teamMember = await getAllSalesTeamMembers();
  const targetMember = teamMember.find(member => member.id === input.teamMemberId);

  if (!targetMember) {
    throw new Error(`Team member with ID ${input.teamMemberId} not found.`);
  }

  const activities = await getSalesActivities(input.teamMemberId, input.startDate, input.endDate);
  const recentActivities = activities.map(activity => `${activity.date}: ${activity.type} - ${activity.description} (Customer: ${activity.customer})`).join('\n');

  const {output} = await suggestSalesStrategyPrompt({
    teamMemberId: input.teamMemberId,
    startDate: input.startDate,
    endDate: input.endDate,
    teamMember: targetMember,
    recentActivities: recentActivities,
  });
  return output!;
});

