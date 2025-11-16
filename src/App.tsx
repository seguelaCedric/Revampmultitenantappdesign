import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { CreateBlueprint } from './components/CreateBlueprint';
import { AIModelConfiguration } from './components/AIModelConfiguration';
import { Assets } from './components/Assets';
import { Ideas } from './components/Ideas';
import { Generate } from './components/Generate';
import { Jobs } from './components/Jobs';
import { Job } from './utils/pipelines';
import { useJobProcessor } from './hooks/useJobProcessor';

export default function App() {
  const [currentView, setCurrentView] = useState<'blueprint' | 'ai-config' | 'assets' | 'ideas' | 'generate' | 'jobs'>('generate');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);

  const handleUpdateJob = (jobId: string, updates: Partial<Job>) => {
    setJobs(prev => prev.map(job =>
      job.id === jobId ? { ...job, ...updates } : job
    ));
  };

  // Process jobs asynchronously
  useJobProcessor(jobs, handleUpdateJob);

  const handleAddJobs = (newJobs: Job[]) => {
    setJobs(prev => [...newJobs, ...prev]);
  };

  const handleCancelJob = (jobId: string) => {
    setJobs(prev => prev.map(job => 
      job.id === jobId ? { ...job, status: 'cancelled' as const } : job
    ));
  };

  const handleRetryJob = (jobId: string) => {
    // Would trigger job reprocessing
    console.log('Retry job:', jobId);
  };

  const handleDeleteJob = (jobId: string) => {
    setJobs(prev => prev.filter(job => job.id !== jobId));
  };

  const handleViewOutput = (jobId: string) => {
    // Would show output viewer
    console.log('View output:', jobId);
  };

  const processingJobsCount = jobs.filter(j => j.status === 'queued' || j.status === 'processing').length;

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-slate-50">
      <Sidebar 
        onNavigate={setCurrentView} 
        currentView={currentView}
        onCollapsedChange={setSidebarCollapsed}
        processingJobsCount={processingJobsCount}
      />
      <main className="flex-1 overflow-auto">
        {currentView === 'blueprint' && <CreateBlueprint />}
        {currentView === 'ai-config' && <AIModelConfiguration />}
        {currentView === 'assets' && <Assets />}
        {currentView === 'ideas' && <Ideas />}
        {currentView === 'generate' && <Generate onAddJobs={handleAddJobs} />}
        {currentView === 'jobs' && (
          <Jobs 
            jobs={jobs}
            onCancelJob={handleCancelJob}
            onRetryJob={handleRetryJob}
            onDeleteJob={handleDeleteJob}
            onViewOutput={handleViewOutput}
            onUpdateJob={handleUpdateJob}
          />
        )}
      </main>
    </div>
  );
}