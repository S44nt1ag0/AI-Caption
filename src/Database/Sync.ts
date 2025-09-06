import User from "./Models/UserModel";

const databaseSync = () => {
    User.sync({ alter: true })
}

export default databaseSync;
