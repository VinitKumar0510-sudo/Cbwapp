// Enhanced instrumentation for Assignment 2
interface MetricsData {
  timestamp: number;
  memory: NodeJS.MemoryUsage;
  uptime: number;
  requests: number;
  errors: number;
  dbQueries: number;
  gitCommands: number;
}

class InstrumentationService {
  private metrics: MetricsData = {
    timestamp: Date.now(),
    memory: process.memoryUsage(),
    uptime: 0,
    requests: 0,
    errors: 0,
    dbQueries: 0,
    gitCommands: 0
  };

  private startTime = Date.now();

  constructor() {
    this.setupMetricsCollection();
    this.setupPerformanceMonitoring();
    this.setupErrorTracking();
  }

  private setupMetricsCollection() {
    setInterval(() => {
      this.updateMetrics();
      this.logMetrics();
    }, 10000);
  }

  private setupPerformanceMonitoring() {
    const start = process.hrtime.bigint();
    setImmediate(() => {
      const lag = Number(process.hrtime.bigint() - start) / 1e6;
      if (lag > 100) {
        console.warn(`⚠️ Event loop lag detected: ${lag.toFixed(2)}ms`);
      }
    });
  }

  private setupErrorTracking() {
    process.on('uncaughtException', (error) => {
      this.metrics.errors++;
      console.error('🚨 Uncaught Exception:', error);
    });

    process.on('unhandledRejection', (reason) => {
      this.metrics.errors++;
      console.error('🚨 Unhandled Rejection:', reason);
    });
  }

  private updateMetrics() {
    this.metrics.timestamp = Date.now();
    this.metrics.memory = process.memoryUsage();
    this.metrics.uptime = Date.now() - this.startTime;
  }

  private logMetrics() {
    console.log('📊 Application Metrics:', {
      uptime: `${Math.round(this.metrics.uptime / 1000)}s`,
      memory: {
        rss: `${Math.round(this.metrics.memory.rss / 1024 / 1024)} MB`,
        heapUsed: `${Math.round(this.metrics.memory.heapUsed / 1024 / 1024)} MB`,
        heapTotal: `${Math.round(this.metrics.memory.heapTotal / 1024 / 1024)} MB`
      },
      counters: {
        requests: this.metrics.requests,
        errors: this.metrics.errors,
        dbQueries: this.metrics.dbQueries,
        gitCommands: this.metrics.gitCommands
      }
    });
  }

  incrementRequest() { this.metrics.requests++; }
  incrementError() { this.metrics.errors++; }
  incrementDbQuery() { this.metrics.dbQueries++; }
  incrementGitCommand() { this.metrics.gitCommands++; }
  getMetrics(): MetricsData { return { ...this.metrics }; }
}

let instrumentationService: InstrumentationService;

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    console.log('🔧 Enhanced Instrumentation for Assignment 2');
    console.log('📊 Student: Vinit Kumar (21946017)');
    
    instrumentationService = new InstrumentationService();
    
    console.log(`🚀 Application started at: ${new Date().toISOString()}`);
    console.log('📈 Monitoring: Memory, Performance, DB queries, Git commands, Errors');
    
    const originalFetch = global.fetch;
    global.fetch = async (...args) => {
      const start = Date.now();
      instrumentationService?.incrementRequest();
      try {
        const result = await originalFetch(...args);
        const duration = Date.now() - start;
        console.log(`📊 Fetch to ${args[0]} took ${duration}ms`);
        return result;
      } catch (error) {
        instrumentationService?.incrementError();
        throw error;
      }
    };
  }
}

export function getInstrumentationService(): InstrumentationService | undefined {
  return instrumentationService;
}