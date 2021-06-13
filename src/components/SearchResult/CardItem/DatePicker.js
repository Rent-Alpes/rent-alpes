import { useState, useEffect } from "react";
import "react-dates/lib/css/_datepicker.css";
import "react-dates/initialize";
import Moment from "moment";
import { extendMoment } from "moment-range";
import { DateRangePicker } from "react-dates";

const DatePicker = (props) => {
  const moment = extendMoment(Moment);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [focusedInput, setFocusedInput] = useState();
  let numberDays = 1;

  const bookings = [
    {
      startDate: moment("15/05/2021", "DD/MM/YYYY"),
      endDate: moment("21/05/2021", "DD/MM/YYYY"),
    },
    {
      startDate: moment("15/07/2021", "DD/MM/YYYY"),
      endDate: moment("21/07/2021", "DD/MM/YYYY"),
    },
    {
      startDate: moment("15/06/2021", "DD/MM/YYYY"),
      endDate: moment("21/06/2021", "DD/MM/YYYY"),
    },
  ];

  useEffect(() => {
    numberDays =
      moment(endDate, "DD-MM-YYYY").diff(
        moment(startDate, "DD-MM-YYYY"),
        "days"
      ) + 1;
    if (endDate) {
      props.nights({ startDate, endDate, numberDays });
    }
  }, [startDate, endDate]);

  const isBlocked = (date) => {
    let bookedRanges = [];
    let blocked;
    bookings.map((booking) => {
      bookedRanges = [
        ...bookedRanges,
        moment.range(booking.startDate, booking.endDate),
      ];
    });
    blocked = bookedRanges.find((range) => range.contains(date));
    return blocked;
  };

  function handleChangeDates({ startDate, endDate }) {
    setStartDate(startDate);
    setEndDate(endDate);
  }

  return (
    <DateRangePicker
      minimumNights={3}
      displayFormat="DD MMM yyyy"
      isDayBlocked={isBlocked}
      startDate={startDate} // momentPropTypes.momentObj or null,
      startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
      endDate={endDate} // momentPropTypes.momentObj or null,
      endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
      onDatesChange={handleChangeDates} // PropTypes.func.isRequired,
      focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
      onFocusChange={(focusedInput) => setFocusedInput(focusedInput)} // PropTypes.func.isRequired,
    />
  );
};

export default DatePicker;
