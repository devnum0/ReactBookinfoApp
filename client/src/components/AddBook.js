import React from 'react';
import {graphql,compose} from 'react-apollo'
import {getAuthorsQuery,getBooksQuery} from '../queries/queries'
import {addBookMutation} from '../queries/queries'




class AddBook extends React.Component{

        state= {
            name:'',
            genre:'',
            authorId:''
        }

    displayAuthors(){
        const data = this.props.getAuthorsQuery;
        if(data.loading){
            return(<option>Loading Authors...</option>);
        }else{
            return data.authors.map(author => {
                return(
                    <option key={author.id} value={author.id}>{author.name}</option>
                )
            })
        }
    }

    submitForm (e){
       e.preventDefault();
       this.props.addBookMutation({
           variables:{
               name: this.state.name,
               genre: this.state.genre,
               authorId: this.state.authorId
           },
           refetchQueries:[{query: getBooksQuery}]
       });
    }

    render(){
        return (
         <form id='add-book' onSubmit={this.submitForm.bind(this)} >
             <div className='field'>
                 <label>Book name </label>
                 <input type='text' onChange={(e) => this.setState({name:e.target.value})}/>
             </div>
             <div className='field'>
                 <label>Genre </label>
                 <select onChange={(e) => this.setState({genre:e.target.value})}>
                        <option>Catagory</option>
                        <option>Fantasy</option>
                        <option>Suspense</option>
                        <option>Thriller</option>
                        <option>Horror</option>
                    </select>
             </div>
             <div className='field'>
                 <label>Author</label>
                    <select onChange={(e) => this.setState({authorId:e.target.value})}>
                        <option>Select Author</option>
                       {this.displayAuthors()}
                    </select>
             </div>
            
            <button>+</button>


         </form>
        )
    }
}
export default compose (
    graphql(getAuthorsQuery, {name:'getAuthorsQuery'}),
    graphql(addBookMutation, {name:'addBookMutation'})
)(AddBook);