import { Sequelize } from "sequelize";
import config from '../config/config.js'

const sequelize = new Sequelize(
    config.database, config.userName, config.pass,
    {
        host: config.host,
        dialect: config.dialect,
        port: config.port
    }
)

export default sequelize;