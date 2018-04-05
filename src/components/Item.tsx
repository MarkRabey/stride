import * as React from 'react';

interface Props {
  text: any[];
  key: string;
  item: any;
  onDelete: any;
  onPause: any;
  onResume: any;
  onComplete: any;
}

export const Item = (props: Props) => {
  return (
    <div className={`item item--${props.item.status}`}>
      <div className="item__name">{props.text}</div>

      <div className="item__actions">
        <button
          className="item__button item__button--delete"
          onClick={() => props.onDelete(props.item)}
        >
          <i className="icon-delete" />
        </button>

        {(props.item.status === 'paused' || props.item.status === 'complete') && (
          <button
            className="item__button item__button--resume"
            onClick={() => props.onResume(props.item)}
          >
            <i className="icon-resume" />
          </button>
        )}

        {props.item.status !== 'paused' &&
          props.item.status !== 'complete' && (
            <button
              className="item__button item__button--pause"
              onClick={() => props.onPause(props.item)}
            >
              <i className="icon-pause" />
            </button>
          )}

        <button
          className="item__button item__button--complete"
          onClick={() => props.onComplete(props.item)}
        >
          <i className="icon-complete" />
        </button>
      </div>
    </div>
  );
};
