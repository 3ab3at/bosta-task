import { useState, useEffect } from 'react';

export function KeyboardShortcutsHelp() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    // Better Mac detection
    const checkMac = () => {
      const platform = navigator.platform.toUpperCase();
      const userAgent = navigator.userAgent.toUpperCase();
      return platform.indexOf('MAC') >= 0 || userAgent.indexOf('MAC') >= 0;
    };
    setIsMac(checkMac());
  }, []);

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
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                setIsOpen(false);
              }
            }}
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

