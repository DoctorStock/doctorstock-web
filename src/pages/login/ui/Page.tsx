import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Page.module.css';

export default function Login() {
  const [userId, setUserId] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [visibility, setVisibility] = useState(false);
  const [autoLogin, setAutoLogin] = useState(false);
  const [saveId, setSaveId] = useState(false);
  const navigate = useNavigate();

  // TODO: localStorage에서 저장된 아이디 불러오기
  useEffect(() => {
    const savedId = localStorage.getItem('savedUserId');
    if (savedId) {
      setUserId(savedId);
      setSaveId(true);
    }
  }, []);

  // 버튼 활성화를 위한 폼 유효성 체크
  const isFormValid = userId.trim() !== '' && userPassword.trim() !== '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // TODO: 로그인 API 호출
      console.log('Login attempt:', { userId, userPassword, autoLogin });

      // 아이디 저장 옵션
      if (saveId) {
        localStorage.setItem('savedUserId', userId);
      } else {
        localStorage.removeItem('savedUserId');
      }

      // TODO: 로그인 성공 시 토큰 저장
      // localStorage.setItem('accessToken', data.accessToken);
      // localStorage.setItem('refreshToken', data.refreshToken);

      // 임시로 홈으로 이동
      navigate('/home');
    } catch (error) {
      console.error('로그인 에러:', error);
      alert('서버 오류');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginWrap}>
        <div className={styles.loginFormWrap}>
          <h1 className={styles.logo}>
            <img src="/assets/logo.svg" alt="닥터스톡로고" width={32} height={32} />
            <span>DoctorStock</span>
          </h1>
          <form onSubmit={handleSubmit}>
            <div className={styles.inputAssets}>
              <label htmlFor="userId">아이디</label>
              <input
                type="text"
                id="userId"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="아이디를 입력해 주세요."
              />
              {userId && (
                <button
                  type="button"
                  onClick={() => setUserId('')}
                  aria-label="창 비우기"
                  className={styles.inputResetButton}
                >
                  <img src="/assets/input-reset.svg" alt="창 비우기" width={24} height={24} />
                </button>
              )}
            </div>
            <div className={styles.inputAssets}>
              <label htmlFor="userPassword">비밀번호</label>
              <input
                id="userPassword"
                type={visibility ? 'text' : 'password'}
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
                placeholder="비밀번호를 입력해 주세요."
              />
              <button
                type="button"
                onClick={() => setVisibility(!visibility)}
                aria-label={visibility ? '비밀번호 숨기기' : '비밀번호 보이기'}
                className={styles.passwordToggleButton}
              >
                {visibility ? (
                  <img src="/assets/shown.svg" alt="비밀번호 보이기" width={24} height={24} />
                ) : (
                  <img src="/assets/unshown.svg" alt="비밀번호 숨기기" width={24} height={24} />
                )}
              </button>
            </div>
            <div className={styles.loginCheckboxGroup}>
              <label className={styles.customCheckbox}>
                <input
                  type="checkbox"
                  checked={autoLogin}
                  onChange={(e) => setAutoLogin(e.target.checked)}
                />
                <span>자동로그인</span>
              </label>
              <label className={styles.customCheckbox}>
                <input
                  type="checkbox"
                  checked={saveId}
                  onChange={(e) => setSaveId(e.target.checked)}
                />
                <span>아이디저장</span>
              </label>
            </div>
            <button
              type="submit"
              disabled={!isFormValid}
              className={`${styles.loginSubmitBtn} ${styles.submitButton}`}
            >
              로그인
            </button>
            <button
              type="button"
              onClick={() => {
                // TODO: 비밀번호 재설정 모달 구현
                alert('비밀번호 재설정 기능은 준비 중입니다.');
              }}
              className={styles.passwordResetBtn}
            >
              비밀번호 재설정
            </button>
          </form>
        </div>
        <div className={styles.footerInquiry}>
          <p>닥터스톡 이용 관련 문의가 있으신가요?</p>
          <Link to="/support" className={styles.footerInquiryLink}>
            문의하기
          </Link>
        </div>
      </div>
    </div>
  );
}
