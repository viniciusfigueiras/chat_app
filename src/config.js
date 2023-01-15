import dotenv from 'dotenv';

dotenv.config(); //loads the variables into the process.env 

const port = process.env.PORT || 3000;


export default port;