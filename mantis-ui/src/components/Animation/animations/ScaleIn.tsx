import React from 'react';
import { Animation } from '../Animation';
import { AnimationProps, TransformOrigin } from '../Animation.types';

interface ScaleInProps extends Omit<AnimationProps, 'type'> {
  /** Override default duration for scale in (default: 400ms) */
  duration?: number;
  /** Override default easing for scale in (default: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)') */
  easing?: AnimationProps['easing'];
  /** Transform origin for scaling (default: 'center') */
  transformOrigin?: TransformOrigin;
}

export const ScaleIn: React.FC<ScaleInProps> = ({ 
  duration = 400, 
  easing = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  transformOrigin = 'center',
  config,
  ...props 
}) => (
  <Animation 
    {...props} 
    type="scaleIn"
    duration={duration}
    easing={easing}
    config={{
      ...config,
      transformOrigin,
      forceGPU: true, // Scale animations benefit from GPU acceleration
    }}
  />
);
