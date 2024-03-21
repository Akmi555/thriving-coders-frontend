import React, { ReactNode, MouseEvent } from 'react'

type Props = {
  path: string
  w?: string
  h?: string
  size?: string | number | null
  className?: string
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  children?: ReactNode
}

export default function Icon({
  path,
  w = 'w-6',
  h = 'h-6',
  size = null,
  className = '',
  onClick,
  children,
}: Props) {
  
  const iconSize = size ?? 16

  const handleClick = (event: MouseEvent<HTMLElement>) => {

    if(onClick) {
      onClick(event);
    }

  }

  return (
    <span className={`inline-flex justify-center items-center ${w} ${h} ${className}`} onClick={handleClick}>
      <svg viewBox="0 0 24 24" width={iconSize} height={iconSize} className="inline-block">
        <path fill="currentColor" d={path} />
      </svg>
      {children}
    </span>
  )
}
