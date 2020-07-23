import React from "react";
import * as BooksAPI from "./BooksAPI";
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

  shelfChange = (book) => {
    if (book) {
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
    }
    this.setState((currentState) => ({
      books: currentState.books,
    }));
  };

  doSearch = (query) => {
    BooksAPI.search(query).then((result) => {
      console.log(result);
      result !== undefined
        ? this.setState((currentState) => ({
            result: result.error ? [] : result,
          }))
        : this.setState({ result: [] });
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
              shelfChange={this.shelfChange}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
