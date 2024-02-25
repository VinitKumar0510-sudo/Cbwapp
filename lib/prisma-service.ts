import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class PrismaService {
  async createCommand(data: { command: string; output: string; status?: string }) {
    return await prisma.gitCommand.create({ data });
  }

  async getAllCommands() {
    return await prisma.gitCommand.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  async getCommandById(id: number) {
    return await prisma.gitCommand.findUnique({
      where: { id }
    });
  }

  async updateCommand(id: number, data: { command?: string; output?: string; status?: string }) {
    return await prisma.gitCommand.update({
      where: { id },
      data
    });
  }

  async deleteCommand(id: number) {
    return await prisma.gitCommand.delete({
      where: { id }
    });
  }
}

export default new PrismaService();