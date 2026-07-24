const express = require('express');
const app = express()
const PORT = process.env.PORT || 3000;

app.use(express.static("public"))

app.use((req, res, next) => {
    console.log(`[ORIGIN] ${req.method} ${req.url}`);
    next();
});

app.get('/about', (req, res) => {
  res.send('<h1>Hello From origin to About page!</h1>')
})


app.listen(PORT, () => {
  console.log(`Origin Server running on http://localhost:3000`)
})