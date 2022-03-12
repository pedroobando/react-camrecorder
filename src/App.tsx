import React, { useState } from 'react';
import './App.css';
import { RecordView } from './components/RecordView';

export const App = () => {
  return (
    <div className="h-screen bg-gray-800">
      <header className="text-2xl text-white">Captura con webcam</header>
      <section>
        <RecordView />
      </section>
    </div>
  );
};
