import { FC, useRef, useState } from 'react';
import { ICards } from './Layouts.config';
import cn from 'classnames';

interface ILayoutFilterProps {
  cards: ICards[];
  selectedCards?: ICards[];
  onFilter?: (filteredData: ICards[]) => void;
}

const LayoutFilter: FC<ILayoutFilterProps> = ({
  cards,
  selectedCards = [],
  onFilter = () => {},
}) => {
  const [selectedItems, setSelectedItems] = useState<string[]>(
    selectedCards.map((item) => item.title),
  ); // so that the checkboxes are all selected at first
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const inputRefs: { [key: string]: React.RefObject<HTMLInputElement> } = {};

  cards.forEach((item) => {
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

    const filteredData = cards.filter((item) => updatedSelection.includes(item.title));
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
    <div className={cn('filter-box', 'p-2 flex flex-col gap-2 items-end relative')}>
      <div
        className={cn(
          'filter-select-multi',
          'p-2 h-fit w-1/4 border-2 border-gray-300 cursor-pointer rounded-md gap-2',
        )}
      >
        <div className={cn('filter-text', 'text-gray-500')} onClick={handleClick}>
          Filter by cards:
        </div>
      </div>
      {cards.length > 0 && (
        <div
          className={cn(
            'filter-check',
            'bg-white flex flex-col p-2 h-fit w-1/4 border-2 border-gray-300 cursor-pointer rounded-md',
            { hidden: !isVisible },
          )}
          onMouseLeave={() => handleMouseLeave()}
        >
          <div className="relative">
            {cards.map((item) => (
              <div
                key={item.title}
                className={cn('filter-select-item', 'flex p-2 justify-between')}
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
      )}
    </div>
  );
};

export default LayoutFilter;
