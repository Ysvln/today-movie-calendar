import "./style.scss";

import { useContext } from "react";
import Button from "@/components/Button";
import { UserInfoContext } from "@/provider/userProvider";
import { useToggle } from "@/hooks/useToggle";
import EditProfileModal from "../EditProfileModal";

const Profile = () => {
  const { isOpen, open, close } = useToggle(false);
  const { user } = useContext(UserInfoContext);
  const { name, email } = user;

  return (
    <>
      {isOpen && <EditProfileModal close={close} />}

      <div className="my-content__info">
        <h2 className="my-content__name">{name}</h2>
        <p className="my-content__email">{email}</p>
      </div>
      <div className="my-content__edit-profile">
        <Button btnType="white" onClick={open}>
          프로필 수정
        </Button>
      </div>
    </>
  );
};
export default Profile;
