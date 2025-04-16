import Link from 'next/link';
import {cn} from '@/lib/utils';

const MainNav = ({className, ...props}: React.HTMLAttributes<HTMLElement>) => {
  return (
    <nav className={cn('flex items-center space-x-4 lg:space-x-6', className)} {...props}>
      <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
        Dashboard
      </Link>
      <Link href="/team-profiles" className="text-sm font-medium transition-colors hover:text-primary">
        Team Profiles
      </Link>
      <Link href="/activity-log" className="text-sm font-medium transition-colors hover:text-primary">
        Activity Log
      </Link>
      <Link
        href="/sales-strategy-suggestion"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Sales Strategy
      </Link>
      <Link
        href="/customer-sentiment-analysis"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Customer Sentiment
      </Link>
    </nav>
  );
};

export {MainNav};
