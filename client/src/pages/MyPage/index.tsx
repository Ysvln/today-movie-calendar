import "./style.scss";

import { Outlet } from "react-router-dom";

function MyPage() {
  return (
    <div className="my">
      <Outlet />
    </div>
  );
}

export default MyPage;
