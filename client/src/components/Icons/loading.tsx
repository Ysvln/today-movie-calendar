import "./loading.scss";

import loading from "@/assets/images/loading.gif";

const Loading = () => {
  return (
    <>
      <div className="loading">
        <img src={loading} alt="로딩" />
      </div>
    </>
  );
};

export default Loading;
