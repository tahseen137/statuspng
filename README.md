# 📊 StatusPNG

**Uptime monitoring with AI-powered incident reports**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/tahseen137/statuspng)
[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://statuspng.vercel.app)

---

## 📖 About

**StatusPNG** is an **uptime monitoring service** that automatically generates clear, customer-facing incident reports using AI. Stop writing boring status updates—let AI turn your downtime into human-readable reports your customers will actually understand.

Perfect for:
- 🌐 SaaS applications
- 🔌 API endpoints
- 🖥️ Web services
- 📱 Mobile backends
- 🛍️ E-commerce platforms

**Live Demo:** [statuspng.vercel.app](https://statuspng.vercel.app)

---

## ✨ Features

### Core Monitoring
- 📊 **Real-Time Monitoring** — Check services every 1-5 minutes
- ⚡ **Instant Alerts** — Email and SMS notifications when downtime is detected
- 📈 **Uptime Analytics** — Track response times and uptime percentage
- 🌍 **Multi-Region Checks** — Monitor from multiple geographic locations
- 📄 **Public Status Pages** — Beautiful status.yourcompany.com pages

### AI-Powered Features
- 🤖 **AI Incident Reports** — Automatically generate customer-facing updates
- 📝 **Smart Summaries** — Convert technical errors into clear language
- 🎯 **Root Cause Analysis** — AI suggests likely causes of outages
- 📊 **Trend Detection** — Identify patterns in downtime events

### Pro Features
- 🚀 **Unlimited Monitors** (Free tier: 3 monitors)
- ⏱️ **1-Minute Checks** (Free tier: 5-minute checks)
- 📱 **SMS Alerts** — Get texted for critical outages
- 🎨 **Custom Status Pages** — Brand your status page
- 📥 **API Access** — Integrate with your tools
- 👥 **Team Management** — Collaborate with your team
- 📊 **Extended History** — 30-90 day retention

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript |
| **Authentication** | NextAuth.js |
| **Database** | SQLite (better-sqlite3) |
| **Email** | Nodemailer |
| **HTTP Client** | Axios |
| **Styling** | Tailwind CSS 4 |
| **Deployment** | Vercel |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/tahseen137/statuspng.git
cd statuspng

# Install dependencies
npm install
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="file:./data/statuspng.db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-random-secret-here"

# Email (for alerts)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-app-password"
SMTP_FROM="noreply@statuspng.com"

# Optional: SMS (Twilio)
TWILIO_ACCOUNT_SID="your-twilio-sid"
TWILIO_AUTH_TOKEN="your-twilio-token"
TWILIO_PHONE_NUMBER="+1234567890"

# Optional: AI (OpenAI for incident reports)
OPENAI_API_KEY="sk-..."
```

### Development

```bash
# Start development server
npm run dev

# Open http://localhost:3000
```

### Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

---

## 📦 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables (see above)
   - Deploy!

3. **Set Up Database**
   - Use [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres) or [Turso](https://turso.tech)
   - Update `DATABASE_URL` in environment variables

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/tahseen137/statuspng)

---

## 🎯 Usage

### Create a Monitor

1. **Sign up** at your StatusPNG instance
2. **Add Monitor**
   - Name: "Production API"
   - URL: `https://api.yourapp.com/health`
   - Check Interval: 1 minute (Pro) or 5 minutes (Free)
   - Alert Email: your-email@example.com

3. **Configure Notifications**
   - Email alerts (always enabled)
   - SMS alerts (Pro)
   - Slack webhooks (Team)

4. **Set Up Status Page**
   - Public URL: `status.yourapp.com`
   - Custom branding (Pro)
   - Display selected monitors

### Monitor Types

#### HTTP/HTTPS
```javascript
{
  "url": "https://api.example.com",
  "method": "GET",
  "expectedStatus": 200,
  "timeout": 30
}
```

#### Keyword Monitoring
```javascript
{
  "url": "https://yoursite.com",
  "keyword": "Welcome",
  "expectPresent": true
}
```

#### SSL Certificate
```javascript
{
  "url": "https://secure.example.com",
  "checkSSL": true,
  "warnDaysBefore": 7
}
```

---

## 🤖 AI Incident Reports

When a monitor goes down, StatusPNG automatically generates a report:

### Input (Technical Error)
```
ECONNREFUSED 52.1.2.3:443
Timeout after 30000ms
DNS resolution failed
```

### Output (AI-Generated Report)
```
🔴 Incident Detected

We're currently experiencing issues with our API service.

What happened:
Our monitoring systems detected that the API at api.example.com 
became unreachable at 2:47 PM EST. Connection attempts are timing 
out, which typically indicates a server or network issue.

Impact:
Users may experience errors when trying to access the application.

Status:
Our team has been automatically notified and is investigating.

We'll provide updates as we learn more.
```

---

## 📊 Dashboard Features

### Monitor Overview
- 🟢 **Status Indicators** — Visual up/down states
- 📈 **Response Time Graphs** — Historical performance
- ⏱️ **Uptime Percentage** — 7/30/90 day averages
- 📋 **Recent Incidents** — Timeline of outages

### Incident Management
- 🚨 **Active Incidents** — Ongoing outages
- 📝 **Manual Updates** — Override AI reports
- ✅ **Resolution Tracking** — Time to recovery
- 📧 **Notification Log** — Alert history

### Analytics
- 📊 **Uptime Trends** — Performance over time
- ⏱️ **Response Time Distribution** — p50, p95, p99
- 🌍 **Geographic Performance** — Multi-region checks
- 📉 **Incident Frequency** — Patterns and trends

---

## 🔌 API Reference

### `GET /api/monitors`
List all monitors for the authenticated user.

**Response:**
```json
{
  "monitors": [
    {
      "id": "mon_123",
      "name": "Production API",
      "url": "https://api.example.com",
      "status": "up",
      "uptime": 99.9,
      "lastCheck": "2026-02-06T12:00:00Z"
    }
  ]
}
```

### `POST /api/monitors`
Create a new monitor.

**Request:**
```json
{
  "name": "My API",
  "url": "https://api.example.com/health",
  "interval": 60,
  "alertEmail": "you@example.com"
}
```

### `GET /api/incidents/[monitorId]`
Get incident history for a monitor.

**Response:**
```json
{
  "incidents": [
    {
      "id": "inc_456",
      "startedAt": "2026-02-06T02:30:00Z",
      "resolvedAt": "2026-02-06T02:45:00Z",
      "duration": 900,
      "aiReport": "We experienced a brief outage..."
    }
  ]
}
```

---

## 💳 Pricing

### Free
- ✅ 3 monitors
- ✅ 5-minute checks
- ✅ Email alerts
- ✅ AI incident reports
- ✅ Public status page

### Pro - $9/month
- ✅ **Unlimited monitors**
- ✅ 1-minute checks
- ✅ Email + SMS alerts
- ✅ Advanced AI reports
- ✅ Custom status page branding
- ✅ 30-day history

### Team - $29/month
- ✅ **Everything in Pro**
- ✅ Team members (5)
- ✅ Slack integration
- ✅ API access
- ✅ 90-day history
- ✅ Priority support

---

## 🎨 Status Page Customization

### Custom Domain
```javascript
// Add CNAME record:
status.yourcompany.com → statuspng.vercel.app

// Configure in dashboard:
{
  "customDomain": "status.yourcompany.com",
  "logo": "https://yourcompany.com/logo.png",
  "brandColor": "#4F46E5"
}
```

### Embed Widget
```html
<!-- Add to your website -->
<script src="https://statuspng.vercel.app/widget.js" 
        data-status-page="your-page-id">
</script>
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Authentication by [NextAuth.js](https://next-auth.js.org/)
- Database powered by [better-sqlite3](https://github.com/WiseLibs/better-sqlite3)
- Deployed on [Vercel](https://vercel.com)

---

## 📧 Contact

For questions or support, please open an issue on GitHub.

**Stop writing incident reports. Let AI do it for you. 🤖📊**
