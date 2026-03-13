import 'dotenv/config'
import app from './app.js'
import shutdownUtil from './utils/shutdown.util.js'

const port = process.env.PORT || 8000

app.listen(port, ()=>console.log(`Server running on port : ${port}`))

process.on('SIGINT', ()=> shutdownUtil('SIGINT'))//Ctrl+C
process.on('SIGTERM', ()=> shutdownUtil('SIGTERM'))//Ctrl+C

process.on("uncaughtException", ()=> shutdownUtil('uncaughtException'))
process.on("unhandledRejection", ()=> shutdownUtil('unhandledRejection'))