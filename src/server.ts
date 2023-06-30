const roversRouter = require('./routes/rovers.route');
const express = require('express');

const app = express();
const port = 8000;

app.use(express.json());
const router = express.Router();

app.use('/', router);
app.use('/rovers', roversRouter);

app.listen(port, () => {
    console.log(`Test backend is running on port ${port}`);
});
