import React from 'react';
import './globals.css';
import { Providers } from './providers';

// Meta tags
export const metadata = {
  title: 'Fragments UI',
  description: 'Frontend to leverage AWS-based fragments microservice.',
};

// ===== LAYOUT =====
export default function RootLayout({ children }) {
  return (
    <html lang="en" className="">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
