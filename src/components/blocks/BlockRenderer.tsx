import { PageSection } from '../../types';
import HeroBlock from './HeroBlock';
import PortfolioBlock from './PortfolioBlock';
import AboutPreviewBlock from './AboutPreviewBlock';
import ServicesPreviewBlock from './ServicesPreviewBlock';
import ContactBlock from './ContactBlock';
import FooterBlock from './FooterBlock';

interface BlockRendererProps {
  section: PageSection;
}

export default function BlockRenderer({ section }: BlockRendererProps) {
  if (section.isHidden) return null;

  switch (section.type) {
    case 'hero':
      return <HeroBlock section={section} />;
    case 'portfolio':
      return <PortfolioBlock section={section} />;
    case 'about-preview':
      return <AboutPreviewBlock section={section} />;
    case 'services-preview':
      return <ServicesPreviewBlock section={section} />;
    case 'contact':
      return <ContactBlock section={section} />;
    case 'footer':
      return <FooterBlock section={section} />;
    default:
      console.warn(`Unknown section type: ${section.type}`);
      return null;
  }
}
