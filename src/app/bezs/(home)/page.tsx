"use client";

import { useSession } from "@/modules/auth/betterauth/auth-client";

const BezsPage = () => {
  const { data } = useSession();
  console.log(data?.user);

  return (
    <div>
      <h1>Bezs Page</h1>
    </div>
  );
};

export default BezsPage;
