export default interface Entry {
  type: "file" | "folder";
  label: string;
  dateCreated: Date;
  id: string;
}
