import "./style.scss";

import { useContext } from "react";

import { UserInfoContext } from "@/provider/userProvider";
import Modal from "@/components/Modal";
import Input from "@/components/Input";
import Button from "@/components/Button";

import MESSAGE from "@/constants/message";
import { useFormValidation } from "@/hooks/useFormValidation";
import userApi from "@/apis/user";

interface EditProfileModalProps {
  close: () => void;
}

const EditProfileModal = ({ close }: EditProfileModalProps) => {
  const { user, setUser } = useContext(UserInfoContext);
  const { id, name } = user;
  const initialState = {
    name: name,
  };

  const { formState, handleInputChange, error } =
    useFormValidation(initialState);

  const isFormValid =
    !error.name && formState.name.length && name !== formState.name;

  const handleEditUserName = async () => {
    if (confirm(MESSAGE.MYPAGE.SAVE)) {
      try {
        const response = await userApi.patchUserName({
          id,
          name: formState.name,
        });
        setUser((prev) => ({ ...prev, name: response.name }));
        alert(MESSAGE.MYPAGE.COMPLETE);
        close();
      } catch (err) {
        alert(MESSAGE.ERROR.DEFAULT);
        // console.log(err);
      }
    }
  };

  return (
    <Modal title="프로필 수정" handleModalClose={close}>
      <Input
        name={"name"}
        label="이름"
        placeholder="이름을 입력해 주세요."
        value={formState.name}
        onChange={handleInputChange("name")}
        error={error.name}
      />

      <div className="button__wrapper">
        <Button disabled={!isFormValid} onClick={handleEditUserName}>
          완료
        </Button>
      </div>
    </Modal>
  );
};
export default EditProfileModal;
