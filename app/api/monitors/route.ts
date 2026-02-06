import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/session';
import { getMonitorsByUserId, createMonitor } from '@/lib/monitor';
import { getUserById } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const monitors = getMonitorsByUserId(session.userId);
    return NextResponse.json({ monitors });
  } catch (error: any) {
    console.error('Get monitors error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = getUserById(session.userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const { name, url, checkInterval } = await req.json();

    // Validate input
    if (!name || !url) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check plan limits
    const existingMonitors = getMonitorsByUserId(user.id);
    if (user.plan === 'free' && existingMonitors.length >= 3) {
      return NextResponse.json(
        { error: 'Free plan limited to 3 monitors. Upgrade to add more.' },
        { status: 403 }
      );
    }

    // Create monitor
    const monitorId = createMonitor(user.id, name, url, checkInterval || 60);

    return NextResponse.json({
      success: true,
      monitorId,
    });
  } catch (error: any) {
    console.error('Create monitor error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
