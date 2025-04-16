'use client';

import type {Metadata} from 'next';
import {Geist, Geist_Mono} from 'next/font/google';
import './globals.css';
import {Sidebar, SidebarContent, SidebarTrigger, SidebarProvider} from '@/components/ui/sidebar';
import Link from 'next/link';
import {useState, useEffect} from 'react';
import {Button} from '@/components/ui/button';
import {usePathname} from 'next/navigation';
import {PanelLeft, Home, User, List, BarChart2, MessageSquare, CreditCard, MapPin} from 'lucide-react';
import {cn} from '@/lib/utils';

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
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const formatDate = (date: Date) => {
        const options: Intl.DateTimeFormatOptions = {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        };
        return date.toLocaleDateString('en-US', options);
    };

    const formatTime = (date: Date) => {
        let hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        return `${hours}:${minutes} ${ampm}`;
    };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}>
        <SidebarProvider>
          <div className="flex h-screen">
            {!sidebarOpen ? (
               <Button onClick={() => setSidebarOpen(true)} className="bg-gray-700 text-white hover:bg-gray-600">
                <PanelLeft />
              </Button>
            ) : (
              <Sidebar className="bg-gray-800 text-white w-64 flex-shrink-0 border-r border-gray-700">
                <SidebarTrigger onClick={() => setSidebarOpen(false)} />
                <SidebarContent>
                   <div className="flex flex-col items-start space-y-2 p-4">
                        <div className="text-2xl font-bold mb-2">
                            {formatTime(currentTime)}
                        </div>
                        <div className="text-sm">
                            {formatDate(currentTime)}
                        </div>
                        <Separator className="my-2 bg-gray-700" />
                    </div>
                  <nav className="flex flex-col items-start space-y-2 p-4">
                    <Link href="/" className={cn("flex items-center space-x-2 py-2 hover:text-gray-300", pathname === '/' ? 'text-blue-500' : 'text-white')}>
                      <Home className="h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                    <Link href="/team-profiles" className={cn("flex items-center space-x-2 py-2 hover:text-gray-300", pathname === '/team-profiles' ? 'text-blue-500' : 'text-white')}>
                      <User className="h-4 w-4" />
                      <span>Team Profiles</span>
                    </Link>
                    <Link href="/activity-log" className={cn("flex items-center space-x-2 py-2 hover:text-gray-300", pathname === '/activity-log' ? 'text-blue-500' : 'text-white')}>
                      <List className="h-4 w-4" />
                      <span>Activity Log</span>
                    </Link>
                    <Link
                      href="/sales-strategy-suggestion"
                      className={cn("flex items-center space-x-2 py-2 hover:text-gray-300", pathname === '/sales-strategy-suggestion' ? 'text-blue-500' : 'text-white')}
                    >
                      <BarChart2 className="h-4 w-4" />
                      <span>Sales Strategy</span>
                    </Link>
                    <Link
                      href="/customer-sentiment-analysis"
                      className={cn("flex items-center space-x-2 py-2 hover:text-gray-300", pathname === '/customer-sentiment-analysis' ? 'text-blue-500' : 'text-white')}
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span>Customer Sentiment</span>
                    </Link>
                    <Link
                      href="/customer-payment-history-analysis"
                      className={cn("flex items-center space-x-2 py-2 hover:text-gray-300", pathname === '/customer-payment-history-analysis' ? 'text-blue-500' : 'text-white')}
                    >
                      <CreditCard className="h-4 w-4" />
                      <span>Customer Payment</span>
                    </Link>
                     <Link
                      href="/customer-location-data"
                      className={cn("flex items-center space-x-2 py-2 hover:text-gray-300", pathname === '/customer-location-data' ? 'text-blue-500' : 'text-white')}
                    >
                      <MapPin className="h-4 w-4" />
                      <span>Customer Location</span>
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

function Separator({ className }: { className?: string }) {
    return (
        <div className={`border-b border-gray-700 w-full ${className}`} />
    );
}
