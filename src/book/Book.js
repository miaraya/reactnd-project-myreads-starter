import React from "react";
import PropTypes from "prop-types";
import BookMenu from "./BookMenu";

const Book = (props) => {
  const handleChange = (book) => {
    props.handleChange(book);
  };
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage:
              props.book.imageLinks &&
              `url("${props.book.imageLinks.smallThumbnail}")`,
          }}
        />
        <BookMenu book={props.book} handleChange={handleChange} />
      </div>
      <div className="book-title">{props.book.title}</div>
      {props.book.authors ? (
        props.book.authors.map((a) => (
          <div key={a} className="book-authors">
            {a}
          </div>
        ))
      ) : (
        <div className="book-authors">{"Unknown Author"}</div>
      )}
    </div>
  );
};

Book.propTypes = {
  book: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};
export default Book;
