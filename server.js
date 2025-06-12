// const mongoose = require('mongoose');
// const dotenv = require('dotenv');

// dotenv.config({ path: './config.env' });
// const app = require('./app.js');

// const DB = process.env.DATABASE.replace(
//   'czW4A0001D0E0ysf',
//   process.env.DATABASE_PASSWORD
// );

// mongoose
//   .connect(DB, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false
//   })
//   .then(() => console.log('DB connection successful!'));

// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log(`App running on port ${port}...`);
// });
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);

// const dotenv = require('dotenv');

// dotenv.config({ path: './config.env' });
// const app = require('./app.js');

// const DB = process.env.DATABASE.replace(
//   'czW4A0001D0E0ysf',
//   process.env.DATABASE_PASSWORD
// );

// mongoose
//   .connect(DB, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
//   .then(() => console.log('DB connection successful!'));

// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log(`App running on port ${port}...`);
// });
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');

// dotenv.config({ path: './config.env' });
// const app = require('./app');

// const DB = process.env.DATABASE.replace(
//   'czW4A0001D0E0ysf',
//   encodeURIComponent(process.env.DATABASE_PASSWORD)
// );

// mongoose
//   .connect(DB)
//   .then(() => console.log('DB connection successful!'))
//   .catch(err => console.error('DB connection error:', err));

// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log(`App running on port ${port}...`);
// });


//-------------------------------------------------SERVER SETUP-------------------------------------------------
//-------------------------------------------------SERVER SETUP-------------------------------------------------

const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const connectDB = require ('./db/index.js')

const app = require('./app');

dotenv.config();
connectDB()

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

