export interface UserData {
  type: "valid" | "empty" | "invalid";
  email: string;
  password: string;
}
