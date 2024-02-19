import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function POST(request: NextRequest) {
  try {
    const { command } = await request.json();
    
    const { stdout, stderr } = await execAsync(command);
    const output = stdout || stderr;
    
    return NextResponse.json({ output });
  } catch (error: any) {
    return NextResponse.json({ output: error.message }, { status: 500 });
  }
}