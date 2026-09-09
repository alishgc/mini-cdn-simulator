# Mini CDN Simulator

A simple CDN simulator built with Node.js and Express that demonstrates how origin servers, edge servers, caching, TTL expiration, and load balancing work.

## Features

- Origin server
- Edge server caching
- Cache HIT / MISS / EXPIRED logging
- TTL-based cache expiration
- Round-robin load balancer
- Two edge servers

## Project Structure

```text
mini-cdn-simulator/
├── edge/
├── origin/
├── load-balancer/
├── package.json
└── README.md
```

## Technologies Used

- Node.js
- Express.js
- Axios

## How It Works

```
              Client
                 │
                 ▼
        Load Balancer
          /        \
         ▼          ▼
     Edge 1      Edge 2
         \          /
          \        /
             ▼
      Origin Server
```

- The client sends requests to the load balancer.
- The load balancer distributes requests between the two edge servers using round-robin.
- Each edge server checks its local cache.
- If the content is cached and valid, it serves the cached response. Otherwise, it fetches fresh content from the origin server, updates the cache, and returns the response.

## Installation

```bash
git clone https://github.com/alishgc/mini-cdn-simulator.git
```
```bash
cd mini-cdn-simulator
```
```bash
npm install 
```

```bash
# Terminal 1
npm run dev-origin

# Terminal 2
npm run dev-edge1

# Terminal 3
npm run dev-edge2

# Terminal 4
npm run dev-lb
```

## Load Testing

Load testing was performed using [Autocannon](https://www.npmjs.com/package/autocannon).

| Concurrency | Avg Req/Sec | Avg Latency | Total Requests |
|---|---|---|---|
| 10  | 233.3 | 42.48 ms  | ~2,000 |
| 50  | 222.7 | 222.26 ms | ~2,000 |
| 100 | 251.4 | 391.07 ms | ~3,000 |

*Tests were run locally and are intended to demonstrate the simulator's behavior rather than measure production-level performance.*