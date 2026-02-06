import { NextRequest, NextResponse } from 'next/server';
import { createUser, getUserByEmail, generateOrgSlug } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  try {
    const { email, password, orgName, plan } = await req.json();

    // Validate input
    if (!email || !password || !orgName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = getUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      );
    }

    // Generate org slug
    const orgSlug = generateOrgSlug(orgName);

    // Create user
    const userId = createUser(email, password, orgName, orgSlug, plan || 'free');

    // Set session cookie
    const cookieStore = await cookies();
    cookieStore.set('session', JSON.stringify({ userId, email }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    return NextResponse.json({
      success: true,
      userId,
      orgSlug,
    });
  } catch (error: any) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
