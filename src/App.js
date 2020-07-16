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
  addBook = (book) => {
    const aux = this.state.books.find((x) => x.id === book.id);
    if (aux) {
      aux.shelf = book.shelf;
      this.setState((currentState) => ({
        books: currentState.books,
      }));
    } else {
      this.setState((currentState) => ({
        books: currentState.books.concat([book]),
      }));
    }
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
              handleChange={this.addBook}
            />
          )}
        />
      </div>
    );
  }
}

class BookSearch extends Component {
  state = { books: [], query: "" };
  doSearch = (query) => {
    this.setState({ query });
    BooksAPI.search(query).then((books) => {
      books !== undefined &&
        this.setState(() => ({
          books: books.error ? [] : books,
        }));

      console.log(books);
    });
  };
  handleChange = (book) => {
    this.props.handleChange(book);
  };

  render() {
    const { books } = this.state;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <button className="close-search" onClick={() => this.props.goBack()}>
            Close
          </button>
          <SearchInput doSearch={this.doSearch} />
        </div>

        <div className="search-books-results">
          <ol className="books-grid">
            {books.map((book) => {
              return (
                <li key={book.id}>
                  <Book book={book} handleChange={this.handleChange} />
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    );
  }
}

const SearchInput = (props) => {
  const handleChange = (event) => {
    props.doSearch(event.target.value);
  };
  return (
    <div className="search-books-input-wrapper">
      <input
        type="text"
        placeholder="Search by title or author"
        onChange={handleChange}
      />
    </div>
  );
};

const BookList = (props) => {
  const { books } = props;

  const handleChange = (book) => {
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

const BookShelf = (props) => {
  const handleChange = (book) => {
    props.handleChange(book);
  };
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {props.books &&
            props.books.map((book) => (
              <li key={book.id}>
                <Book book={book} handleChange={handleChange} />
              </li>
            ))}
        </ol>
      </div>
    </div>
  );
};

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

const BookMenu = (props) => {
  const shelves = [
    { value: "move", text: "Move to...", disabled: true },
    { value: "currentlyReading", text: "Currently Reading", disabled: false },
    { value: "wantToRead", text: "Want to Read", disabled: false },
    { value: "read", text: "Read", disabled: false },
    { value: "none", text: "None", disabled: false },
  ];
  const handleMenuChange = (event) => {
    props.book.shelf =
      event.target.value !== "none" ? event.target.value : props.book.shelf;
    props.handleChange(props.book);
  };
  return (
    <div className="book-shelf-changer">
      <select
        onChange={handleMenuChange}
        defaultValue={props.book.shelf ? props.book.shelf : "none"}
      >
        {shelves.map((o) => (
          <option key={o.value} value={o.value} disabled={o.disabled}>
            {o.text}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BooksApp;
