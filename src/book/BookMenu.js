import React from "react";
import PropTypes from "prop-types";

const BookMenu = (props) => {
  const shelves = [
    { value: "move", text: "Move to...", disabled: true },
    { value: "currentlyReading", text: "Currently Reading", disabled: false },
    { value: "wantToRead", text: "Want to Read", disabled: false },
    { value: "read", text: "Read", disabled: false },
    { value: "none", text: "None", disabled: false },
  ];
  const handleMenuChange = (event) => {
    props.handleChange(props.book, event.target.value);
  };
  return (
    <div className="book-shelf-changer">
      <select onChange={handleMenuChange} defaultValue={props.book.shelf}>
        {shelves.map((o) => (
          <option key={o.value} value={o.value} disabled={o.disabled}>
            {o.text}
          </option>
        ))}
      </select>
    </div>
  );
};

BookMenu.propTypes = {
  book: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default BookMenu;
