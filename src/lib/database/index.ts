const sql = require('mssql')
let sqlData = null;

const Database =  async (uri) => {
    try {
        sqlData = await sql.connect(uri)
    } catch (error) {
        console.log(error)
    }
}

export {sqlData, Database}