import React, { useState, useEffect } from "react";
import Search from "./Search.js";
import SearchResults from "./SearchResults.js";
import BookingForm from "./BookingForm";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const search = searchVal => {
    console.info("TO DO!", searchVal);

    const filterBookings = bookings.filter(name => {
      return (
        name.firstName.toLowerCase().includes(searchVal.toLowerCase()) ||
        name.surname.toLowerCase().includes(searchVal.toLowerCase())
      );
    });
    setBookings(filterBookings);
  };
  const addCustomer = customer => {
    customer.id = bookings.length + 1;
    setBookings([...bookings, customer]);
  };
  useEffect(() => {
    fetch("https://cyf-react.glitch.me")
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          setHasError(true);
        }
      })

      .then(data => {
        setBookings(data);
        setIsLoading(false);
      })
      .catch(error => setHasError(true));
  }, []);

  return (
    <div className="App-content">
      <div className="container">
        <Search search={search} />
      </div>

      {hasError ? (
        <div>Oh no something went wrong!</div>
      ) : isLoading ? (
        <div>Loading...</div>
      ) : (
        <SearchResults results={bookings} setBookings={setBookings} />
      )}
      <div>
        <BookingForm addCustomer={addCustomer} />
      </div>
    </div>
  );
};

export default Bookings;
