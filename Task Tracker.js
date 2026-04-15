
const fs = require('fs');
const path = './tasks.json';
const [,, cmd, val] = process.argv;

// Ensure database file exists
if (!fs.existsSync(path)) fs.writeFileSync(path, JSON.stringify([]));
const tasks = JSON.parse(fs.readFileSync(path));

const save = (data) => fs.writeFileSync(path, JSON.stringify(data, null, 2));

switch (cmd) {
  case 'add':
    tasks.push({ id: Date.now(), text: val });
    save(tasks);
    console.log('✅ Task added!');
    break;
  case 'list':
    console.log('📋 Your Tasks:');
    tasks.forEach(t => console.log(`[${t.id}] ${t.text}`));
    break;
  case 'del':
    const filtered = tasks.filter(t => t.id.toString() !== val);
    save(filtered);
    console.log('🗑️ Task deleted!');
    break;
  default:
    console.log('Usage: node task.js [add "text" | list | del id]');
}
