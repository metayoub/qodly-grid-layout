import { Element } from '@ws-ui/craftjs-core';
import { FC } from 'react';

export interface ILayoutFilterProps {
  resolver: any;
  data: any;
}
const LayoutFilter: FC<ILayoutFilterProps> = ({ resolver }) => {
  return (
    <Element
      id="panel-filter"
      className="h-full w-full flex justify-end"
      role="layout-filter"
      is={resolver.StyleBox}
      deletable={false}
      drag
      canvas
    >
      <Element
        id="panel-filter-button"
        className="dropDownButton"
        role="layout-filter-button"
        is={resolver.Button}
        deletable={false}
        canvas
      />
      <Element
        id="panel-filter-input"
        className="dropDownChild hidden"
        role="layout-filter-input"
        is={resolver.StyleBox}
        deletable={false}
        canvas={false}
      />
    </Element>
  );
};

export default LayoutFilter;
