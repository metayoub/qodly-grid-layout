import { Element } from '@ws-ui/craftjs-core';
import { FC } from 'react';
import { ICards } from './Layouts.config';

export interface ILayoutFilterProps {
  resolver: any;
  data: ICards[];
}
const LayoutFilter: FC<ILayoutFilterProps> = ({ resolver, data }) => {
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
      do something to filter the layouts
    </Element>
  );
};

export default LayoutFilter;
