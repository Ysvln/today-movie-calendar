import "./style.scss";

import LoadingImg from "@/assets/images/loading.gif";

const Loading = () => {
  return (
    <>
      <div className="loading-page">
        <div className="loading-page__content">
          <img src={LoadingImg} alt="로딩" />
        </div>
      </div>
    </>
  );
};

export default Loading;
