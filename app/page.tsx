import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">📊</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                StatusPing
              </span>
            </div>
            <div className="flex gap-4">
              <Link 
                href="/login" 
                className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium transition"
              >
                Log in
              </Link>
              <Link 
                href="/signup" 
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
            Uptime Monitoring with
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI-Powered Incident Reports
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Stop writing boring status updates. Let AI turn your downtime into clear, 
            human-readable incident reports your customers will actually understand.
          </p>
          <div className="flex gap-4 justify-center">
            <Link 
              href="/signup" 
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold text-lg hover:shadow-xl transition"
            >
              Start Free Trial
            </Link>
            <Link 
              href="#features" 
              className="px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-semibold text-lg hover:border-gray-400 transition"
            >
              See Features
            </Link>
          </div>
          <p className="mt-4 text-sm text-gray-500">
            Free plan includes 3 monitors • No credit card required
          </p>
        </div>

        {/* Demo Screenshot Placeholder */}
        <div className="mt-16 max-w-5xl mx-auto">
          <div className="rounded-xl shadow-2xl border border-gray-200 bg-white p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-6 rounded-lg bg-green-50 border border-green-200">
                <div className="text-3xl mb-2">✅</div>
                <div className="text-sm font-semibold text-green-800">api.example.com</div>
                <div className="text-xs text-green-600 mt-1">Online • 99.9% uptime</div>
              </div>
              <div className="p-6 rounded-lg bg-red-50 border border-red-200">
                <div className="text-3xl mb-2">❌</div>
                <div className="text-sm font-semibold text-red-800">app.example.com</div>
                <div className="text-xs text-red-600 mt-1">Down • Incident ongoing</div>
              </div>
              <div className="p-6 rounded-lg bg-green-50 border border-green-200">
                <div className="text-3xl mb-2">✅</div>
                <div className="text-sm font-semibold text-green-800">cdn.example.com</div>
                <div className="text-xs text-green-600 mt-1">Online • 100% uptime</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything you need to monitor uptime
            </h2>
            <p className="text-xl text-gray-600">
              Simple, powerful, and actually useful when things go wrong
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl border border-gray-200 hover:shadow-lg transition">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-semibold mb-2">AI Incident Reports</h3>
              <p className="text-gray-600">
                Automatically generate clear, customer-facing incident reports when downtime is detected.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-gray-200 hover:shadow-lg transition">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-2">Real-Time Monitoring</h3>
              <p className="text-gray-600">
                Check your services every minute and get instant alerts when something goes wrong.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-gray-200 hover:shadow-lg transition">
              <div className="text-4xl mb-4">📄</div>
              <h3 className="text-xl font-semibold mb-2">Public Status Pages</h3>
              <p className="text-gray-600">
                Beautiful status pages at status.yourcompany.com that update automatically.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-gray-200 hover:shadow-lg transition">
              <div className="text-4xl mb-4">📧</div>
              <h3 className="text-xl font-semibold mb-2">Instant Alerts</h3>
              <p className="text-gray-600">
                Get notified by email the moment your services go down.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-gray-200 hover:shadow-lg transition">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
              <p className="text-gray-600">
                Built on modern infrastructure for sub-second check times and instant updates.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-gray-200 hover:shadow-lg transition">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-xl font-semibold mb-2">Uptime Analytics</h3>
              <p className="text-gray-600">
                Track response times, uptime percentage, and incident history over time.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-gray-600">
              Start free, scale as you grow
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white rounded-xl border-2 border-gray-200 p-8 hover:shadow-xl transition">
              <h3 className="text-2xl font-bold mb-2">Free</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-gray-600">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>3 monitors</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>5-minute checks</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Email alerts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>AI incident reports</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Public status page</span>
                </li>
              </ul>
              <Link 
                href="/signup" 
                className="block w-full px-6 py-3 bg-gray-100 text-gray-900 rounded-lg font-semibold text-center hover:bg-gray-200 transition"
              >
                Get Started
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-8 text-white transform scale-105 shadow-2xl">
              <div className="bg-white/20 rounded-full px-3 py-1 text-sm font-semibold inline-block mb-4">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold mb-2">Pro</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">$9</span>
                <span className="text-blue-100">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <span className="mt-1">✓</span>
                  <span>Unlimited monitors</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1">✓</span>
                  <span>1-minute checks</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1">✓</span>
                  <span>Email + SMS alerts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1">✓</span>
                  <span>Advanced AI reports</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1">✓</span>
                  <span>Custom status page</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1">✓</span>
                  <span>30-day history</span>
                </li>
              </ul>
              <Link 
                href="/signup?plan=pro" 
                className="block w-full px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold text-center hover:bg-gray-50 transition"
              >
                Start Pro Trial
              </Link>
            </div>

            {/* Team Plan */}
            <div className="bg-white rounded-xl border-2 border-gray-200 p-8 hover:shadow-xl transition">
              <h3 className="text-2xl font-bold mb-2">Team</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">$29</span>
                <span className="text-gray-600">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Everything in Pro</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Team members (5)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Slack integration</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>API access</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>90-day history</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Priority support</span>
                </li>
              </ul>
              <Link 
                href="/signup?plan=team" 
                className="block w-full px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold text-center hover:bg-gray-800 transition"
              >
                Start Team Trial
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to stop writing incident reports?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join teams who trust StatusPing to keep their services monitored and their customers informed.
          </p>
          <Link 
            href="/signup" 
            className="inline-block px-8 py-4 bg-white text-purple-600 rounded-lg font-semibold text-lg hover:shadow-xl transition"
          >
            Get Started Free
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">📊</span>
              </div>
              <span className="text-xl font-bold text-white">StatusPing</span>
            </div>
            <div className="text-sm">
              © 2025 StatusPing. Built with 💙 by developers, for developers.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
