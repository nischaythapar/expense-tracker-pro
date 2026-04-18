import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Expense Tracker Pro',
  description: 'Production-ready personal finance tracking',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-gray-900 min-h-screen`}>
        <main className="max-w-5xl mx-auto p-4 md:p-8">
          <header className="mb-8 border-b pb-4 flex justify-between items-end flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-black text-gray-900 tracking-tight">Finance Tracker</h1>
              <p className="text-gray-500 mt-1">Manage your spending securely.</p>
            </div>
            <div className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              App by Nischay Thapar
            </div>
          </header>
          {children}
        </main>
      </body>
    </html>
  );
}
