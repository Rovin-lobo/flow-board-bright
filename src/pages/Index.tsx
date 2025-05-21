
import React from 'react';
import Header from '@/components/Header';
import TaskBoard from '@/components/TaskBoard';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-accent/20">
      <Header />
      <main className="flex-1 container mx-auto p-4 md:p-6">
        <div className="mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">Task Board</h2>
          <p className="text-muted-foreground">Manage your internship tasks efficiently</p>
        </div>
        <TaskBoard />
      </main>
    </div>
  );
};

export default Index;
