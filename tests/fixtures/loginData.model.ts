export const loginData = {
  user1: {
    type: "valid" as "valid",
    userName: process.env.USER_NAME ?? "",
    email: process.env.USER_EMAIL ?? "",
    password: process.env.USER_PASSWORD ?? "",
  },
  user2: {
    type: "empty" as "empty",
    userName: "",
    email: "",
    password: "",
  },
  user3: {
    type: "invalid" as "invalid",
    userName: "invalid-user-name",
    email: "invalid-email@invalid.com",
    password: "invalid-password",
  },
};
