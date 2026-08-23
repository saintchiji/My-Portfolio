const fs = require('fs');
let code = fs.readFileSync('src/components/blocks/AboutPreviewBlock.tsx', 'utf8');

const oldReturn = `    <section className={\`w-full \${bgClasses[section.background]}\`} style={{ paddingTop: paddingValue, paddingBottom: paddingValue }}>
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-5"
          >
            {section.subtitle && (
              <h3 className="uppercase tracking-widest text-xs font-bold text-cinema-red mb-4">{section.subtitle}</h3>
            )}
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white tracking-tight mb-8">
              {section.title}
            </h2>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-7"
          >
            <p className="text-gray-300 text-lg md:text-xl font-light leading-relaxed mb-8">
              {section.description}
            </p>
            <Link to={section.buttonLink || "/about"} className="text-white hover:text-cinema-red uppercase tracking-widest text-xs font-bold transition-colors inline-flex items-center gap-2 border-b border-gray-700 hover:border-cinema-red pb-1">
              {section.buttonText || "Read About"} <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>`;

const newReturn = `    <section className={\`w-full \${bgClasses[section.background]}\`} style={{ paddingTop: paddingValue, paddingBottom: paddingValue }}>
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {section.subtitle && (
              <h3 className="uppercase tracking-widest text-xs font-bold text-cinema-red mb-4">{section.subtitle}</h3>
            )}
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white tracking-tight mb-8">
              {section.title}
            </h2>
            <p className="text-gray-300 text-lg md:text-xl font-light leading-relaxed mb-10">
              {section.description}
            </p>
            <Link to={section.buttonLink || "/about"} className="text-white hover:text-cinema-red uppercase tracking-widest text-xs font-bold transition-colors inline-flex items-center gap-2 border-b border-gray-700 hover:border-cinema-red pb-1">
              {section.buttonText || "Read About"} <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="w-full h-full relative min-h-[400px]"
          >
            {section.mediaUrl ? (
              section.mediaType === 'video' ? (
                <video src={section.mediaUrl} autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" />
              ) : (
                <img src={section.mediaUrl} alt={section.title} className="absolute inset-0 w-full h-full object-cover" />
              )
            ) : (
               <div className="absolute inset-0 w-full h-full bg-gray-900 flex items-center justify-center">
                 <span className="text-gray-700 text-xs uppercase tracking-widest">No Media Provided</span>
               </div>
            )}
            {/* Cinematic crop frame */}
            <div className="absolute inset-0 border-[1rem] border-cinema-black mix-blend-multiply opacity-50 pointer-events-none"></div>
          </motion.div>
        </div>
      </div>
    </section>`;

code = code.replace(oldReturn, newReturn);
fs.writeFileSync('src/components/blocks/AboutPreviewBlock.tsx', code);
