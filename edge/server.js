const express = require("express");
const app = express()
const PORT = process.env.PORT || 3001;

const axios = require("axios")

const originUrl = "http://localhost:3000"

const cache = new Map()
const TTL = 5000

app.get("/{*splat}", async (req, res) => {

    // console.log(req.url)
    // console.log(req.params)

    // const response = await axios.get("http://localhost:3000"+ req.url)

    // console.log(Object.keys(response));
    // console.log(response)


    const isCached = cache.has(req.url)

    if (!isCached) {
      
      console.log (`[EDGE] Cache MISS: ${req.url}`)

      const response = await axios.get(originUrl + req.url)

      cache.set(req.url, {
        data: response.data,
        cachedAt: Date.now()
      })
      
      res.send(response.data); 
    }
    
    else {

      const cached = cache.get(req.url);

      const isExpired = Date.now() - cached.cachedAt > TTL
      
      if (isExpired) {
        
        console.log(`[EDGE] Cache EXPIRED: ${req.url}`)
        
        const response = await axios.get(originUrl + req.url)
        
        cache.set(req.url, {
          data: response.data,
          cachedAt: Date.now()
        })
        return res.send(response.data)
      }

      console.log(`[EDGE] Cache HIT: ${req.url}`)
      
      res.send(cached.data)

    }
  
})

app.listen(PORT, () => {
  console.log(`Edge Server running on http://localhost:3001`)
})