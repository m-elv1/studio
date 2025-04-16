'use client';

import type {Metadata} from 'next';
import {Geist, Geist_Mono} from 'next/font/google';
import './globals.css';
import {Sidebar, SidebarContent, SidebarTrigger, SidebarProvider} from '@/components/ui/sidebar';
import Link from 'next/link';
import {useState} from 'react';
import {Button} from '@/components/ui/button';

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
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
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-900 text-white`}>
        <SidebarProvider>
          <div className="flex h-screen">
            {sidebarOpen ? (
              <Sidebar className="bg-gray-800 text-white w-64 flex-shrink-0">
                <SidebarTrigger onClick={toggleSidebar} />
                <SidebarContent>
                  <nav className="flex flex-col items-start space-y-2 p-4">
                    <Link href="/" className="text-sm font-medium transition-colors hover:text-primary data-[active=true]:text-primary text-gray-200" aria-current={'/' === '/' ? 'page' : undefined}>
                      Dashboard
                    </Link>
                    <Link href="/team-profiles" className="text-sm font-medium transition-colors hover:text-primary data-[active=true]:text-primary text-gray-200" aria-current={'/team-profiles' === '/team-profiles' ? 'page' : undefined}>
                      Team Profiles
                    </Link>
                    <Link href="/activity-log" className="text-sm font-medium transition-colors hover:text-primary data-[active=true]:text-primary text-gray-200" aria-current={'/activity-log' === '/activity-log' ? 'page' : undefined}>
                      Activity Log
                    </Link>
                    <Link
                      href="/sales-strategy-suggestion"
                      className="text-sm font-medium transition-colors hover:text-primary data-[active=true]:text-primary text-gray-200" aria-current={'/sales-strategy-suggestion' === '/sales-strategy-suggestion' ? 'page' : undefined}
                    >
                      Sales Strategy
                    </Link>
                    <Link
                      href="/customer-sentiment-analysis"
                      className="text-sm font-medium transition-colors hover:text-primary data-[active=true]:text-primary text-gray-200" aria-current={'/customer-sentiment-analysis' === '/customer-sentiment-analysis' ? 'page' : undefined}
                    >
                      Customer Sentiment
                    </Link>
                    <Link
                      href="/customer-payment-history-analysis"
                      className="text-sm font-medium transition-colors hover:text-primary data-[active=true]:text-primary text-gray-200" aria-current={'/customer-payment-history-analysis' === '/customer-payment-history-analysis' ? 'page' : undefined}
                    >
                      Customer Payment
                    </Link>
                     <Link
                      href="/customer-location-data"
                      className="text-sm font-medium transition-colors hover:text-primary data-[active=true]:text-primary text-gray-200" aria-current={'/customer-location-data' === '/customer-location-data' ? 'page' : undefined}
                    >
                      Customer Location
                    </Link>
                  </nav>
                </SidebarContent>
              </Sidebar>
            ) : (
              <Button onClick={toggleSidebar} className="bg-gray-700 text-white hover:bg-gray-600">
                Open
              </Button>
            )}
            <div className="flex-1 p-4">
              {children}
            </div>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
