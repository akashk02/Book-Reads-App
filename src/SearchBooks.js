import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BooksAPI from './BooksAPI';
import * as BooksApi from './BooksAPI';


class SearchBooks extends Component {

  state = {
    searchBooks: [],
    query: ''
  }

  searchBooks = (query) => {
    BooksApi.search(query).then(searchBooks => {
      console.log('searchBooks', searchBooks)
      if (searchBooks && (!searchBooks.error))
        this.setState({ searchBooks });
    })
  }

  updateQuery = (query) => {
    this.setState({ query });
    if (query) {
      this.searchBooks(query);
    }
    else {
      this.setState({ searchBooks: [] })
    }
  }


  render() {

    const { searchBooks = [], query } = this.state;
    const filteredBooks = searchBooks && searchBooks.filter((book, i) => {
      const { title, authors, imageLinks, id } = book;
      console.log(`filter value ${i} =`, (title && authors && imageLinks && id));
      console.log(`  title = ${title} authors = ${authors} imageLinks = ${imageLinks} id=${id} `);
      return (title && authors && imageLinks && id)

    })

    if (filteredBooks === undefined) {
      filteredBooks = [];
    }

    return (
      <div>

        <div className="search-books">
          <div className="search-books-bar">
            <Link className="close-search" to="/" />
            <div className="search-books-input-wrapper">
              {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
              <input
                type="text"
                placeholder="Search by title or author"
                value={query}
                onChange={(event) => this.updateQuery(event.target.value)}
              />

            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">

              {filteredBooks &&
                (filteredBooks.map(book => {

                  const { title, authors, imageLinks, id } = book;

                  return (
                    < li key={id} >
                      <div className="book">
                        <div className="book-top">
                          <div className="book-cover" style={{
                            width: 128, height: 193, backgroundImage: `url(${imageLinks.smallThumbnail})`
                          }}></div>
                          <div className="book-shelf-changer">
                            <select
                              value={this.state.selectButton}
                              defaultValue='read'
                              onChange={(event) => this.updateSelectButton(event.target.value, id, "read")}
                            >
                              <option value="move" disabled>Move to...</option>
                              <option value="currentlyReading">Currently Reading</option>
                              <option value="wantToRead">Want to Read</option>
                              <option value="read">Read</option>
                              <option value="none">None</option>
                            </select>
                          </div>
                        </div>
                        <div className="book-title">{title}</div>
                        <div className="book-authors">{authors && authors[0]}</div>
                      </div>
                    </li>

                  )



                }))
              }


            </ol>
          </div>
        </div>


      </div>
    )
  }
}

export default SearchBooks;