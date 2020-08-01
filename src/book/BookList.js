import React from "react";
import PropTypes from "prop-types";
import BookShelf from "./BookShelf";

const BookList = (props) => {
  const handleChange = (book) => {
    props.shelfChange(book);
  };
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <BookShelf
          books={props.books.filter((b) => b.shelf === "currentlyReading")}
          handleChange={handleChange}
          title="Currently Reading"
        />
        <BookShelf
          books={props.books.filter((b) => b.shelf === "wantToRead")}
          handleChange={handleChange}
          title="Want to Read"
        />
        <BookShelf
          books={props.books.filter((b) => b.shelf === "read")}
          handleChange={handleChange}
          title="Read"
        />
      </div>
      )
      <div className="open-search">
        <button onClick={() => props.goSearch()}>Add a book</button>
      </div>
    </div>
  );
};

BookList.propTypes = {
  shelfChange: PropTypes.func.isRequired,
  books: PropTypes.array,
  goSearch: PropTypes.func.isRequired,
};

export default BookList;
