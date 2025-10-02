import React from 'react';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export function Logo({ className = '', size = 'md', showText = true }: LogoProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-2xl'
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className={`${sizeClasses[size]} flex items-center justify-center`}>
        <Image
          src="/Gemini_Generated_Image_gl9m4ygl9m4ygl9m.png"
          alt="Proj•Link Logo"
          width={32}
          height={32}
          className="w-full h-full object-contain"
          priority={size === 'lg'}
        />
      </div>
      
      {showText && (
        <div className={`font-bold ${textSizeClasses[size]} text-foreground`}>
          <span className="text-primary">Proj</span>
          <span className="text-primary/60 mx-1">•</span>
          <span className="text-primary/80">Link</span>
        </div>
      )}
    </div>
  );
}
