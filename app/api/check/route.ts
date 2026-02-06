import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/session';
import { getMonitorById, checkMonitor } from '@/lib/monitor';
import { getDb } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    
    const body = await req.json();
    const { monitorId } = body;

    if (monitorId) {
      // Check specific monitor (from dashboard)
      if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

      const monitor = getMonitorById(monitorId);
      if (!monitor) {
        return NextResponse.json({ error: 'Monitor not found' }, { status: 404 });
      }

      if (monitor.user_id !== session.userId) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      }

      const result = await checkMonitor(monitor);
      return NextResponse.json({ success: true, result });
    } else {
      // Check all monitors (cron job)
      const db = getDb();
      const monitors = db.prepare('SELECT * FROM monitors').all();

      const results = [];
      for (const m of monitors) {
        const monitor = m as any;
        try {
          const result = await checkMonitor(monitor);
          results.push({ monitorId: monitor.id, ...result });
        } catch (error) {
          console.error(`Error checking monitor ${monitor.id}:`, error);
        }
      }

      return NextResponse.json({ success: true, checked: results.length, results });
    }
  } catch (error: any) {
    console.error('Check monitor error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
