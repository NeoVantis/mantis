import React from 'react';
import { Animation } from '../index';
import { AnimationProps } from '../Animation.types';

export const ScaleIn: React.FC<Omit<AnimationProps, 'type'>> = (props) => (
  <Animation {...props} type="scaleIn" />
);
