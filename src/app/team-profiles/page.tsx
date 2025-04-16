import {TeamProfiles} from '@/components/team-profiles';

export default function TeamProfilesPage() {
  return (
    <main className="flex min-h-screen flex-col items-start justify-start p-12">
      <h1 className="text-4xl font-bold mb-8">Team Profiles</h1>
      <TeamProfiles />
    </main>
  );
}

