import * as React from 'react';

export class AddNewItemForm extends React.Component<any, any> {
  node: HTMLInputElement;

  constructor(props: any) {
    super(props);

    this.addItem = this.addItem.bind(this);
  }

  addItem(e: any) {
    const newItem = {
      text: this.node.value,
      key: Date.now(),
      status: 'pending',
    };

    if (!!newItem.text.trim()) {
      this.props.addItem(newItem);
    }
    e.preventDefault();
    this.node.value = '';
    this.node.focus();
  }

  render() {
    return (
      <form className='form' onSubmit={ this.addItem }>
        <input
          className='form__input'
          ref={ (node: HTMLInputElement) => this.node = node }
          placeholder='Add new item'
          autoFocus
        />

        <button className='form__button' type='submit'>
          <i className='icon-plus'></i>
        </button>
      </form>
    );
  }
}