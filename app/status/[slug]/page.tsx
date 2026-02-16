import { getUserBySlug } from '@/lib/auth';
import { getMonitorsByUserId, getIncidents } from '@/lib/monitor';
import { notFound } from 'next/navigation';

interface StatusPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function StatusPage({ params }: StatusPageProps) {
  const { slug } = await params;
  const user = getUserBySlug(slug);

  if (!user) {
    notFound();
  }

  const monitors = getMonitorsByUserId(user.id);
  
  // Get all incidents for all monitors
  const allIncidents = monitors.flatMap((monitor) => {
    const incidents = getIncidents(monitor.id);
    return incidents.map((incident: any) => ({
      ...incident,
      monitorName: monitor.name,
    }));
  });

  // Sort by most recent
  allIncidents.sort((a: any, b: any) => 
    new Date(b.started_at).getTime() - new Date(a.started_at).getTime()
  );

  const allOperational = monitors.every((m) => m.status === 'up');
  const hasOngoingIncident = allIncidents.some((i: any) => i.status === 'ongoing');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">{user.org_name} Status</h1>
          <p className="text-gray-600 mt-1">System status and incident history</p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overall Status */}
        <div className={`rounded-xl p-8 mb-8 ${
          allOperational
            ? 'bg-green-50 border-2 border-green-200'
            : 'bg-red-50 border-2 border-red-200'
        }`}>
          <div className="flex items-center gap-4">
            <div className="text-5xl">
              {allOperational ? '✅' : '❌'}
            </div>
            <div>
              <h2 className={`text-2xl font-bold ${
                allOperational ? 'text-green-900' : 'text-red-900'
              }`}>
                {allOperational ? 'All Systems Operational' : 'System Issues Detected'}
              </h2>
              <p className={`mt-1 ${
                allOperational ? 'text-green-700' : 'text-red-700'
              }`}>
                {allOperational
                  ? 'All monitored services are running normally'
                  : hasOngoingIncident
                  ? 'We are currently experiencing issues with some services'
                  : 'Some services recently experienced issues'}
              </p>
            </div>
          </div>
        </div>

        {/* Services Status */}
        <div className="bg-white rounded-xl border border-gray-200 p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Services</h2>
          <div className="space-y-4">
            {monitors.map((monitor) => (
              <div
                key={monitor.id}
                className="flex items-center justify-between py-4 border-b last:border-b-0"
              >
                <div className="flex items-center gap-4">
                  <div className="text-2xl">
                    {monitor.status === 'up' ? '✅' : monitor.status === 'down' ? '❌' : '⏳'}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{monitor.name}</h3>
                    <p className="text-sm text-gray-500">{monitor.url}</p>
                  </div>
                </div>
                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    monitor.status === 'up'
                      ? 'bg-green-100 text-green-800'
                      : monitor.status === 'down'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {monitor.status === 'up' ? 'Operational' : monitor.status === 'down' ? 'Down' : 'Unknown'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Incident History */}
        {allIncidents.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Incident History</h2>
            <div className="space-y-6">
              {allIncidents.slice(0, 10).map((incident: any) => (
                <div key={incident.id} className="border-l-4 border-gray-300 pl-6">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{incident.title}</h3>
                      <p className="text-sm text-gray-500">
                        {incident.monitorName} • {new Date(incident.started_at).toLocaleString()}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        incident.status === 'ongoing'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {incident.status === 'ongoing' ? 'Ongoing' : 'Resolved'}
                    </span>
                  </div>

                  {incident.ai_report && (
                    <div className="mt-4 prose prose-sm max-w-none">
                      <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700 whitespace-pre-wrap">
                        {incident.ai_report}
                      </div>
                    </div>
                  )}

                  {incident.resolved_at && (
                    <p className="text-sm text-green-600 mt-2">
                      ✓ Resolved at {new Date(incident.resolved_at).toLocaleString()}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {allIncidents.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
            <div className="text-5xl mb-4">🎉</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Incidents</h3>
            <p className="text-gray-600">
              No incidents have been reported. All systems running smoothly!
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16 py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500">
          Powered by{' '}
          <a href="/" className="text-purple-600 font-semibold hover:text-purple-700">
            StatusPNG
          </a>
        </div>
      </footer>
    </div>
  );
}
