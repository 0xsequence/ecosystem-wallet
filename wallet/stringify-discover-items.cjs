const fs = require('fs')
const path = require('path')

const jsonPath = path.join(__dirname, 'discover-items.json')
const jsonContent = fs.readFileSync(jsonPath, 'utf8')
const data = JSON.parse(jsonContent)
const stringified = JSON.stringify(data)

console.log('Copy the following line to your .env file:\n')
console.log(`VITE_DISCOVER_ITEMS=${stringified}`)
