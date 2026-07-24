const express = require("express");
const app = express()
const PORT = process.env.PORT || 3001;

const axios = require("axios")

const originUrl = "http://localhost:3000"

const cache = new Map();

app.get("/{*splat}", async (req, res) => {

    // console.log(req.url)
    // console.log(req.params)

    // const response = await axios.get("http://localhost:3000"+ req.url)

    // console.log(Object.keys(response));
    // console.log(response)


    const isCached = cache.has(req.url)

    if (!isCached) {
      const response = await axios.get(originUrl + req.url)

      console.log (`[EDGE] Cache MISS: ${req.url}`)

      cache.set(req.url, response.data)
      
      res.send(response.data); 
    }
    
    else {
      console.log(`[EDGE] Cache HIT: ${req.url}`)

      res.send(cache.get(req.url))

    }
  
})

app.listen(PORT, () => {
  console.log(`Edge Server running on http://localhost:3001`)
})