/**
 * Represents a sales activity.
 */
export interface SalesActivity {
  /**
   * The ID of the sales activity.
   */
  id: string;
  /**
   * The ID of the team member associated with the activity.
   */
  teamMemberId: string;
  /**
   * The type of activity (e.g., call, meeting, email).
   */
  type: string;
  /**
   * The date of the activity.
   */
  date: string;
  /**
   * A brief description of the activity.
   */
  description: string;
  /**
   * Associated customer name
   */
  customer: string;
}

/**
 * Represents key sales performance metrics.
 */
export interface SalesMetrics {
  /**
   * The total number of sales.
   */
  totalSales: number;
  /**
   * The average deal size.
   */
  averageDealSize: number;
  /**
   * The conversion rate.
   */
  conversionRate: number;
}

/**
 * Represents a sales team member with their profile information and performance stats.
 */
export interface SalesTeamMember {
  /**
   * The ID of the team member.
   */
  id: string;
  /**
   * The name of the team member.
   */
  name: string;
  /**
   * The email address of the team member.
   */
  email: string;
  /**
   * The phone number of the team member.
   */
  phone: string;
  /**
   * A brief biography of the team member.
   */
  bio: string;
  /**
   * Performance statistics for the team member.
   */
  performance: SalesMetrics;
}

/**
 * Asynchronously retrieves sales performance metrics.
 *
 * @returns A promise that resolves to a SalesMetrics object.
 */
export async function getSalesMetrics(): Promise<SalesMetrics> {
  // TODO: Implement this by calling an API.
  return {
    totalSales: 100,
    averageDealSize: 5000,
    conversionRate: 0.1,
  };
}

/**
 * Asynchronously retrieves a list of sales activities.
 *
 * @param teamMemberId Optional ID of the team member to filter activities by.
 * @param startDate Optional start date to filter activities by.
 * @param endDate Optional end date to filter activities by.
 * @returns A promise that resolves to an array of SalesActivity objects.
 */
export async function getSalesActivities(
  teamMemberId?: string,
  startDate?: string,
  endDate?: string
): Promise<SalesActivity[]> {
  // TODO: Implement this by calling an API.
  return [
    {
      id: '1',
      teamMemberId: '101',
      type: 'call',
      date: '2024-01-20',
      description: 'Initial call with potential client.',
      customer: 'Acme Corp.',
    },
    {
      id: '2',
      teamMemberId: '102',
      type: 'meeting',
      date: '2024-01-22',
      description: 'Follow-up meeting to discuss proposal.',
      customer: 'Beta Industries',
    },
  ];
}

/**
 * Asynchronously retrieves a sales team member profile.
 *
 * @param teamMemberId The ID of the team member to retrieve.
 * @returns A promise that resolves to a SalesTeamMember object.
 */
export async function getSalesTeamMember(teamMemberId: string): Promise<SalesTeamMember> {
  // TODO: Implement this by calling an API.
  return {
    id: teamMemberId,
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '555-123-4567',
    bio: 'Experienced sales professional.',
    performance: {
      totalSales: 50,
      averageDealSize: 7500,
      conversionRate: 0.15,
    },
  };
}

/**
 * Asynchronously retrieves a list of all sales team members.
 *
 * @returns A promise that resolves to an array of SalesTeamMember objects.
 */
export async function getAllSalesTeamMembers(): Promise<SalesTeamMember[]> {
  // TODO: Implement this by calling an API.
  return [
    {
      id: '101',
      name: 'Alice Smith',
      email: 'alice.smith@example.com',
      phone: '555-987-6543',
      bio: 'Dedicated sales representative with a proven track record.',
      performance: {
        totalSales: 60,
        averageDealSize: 6000,
        conversionRate: 0.12,
      },
    },
    {
      id: '102',
      name: 'Bob Johnson',
      email: 'bob.johnson@example.com',
      phone: '555-246-8013',
      bio: 'Results-oriented sales manager with extensive industry knowledge.',
      performance: {
        totalSales: 45,
        averageDealSize: 9000,
        conversionRate: 0.18,
      },
    },
  ];
}
