import { column, Schema, Table } from "@powersync/react-native";

const tracks = new Table(
  {
    // id column (text) is automatically included
    track: column.text,
  },
  { indexes: {} }
);

export const AppSchema = new Schema({
  tracks,
});

export type Database = (typeof AppSchema)["types"];
