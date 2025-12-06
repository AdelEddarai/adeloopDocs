import React from 'react';
import LandingPage from './LandingPage';

const App: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-fd-background text-fd-foreground selection:bg-fd-primary selection:text-fd-primary-foreground">
      <LandingPage />
    </div>
  );
};

export default App;