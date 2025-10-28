import { on } from "events";
import { defaultOverrides } from "next/dist/server/require-hook";

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
    <div className="modalOverlay">
      <div className="modalBox">
        <p>{message}</p>
        <button onClick={onClose}>확인</button>
      </div>
    </div>
  );
}
