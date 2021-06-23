import * as dotenv from 'dotenv'
import { Server } from '../config/server'
import {connectToDatabase} from '../database'
dotenv.config()

export const Initialize = async () => {

    connectToDatabase("mongodb://localhost:27017/desafio")
    .then(async () => (await Server()).listen(process.env.PORT || 3001))
    .then(() => console.log('Server listen on ', process.env.PORT || 3001))

}

    