const graphql = require('graphql');
const Book = require('./model/book.js')
const Author = require('./model/author.js')


const {
    GraphQLObjectType, 
    GraphQLString,
    GraphQLInt, 
    GraphQLSchema, 
    GraphQLList,
    GraphQLNonNull} = graphql;
    
const _= require('lodash');
const BookType = new GraphQLObjectType({
    name:'Book',
    fields: () => ({
        id: {type: GraphQLString},
        name:{type: GraphQLString},
        genre:{type: GraphQLString},
        author:{
            type: AuthorType,
            resolve(parent,args){
                // return _.find(authors,{id:parent.authorId})
                return Author.findById(parent.authorId);
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name:'Author',
    fields: () => ({
        id: {type: GraphQLString},
        name:{type: new GraphQLNonNull(GraphQLString)},
        age:{type: new GraphQLNonNull(GraphQLInt)},
        books:{
            type: new GraphQLList(BookType),
            resolve(parent,args){
                // return _.filter(books,{authorId: parent.id})
                console.log(parent.id)
                return Book.find({authorId: parent.id})

            }
        }

    })
})


let books =[
    {name: 'Name of the wind', genre:'Fantasy', id:'1', authorId:'1'},
    {name: 'Name of the wind', genre:'Horror', id:'2',authorId:'2'},
    {name: 'Name of the wind', genre:'Thriller', id:'3',authorId:'3'}
];

// let authors = [
//     {name: 'Steve Harvey', age:'44', id:'1'},
//     {name: 'James Blunt', age:'43', id:'2'},
//     {name: 'Michael Jackson', age:'45', id:'3'}
// ]



const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields: {
        book:{
            type: BookType,
            args: {id: {type: GraphQLString }},
            resolve(parent, args){
            // return  _.find(books,{id: args.id})
            console.log(args)
            return Book.findById(args.id);

            }
        },

        author:{
            type: AuthorType,
            args: {id: {type: GraphQLString }},
            resolve(parent, args){
                // return _.find(authors,{id:args.id})
                return Auth.findById(args.id);

            }
        },

        books:{
            type: new GraphQLList(BookType),
            resolve(parent,args){
                return Book.find({});
            }
        },

        authors:{
            type: new GraphQLList(AuthorType),
            resolve(parent,args){
                // return authors;
                return Author.find({});

            }
        }

    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields:{
        addAuthor:{
            type: AuthorType,
            args: {
                name:{type: GraphQLString},
                age:{type: GraphQLInt}
            },
            resolve(parent,args){
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
             return author.save()
            }
        },    
         addBook:{
            type: BookType,
            args: {
                name:{type: GraphQLString},
                genre :{type: GraphQLString},
                authorId:{type: GraphQLString}

            },
            resolve(parent,args){
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                });
             return book.save()
            }
        }



    }

})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation


})