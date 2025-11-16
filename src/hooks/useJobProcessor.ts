import { useEffect, useRef } from 'react';
import { Job, PIPELINE_STAGES, Scene } from '../utils/pipelines';

export function useJobProcessor(
  jobs: Job[],
  onUpdateJob: (jobId: string, updates: Partial<Job>) => void
) {
  const processingRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    const queuedJobs = jobs.filter(j => j.status === 'queued' && !processingRef.current.has(j.id));
    
    queuedJobs.forEach(job => {
      processingRef.current.add(job.id);
      processJob(job, onUpdateJob);
    });

    // Cleanup completed/failed jobs from ref
    const activeJobIds = new Set(jobs.filter(j => j.status === 'queued' || j.status === 'processing').map(j => j.id));
    processingRef.current.forEach(id => {
      if (!activeJobIds.has(id)) {
        processingRef.current.delete(id);
      }
    });
  }, [jobs, onUpdateJob]);
}

async function processJob(
  job: Job,
  onUpdateJob: (jobId: string, updates: Partial<Job>) => void
) {
  // Start the job
  onUpdateJob(job.id, {
    status: 'processing',
    startedAt: new Date().toISOString(),
  });

  const pipelineStages = PIPELINE_STAGES[job.pipelineType];
  const isVideoPipeline = job.pipelineType === 'faceless-video' || job.pipelineType === 'storyboard-video';
  const automatedMode = job.config.generationSettings?.automatedMode ?? false;

  // Process each stage
  for (let i = 0; i < pipelineStages.length; i++) {
    const stage = pipelineStages[i];
    
    // Check if we need to pause for scene validation (video pipelines only, non-automated mode)
    if (isVideoPipeline && !automatedMode && stage.id === 'scene_breakdown') {
      // Complete the scene breakdown stage
      const updatedStages = [...job.stages];
      updatedStages[i] = {
        ...updatedStages[i],
        status: 'running',
        startedAt: new Date().toISOString(),
        progress: 0,
      };
      
      onUpdateJob(job.id, {
        currentStageIndex: i,
        stages: updatedStages,
      });

      // Simulate scene breakdown progress
      const progressSteps = 10;
      const stepDuration = (stage.estimatedDuration * 1000) / progressSteps;

      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, stepDuration));
        
        const progressStages = [...updatedStages];
        progressStages[i] = {
          ...progressStages[i],
          progress,
        };
        
        onUpdateJob(job.id, {
          stages: progressStages,
        });
      }

      // Mark scene breakdown as completed
      const completedStages = [...updatedStages];
      completedStages[i] = {
        ...completedStages[i],
        status: 'completed',
        progress: 100,
        completedAt: new Date().toISOString(),
      };
      
      // Generate mock scenes for validation
      const mockScenes = generateMockScenes(job);
      
      // PAUSE FOR SCENE VALIDATION
      onUpdateJob(job.id, {
        status: 'awaiting_scene_review',
        stages: completedStages,
        scenes: mockScenes,
      });
      
      // Stop processing - user must approve scenes to continue
      return;
    }
    
    // Mark stage as running
    const updatedStages = [...job.stages];
    updatedStages[i] = {
      ...updatedStages[i],
      status: 'running',
      startedAt: new Date().toISOString(),
      progress: 0,
    };
    
    onUpdateJob(job.id, {
      currentStageIndex: i,
      stages: updatedStages,
    });

    // Simulate stage progress
    const progressSteps = 10;
    const stepDuration = (stage.estimatedDuration * 1000) / progressSteps;

    for (let progress = 0; progress <= 100; progress += 10) {
      await new Promise(resolve => setTimeout(resolve, stepDuration));
      
      const progressStages = [...updatedStages];
      progressStages[i] = {
        ...progressStages[i],
        progress,
      };
      
      onUpdateJob(job.id, {
        stages: progressStages,
      });
    }

    // Mark stage as completed
    const completedStages = [...updatedStages];
    completedStages[i] = {
      ...completedStages[i],
      status: 'completed',
      progress: 100,
      completedAt: new Date().toISOString(),
      outputs: {
        // Mock output data
        result: `Stage ${stage.name} completed successfully`,
      },
    };
    
    onUpdateJob(job.id, {
      stages: completedStages,
    });
  }

  // Mark job as completed
  onUpdateJob(job.id, {
    status: 'completed',
    completedAt: new Date().toISOString(),
    outputs: {
      content: generateMockContent(job),
      url: `https://example.com/generated/${job.id}`,
    },
  });
}

function generateMockContent(job: Job): string {
  return `🎯 **${job.blueprintName} - Generated Content**

Generated for: ${job.ideaTitle}
Pipeline: ${job.pipelineLabel}

Hey there! 👋 

This is your generated content based on the ${job.blueprintName} blueprint.

Variables used:
${Object.entries(job.variables).map(([key, value]) => `• ${key}: ${value}`).join('\n')}

✨ **Key Points:**
• AI-powered content generation
• Multi-stage pipeline processing
• Optimized for ${job.pipelineLabel}
• Powered by ${job.config.llmModel}

Ready to take your content to the next level?

#ContentFarm #AIGenerated #${job.pipelineType.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('')}`;
}

function generateMockScenes(job: Job): Scene[] {
  const numberOfScenes = job.config.generationSettings?.numberOfScenes || 5;
  const sceneDuration = typeof job.config.generationSettings?.sceneDuration === 'number' 
    ? job.config.generationSettings.sceneDuration 
    : Math.floor((job.config.generationSettings?.videoDuration || 60) / numberOfScenes);
  
  const isStoryboard = job.pipelineType === 'storyboard-video';
  
  const sceneDescriptions = [
    {
      description: 'Opening hook: Dynamic product showcase with motion graphics',
      prompt: `Cinematic shot of ${job.variables.product || 'product'}, modern aesthetic, dramatic lighting, smooth camera movement`,
    },
    {
      description: 'Problem identification: Visual representation of pain points',
      prompt: `Split-screen showing frustrated user vs satisfied user, clean minimalist background, professional color grading`,
    },
    {
      description: 'Solution introduction: Product features highlight',
      prompt: `Close-up of ${job.variables.product || 'product'} key features, macro photography style, premium feel`,
    },
    {
      description: 'Social proof: Success stories and testimonials',
      prompt: `Happy customers using product, authentic lifestyle photography, warm natural lighting`,
    },
    {
      description: 'Call to action: Strong closing with brand message',
      prompt: `Bold text overlay with CTA, product in background, professional branding, energetic vibe`,
    },
  ];
  
  return sceneDescriptions.slice(0, numberOfScenes).map((scene, index) => ({
    id: `scene-${job.id}-${index + 1}`,
    index,
    description: scene.description,
    prompt: scene.prompt,
    estimatedTokens: isStoryboard ? 2500 : 800, // Storyboard uses 4 sub-stages, faceless uses 1
    status: 'pending',
    duration: sceneDuration,
    // Initialize sub-stages for storyboard videos
    ...(isStoryboard && {
      subStages: {
        t2i: { status: 'pending' },
        i2v: { status: 'pending' },
        t2s: { status: 'pending' },
        voice: { status: 'pending' },
      }
    }),
    // Initialize T2V for faceless videos
    ...(!isStoryboard && {
      t2v: { status: 'pending' }
    }),
  }));
}