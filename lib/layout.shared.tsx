// layout.shared.tsx  (or layout.config.tsx)

import { BookIcon } from 'lucide-react';
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export const baseOptions: BaseLayoutProps = {
  links: [
    // {
    //   icon: BookIcon,        // use **component reference**, not <BookIcon />
    //   text: 'Blog',
    //   url: '/blog',
    //   secondary: false,
    // },
  ],
  nav: {
    title: 'Adeloop Docs',   // you can customize nav title or other nav options
    // optionally, other nav props like mode, transparentMode, etc.
    // transparentMode: 'none' | 'top' | 'always'
  },
  // you may add more global layout options here (footer, sidebar settings, theme, etc.)
};
