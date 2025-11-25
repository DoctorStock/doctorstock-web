"use client";

import { useState } from "react";
import BasicModal from "./components/BasicModal";
import PasswordResetModal from "./components/PasswordResetModal";
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";

export default function Login() {
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [autoLogin, setAutoLogin] = useState(false);
  const [saveId, setSaveId] = useState(false);
  const [isPasswordResetModalOpen, setIsPasswordResetModalOpen] =
    useState(false);
  const [isBasicModalOpen, setIsBasicModalOpen] = useState(false);
  const [basicModalMessage, setBasicModalMessage] = useState("");

  const handleSubmit = () => {};

  //버튼 활성화를 위한 폼 유효성 체크
  const isFormValid = userId.trim() !== "" && userPassword.trim() !== "";

  const handlePasswordResetSuccess = (userId: string) => {
    setBasicModalMessage(
      `아이디 ${userId}의 비밀번호를 변경하였습니다. 새로운 비밀번호로 로그인 해주세요.`
    );
    setIsBasicModalOpen(true);
  };

  return (
    <div className={styles.loginWrap}>
      <div className={styles.loginFormWrap}>
        <h1>
          <Image
            src="/assets/logo.svg"
            alt="닥터스톡로고"
            className={styles.logo}
            width={198}
            height={32}
          ></Image>
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="inputAssets">
            <label htmlFor="userId">아이디</label>
            <input
              type="text"
              id="userId"
              value={userId}
              onChange={(e) => {
                setUserId(e.target.value);
              }}
              placeholder="아이디를 입력해 주세요."
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
            <label htmlFor="userPassword">비밀번호</label>
            <input
              id="userPassword"
              type={showPassword ? "text" : "password"}
              value={userPassword}
              onChange={(e) => {
                setUserPassword(e.target.value);
              }}
              placeholder="비밀번호를 입력해 주세요."
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보이기"}
            >
              {showPassword ? (
                <img src="/assets/shown.png" alt="비밀번호 보이기" />
              ) : (
                <img src="/assets/unshown.png" alt="비밀번호 숨기기" />
              )}
            </button>
          </div>
          <div className={styles.loginCheckboxGroup}>
            <label className="custom-checkbox">
              <input
                type="checkbox"
                checked={autoLogin}
                onChange={(e) => {
                  setAutoLogin(e.target.checked);
                }}
              />
              <span>자동로그인</span>
            </label>
            <label className="custom-checkbox">
              <input
                type="checkbox"
                checked={saveId}
                onChange={(e) => {
                  setSaveId(e.target.checked);
                }}
              />
              <span>아이디저장</span>
            </label>
          </div>
          <button
            type="submit"
            disabled={!isFormValid}
            className={`btn-primary ${styles.loginSubmitBtn}`}
          >
            로그인
          </button>
          <button
            type="button"
            onClick={() => {
              setIsPasswordResetModalOpen(true);
            }}
            className={styles.passwordResetBtn}
          >
            비밀번호 재설정
          </button>
        </form>
      </div>
      <div className={styles.footerInquiry}>
        <p>닥터스톡 이용 관련 문의가 있으신가요?</p>
        <Link href="/support" className={styles.footerInquiryLink}>
          문의하기
        </Link>
      </div>
      <PasswordResetModal
        isOpen={isPasswordResetModalOpen}
        onClose={() => setIsPasswordResetModalOpen(false)}
        onSuccess={handlePasswordResetSuccess}
      />

      <BasicModal
        isOpen={isBasicModalOpen}
        onClose={() => setIsBasicModalOpen(false)}
        message={basicModalMessage}
      />
    </div>
  );
}
