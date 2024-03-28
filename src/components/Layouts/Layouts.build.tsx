import { useEnhancedNode, useEnhancedEditor, selectResolver } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC } from 'react';
import { WidthProvider, Responsive } from 'react-grid-layout';
import LayoutElement from './LayoutElement';
import { ILayoutsProps } from './Layouts.config';
import LayoutFilter from './LayoutFilter';

const Layouts: FC<ILayoutsProps> = ({
  filterMode,
  cards = [],
  marginX = 10,
  marginY = 10,
  rowHeight = 30,
  style,
  className,
  classNames = [],
}) => {
  const {
    connectors: { connect },
  } = useEnhancedNode();
  const { resolver } = useEnhancedEditor(selectResolver);

  const GridLayout = WidthProvider(Responsive);

  return (
    <div ref={connect} style={style} className={cn(className, classNames)}>
      {filterMode && <LayoutFilter cards={[]} />}
      <GridLayout
        className="layout"
        margin={[marginX, marginY]}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={rowHeight}
      >
        {cards.map((card) => (
          <div key={card.id} data-grid={{ ...card, isDraggable: false, isResizable: false }}>
            <LayoutElement resolver={resolver} id={card.id} />
          </div>
        ))}
      </GridLayout>
    </div>
  );
};

export default Layouts;
