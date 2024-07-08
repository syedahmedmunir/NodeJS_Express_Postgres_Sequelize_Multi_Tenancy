const express = require('express');
const app = express();
const multer = require('multer');
const upload = multer();
const routes = require('./routes/router');
const admin_routes = require('./routes/admin/router');

app.use(express.json());
app.use(upload.any());
app.use('/admin', admin_routes);
app.use('/', routes);


const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});