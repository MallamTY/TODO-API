const mongoose = require('mongoose')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const taskRoutes = require('./routes/todoRoutes')
const userRoutes = require('./routes/userRoute')
const {PORT, MONGO_URI} = require('./configuration/configuration')



const app = express()


//app.use(cors)
app.use(morgan('common'))
app.use(express.json())



app.use('/api/todo', taskRoutes)

app.use('/api/user', userRoutes)



const start = async() => {

    
     mongoose.connect(MONGO_URI)
     .then(()=> console.log(`\n You have successfully connected to the TODO App database \n`))
     .catch((error) => console.log(error))

     app.listen(PORT, () => {
         console.log(`\n You Application is listening on port ${PORT} \n`)
     })
    

}


start()

