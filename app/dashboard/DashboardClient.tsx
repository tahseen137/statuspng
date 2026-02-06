'use client';

import { useState } from 'react';
import { type Monitor } from '@/lib/db';

interface DashboardClientProps {
  initialMonitors: Monitor[];
  userId: number;
  plan: string;
}

export default function DashboardClient({ initialMonitors, userId, plan }: DashboardClientProps) {
  const [monitors, setMonitors] = useState<Monitor[]>(initialMonitors);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    checkInterval: 60,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const canAddMonitor = plan !== 'free' || monitors.length < 3;

  const handleAddMonitor = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/monitors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to add monitor');
      }

      // Refresh monitors
      const monitorsRes = await fetch('/api/monitors');
      const monitorsData = await monitorsRes.json();
      setMonitors(monitorsData.monitors);

      // Reset form
      setFormData({ name: '', url: '', checkInterval: 60 });
      setShowAddModal(false);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMonitor = async (id: number) => {
    if (!confirm('Are you sure you want to delete this monitor?')) {
      return;
    }

    try {
      const res = await fetch(`/api/monitors/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Failed to delete monitor');
      }

      // Refresh monitors
      const monitorsRes = await fetch('/api/monitors');
      const monitorsData = await monitorsRes.json();
      setMonitors(monitorsData.monitors);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleCheckNow = async (id: number) => {
    try {
      const res = await fetch('/api/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ monitorId: id }),
      });

      if (!res.ok) {
        throw new Error('Failed to check monitor');
      }

      // Refresh monitors
      const monitorsRes = await fetch('/api/monitors');
      const monitorsData = await monitorsRes.json();
      setMonitors(monitorsData.monitors);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'up':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'down':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusEmoji = (status: string) => {
    switch (status) {
      case 'up':
        return '✅';
      case 'down':
        return '❌';
      default:
        return '⏳';
    }
  };

  return (
    <>
      {/* Add Monitor Button */}
      <div className="mb-6">
        <button
          onClick={() => setShowAddModal(true)}
          disabled={!canAddMonitor}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {canAddMonitor ? '+ Add Monitor' : 'Upgrade to add more monitors'}
        </button>
      </div>

      {/* Monitors Grid */}
      {monitors.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
          <div className="text-6xl mb-4">📊</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No monitors yet</h3>
          <p className="text-gray-600 mb-6">Add your first monitor to start tracking uptime</p>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition"
          >
            Add Your First Monitor
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {monitors.map((monitor) => (
            <div
              key={monitor.id}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-3xl mb-2">{getStatusEmoji(monitor.status)}</div>
                  <h3 className="text-lg font-semibold text-gray-900">{monitor.name}</h3>
                  <p className="text-sm text-gray-500 truncate">{monitor.url}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(monitor.status)}`}
                >
                  {monitor.status}
                </span>
              </div>

              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div>Check interval: {monitor.check_interval}s</div>
                {monitor.last_checked && (
                  <div>Last checked: {new Date(monitor.last_checked).toLocaleString()}</div>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleCheckNow(monitor.id)}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition"
                >
                  Check Now
                </button>
                <button
                  onClick={() => handleDeleteMonitor(monitor.id)}
                  className="px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Monitor Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold mb-4">Add New Monitor</h2>

            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleAddMonitor} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Monitor Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  placeholder="My API"
                />
              </div>

              <div>
                <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
                  URL to Monitor
                </label>
                <input
                  id="url"
                  type="url"
                  required
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  placeholder="https://api.example.com/health"
                />
              </div>

              <div>
                <label htmlFor="checkInterval" className="block text-sm font-medium text-gray-700 mb-2">
                  Check Interval (seconds)
                </label>
                <select
                  id="checkInterval"
                  value={formData.checkInterval}
                  onChange={(e) => setFormData({ ...formData, checkInterval: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                >
                  <option value={30}>30 seconds</option>
                  <option value={60}>1 minute</option>
                  <option value={300}>5 minutes</option>
                  <option value={600}>10 minutes</option>
                  <option value={1800}>30 minutes</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setError('');
                  }}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition disabled:opacity-50"
                >
                  {loading ? 'Adding...' : 'Add Monitor'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
