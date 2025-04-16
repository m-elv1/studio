import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {getAllSalesTeamMembers, SalesTeamMember} from '@/services/sales-data';
import {useEffect, useState} from 'react';

export function TeamProfiles() {
  const [teamMembers, setTeamMembers] = useState<SalesTeamMember[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const teamMembersData = await getAllSalesTeamMembers();
      setTeamMembers(teamMembersData);
    };

    loadData();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Sales Team Profiles</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {teamMembers.map((member) => (
          <Card key={member.id}>
            <CardHeader>
              <CardTitle>{member.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Email: {member.email}</p>
              <p>Phone: {member.phone}</p>
              <p>Bio: {member.bio}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
