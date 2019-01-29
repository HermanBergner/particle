import express from 'express'
import router from './src/router'
import bodyParser from 'body-parser'

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(router)

app.listen(port, () => console.log(`server is running on http://localhost:${port}`))


