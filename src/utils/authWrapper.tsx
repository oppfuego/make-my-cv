import { cookies } from "next/headers";
import { ComponentType, ReactNode } from "react";
import { UserProvider } from "@/context/UserContext";
import { IUser, Nullable } from "@/types/user.types";
import { ENV } from "@/backend/config/env";
import { verifyAccessToken } from "@/backend/utils/jwt";
import { authController } from "@/backend/controllers/auth.controller";

interface WrappedComponentProps { children?: ReactNode; }

export function authWrapper<T extends WrappedComponentProps>(Component: ComponentType<T>) {
    return async function WrappedComponent(props: T) {
        let user: Nullable<IUser> = null;
        const c = await cookies();

        try {
            const accessToken = c.get(ENV.ACCESS_COOKIE_NAME || "access_token")?.value;

            if (accessToken) {
                try {
                    const payload = await verifyAccessToken<{ sub?: string; id?: string; _id?: string }>(accessToken);
                    const userId = payload.sub || payload.id || payload._id;
                    if (userId) {
                        const dbUser = await authController.me(userId);
                        if (dbUser) {
                            user = dbUser as unknown as IUser;
                        }
                    }
                } catch {
                    // Access token might be expired or invalid, will try refresh token below
                }
            }

            // 🧩 Якщо access token не підійшов — пробуємо refresh token
            if (!user) {
                const refreshToken = c.get(ENV.REFRESH_COOKIE_NAME || "refresh_token")?.value;
                if (refreshToken) {
                    try {
                        const refreshRes = await authController.refresh(refreshToken);
                        if (refreshRes?.user) {
                            user = refreshRes.user as unknown as IUser;
                        }
                    } catch (err) {
                        // Refresh token expired or session revoked
                    }
                }
            }
        } catch (e) {
            console.error("authWrapper user fetch error:", e);
        }

        return (
            <UserProvider user={user}>
                <Component {...props} />
            </UserProvider>
        );
    };
}
