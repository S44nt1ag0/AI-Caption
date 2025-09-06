import sequelizeConnection from "./Connection";
import User from "./Models/UserModel";
import Caption from "./Models/Captions";

export default function createRelation() {
  Caption.associate();
  User.hasMany(Caption, { foreignKey: "user_id", as: "captions" });
}
