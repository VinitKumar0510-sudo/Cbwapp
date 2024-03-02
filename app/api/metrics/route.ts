import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Basic system metrics without dependencies
    const systemMetrics = {
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      system: {
        nodeVersion: process.version,
        platform: process.platform,
        arch: process.arch,
        pid: process.pid,
        cpuUsage: process.cpuUsage()
      },
      student: {
        name: 'Vinit Kumar',
        number: '21946017',
        assignment: 'Assignment 2 - Enhanced Git Command Executor'
      },
      features: {
        prismaIntegration: true,
        sequelizeIntegration: true,
        dockerSupport: true,
        crudOperations: true,
        comprehensiveTesting: true,
        instrumentation: true
      }
    };

    return NextResponse.json(systemMetrics);
  } catch (error: any) {
    return NextResponse.json({ 
      error: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}