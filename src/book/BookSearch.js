import React from "react";
import PropTypes from "prop-types";
import Book from "./Book";

const BookSearch = (props) => {
  const { books, query } = props;

  const doSearch = (query) => {
    props.doSearch(query);
  };

  const handleChange = (book) => {
    props.shelfChange(book);
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <button className="close-search" onClick={() => props.goBack()}>
          Close
        </button>
        <SearchInput handleChange={doSearch} query={query} />
      </div>

      <div className="search-books-results">
        <ol className="books-grid">
          {books.map((book) => {
            return (
              <li key={book.id}>
                <Book book={book} handleChange={handleChange} />
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

const SearchInput = (props) => {
  const handleChange = (event) => {
    props.handleChange(event.target.value);
  };
  return (
    <div className="search-books-input-wrapper">
      <input
        type="text"
        placeholder={"Search by title or author"}
        onChange={handleChange}
        value={props.query}
      />
    </div>
  );
};

BookSearch.propTypes = {
  doSearch: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
  books: PropTypes.array,
  shelfChange: PropTypes.func.isRequired,
};

export default BookSearch;
