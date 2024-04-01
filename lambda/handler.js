// Enhanced Lambda Function for Assignment 2
// Student: Vinit Kumar (21946017)

exports.dynamicPages = async (event) => {
  const path = event.pathParameters?.proxy || 'home';
  const method = event.httpMethod;
  const queryParams = event.queryStringParameters || {};
  
  // Generate different content based on path
  let pageContent = '';
  
  switch (path) {
    case 'assignment2':
      pageContent = generateAssignment2Page();
      break;
    case 'crud':
      pageContent = generateCRUDPage(queryParams);
      break;
    case 'docker':
      pageContent = generateDockerPage();
      break;
    case 'metrics':
      pageContent = generateMetricsPage();
      break;
    default:
      pageContent = generateHomePage(path);
  }
  
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>CBW Assignment 2 - ${path}</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; background: #f5f5f5; }
        .container { max-width: 800px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { color: #2563eb; border-bottom: 2px solid #e5e7eb; padding-bottom: 20px; margin-bottom: 30px; }
        .badge { background: #3b82f6; color: white; padding: 5px 10px; border-radius: 5px; font-size: 12px; }
        .info { background: #f0f9ff; padding: 15px; border-radius: 5px; margin: 20px 0; }
        .success { background: #f0fdf4; color: #166534; padding: 15px; border-radius: 5px; }
        .code { background: #1f2937; color: #10b981; padding: 15px; border-radius: 5px; font-family: monospace; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🚀 Cloud Based Web Applications</h1>
          <p><span class="badge">Assignment 2</span> Dynamic Page: <strong>${path}</strong></p>
          <p>Student: <strong>Vinit Kumar (21946017)</strong></p>
        </div>
        ${pageContent}
        <div class="info">
          <h3>📊 Request Information</h3>
          <p><strong>Generated:</strong> ${new Date().toISOString()}</p>
          <p><strong>Request ID:</strong> ${event.requestContext?.requestId || 'N/A'}</p>
          <p><strong>Method:</strong> ${method}</p>
          <p><strong>Path:</strong> /${path}</p>
          <p><strong>Query Params:</strong> ${JSON.stringify(queryParams)}</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html',
      'Cache-Control': 'no-cache',
      'X-Student-ID': '21946017',
      'X-Assignment': 'Assignment-2'
    },
    body: htmlContent,
  };
};

function generateAssignment2Page() {
  return `
    <div class="success">
      <h2>✅ Assignment 2 - Enhanced Git Command Executor</h2>
      <p>This page demonstrates the Lambda function creating dynamic HTML pages for Assignment 2.</p>
    </div>
    
    <h3>🎯 Completed Requirements:</h3>
    <ul>
      <li>✅ Sequelize and Prisma Integration with Toggle</li>
      <li>✅ Full CRUD React Implementation</li>
      <li>✅ Docker and Docker Compose Setup</li>
      <li>✅ Database Operations with Save Button</li>
      <li>✅ Comprehensive Testing (2+ Test Suites)</li>
      <li>✅ Enhanced Instrumentation</li>
      <li>✅ Cloud Deployment Ready</li>
      <li>✅ Lambda Functions for Dynamic Pages</li>
    </ul>
    
    <div class="code">
      <h4>🔧 Technical Stack:</h4>
      <p>Next.js 15 + TypeScript + Prisma + Sequelize + Docker + MySQL + Playwright + AWS Lambda</p>
    </div>
  `;
}

function generateCRUDPage(params) {
  const dbType = params.dbType || 'prisma';
  return `
    <h2>🗄️ CRUD Operations Demo</h2>
    <p>Database Type: <strong>${dbType.toUpperCase()}</strong></p>
    
    <div class="info">
      <h3>Available CRUD Operations:</h3>
      <ul>
        <li><strong>CREATE:</strong> POST /api/commands</li>
        <li><strong>READ:</strong> GET /api/commands?dbType=${dbType}</li>
        <li><strong>UPDATE:</strong> PUT /api/commands/[id]</li>
        <li><strong>DELETE:</strong> DELETE /api/commands/[id]</li>
      </ul>
    </div>
    
    <div class="code">
      Example: curl -X GET "http://localhost:3000/api/commands?dbType=${dbType}"
    </div>
  `;
}

function generateDockerPage() {
  return `
    <h2>🐳 Docker Integration</h2>
    <p>This application is fully containerized with Docker support.</p>
    
    <div class="info">
      <h3>Docker Services:</h3>
      <ul>
        <li><strong>App Container:</strong> Next.js application (Port 3000)</li>
        <li><strong>Database Container:</strong> MySQL 8.0 (Port 3306)</li>
        <li><strong>Redis Container:</strong> Caching layer (Port 6379)</li>
      </ul>
    </div>
    
    <div class="code">
      <h4>Quick Start Commands:</h4>
      <p>docker-compose up -d</p>
      <p>docker-compose -f docker-compose.enhanced.yml up -d</p>
    </div>
  `;
}

function generateMetricsPage() {
  return `
    <h2>📊 Application Metrics</h2>
    <p>Real-time monitoring and observability for Assignment 2.</p>
    
    <div class="info">
      <h3>Monitored Metrics:</h3>
      <ul>
        <li>Memory Usage (Heap, RSS, External)</li>
        <li>Request Count and Response Times</li>
        <li>Database Query Performance</li>
        <li>Git Command Execution Count</li>
        <li>Error Tracking and System Health</li>
      </ul>
    </div>
    
    <div class="code">
      Access metrics: curl http://localhost:3000/api/metrics
    </div>
  `;
}

function generateHomePage(path) {
  return `
    <h2>🏠 Dynamic Page: ${path}</h2>
    <p>This is a dynamically generated page created by AWS Lambda function.</p>
    
    <div class="info">
      <h3>🎓 Assignment 2 Features:</h3>
      <p>This Lambda function demonstrates serverless dynamic page generation as required for Assignment 2.</p>
      
      <h4>Try these dynamic routes:</h4>
      <ul>
        <li><a href="/dynamic/assignment2">/dynamic/assignment2</a></li>
        <li><a href="/dynamic/crud?dbType=prisma">/dynamic/crud?dbType=prisma</a></li>
        <li><a href="/dynamic/docker">/dynamic/docker</a></li>
        <li><a href="/dynamic/metrics">/dynamic/metrics</a></li>
      </ul>
    </div>
  `;
}