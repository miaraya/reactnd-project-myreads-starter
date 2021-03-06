import React from "react";
import * as BooksAPI from "./book/BooksAPI";
import "./App.css";
import { Route } from "react-router-dom";
import BookSearch from "./book/BookSearch";
import BookList from "./book/BookList";

class BooksApp extends React.Component {
  state = { books: [], result: [], query: "" };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        books,
      }));
    });
  }

  addBook = (book, shelf) => {
    book.shelf = shelf;
    BooksAPI.update(book, shelf);
    this.setState((currentState) => ({
      books: [...currentState.books, book],
    }));
    console.log(this.state.books);
  };

  shelfChange = (book, shelf) => {
    BooksAPI.update(book, shelf);
    book.shelf = shelf;
    this.setState((currentState) => ({
      books: currentState.books,
    }));
  };

  doSearch = (query) => {
    BooksAPI.search(query).then((result) => {
      console.log(result);
      if (result !== undefined) {
        result.length &&
          result.forEach((b) => {
            b.shelf = this.state.books.find((x) => x.id === b.id)
              ? this.state.books.find((x) => x.id === b.id).shelf
              : "none";
          });
        this.state.query === query &&
          this.setState((currentState) => ({
            result: result.error ? [] : result,
          }));
      } else this.setState({ result: [] });
    });
    this.setState({ query });
  };

  render() {
    const { books, query, result } = this.state;
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
              doSearch={this.doSearch}
              query={query}
              books={result}
              addBook={this.addBook}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
