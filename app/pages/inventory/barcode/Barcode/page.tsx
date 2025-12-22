'use client';

// 바코드 스캔 컴포넌트
import { useState, useRef } from 'react';
import { BrowserMultiFormatReader } from '@zxing/library';
import clsx from 'clsx';
import styles from './page.module.css';

// 바코드 스캐너 컴포넌트의 Props 타입
interface BarcodeScannerProps {
  onBarcodeScanned: (barcode: string) => void;  // 바코드 스캔 완료 시 호출
}

export default function BarcodeScanner({ onBarcodeScanned }: BarcodeScannerProps) {
  const [isScanning, setIsScanning] = useState(false);              // 스캔 중 여부
  const [scannedResult, setScannedResult] = useState<string>('');   // 스캔된 결과
  const [error, setError] = useState<string>('');                   // 에러 메시지
  const [status, setStatus] = useState<string>('스캔 버튼을 눌러주세요'); // 상태 메시지
  
  const videoRef = useRef<HTMLVideoElement>(null);                     // 비디오 엘리먼트 참조
  const codeReaderRef = useRef<BrowserMultiFormatReader | null>(null); // 바코드 리더 참조

  // 바코드 스캔을 시작하는 함수
  const handleStartScan = async () => {
    if (!videoRef.current) return;

    try {
      setError('');
      setIsScanning(true);
      setScannedResult('');
      setStatus('카메라를 준비 중입니다...');

      const codeReader = new BrowserMultiFormatReader();
      codeReaderRef.current = codeReader;

      // 후면 카메라 우선
      const constraints = { video: { facingMode: "environment" } };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      videoRef.current.srcObject = stream;

      await codeReader.decodeFromStream(stream, videoRef.current, (result) => {
        if (result) {
          const barcodeText = result.getText();
          setScannedResult(barcodeText);
          setStatus('스캔 완료!');
          setIsScanning(false);
          
          // 부모 컴포넌트에 바코드 전달
          onBarcodeScanned(barcodeText);
          
          // 진동 효과 (모바일에서)
          if (navigator.vibrate) {
            navigator.vibrate(200);
          }
        }
      });

      setStatus('스캔 중... 바코드를 카메라에 비춰주세요');
    } catch (err: unknown) {
      console.error('스캔 시작 실패:', err);
      setIsScanning(false);

      if (err instanceof Error && err.name === "NotAllowedError") {
        setError("카메라 권한이 거부되었습니다. 브라우저 설정에서 카메라 권한을 허용해주세요.");
      } else if (err instanceof Error && err.name === "NotFoundError") {
        setError("사용 가능한 카메라가 없습니다.");
      } else {
        setError("카메라 접근에 실패했습니다. 브라우저 권한과 기기를 확인해주세요.");
      }
      setStatus('스캔 시작 실패');
    }
  };

  // 바코드 스캔을 중지하는 함수
  const handleStopScan = () => {
    if (codeReaderRef.current) {
      codeReaderRef.current.reset();  // 바코드 리더 리셋
      codeReaderRef.current = null;   // 참조 해제
    }
    setIsScanning(false);             // 스캔 상태 해제
    setStatus('스캔이 중지되었습니다.');    // 상태 메시지
  };

  return (
    <div className={styles.scannerContainer}>
      <h3 className={styles.title}>
        🏥 바코드 스캔
      </h3>

      <div className={styles.content}>
        <div className={styles.videoContainer}>
          <video
            ref={videoRef}
            className={styles.video}
            autoPlay
            muted
            playsInline
          />
        </div>

        <div className={styles.buttonContainer}>
          <button
            onClick={isScanning ? handleStopScan : handleStartScan}
            className={clsx(styles.scanButton, isScanning ? styles.stop : styles.start)}
          >
            {isScanning ? '스캔 중지' : '스캔 시작'}
          </button>
        </div>

        <div className={styles.status}>
          {status}
        </div>

        {scannedResult && (
          <div className={styles.result}>
            <strong>스캔 결과:</strong><br />
            {scannedResult}
          </div>
        )}

        {error && (
          <div className={styles.error}>
            ❌ {error}
          </div>
        )}
      </div>
    </div>
  );
}
