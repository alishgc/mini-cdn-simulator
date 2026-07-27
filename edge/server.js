const express = require("express");
const app = express()
const PORT = process.env.PORT || 3001;

const axios = require("axios")

const originUrl = "http://localhost:3000"

const cache = new Map()
const TTL = 5000


async function fetchFromOrigin(url) {

    const response = await axios.get(originUrl + url)
    cache.set(url, {
          data: response.data,
          cachedAt: Date.now()
        })
    return response
}


app.get("/{*splat}", async (req, res) => {

    const url = req.url

    const cached = cache.get(url)
    
    if (cached) {
      const isExpired = Date.now() - cached.cachedAt > TTL

      if (!isExpired) {
        console.log(`[EDGE] Cache HIT: ${url}`)
        return res.send(cached.data)
      }

      console.log(`[EDGE] Cache EXPIRED: ${url}`)

    }
    
    else {
      console.log(`[EDGE] Cache MISS: ${url}`)
    }


    try {
      const response = await fetchFromOrigin(url)
      return res.send(response.data)
      
    } catch (error) {
      console.log(error)
      res.sendStatus(error.response?.status || 500)
    }
})


app.listen(PORT, () => {
  console.log(`Edge Server running on http://localhost:${PORT}`)
})