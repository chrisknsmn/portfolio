"use client";

interface GridProps {
  rows: number;
  cols: number;
  className?: string;
}

export default function Grid({ rows, cols, className = "" }: GridProps) {
  const getSquareClasses = (index: number) => {
    const row = Math.floor(index / cols);
    const col = index % cols;
    const isTopLeft = row === 0 && col === 0;
    const isTopRight = row === 0 && col === cols - 1;
    const isBottomLeft = row === rows - 1 && col === 0;
    const isBottomRight = row === rows - 1 && col === cols - 1;

    let roundedClasses = '';
    if (isTopLeft) roundedClasses += 'rounded-tl-md ';
    if (isTopRight) roundedClasses += 'rounded-tr-md ';
    if (isBottomLeft) roundedClasses += 'rounded-bl-md ';
    if (isBottomRight) roundedClasses += 'rounded-br-md ';

    return `bg-background ${roundedClasses}`;
  };

  return (
    <div
      className={`w-full ${className}`}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        aspectRatio: `${cols} / ${rows}`,
        gap: '1px',
        backgroundColor: '#93c5fd', // light blue for grid lines
        padding: '1px'
      }}
    >
      {Array.from({ length: rows * cols }).map((_, index) => (
        <div
          key={index}
          className={getSquareClasses(index)}
        />
      ))}
    </div>
  );
}