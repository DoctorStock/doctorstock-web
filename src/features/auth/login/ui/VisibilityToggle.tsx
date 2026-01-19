interface VisibilityToggleProps {
  visible: boolean;
  onToggle: () => void;
}

export function VisibilityToggle({ visible, onToggle }: VisibilityToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={visible ? '비밀번호 숨기기' : '비밀번호 보이기'}
    >
      <img
        src={visible ? '/assets/shown.svg' : '/assets/unshown.svg'}
        alt={visible ? '보이기' : '안보이기'}
        width={24}
        height={24}
      />
    </button>
  );
}
