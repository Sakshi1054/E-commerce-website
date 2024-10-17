import {app} from './app.js'
import connectDB from './db/index.js'

// create a database connection
connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running at port : ${process.env.PORT}`)
        })
    })
    .catch((error) => {
        console.log("Mongo Db connection failed !!!", error)
    })

