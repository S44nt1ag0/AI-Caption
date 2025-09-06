import { Dialect, Sequelize } from "sequelize";
import 'dotenv/config'

const dbName = process.env.DB_NAME as string;
const dbUser = process.env.DB_USER as string;
const dbHost = process.env.DB_HOST;
const dbDriver = process.env.DB_DRIVER as Dialect;
const dbPassword = process.env.DB_PASSWORD;

const validDialects: Dialect[] = [
  "mysql",
  "postgres",
  "sqlite",
  "mariadb",
  "mssql",
];

const dialect: Dialect = validDialects.includes(dbDriver as Dialect)
  ? (dbDriver as Dialect)
  : "mysql";

if (!dbName || !dbUser) {
  throw new Error("Database name and user are required");
}

const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost || "localhost",
  dialect: dialect,
  logging: false,
  define: {
    timestamps: true,
    paranoid: true,
  },
});

sequelizeConnection
  .authenticate()
  .then(() => {
    console.log("Database connection established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

export default sequelizeConnection;
