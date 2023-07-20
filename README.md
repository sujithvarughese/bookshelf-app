Bookshelves

Whether you are new and just brushing up on your reading, or you're a seasoned veteran when it comes to the books, Bookshelves is here to make sure you're getting the best experience while keeping you organized.

Bookshelves is a reading manager to help get the most out of our reading. Bookshelves uses the OPENLIBRARY API to connect users to millions of books worldwide. THe app lets you search, based on subject, to find books that matches your interests. The user can then add the book to their library to keep track of their progress. Once, in the library, the user can create bookshelves to organize their collection how they see fit. They can mark the books as read when finished, while saving a queue of books for the future.

Organizing into bookshelves lets the user manage multiple books at the same time, while getting the most out of each one. The note-taking feature allows users to record and remember their favorite highlights. User can create as many bookshelves as desired and add as many books as they choose.

Dev info: 

Initial startup: 
1. App start-> loads <Layout />(Navbar, Outlet, Footer)
   a. Navbar has array of links which load on render, links to different parts of app 
   b. Outlet defualts to <Home /> on app start
   c. Footer basic info

2. On <Home /> load, library of books fetched from DB, list of bookshelves(unpopulated) fetched from DB
   a. Both library and bookshelves set into global state

After initial startup, user options are:
1. Home - should show summary- few books from library and bookshelves
2. Library - list of all books, with options to remove from library or add to specified bookshelf; user can click a book to view details on book
3. Discover - can search books based on subject using OpenLibrary API 
4. Bookshelves - list of bookshelves should render, with options to select details by clicking (books in bookshelf should not be loaded here, since all books are loaded on startup. books simply can be rendered using props when user selects a bookshelf)