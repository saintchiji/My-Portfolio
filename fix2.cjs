const fs = require('fs');
let code = fs.readFileSync('src/pages/admin/SectionBuilder.tsx', 'utf8');

const startMarker = "{/* Editor Content */}";
const endMarker = "                    </div>\\n                  )}\\n                </Draggable>";

let startIndex = code.indexOf(startMarker);
let endIndex = code.indexOf("                    </div>\n                  )}\n                </Draggable>");

if (startIndex !== -1 && endIndex !== -1) {
  const newContent = `${startMarker}\n                      {expandedId === section.id && (\n                        <SectionEditor section={section} />\n                      )}\n`;
  code = code.substring(0, startIndex) + newContent + code.substring(endIndex);
}

fs.writeFileSync('src/pages/admin/SectionBuilder.tsx', code);
