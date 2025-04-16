'use client';

import {Calendar} from '@/components/ui/calendar';
import {getSalesActivities, SalesActivity, getAllSalesTeamMembers} from '@/services/sales-data';
import {Button} from '@/components/ui/button';
import {useState, useEffect} from 'react';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {cn} from '@/lib/utils';
import {format} from 'date-fns';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';

export function ActivityLog() {
  const [activities, setActivities] = useState<SalesActivity[]>([]);
  const [teamMemberId, setTeamMemberId] = useState<string | undefined>(undefined);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const activitiesData = await getSalesActivities(
        teamMemberId,
        startDate ? startDate.toISOString().split('T')[0] : undefined,
        endDate ? endDate.toISOString().split('T')[0] : undefined
      );
      setActivities(activitiesData);
    };
    loadData();
  }, [teamMemberId, startDate, endDate]);

  useEffect(() => {
    const loadTeamMembers = async () => {
      const teamMembersData = await getAllSalesTeamMembers();
      setTeamMembers(teamMembersData);
    };

    loadTeamMembers();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Sales Activity Log</h2>

      <div className="flex flex-wrap gap-4 mb-4">
        <Select onValueChange={setTeamMemberId}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Team Member"/>
          </SelectTrigger>
          <SelectContent>
            {teamMembers.map((member: any) => (
              <SelectItem key={member.id} value={member.id}>
                {member.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className={cn(
                'w-[180px] justify-start text-left font-normal',
                !startDate && 'text-muted-foreground'
              )}
            >
              {startDate ? format(startDate, 'yyyy-MM-dd') : <span>Pick start date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={startDate}
              onSelect={setStartDate}
              disabled={endDate ? {after: endDate} : undefined}
            />
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className={cn(
                'w-[180px] justify-start text-left font-normal',
                !endDate && 'text-muted-foreground'
              )}
            >
              {endDate ? format(endDate, 'yyyy-MM-dd') : <span>Pick end date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={endDate}
              onSelect={setEndDate}
              disabled={startDate ? {before: startDate} : undefined}
            />
          </PopoverContent>
        </Popover>
      </div>

      <ul>
        {activities.map((activity) => (
          <li key={activity.id} className="mb-2 p-4 border rounded-md bg-white shadow-sm">
            <p className="text-gray-700">
              <strong>Date:</strong> {activity.date}
            </p>
            <p className="text-gray-700">
              <strong>Type:</strong> {activity.type}
            </p>
            <p className="text-gray-700">
              <strong>Description:</strong> {activity.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
