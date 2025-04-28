import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import fileUpload from "express-fileupload";
import UsersRoute from "./routes/UsersRoutes.js";
import MaskapaiRoute from "./routes/MaskapaiRoutes.js";
import PenerbanganRoute from "./routes/PenerbanganRoutes.js";
import AuthRoute from "./routes/AuthRoutes.js";
import AdminRoute from "./routes/AdminRoutes.js";
import TransaksiRoute from "./routes/TransaksiRoutes.js";
import StatsRoute from "./routes/StatsRoutes.js";
import db from "./config/database.js";
import SequelizeStore from "connect-session-sequelize";
import dotenv from "dotenv";

// Import models
import "./models/UsersModels.js";
import "./models/MaskapaiModels.js";
import "./models/PenerbanganModels.js";
import "./models/TransaksiModels.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());
app.use(express.static("public"));

// Session configuration
const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({
    db: db
});

console.log('Session store created');

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto',
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        httpOnly: true,
        sameSite: 'lax'
    }
}));

console.log('Session middleware configured');

// Routes
app.use(AuthRoute);
app.use('/users', UsersRoute);
app.use(MaskapaiRoute);
app.use(PenerbanganRoute);
app.use(AdminRoute);
app.use(TransaksiRoute);
app.use('/stats', StatsRoute);

console.log('Routes registered');

// Test route
app.get('/test', (req, res) => {
    res.json({ message: 'Server is running' });
});

// Sync database
db.sync({ alter: true })
  .then(() => {
    console.log('Database synced successfully');
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
  });

const PORT = process.env.APP_PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
    console.log('Available routes:');
    console.log('- /auth/session');
    console.log('- /test');
});
