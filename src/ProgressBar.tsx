import React from 'react';

interface ProgressBarProps {
  completed: number;
  total: number;
}

function ProgressBar({ completed, total }: ProgressBarProps) {
  const percentage = total === 0
    ? 0
    : Math.round((completed / total) * 100);

  return (
    <div className="progress-section">
      <div className="progress-text">
        <span>{completed} of {total} tasks completed</span>
        <span>{percentage}%</span>
      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;