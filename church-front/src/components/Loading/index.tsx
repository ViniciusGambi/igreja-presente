import React from 'react';
import { WaveTopBottomLoading } from 'react-loadingg';

const Loading: React.FC = () => {
  return (
    <WaveTopBottomLoading
      speed={0.5}
      style={{
        width: '70px',
        height: '70px',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
      }}
      color="#1E0A3C"
      size="large"
    />
  );
};

export default Loading;
