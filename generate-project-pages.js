/**
 * generate-project-pages.js
 *
 * Reads projects from ./projects-data.js (must export an array),
 * uses project-template.html and writes files to ./projects/project-<id>.html
 *
 * Usage:
 *   node generate-project-pages.js
 *
 * Output:
 *   ./projects/project-<id>.html  (for each project)
 */

const fs = require('fs');
const path = require('path');

const projectsPath = path.join(__dirname, 'projects-data.js');
if (!fs.existsSync(projectsPath)) {
  console.error('projects-data.js not found. Please place the projects-data.js file in the same folder and ensure it exports projects (module.exports = projects).');
  process.exit(1);
}

let projects;
try {
  projects = require(projectsPath);
  if (!Array.isArray(projects)) {
    console.error('projects-data.js must export an array: module.exports = projects;');
    process.exit(1);
  }
} catch (err) {
  console.error('Error loading projects-data.js:', err.message || err);
  process.exit(1);
}

const templatePath = path.join(__dirname, 'project-template.html');
if (!fs.existsSync(templatePath)) {
  console.error('project-template.html not found. Save the provided template as project-template.html in the same folder.');
  process.exit(1);
}
const template = fs.readFileSync(templatePath, 'utf8');

function escapeHtml(s) {
  return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

const logoMap = {
  UNESCO: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/UNESCO_Logo_EN.svg',
  UNICEF: 'https://upload.wikimedia.org/wikipedia/commons/0/02/UNICEF_Logo.svg',
  KPMG: 'https://upload.wikimedia.org/wikipedia/commons/5/55/KPMG_logo.svg',
  Google: 'https://www.gstatic.com/devrel-devsite/prod/vd3f1c1f6a1b9d9e3ca2b7bb5f8e6f3f2b3b5a4f1c8fcf/brand/logo_lockup_google.svg',
  Capgemini: 'https://upload.wikimedia.org/wikipedia/commons/1/1e/Capgemini-logo.svg',
  BCG: 'https://upload.wikimedia.org/wikipedia/commons/2/23/BCG_Logo.svg',
  Cognizant: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Cognizant_logo.svg',
  TISS: 'https://upload.wikimedia.org/wikipedia/en/e/e1/TISS_Logo.png'
};

function detectLogo(p) {
  const text = (p.title + ' ' + (p.summary || '') + ' ' + (p.yearGroup || '')).toLowerCase();
  for (const k of Object.keys(logoMap)) {
    if (text.includes(k.toLowerCase())) return logoMap[k];
  }
  if ((p.title || '').toLowerCase().includes('cete') || (p.summary || '').toLowerCase().includes('cete')) {
    return logoMap.TISS;
  }
  return 'https://via.placeholder.com/400x160?text=Logo';
}

const outDir = path.join(__dirname, 'projects');
fs.mkdirSync(outDir, { recursive: true });

projects.forEach(p => {
  const id = String(p.id || p.title).replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-_]/g, '').toLowerCase();
  const filename = `project-${id}.html`;
  const outPath = path.join(outDir, filename);

  let imagesHtml = '';
  if (Array.isArray(p.images) && p.images.length) {
    imagesHtml = p.images.map(src => {
      const safe = escapeHtml(src);
      return `<img src="${safe}" alt="${escapeHtml(p.title)} image" style="max-width:100%;height:auto;border-radius:8px;margin-bottom:8px">`;
    }).join('\n');
  } else {
    imagesHtml = '<div class="muted">No images available</div>';
  }

  const startYearMatch = String(p.duration || p.yearGroup || '').match(/\b(19|20)\d{2}\b/);
  const durationDisplay = startYearMatch ? startYearMatch[0] : (p.duration || '');

  const replacements = {
    '{{TITLE}}': escapeHtml(p.title || 'Project'),
    '{{DURATION}}': escapeHtml(durationDisplay),
    '{{SUMMARY}}': escapeHtml(p.summary || ''),
    '{{IMAGES_HTML}}': imagesHtml,
    '{{LOGO_URL}}': escapeHtml(detectLogo(p)),
  };

  let content = template;
  Object.keys(replacements).forEach(key => {
    content = content.split(key).join(replacements[key]);
  });

  fs.writeFileSync(outPath, content, 'utf8');
  console.log('Written:', outPath);
});

console.log('All project detail pages written to:', outDir);