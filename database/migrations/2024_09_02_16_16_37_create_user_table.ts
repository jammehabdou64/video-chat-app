import { Schema } from "jcc-eloquent";
export class Migration {
  up() {
    return Schema.create("users", (table) => {
      table.id();
      table.string("name");
      table.string("email").unique();
      table.string("password");
      table.timestamps();
      table.softDeletes();
    });
  }
}
