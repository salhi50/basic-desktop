import type Entry from "./Entry";

export default interface EntryCell {
  // null means that the cell if empty
  entry: Entry | null;
  // cell id is constant
  id: string;
}
