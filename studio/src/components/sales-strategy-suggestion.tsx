'use client';

import {Button} from '@/components/ui/button';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {useState, useEffect} from 'react';
import {getAllSalesTeamMembers, SalesTeamMember} from '@/services/sales-data';
import {suggestSalesStrategy} from '@/ai/flows/suggest-sales-strategy';

export function SalesStrategySuggestion() {
  const [teamMemberId, setTeamMemberId] = useState<string | undefined>(undefined);
  const [teamMembers, setTeamMembers] = useState<SalesTeamMember[]>([]);
  const [salesStrategy, setSalesStrategy] = useState<string | undefined>(undefined);

  useEffect(() => {
    const loadTeamMembers = async () => {
      const teamMembersData = await getAllSalesTeamMembers();
      setTeamMembers(teamMembersData);
    };

    loadTeamMembers();
  }, []);

  const handleStrategySuggestion = async () => {
    if (!teamMemberId) {
      alert('Please select a team member.');
      return;
    }

    try {
      const strategy = await suggestSalesStrategy({teamMemberId});
      setSalesStrategy(strategy.strategy);
    } catch (error: any) {
      console.error('Error generating sales strategy:', error);
      alert(`Failed to generate sales strategy: ${error.message}`);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Sales Strategy Suggestion</h2>

      <div className="mb-4">
        <Select onValueChange={setTeamMemberId}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Team Member"/>
          </SelectTrigger>
          <SelectContent>
            {teamMembers.map((member) => (
              <SelectItem key={member.id} value={member.id}>
                {member.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button onClick={handleStrategySuggestion} className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700">Generate Sales Strategy</Button>

      {salesStrategy && (
        <div className="mt-4 p-4 border rounded-md bg-white shadow-sm">
          <h3 className="text-lg font-semibold mb-2 text-gray-700">Suggested Sales Strategy:</h3>
          <p className="text-gray-600">{salesStrategy}</p>
        </div>
      )}
    </div>
  );
}
