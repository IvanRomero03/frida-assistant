import NextAuth from "next-auth";

import { authOptions } from "rbrgs/server/auth";

export default NextAuth(authOptions);
