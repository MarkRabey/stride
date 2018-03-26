import * as React from 'react';
import * as ProgressBar from 'react-progressbar.js';

export const Progress = (props: any) => {
  const Bar = ProgressBar.Line;

  const completeOptions = {
    strokeWidth: 2,
    color: '#62DCA5'
  };

  const pausedOptions = {
    strokeWidth: 2,
    color: '#F7F879'
  };

  return (
    <div className='progress'>
      <Bar
        progress={ props.paused }
        options={ pausedOptions }
        initialAnimate={ true }
        containerClassName={ 'progress__bar progress__bar--pause' }
      />

      <Bar
        progress={ props.completed }
        options={ completeOptions }
        initialAnimate={ true }
        containerClassName={ 'progress__bar progress__bar--complete' }
      />
    </div>
  );
};