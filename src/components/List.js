import React from "react";
export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Author: "",
      bookTitle: "",
      read: "",
      books: []
    };
  }
  handleChange = (event) => {
    const nam = event.target.name;
    const val = event.target.value;
    this.setState({
      [nam]: val
    });
  };
  submitHandler = (event) => {
    event.preventDefault();
    const bookTitleVal = this.state.bookTitle;
    const AuthorVal = this.state.Author;
    const readVal = this.state.read;
    if (bookTitleVal && AuthorVal) {
      this.setState((prevState) => ({
        books: [
          ...prevState.books,
          {
            bookTitle: bookTitleVal,
            Author: AuthorVal,
            read: readVal
          }
        ]
      }));
    }
  };
  updatebookstatus = (index) => {
    const booksArr = [...this.state.books];
    if (booksArr) {
      this.setState({
        books: booksArr.filter((book, bookIndex) => {
          return bookIndex !== index;
        })
      });
    }
  };
  render() {
    let books = this.state.books;
    return (
      <div>
        <form className="bookForm" onSubmit={this.submitHandler}>
          <label for="bookTitle">Title of the book</label>
          <input
            id="bookTitle"
            name="bookTitle"
            type="text"
            placeholder="Please enter book title"
            maxLength="40"
            text="Please enter the book title here"
            onChange={this.handleChange}
            required
          />
          <label for="Author">Author of the book</label>
          <input
            id="Author"
            name="Author"
            type="text"
            placeholder="Please enter the Author of book"
            maxLength="30"
            onChange={this.handleChange}
            required
          />
          <label for="read">Read</label>
          <select
            id="read"
            name="read"
            onChange={this.handleChange}
            value={this.state.read}
          >
            <option value="" hidden disabled>
              Select
            </option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          <input id="submit" type="submit" value="ADD BOOK" />
        </form>
        {books != "" ? (
          <table >
            <tr>
              <th>Book Title</th>
              <th>Author</th>
              <th>Finished (Yes/No)</th>
              <th colSpan="2">Status</th>
            </tr>
            {books.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.bookTitle}</td>
                  <td>{item.Author}</td>
                  <td>{item.read}</td>
                  <td id="settings">
                    <button
                      onClick={() => {
                        item.read === "Yes"
                          ? (item.read = "No")
                          : (item.read = "Yes");
                        this.forceUpdate();
                      }}
                    >
                      {item.read === "Yes" ? "Yet to Read" : "Finished"}
                    </button>
                    <button
                      onClick={() => {
                        this.updatebookstatus(index);
                      }}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}
          </table>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}