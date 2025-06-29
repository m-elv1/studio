import {ActivityLog} from '@/components/activity-log';

export default function ActivityLogPage() {
  return (
    <main className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-4">Activity Log</h1>
      <ActivityLog />
    </main>
  );
}
