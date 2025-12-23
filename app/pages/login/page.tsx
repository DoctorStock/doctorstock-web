'use client';

import { useEffect, useState } from 'react';
import BasicModal from './components/BasicModal';
import PasswordResetModal from './components/PasswordResetModal';
import styles from './page.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { getSavedUserId } from '../../lib/auth/auth';
import { useAuth } from '@/app/hooks/useAuth';
import clsx from 'clsx';

export default function Login() {
  const [userId, setUserId] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [visibility, setVisibility] = useState(false);
  const [autoLogin, setAutoLogin] = useState(false);
  const [saveId, setSaveId] = useState(false);
  const [isPasswordResetModalOpen, setIsPasswordResetModalOpen] =
    useState(false);
  const [isBasicModalOpen, setIsBasicModalOpen] = useState(false);
  const [basicModalMessage, setBasicModalMessage] = useState('');

  const { login, errorMessage, hasLoginError, clearLoginError } = useAuth();

  //컴포넌트 마운트시, localstorage에 savedUserId가 있다면 불러오기
  useEffect(() => {
    const savedId = getSavedUserId();
    if (savedId) {
      setUserId(savedId);
      setSaveId(true);
    }
  }, []);

  //버튼 활성화를 위한 폼 유효성 체크
  const isFormValid = userId.trim() !== '' && userPassword.trim() !== '';

  const handlePasswordResetSuccess = (userId: string) => {
    setBasicModalMessage(
      `아이디 ${userId}의 비밀번호를 변경하였습니다. 새로운 비밀번호로 로그인 해주세요.`
    );
    setIsBasicModalOpen(true);
  };

  const handleChange =
    (setter: (value: string) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);

      if (hasLoginError) {
        clearLoginError();
      }
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await login({ userId, userPassword }, saveId);
  };

  return (
    <div className={styles.loginWrap}>
      <div className={styles.loginFormWrap}>
        <h1 className={styles.logo}>
          <Image
            src='/assets/logo-text.svg'
            alt='닥터스톡로고'
            width={198}
            height={32}
          ></Image>
        </h1>
        <form onSubmit={handleSubmit}>
          <div className='inputAssets'>
            <label htmlFor='userId'>아이디</label>
            <input
              type='text'
              id='userId'
              className={clsx('input', {
                'input-error': hasLoginError,
              })}
              value={userId}
              onChange={handleChange(setUserId)}
              placeholder='아이디를 입력해 주세요.'
            />
            {userId && (
              <button
                type='button'
                onClick={() => setUserId('')}
                aria-label='창 비우기'
              >
                <Image
                  src='/assets/input-reset.svg'
                  alt='창 비우기'
                  width={24}
                  height={24}
                ></Image>
              </button>
            )}
          </div>
          <div className='inputAssets'>
            <label htmlFor='userPassword'>비밀번호</label>
            <input
              id='userPassword'
              className={clsx('input', {
                'input-error': hasLoginError,
              })}
              type={visibility ? 'text' : 'password'}
              value={userPassword}
              onChange={handleChange(setUserPassword)}
              placeholder='비밀번호를 입력해 주세요.'
            />
            <button
              type='button'
              onClick={() => setVisibility(!visibility)}
              aria-label={visibility ? '비밀번호 숨기기' : '비밀번호 보이기'}
            >
              {visibility ? (
                <Image
                  src='/assets/shown.svg'
                  alt='비밀번호 보이기'
                  width={24}
                  height={24}
                ></Image>
              ) : (
                <Image
                  src='/assets/unshown.svg'
                  alt='비밀번호 숨기기'
                  width={24}
                  height={24}
                ></Image>
              )}
            </button>
          </div>
          <div className={styles.loginCheckboxGroup}>
            <label className='custom-checkbox'>
              <input
                type='checkbox'
                checked={autoLogin}
                onChange={e => {
                  setAutoLogin(e.target.checked);
                }}
              />
              <span>자동로그인</span>
            </label>
            <label className='custom-checkbox'>
              <input
                type='checkbox'
                checked={saveId}
                onChange={e => {
                  setSaveId(e.target.checked);
                }}
              />
              <span>아이디저장</span>
            </label>
          </div>
          <div className={styles.loginBtnsWrap}>
            {/* 에러 메시지 표시 */}
            {errorMessage && (
              <p
                className={clsx(
                  styles.errorMessage,
                  hasLoginError ? 'error-message' : 'basic-message'
                )}
              >
                {errorMessage}
              </p>
            )}
            <div className={styles.loginBtnsGroup}>
              <button
                type='submit'
                disabled={!isFormValid}
                className={`btn-primary ${styles.loginSubmitBtn}`}
              >
                로그인
              </button>
              <button
                type='button'
                onClick={() => {
                  setIsPasswordResetModalOpen(true);
                }}
                className={styles.passwordResetBtn}
              >
                비밀번호 재설정
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className={styles.footerInquiry}>
        <p>닥터스톡 이용 관련 문의가 있으신가요?</p>
        <Link href='/support' className={styles.footerInquiryLink}>
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
