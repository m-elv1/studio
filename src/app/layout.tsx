'use client';

import type {Metadata} from 'next';
import {Geist, Geist_Mono} from 'next/font/google';
import './globals.css';
import {Sidebar, SidebarContent, SidebarTrigger, SidebarProvider} from '@/components/ui/sidebar';
import Link from 'next/link';
import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {usePathname} from 'next/navigation';
import {PanelLeft} from 'lucide-react';

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}>
        <SidebarProvider>
          <div className="flex h-screen">
            {!sidebarOpen ? (
               <Button onClick={toggleSidebar} className="bg-gray-700 text-white hover:bg-gray-600">
                <PanelLeft />
              </Button>
            ) : (
              <Sidebar className="bg-secondary text-foreground w-64 flex-shrink-0 border-r border-border">
                <SidebarTrigger onClick={toggleSidebar} />
                <SidebarContent>
                  <nav className="flex flex-col items-start space-y-2 p-4">
                    <Link href="/" className={`text-sm font-medium transition-colors hover:text-primary data-[active=true]:text-primary ${pathname === '/' ? 'text-primary' : 'text-black'}`} aria-current={'/' === '/' ? 'page' : undefined}>
                      Dashboard
                    </Link>
                    <Link href="/team-profiles" className={`text-sm font-medium transition-colors hover:text-primary data-[active=true]:text-primary ${pathname === '/team-profiles' ? 'text-primary' : 'text-black'}`} aria-current={'/team-profiles' === '/team-profiles' ? 'page' : undefined}>
                      Team Profiles
                    </Link>
                    <Link href="/activity-log" className={`text-sm font-medium transition-colors hover:text-primary data-[active=true]:text-primary ${pathname === '/activity-log' ? 'text-primary' : 'text-black'}`} aria-current={'/activity-log' === '/activity-log' ? 'page' : undefined}>
                      Activity Log
                    </Link>
                    <Link
                      href="/sales-strategy-suggestion"
                      className={`text-sm font-medium transition-colors hover:text-primary data-[active=true]:text-primary ${pathname === '/sales-strategy-suggestion' ? 'text-primary' : 'text-black'}`} aria-current={'/sales-strategy-suggestion' === '/sales-strategy-suggestion' ? 'page' : undefined}
                    >
                      Sales Strategy
                    </Link>
                    <Link
                      href="/customer-sentiment-analysis"
                      className={`text-sm font-medium transition-colors hover:text-primary data-[active=true]:text-primary ${pathname === '/customer-sentiment-analysis' ? 'text-primary' : 'text-black'}`} aria-current={'/customer-sentiment-analysis' === '/customer-sentiment-analysis' ? 'page' : undefined}
                    >
                      Customer Sentiment
                    </Link>
                    <Link
                      href="/customer-payment-history-analysis"
                      className={`text-sm font-medium transition-colors hover:text-primary data-[active=true]:text-primary ${pathname === '/customer-payment-history-analysis' ? 'text-primary' : 'text-black'}`} aria-current={'/customer-payment-history-analysis' === '/customer-payment-history-analysis' ? 'page' : undefined}
                    >
                      Customer Payment
                    </Link>
                     <Link
                      href="/customer-location-data"
                      className={`text-sm font-medium transition-colors hover:text-primary data-[active=true]:text-primary ${pathname === '/customer-location-data' ? 'text-primary' : 'text-black'}`} aria-current={'/customer-location-data' === '/customer-location-data' ? 'page' : undefined}
                    >
                      Customer Location
                    </Link>
                  </nav>
                </SidebarContent>
              </Sidebar>
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
