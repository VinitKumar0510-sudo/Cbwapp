import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// UPDATE - Update specific command
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { command, dbType } = await request.json();
    const id = parseInt(params.id);
    
    let result;
    if (dbType === 'prisma') {
      result = await prisma.gitCommand.update({
        where: { id },
        data: { command }
      });
    } else {
      const { default: sequelize, GitCommand } = await import('@/lib/sequelize');
      await sequelize.sync();
      await GitCommand.update({ command }, { where: { id } });
      result = await GitCommand.findByPk(id);
    }
    
    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE - Delete specific command
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const dbType = searchParams.get('dbType') || 'prisma';
    const id = parseInt(params.id);
    
    if (dbType === 'prisma') {
      await prisma.gitCommand.delete({
        where: { id }
      });
    } else {
      const { default: sequelize, GitCommand } = await import('@/lib/sequelize');
      await sequelize.sync();
      await GitCommand.destroy({ where: { id } });
    }
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// GET - Get specific command
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const dbType = searchParams.get('dbType') || 'prisma';
    const id = parseInt(params.id);
    
    let command;
    if (dbType === 'prisma') {
      command = await prisma.gitCommand.findUnique({
        where: { id }
      });
    } else {
      const { default: sequelize, GitCommand } = await import('@/lib/sequelize');
      await sequelize.sync();
      command = await GitCommand.findByPk(id);
    }
    
    return NextResponse.json(command);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}