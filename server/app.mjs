import http from 'node:http'

const server = http.createServer((req, res) => {
  console.log(req.url, req.method)
  const path = req.url
  res.setHeader('Access-Control-Allow-Origin', '*')

  switch (path) {
    case '/upload-chunk': {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({
        data: path
      }))
      break
    }
    case '/merge-chunk': {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({
        data: path
      }))
      break
    }
    default: {
      res.writeHead(404, { 'Content-Type': 'application/json' })
      res.end()
    }
  }
  
})

server.listen(8888)

console.log('server listening on 8888')
