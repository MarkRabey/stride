import * as React from 'react';
import { connect } from 'react-redux';
import { setDate, resetAll } from '../lib/actions';
import { getDate } from '../lib/reducers/date';
import * as moment from 'moment';

class Date extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.setDate = this.setDate.bind(this);
  }

  componentDidMount() {
    this.setDate();
  }

  setDate() {
    const date = {
      day: moment().date(),
      month: moment().format('MMM'),
      year: moment().year(),
      weekday: moment().format('dddd')
    };

    const local = localStorage.getItem('date');
    this.checkDate(local);
    this.props.setDate(date);
  }

  checkDate(local: any) {
    if (local !== null && moment(local).isBefore(moment().format('YYYY-MM-DD'))) {
      this.props.resetAll();
    }
    localStorage.setItem('date', moment().format('YYYY-MM-DD'));
  }

  render() {
    return (
      <div className="date">
        <div className="date__calendar">
          <div className="date__day">{this.props.date.day}</div>
          <div className="date__month-year">
            <div className="date__month">{this.props.date.month}</div>
            <div className="date__year">{this.props.date.year}</div>
          </div>
        </div>

        <div className="date__today">{this.props.date.weekday}</div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  date: getDate(state)
});

const mapDispatchToProps = (dispatch: any) => ({
  setDate: (date: any) => dispatch(setDate(date)),
  resetAll: () => dispatch(resetAll())
});

export default connect(mapStateToProps, mapDispatchToProps)(Date);
