# To do list for building my blog page
- [x] Check `npm install`
- [x] Create admin page which will allow you to share/post content to a database (MongoDB).
  - [ ] Implement CKEditor 
- [x] Learn how to retrieve records from the database (only the title of the posts) to create a list on the blog-home page.
  - [ ] The list created from the retrieved records should not be more than 5 posts.
- [ ] Use the "Older Posts" button to display previous posts (records with id>5).
- [ ] After clicking on a post entry from the previously mentioned list, populate the post.html template with the contents from the database.

## Plan B
- Save every post created in the admin page as an html file in the views folder using fs (filesystem).
- Save each post in the DB too as it would help generate the list and also help in querying important information.
