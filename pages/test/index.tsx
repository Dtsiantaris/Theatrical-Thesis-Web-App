import * as React from "react";
// components
import { UserTabs } from "../../src/components/user/UserTabs";
// hooks
import { useUserQueries } from "../../src/hooks/queries/useUserQueries";

const UserPage = () => {
  const { fetchUserInfo } = useUserQueries();

  React.useEffect(() => {
    const fetchData = async () => {
      await fetchUserInfo();
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex justify-center h-[calc(100vh-64px)]  w-full">
      <UserTabs />
    </div>
  );
};

export default UserPage;
