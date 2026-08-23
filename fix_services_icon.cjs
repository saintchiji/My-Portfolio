const fs = require('fs');
let code = fs.readFileSync('src/components/admin/SectionEditors.tsx', 'utf8');

const oldPl7 = `               <div className="pl-7 grid grid-cols-2 gap-4">
                  <input type="text" placeholder="Button Text (optional)" value={item.buttonText || ''} onChange={e => updateItem(item.id, { buttonText: e.target.value })} className="w-full bg-black border border-gray-700 rounded px-3 py-1.5 text-sm text-white" />
                  <input type="text" placeholder="Button URL (optional)" value={item.buttonUrl || ''} onChange={e => updateItem(item.id, { buttonUrl: e.target.value })} className="w-full bg-black border border-gray-700 rounded px-3 py-1.5 text-sm text-white" />
               </div>`;
const newPl7 = `               <div className="pl-7 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <select value={item.iconName || ''} onChange={e => updateItem(item.id, { iconName: e.target.value })} className="w-full bg-black border border-gray-700 rounded px-3 py-1.5 text-sm text-white focus:border-cinema-red outline-none">
                     <option value="">Default Icon</option>
                     <option value="Film">Film</option>
                     <option value="Scissors">Scissors</option>
                     <option value="PlaySquare">PlaySquare</option>
                     <option value="MonitorPlay">MonitorPlay</option>
                     <option value="Clapperboard">Clapperboard</option>
                  </select>
                  <input type="text" placeholder="Button Text (optional)" value={item.buttonText || ''} onChange={e => updateItem(item.id, { buttonText: e.target.value })} className="w-full bg-black border border-gray-700 rounded px-3 py-1.5 text-sm text-white" />
                  <input type="text" placeholder="Button URL (optional)" value={item.buttonUrl || ''} onChange={e => updateItem(item.id, { buttonUrl: e.target.value })} className="w-full bg-black border border-gray-700 rounded px-3 py-1.5 text-sm text-white" />
               </div>`;

code = code.replace(oldPl7, newPl7);
fs.writeFileSync('src/components/admin/SectionEditors.tsx', code);
