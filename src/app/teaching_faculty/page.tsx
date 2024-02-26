'use client';
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page(): React.ReactNode {

  const router = useRouter();
  useEffect(() => {
    router.push("/teaching_faculty/home");
  }, [router]);

  return null;
}