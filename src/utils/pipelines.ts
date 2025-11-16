// Pipeline type definitions and stage configurations

/**
 * VIDEO PIPELINE VALIDATION ARCHITECTURE
 * 
 * Two-Stage Validation System for Video Pipelines:
 * 
 * 1. FACELESS VIDEO ('faceless-video'):
 *    - Stages: Script → Scene Breakdown → Scene Generation (T2V) → Assembly
 *    - If NOT automated:
 *      a) Job pauses after "Scene Breakdown" (status: 'awaiting_scene_review')
 *      b) User validates scene prompts in Jobs page
 *      c) Job continues to "Scene Generation (T2V)"
 *      d) Each scene can pause for validation (scene.status: 'awaiting_review')
 *      e) User approves/regenerates individual T2V outputs
 *      f) Once all scenes approved, continues to Assembly
 * 
 * 2. STORYBOARD VIDEO ('storyboard-video'):
 *    - Stages: Script → Scene Breakdown → Scene Generation (Multi-Stage) → Assembly
 *    - If NOT automated:
 *      a) Job pauses after "Scene Breakdown" (status: 'awaiting_scene_review')
 *      b) User validates scene prompts in Jobs page
 *      c) Job continues to "Scene Generation (Multi-Stage)"
 *      d) For EACH scene, generates 4 sub-stages sequentially:
 *         - T2I (Text-to-Image): Generate image from description
 *         - I2V (Image-to-Video): Animate the image
 *         - T2S (Text-to-Speech): Generate speech script
 *         - Voice: Generate voice audio
 *      e) Each sub-stage can pause for validation (subStage.status: 'awaiting_review')
 *      f) User can approve/regenerate individual sub-stages
 *      g) Once all scenes & sub-stages approved, continues to Assembly
 * 
 * 3. AUTOMATED MODE (both types):
 *    - Job runs straight through all stages without pausing
 *    - No validation gates
 *    - Faster but no cost control
 */

export type PipelineType = 
  | 'faceless-video'
  | 'social-media'
  | 'blog-article'
  | 'youtube-script'
  | 'storyboard-video'
  | 'ai-ugc';

export type StageStatus = 'pending' | 'running' | 'completed' | 'failed' | 'awaiting_review';
export type JobStatus = 'queued' | 'processing' | 'completed' | 'failed' | 'cancelled' | 'awaiting_scene_review';

export interface PipelineStage {
  id: string;
  name: string;
  description: string;
  estimatedDuration: number; // in seconds
}

export interface Scene {
  id: string;
  index: number;
  description: string;
  prompt: string;
  estimatedTokens: number;
  status: 'pending' | 'approved' | 'generating' | 'completed' | 'failed' | 'awaiting_review';
  generatedUrl?: string;
  duration?: number; // seconds for this scene
  consistencyParams?: {
    styleReference?: string;
    characterReferences?: string[];
    colorPalette?: string[];
  };
  // For storyboard videos: sub-stage outputs
  subStages?: {
    t2i?: { status: StageStatus; imageUrl?: string; prompt?: string }; // Text-to-Image
    i2v?: { status: StageStatus; videoUrl?: string }; // Image-to-Video
    t2s?: { status: StageStatus; audioUrl?: string; script?: string }; // Text-to-Speech script
    voice?: { status: StageStatus; audioUrl?: string }; // Voice generation
  };
  // For faceless videos: single T2V output
  t2v?: { status: StageStatus; videoUrl?: string; prompt?: string }; // Text-to-Video
}

export interface JobStageProgress {
  stageId: string;
  status: StageStatus;
  progress: number; // 0-100
  startedAt?: string;
  completedAt?: string;
  outputs?: Record<string, any>;
  error?: string;
}

export interface GenerationSettings {
  // Video settings
  videoDuration?: number; // in seconds
  numberOfScenes?: number;
  sceneDuration?: 'auto' | number; // 'auto' or seconds per scene
  aspectRatio?: '16:9' | '9:16' | '1:1' | '4:5';
  voiceoverSpeed?: 'slow' | 'normal' | 'fast';
  includeMusic?: boolean;
  includeSFX?: boolean;
  quality?: 'draft' | 'standard' | 'high' | 'ultra';
  resolution?: '720p' | '1080p' | '4K';
  automatedMode?: boolean; // If true, skip scene validation steps
}

export interface Job {
  id: string;
  userId: string;
  blueprintId: string;
  blueprintName: string;
  ideaId: string;
  ideaTitle: string;
  pipelineType: PipelineType;
  pipelineLabel: string;
  status: JobStatus;
  currentStageIndex: number;
  stages: JobStageProgress[];
  createdAt: string;
  startedAt?: string;
  completedAt?: string;
  variables: Record<string, string>;
  config: {
    llmModel: string;
    mediaModel: string;
    promptTemplate: string;
    generationSettings?: GenerationSettings;
  };
  outputs: Record<string, any>;
  scenes?: Scene[]; // For video pipelines with scene validation
}

