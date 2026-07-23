const express = require('express');
const app = express()
const PORT = process.env.PORT || 3000;

app.use(express.static("public"))

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.listen(PORT, () => {
  console.log(`Origin Server running on http://localhost:3000`)
})