const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {

  const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Express HTML Example</title>
        </head>
        <body>
            <h1>Hello, Express!</h1>
            <p>This is a simple HTML page served using Express.js</p>
        </body>
        </html>
    `;

    // Set the content type to HTML
    res.setHeader('Content-Type', 'text/html');
    // Send the HTML content

    res.send(htmlContent);
})

module.exports = router
