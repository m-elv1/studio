import {ActivityLog} from '@/components/activity-log';

export default function ActivityLogPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-12">
      <h1 className="text-4xl font-bold mb-8">Activity Log</h1>
      <ActivityLog />
    </main>
  );
}
