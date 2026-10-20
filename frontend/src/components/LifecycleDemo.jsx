import React, { useState, useEffect, useRef } from 'react';
import './LifecycleDemo.css';

/**
 * Educational Lifecycle Observer Component
 * Demonstrates React functional component lifecycle phases:
 * 1. Mounting: runs once when mounted (dependency array [])
 * 2. Updating: runs on state/prop mutations (dependency array [trackedState])
 * 3. Cleanup: executes when component unmounts or before re-running the effect
 * 4. Render tracking: observes how hooks trigger re-renders
 */
export const LifecycleDemo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [counter, setCounter] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [logs, setLogs] = useState([]);

  // Ref to track total renders without triggering additional re-renders
  const renderCount = useRef(1);
  renderCount.current += 1;

  const addLog = (message, phase) => {
    const time = new Date().toLocaleTimeString();
    setLogs((prev) => [
      { id: Date.now() + Math.random(), time, message, phase },
      ...prev.slice(0, 7), // Keep last 8 entries
    ]);
  };

  // 1. Mount & Unmount Cleanup Demonstration
  useEffect(() => {
    console.log('[Lifecycle Observer] 🟢 Component MOUNTED into DOM.');
    addLog('Component mounted into DOM', 'mount');

    // Demonstrating cleanup function with an active interval timer
    const intervalId = setInterval(() => {
      setTimerSeconds((prev) => prev + 1);
    }, 1000);

    return () => {
      console.log('[Lifecycle Observer] 🔴 Component UNMOUNTING. Running effect cleanup (cleared interval).');
      clearInterval(intervalId);
    };
  }, []); // Empty dependency array -> Mount & Unmount only

  // 2. Component Update Demonstration (Dependent on counter)
  useEffect(() => {
    if (counter > 0) {
      console.log(`[Lifecycle Observer] 🟡 State UPDATED: counter changed to ${counter}`);
      addLog(`Counter state changed to ${counter}`, 'update');
    }
  }, [counter]);

  return (
    <div className="lifecycle-card card">
      <div className="lifecycle-header" onClick={() => setIsOpen((prev) => !prev)}>
        <div className="lifecycle-header-title">
          <span className="lifecycle-badge">Pedagogical Demo</span>
          <h4 className="lifecycle-heading">
            React Lifecycle & Hook Inspector
          </h4>
        </div>
        <button
          type="button"
          className="lifecycle-toggle-btn"
          aria-expanded={isOpen}
          aria-label="Toggle lifecycle inspector"
        >
          {isOpen ? 'Hide Inspector ▲' : 'Show Inspector ▼'}
        </button>
      </div>

      {isOpen && (
        <div className="lifecycle-body animate-fade-in">
          <div className="lifecycle-metrics-grid">
            <div className="lifecycle-metric">
              <span className="metric-label">Component Renders</span>
              <strong className="metric-val">{renderCount.current}</strong>
            </div>

            <div className="lifecycle-metric">
              <span className="metric-label">Timer (Active Effect)</span>
              <strong className="metric-val">{timerSeconds}s</strong>
            </div>

            <div className="lifecycle-metric">
              <span className="metric-label">Interactive Counter</span>
              <div className="metric-actions">
                <button
                  type="button"
                  className="btn btn-sm btn-secondary"
                  onClick={() => setCounter((c) => c + 1)}
                >
                  Increment (+1)
                </button>
                <strong className="metric-val">{counter}</strong>
              </div>
            </div>
          </div>

          <div className="lifecycle-log-viewer">
            <h5 className="log-viewer-title">Lifecycle Event Stream:</h5>
            <ul className="lifecycle-log-list">
              {logs.map((log) => (
                <li key={log.id} className={`lifecycle-log-entry log-${log.phase}`}>
                  <span className="log-time">[{log.time}]</span>
                  <span className="log-badge">{log.phase.toUpperCase()}</span>
                  <span className="log-msg">{log.message}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default LifecycleDemo;
