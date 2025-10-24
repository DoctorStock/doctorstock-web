import { useState } from "react";
import styles from "./loginComponents.module.css";

interface PasswordResetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (userId: string) => void;
}

export default function BasicModal({
  isOpen,
  onClose,
  onSuccess,
}: PasswordResetModalProps) {
  const [userId, setUserId] = useState("");
  const [CurrentPassword, setCurrentPassword] = useState("");
  const [NewPassword, setNewPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  if (!isOpen) return null;

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = () => {};

  //버튼 활성화를 위한 폼 유효성 체크
  const isFormValid =
    userId.trim() !== "" &&
    CurrentPassword.trim() !== "" &&
    NewPassword.trim() !== "" &&
    ConfirmPassword.trim() !== "";

  return (
    <div>
      <div>
        <div>
          <h3>비밀번호 재설정</h3>
          <button
            type="button"
            onClick={handleClose}
            aria-label="닫기"
            className={styles.btnClose}
          ></button>
        </div>
        <form onSubmit={handleSubmit}>
          <button type="submit" disabled={!isFormValid} className="btn-primary">
            변경하기
          </button>
        </form>
      </div>
    </div>
  );
}
