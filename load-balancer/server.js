const express = require("express");
const app = express()
const PORT = process.env.PORT || 8080;

const axios = require("axios")

const edges = [
    "http://localhost:3001",
    "http://localhost:3002"
]


let currentEdge = 0


app.get("/{*splat}", async (req, res) => {
    
    console.log("Before:", currentEdge);

    const selectedEdge = edges[currentEdge];

    currentEdge = (currentEdge + 1) % edges.length;

    console.log("After:", currentEdge);
    console.log("Selected:", selectedEdge);

    try {
        const response = await axios.get(selectedEdge + req.url);
        res.send(response.data);
        
    } catch (error) {
        // console.log(Object.keys(error));
        // console.log(error);
        console.log(error.response);
        res.sendStatus(error.response.status)
    }

})
    





app.listen(PORT, () => {
  console.log(`Load Balancer running on http://localhost:8080`)
})