const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src');

// Reverse mapping
const replacements = {
  'bg-slate-50': 'bg-[#030014]',
  'bg-white border border-slate-200/60': 'bg-white/5',
  'bg-slate-100': 'bg-white/10',
  'bg-slate-200': 'bg-white/20',
  
  'text-slate-900': 'text-white',
  'text-slate-600': 'text-gray-300',
  'text-slate-500': 'text-gray-400',
  'text-slate-400': 'text-gray-500',

  'border-slate-100': 'border-white/5',
  'border-slate-200': 'border-white/10',
  'border-primary/20': 'border-primary/30',
  'border-primary/30': 'border-primary/50',
  'border-[var(--color-glass-border)] shadow-sm': 'border-[var(--color-glass-border)]',
  
  'hover:bg-slate-100': 'hover:bg-white/5',
  'hover:bg-slate-200': 'hover:bg-white/10',
  
  'color="#E2E8F0"': 'color="#1a0b2e"',
  
  'shadow-lg shadow-indigo-500/20': 'shadow-[0_0_20px_rgba(139,92,246,0.5)]',
  'shadow-md shadow-indigo-500/10': 'shadow-[0_0_15px_rgba(139,92,246,0.4)]',
  'shadow-xl shadow-indigo-500/20': 'shadow-[0_0_30px_rgba(139,92,246,0.5)]',
  'shadow-2xl shadow-indigo-500/30': 'shadow-[0_0_50px_rgba(139,92,246,0.6)]',
};

function processDirectory(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let original = content;
      
      for (const [key, value] of Object.entries(replacements)) {
        const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(escapedKey, 'g');
        content = content.replace(regex, value);
      }

      // Revert the edge case from contrast-fixer where text-slate-900 was changed to text-white on primary buttons
      // Since it's all text-white again, it's fine. Wait! If the contrast-fixer changed text-slate-900 back to text-white,
      // it means it's ALREADY text-white. And our text-slate-900 to text-white will convert the rest back to text-white.
      // So text-white is fully restored.
      // One edge case: "bg-white" might be present on things like hover:bg-white, but the script mapped hover:bg-white
      // oh wait, glass-panel-hover had hover:bg-white in index.css, which we already reverted.
      
      // Let's also check for any selection issues in MainLayout.jsx: selection:text-slate-900 -> selection:text-white
      content = content.replace('selection:text-white', 'selection:text-white'); // it will be converted from slate-900 automatically
      
      if (content !== original) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Reverted: ${fullPath}`);
      }
    }
  });
}

processDirectory(directoryPath);
console.log('Revert complete.');
