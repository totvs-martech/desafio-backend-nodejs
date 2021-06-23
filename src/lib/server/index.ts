import * as dotenv from 'dotenv'
import { Server } from '../config/server'
import {Database} from '../database'
dotenv.config()

export const Initialize = async () => {

    // Database('server=52.67.222.214;database=meurango;uid=usermeurango;password=77H-bDR-UFK-;Min Pool Size=5')
    // .then(async () => (await Server()).listen(process.env.PORT || 3001))
    // .then(() => console.log('Server listen on ', process.env.PORT || 3001))

    try {
        (await Server()).listen(process.env.PORT || 3001)
        console.log('Server listen on ', process.env.PORT || 3001)
    } catch (error) {
        console.log(error)
    }

  
}

    