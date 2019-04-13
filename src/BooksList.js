import React, { Component } from 'react';

class BookMainPage extends Component {

  state = {
    selectButton: this.props
  }

  componentDidMount() {
    console.log('componentDidMount props=', this.porps)
    this.setState({
      selectButton: this.props.optionValue
    })
  }





  updateSelectButton = (value, id, shelf) => {
    console.log(`updateSelectButton value =${value} id=${id}`)
    this.setState({ selectButton: shelf });
    console.log('moveBookFromShelfs', this.props)

    //if (this.props.moveBookFromShelfs)
    this.props.moveBookFromShelfs({ id }, value)
  }



  render() {

    const { books, shelf } = this.props;

    //const { shelf, title, authors, imageLinks } = this.props.books;
    console.log(`books of ${shelf} =`, this.props);
    console.log('state =', this.state)





    return (
      <div className="bookshelf">

        <h2 className="bookshelf-title">{shelf}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map(book => {

              const { shelf, title, authors, imageLinks, id } = book;
              console.log('shelf value =', shelf)

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
                          defaultValue={shelf}
                          onChange={(event) => this.updateSelectButton(event.target.value, id, shelf)}
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


            })


            }

          </ol>
        </div>
      </div>
    )
  }
}

export default BookMainPage;