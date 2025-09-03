import React from 'react';
import { Animation } from '../index';
import { AnimationProps } from '../Animation.types';

export const Bounce: React.FC<Omit<AnimationProps, 'type'>> = (props) => (
  <Animation {...props} type="bounce" />
);
