import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors  {
      name
      bookCount
      born
    }
  }
`

export const ALL_BOOKS = gql`
  query ($genre: String) {
    allBooks (genre: $genre) {
      title
      published
      genres
      author {
        name
      }
    }
  }
`

export const ME = gql`
  query {
  me {
    favoriteGenre
  }
}

`

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title
      published
      genres
      author {
        name
        bookCount
      }
      }
  }
`

export const UPDATE_AUTHOR = gql`
  mutation editAuthor($name: String!, $born: Int!) {
    editAuthor(name: $name, born: $born) {
      name
      born
      }
    }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`