import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import sequelize, { GitCommand } from '@/lib/sequelize';

// CREATE - Save new command
export async function POST(request: NextRequest) {
  try {
    const { command, output, dbType } = await request.json();
    
    let result;
    if (dbType === 'prisma') {
      result = await prisma.gitCommand.create({
        data: { command, output: output || '' }
      });
    } else {
      await sequelize.sync();
      result = await GitCommand.create({ command, output: output || '' });
    }
    
    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// READ - Get all commands
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const dbType = searchParams.get('dbType') || 'prisma';
    
    let commands;
    if (dbType === 'prisma') {
      commands = await prisma.gitCommand.findMany({
        orderBy: { createdAt: 'desc' }
      });
    } else {
      await sequelize.sync();
      commands = await GitCommand.findAll({
        order: [['createdAt', 'DESC']]
      });
    }
    
    return NextResponse.json(commands);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}