import * as React from 'react';

import { Item } from './Item';

interface Props {
  items: any[];
  title: string;
  completeItem: any;
  deleteItem: any;
  pauseItem: any;
  resumeItem: any;
}

export const ItemList = (props: Props) => {
  const { items, title } = props;
  return (
    <div className="item-list">
      {items.length > 0 && title && <h2>{title}</h2>}
      {items &&
        items.map((item: any) => {
          return (
            <Item
              key={item.key}
              item={item}
              text={item.text}
              onComplete={props.completeItem}
              onDelete={props.deleteItem}
              onPause={props.pauseItem}
              onResume={props.resumeItem}
            />
          );
        })}
    </div>
  );
};
