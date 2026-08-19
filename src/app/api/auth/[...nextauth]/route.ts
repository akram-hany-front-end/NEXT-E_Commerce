import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import bcrypt from "bcryptjs";

import { connectDB } from "@/lib/mongodb";
import User from "@/app/models/User";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            name: "Credentials",

            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                },

                password: {
                    label: "Password",
                    type: "password",
                },
            },

            async authorize(credentials) {
                if (
                    !credentials?.email ||
                    !credentials?.password
                ) {
                    return null;
                }

                await connectDB();

                const user = await User.findOne({
                    email: String(credentials.email).toLowerCase(),
                }).lean();

                if (!user) {
                    return null;
                }

                const isPasswordValid = await bcrypt.compare(
                    String(credentials.password),
                    user.password
                );

                if (!isPasswordValid) {
                    return null;
                }

                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                    role: user.role,
                };
            },
        }),
    ],

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }

            return token;
        },

        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.role = token.role as
                    | "USER"
                    | "ADMIN";
            }

            return session;
        },
    },

    pages: {
        signIn: "/auth/login",
    },

    session: {
        strategy: "jwt",
    },
});