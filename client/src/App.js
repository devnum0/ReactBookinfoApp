import React from 'react';
import BookList from './components/BookList.js'
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from "react-apollo";
import AddBook from './components/AddBook.js';

const URL = process.env.REACT_APP_NOT_SECRET_CODE;

const client = new ApolloClient({ 
  uri: `${URL}/graphql`
})


function App() {
  return (
    <ApolloProvider client= {client}>
        <div id="main">
          <h1>Ninja's reading List</h1>
          <BookList/>
          <AddBook/>
        </div>
    </ApolloProvider>
   
  );
}

export default App;