// Pipeline stage definitions
export const PIPELINE_STAGES: Record<PipelineType, PipelineStage[]> = {
  'faceless-video': [
    { id: 'script', name: 'Script Generation', description: 'Generating video script based on blueprint', estimatedDuration: 15 },
    { id: 'scene_breakdown', name: 'Scene Breakdown', description: 'Breaking script into scenes with prompts', estimatedDuration: 10 },
    // After this stage: if NOT automated, job pauses with status 'awaiting_scene_review'
    { id: 'scene_generation', name: 'Scene Generation (T2V)', description: 'Generating video for each approved scene', estimatedDuration: 45 },
    // Each scene can pause for individual validation if not automated
    { id: 'assembly', name: 'Video Assembly', description: 'Assembling scenes into final video', estimatedDuration: 25 },
  ],
  'social-media': [
    { id: 'content', name: 'Content Generation', description: 'Creating social media post content', estimatedDuration: 10 },
    { id: 'hashtags', name: 'Hashtag Optimization', description: 'Generating optimized hashtags', estimatedDuration: 5 },
    { id: 'image', name: 'Image Generation', description: 'Creating accompanying image', estimatedDuration: 15 },
    { id: 'formatting', name: 'Final Formatting', description: 'Formatting post for platform', estimatedDuration: 3 },
  ],
  'blog-article': [
    { id: 'outline', name: 'Outline Generation', description: 'Creating article outline and structure', estimatedDuration: 8 },
    { id: 'sections', name: 'Section Writing', description: 'Writing article sections in parallel', estimatedDuration: 30 },
    { id: 'seo', name: 'SEO Optimization', description: 'Optimizing for search engines', estimatedDuration: 10 },
    { id: 'images', name: 'Image Generation', description: 'Creating featured and inline images', estimatedDuration: 20 },
    { id: 'assembly', name: 'Final Assembly', description: 'Assembling complete article with formatting', estimatedDuration: 5 },
  ],
  'youtube-script': [
    { id: 'hook', name: 'Hook Generation', description: 'Creating compelling opening hook', estimatedDuration: 8 },
    { id: 'script', name: 'Script Writing', description: 'Writing full YouTube script', estimatedDuration: 25 },
    { id: 'retention', name: 'Retention Hooks', description: 'Adding retention hooks throughout', estimatedDuration: 10 },
    { id: 'broll', name: 'B-Roll Suggestions', description: 'Generating B-roll shot suggestions', estimatedDuration: 12 },
  ],
  'storyboard-video': [
    { id: 'script', name: 'Script Generation', description: 'Generating video script', estimatedDuration: 15 },
    { id: 'scene_breakdown', name: 'Scene Breakdown', description: 'Breaking into scenes with descriptions', estimatedDuration: 10 },
    // After this stage: if NOT automated, job pauses with status 'awaiting_scene_review'
    { id: 'scene_generation', name: 'Scene Generation (Multi-Stage)', description: 'For each scene: T2I → I2V → T2S → Voice', estimatedDuration: 60 },
    // Each scene has 4 sub-stages that can be validated individually if not automated
    { id: 'assembly', name: 'Video Assembly', description: 'Assembling all scenes into final video', estimatedDuration: 20 },
  ],
  'ai-ugc': [
    { id: 'persona', name: 'Persona Creation', description: 'Creating authentic UGC persona', estimatedDuration: 10 },
    { id: 'script', name: 'Script Generation', description: 'Writing natural UGC-style script', estimatedDuration: 15 },
    { id: 'avatar', name: 'Avatar Generation', description: 'Generating AI avatar and voice', estimatedDuration: 30 },
    { id: 'assembly', name: 'Video Assembly', description: 'Creating final UGC video', estimatedDuration: 25 },
  ],
};

// Helper to get pipeline icon based on type
export function getPipelineIcon(type: PipelineType): string {
  const icons: Record<PipelineType, string> = {
    'faceless-video': '🎬',
    'social-media': '📱',
    'blog-article': '📝',
    'youtube-script': '🎥',
    'storyboard-video': '🎞️',
    'ai-ugc': '👤',
  };
  return icons[type];
}

// Helper to get total estimated duration
export function getTotalDuration(type: PipelineType): number {
  return PIPELINE_STAGES[type].reduce((sum, stage) => sum + stage.estimatedDuration, 0);
}

// Helper to format duration
export function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  if (remainingSeconds === 0) return `${minutes}m`;
  return `${minutes}m ${remainingSeconds}s`;
}

// Initialize job stages from pipeline type
export function initializeJobStages(pipelineType: PipelineType): JobStageProgress[] {
  return PIPELINE_STAGES[pipelineType].map(stage => ({
    stageId: stage.id,
    status: 'pending' as StageStatus,
    progress: 0,
  }));
}

// Helper to check if pipeline is video-based
export function isVideoPipeline(type: PipelineType): boolean {
  return ['faceless-video', 'storyboard-video', 'ai-ugc'].includes(type);
}

// Helper to get default generation settings for video pipelines
export function getDefaultGenerationSettings(type: PipelineType): GenerationSettings | undefined {
  if (!isVideoPipeline(type)) return undefined;
  
  return {
    videoDuration: 60, // 60 seconds default
    numberOfScenes: 5,
    sceneDuration: 'auto',
    aspectRatio: '9:16',
    voiceoverSpeed: 'normal',
    includeMusic: true,
    includeSFX: false,
    quality: 'standard',
    resolution: '1080p',
  };
}