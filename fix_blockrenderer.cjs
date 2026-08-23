const fs = require('fs');
let code = fs.readFileSync('src/components/blocks/BlockRenderer.tsx', 'utf8');

code = code.replace("import ServicesPreviewBlock from './ServicesPreviewBlock';", "import ServicesPreviewBlock from './ServicesPreviewBlock';\nimport ContactBlock from './ContactBlock';\nimport FooterBlock from './FooterBlock';");

const newCases = `    case 'services-preview':
      return <ServicesPreviewBlock section={section} />;
    case 'contact':
      return <ContactBlock section={section} />;
    case 'footer':
      return <FooterBlock section={section} />;`;

code = code.replace(/    case 'services-preview':\s*return <ServicesPreviewBlock section={section} \/>;/, newCases);

fs.writeFileSync('src/components/blocks/BlockRenderer.tsx', code);
