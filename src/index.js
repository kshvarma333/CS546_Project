const express = require('express')
const app = express()
const port = 3000
const configRoutes = require("./routes")
app.use(express.json());
configRoutes(app);

app.listen(port, () => console.log(`app listening on port ${port}!`));