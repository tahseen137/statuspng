import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/session';
import { deleteMonitor, getMonitorById } from '@/lib/monitor';

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const monitorId = parseInt(id);

    // Check if monitor exists and belongs to user
    const monitor = getMonitorById(monitorId);
    if (!monitor) {
      return NextResponse.json({ error: 'Monitor not found' }, { status: 404 });
    }

    if (monitor.user_id !== session.userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Delete monitor
    deleteMonitor(monitorId);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Delete monitor error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
