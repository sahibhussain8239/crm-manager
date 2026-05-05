<<<<<<< HEAD
"use client";
=======
"use client"
>>>>>>> d5779b86ea80580a638e769fe0b9778f3f471a81

import { SessionProvider } from "next-auth/react";

export const AuthProvider = ({ children, session }) => {
<<<<<<< HEAD
  return <SessionProvider>{children}</SessionProvider>;
};
=======
    return <SessionProvider> {children}</SessionProvider>
};
>>>>>>> d5779b86ea80580a638e769fe0b9778f3f471a81
