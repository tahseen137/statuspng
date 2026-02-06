import axios from 'axios';
import { getDb, type Monitor, type Incident, type Check } from './db';

export async function checkMonitor(monitor: Monitor) {
  const db = getDb();
  const startTime = Date.now();
  
  try {
    const response = await axios.get(monitor.url, {
      timeout: monitor.timeout * 1000,
      validateStatus: () => true, // Accept any status code
    });
    
    const responseTime = Date.now() - startTime;
    const isUp = response.status >= 200 && response.status < 500;
    const status = isUp ? 'up' : 'down';
    
    // Record the check
    db.prepare(`
      INSERT INTO checks (monitor_id, status, response_time, status_code)
      VALUES (?, ?, ?, ?)
    `).run(monitor.id, status, responseTime, response.status);
    
    // Update monitor status
    const oldStatus = monitor.status;
    if (oldStatus !== status) {
      db.prepare(`
        UPDATE monitors 
        SET status = ?, last_status_change = CURRENT_TIMESTAMP, last_checked = CURRENT_TIMESTAMP
        WHERE id = ?
      `).run(status, monitor.id);
      
      // Handle status change
      if (status === 'down') {
        await createIncident(monitor, response.status, null);
      } else if (status === 'up' && oldStatus === 'down') {
        await resolveIncident(monitor);
      }
    } else {
      db.prepare(`
        UPDATE monitors SET last_checked = CURRENT_TIMESTAMP WHERE id = ?
      `).run(monitor.id);
    }
    
    return { status, responseTime, statusCode: response.status };
  } catch (error: any) {
    const responseTime = Date.now() - startTime;
    
    // Record the failed check
    db.prepare(`
      INSERT INTO checks (monitor_id, status, response_time, error_message)
      VALUES (?, 'down', ?, ?)
    `).run(monitor.id, responseTime, error.message);
    
    // Update monitor status
    const oldStatus = monitor.status;
    if (oldStatus !== 'down') {
      db.prepare(`
        UPDATE monitors 
        SET status = 'down', last_status_change = CURRENT_TIMESTAMP, last_checked = CURRENT_TIMESTAMP
        WHERE id = ?
      `).run(monitor.id);
      
      await createIncident(monitor, null, error.message);
    } else {
      db.prepare(`
        UPDATE monitors SET last_checked = CURRENT_TIMESTAMP WHERE id = ?
      `).run(monitor.id);
    }
    
    return { status: 'down', responseTime, error: error.message };
  }
}

async function createIncident(monitor: Monitor, statusCode: number | null, errorMessage: string | null) {
  const db = getDb();
  
  // Check if there's already an ongoing incident
  const existingIncident = db.prepare(`
    SELECT * FROM incidents 
    WHERE monitor_id = ? AND status = 'ongoing'
    ORDER BY started_at DESC LIMIT 1
  `).get(monitor.id) as Incident | undefined;
  
  if (existingIncident) {
    return; // Don't create duplicate incidents
  }
  
  const title = `${monitor.name} is down`;
  const description = statusCode 
    ? `Monitor returned HTTP ${statusCode}`
    : `Monitor failed with error: ${errorMessage}`;
  
  // Generate AI report
  const aiReport = await generateAIReport(monitor, statusCode, errorMessage);
  
  db.prepare(`
    INSERT INTO incidents (monitor_id, title, description, ai_report, status)
    VALUES (?, ?, ?, ?, 'ongoing')
  `).run(monitor.id, title, description, aiReport);
}

async function resolveIncident(monitor: Monitor) {
  const db = getDb();
  
  db.prepare(`
    UPDATE incidents 
    SET status = 'resolved', resolved_at = CURRENT_TIMESTAMP
    WHERE monitor_id = ? AND status = 'ongoing'
  `).run(monitor.id);
}

async function generateAIReport(monitor: Monitor, statusCode: number | null, errorMessage: string | null): Promise<string> {
  // For MVP, generate a simple templated report
  // In production, you'd call an AI API like OpenAI or Anthropic
  
  const timestamp = new Date().toISOString();
  const duration = 'just now';
  
  if (statusCode) {
    return `**Incident Report**

We detected an issue with ${monitor.name} at ${new Date().toLocaleString()}.

**What happened:**
Our monitoring system detected that ${monitor.url} returned an HTTP ${statusCode} status code, indicating the service is currently unavailable.

**Impact:**
Users may be unable to access ${monitor.name} during this time.

**Current status:**
Our team has been automatically notified and is investigating the issue.

**Timeline:**
- ${new Date().toLocaleTimeString()}: Issue detected
- ${new Date().toLocaleTimeString()}: Team notified

We'll update this page as we learn more.`;
  } else {
    return `**Incident Report**

We detected an issue with ${monitor.name} at ${new Date().toLocaleString()}.

**What happened:**
Our monitoring system was unable to reach ${monitor.url}. Error: ${errorMessage}

**Impact:**
Users may be unable to access ${monitor.name} during this time.

**Current status:**
Our team has been automatically notified and is investigating the issue.

**Timeline:**
- ${new Date().toLocaleTimeString()}: Issue detected
- ${new Date().toLocaleTimeString()}: Team notified

We'll update this page as we learn more.`;
  }
}

export function getMonitorsByUserId(userId: number): Monitor[] {
  const db = getDb();
  return db.prepare('SELECT * FROM monitors WHERE user_id = ? ORDER BY created_at DESC').all(userId) as Monitor[];
}

export function getMonitorById(id: number): Monitor | undefined {
  const db = getDb();
  return db.prepare('SELECT * FROM monitors WHERE id = ?').get(id) as Monitor | undefined;
}

export function createMonitor(userId: number, name: string, url: string, checkInterval: number = 60) {
  const db = getDb();
  const result = db.prepare(`
    INSERT INTO monitors (user_id, name, url, check_interval, status)
    VALUES (?, ?, ?, ?, 'unknown')
  `).run(userId, name, url, checkInterval);
  
  return result.lastInsertRowid;
}

export function deleteMonitor(id: number) {
  const db = getDb();
  db.prepare('DELETE FROM monitors WHERE id = ?').run(id);
}

export function getRecentChecks(monitorId: number, limit: number = 20): Check[] {
  const db = getDb();
  return db.prepare(`
    SELECT * FROM checks 
    WHERE monitor_id = ? 
    ORDER BY checked_at DESC 
    LIMIT ?
  `).all(monitorId, limit) as Check[];
}

export function getIncidents(monitorId: number): Incident[] {
  const db = getDb();
  return db.prepare(`
    SELECT * FROM incidents 
    WHERE monitor_id = ? 
    ORDER BY started_at DESC
  `).all(monitorId) as Incident[];
}

export function getOngoingIncidents(monitorId: number): Incident[] {
  const db = getDb();
  return db.prepare(`
    SELECT * FROM incidents 
    WHERE monitor_id = ? AND status = 'ongoing'
    ORDER BY started_at DESC
  `).all(monitorId) as Incident[];
}
