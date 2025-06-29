'use client';

import type {Metadata} from 'next';
import {Roboto} from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import {useState, useEffect} from 'react';
import {Button} from '@/components/ui/button';
import {usePathname} from 'next/navigation';
import {PanelLeft, Home, User, List, BarChart2, MessageSquare, CreditCard, MapPin, Maximize, Minimize} from 'lucide-react';
import {cn} from '@/lib/utils';

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isNavOpen, setIsNavOpen] = useState(true);
  const pathname = usePathname();
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [isMounted, setIsMounted] = useState(false); // Track client-side mount

  useEffect(() => {
    setIsMounted(true); // Component has mounted
    setCurrentTime(new Date());

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


  return (
    <html lang="en" className={`${roboto.className} dark`}>
      <body className="bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 antialiased">
        <div className="flex flex-col h-screen">
          <header className="bg-white dark:bg-gray-800 shadow-md dark:shadow-lg py-4 px-6 flex justify-between items-center z-10"> {/* Added z-index */} 
            <div className="text-xl font-semibold">TradeFlow</div>
            <div className="text-gray-600 dark:text-gray-300">
              {isMounted && currentTime ? (
                <>{formatTime(currentTime)} - {formatDate(currentTime)}</>
              ) : (
                <span>&nbsp;</span> 
              )}
            </div>
          </header>

          <div className="flex flex-1 relative"> {/* Added relative positioning */} 
            {/* Navigation Section - Now absolutely positioned for sliding */} 
            <aside
              className={cn(
                'absolute top-0 left-0 h-full bg-gray-100 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 w-64 px-4 py-6 transition-transform duration-300 ease-in-out z-20', /* Added z-index */
                isNavOpen ? 'translate-x-0' : '-translate-x-full'
              )}
            >
              {/* Moved the Button outside of aside for persistent visibility */}
              {/* Navigation Links */} 
              <nav className="flex flex-col space-y-2 mt-12"> {/* Added margin-top to make space for button */} 
                <Link href="/" className={cn("block px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700", pathname === '/' ? 'font-semibold bg-gray-200 dark:bg-gray-700' : '')}>
                  <Home className="inline-block mr-2 h-4 w-4" /> Dashboard
                </Link>
                <Link href="/team-profiles" className={cn("block px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700", pathname === '/team-profiles' ? 'font-semibold bg-gray-200 dark:bg-gray-700' : '')}>
                  <User className="inline-block mr-2 h-4 w-4" /> Team Profiles
                </Link>
                <Link href="/activity-log" className={cn("block px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700", pathname === '/activity-log' ? 'font-semibold bg-gray-200 dark:bg-gray-700' : '')}>
                  <List className="inline-block mr-2 h-4 w-4" /> Activity Log
                </Link>
                <Link href="/sales-strategy-suggestion" className={cn("block px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700", pathname === '/sales-strategy-suggestion' ? 'font-semibold bg-gray-200 dark:bg-gray-700' : '')}>
                  <BarChart2 className="inline-block mr-2 h-4 w-4" /> Sales Strategy
                </Link>
                <Link href="/customer-sentiment-analysis" className={cn("block px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700", pathname === '/customer-sentiment-analysis' ? 'font-semibold bg-gray-200 dark:bg-gray-700' : '')}>
                  <MessageSquare className="inline-block mr-2 h-4 w-4" /> Customer Sentiment
                </Link>
                <Link href="/customer-payment-history-analysis" className={cn("block px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700", pathname === '/customer-payment-history-analysis' ? 'font-semibold bg-gray-200 dark:bg-gray-700' : '')}>
                  <CreditCard className="inline-block mr-2 h-4 w-4" /> Customer Payment
                </Link>
                <Link href="/customer-location-data" className={cn("block px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700", pathname === '/customer-location-data' ? 'font-semibold bg-gray-200 dark:bg-gray-700' : '')}>
                  <MapPin className="inline-block mr-2 h-4 w-4" /> Customer Location
                </Link>
              </nav>
            </aside>

            {/* Toggle Button - Positioned absolutely to overlay content near the sidebar edge */} 
            <Button
              onClick={() => setIsNavOpen(!isNavOpen)}
              className={cn(
                'absolute top-4 left-4 p-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-400 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400 z-30', /* Higher z-index */
                'transition-all duration-300 ease-in-out', /* Smooth transition for button position */
                isNavOpen ? '' : '' /* Adjust left position based on nav state */
              )}
              style={{ width: '40px', height: '40px' }} /* Explicit width */
            >
              {isNavOpen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
            </Button>

            {/* Main Content Area - Adjusted margin to prevent overlap */}
            <main className={cn(
              'flex-1 p-6 overflow-auto transition-all duration-300 ease-in-out', /* Smooth transition for margin */
              isNavOpen ? 'ml-64' : 'ml-0' /* Adjust margin based on nav state */
              )}>
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
