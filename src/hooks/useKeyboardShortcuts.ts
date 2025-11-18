import { useEffect, useRef } from 'react';

interface KeyboardShortcutsConfig {
  onAddTask?: () => void;
  onFocusSearch?: () => void;
  onEscape?: () => void;
  enabled?: boolean;
}

export function useKeyboardShortcuts({
  onAddTask,
  onFocusSearch,
  onEscape,
  enabled = true,
}: KeyboardShortcutsConfig) {
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Check if user is typing in an input/textarea
      const isTyping =
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target as HTMLElement)?.isContentEditable;

      // Ctrl/Cmd + K or / to focus search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        onFocusSearch?.();
        searchInputRef.current?.focus();
      } else if (e.key === '/' && !isTyping) {
        e.preventDefault();
        onFocusSearch?.();
        searchInputRef.current?.focus();
      }

      // Ctrl/Cmd + Shift + A to add new task (avoiding Ctrl+N which opens new window, and Cmd+Shift+N which is incognito)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'A' && !isTyping) {
        e.preventDefault();
        onAddTask?.();
      }

      // Escape key
      if (e.key === 'Escape' && !isTyping) {
        onEscape?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onAddTask, onFocusSearch, onEscape, enabled]);

  return { searchInputRef };
}

