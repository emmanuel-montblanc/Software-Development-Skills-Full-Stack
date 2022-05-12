const exp = require("constants");
const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const logger = require("./middleware/logger");
const Members = require('./Members');


const app = express();

// Init middleware
//app.use(logger);

// Handlebars Middleware
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Homepage route
app.get('/', (req, res) => res.render('index', {
    title: 'Member App',
    Members
}));

// Body Parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

// Set a static folder
app.use(express.static(path.join(__dirname, "public")));

// Members API routes
app.use('/api/members', require('./routes/api/members'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
