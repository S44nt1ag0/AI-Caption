import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../Connection";
import User from "./UserModel";

interface CaptionAttributes {
  id: string;
  user_id: string;
  url: string;
  success: boolean;
  body: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface CaptionInput
  extends Optional<
    CaptionAttributes,
    "id" | "createdAt" | "updatedAt" | "deletedAt"
  > {}

export interface CaptionOutput extends Required<CaptionAttributes> {}

class Caption
  extends Model<CaptionAttributes, CaptionInput>
  implements CaptionAttributes
{
  public id!: string;
  public user_id!: string;
  public url!: string;
  public success!: boolean;
  public body!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  public readonly user?: User;

  public static associate() {
    Caption.belongsTo(User, {
      foreignKey: "user_id",
      as: "user",
    });
  }
}

Caption.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    success: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE,
  },
  {
    sequelize: sequelizeConnection,
    tableName: "captions",
    timestamps: true,
    paranoid: true,
  }
);

export default Caption;
