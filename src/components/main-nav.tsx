import Link from 'next/link';
import {cn} from '@/lib/utils';

const MainNav = ({className, pathname, ...props}: {className?: string, pathname: string} & React.HTMLAttributes<HTMLElement>) => {
  return (
    <nav className={cn('flex flex-col items-start space-y-2 p-4 bg-secondary rounded-md shadow-sm', className)} {...props}>
      <Link href="/" className="text-sm font-medium transition-colors hover:text-primary data-[active=true]:text-primary" aria-current={pathname === '/' ? 'page' : undefined}>
        Dashboard
      </Link>
      <Link href="/team-profiles" className="text-sm font-medium transition-colors hover:text-primary data-[active=true]:text-primary" aria-current={pathname === '/team-profiles' ? 'page' : undefined}>
        Team Profiles
      </Link>
      <Link href="/activity-log" className="text-sm font-medium transition-colors hover:text-primary data-[active=true]:text-primary" aria-current={pathname === '/activity-log' ? 'page' : undefined}>
        Activity Log
      </Link>
      <Link
        href="/sales-strategy-suggestion"
        className="text-sm font-medium transition-colors hover:text-primary data-[active=true]:text-primary" aria-current={pathname === '/sales-strategy-suggestion' ? 'page' : undefined}
      >
        Sales Strategy
      </Link>
      <Link
        href="/customer-sentiment-analysis"
        className="text-sm font-medium transition-colors hover:text-primary data-[active=true]:text-primary" aria-current={pathname === '/customer-sentiment-analysis' ? 'page' : undefined}
      >
        Customer Sentiment
      </Link>
      <Link
        href="/customer-payment-history-analysis"
        className="text-sm font-medium transition-colors hover:text-primary data-[active=true]:text-primary" aria-current={pathname === '/customer-payment-history-analysis' ? 'page' : undefined}
      >
        Customer Payment
      </Link>
      <Link
        href="/customer-location-data"
        className="text-sm font-medium transition-colors hover:text-primary data-[active=true]:text-primary" aria-current={pathname === '/customer-location-data' ? 'page' : undefined}
      >
        Customer Location
      </Link>
    </nav>
  );
};

export {MainNav};
