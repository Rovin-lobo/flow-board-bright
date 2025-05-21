
import React from 'react';
import Header from '@/components/Header';
import TaskBoard from '@/components/TaskBoard';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto p-4 md:p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Task Board</h2>
          <p className="text-muted-foreground">Manage your internship tasks efficiently</p>
        </div>
        <TaskBoard />
      </main>
    </div>
  );
};

export default Index;
