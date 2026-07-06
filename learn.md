## step 1 node.js installation 

    - https://nodejs.org/en/download


## step 2 vs code dev setup

- created backend name folder
- open with vs code
- npm -v check in terminal
- node 


## step 3 backend creation with node and express js

- npm init 
- above command creates package.json it contains all dependencies for backend which we will create
- creates index.js file which will be the main entry point 

## step 4 how to run backend or normal javascript file with the help of node 

- difference between node and nodemon
    - to run normal file we need node.js and to see continuos changes we installed nodemon with the help of   command npm i nodemon -g

- we run code for normal js file : node file path
- so we run backend:

    - we write a script in package.json
    - we wrote two scripts one for dev one for start 
    - to run the scripts we go to tomain folder in terminal where package.json exits npm run -- script key--

## step 5 Installation of express.js for creating backend server
- npm i install 
- so above command installs express for backend server dependencies we can check in it package.json
- after installation we have imported express module index.js which is main entry point
    - we sent request to server using sent method
    - we us to get message on http
    - command to get output in browser localhost:port_no

Your notes are well organized. Continue them in the same format like this:

---

# Step 6 Installation of Morgan (HTTP Request Logger)

* Install Morgan package

```bash
npm install morgan
```

* Morgan is a middleware used to log every HTTP request made to the server.

### Why do we use Morgan?

* Helps in debugging APIs.
* Displays request method, URL, response status, and response time.
* Useful during backend development.

### Import Morgan

```javascript
const morgan = require("morgan");
```

### Use Morgan Middleware

```javascript
server.use(morgan("dev"));
```

---

# Step 7 Installation of Sequelize ORM

* Install Sequelize package

```bash
npm install sequelize
```

### What is Sequelize?

* Sequelize is an **ORM (Object Relational Mapping)** for Node.js.
* It allows us to communicate with a database using JavaScript instead of writing SQL queries.
* It automatically converts JavaScript code into SQL queries.

### Example

Instead of writing SQL:

```sql
SELECT * FROM Products;
```

We simply write:

```javascript
Product.findAll();
```

### Import Sequelize

```javascript
const { Sequelize, DataTypes } = require("sequelize");
```

---

# Step 8 Installation of PostgreSQL Driver

* Install PostgreSQL packages

```bash
npm install pg
npm install pg-hstore
```

### Why are these packages required?

**pg**

* PostgreSQL driver for Node.js.
* Connects Node.js application with PostgreSQL database.

**pg-hstore**

* Helps Sequelize store JavaScript objects inside PostgreSQL.
* Required internally by Sequelize.

---

# Step 9 Database Creation in pgAdmin

* Open pgAdmin.
* Connect to PostgreSQL server.
* Expand **Databases**.
* Right-click **Databases** → **Create** → **Database**.
* Enter database name.

Example:

```
test_db
```

* Click **Save**.

### Result

A new database named **test_db** is created successfully.

---

# Step 10 Database Connection using Sequelize

* Create Sequelize object for database connection.

```javascript
const db = new Sequelize(
    "test_db",
    "postgres",
    "your_password",
    {
        host: "localhost",
        dialect: "postgres",
    }
);
```

### Explanation

**test_db**

* Database name.

**postgres**

* PostgreSQL username.

**your_password**

* PostgreSQL password.

**localhost**

* Database server is running on the local computer.

**dialect**

* Specifies the database type.

Example:

```
postgres
mysql
sqlite
mssql
```

---

# Step 11 Authenticate Database Connection

* Check whether Sequelize successfully connects to PostgreSQL.

```javascript
db.authenticate()
.then(() => {
    console.log("Database connected...");
})
.catch((err) => {
    console.log(err);
});
```

### Output

```
Database connected...
```

### Purpose

* Verifies the database connection before performing any operations.

---

# Step 12 Create Table (Model) using Sequelize

* Create a model using `define()`.

```javascript
const Product = db.define("Product", {

});
```

### What is a Model?

* A model represents a table in the database.
* Each object inside the model represents a column.

---

# Step 13 Define Table Columns

Example:

```javascript
const Product = db.define("Product", {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    name: {
        type: DataTypes.STRING
    },

    price: {
        type: DataTypes.INTEGER
    }

});
```

### Explanation

* `INTEGER` → Stores whole numbers.
* `STRING` → Stores text.
* `primaryKey` → Uniquely identifies each row.
* `autoIncrement` → Automatically increases the ID.

---

# Step 14 Synchronize Database

```javascript
db.sync({ force: true })
.then(() => {
    console.log("Database synced...");
});
```

### Purpose

* Creates the table in the database if it does not exist.
* Synchronizes the model with the database.

### `force: true`

* Drops the existing table if it already exists.
* Recreates the table from scratch.
* **Note:** All existing data will be deleted.

### Alternative

```javascript
db.sync();
```

* Creates the table only if it does not exist.

---

# Step 15 Start Backend Server

```javascript
server.listen(3000, () => {
    console.log("Server is running on port 3000");
});
```

### Purpose

* Starts the Express server.
* Makes the backend accessible at:

```
http://localhost:3000
```

### Output

```
Server is running on port 3000
```

---

## Complete Backend Flow

```
Install Node.js
        ↓
Create Backend Folder
        ↓
Initialize Node Project (npm init)
        ↓
Install Express
        ↓
Install Morgan
        ↓
Install Sequelize
        ↓
Install pg & pg-hstore
        ↓
Create PostgreSQL Database
        ↓
Connect Database using Sequelize
        ↓
Authenticate Database
        ↓
Define Model (Table)
        ↓
Sync Database
        ↓
Start Express Server
        ↓
Backend Ready for CRUD Operations
```
