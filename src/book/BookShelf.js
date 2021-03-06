import React from "react";
import PropTypes from "prop-types";
import Book from "./Book";

const BookShelf = (props) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{`${props.title} (${props.books.length})`}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {props.books &&
            props.books.map((book) => (
              <li key={book.id}>
                <Book book={book} handleChange={props.handleChange} />
              </li>
            ))}
        </ol>
      </div>
    </div>
  );
};

BookShelf.propTypes = {
  Book: PropTypes.object,
};

export default BookShelf;
