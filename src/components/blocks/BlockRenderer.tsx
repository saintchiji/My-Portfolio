import { PageSection } from '../../types';
import HeroBlock from './HeroBlock';
import PortfolioBlock from './PortfolioBlock';
import AboutPreviewBlock from './AboutPreviewBlock';
import ServicesPreviewBlock from './ServicesPreviewBlock';

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
    default:
      console.warn(`Unknown section type: ${section.type}`);
      return null;
  }
}
