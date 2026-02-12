import React from 'react';
import { Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { theme } from '../../theme/theme';

const TopWave = () => {
  const { height } = Dimensions.get('window');

  return (
    <Svg
      width="150%"
      height={height * 0.55}
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        zIndex: 1,
      }}
    >
      <Path
        fill={theme.color.lightBlue}
        d="M0,96L48,117.3C96,139,192,181,288,186.7C384,192,480,160,576,144C672,128,768,128,864,144C960,160,1056,192,1152,197.3C1248,203,1344,181,1392,170.7L1440,160V320H0Z"
      />
    </Svg>
  );
};

export default TopWave;
