const fs = require('fs');
let code = fs.readFileSync('src/components/blocks/HeroBlock.tsx', 'utf8');

// Replace the single button with buttons mapping
const oldButtonCode = `        {(section.buttonLink || section.showreelUrl) && (
          <motion.a 
            href={section.buttonLink || section.showreelUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="btn-primary group inline-flex items-center gap-4 px-8 py-4 uppercase tracking-widest text-xs font-semibold transition-colors duration-500 hover:text-white"
          >
            <Play className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
            <span>{section.buttonText || 'Play Showreel'}</span>
          </motion.a>
        )}`;

const newButtonCode = `        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {(section.buttons && section.buttons.length > 0) ? section.buttons.map((btn, index) => btn.isVisible ? (
            <motion.a 
              key={btn.id}
              href={btn.url}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 + (index * 0.1) }}
              className="btn-primary group inline-flex items-center gap-4 px-8 py-4 uppercase tracking-widest text-xs font-semibold transition-colors duration-500 hover:text-white"
            >
              <Play className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
              <span>{btn.text}</span>
            </motion.a>
          ) : null) : (section.buttonLink || section.showreelUrl) && (
            <motion.a 
              href={section.buttonLink || section.showreelUrl}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="btn-primary group inline-flex items-center gap-4 px-8 py-4 uppercase tracking-widest text-xs font-semibold transition-colors duration-500 hover:text-white"
            >
              <Play className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
              <span>{section.buttonText || 'Play Showreel'}</span>
            </motion.a>
          )}
        </div>`;

code = code.replace(oldButtonCode, newButtonCode);
fs.writeFileSync('src/components/blocks/HeroBlock.tsx', code);
