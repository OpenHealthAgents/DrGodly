"use client";

import { useSession } from "@/modules/auth/betterauth/auth-client";

const BezsPage = () => {
  const { data } = useSession();
  console.log(data);

  return (
    <div className="flex items-center justify-center h-full">
      <h1>Bezs Page</h1>
    </div>
  );
};

export default BezsPage;
