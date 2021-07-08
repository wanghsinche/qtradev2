import * as React from 'react';
import { oauth } from '@/pages/profile/store';

export const LoginBTN = () => {
  return (
    <a href={oauth} title="login github">
      <img
        src="https://img.shields.io/badge/login%20-github-white"
        alt="login github"
      />
    </a>
  );
};
