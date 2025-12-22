import Portal from './Portal';

interface BasicModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

export default function BasicModal({
  isOpen,
  onClose,
  message,
}: BasicModalProps) {
  if (!isOpen) return null;

  return (
    <Portal>
      <div className='modalOverlay'>
        <div className='modalBox'>
          <p>{message}</p>
          <button onClick={onClose}>확인</button>
        </div>
      </div>
    </Portal>
  );
}
