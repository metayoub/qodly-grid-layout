import { Element } from '@ws-ui/craftjs-core';
import { FC, useRef, useState } from 'react';
import { ICards } from './Layouts.config';
import cn from 'classnames';

interface ILayoutFilterProps {
  resolver: any;
  data: ICards[];
  onFilter: (filteredData: ICards[]) => void;
}

const LayoutFilter: FC<ILayoutFilterProps> = ({ resolver, data, onFilter }) => {
  const [selectedItems, setSelectedItems] = useState<string[]>(data.map((item) => item.title)); // so that the checkboxes are all selected at first
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const inputRefs: { [key: string]: React.RefObject<HTMLInputElement> } = {};

  data.forEach((item) => {
    //used to set the checkbox with refs equal to the item.title value
    inputRefs[item.title] = useRef<HTMLInputElement>(null);
  });

  const toggleCheckbox = (value: string) => {
    const updatedSelection = selectedItems.slice();
    if (updatedSelection.includes(value)) {
      updatedSelection.splice(updatedSelection.indexOf(value), 1);
    } else {
      updatedSelection.push(value);
    }
    setSelectedItems(updatedSelection);

    const filteredData = data.filter((item) => updatedSelection.includes(item.title));
    onFilter(filteredData);
  };

  //used to manage the checkbox visibility
  const handleClick = () => {
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  return (
    <div className={cn('filter-box', 'p-2 flex justify-end gap-4')}>
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
      <div
        className={cn(
          'filter-select-multi',
          'p-2 h-fit w-1/4 border-2 border-gray-300 cursor-pointer rounded-md flex flex-col gap-2',
        )}
        onClick={handleClick}
      >
        <div className={cn('filter-text', 'text-gray-500')}>Filter by cards:</div>
        <div
          className={cn('filter-check', 'flex flex-col', { hidden: !isVisible })}
          onMouseLeave={handleMouseLeave}
        >
          {data.map((item) => (
            <div
              key={item.title}
              className={cn('filter-select-item', 'flex p-2 justify-between bg-white')}
            >
              <label>{item.title}</label>
              <input
                className={cn('filter-select-checkbox', 'cursor-pointer')}
                ref={inputRefs[item.title]}
                type="checkbox"
                checked={selectedItems.includes(item.title)}
                onChange={() => toggleCheckbox(item.title)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LayoutFilter;
