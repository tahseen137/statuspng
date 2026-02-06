# StatusPing 📊

**Uptime Monitoring with AI-Powered Incident Reports**

StatusPing is a modern uptime monitoring SaaS that automatically generates human-readable incident reports using AI when your services go down.

## 🚀 Features

- **Real-Time Monitoring** - Check your services every minute
- **AI Incident Reports** - Automatically generate customer-facing incident reports
- **Public Status Pages** - Beautiful public status pages at `/status/[your-org]`
- **Instant Alerts** - Get notified by email when services go down
- **Simple Dashboard** - Clean, modern interface for managing monitors
- **Multiple Plans** - Free, Pro ($9/mo), and Team ($29/mo) tiers

## 🛠 Tech Stack

- **Framework:** Next.js 16 (App Router + Turbopack)
- **Styling:** Tailwind CSS
- **Database:** SQLite (better-sqlite3)
- **Authentication:** Cookie-based sessions
- **Deployment:** Vercel

## 📦 Installation

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` to see the app.

## 🗄 Database

The app uses SQLite for simple, file-based storage. The database is automatically created on first run at `data/statuspng.db`.

## 🔑 Environment Variables

No environment variables required for MVP! The app works out of the box.

For production, you may want to add:
- Email service credentials (for alerts)
- AI API keys (for enhanced incident reports)

## 📝 API Routes

- `POST /api/auth/signup` - Create new account
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/monitors` - Get all monitors for current user
- `POST /api/monitors` - Create new monitor
- `DELETE /api/monitors/[id]` - Delete monitor
- `POST /api/check` - Check monitor(s) (manual or cron)

## 🎯 Roadmap

- [ ] Email/SMS alerts via Twilio/SendGrid
- [ ] Advanced AI reports via OpenAI/Anthropic
- [ ] Slack/Discord webhooks
- [ ] Custom domains for status pages
- [ ] Response time charts
- [ ] SSL certificate monitoring
- [ ] Multi-region checks
- [ ] API access
- [ ] Team collaboration

## 📄 License

MIT

## 🙏 Acknowledgments

Built as a hackathon project to demonstrate:
- Next.js 16 App Router
- Modern SaaS architecture
- AI integration for developer tools
- Rapid MVP development

---

**Made with 💙 by developers, for developers**
