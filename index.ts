import app from './src/app'

const port = 3000;

//start server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
});

