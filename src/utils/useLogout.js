"use client";
import { useRouter } from 'next/navigation';

export const useLogout = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
        method: "POST",
      });
      
      if (response.ok) {
        router.push("/auth/login");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return handleLogout;
};

export default useLogout;
