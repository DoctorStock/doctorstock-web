"use client";

import { useState } from "react";
import BasicModal from "./components/BasicModal";
import styles from "./page.module.css";

export default function Login() {
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = () => {};

  return (
    <div>
      <div>
        <h1>
          <img
            src="/assets/logo.svg"
            alt="닥터스톡로고"
            className={styles.logo}
          />
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
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
          </div>
          <div>
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
        </form>
      </div>
    </div>
  );
}
