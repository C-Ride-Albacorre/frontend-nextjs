'use client';

import { useState, useRef, useEffect } from 'react';
import { Clock, ChevronUp, ChevronDown } from 'lucide-react';
import clsx from 'clsx';

interface TimePickerProps {
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
}

const HOURS = Array.from({ length: 12 }, (_, i) =>
  String(i + 1).padStart(2, '0'),
);
const MINUTES = ['00', '15', '30', '45'];
const PERIODS = ['AM', 'PM'];

export default function TimePicker({
  name,
  value = '',
  onChange,
  placeholder = 'Select time',
  disabled,
}: TimePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hour, setHour] = useState('09');
  const [minute, setMinute] = useState('00');
  const [period, setPeriod] = useState('AM');
  const containerRef = useRef<HTMLDivElement>(null);

  // Parse initial value if provided (expects HH:mm format in 24h)
  useEffect(() => {
    if (value) {
      const [h, m] = value.split(':');
      const hourNum = parseInt(h, 10);
      if (hourNum === 0) {
        setHour('12');
        setPeriod('AM');
      } else if (hourNum === 12) {
        setHour('12');
        setPeriod('PM');
      } else if (hourNum > 12) {
        setHour(String(hourNum - 12).padStart(2, '0'));
        setPeriod('PM');
      } else {
        setHour(String(hourNum).padStart(2, '0'));
        setPeriod('AM');
      }
      setMinute(m || '00');
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Convert 12h to 24h format for form submission
  const get24HourValue = () => {
    let hourNum = parseInt(hour, 10);
    if (period === 'AM') {
      if (hourNum === 12) hourNum = 0;
    } else {
      if (hourNum !== 12) hourNum += 12;
    }
    return `${String(hourNum).padStart(2, '0')}:${minute}`;
  };

  const handleConfirm = () => {
    const newValue = get24HourValue();
    onChange?.(newValue);
    setIsOpen(false);
  };

  const displayValue = value ? `${hour}:${minute} ${period}` : '';

  const adjustHour = (delta: number) => {
    const idx = HOURS.indexOf(hour);
    const newIdx = (idx + delta + HOURS.length) % HOURS.length;
    setHour(HOURS[newIdx]);
  };

  const adjustMinute = (delta: number) => {
    const idx = MINUTES.indexOf(minute);
    const newIdx = (idx + delta + MINUTES.length) % MINUTES.length;
    setMinute(MINUTES[newIdx]);
  };

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Hidden input for form submission */}
      <input type="hidden" name={name} value={value} />

      {/* Display button */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={clsx(
          'w-full flex items-center justify-between gap-2 rounded-xl px-4 py-3',
          'border border-border bg-white text-sm',
          'focus:ring-2 focus:ring-primary outline-none transition',
          !displayValue && 'text-neutral-400',
          disabled ? 'opacity-60 cursor-not-allowed bg-gray-50' : 'cursor-pointer',
        )}
      >
        <span>{displayValue || placeholder}</span>
        <Clock size={16} className="text-neutral-400" />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 mt-2 left-0 min-w-50 bg-white border border-border rounded-xl shadow-lg p-4 cursor-pointer">
          <div className="flex items-center justify-center gap-2">
            {/* Hour */}
            <div className="flex flex-col items-center">
              <button
                type="button"
                onClick={() => adjustHour(1)}
                className="p-1 hover:bg-foreground-100 rounded cursor-pointer"
              >
                <ChevronUp size={16} />
              </button>
              <span className="text-xl font-semibold w-8 text-center">
                {hour}
              </span>
              <button
                type="button"
                onClick={() => adjustHour(-1)}
                className="p-1 hover:bg-foreground-100 rounded cursor-pointer"
              >
                <ChevronDown size={16} />
              </button>
            </div>

            <span className="text-xl font-semibold">:</span>

            {/* Minute */}
            <div className="flex flex-col items-center">
              <button
                type="button"
                onClick={() => adjustMinute(1)}
                className="p-1 hover:bg-foreground-100 rounded cursor-pointer"
              >
                <ChevronUp size={16} />
              </button>
              <span className="text-xl font-semibold w-8 text-center">
                {minute}
              </span>
              <button
                type="button"
                onClick={() => adjustMinute(-1)}
                className="p-1 hover:bg-foreground-100 rounded cursor-pointer"
              >
                <ChevronDown size={16} />
              </button>
            </div>

            {/* AM/PM */}
            <div className="flex flex-col items-center ml-1">
              <button
                type="button"
                onClick={() => setPeriod(period === 'AM' ? 'PM' : 'AM')}
                className="p-1 hover:bg-foreground-100 rounded cursor-pointer"
              >
                <ChevronUp size={16} />
              </button>
              <span className="text-lg font-semibold w-8 text-center">
                {period}
              </span>
              <button
                type="button"
                onClick={() => setPeriod(period === 'AM' ? 'PM' : 'AM')}
                className="p-1 hover:bg-foreground-100 rounded cursor-pointer"
              >
                <ChevronDown size={16} />
              </button>
            </div>
          </div>

          {/* Confirm button */}
          <button
            type="button"
            onClick={handleConfirm}
            className="mt-4 w-full py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover transition cursor-pointer"
          >
            Confirm
          </button>
        </div>
      )}
    </div>
  );
}
