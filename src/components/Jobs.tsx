import { useState, useEffect } from 'react';
import { 
  Clock,
  CheckCircle2,
  XCircle,
  Loader2,
  Play,
  Pause,
  Download,
  Eye,
  RefreshCw,
  Trash2,
  ChevronRight,
  AlertCircle,
  ArrowLeft,
  FileText,
  Sparkles,
  TrendingUp,
  Edit,
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { Job, JobStatus, PIPELINE_STAGES, getPipelineIcon, formatDuration, Scene } from '../utils/pipelines';
import { SceneValidation } from './SceneValidation';

interface JobsProps {
  jobs: Job[];
  onCancelJob: (jobId: string) => void;
  onRetryJob: (jobId: string) => void;
  onDeleteJob: (jobId: string) => void;
  onViewOutput: (jobId: string) => void;
  onUpdateJob?: (jobId: string, updates: Partial<Job>) => void;
}

export function Jobs({ jobs, onCancelJob, onRetryJob, onDeleteJob, onViewOutput, onUpdateJob }: JobsProps) {
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'processing' | 'completed' | 'failed'>('all');

  const selectedJob = jobs.find(j => j.id === selectedJobId);

  // Filter jobs
  const filteredJobs = jobs.filter(job => {
    if (filter === 'all') return true;
    if (filter === 'processing') return job.status === 'queued' || job.status === 'processing' || job.status === 'awaiting_scene_review';
    if (filter === 'completed') return job.status === 'completed';
    if (filter === 'failed') return job.status === 'failed';
    return true;
  });

  // Stats
  const stats = {
    total: jobs.length,
    processing: jobs.filter(j => j.status === 'queued' || j.status === 'processing' || j.status === 'awaiting_scene_review').length,
    completed: jobs.filter(j => j.status === 'completed').length,
    failed: jobs.filter(j => j.status === 'failed').length,
  };

  const getStatusIcon = (status: JobStatus) => {
    switch (status) {
      case 'queued':
        return <Clock className="w-4 h-4 text-slate-500" />;
      case 'processing':
        return <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />;
      case 'completed':
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-slate-400" />;
    }
  };

  const getStatusBadge = (status: JobStatus) => {
    const variants: Record<JobStatus, string> = {
      queued: 'bg-slate-100 text-slate-700',
      processing: 'bg-blue-100 text-blue-700',
      completed: 'bg-green-100 text-green-700',
      failed: 'bg-red-100 text-red-700',
      cancelled: 'bg-slate-100 text-slate-500',
    };
    return (
      <Badge className={variants[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getJobProgress = (job: Job) => {
    const completedStages = job.stages.filter(s => s.status === 'completed').length;
    return Math.round((completedStages / job.stages.length) * 100);
  };

  const getCurrentStage = (job: Job) => {
    const runningStage = job.stages.find(s => s.status === 'running');
    if (runningStage) {
      const stageInfo = PIPELINE_STAGES[job.pipelineType].find(s => s.id === runningStage.stageId);
      return stageInfo?.name || 'Processing...';
    }
    if (job.status === 'completed') return 'Completed';
    if (job.status === 'failed') return 'Failed';
    return 'Queued';
  };

  const getElapsedTime = (job: Job) => {
    if (!job.startedAt) return '-';
    const start = new Date(job.startedAt).getTime();
    const end = job.completedAt ? new Date(job.completedAt).getTime() : Date.now();
    const seconds = Math.floor((end - start) / 1000);
    return formatDuration(seconds);
  };

  if (selectedJob) {
    return <JobDetail job={selectedJob} onBack={() => setSelectedJobId(null)} onViewOutput={onViewOutput} onUpdateJob={onUpdateJob} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto p-6 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Content Jobs
            </span>
          </h1>
          <p className="text-slate-600">
            Monitor and manage your content generation jobs
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="border-slate-200 bg-white shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-slate-600">Total Jobs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl">{stats.total}</div>
            </CardContent>
          </Card>
          <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-white shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-blue-700">Processing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl text-blue-600">{stats.processing}</div>
            </CardContent>
          </Card>
          <Card className="border-green-200 bg-gradient-to-br from-green-50 to-white shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-green-700">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl text-green-600">{stats.completed}</div>
            </CardContent>
          </Card>
          <Card className="border-red-200 bg-gradient-to-br from-red-50 to-white shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-red-700">Failed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl text-red-600">{stats.failed}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Tabs value={filter} onValueChange={(v) => setFilter(v as any)} className="mb-6">
          <TabsList className="bg-white border border-slate-200 shadow-md">
            <TabsTrigger value="all" className="data-[state=active]:bg-slate-100">
              All ({stats.total})
            </TabsTrigger>
            <TabsTrigger value="processing" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700">
              Processing ({stats.processing})
            </TabsTrigger>
            <TabsTrigger value="completed" className="data-[state=active]:bg-green-100 data-[state=active]:text-green-700">
              Completed ({stats.completed})
            </TabsTrigger>
            <TabsTrigger value="failed" className="data-[state=active]:bg-red-100 data-[state=active]:text-red-700">
              Failed ({stats.failed})
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Jobs List */}
        <div className="space-y-3">
          {filteredJobs.length === 0 ? (
            <Card className="border-slate-200 bg-white shadow-lg">
              <CardContent className="p-12 text-center">
                <TrendingUp className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-slate-900 mb-2">No jobs found</h3>
                <p className="text-slate-600">
                  {filter === 'all' 
                    ? 'Start generating content from the Generate page' 
                    : `No ${filter} jobs`}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredJobs.map(job => (
              <Card 
                key={job.id} 
                className="border-slate-200 bg-white shadow-lg hover:shadow-xl transition-all cursor-pointer hover:border-blue-300"
                onClick={() => setSelectedJobId(job.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    {/* Pipeline Icon */}
                    <div className="text-4xl">{getPipelineIcon(job.pipelineType)}</div>

                    {/* Job Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-slate-900 truncate">{job.ideaTitle}</h3>
                        {getStatusBadge(job.status)}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-slate-600 mb-2">
                        <span className="flex items-center gap-1">
                          <FileText className="w-3 h-3" />
                          {job.blueprintName}
                        </span>
                        <span>•</span>
                        <span>{job.pipelineLabel}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {getElapsedTime(job)}
                        </span>
                      </div>

                      {/* Progress */}
                      {(job.status === 'processing' || job.status === 'queued') && (
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-600">{getCurrentStage(job)}</span>
                            <span className="text-slate-500">{getJobProgress(job)}%</span>
                          </div>
                          <Progress value={getJobProgress(job)} className="h-2" />
                        </div>
                      )}

                      {job.status === 'completed' && (
                        <div className="flex items-center gap-2 text-sm text-green-600">
                          <CheckCircle2 className="w-4 h-4" />
                          Completed successfully
                        </div>
                      )}

                      {job.status === 'failed' && (
                        <div className="flex items-center gap-2 text-sm text-red-600">
                          <XCircle className="w-4 h-4" />
                          Generation failed
                        </div>
                      )}
                    </div>

                    {/* Status Icon */}
                    <div className="flex items-center gap-2">
                      {getStatusIcon(job.status)}
                      <ChevronRight className="w-5 h-5 text-slate-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function JobDetail({ job, onBack, onViewOutput, onUpdateJob }: { 
  job: Job; 
  onBack: () => void; 
  onViewOutput: (jobId: string) => void;
  onUpdateJob?: (jobId: string, updates: Partial<Job>) => void;
}) {
  const pipelineStages = PIPELINE_STAGES[job.pipelineType];
  const [editingSceneId, setEditingSceneId] = useState<string | null>(null);
  const [editedSceneDescription, setEditedSceneDescription] = useState('');
  const [regeneratingSceneId, setRegeneratingSceneId] = useState<string | null>(null);
  const [regenerationComment, setRegenerationComment] = useState('');
  const [localScenes, setLocalScenes] = useState<Scene[]>(job.scenes || []);
  
  // Sync local scenes with job scenes when job updates
  useEffect(() => {
    if (job.scenes && job.scenes.length > 0) {
      setLocalScenes(job.scenes);
    }
  }, [job.scenes]);
  
  // Simulate scene generation when in scene_generation stage
  useEffect(() => {
    const sceneGenStage = job.stages.find(s => s.stageId === 'scene_generation');
    
    // Only simulate if we're in processing status and scene_generation is running
    if (job.status === 'processing' && sceneGenStage?.status === 'running' && onUpdateJob) {
      const approvedScenes = localScenes.filter(s => s.status === 'approved');
      
      if (approvedScenes.length > 0) {
        // Start generating the first approved scene
        const sceneToGenerate = approvedScenes[0];
        
        setTimeout(() => {
          const updatedScenes = localScenes.map(scene => {
            if (scene.id === sceneToGenerate.id) {
              return { ...scene, status: 'generating' as const };
            }
            return scene;
          });
          
          onUpdateJob(job.id, { scenes: updatedScenes });
          
          // Complete the scene after 3 seconds
          setTimeout(() => {
            const completedScenes = updatedScenes.map(scene => {
              if (scene.id === sceneToGenerate.id) {
                return { 
                  ...scene, 
                  status: 'completed' as const,
                  t2v: {
                    status: 'completed' as const,
                    videoUrl: 'https://placeholder-video.url',
                    prompt: scene.prompt
                  }
                };
              }
              return scene;
            });
            
            // Calculate progress
            const totalScenes = localScenes.length;
            const completedCount = completedScenes.filter(s => s.status === 'completed').length;
            const progress = Math.round((completedCount / totalScenes) * 100);
            
            // Update stage progress
            const updatedStages = job.stages.map(stage => {
              if (stage.stageId === 'scene_generation') {
                return { ...stage, progress };
              }
              return stage;
            });
            
            // Check if all scenes are completed
            const allComplete = completedCount === totalScenes;
            
            if (allComplete) {
              // Move to assembly stage
              const finalStages = updatedStages.map(stage => {
                if (stage.stageId === 'scene_generation') {
                  return { 
                    ...stage, 
                    status: 'completed' as const, 
                    progress: 100,
                    completedAt: new Date().toISOString()
                  };
                }
                if (stage.stageId === 'assembly') {
                  return { 
                    ...stage, 
                    status: 'running' as const, 
                    progress: 0,
                    startedAt: new Date().toISOString()
                  };
                }
                return stage;
              });
              
              onUpdateJob(job.id, { 
                scenes: completedScenes,
                stages: finalStages,
                currentStageIndex: job.stages.findIndex(s => s.stageId === 'assembly')
              });
              
              // Complete assembly after 2 seconds
              setTimeout(() => {
                const assemblyCompleteStages = finalStages.map(stage => {
                  if (stage.stageId === 'assembly') {
                    return { 
                      ...stage, 
                      status: 'completed' as const, 
                      progress: 100,
                      completedAt: new Date().toISOString()
                    };
                  }
                  return stage;
                });
                
                onUpdateJob(job.id, { 
                  status: 'completed',
                  stages: assemblyCompleteStages,
                  completedAt: new Date().toISOString(),
                  outputs: {
                    videoUrl: 'https://placeholder-final-video.url',
                    scenes: completedScenes
                  }
                });
              }, 2000);
            } else {
              onUpdateJob(job.id, { 
                scenes: completedScenes,
                stages: updatedStages
              });
            }
          }, 3000);
        }, 500);
      }
    }
  }, [job.status, job.stages, localScenes, onUpdateJob]);
  
  // Debug logging
  console.log('JobDetail - job.status:', job.status);
  console.log('JobDetail - job.pipelineType:', job.pipelineType);
  console.log('JobDetail - job.scenes:', job.scenes);
  console.log('JobDetail - localScenes.length:', localScenes.length);
  
  const getStageStatus = (stageId: string) => {
    return job.stages.find(s => s.stageId === stageId);
  };

  const getStageIcon = (stageId: string) => {
    const stageProgress = getStageStatus(stageId);
    if (!stageProgress) return <Clock className="w-5 h-5 text-slate-400" />;
    
    switch (stageProgress.status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'running':
        return <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-slate-300" />;
    }
  };

  const handleSceneEdit = (sceneId: string) => {
    const scene = localScenes.find(s => s.id === sceneId);
    if (scene) {
      setEditingSceneId(sceneId);
      setEditedSceneDescription(scene.description);
    }
  };

  const handleSceneSave = () => {
    if (editingSceneId && editedSceneDescription) {
      const updatedScenes = localScenes.map(scene => {
        if (scene.id === editingSceneId) {
          return { ...scene, description: editedSceneDescription };
        }
        return scene;
      });
      setLocalScenes(updatedScenes);
      setEditingSceneId(null);
      if (onUpdateJob) {
        onUpdateJob(job.id, { scenes: updatedScenes });
      }
    }
  };

  const handleSceneCancel = () => {
    setEditingSceneId(null);
  };

  const handleRegenerateScene = (sceneId: string) => {
    setRegeneratingSceneId(sceneId);
    setRegenerationComment('');
  };

  const handleRegenerateSubmit = (sceneId: string) => {
    if (regenerationComment.trim()) {
      // Update scene with regeneration request
      const updatedScenes = localScenes.map(scene => {
        if (scene.id === sceneId) {
          return { 
            ...scene, 
            status: 'pending' as const,
            regenerationComment: regenerationComment 
          };
        }
        return scene;
      });
      setLocalScenes(updatedScenes);
      setRegeneratingSceneId(null);
      setRegenerationComment('');
      
      if (onUpdateJob) {
        onUpdateJob(job.id, { scenes: updatedScenes });
      }
      
      // Simulate regeneration (in real app, this would trigger AI regeneration)
      setTimeout(() => {
        const regeneratedScenes = updatedScenes.map(scene => {
          if (scene.id === sceneId) {
            return {
              ...scene,
              description: `${scene.description} (Regenerated with: ${regenerationComment})`,
              prompt: `${scene.prompt} [Adjusted based on feedback]`,
              status: 'pending' as const
            };
          }
          return scene;
        });
        setLocalScenes(regeneratedScenes);
        if (onUpdateJob) {
          onUpdateJob(job.id, { scenes: regeneratedScenes });
        }
      }, 1500);
    }
  };

  const handleRegenerateCancel = () => {
    setRegeneratingSceneId(null);
    setRegenerationComment('');
  };

  const handleDeleteScene = (sceneId: string) => {
    const updatedScenes = localScenes.filter(scene => scene.id !== sceneId);
    setLocalScenes(updatedScenes);
    if (onUpdateJob) {
      onUpdateJob(job.id, { scenes: updatedScenes });
    }
  };

  // Check if job is processing and has scenes with generated content
  const isGeneratingScenes = job.status === 'processing' && localScenes.some(s => s.status === 'generating' || s.status === 'completed');
  const hasGeneratedContent = localScenes.some(s => 
    (s.t2v?.videoUrl) || 
    (s.subStages?.t2i?.imageUrl) || 
    (s.subStages?.i2v?.videoUrl)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto p-6 max-w-5xl">
        {/* Header */}
        <div className="mb-6">
          <Button variant="ghost" onClick={onBack} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Jobs
          </Button>
          
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl">{getPipelineIcon(job.pipelineType)}</span>
                <div>
                  <h1 className="text-slate-900">{job.ideaTitle}</h1>
                  <p className="text-slate-600">{job.pipelineLabel}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {job.status === 'completed' && (
                <Button onClick={() => onViewOutput(job.id)} className="bg-green-600 hover:bg-green-700">
                  <Eye className="w-4 h-4 mr-2" />
                  View Output
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Job Info Card */}
        <Card className="border-slate-200 bg-white shadow-lg mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Job Information</CardTitle>
              {job.status === 'completed' && (
                <Badge className="bg-green-100 text-green-700">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Completed
                </Badge>
              )}
              {job.status === 'processing' && (
                <Badge className="bg-blue-100 text-blue-700">
                  <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                  Processing
                </Badge>
              )}
              {job.status === 'failed' && (
                <Badge className="bg-red-100 text-red-700">
                  <XCircle className="w-3 h-3 mr-1" />
                  Failed
                </Badge>
              )}
              {job.status === 'awaiting_scene_review' && (
                <Badge className="bg-amber-100 text-amber-700">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  Awaiting Scene Review
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-slate-600 mb-1">Blueprint</div>
                <div className="text-slate-900">{job.blueprintName}</div>
              </div>
              <div>
                <div className="text-sm text-slate-600 mb-1">Created</div>
                <div className="text-slate-900">{new Date(job.createdAt).toLocaleString()}</div>
              </div>
              <div>
                <div className="text-sm text-slate-600 mb-1">LLM Model</div>
                <div className="text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  {job.config.llmModel}
                </div>
              </div>
              <div>
                <div className="text-sm text-slate-600 mb-1">Media Model</div>
                <div className="text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  {job.config.mediaModel}
                </div>
              </div>
            </div>

            {/* Variables */}
            {Object.keys(job.variables).length > 0 && (
              <div>
                <div className="text-sm text-slate-600 mb-2">Variables</div>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(job.variables).map(([key, value]) => (
                    <div key={key} className="text-sm p-2 bg-slate-50 rounded border border-slate-200">
                      <span className="text-slate-600">{key}:</span>{' '}
                      <span className="text-slate-900">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pipeline Stages */}
        <Card className="border-slate-200 bg-white shadow-lg">
          <CardHeader>
            <CardTitle>Pipeline Stages</CardTitle>
            <CardDescription>
              Track progress through each generation stage
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pipelineStages.map((stage, index) => {
                const stageProgress = getStageStatus(stage.id);
                const isLast = index === pipelineStages.length - 1;
                
                return (
                  <div key={stage.id}>
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className="relative">
                        {getStageIcon(stage.id)}
                        {!isLast && (
                          <div className={`absolute left-1/2 top-8 w-px h-12 -ml-px ${
                            stageProgress?.status === 'completed' ? 'bg-green-200' : 'bg-slate-200'
                          }`} />
                        )}
                      </div>

                      {/* Stage Info */}
                      <div className="flex-1 pb-8">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-slate-900">{stage.name}</h4>
                          <span className="text-xs text-slate-500">
                            Est. {formatDuration(stage.estimatedDuration)}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 mb-2">{stage.description}</p>
                        
                        {stageProgress?.status === 'running' && (
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-blue-600">Processing...</span>
                              <span className="text-slate-500">{stageProgress.progress}%</span>
                            </div>
                            <Progress value={stageProgress.progress} className="h-1.5" />
                          </div>
                        )}
                        
                        {stageProgress?.status === 'completed' && stageProgress.completedAt && (
                          <div className="text-xs text-green-600 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            Completed at {new Date(stageProgress.completedAt).toLocaleTimeString()}
                          </div>
                        )}
                        
                        {stageProgress?.status === 'failed' && (
                          <div className="text-xs text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {stageProgress.error || 'Stage failed'}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Scene Validation */}
        {job.status === 'awaiting_scene_review' && (job.pipelineType === 'faceless-video' || job.pipelineType === 'storyboard-video') && localScenes.length > 0 && (
          <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-white shadow-lg mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-900">
                <AlertCircle className="w-5 h-5" />
                Scene Validation Required
              </CardTitle>
              <CardDescription>
                Review and validate these scenes before proceeding with video generation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {localScenes.map(scene => (
                  <div key={scene.id} className="p-4 bg-white border-2 border-slate-200 rounded-lg hover:border-amber-300 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className="bg-slate-100 text-slate-700">Scene {scene.index + 1}</Badge>
                          <span className="text-xs text-slate-500">{scene.duration}s • ~{scene.estimatedTokens} tokens</span>
                        </div>
                        
                        {editingSceneId === scene.id ? (
                          <div className="space-y-2">
                            <textarea
                              value={editedSceneDescription}
                              onChange={(e) => setEditedSceneDescription(e.target.value)}
                              className="w-full p-2 border border-slate-300 rounded text-sm min-h-[60px]"
                              placeholder="Scene description..."
                            />
                          </div>
                        ) : regeneratingSceneId === scene.id ? (
                          <div className="space-y-2">
                            <div className="space-y-2">
                              <div className="p-2 bg-slate-50 rounded border border-slate-200">
                                <label className="text-xs text-slate-600 mb-1 block">Scene Description</label>
                                <p className="text-sm text-slate-900">{scene.description}</p>
                              </div>
                              <div className="p-2 bg-indigo-50 rounded border border-indigo-200">
                                <label className="text-xs text-indigo-700 mb-1 block">AI Prompt for This Scene</label>
                                <p className="text-xs text-indigo-900 italic">{scene.prompt}</p>
                              </div>
                            </div>
                            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                              <label className="text-xs text-blue-900 mb-1 block">Regeneration Instructions</label>
                              <textarea
                                value={regenerationComment}
                                onChange={(e) => setRegenerationComment(e.target.value)}
                                className="w-full p-2 border border-blue-300 rounded text-sm min-h-[60px] bg-white"
                                placeholder="E.g., 'Make it more dramatic', 'Add focus on character emotions', 'Shorten the description'..."
                                autoFocus
                              />
                              <p className="text-xs text-blue-600 mt-1">Provide direction for how to regenerate this scene</p>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <div className="p-2 bg-slate-50 rounded border border-slate-200">
                              <label className="text-xs text-slate-600 mb-1 block">Scene Description</label>
                              <p className="text-sm text-slate-900">{scene.description}</p>
                            </div>
                            <div className="p-2 bg-indigo-50 rounded border border-indigo-200">
                              <label className="text-xs text-indigo-700 mb-1 block">AI Prompt for This Scene</label>
                              <p className="text-xs text-indigo-900 italic">{scene.prompt}</p>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        {editingSceneId === scene.id ? (
                          <>
                            <Button size="sm" onClick={handleSceneSave} className="bg-green-600 hover:bg-green-700 whitespace-nowrap">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Save
                            </Button>
                            <Button size="sm" onClick={handleSceneCancel} variant="outline">
                              Cancel
                            </Button>
                          </>
                        ) : regeneratingSceneId === scene.id ? (
                          <>
                            <Button 
                              size="sm" 
                              onClick={() => handleRegenerateSubmit(scene.id)} 
                              className="bg-blue-600 hover:bg-blue-700 whitespace-nowrap"
                              disabled={!regenerationComment.trim()}
                            >
                              <RefreshCw className="w-3 h-3 mr-1" />
                              Regenerate
                            </Button>
                            <Button size="sm" onClick={handleRegenerateCancel} variant="outline">
                              Cancel
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button size="sm" onClick={() => handleSceneEdit(scene.id)} variant="outline" className="whitespace-nowrap">
                              <Edit className="w-3 h-3 mr-1" />
                              Edit
                            </Button>
                            <Button size="sm" onClick={() => handleRegenerateScene(scene.id)} variant="outline" className="text-blue-600 border-blue-300 hover:bg-blue-50 whitespace-nowrap">
                              <RefreshCw className="w-3 h-3 mr-1" />
                              Regenerate
                            </Button>
                            <Button size="sm" onClick={() => handleDeleteScene(scene.id)} variant="outline" className="text-red-600 border-red-300 hover:bg-red-50">
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
                <div>
                  <p className="text-sm text-slate-900 mb-1">Ready to proceed?</p>
                  <p className="text-xs text-slate-600">Approved scenes will move to Scene Generation (T2V) stage</p>
                </div>
                <Button 
                  onClick={() => {
                    if (onUpdateJob) {
                      // Update scene statuses to approved
                      const approvedScenes = localScenes.map(scene => ({
                        ...scene,
                        status: 'approved' as const
                      }));
                      
                      // Find the scene_breakdown stage and mark it completed
                      const updatedStages = job.stages.map(stage => {
                        if (stage.stageId === 'scene_breakdown') {
                          return { 
                            ...stage, 
                            status: 'completed' as const, 
                            progress: 100,
                            completedAt: new Date().toISOString()
                          };
                        }
                        // Move to the next stage (scene_generation)
                        if (stage.stageId === 'scene_generation') {
                          return { 
                            ...stage, 
                            status: 'running' as const, 
                            progress: 0,
                            startedAt: new Date().toISOString()
                          };
                        }
                        return stage;
                      });
                      
                      onUpdateJob(job.id, { 
                        status: 'processing',
                        scenes: approvedScenes,
                        stages: updatedStages,
                        currentStageIndex: job.stages.findIndex(s => s.stageId === 'scene_generation')
                      });
                    }
                  }} 
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Approve & Continue to T2V
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Generated Scenes (During/After Processing) */}
        {(job.status === 'processing' || job.status === 'completed') && (job.pipelineType === 'faceless-video' || job.pipelineType === 'storyboard-video') && localScenes.length > 0 && (
          <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-white shadow-lg mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-900">
                <Eye className="w-5 h-5" />
                Generated Scenes
              </CardTitle>
              <CardDescription>
                {job.status === 'processing' ? 'Scenes are being generated...' : 'Review your generated scenes'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {localScenes.map(scene => {
                  const sceneStatus = scene.status || 'pending';
                  const isGenerating = sceneStatus === 'generating';
                  const isCompleted = sceneStatus === 'completed';
                  const isFailed = sceneStatus === 'failed';
                  
                  return (
                    <div key={scene.id} className="p-4 bg-white border-2 border-slate-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge className="bg-slate-100 text-slate-700">Scene {scene.index + 1}</Badge>
                        {isGenerating && (
                          <Badge className="bg-blue-100 text-blue-700">
                            <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                            Generating
                          </Badge>
                        )}
                        {isCompleted && (
                          <Badge className="bg-green-100 text-green-700">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Completed
                          </Badge>
                        )}
                        {isFailed && (
                          <Badge className="bg-red-100 text-red-700">
                            <XCircle className="w-3 h-3 mr-1" />
                            Failed
                          </Badge>
                        )}
                      </div>
                      
                      {/* Placeholder for generated content */}
                      <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg mb-3 flex items-center justify-center relative overflow-hidden">
                        {isGenerating ? (
                          <div className="text-center">
                            <Loader2 className="w-8 h-8 text-slate-400 animate-spin mx-auto mb-2" />
                            <p className="text-xs text-slate-600">Generating scene...</p>
                          </div>
                        ) : isCompleted ? (
                          <div className="text-center">
                            <Play className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                            <p className="text-xs text-slate-600">Scene video placeholder</p>
                          </div>
                        ) : (
                          <div className="text-center">
                            <Clock className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                            <p className="text-xs text-slate-600">Waiting...</p>
                          </div>
                        )}
                      </div>
                      
                      <p className="text-xs text-slate-900 mb-1">{scene.description}</p>
                      <p className="text-xs text-slate-500 italic mb-3">{scene.prompt}</p>
                      
                      {isCompleted && (
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline" className="flex-1 text-blue-600 border-blue-300 hover:bg-blue-50">
                            <RefreshCw className="w-3 h-3 mr-1" />
                            Regenerate
                          </Button>
                          <Button size="sm" variant="outline" className="text-green-600 border-green-300 hover:bg-green-50">
                            <CheckCircle2 className="w-3 h-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}