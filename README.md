# REQUIRED (Database)

- Create a database user named chirprapp.
  - Grant all privileges to your chirpr database.
    - **Hint**: use chirpr.* in the ON part of the GRANT statement.
- Create a table named Mentions with the following fields/columns:

```none
Mentions
  userid
  chirpid
```

- Create a stored procedure named spUserMentions that returns all chirps a user is mentioned in
  - Parameters: userid
  - The result set should contain: chirpid, chip text, chirp date
  - **Tip**: be sure to insert some fake mentions so that you can test the procedure!

# REQUIRED (Node)

- In your chirpr API, use your database to store chirps instead of a file
  - Install and save the mysql NodeJS package using NPM
  - Configure your connection using createConnection
  - In each API method, make the appropriate database call to create, read, update, and delete chirps
- Create a new API method that inserts mentions
- Create a new API method that retrieves chirps that a user is mentioned in
  - Call the spUserMentions stored procedure that you created earlier

# ADVANCED

- When a chirp is created, check to see if there are mentions in the chirp text and add it to the database
  - Mentions should be put in chirps with the format @username.
    - **Example Chirp**: hi @matt it was good to see you in class!
  - If it does, add a mention to the database as well as the chirp
  - **HINT**: You'll have to parse the string and lookup the user by name (use like!)
    - If you don't have a username on your table, you can use userid (i.e. @1 instead of @matt)
- Add the ability in your app to click a username and view all of the chirps that user is mentioned in
  - Important: There is some creativity that will be needed on your part to put a good interface together that works for this!