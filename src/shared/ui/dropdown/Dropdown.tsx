import { useRef, useState } from 'react';
import type { CSSProperties, RefObject } from 'react';
import clsx from 'clsx';
import { useClickOutside } from '@/shared/hooks/useClickOutside';
import styles from './Dropdown.module.css';

export type DropdownOption = {
  id: string;
  label: string;
};

export type DropdownConfig = {
  options: DropdownOption[];
  value?: string;
  placeholder?: string;
  excludeSelected?: boolean;
  disabled?: boolean;
  className?: string;
  buttonClassName?: string;
  menuClassName?: string;
  menuItemClassName?: string;
  style?: CSSProperties;
  onChange: (id: string) => void;
};

export function Dropdown({
  options,
  value,
  placeholder = '선택',
  excludeSelected = false,
  disabled = false,
  className,
  buttonClassName,
  menuClassName,
  menuItemClassName,
  style,
  onChange,
}: DropdownConfig) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = value ? options.find((option) => option.id === value) : undefined;
  const selectedLabel = selectedOption?.label ?? placeholder;
  const visibleOptions = excludeSelected && value
    ? options.filter((option) => option.id !== value)
    : options;
  const selectClassName = clsx(
    styles.select,
    isOpen && styles.selectOpen,
    disabled && styles.disabled,
    buttonClassName
  );

  useClickOutside(dropdownRef as RefObject<Element>, () => setIsOpen(false), isOpen);

  return (
    <div ref={dropdownRef} className={clsx(styles.dropdown, className)} style={style}>
      <button
        type="button"
        className={selectClassName}
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
        disabled={disabled}
      >
        {selectedLabel}
      </button>
      {isOpen && !disabled && (
        <div className={clsx(styles.menu, menuClassName)}>
          {visibleOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              className={clsx(
                styles.menuItem,
                option.id === value && styles.menuItemSelected,
                menuItemClassName
              )}
              onClick={() => {
                onChange(option.id);
                setIsOpen(false);
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}