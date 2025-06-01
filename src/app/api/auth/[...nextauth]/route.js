import connect from "../../../../utils/db.js";
import Users from "../../../../models/Users.js";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      async authorize(credentials) {
        try {
          await connect();

          const user = await Users.findOne({ email: credentials.email });

          if (!user) {
            console.log("User not found");
            throw new Error("User not found");
          }

          const isCorrectPassword = await bcrypt.compare(
            credentials.password,
            user.password
          );
          console.log("Is the entered password correct?", isCorrectPassword);

          if (!isCorrectPassword) {
            console.log("Password is incorrect");
            throw new Error("Wrong credentials");
          }

          return user;
        } catch (error) {
          console.error("Authorization error:", error.message);
          throw new Error(error.message);
        }
      },
    }),
  ],
  pages: {
    error: "/events", // error page redirect
  },
  debug: true,
});

export { handler as GET, handler as POST };
