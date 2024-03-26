import { useRenderer, useSources } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useEffect, useRef, useState, useMemo } from 'react';
import { useEnhancedEditor, selectResolver } from '@ws-ui/webform-editor';
import { ILayoutsProps } from './Layouts.config';
import { WidthProvider, Responsive } from 'react-grid-layout';
import LayoutElement from './LayoutElement';
import LayoutFilter from './LayoutFilter';

const Layouts: FC<ILayoutsProps> = ({
  filterMode,
  cards = [],
  marginX,
  marginY,
  rowHeight = 30,
  style,
  className,
  classNames = [],
}) => {
  const { connect } = useRenderer();
  const gridLayoutRef = useRef(null);
  const [value, setValue] = useState(() => cards);
  const [layoutData, setCards] = useState(() => cards);
  const [count, setExecutionCount] = useState(0);
  const {
    sources: { datasource: ds },
  } = useSources();

  const { resolver } = useEnhancedEditor(selectResolver);

  const ResponsiveReactGridLayout = useMemo(() => WidthProvider(Responsive), []);

  useEffect(() => {
    if (!ds) return;
    const listener = async (/* event */) => {
      const v = await ds.getValue<Array<any>>();
      const updatedArray = value.map((oldCard) => {
        const matchingNewCard = v.find((newCard) => newCard.i === oldCard.title);
        if (matchingNewCard) {
          return {
            ...oldCard,
            i: oldCard.title,
            x: matchingNewCard.x,
            y: matchingNewCard.y,
            h: matchingNewCard.h,
            w: matchingNewCard.w,
          };
        } else {
          return oldCard; // If no matching new card found, keep the old card unchanged
        }
      });
      setValue(updatedArray);
      setCards(updatedArray);
    };

    listener();

    ds.addListener('changed', listener);

    return () => {
      ds.removeListener('changed', listener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ds]);

  useEffect(() => {
    //getting the storage at the first render
    const storedLayout = localStorage.getItem('updatedCards');
    if (storedLayout != null) ds.setValue<Array<any>>(null, JSON.parse(storedLayout));
    // Destroy the GridLayout ref when component unmounts
    return () => {
      gridLayoutRef.current = null;
    };
  }, []);

  const onLayoutChange = (param: any) => {
    setExecutionCount((prevCount) => prevCount + 1);
    //to not set it at the first execution
    if (count >= 1) {
      localStorage.setItem('updatedCards', JSON.stringify(param));
    }
  };

  const filteringCards = (fitleredData: any) => {
    //used in to filter
    setCards(fitleredData);
  };
  return (
    <div ref={connect} style={style} className={cn(className, classNames)}>
      {filterMode && <LayoutFilter resolver={resolver} data={value} onFilter={filteringCards} />}
      <ResponsiveReactGridLayout
        ref={gridLayoutRef}
        className="layout"
        margin={[marginX, marginY]}
        onLayoutChange={onLayoutChange}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={rowHeight}
      >
        {layoutData.map((card) => (
          <div key={card.title} data-grid={{ ...card }}>
            <LayoutElement resolver={resolver} id={card.id} />
          </div>
        ))}
      </ResponsiveReactGridLayout>
    </div>
  );
};

export default Layouts;
