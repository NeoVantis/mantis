import React from 'react';
import { Animation } from '../Animation';
import { AnimationProps } from '../Animation.types';

export const SlideInDown: React.FC<Omit<AnimationProps, 'type'>> = (props) => (
  <Animation {...props} type="slideInDown" />
);
