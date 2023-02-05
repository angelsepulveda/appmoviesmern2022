import path from 'path'
import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import http from 'http'
import mongoose from 'mongoose'
import 'dotenv/config'

import routes from './src/routes/index.js'

import middleware from 'i18next-http-middleware'

import i18next from 'i18next'
import Backend from 'i18next-fs-backend'

i18next
	.use(Backend)
	.use(middleware.LanguageDetector)
	.init({
		fallbackLng: 'es',
		lng: 'es-ES',
		backend: {
			loadPath: path.join(import.meta.url.split('/').slice(0, -1).join('/'), '/translations/{{lng}}/translation.json')
		}
	})

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(middleware.handle(i18next))

app.use('/api/v1', routes)

const port = process.env.PORT || 5000

const server = http.createServer(app)

mongoose
	.connect(process.env.MONGODB_URL)
	.then(() => {
		console.log('Mongodb connected')
		server.listen(port, () => {
			console.log(`Server listening on port ${port}`)
		})
	})
	.catch(err => {
		console.log({ err })
		process.exit(1)
	})
