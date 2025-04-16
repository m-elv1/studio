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


  return (
    <html lang="en" className={roboto.className}>
      <body className="bg-gray-50 text-gray-900 antialiased">
        <div className="flex flex-col h-screen">
          {/* Header */}
          <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
            <div className="text-xl font-semibold">TradeFlow</div>
            <div>
              {formatTime(currentTime)} - {formatDate(currentTime)}
            </div>
          </header>

          <div className="flex flex-1">
            {/* Navigation Section */}
            <aside
              className={`bg-gray-100 border-r border-gray-200 w-64 px-4 py-6 transition-transform duration-300 ease-in-out ${
                isNavOpen ? 'translate-x-0' : '-translate-x-full'
              }`}
            >
              {/* Toggle Button */}
              <Button
                onClick={() => setIsNavOpen(!isNavOpen)}
                className="mb-4 p-2 bg-gray-300 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                {isNavOpen ? <><Minimize className="inline-block mr-2 h-4 w-4" /> Minimize Navigation</> : <><Maximize className="inline-block mr-2 h-4 w-4" />Maximize Navigation</>}
              </Button>

              {/* Navigation Links */}
              {isNavOpen && (
                <nav className="flex flex-col space-y-2">
                  <Link href="/" className={cn("block px-4 py-2 rounded hover:bg-gray-200", pathname === '/' ? 'font-semibold' : '')}>
                    <Home className="inline-block mr-2 h-4 w-4" /> Dashboard
                  </Link>
                  <Link href="/team-profiles" className={cn("block px-4 py-2 rounded hover:bg-gray-200", pathname === '/team-profiles' ? 'font-semibold' : '')}>
                    <User className="inline-block mr-2 h-4 w-4" /> Team Profiles
                  </Link>
                  <Link href="/activity-log" className={cn("block px-4 py-2 rounded hover:bg-gray-200", pathname === '/activity-log' ? 'font-semibold' : '')}>
                    <List className="inline-block mr-2 h-4 w-4" /> Activity Log
                  </Link>
                  <Link href="/sales-strategy-suggestion" className={cn("block px-4 py-2 rounded hover:bg-gray-200", pathname === '/sales-strategy-suggestion' ? 'font-semibold' : '')}>
                    <BarChart2 className="inline-block mr-2 h-4 w-4" /> Sales Strategy
                  </Link>
                  <Link href="/customer-sentiment-analysis" className={cn("block px-4 py-2 rounded hover:bg-gray-200", pathname === '/customer-sentiment-analysis' ? 'font-semibold' : '')}>
                    <MessageSquare className="inline-block mr-2 h-4 w-4" /> Customer Sentiment
                  </Link>
                  <Link href="/customer-payment-history-analysis" className={cn("block px-4 py-2 rounded hover:bg-gray-200", pathname === '/customer-payment-history-analysis' ? 'font-semibold' : '')}>
                    <CreditCard className="inline-block mr-2 h-4 w-4" /> Customer Payment
                  </Link>
                  <Link href="/customer-location-data" className={cn("block px-4 py-2 rounded hover:bg-gray-200", pathname === '/customer-location-data' ? 'font-semibold' : '')}>
                    <MapPin className="inline-block mr-2 h-4 w-4" /> Customer Location
                  </Link>
                </nav>
              )}
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 p-6">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
