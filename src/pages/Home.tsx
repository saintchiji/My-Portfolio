import { useSections } from '../context/SectionContext';
import BlockRenderer from '../components/blocks/BlockRenderer';

export default function Home() {
  const { sections } = useSections();
  
  // Sort by order before rendering
  const activeSections = [...sections]
    .filter(s => !s.isHidden)
    .sort((a, b) => a.order - b.order);

  return (
    <>
      {activeSections.map(section => (
        <BlockRenderer key={section.id} section={section} />
      ))}
    </>
  );
}
