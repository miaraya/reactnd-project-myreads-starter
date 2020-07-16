import React, { Component } from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import { Route } from "react-router-dom";

class BooksApp extends React.Component {
  state = { books: [] };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        books,
      }));
      console.log(books);
    });
  }

  shelfChange = () => {
    this.setState((currentState) => ({
      books: currentState.books,
    }));
  };

  render() {
    const { books } = this.state;
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={({ history }) => (
            <BookList
              shelfChange={this.shelfChange}
              books={books}
              goSearch={() => history.push("/search")}
            />
          )}
        />
        <Route
          path="/search"
          render={({ history }) => (
            <BookSearch
              goBack={() => {
                history.push("/");
              }}
            />
          )}
        />
      </div>
    );
  }
}

const BookSearch = (props) => {
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <button className="close-search" onClick={() => props.goBack()}>
          Close
        </button>
        <div className="search-books-input-wrapper">
          <input type="text" placeholder="Search by title or author" />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid" />
      </div>
    </div>
  );
};

const BookList = (props) => {
  const { books } = props;

  const handleChange = () => {
    props.shelfChange();
  };
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <BookShelf
            books={books && books.filter((b) => b.shelf === "currentlyReading")}
            handleChange={handleChange}
            title="Currently Reading"
          />
          <BookShelf
            books={books && books.filter((b) => b.shelf === "wantToRead")}
            handleChange={handleChange}
            title="Want to Read"
          />
          <BookShelf
            books={books && books.filter((b) => b.shelf === "read")}
            handleChange={handleChange}
            title="Read"
          />
        </div>
      </div>
      <div className="open-search">
        <button onClick={() => props.goSearch()}>Add a book</button>
      </div>
    </div>
  );
};

class BookShelf extends Component {
  handleChange = () => {
    this.props.handleChange();
  };
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books &&
              this.props.books.map((book) => (
                <li key={book.id}>
                  <Book book={book} handleChange={this.handleChange} />
                </li>
              ))}
          </ol>
        </div>
      </div>
    );
  }
}

const Book = (props) => {
  const handleChange = () => {
    props.handleChange();
  };
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url("${props.book.imageLinks.smallThumbnail}")`,
          }}
        />
        <BookMenu book={props.book} handleChange={handleChange} />
      </div>
      <div className="book-title">{props.book.title}</div>
      {props.book.authors.map((a) => (
        <div key={a} className="book-authors">
          {a}
        </div>
      ))}
    </div>
  );
};

const BookMenu = (props) => {
  const handleMenuChange = (event) => {
    props.book.shelf = event.target.value;
    props.handleChange();
  };
  return (
    <div className="book-shelf-changer">
      <select onChange={handleMenuChange} defaultValue="none">
        <option value="move" disabled>
          Move to...
        </option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
  );
};

export default BooksApp;
