import connect from "../../../../utils/db.js";
import Users from "../../../../models/Users.js";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      async authorize(credentials) {
        try {
          await connect();
          console.log("Credentials received:", credentials);

          const user = await Users.findOne({ email: credentials.email });
          console.log("User retrieved from database:", user);

          if (!user) {
            console.log("User not found");
            throw new Error("User not found");
          }

          console.log("Stored user password hash:", user.password);

      
          const isCorrectPassword = await bcryptjs.compare(
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
    error: "/admin", // Error page redirect
  },
  debug: true, // Enable NextAuth debugging
});

export { handler as GET, handler as POST };
