import React from 'react';
import { Animation } from '../Animation';
import { AnimationProps } from '../Animation.types';

interface FadeInProps extends Omit<AnimationProps, 'type'> {
  /** Override default duration for fade in (default: 300ms) */
  duration?: number;
  /** Override default easing for fade in (default: 'ease-out') */
  easing?: AnimationProps['easing'];
}

export const FadeIn: React.FC<FadeInProps> = ({ 
  duration = 300, 
  easing = 'ease-out',
  ...props 
}) => (
  <Animation 
    {...props} 
    type="fadeIn"
    duration={duration}
    easing={easing}
  />
);