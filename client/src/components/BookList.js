import React from 'react';
import {graphql} from 'react-apollo'
import {getBooksQuery} from '../queries/queries'
import BookDetails from './BookDetails.js'



class BookList extends React.Component{
    
    constructor(){
        super();
        this.state={
            selected: null
        }
    }

    displayBooks(){
        const data = this.props.data;
        if(data.loading){
            return(<div>Loading Books...</div>);
        }else{
            return data.books.map(book => {
                return(
                    <li key={book.id} onClick={() => {this.setState({selected: book.id})}}>{book.name}</li>
                )
            })
        }
    }
    render(){
        const value = this.state.selected === null ? "" :  <BookDetails bookId={this.state.selected}/>
        return (
            <div id='main'>
                <ul id='book-list'>
                    {this.displayBooks()}
                </ul>
                {value}
            </div>
        )
    }
}
export default graphql(getBooksQuery)(BookList)