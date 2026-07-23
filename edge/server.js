const express = require("express");
const app = express()
const PORT = process.env.PORT || 3001;

const axios = require("axios")

app.get("/{*splat}", async (req, res) => {
    // console.log(req.url)
    // console.log(req.params)

    const response = await axios.get("http://localhost:3000"+ req.url)

    console.log(Object.keys(response));
    console.log(response)


    res.send(response.data)
  
})

app.listen(PORT, () => {
  console.log(`Edge Server running on http://localhost:3001`)
})