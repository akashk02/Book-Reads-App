import React, { Component } from 'react'

import './App.css'
import * as BooksApi from './BooksAPI'
import BooksList from './BooksList'

class BooksApp extends Component {

    state = {
        books: []
    };



    componentDidMount() {
        BooksApi.getAll().then(books => (this.setState({ books })));
    }

    moveBooks = (book, shelf) => {
        console.log(`moveBooks books = ${book} shelf=${shelf} `)
        BooksApi.update(book, shelf).then(data => {
            console.log('update api data =', data)
            BooksApi.getAll().then(books => (this.setState({ books })));
        })

    }

    render() {

        let currentlyReading = this.state.books.filter(book => book.shelf === "currentlyReading");
        let wantToRead = this.state.books.filter(book => book.shelf === "wantToRead");
        let read = this.state.books.filter(book => book.shelf === "read");

        return (

            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">

                    <div>
                        <BooksList
                            books={currentlyReading}
                            shelf='Currently Reading'
                            moveBookFromShelfs={this.moveBooks}
                            optionValue={this.currentlyReading && this.currentlyReading[0].shelf}

                        ></BooksList>



                        <BooksList
                            books={wantToRead}
                            shelf='Want To Read'
                            moveBookFromShelfs={this.moveBooks}
                            optionValue={this.wantToRead && this.wantToRead[0].shelf}
                        >

                        </BooksList>

                        <BooksList
                            books={read}
                            shelf='Read'
                            moveBookFromShelfs={this.moveBooks}
                            optionValue={this.read && this.read[0].shelf}

                        >

                        </BooksList>


                    </div>

                </div>
            </div>




        )


    }

}

export default BooksApp;
