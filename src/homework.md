Ep-16
1. Create a repository
2. Initialize a repository
3. Install Express
4. Create a server
5. Listen to port
6. write req handlers for /test, /hello
7. Install nodemon and update scripts inside package.json

EP-18
1. Multiple Route Handlers - Play with code
2. next()
3. next function and errors along with res.send()
4. app.use("/route", rH, [rH1, rH2], rH3, rH4);


Ep-19
1. Create a free cluster on MongoDb official website(Mongo Atlas)
2. Install mongodb library
3. Connect your application to the database "Connection-url"/devTinder
4. Call the connectDB function and connect to databse before starting application on 3000
5. Create a userSchema and Model
6. Create a POST /signup API to add data to db
7. Push some documents using API calls from Postman
8. Error Handling using try, catch

Ep-20
1. JS Object vs JSON (difference)
2. Add express.json middleware to your app
3. Make your signup Api dynamic to receive data from the emd user
4. User.findOne with duplicates email ids, which object returned
5. API- Get user by email
6. API- Feed API - GET /feed - get all users from the database
7. API- Get user by id
8. Difference between PATCH and PUT
9. API - Update a user
10. Explore the Mongoose Documentation for Model methods
11. What are options in a Model.findOneAndUpdate method, explore more about it
12. API- Update the user with email ID

Ep-21
1. Explore schematype options from the documentation
2. add required, unique, lowercase, min, minLength, trim
3. Add default
4. Create a custom validate function for gender
5. Improve the DB schema - PUT all appropriate validations on each field in Schema
6. Add timestamps to the userSchema
7. Add API level validations on Patch request & Signup post api
8. Data Sanitizing - Add API validations for each field
9. Install validator
10. Explore validator library function and Use validadator funcns for passwords, email
11. NEVER TRUST req.body

Ep-22
1. Validate data in Signup API
2. Install bcryt package
3. Create PasswordHash using bcrypt.hash & save the user is excrupted password
4. Create login API
5. Compare passwords and throw errors if email or password is invalid

Ep-23
1. Install cookie-parser
2. Just send a dummy cookie to user
3. Create a GET /profile API and check if you get the cookie back
4. In login API, after email and password validation, create a JWT token and send it to user in a cookies
5. Read the cookies inside your profile API and find the logged in user.
6. Write userAuth Middleware
7. Add userAuth Middleware in profile API and a new sendConnectionRequest API
8. Set the expiry of JWT token and cookies to 7 days