import { Model } from "jcc-express-mvc/Eloquent";

export class User extends Model {
  protected hidden: string[] = ["password"];
}
