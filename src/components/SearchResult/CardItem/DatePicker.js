import { useState, useEffect } from "react";
import "react-dates/lib/css/_datepicker.css";
import "react-dates/initialize";
import Moment from "moment";
import app from "firebase/app";
import { extendMoment } from "moment-range";
import { DateRangePicker } from "react-dates";

const DatePicker = (props) => {
  const moment = extendMoment(Moment);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [focusedInput, setFocusedInput] = useState();
  const [bookingDates, setBookingDates] = useState([]);
  let numberDays = 1;
  const db = app.firestore();

  function getBookedDates() {
    db.collection("Booking")
      .where("idProperty", "==", props.id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.data());
          setBookingDates((bookingDates) => [
            ...bookingDates,
            {
              startDate: moment(doc.data().startDate, "DD/MM/YYYY"),
              endDate: moment(doc.data().endDate, "DD/MM/YYYY"),
            },
          ]);
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }
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
    getBookedDates();
    numberDays =
      moment(endDate, "DD-MM-YYYY").diff(
        moment(startDate, "DD-MM-YYYY"),
        "days"
      ) + 1;
    if (endDate) {
      props.nights({ startDate, endDate, numberDays });
    }
  }, []);
  const isBlocked = (date) => {
    console.log(bookingDates);
    let bookedRanges = [];
    let blocked;
    bookingDates.forEach((booking) => {
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
      openDirection="up"
      numberOfMonths={1}
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
