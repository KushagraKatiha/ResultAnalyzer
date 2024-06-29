const express = require('express');
const cors = require('cors');
const fileRoutes = require('./routes/fileRoutes');
// const { errorHandler } = require('./middlewares/errorHandler');

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
}));
app.use(express.json());

app.use('/api/files', fileRoutes);

// app.use(errorHandler);

module.exports = app;
