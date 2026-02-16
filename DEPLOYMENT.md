# StatusPNG - Deployment Guide

This guide covers deploying StatusPNG to production on Vercel.

---

## Prerequisites

Before deploying, you'll need:
1. **GitHub account** (to store your code)
2. **Vercel account** (free tier works for MVP)
3. **OpenAI API key** (for AI incident reports) - Get it from [platform.openai.com](https://platform.openai.com/api-keys)
4. **Database** (choose one):
   - Vercel Postgres (requires Vercel Pro - $20/mo)
   - Turso (free tier available) - Recommended for MVP
   - Neon (free tier available)

---

## Step 1: Set Up Database (Turso - Recommended)

### Why Turso?
- ✅ SQLite-compatible (minimal code changes)
- ✅ Free tier includes 500 databases, 1B row reads/month
- ✅ Edge deployment (fast)
- ✅ Works perfectly with Vercel

### Install Turso CLI
```bash
# macOS/Linux
curl -sSfL https://get.tur.so/install.sh | bash

# Or with Homebrew
brew install tursodatabase/tap/turso
```

### Create Database
```bash
# Login
turso auth login

# Create database
turso db create statuspng

# Get connection URL
turso db show statuspng --url

# Create auth token
turso db tokens create statuspng
```

### Initialize Schema
```bash
# Copy the schema from lib/db.ts and run it
turso db shell statuspng < schema.sql
```

Or manually run the CREATE TABLE statements from `lib/db.ts` in the Turso shell:
```bash
turso db shell statuspng
```

---

## Step 2: Deploy to Vercel

### Option A: Deploy with Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Set environment variables
vercel env add OPENAI_API_KEY
vercel env add TURSO_DATABASE_URL
vercel env add TURSO_AUTH_TOKEN

# Redeploy with env vars
vercel --prod
```

### Option B: Deploy via Vercel Dashboard

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for production"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your repository
   - Click "Deploy"

3. **Add Environment Variables**
   Go to Project Settings → Environment Variables and add:
   
   ```env
   OPENAI_API_KEY=sk-...
   TURSO_DATABASE_URL=libsql://your-db.turso.io
   TURSO_AUTH_TOKEN=eyJ...
   ```

4. **Redeploy**
   - Go to Deployments
   - Click "Redeploy" on the latest deployment

---

## Step 3: Enable Cron Jobs

Vercel cron jobs require **Vercel Pro** ($20/month).

### If you have Vercel Pro:
The `vercel.json` file already configures cron:
```json
{
  "crons": [{
    "path": "/api/check",
    "schedule": "*/5 * * * *"
  }]
}
```

This runs monitoring every 5 minutes.

### If you're on Vercel Free:
Use an external cron service:

#### Option 1: cron-job.org (Free)
1. Sign up at [cron-job.org](https://cron-job.org)
2. Create a new cron job
3. URL: `https://your-app.vercel.app/api/check`
4. Schedule: `*/5 * * * *` (every 5 minutes)
5. Method: POST

#### Option 2: EasyCron (Free tier)
1. Sign up at [easycron.com](https://www.easycron.com)
2. Create cron job
3. URL: `https://your-app.vercel.app/api/check`
4. Interval: Every 5 minutes

#### Option 3: GitHub Actions (Free)
Create `.github/workflows/monitor.yml`:

```yaml
name: Run Monitoring Checks

on:
  schedule:
    - cron: '*/5 * * * *'  # Every 5 minutes
  workflow_dispatch:  # Manual trigger

jobs:
  monitor:
    runs-on: ubuntu-latest
    steps:
      - name: Call monitoring endpoint
        run: |
          curl -X POST https://your-app.vercel.app/api/check
```

**Note:** GitHub Actions cron may be delayed by 5-15 minutes during high load.

---

## Step 4: Optional Features

### Email Alerts (SMTP)

Add these environment variables:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=noreply@statuspng.com
```

**For Gmail:**
1. Go to Google Account → Security → 2-Step Verification
2. Generate an "App Password"
3. Use that as `SMTP_PASSWORD`

### SMS Alerts (Twilio)

1. Sign up at [twilio.com](https://www.twilio.com)
2. Get a phone number
3. Add environment variables:
```env
TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=your-token
TWILIO_PHONE_NUMBER=+1234567890
```

---

## Step 5: Post-Deployment

### 1. Create First Account
Visit `https://your-app.vercel.app/signup`

### 2. Add Your First Monitor
- Dashboard → Add Monitor
- Enter your service URL
- Set check interval

### 3. Test Monitoring
- Click "Check Now" on your monitor
- Verify it shows status correctly

### 4. Test Incident Reporting
- Add a monitor with an invalid URL
- Wait for a check to run
- Go to `/status/your-org-slug`
- Verify AI incident report appears

---

## Troubleshooting

### Monitors Not Running Automatically
**Problem:** Monitors only work when you click "Check Now"

**Solutions:**
1. If on Vercel Pro: Check that cron job is configured in `vercel.json`
2. If on Vercel Free: Set up external cron (see Step 3)
3. Check Vercel logs for errors

### Database Connection Errors
**Problem:** "Database not found" or connection timeouts

**Solutions:**
1. Verify `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN` are set correctly
2. Check Turso database is active: `turso db list`
3. Test connection locally first

### AI Reports Not Generating
**Problem:** Incident reports show templates instead of AI content

**Solutions:**
1. Verify `OPENAI_API_KEY` is set in Vercel environment variables
2. Check OpenAI API key is valid and has credits
3. Check Vercel function logs for API errors

### Build Failures
**Problem:** Deployment fails during build

**Solutions:**
1. Run `npm run build` locally to test
2. Check TypeScript errors
3. Verify all dependencies are in `package.json`

---

## Cost Breakdown

### Minimum Viable Deployment (Free/Cheap)
| Service | Plan | Cost |
|---------|------|------|
| Vercel | Free or Hobby | $0-20/mo |
| Turso | Free tier | $0 |
| OpenAI API | Pay-per-use | ~$1-5/mo |
| Cron-job.org | Free | $0 |
| **Total** | | **$1-25/mo** |

### Production Deployment
| Service | Plan | Cost |
|---------|------|------|
| Vercel | Pro | $20/mo |
| Turso | Starter | $0-30/mo |
| OpenAI API | Pay-per-use | $5-20/mo |
| SendGrid | Free | $0 |
| **Total** | | **$25-70/mo** |

### Revenue to Break Even (Production)
- Need 3 Pro users ($9/mo) or 1 Team user ($29/mo)
- Profit margin: ~60% at scale

---

## Scaling Considerations

### <100 Monitors
- Current architecture works fine
- Single Vercel region
- Free/Starter Turso

### 100-1000 Monitors
- Consider upgrading Turso plan
- Add Redis for caching (Upstash)
- Monitor OpenAI API costs

### 1000+ Monitors
- Multi-region Turso deployment
- Queue system for checks (BullMQ + Redis)
- Consider Vercel Enterprise
- Rate limiting on OpenAI (or switch to cheaper LLM)

---

## Security Checklist

Before going live:

- [ ] All environment variables set in Vercel (not in code)
- [ ] HTTPS enabled (Vercel does this automatically)
- [ ] Database credentials rotated from defaults
- [ ] API rate limiting enabled (TODO: implement)
- [ ] Input validation on all forms
- [ ] CSRF protection enabled (TODO: implement with iron-session)
- [ ] Session expiry reasonable (30 days → should be 7 days)
- [ ] Error messages don't leak sensitive info

---

## Monitoring Your Monitoring App 🤔

Ironic, but important:

1. **Uptime monitoring:** Use a competitor (UptimeRobot free plan) to monitor your StatusPNG deployment
2. **Error tracking:** Add [Sentry](https://sentry.io) (free tier: 5K events/mo)
3. **Logs:** Use Vercel logs or [Logtail](https://betterstack.com/logtail)
4. **Analytics:** Add [Plausible](https://plausible.io) or [Umami](https://umami.is)

---

## Next Steps After Deployment

1. **Add tests** - Prevent regressions
2. **Set up CI/CD** - Auto-deploy on main branch
3. **Add changelog** - Track features and fixes
4. **Create docs site** - Help users get started
5. **Build landing page SEO** - Get organic traffic
6. **Add social proof** - Testimonials, case studies
7. **Launch on Product Hunt** - Get initial users

---

## Support

- **GitHub Issues:** [github.com/tahseen137/statuspng/issues](https://github.com/tahseen137/statuspng/issues)
- **Documentation:** This file + README.md
- **Community:** (TODO: Set up Discord/Slack)

---

**Happy deploying! 🚀**
