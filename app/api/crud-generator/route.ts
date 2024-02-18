import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';

const execAsync = promisify(exec);

export async function POST(request: NextRequest) {
  try {
    const { dbType } = await request.json();
    
    // Generate CRUD implementation files
    const crudFiles = generateCRUDFiles(dbType);
    
    // Write files to project
    for (const [filePath, content] of Object.entries(crudFiles)) {
      const fullPath = path.join(process.cwd(), filePath);
      const dir = path.dirname(fullPath);
      
      // Ensure directory exists
      await fs.mkdir(dir, { recursive: true });
      await fs.writeFile(fullPath, content);
    }
    
    // Generate Docker files
    const dockerFiles = generateDockerFiles(dbType);
    for (const [filePath, content] of Object.entries(dockerFiles)) {
      const fullPath = path.join(process.cwd(), filePath);
      await fs.writeFile(fullPath, content);
    }
    
    // Commit to Git
    const commitMessage = `feat: Add ${dbType.toUpperCase()} CRUD implementation with Docker support - Assignment 2`;
    
    await execAsync('git add .');
    await execAsync(`git commit -m "${commitMessage}"`);
    
    // Try to push (may fail if no remote configured)
    try {
      await execAsync('git push');
    } catch (pushError) {
      console.log('Push failed - no remote configured or authentication issue');
    }
    
    const output = `✅ Generated and committed ${dbType.toUpperCase()} CRUD implementation:
    
📁 Files created:
${Object.keys(crudFiles).map(f => `  - ${f}`).join('\n')}
${Object.keys(dockerFiles).map(f => `  - ${f}`).join('\n')}

🔧 Features included:
  - Full CRUD operations (Create, Read, Update, Delete)
  - ${dbType === 'prisma' ? 'Prisma ORM' : 'Sequelize ORM'} integration
  - Docker containerization
  - Database connection handling
  - Error handling and validation
  - TypeScript support

📦 Docker setup:
  - Database container (MySQL)
  - Application container
  - Docker Compose configuration
  - Environment variables

✅ Committed to Git with message: "${commitMessage}"`;
    
    return NextResponse.json({ output });
  } catch (error: any) {
    return NextResponse.json({ 
      output: `❌ Error generating CRUD implementation: ${error.message}` 
    }, { status: 500 });
  }
}

function generateCRUDFiles(dbType: string): Record<string, string> {
  const files: Record<string, string> = {};
  
  if (dbType === 'prisma') {
    files['lib/prisma-service.ts'] = `import { PrismaClient } from '@prisma/client';

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

export default new PrismaService();`;
  } else {
    files['lib/sequelize-service.ts'] = `import { Sequelize, DataTypes, Model } from 'sequelize';

const sequelize = new Sequelize(
  process.env.DATABASE_URL || 'mysql://root:password@localhost:3306/cbwapp'
);

export class GitCommand extends Model {
  public id!: number;
  public command!: string;
  public output!: string;
  public status!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

GitCommand.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  command: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  output: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'success',
  }
}, {
  sequelize,
  modelName: 'GitCommand',
});

export class SequelizeService {
  async init() {
    await sequelize.sync();
  }

  async createCommand(data: { command: string; output: string; status?: string }) {
    await this.init();
    return await GitCommand.create(data);
  }

  async getAllCommands() {
    await this.init();
    return await GitCommand.findAll({
      order: [['createdAt', 'DESC']]
    });
  }

  async getCommandById(id: number) {
    await this.init();
    return await GitCommand.findByPk(id);
  }

  async updateCommand(id: number, data: { command?: string; output?: string; status?: string }) {
    await this.init();
    await GitCommand.update(data, { where: { id } });
    return await GitCommand.findByPk(id);
  }

  async deleteCommand(id: number) {
    await this.init();
    return await GitCommand.destroy({ where: { id } });
  }
}

export default new SequelizeService();`;
  }
  
  return files;
}

function generateDockerFiles(dbType: string): Record<string, string> {
  const files: Record<string, string> = {};
  
  files['Dockerfile.enhanced'] = `FROM node:22-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

FROM base AS deps
COPY package.json package-lock.json* ./
RUN npm ci --only=production

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
${dbType === 'prisma' ? 'RUN npx prisma generate' : ''}
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
RUN mkdir .next
RUN chown nextjs:nodejs .next
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
ENV PORT 3000
CMD ["node", "server.js"]`;

  files['docker-compose.enhanced.yml'] = `version: '3.8'
services:
  database:
    image: mysql:8.0
    container_name: cbwapp-db
    restart: unless-stopped
    environment:
      MYSQL_ROOT_PASSWORD: rootpassword
      MYSQL_DATABASE: cbwapp
      MYSQL_USER: cbwapp_user
      MYSQL_PASSWORD: cbwapp_password
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql
    networks:
      - cbwapp-network

  app:
    build:
      context: .
      dockerfile: Dockerfile.enhanced
    container_name: cbwapp-app
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=mysql://cbwapp_user:cbwapp_password@database:3306/cbwapp
    depends_on:
      - database
    networks:
      - cbwapp-network

volumes:
  mysql_data:

networks:
  cbwapp-network:
    driver: bridge`;

  return files;
}