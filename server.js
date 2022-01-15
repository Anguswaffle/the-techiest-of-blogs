const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

// hbs.handlebars.registerHelper('compare_id', function (x, y) {
//   if (x === y) {
//     return `<div class='row'>
//     <div class='col md-3 mb-5'>
//         <button class="btn btn-sm btn-danger delete-comment" id='{{comment.id}}'>Delete</button>
//     </div>
//     <div class='col md-3 mb-5'>
//         <button class="btn btn-sm btn-secondary edit-comment">Edit</button>
//     </div>
// </div>`
//   }
//   else return;
// })

const oneDay = 1000 * 60 * 60 * 24;
const sess = {
  secret: 'sUpEr SeCrEt SeSsIoN',
  cookie: {
    maxAge: oneDay,
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
