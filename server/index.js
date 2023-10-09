const http = require('http')
const { PORT = 5000 } = process.env

const fs = require('fs')
const path = require('path')
const FILE_DIRECTORY = path.join(__dirname, '../public')

const mimeType = {
    ".jpg" : "image/jpg",
    ".png" : "image/png",
    ".css" : "text/css",
    ".js" : "text/javascript"
}

function getFile(isHTML, fileName) {
    const file = path.join(FILE_DIRECTORY, fileName)
    if (isHTML) {
        return fs.readFileSync(file, 'utf-8')
    } else {
        return fs.readFileSync(file)
    }
}

function onRequest(req, res) {
    if (req.url == "/") {
        res.writeHead(200)
        res.end(getFile(true, "index.html"))
        return
    } else if (req.url == "/cars") {
        res.writeHead(200)
        res.end(getFile(true, "cars.html"))
        return
    } else {
        const extension = path.extname(req.url);
        const contentType = mimeType[extension];

        if (contentType) {
            const fileContent = getFile(false, req.url);
            if (fileContent) {
                res.writeHead(200, { "Content-Type": contentType });
                res.end(fileContent);
                return;
            }
        }

        res.writeHead(404)
        res.end("error 404: not found")
        return
    }
}


const server = http.createServer(onRequest)

server.listen(PORT, 'localhost', () => {
    console.log("server berjalan di http://localhost:%d", PORT)
})