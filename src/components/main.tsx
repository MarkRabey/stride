import * as React from 'react';
import { connect } from 'react-redux';
import { addItem, updateItem, deleteItem, resetAll } from '../lib/actions';
import { getAllItems, getPendingItems, getCompletedItems, getPausedItems } from '../lib/reducers/item';

import Date from './Date';
import { AddNewItemForm } from './AddNewItemForm';
import { ItemList } from './ItemList';
import { Progress } from './Progress';

class Main extends React.Component<any, any> {

  constructor(props: any) {
    super(props);

    this.completeItem = this.completeItem.bind(this);
    this.pauseItem = this.pauseItem.bind(this);
    this.resumeItem = this.resumeItem.bind(this);
    this.toggleCompletedItems = this.toggleCompletedItems.bind(this);

    this.state = {
      showCompleted: false,
    };
  }

  toggleCompletedItems() {
    this.setState({
      showCompleted: !this.state.showCompleted,
    });
  }

  completeItem(item: any) {
    const pausedItem = Object.assign({}, item, {
      status: 'complete',
    });

    this.props.updateItem(pausedItem);
  }

  pauseItem(item: any) {
    const pausedItem = Object.assign({}, item, {
      status: 'paused',
    });

    this.props.updateItem(pausedItem);
  }

  resumeItem(item: any) {
    const resumedItem = Object.assign({}, item, {
      status: 'pending',
    });

    this.props.updateItem(resumedItem);
  }

  renderProgress() {
    const completedAmount = this.props.completedItems.length;
    const pausedAmount = this.props.pausedItems.length;
    const totalAmount = this.props.allItems.length;

    let completedPercentage = completedAmount / totalAmount;
    let pausedPercentage = pausedAmount / totalAmount;

    if (isNaN(completedPercentage)) {
      completedPercentage = 0;
    }

    if (isNaN(pausedPercentage)) {
      pausedPercentage = 0;
    }

    return <Progress completed={ completedPercentage } paused={ pausedPercentage } />;
  }

  render() {
    const { pendingItems, pausedItems, completedItems } = this.props;
    const { showCompleted } = this.state;
    return (
      <div>
        <Date />
        { this.renderProgress() }
        <AddNewItemForm addItem={ this.props.addItem } />
        <ItemList
          items={ pendingItems }
          completeItem={ this.completeItem }
          pauseItem={ this.pauseItem }
          resumeItem={ this.resumeItem }
          deleteItem={ this.props.deleteItem }
        />

        <ItemList
          items={ pausedItems }
          title='Do Later'
          completeItem={ this.completeItem }
          pauseItem={ this.pauseItem }
          resumeItem={ this.resumeItem }
          deleteItem={ this.props.deleteItem }
        />

        {
          showCompleted && (
            <ItemList
              items={ completedItems }
              title='Complete'
              completeItem={ this.completeItem }
              pauseItem={ this.pauseItem }
              resumeItem={ this.resumeItem }
              deleteItem={ this.props.deleteItem }
            />
          )
        }

        <button className='item-list__button  item-list__button--reset' onClick={ this.props.resetAll }>
          Reset All Items
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  allItems: getAllItems(state),
  pendingItems: getPendingItems(state),
  completedItems: getCompletedItems(state),
  pausedItems: getPausedItems(state)
});

const mapDispatchToProps = (dispatch: any) => ({
  addItem: (item: any) => dispatch(addItem(item)),
  updateItem: (item: any) => dispatch(updateItem(item)),
  deleteItem: (item: any) => dispatch(deleteItem(item)),
  resetAll: () => dispatch(resetAll())
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
