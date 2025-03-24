import { DataSource } from "typeorm";
import 'dotenv/config'
import { profile } from "console";
import { User } from "../entity/User";
import { UserProfile } from "../entity/UserProfile";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { NutrientPreferenceLevel } from "../entity/NutrientPreferenceLevel";
import { NutrientType } from "../entity/NutrientType";
import { UserPreference } from "../entity/UserPreference";


const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    synchronize: true,
    logging: true,
    entities: [
        User,
        UserProfile,
        NutrientPreferenceLevel,
        NutrientType,
        UserPreference
    ],
    subscribers: [],
    migrations: [],
    namingStrategy: new SnakeNamingStrategy()
})


const initializeDataSource = async () => {
    try {
        await AppDataSource.initialize()
        console.log("Data source has been initialized")
    } catch (e) {
        console.error(e)
        process.exit(1)
    }
}

initializeDataSource();


export default AppDataSource
