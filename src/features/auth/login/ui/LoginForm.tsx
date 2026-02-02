import clsx from 'clsx';
import styles from './LoginForm.module.css';

import { useLoginForm } from '@/features/auth/login/';
import {
  PasswordResetModal,
  PasswordResetAlertModal,
} from '@/features/auth/password-reset/';

export function LoginForm() {
  const {
    userId,
    userPassword,
    visibility,
    autoLogin,
    saveId,
    isFormValid,

    errorMessage,
    hasError,

    isPasswordResetModalOpen,
    isPasswordResetAlertModalOpen,
    passwordResetUserId,

    setAutoLogin,
    setSaveId,
    setIsPasswordResetModalOpen,
    setIsPasswordResetAlertModalOpen,

    handleChangeUserId,
    handleChangePassword,
    toggleVisibility,
    handleSubmit,
    handlePasswordResetSuccess,
  } = useLoginForm();

  return (
    <div className={styles.loginWrap}>
      <div className={styles.loginFormWrap}>
        <h1 className={styles.logo}>
          <img
            src="/assets/logo-with-text.svg"
            alt="닥터스톡로고"
            width={198}
            height={32}
          />
        </h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          {/* 아이디 */}
          <div className={styles.inputAssets}>
            <label htmlFor="userId">아이디</label>
            <input
              id="userId"
              type="text"
              className={clsx('input', {
                'input-error': hasError,
              })}
              value={userId}
              onChange={(e) => handleChangeUserId(e.target.value)}
              placeholder="아이디를 입력해 주세요."
            />
            {userId && (
              <button
                type="button"
                onClick={() => handleChangeUserId('')}
                aria-label="아이디 지우기"
              >
                <img
                  src="/assets/input-reset.svg"
                  alt="창 비우기"
                  width={24}
                  height={24}
                />
              </button>
            )}
          </div>

          {/* 비밀번호 */}
          <div className={styles.inputAssets}>
            <label htmlFor="userPassword">비밀번호</label>
            <input
              id="userPassword"
              type={visibility ? 'text' : 'password'}
              className={clsx('input', {
                'input-error': hasError,
              })}
              value={userPassword}
              onChange={(e) => handleChangePassword(e.target.value)}
              placeholder="비밀번호를 입력해 주세요."
            />
            <button
              type="button"
              onClick={toggleVisibility}
              aria-label={visibility ? '비밀번호 숨기기' : '비밀번호 보이기'}
            >
              <img
                src={visibility ? '/assets/shown.svg' : '/assets/unshown.svg'}
                alt="비밀번호 표시 토글"
                width={24}
                height={24}
              />
            </button>
          </div>

          {/* 체크박스 */}
          <div className={styles.loginCheckboxGroup}>
            <label className="custom-checkbox">
              <input
                type="checkbox"
                checked={autoLogin}
                onChange={(e) => setAutoLogin(e.target.checked)}
              />
              <span>자동 로그인</span>
            </label>

            <label className="custom-checkbox">
              <input
                type="checkbox"
                checked={saveId}
                onChange={(e) => setSaveId(e.target.checked)}
              />
              <span>아이디 저장</span>
            </label>
          </div>

          <div className={styles.loginBtnsWrap}>
            {errorMessage && (
              <p className={clsx(styles.errorMessage, 'error-message')}>
                {errorMessage}
              </p>
            )}

            <div className={styles.loginBtnsGroup}>
              <button
                type="submit"
                disabled={!isFormValid}
                className={clsx(styles.loginSubmitBtn, 'btn-primary')}
                onClick={() => handleSubmit()}
              >
                로그인
              </button>

              <button
                type="button"
                onClick={() => setIsPasswordResetModalOpen(true)}
                className={styles.passwordResetBtn}
              >
                비밀번호 재설정
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* 모달 */}
      <PasswordResetModal
        isOpen={isPasswordResetModalOpen}
        onClose={() => setIsPasswordResetModalOpen(false)}
        onSuccess={handlePasswordResetSuccess}
      />

      <PasswordResetAlertModal
        isOpen={isPasswordResetAlertModalOpen}
        onClose={() => setIsPasswordResetAlertModalOpen(false)}
        userId={passwordResetUserId}
      />
    </div>
  );
}
