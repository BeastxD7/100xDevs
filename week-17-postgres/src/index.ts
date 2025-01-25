import {Client} from 'pg';



const pgClient = new Client( "postgresql://neondb_owner:npg_USg0d4BTznIt@ep-shiny-glade-a8ruezaf-pooler.eastus2.azure.neon.tech/neondb?sslmode=require")


async function main ()  {
    await pgClient.connect();

    const response = await pgClient.query("SELECT * FROM playing_with_neon;")
    console.log(response);
}

main()

