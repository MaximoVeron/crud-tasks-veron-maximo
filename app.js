import exrpess from 'express';
import { connectToDatabase } from './src/config/database.js';

const app = exrpess();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(PORT, async () => {
    await connectToDatabase();
    console.log(`Server is running on http://localhost:${PORT}`);
});

