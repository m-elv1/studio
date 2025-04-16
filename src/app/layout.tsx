'use client'

import type {Metadata} from 'next';
import {Geist, Geist_Mono} from 'next/font/google';
import './globals.css';
import {MainNav} from '@/components/main-nav';
import {Sidebar, SidebarContent, SidebarTrigger, SidebarProvider} from '@/components/ui/sidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// export const metadata: Metadata = {
//   title: 'TradeFlow',
//   description: 'Sales Team Management Application',
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname() || '/';
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SidebarProvider>
          <Sidebar>
            <SidebarTrigger />
            <SidebarContent>
              <nav className="flex flex-col items-start space-y-2 p-4">
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
            </SidebarContent>
          </Sidebar>
          <div className="p-4">{children}</div>
        </SidebarProvider>
      </body>
    </html>
  );
}
