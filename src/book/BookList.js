import React from "react";
import PropTypes from "prop-types";
import BookShelf from "./BookShelf";
import { Link } from "react-router-dom";

const BookList = (props) => {
  const handleChange = (book, shelf) => {
    props.shelfChange(book, shelf);
  };
  const SHELVES = [
    {
      title: "Currently Reading",
      id: "currentlyReading",
    },
    {
      title: "Want To Read",
      id: "wantToRead",
    },
    {
      title: "Read",
      id: "read",
    },
  ];
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        {SHELVES.map((s) => (
          <BookShelf
            key={s.id}
            books={props.books.filter((b) => b.shelf === s.id)}
            handleChange={handleChange}
            title={s.title}
          />
        ))}
      </div>
      )
      <div className="open-search">
        <Link to="/search">
          <button>Add</button>
        </Link>
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
