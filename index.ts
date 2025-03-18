import app from './src/app'
import 'dotenv/config'

const PORT = process.env.PORT

//start server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
});

