# 📊 StatusPNG

**Uptime monitoring with AI-powered incident reports**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/tahseen137/statuspng)
[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://statuspng.vercel.app)

---

## 🎯 What is StatusPNG?

StatusPNG is a modern uptime monitoring tool that uses **AI to automatically write customer-facing incident reports** when your services go down. 

Stop manually writing boring "We're experiencing technical difficulties..." updates. Let AI explain what happened, what's affected, and what's being done — in clear, human-readable language your customers will actually understand.

**The Problem:** Traditional monitoring tools alert you when things break, but you still have to write status page updates manually.

**Our Solution:** AI reads the technical error, understands what went wrong, and writes a professional incident report for your status page — automatically.

---

## ✨ Current Features (MVP)

### ✅ Implemented
- 📊 **HTTP Monitoring** — Monitor any URL with customizable intervals
- 🤖 **AI Incident Reports** — OpenAI-powered incident report generation
- 📄 **Public Status Pages** — Clean status pages at `/status/your-org`
- ⚡ **Real-Time Status** — See if services are up or down instantly
- 📈 **Check History** — View past checks and response times
- 🔔 **Incident Tracking** — Automatic incident creation and resolution
- 🎨 **Modern UI** — Built with Next.js 16, React 19, and Tailwind CSS 4
- 🔐 **User Authentication** — Email/password signup and login
- 📊 **Dashboard** — Manage all your monitors in one place

### ⚠️ Roadmap (Coming Soon)
- 📧 **Email Alerts** — Get notified when monitors go down
- 📱 **SMS Alerts** — Text message notifications (Twilio)
- 📊 **Uptime Analytics** — Calculate real uptime percentages
- 🔑 **Keyword Monitoring** — Check for specific text on pages
- 🔒 **SSL Monitoring** — Monitor certificate expiration
- 🌍 **Multi-Region Checks** — Monitor from different locations
- 🔗 **Integrations** — Slack, Discord, PagerDuty, webhooks
- 👥 **Team Management** — Collaborate with team members
- 📱 **Mobile App** — iOS and Android apps

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- npm or yarn
- OpenAI API key ([get one here](https://platform.openai.com/api-keys))

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/tahseen137/statuspng.git
   cd statuspng
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your OpenAI API key:
   ```env
   OPENAI_API_KEY=sk-...
   ```

4. **Create database directory**
   ```bash
   mkdir -p data
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   - Visit http://localhost:3000
   - Sign up for an account
   - Add your first monitor!

---

## 🌐 Deployment

### Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/tahseen137/statuspng)

**Important:** See [DEPLOYMENT.md](./DEPLOYMENT.md) for full production setup guide.

### Production Checklist
- [ ] Set up Turso database (SQLite won't work on Vercel)
- [ ] Add OpenAI API key to Vercel environment variables
- [ ] Configure cron jobs (requires Vercel Pro, or use external service)
- [ ] Set up custom domain (optional)
- [ ] Test monitoring and AI reports

**See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.**

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript |
| **Database** | SQLite (better-sqlite3) |
| **Database (Production)** | Turso / Vercel Postgres |
| **AI** | OpenAI GPT-4o-mini |
| **Authentication** | Custom (cookie-based) |
| **Styling** | Tailwind CSS 4 |
| **Deployment** | Vercel |
| **Monitoring** | Vercel Cron or external cron service |

---

## 🤖 How AI Incident Reports Work

When a monitor goes down, StatusPNG:

1. **Detects the failure** (HTTP error, timeout, etc.)
2. **Gathers context** (URL, error code, error message, timestamp)
3. **Calls OpenAI API** with a prompt asking for a customer-facing incident report
4. **Stores the AI-generated report** in the database
5. **Displays it on your public status page**

### Example Input (Technical Error)
```
Service: Production API
URL: https://api.example.com
Error: ECONNREFUSED
Status Code: null
Time: 2026-02-16 14:30:00
```

### Example Output (AI Report)
```markdown
## Service Disruption Detected

We're currently experiencing issues with our Production API.

### What happened
At 2:30 PM EST, our monitoring system detected that api.example.com 
became unreachable. Connection attempts are being refused, which 
typically indicates the server is down or experiencing network issues.

### Impact
Users may be unable to access the application during this time.

### Current status
Our engineering team has been automatically notified and is 
investigating. We'll provide updates as we learn more.
```

**Cost:** ~$0.002 per incident report (GPT-4o-mini)

---

## 💡 Use Cases

### For SaaS Companies
- Monitor your API endpoints
- Auto-generate status page updates
- Keep customers informed during outages

### For Developers
- Monitor side projects
- Get AI-written incident reports
- Self-host and customize

### For Agencies
- Monitor client websites
- Professional status pages
- White-label ready

---

## 📊 Pricing

### Free
- ✅ 3 monitors
- ✅ 5-minute checks
- ✅ AI incident reports
- ✅ Public status page
- ✅ Unlimited checks

### Pro - $9/month *(Coming Soon)*
- ✅ Unlimited monitors
- ✅ 1-minute checks
- ✅ Email + SMS alerts
- ✅ Advanced AI reports
- ✅ Custom branding
- ✅ 30-day history

### Team - $29/month *(Coming Soon)*
- ✅ Everything in Pro
- ✅ Team members (5)
- ✅ Slack integration
- ✅ API access
- ✅ 90-day history
- ✅ Priority support

---

## 🧑‍💻 Development

### Project Structure
```
statuspng/
├── app/                  # Next.js App Router pages
│   ├── api/             # API routes
│   ├── dashboard/       # Dashboard page
│   ├── status/[slug]/   # Public status pages
│   ├── login/           # Login page
│   ├── signup/          # Signup page
│   └── page.tsx         # Landing page
├── lib/                 # Core business logic
│   ├── auth.ts          # Authentication
│   ├── db.ts            # Database initialization
│   ├── monitor.ts       # Monitoring logic + AI reports
│   └── session.ts       # Session management
├── public/              # Static assets
├── data/                # SQLite database (local dev)
└── vercel.json          # Vercel cron configuration
```

### Build & Test
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

### Environment Variables
See [.env.example](./.env.example) for all available environment variables.

**Required:**
- `OPENAI_API_KEY` — For AI incident reports

**Optional:**
- `SMTP_*` — For email alerts (not yet implemented)
- `TWILIO_*` — For SMS alerts (not yet implemented)
- `TURSO_*` — For production database

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### Quick Contributions
- 🐛 Report bugs via [GitHub Issues](https://github.com/tahseen137/statuspng/issues)
- 💡 Suggest features
- 📝 Improve documentation
- ⭐ Star the repo if you find it useful!

### Code Contributions
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests and build (`npm run build`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to your branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Priority Areas
- Email alert implementation
- SMS alert implementation (Twilio)
- Uptime percentage calculations
- Keyword monitoring
- SSL certificate monitoring
- Tests (currently none!)

---

## 📚 Documentation

- **[DEPLOYMENT.md](./DEPLOYMENT.md)** — Full production deployment guide
- **[AUDIT.md](./AUDIT.md)** — Technical audit and analysis
- **.env.example** — Environment variable reference
- **README.md** — This file

---

## 🔒 Security

### Current Security Features
- ✅ HTTP-only cookies for sessions
- ✅ Password hashing with bcrypt
- ✅ HTTPS in production (via Vercel)
- ✅ Environment variable protection

### Known Security Todos
- ⚠️ CSRF protection (should use iron-session or NextAuth)
- ⚠️ Rate limiting on API routes
- ⚠️ Input sanitization
- ⚠️ 2FA support

**Found a security issue?** Please email security@example.com (TODO: set up security email)

---

## 📈 Roadmap

### v1.0 (MVP) - ✅ DONE
- [x] HTTP monitoring
- [x] AI incident reports
- [x] Public status pages
- [x] User authentication
- [x] Dashboard UI
- [x] Cron configuration

### v1.1 (Alerts)
- [ ] Email alerts (SMTP)
- [ ] SMS alerts (Twilio)
- [ ] Alert preferences
- [ ] Notification templates

### v1.2 (Analytics)
- [ ] Uptime percentage calculation
- [ ] Response time charts
- [ ] Incident history graphs
- [ ] Export data (CSV)

### v1.3 (Advanced Monitoring)
- [ ] Keyword monitoring
- [ ] SSL certificate monitoring
- [ ] Multi-region checks
- [ ] Port monitoring
- [ ] DNS monitoring

### v2.0 (Team & Integrations)
- [ ] Team management
- [ ] Slack integration
- [ ] Discord integration
- [ ] PagerDuty integration
- [ ] Webhook support
- [ ] Public API

### v3.0 (Enterprise)
- [ ] Custom branding
- [ ] SSO/SAML
- [ ] Audit logs
- [ ] SLA tracking
- [ ] Advanced permissions

---

## 🎓 Learn More

### Next.js
- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)

### OpenAI
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [OpenAI Pricing](https://openai.com/pricing)

### Deployment
- [Vercel Documentation](https://vercel.com/docs)
- [Turso Documentation](https://docs.turso.tech)

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

**TL;DR:** You can use this code for anything (including commercial projects), just keep the copyright notice.

---

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- AI powered by [OpenAI](https://openai.com)
- Database by [better-sqlite3](https://github.com/WiseLibs/better-sqlite3)
- Deployed on [Vercel](https://vercel.com)
- Icons from emoji (📊✨🚀)

---

## 💬 Community & Support

- 🐛 **Issues:** [GitHub Issues](https://github.com/tahseen137/statuspng/issues)
- 💬 **Discussions:** [GitHub Discussions](https://github.com/tahseen137/statuspng/discussions)
- 📧 **Email:** support@example.com (TODO: set up support email)
- 🐦 **Twitter:** [@statuspng](https://twitter.com/statuspng) (TODO: create account)

---

## ⭐ Star History

If you find StatusPNG useful, please consider starring the repo! It helps others discover the project.

[![Star History Chart](https://api.star-history.com/svg?repos=tahseen137/statuspng&type=Date)](https://star-history.com/#tahseen137/statuspng&Date)

---

<div align="center">

**Built with 💙 by developers, for developers.**

**Stop writing incident reports. Let AI do it for you. 🤖📊**

[Get Started](https://statuspng.vercel.app) • [Documentation](./DEPLOYMENT.md) • [Report Bug](https://github.com/tahseen137/statuspng/issues)

</div>
