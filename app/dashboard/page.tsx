import { redirect } from 'next/navigation';
import { getSession } from '@/lib/session';
import { getUserById } from '@/lib/auth';
import { getMonitorsByUserId } from '@/lib/monitor';
import Link from 'next/link';
import DashboardClient from './DashboardClient';

export default async function DashboardPage() {
  const session = await getSession();
  
  if (!session) {
    redirect('/login');
  }

  const user = getUserById(session.userId);
  if (!user) {
    redirect('/login');
  }

  const monitors = getMonitorsByUserId(user.id);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">📊</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  StatusPing
                </span>
              </Link>
              <span className="text-gray-300">|</span>
              <span className="text-gray-700">{user.org_name}</span>
            </div>
            <div className="flex items-center gap-4">
              <Link 
                href={`/status/${user.org_slug}`}
                target="_blank"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                View Status Page →
              </Link>
              <form action="/api/auth/logout" method="POST">
                <button 
                  type="submit"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Logout
                </button>
              </form>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Monitors</h1>
              <p className="text-gray-600 mt-1">
                {user.plan === 'free' ? `${monitors.length}/3 monitors used` : `${monitors.length} monitors`}
              </p>
            </div>
          </div>
        </div>

        <DashboardClient 
          initialMonitors={monitors} 
          userId={user.id}
          plan={user.plan}
        />
      </main>
    </div>
  );
}
