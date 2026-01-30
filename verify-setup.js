// Quick verification script for About Admin setup
// Run with: node verify-setup.js

const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying About Admin Panel Setup...\n');

const checks = [];

// Check 1: Backend Model
const modelPath = path.join(__dirname, 'backend/src/models/About.js');
if (fs.existsSync(modelPath)) {
  const content = fs.readFileSync(modelPath, 'utf8');
  const hasNewFields = content.includes('capacityStats') && 
                       content.includes('packagingFeatures') && 
                       content.includes('industries');
  checks.push({
    name: 'Backend Model',
    status: hasNewFields ? '✅' : '❌',
    message: hasNewFields ? 'All new fields present' : 'Missing new fields'
  });
} else {
  checks.push({ name: 'Backend Model', status: '❌', message: 'File not found' });
}

// Check 2: Backend Routes
const routesPath = path.join(__dirname, 'backend/src/routes/aboutRoutes.js');
if (fs.existsSync(routesPath)) {
  const content = fs.readFileSync(routesPath, 'utf8');
  const hasRoutes = content.includes('getAbout') && content.includes('updateAbout');
  checks.push({
    name: 'Backend Routes',
    status: hasRoutes ? '✅' : '❌',
    message: hasRoutes ? 'Routes configured' : 'Routes missing'
  });
} else {
  checks.push({ name: 'Backend Routes', status: '❌', message: 'File not found' });
}

// Check 3: Admin Editor
const editorPath = path.join(__dirname, 'Adishri-Enterprises/src/admin/pages/AboutEditor.jsx');
if (fs.existsSync(editorPath)) {
  const content = fs.readFileSync(editorPath, 'utf8');
  const hasNewSections = content.includes('capacityStats') && 
                         content.includes('packagingFeatures') && 
                         content.includes('industries');
  checks.push({
    name: 'Admin Editor',
    status: hasNewSections ? '✅' : '❌',
    message: hasNewSections ? 'All sections present' : 'Missing sections'
  });
} else {
  checks.push({ name: 'Admin Editor', status: '❌', message: 'File not found' });
}

// Check 4: Frontend Component
const componentPath = path.join(__dirname, 'Adishri-Enterprises/src/views/components/Excellence.jsx');
if (fs.existsSync(componentPath)) {
  const content = fs.readFileSync(componentPath, 'utf8');
  const hasAPIIntegration = content.includes('useAbout') && 
                            content.includes('apiAbout') &&
                            content.includes('iconMap');
  checks.push({
    name: 'Frontend Component',
    status: hasAPIIntegration ? '✅' : '❌',
    message: hasAPIIntegration ? 'API integrated' : 'API integration missing'
  });
} else {
  checks.push({ name: 'Frontend Component', status: '❌', message: 'File not found' });
}

// Check 5: Frontend .env
const frontendEnvPath = path.join(__dirname, 'Adishri-Enterprises/.env');
if (fs.existsSync(frontendEnvPath)) {
  const content = fs.readFileSync(frontendEnvPath, 'utf8');
  const hasAPIUrl = content.includes('VITE_API_URL');
  checks.push({
    name: 'Frontend .env',
    status: hasAPIUrl ? '✅' : '⚠️',
    message: hasAPIUrl ? 'API URL configured' : 'API URL missing (will use default)'
  });
} else {
  checks.push({ name: 'Frontend .env', status: '⚠️', message: 'File not found (will use defaults)' });
}

// Check 6: Backend .env
const backendEnvPath = path.join(__dirname, 'backend/.env');
if (fs.existsSync(backendEnvPath)) {
  const content = fs.readFileSync(backendEnvPath, 'utf8');
  const hasMongoURI = content.includes('MONGODB_URI');
  const hasJWTSecret = content.includes('JWT_SECRET');
  checks.push({
    name: 'Backend .env',
    status: (hasMongoURI && hasJWTSecret) ? '✅' : '❌',
    message: (hasMongoURI && hasJWTSecret) ? 'Configuration complete' : 'Missing required variables'
  });
} else {
  checks.push({ name: 'Backend .env', status: '❌', message: 'File not found' });
}

// Check 7: Admin API Service
const apiServicePath = path.join(__dirname, 'Adishri-Enterprises/src/admin/services/api.js');
if (fs.existsSync(apiServicePath)) {
  const content = fs.readFileSync(apiServicePath, 'utf8');
  const hasAboutAPI = content.includes('aboutAPI');
  checks.push({
    name: 'Admin API Service',
    status: hasAboutAPI ? '✅' : '❌',
    message: hasAboutAPI ? 'aboutAPI configured' : 'aboutAPI missing'
  });
} else {
  checks.push({ name: 'Admin API Service', status: '❌', message: 'File not found' });
}

// Check 8: App Routing
const appPath = path.join(__dirname, 'Adishri-Enterprises/src/App.jsx');
if (fs.existsSync(appPath)) {
  const content = fs.readFileSync(appPath, 'utf8');
  const hasAboutRoute = content.includes('AboutEditor') && content.includes('path="about"');
  checks.push({
    name: 'App Routing',
    status: hasAboutRoute ? '✅' : '❌',
    message: hasAboutRoute ? 'About route configured' : 'About route missing'
  });
} else {
  checks.push({ name: 'App Routing', status: '❌', message: 'File not found' });
}

// Print results
console.log('═══════════════════════════════════════════════════════\n');
checks.forEach(check => {
  console.log(`${check.status} ${check.name.padEnd(25)} ${check.message}`);
});
console.log('\n═══════════════════════════════════════════════════════\n');

// Summary
const passed = checks.filter(c => c.status === '✅').length;
const warnings = checks.filter(c => c.status === '⚠️').length;
const failed = checks.filter(c => c.status === '❌').length;

console.log(`Summary: ${passed} passed, ${warnings} warnings, ${failed} failed\n`);

if (failed === 0) {
  console.log('🎉 All checks passed! Your setup is ready.\n');
  console.log('Next steps:');
  console.log('1. Start backend: cd backend && npm run dev');
  console.log('2. Start frontend: cd Adishri-Enterprises && npm run dev');
  console.log('3. Login to admin: http://localhost:5173/admin/login');
  console.log('4. Edit About: http://localhost:5173/admin/about\n');
} else {
  console.log('⚠️  Some checks failed. Please review the issues above.\n');
  console.log('See TEST_ABOUT_ADMIN_COMPLETE.md for detailed troubleshooting.\n');
}
