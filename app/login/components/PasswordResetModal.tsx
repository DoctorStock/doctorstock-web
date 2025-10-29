import { useState } from "react";
import styles from "./loginComponents.module.css";
import clsx from "clsx";

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
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState({
    userId: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  //버튼 활성화를 위한 폼 유효성 체크
  const isFormValid =
    userId.trim() !== "" &&
    currentPassword.trim() !== "" &&
    newPassword.trim() !== "" &&
    confirmPassword.trim() !== "";

  //비밀번호 유효성 검사
  const validatePassword = (password: string): boolean => {
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return password.length >= 8 && hasLetter && hasNumber && hasSpecial;
  };

  const isMatched = confirmPassword === newPassword && confirmPassword !== "";
  let confirmMessage = "";

  if (confirmPassword === "") {
    confirmMessage = "";
  } else if (confirmPassword === newPassword) {
    confirmMessage = "비밀번호가 일치합니다.";
  } else {
    confirmMessage = "비밀번호가 불일치합니다다다.";
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      userId: "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    };

    if (!validatePassword(newPassword)) {
      newErrors.newPassword =
        "영문, 숫자, 특수문자를 포함하여 8자 이상 입력해 주세요.";
      setErrors(newErrors);
      return;
    }

    if (newPassword === currentPassword) {
      newErrors.newPassword =
        "현재 비밀번호와 동일합니다. 다른 비밀번호를 사용해 주세요.";
      setErrors(newErrors);
      return;
    }

    if (!isMatched) {
      newErrors.confirmPassword = confirmMessage;
      setErrors(newErrors);
      return;
    }

    try {
    } catch (error) {
      console.error("비밀번호 재설정 실패:", error);
    }
  };

  const handleClose = () => {
    setUserId("");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setErrors({
      userId: "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalBox}>
        <div className={styles.modalHeader}>
          <h3>비밀번호 재설정</h3>
          <button
            type="button"
            onClick={handleClose}
            aria-label="닫기"
            className={styles.btnClose}
          ></button>
        </div>
        <div className={styles.modalContent}>
          <form onSubmit={handleSubmit}>
            <div className="inputAssets">
              <label htmlFor="modal-userId">아이디</label>
              <input
                type="text"
                id="modal-userId"
                value={userId}
                onChange={(e) => {
                  setUserId(e.target.value);
                }}
                placeholder="아이디를 입력해 주세요."
                className={clsx(errors.userId && "input-error")}
              />
              {userId && (
                <button
                  type="button"
                  onClick={() => setUserId("")}
                  aria-label="창 비우기"
                >
                  <img src="/assets/input-reset.png" alt="창 비우기" />
                </button>
              )}
            </div>
            <div className="inputAssets">
              <label htmlFor="modal-currentPassword">현재 비밀번호</label>
              <input
                type={showCurrentPassword ? "text" : "password"}
                id="modal-currentPassword"
                value={currentPassword}
                onChange={(e) => {
                  setCurrentPassword(e.target.value);
                }}
                placeholder="사용중인 비밀번호를 입력해 주세요."
                className={clsx(errors.currentPassword && "input-error")}
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                aria-label={
                  showCurrentPassword
                    ? "현재 비밀번호 숨기기"
                    : "현재 비밀번호 보이기"
                }
              >
                {showCurrentPassword ? (
                  <img src="/assets/shown.png" alt="현재 비밀번호 보이기" />
                ) : (
                  <img src="/assets/unshown.png" alt="현재 비밀번호 숨기기" />
                )}
              </button>
            </div>
            <div className="inputAssets">
              <label htmlFor="modal-newPassword">새 비밀번호</label>
              <input
                type={showNewPassword ? "text" : "password"}
                id="modal-newPassword"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setErrors({ ...errors, newPassword: "" });
                }}
                placeholder="영문, 숫자, 특수문자 포함 8자 이상"
                className={clsx(errors.newPassword && "input-error")}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                aria-label={
                  showNewPassword ? "새 비밀번호 숨기기" : "새 비밀번호 보이기"
                }
              >
                {showNewPassword ? (
                  <img src="/assets/shown.png" alt="새 비밀번호 보이기" />
                ) : (
                  <img src="/assets/unshown.png" alt="새 비밀번호 숨기기" />
                )}
              </button>
              <p
                className={clsx(
                  "input-message",
                  errors.newPassword ? "error-message" : "basic-message"
                )}
              >
                {errors.newPassword}
              </p>
            </div>
            <div className="inputAssets">
              <label htmlFor="modal-confirmPassword">새 비밀번호 확인</label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="modal-confirmPassword"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setErrors({ ...errors, confirmPassword: "" });
                }}
                placeholder="새 비밀번호를 한번 더 입력해주세요."
                className={clsx({
                  "input-error": !isMatched && confirmPassword !== "",
                })}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={
                  showConfirmPassword
                    ? "새 비밀번호 확인 보이기"
                    : "새 비밀번호 확인 숨기기"
                }
              >
                {showConfirmPassword ? (
                  <img src="/assets/shown.png" alt="새 비밀번호 확인 보이기" />
                ) : (
                  <img
                    src="/assets/unshown.png"
                    alt="새 비밀번호 확인 숨기기"
                  />
                )}
              </button>
              <p
                className={clsx(
                  "input-message",
                  isMatched ? "basic-message" : "error-message"
                )}
              >
                {confirmMessage}
              </p>
            </div>
            <button
              type="submit"
              disabled={!isFormValid}
              className={clsx("btn-primary", styles.submitBtn)}
            >
              변경하기
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
