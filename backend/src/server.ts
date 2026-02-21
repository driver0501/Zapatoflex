import app from './app';
import * as dotenv from 'dotenv';

dotenv.config();

const PUERTO = process.env.PORT || 3001;

app.listen(PUERTO, () => {
    console.log(`🚀 Servidor de ZapatoFlex ejecutándose en http://localhost:${PUERTO}`);
});
