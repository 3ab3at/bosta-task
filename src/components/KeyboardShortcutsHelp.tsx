import { useState, useEffect, useRef } from 'react';

export function KeyboardShortcutsHelp() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMac, setIsMac] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Better Mac detection - check multiple methods
    const checkMac = () => {
      // Method 1: Check platform
      const platform = navigator.platform.toUpperCase();
      if (platform.indexOf('MAC') >= 0) return true;
      
      // Method 2: Check user agent
      const userAgent = navigator.userAgent.toUpperCase();
      if (userAgent.indexOf('MAC') >= 0) return true;
      
      // Method 3: Check for Mac-specific properties
      // @ts-ignore - navigator.maxTouchPoints might not be in types
      if (navigator.maxTouchPoints && navigator.maxTouchPoints > 2 && /MacIntel/.test(navigator.platform)) {
        return true;
      }
      
      // Method 4: Check if meta key is the primary modifier (Mac behavior)
      // This is a fallback - we'll use platform/userAgent primarily
      return false;
    };
    setIsMac(checkMac());
  }, []);

  // Handle Escape key to close modal
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  // Focus modal when opened for keyboard accessibility
  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  const modKey = isMac ? '⌘' : 'Ctrl';

  const shortcuts = [
    { keys: [modKey, 'Shift', 'A'], description: 'Add new task' },
    { keys: [modKey, 'K'], description: 'Focus search' },
    { keys: ['/'], description: 'Focus search' },
    { keys: ['Esc'], description: 'Cancel/Close' },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        aria-label="Keyboard shortcuts"
        title="Keyboard shortcuts"
      >
        ⌨️ Shortcuts
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/20"
            onClick={() => setIsOpen(false)}
          />
          <div
            ref={modalRef}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            tabIndex={-1}
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-6 max-w-md w-full">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Keyboard Shortcuts
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-3">
                {shortcuts.map((shortcut, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700 last:border-0"
                  >
                    <span className="text-gray-700 dark:text-gray-300">
                      {shortcut.description}
                    </span>
                    <div className="flex gap-1">
                      {shortcut.keys.map((key, keyIndex) => (
                        <span
                          key={keyIndex}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded text-sm font-mono"
                        >
                          {key}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

