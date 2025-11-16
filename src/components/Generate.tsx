import { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Zap,
  Search,
  Plus,
  Wand2,
  FileText,
  Link as LinkIcon,
  TrendingUp,
  Target,
  Settings,
  Play,
  Download,
  Copy,
  RefreshCw,
  Eye,
  ChevronDown,
  Package,
  MessageSquare,
  Mic,
  Users,
  BookOpen,
  Lightbulb,
  Info,
  Edit,
  Film,
  Clock,
  Layers,
  Maximize,
  Volume2,
  Music,
  Radio,
  Trash2,
  GripVertical,
  AlertCircle
} from 'lucide-react';
import { Job, PipelineType, initializeJobStages, GenerationSettings, isVideoPipeline, getDefaultGenerationSettings, Scene } from '../utils/pipelines';
import { SceneValidation } from './SceneValidation';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Progress } from './ui/progress';
import { Checkbox } from './ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { Textarea } from './ui/textarea';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';

// Pipeline type definitions with color coding
const pipelineTypes = {
  'ai-ugc': { 
    name: 'AI UGC', 
    gradient: 'from-purple-600 to-purple-500',
    hoverGradient: 'from-purple-700 to-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    text: 'text-purple-600',
    icon: '👥',
    description: 'User-generated style content with AI'
  },
  'faceless-video': { 
    name: 'Faceless Video', 
    gradient: 'from-blue-600 to-blue-500',
    hoverGradient: 'from-blue-700 to-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-600',
    icon: '🎬',
    description: 'Automated video content without faces'
  },
  'social-media': { 
    name: 'Social Media Post', 
    gradient: 'from-pink-600 to-pink-500',
    hoverGradient: 'from-pink-700 to-pink-600',
    bg: 'bg-pink-50',
    border: 'border-pink-200',
    text: 'text-pink-600',
    icon: '📱',
    description: 'Engaging social media content'
  },
  'storyboard-video': { 
    name: 'Storyboard Video', 
    gradient: 'from-orange-600 to-orange-500',
    hoverGradient: 'from-orange-700 to-orange-600',
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    text: 'text-orange-600',
    icon: '🎞️',
    description: 'Visual storyboard sequences'
  },
  'youtube-script': { 
    name: 'YouTube Script', 
    gradient: 'from-red-600 to-red-500',
    hoverGradient: 'from-red-700 to-red-600',
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-600',
    icon: '📺',
    description: 'Professional YouTube scripts'
  },
  'blog-article': { 
    name: 'Blog Article', 
    gradient: 'from-green-600 to-green-500',
    hoverGradient: 'from-green-700 to-green-600',
    bg: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-600',
    icon: '📝',
    description: 'SEO-optimized blog content'
  },
};

// Mock data
const mockBlueprints = [
  {
    id: '1',
    name: 'Social Media Master Blueprint',
    description: 'Create engaging social posts with proven templates',
    pipelineType: 'social-media',
    variables: ['product', 'angle', 'voice'],
    llmModel: 'GPT-4o',
    mediaModel: 'DALL-E 3',
    usageCount: 45,
    lastUsed: '2 days ago',
    promptTemplate: `You are a social media expert creating engaging content about {{product}}.

Use the {{angle}} framework to structure your post.
Write in a {{voice}} tone that resonates with the target audience.

Create a compelling social media post that:
- Hooks attention in the first line
- Highlights 3 key benefits
- Includes a clear call-to-action
- Uses relevant emojis strategically
- Includes 3-5 relevant hashtags`,
  },
  {
    id: '2',
    name: 'Faceless Video Pro',
    description: 'Professional faceless video content generator',
    pipelineType: 'faceless-video',
    variables: ['product', 'angle', 'voice', 'story'],
    llmModel: 'Claude 3.5 Sonnet',
    mediaModel: 'Runway Gen-3',
    usageCount: 23,
    lastUsed: '5 days ago',
    promptTemplate: `Create a faceless video script about {{product}}.

Use the {{angle}} approach and tell it using {{story}} structure.
Maintain a {{voice}} throughout the narration.

Script Requirements:
- Hook: First 3 seconds must grab attention
- Problem: Clearly define the pain point
- Solution: Introduce {{product}} as the answer
- Proof: Include statistics or testimonials
- CTA: Strong call-to-action at the end

Include B-roll suggestions and background music notes.`,
  },
  {
    id: '3',
    name: 'Blog SEO Optimizer',
    description: 'SEO-optimized blog articles with keyword targeting',
    pipelineType: 'blog-article',
    variables: ['product', 'angle', 'voice', 'keywords'],
    llmModel: 'GPT-4o',
    mediaModel: 'DALL-E 3',
    usageCount: 67,
    lastUsed: '1 day ago',
    promptTemplate: `Write an SEO-optimized blog article about {{product}}.

Target keywords: {{keywords}}
Use {{angle}} as the main framework.
Write in {{voice}} style.

Article Structure:
- Compelling H1 title with primary keyword
- Introduction with hook (150 words)
- 3-5 H2 sections with detailed content
- Include internal linking opportunities
- Meta description (155 characters)
- Conclusion with CTA

Optimize for featured snippets and maintain 2-3% keyword density.`,
  },
  {
    id: '4',
    name: 'YouTube Hook Master',
    description: 'Scripts optimized for viewer retention',
    pipelineType: 'youtube-script',
    variables: ['product', 'angle', 'voice', 'character'],
    llmModel: 'Claude 3.5 Sonnet',
    mediaModel: 'None',
    usageCount: 34,
    lastUsed: '3 days ago',
    promptTemplate: `Create a YouTube script about {{product}} featuring {{character}}.

Use {{angle}} framework and maintain {{voice}} throughout.

Script Format:
- HOOK (0-15s): Pattern interrupt that stops scrolling
- INTRO (15-30s): What viewers will learn
- MAIN CONTENT: 3 key points with examples
- RETENTION HOOKS: Every 60 seconds, add a teaser
- OUTRO: Recap and strong CTA

Include on-screen text suggestions and b-roll notes.
Optimize for 8-12 minute video length.`,
  },
  {
    id: '5',
    name: 'Storyboard Video Creator',
    description: 'Multi-stage video with T2I → I2V → T2S → Voice workflow',
    pipelineType: 'storyboard-video',
    variables: ['product', 'angle', 'voice', 'story'],
    llmModel: 'GPT-4o',
    mediaModel: 'Runway Gen-3',
    usageCount: 12,
    lastUsed: '1 week ago',
    promptTemplate: `Create a compelling storyboard video about {{product}}.

Use {{story}} narrative structure with {{angle}} framework.
Maintain {{voice}} tone throughout.

Storyboard Requirements:
- Opening Scene: Visual hook that grabs attention
- Problem Setup: Show the pain point visually
- Product Introduction: Hero shot of {{product}}
- Feature Highlights: 2-3 key benefits with visual demonstrations
- Closing Scene: Strong CTA with brand recall

For each scene, provide:
1. Visual Description: What viewers see (for T2I generation)
2. Camera Movement: Pans, zooms, transitions (for I2V)
3. Voiceover Script: What's being said (for T2S)
4. Tone Notes: Emotion and pacing (for Voice)

Optimize for 30-60 second final video with smooth scene transitions.`,
  },
];

const mockIdeas = [
  {
    id: '1',
    name: 'Product Launch Campaign',
    description: 'Create buzz around new AirPods Pro release targeting professionals',
    status: 'ready',
    variables: {
      product: 'Apple AirPods Pro (2nd Gen)',
      angle: 'Problem-Solution Framework',
    },
    createdAt: 'Dec 15, 2024',
  },
  {
    id: '2',
    name: 'Holiday Gift Guide',
    description: 'Tech gift recommendations for the holiday season',
    status: 'draft',
    variables: {
      product: 'Various Tech Products',
      angle: 'Gift Guide',
    },
    createdAt: 'Dec 10, 2024',
  },
  {
    id: '3',
    name: 'Productivity Hack Series',
    description: 'Show how tech products boost productivity',
    status: 'ready',
    variables: {
      product: 'n8n.io',
      angle: 'Transformation Story',
      voice: 'Expert Authority',
    },
    createdAt: 'Dec 8, 2024',
  },
];

const mockAssets = {
  products: [
    { id: '1', name: 'Apple AirPods Pro (2nd Gen)' },
    { id: '2', name: 'n8n.io' },
    { id: '3', name: 'ACA (Xtreme)' },
  ],
  angles: [
    { id: '1', name: 'Problem-Solution Framework' },
    { id: '2', name: 'Before-After Transformation' },
    { id: '3', name: 'Social Proof & Authority' },
  ],
  voices: [
    { id: '1', name: 'Expert Authority' },
    { id: '2', name: 'Friendly Guide' },
    { id: '3', name: 'Motivational Coach' },
  ],
  characters: [
    { id: '1', name: 'Sarah - The Overwhelmed Entrepreneur' },
    { id: '2', name: 'Mike - Tech-Savvy Professional' },
  ],
  stories: [
    { id: '1', name: "Hero's Journey" },
    { id: '2', name: 'Rags to Riches' },
  ],
};

const llmModels = [
  'GPT-4o',
  'GPT-4o Mini',
  'Claude 3.5 Sonnet',
  'Claude 3.5 Haiku',
  'Gemini 1.5 Pro',
  'Gemini 1.5 Flash',
  'Llama 3.3 70B',
  'Mistral Large',
];

const mediaModels = [
  'DALL-E 3',
  'DALL-E 2',
  'Midjourney v6',
  'Stable Diffusion XL',
  'Runway Gen-3',
  'Pika Labs',
  'None',
];

export function Generate({ onAddJobs }: { onAddJobs: (jobs: Job[]) => void }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPipelineType, setSelectedPipelineType] = useState<string | null>(null);
  const [selectedIdeas, setSelectedIdeas] = useState<typeof mockIdeas>([]);
  const [selectedBlueprint, setSelectedBlueprint] = useState<typeof mockBlueprints[0] | null>(null);
  const [contextMode, setContextMode] = useState<'idea' | 'ai'>('idea');
  const [selectedIdea, setSelectedIdea] = useState<typeof mockIdeas[0] | null>(null);
  const [variables, setVariables] = useState<Record<string, string>>({});
  const [jobsQueued, setJobsQueued] = useState(false);
  const [aiIdeaPrompt, setAiIdeaPrompt] = useState('');
  const [isGeneratingIdea, setIsGeneratingIdea] = useState(false);
  const [blueprintSearch, setBlueprintSearch] = useState('');
  const [showBlueprintPrompt, setShowBlueprintPrompt] = useState(true);
  const [isEditingBlueprint, setIsEditingBlueprint] = useState(false);
  const [editedPrompt, setEditedPrompt] = useState('');
  const [editedLlmModel, setEditedLlmModel] = useState('');
  const [editedMediaModel, setEditedMediaModel] = useState('');
  const [generationSettings, setGenerationSettings] = useState<GenerationSettings>({});
  const [customDuration, setCustomDuration] = useState<string>('');
  const [customScenes, setCustomScenes] = useState<string>('');
  const [scenes, setScenes] = useState<Scene[]>([]);
  const [isGeneratingScenes, setIsGeneratingScenes] = useState(false);
  const [editingSceneId, setEditingSceneId] = useState<string | null>(null);
  const [editedSceneDescription, setEditedSceneDescription] = useState('');

  // Filter blueprints by selected pipeline type
  const filteredBlueprints = mockBlueprints.filter(bp => {
    const matchesSearch = bp.name.toLowerCase().includes(blueprintSearch.toLowerCase()) ||
      bp.description.toLowerCase().includes(blueprintSearch.toLowerCase());
    const matchesPipeline = !selectedPipelineType || bp.pipelineType === selectedPipelineType;
    return matchesSearch && matchesPipeline;
  });

  const handlePipelineTypeSelect = (type: string) => {
    setSelectedPipelineType(type);
    setCurrentStep(2);
  };

  const handleIdeasSelect = (ideas: typeof mockIdeas) => {
    setSelectedIdeas(ideas);
    // Auto-populate variables from first idea if available
    if (ideas.length > 0 && ideas[0].variables) {
      setVariables(ideas[0].variables);
    }
    setCurrentStep(3);
  };

  const handleBlueprintSelect = (blueprint: typeof mockBlueprints[0]) => {
    setSelectedBlueprint(blueprint);
    setCurrentStep(2);
  };

  const handleIdeaSelect = (idea: typeof mockIdeas[0]) => {
    const isSelected = selectedIdeas.some(i => i.id === idea.id);
    if (isSelected) {
      setSelectedIdeas(selectedIdeas.filter(i => i.id !== idea.id));
    } else {
      setSelectedIdeas([...selectedIdeas, idea]);
    }
  };

  const handleGenerateIdea = async () => {
    if (!aiIdeaPrompt.trim()) return;
    
    setIsGeneratingIdea(true);
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Mock generated idea
    setSelectedIdea({
      id: 'ai-generated',
      name: 'AI Generated: ' + aiIdeaPrompt.substring(0, 30) + '...',
      description: 'AI-generated idea based on your prompt',
      status: 'ready',
      variables: {
        product: 'Apple AirPods Pro (2nd Gen)',
        angle: 'Problem-Solution Framework',
        voice: 'Expert Authority',
      },
      createdAt: 'Just now',
    });
    setVariables({
      product: 'Apple AirPods Pro (2nd Gen)',
      angle: 'Problem-Solution Framework',
      voice: 'Expert Authority',
    });
    setIsGeneratingIdea(false);
  };

  const handleEditBlueprint = () => {
    if (selectedBlueprint) {
      setEditedPrompt(selectedBlueprint.promptTemplate);
      setEditedLlmModel(selectedBlueprint.llmModel);
      setEditedMediaModel(selectedBlueprint.mediaModel);
      setIsEditingBlueprint(true);
    }
  };

  const handleSaveBlueprintEdits = () => {
    if (selectedBlueprint) {
      setSelectedBlueprint({
        ...selectedBlueprint,
        promptTemplate: editedPrompt,
        llmModel: editedLlmModel,
        mediaModel: editedMediaModel,
      });
      setIsEditingBlueprint(false);
    }
  };

  const handleCancelBlueprintEdits = () => {
    setIsEditingBlueprint(false);
  };

  // Scene management handlers
  const handleGenerateScenes = async () => {
    if (!selectedBlueprint || selectedIdeas.length === 0) return;
    
    setIsGeneratingScenes(true);
    
    // Simulate API call to generate scene breakdown
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Mock scene generation
    const numScenes = generationSettings.numberOfScenes || 5;
    const sceneDuration = generationSettings.videoDuration ? Math.round(generationSettings.videoDuration / numScenes) : 12;
    
    const mockScenes: Scene[] = Array.from({ length: numScenes }, (_, i) => ({
      id: `scene-${Date.now()}-${i}`,
      index: i,
      description: `Scene ${i + 1}: ${['Opening hook with product reveal', 'Problem statement and pain points', 'Solution introduction with benefits', 'Social proof and testimonials', 'Strong call-to-action'][i % 5]}`,
      prompt: `Create a ${sceneDuration}s video scene showing ${['dynamic product reveal with motion graphics', 'frustrated person dealing with problem', 'happy user experiencing solution', 'multiple satisfied customers testimonials', 'compelling offer with clear next steps'][i % 5]}. Style: Modern, engaging, ${generationSettings.aspectRatio} format.`,
      estimatedTokens: Math.floor(Math.random() * 500) + 300,
      status: 'pending',
      duration: sceneDuration,
    }));
    
    setScenes(mockScenes);
    setIsGeneratingScenes(false);
  };

  const handleApproveScene = (sceneId: string) => {
    setScenes(prev => prev.map(scene =>
      scene.id === sceneId ? { ...scene, status: 'approved' as const } : scene
    ));
  };

  const handleApproveAllScenes = () => {
    setScenes(prev => prev.map(scene => ({ ...scene, status: 'approved' as const })));
  };

  const handleDeleteScene = (sceneId: string) => {
    setScenes(prev => prev.filter(scene => scene.id !== sceneId));
  };

  const handleRegenerateScene = async (sceneId: string) => {
    setScenes(prev => prev.map(scene =>
      scene.id === sceneId ? { ...scene, status: 'pending' as const } : scene
    ));
    
    // Simulate regeneration
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const updatedDescription = `Regenerated: ${scenes.find(s => s.id === sceneId)?.description}`;
    setScenes(prev => prev.map(scene =>
      scene.id === sceneId ? { ...scene, description: updatedDescription } : scene
    ));
  };

  const handleEditScene = (sceneId: string) => {
    const scene = scenes.find(s => s.id === sceneId);
    if (scene) {
      setEditingSceneId(sceneId);
      setEditedSceneDescription(scene.description);
    }
  };

  const handleSaveSceneEdit = () => {
    if (editingSceneId) {
      setScenes(prev => prev.map(scene =>
        scene.id === editingSceneId ? { ...scene, description: editedSceneDescription } : scene
      ));
      setEditingSceneId(null);
      setEditedSceneDescription('');
    }
  };

  const handleCancelSceneEdit = () => {
    setEditingSceneId(null);
    setEditedSceneDescription('');
  };

  const handleMoveScene = (sceneId: string, direction: 'up' | 'down') => {
    setScenes(prev => {
      const index = prev.findIndex(s => s.id === sceneId);
      if (index === -1) return prev;
      
      const newIndex = direction === 'up' ? index - 1 : index + 1;
      if (newIndex < 0 || newIndex >= prev.length) return prev;
      
      const newScenes = [...prev];
      [newScenes[index], newScenes[newIndex]] = [newScenes[newIndex], newScenes[index]];
      
      // Update indices
      return newScenes.map((scene, i) => ({ ...scene, index: i }));
    });
  };

  const handleQueueJobs = () => {
    if (!selectedBlueprint || selectedIdeas.length === 0 || !selectedPipelineType) return;

    // Create a job for each selected idea
    const newJobs: Job[] = selectedIdeas.map(idea => {
      const allVariables = { ...idea.variables, ...variables };
      
      // Prepare config with generation settings if it's a video pipeline
      const config: Job['config'] = {
        llmModel: selectedBlueprint.llmModel,
        mediaModel: selectedBlueprint.mediaModel,
        promptTemplate: selectedBlueprint.promptTemplate,
      };
      
      if (isVideoPipeline(selectedPipelineType as PipelineType) && Object.keys(generationSettings).length > 0) {
        config.generationSettings = generationSettings;
      }
      
      const job: Job = {
        id: `job-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        userId: 'user-1',
        blueprintId: selectedBlueprint.id,
        blueprintName: selectedBlueprint.name,
        ideaId: idea.id,
        ideaTitle: idea.name,
        pipelineType: selectedPipelineType as PipelineType,
        pipelineLabel: pipelineTypes[selectedPipelineType as keyof typeof pipelineTypes]?.name || '',
        status: 'queued',
        currentStageIndex: 0,
        stages: initializeJobStages(selectedPipelineType as PipelineType),
        createdAt: new Date().toISOString(),
        variables: allVariables,
        config,
        outputs: {},
      };

      // Add approved scenes for video pipelines if not in automated mode
      if (isVideoPipeline(selectedPipelineType as PipelineType) && !generationSettings.automatedMode && scenes.length > 0) {
        job.scenes = scenes.filter(s => s.status === 'approved');
      }

      return job;
    });

    // Add jobs to queue
    onAddJobs(newJobs);

    // Show confirmation
    setJobsQueued(true);
    // Go to step 4 for non-video, step 5 for video
    const confirmationStep = isVideoPipeline(selectedPipelineType as PipelineType) ? 5 : 4;
    setCurrentStep(confirmationStep);

    // Auto-reset after 3 seconds
    setTimeout(() => {
      handleReset();
    }, 3000);
  };

  const handleReset = () => {
    setCurrentStep(1);
    setSelectedPipelineType(null);
    setSelectedBlueprint(null);
    setSelectedIdeas([]);
    setSelectedIdea(null);
    setVariables({});
    setJobsQueued(false);
    setContextMode('idea');
    setAiIdeaPrompt('');
    setGenerationSettings({});
    setCustomDuration('');
    setCustomScenes('');
    setScenes([]);
    setIsGeneratingScenes(false);
    setEditingSceneId(null);
    setEditedSceneDescription('');
  };

  const getStepColor = () => {
    if (!selectedPipelineType) return 'from-slate-600 to-slate-500';
    return pipelineTypes[selectedPipelineType as keyof typeof pipelineTypes].gradient;
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header with Progress */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-[1400px] mx-auto px-8 py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getStepColor()} flex items-center justify-center text-white shadow-lg`}>
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-slate-900">Generate Content</h1>
                <p className="text-slate-600">Create amazing content with AI assistance</p>
              </div>
            </div>
            {currentStep > 1 && currentStep < 4 && (
              <Button variant="outline" onClick={handleReset} className="rounded-xl">
                Start Over
              </Button>
            )}
          </div>

          {/* Progress Steps */}
          <div className="flex items-center gap-2">
            {(() => {
              const isVideoType = selectedPipelineType && isVideoPipeline(selectedPipelineType as PipelineType);
              const steps = isVideoType 
                ? [
                    { num: 1, label: 'Choose Type' },
                    { num: 2, label: 'Select Ideas' },
                    { num: 3, label: 'Configure' },
                    { num: 4, label: 'Choose Blueprint' },
                    { num: 5, label: 'Generate' },
                  ]
                : [
                    { num: 1, label: 'Choose Type' },
                    { num: 2, label: 'Select Ideas' },
                    { num: 3, label: 'Choose Blueprint' },
                    { num: 4, label: 'Generate' },
                  ];
              return steps.map((step, idx) => (
              <div key={step.num} className="flex items-center flex-1">
                <div className="flex items-center gap-3 flex-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all ${
                    currentStep > step.num 
                      ? `bg-gradient-to-br ${getStepColor()} text-white`
                      : currentStep === step.num
                      ? `bg-gradient-to-br ${getStepColor()} text-white`
                      : 'bg-slate-100 text-slate-400'
                  }`}>
                    {currentStep > step.num ? <Check className="w-4 h-4" /> : step.num}
                  </div>
                  <div className="flex-1">
                    <div className={`text-sm ${currentStep >= step.num ? 'text-slate-900' : 'text-slate-400'}`}>
                      {step.label}
                    </div>
                  </div>
                </div>
                {idx < steps.length - 1 && (
                  <div className={`w-full h-1 rounded-full mx-2 ${
                    currentStep > step.num ? `bg-gradient-to-r ${getStepColor()}` : 'bg-slate-200'
                  }`} />
                )}
              </div>
              ));
            })()}
          </div>

          {/* Context Bar */}
          {currentStep >= 2 && (
            <div className="mt-4 flex items-center gap-2 text-sm text-slate-600 bg-slate-50 rounded-lg p-3">
              {selectedPipelineType && (
                <>
                  <span className={`${pipelineTypes[selectedPipelineType as keyof typeof pipelineTypes].text}`}>
                    {pipelineTypes[selectedPipelineType as keyof typeof pipelineTypes].icon} {pipelineTypes[selectedPipelineType as keyof typeof pipelineTypes].name}
                  </span>
                  {selectedIdea && <ArrowRight className="w-4 h-4" />}
                </>
              )}
              {selectedIdea && (
                <>
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  <span className="text-slate-900">{selectedIdea.name}</span>
                </>
              )}
              {selectedBlueprint && (
                <>
                  <ArrowRight className="w-4 h-4" />
                  <FileText className={`w-4 h-4 ${pipelineTypes[selectedBlueprint.pipelineType as keyof typeof pipelineTypes].text}`} />
                  <span className="text-slate-900">{selectedBlueprint.name}</span>
                </>
              )}
            </div>
          )}
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-8 py-8">
        {/* Step 1: Choose Type */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-slate-900 mb-2">What type of content do you want to create?</h2>
              <p className="text-slate-600">Choose your pipeline type to get started</p>
            </div>

            {/* Pipeline Types Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(pipelineTypes).map(([key, type]) => (
                <Card
                  key={key}
                  className="group border-slate-200/60 hover:border-slate-300 shadow-lg hover:shadow-xl transition-all cursor-pointer overflow-hidden"
                  onClick={() => handlePipelineTypeSelect(key)}
                >
                  <CardContent className="p-6">
                    <div className="text-center space-y-4">
                      {/* Icon */}
                      <div className={`w-20 h-20 mx-auto rounded-xl bg-gradient-to-br ${type.gradient} flex items-center justify-center text-4xl shadow-lg group-hover:scale-110 transition-transform`}>
                        {type.icon}
                      </div>

                      {/* Content */}
                      <div>
                        <h3 className="text-slate-900 mb-2">{type.name}</h3>
                        <p className="text-sm text-slate-600">{type.description}</p>
                      </div>

                      {/* Badge showing available blueprints */}
                      <div>
                        <Badge className={`${type.bg} ${type.text} ${type.border}`}>
                          {mockBlueprints.filter(bp => bp.pipelineType === key).length} Blueprints
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Select Ideas */}
        {currentStep === 2 && selectedPipelineType && (
          <div className="space-y-6">
            <div>
              <h2 className="text-slate-900 mb-2">Provide Context</h2>
              <p className="text-slate-600">How would you like to provide the content variables?</p>
            </div>

            <Tabs value={contextMode} onValueChange={(v) => setContextMode(v as any)} className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 bg-white border border-slate-200 rounded-xl p-1 h-auto">
                <TabsTrigger value="idea" className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-amber-500 data-[state=active]:to-amber-600 data-[state=active]:text-white rounded-lg py-2.5">
                  <Lightbulb className="w-4 h-4 mr-2" />
                  From Idea
                </TabsTrigger>
                <TabsTrigger value="ai" className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-purple-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg py-2.5">
                  <Wand2 className="w-4 h-4 mr-2" />
                  AI Generate
                </TabsTrigger>
              </TabsList>

              {/* Tab 1: From Idea */}
              <TabsContent value="idea" className="space-y-4">
                <Card className="border-slate-200/60 shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Lightbulb className="w-5 h-5 text-amber-500" />
                        Select Ideas
                      </CardTitle>
                      <CardDescription>Select one or multiple ideas for bulk generation</CardDescription>
                    </div>
                    {selectedIdeas.length > 0 && (
                      <Badge className="bg-amber-500 text-white">
                        {selectedIdeas.length} selected
                      </Badge>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {mockIdeas.map((idea) => {
                      const isSelected = selectedIdeas.some(i => i.id === idea.id);
                      return (
                        <div
                          key={idea.id}
                          onClick={() => handleIdeaSelect(idea)}
                          className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                            isSelected
                              ? 'border-amber-500 bg-amber-50'
                              : 'border-slate-200 hover:border-slate-300 bg-white'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <Checkbox
                              checked={isSelected}
                              className="mt-1"
                              onClick={(e) => e.stopPropagation()}
                            />
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <h4 className="text-slate-900">{idea.name}</h4>
                                <Badge className={idea.status === 'ready' ? 'bg-green-50 text-green-600 border-green-200' : 'bg-orange-50 text-orange-600 border-orange-200'}>
                                  {idea.status}
                                </Badge>
                              </div>
                              <p className="text-sm text-slate-600 mb-2">{idea.description}</p>
                              <div className="text-xs text-slate-500">{idea.createdAt}</div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>

                {selectedIdeas.length > 0 && (
                  <Card className="border-green-200 bg-green-50 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-green-900">
                        <Check className="w-5 h-5" />
                        {selectedIdeas.length} {selectedIdeas.length === 1 ? 'Idea' : 'Ideas'} Selected
                      </CardTitle>
                      <CardDescription className="text-green-700">
                        Content will be generated for each selected idea
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {selectedIdeas.map((idea) => (
                          <div key={idea.id} className="flex items-center gap-2 text-sm p-2 bg-white rounded border border-green-200">
                            <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                            <span className="text-slate-900">{idea.name}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {/* Tab 2: AI Generate */}
              <TabsContent value="ai" className="space-y-4">
                <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-indigo-50 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-purple-900">
                      <Wand2 className="w-5 h-5" />
                      AI-Powered Idea Generation
                    </CardTitle>
                    <CardDescription className="text-purple-700">
                      Let AI create a complete idea with all variables filled
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline" className="h-auto py-3 flex-col items-start bg-white hover:bg-purple-50 border-purple-200">
                        <LinkIcon className="w-4 h-4 mb-1" />
                        <span className="text-sm">Scrape URL</span>
                      </Button>
                      <Button variant="outline" className="h-auto py-3 flex-col items-start bg-white hover:bg-purple-50 border-purple-200">
                        <Package className="w-4 h-4 mb-1" />
                        <span className="text-sm">Product-based</span>
                      </Button>
                      <Button variant="outline" className="h-auto py-3 flex-col items-start bg-white hover:bg-purple-50 border-purple-200">
                        <TrendingUp className="w-4 h-4 mb-1" />
                        <span className="text-sm">Trend-based</span>
                      </Button>
                      <Button variant="outline" className="h-auto py-3 flex-col items-start bg-white hover:bg-purple-50 border-purple-200">
                        <Target className="w-4 h-4 mb-1" />
                        <span className="text-sm">Competitor Analysis</span>
                      </Button>
                    </div>

                    <div className="pt-4 border-t border-purple-200">
                      <Label htmlFor="ai-prompt" className="text-purple-900 mb-2">Or describe what you want:</Label>
                      <Textarea
                        id="ai-prompt"
                        value={aiIdeaPrompt}
                        onChange={(e) => setAiIdeaPrompt(e.target.value)}
                        placeholder="Create a video about AirPods Pro targeting busy professionals who need better focus..."
                        rows={4}
                        className="bg-white border-purple-200 focus:border-purple-400"
                      />
                      <div className="flex items-start gap-2 mt-3 text-sm text-purple-700">
                        <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                        <p>AI will generate the idea concept and automatically select the best assets from your library to fill all variables.</p>
                      </div>
                    </div>

                    <Button
                      onClick={handleGenerateIdea}
                      disabled={!aiIdeaPrompt.trim() || isGeneratingIdea}
                      className="w-full h-12 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white shadow-lg shadow-purple-500/30"
                    >
                      {isGeneratingIdea ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Wand2 className="w-4 h-4 mr-2" />
                          Generate with AI
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>

                {selectedIdea && (
                  <Card className="border-green-200 bg-green-50 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-green-900">
                        <Check className="w-5 h-5" />
                        AI Generated Idea
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <div className="text-sm text-slate-700 mb-1">Idea Name:</div>
                        <div className="text-slate-900">{selectedIdea.name}</div>
                      </div>
                      <div>
                        <div className="text-sm text-slate-700 mb-2">Variables Auto-Filled:</div>
                        <div className="space-y-2">
                          {Object.entries(selectedIdea.variables).map(([key, value]) => (
                            <div key={key} className="flex items-center gap-2 text-sm">
                              <Check className="w-4 h-4 text-green-600" />
                              <code className="bg-white px-2 py-0.5 rounded text-green-600">{`{{${key}}}`}</code>
                              {' → '}
                              <span className="text-slate-900">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>

            <div className="flex justify-between pt-6">
              <Button variant="outline" onClick={() => setCurrentStep(1)} className="rounded-xl">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button
                onClick={() => {
                  // For video pipelines, go to configuration first
                  if (selectedPipelineType && isVideoPipeline(selectedPipelineType as PipelineType)) {
                    // Initialize generation settings with defaults
                    const defaults = getDefaultGenerationSettings(selectedPipelineType as PipelineType);
                    if (defaults) {
                      setGenerationSettings(defaults);
                    }
                    setCurrentStep(3);
                  } else {
                    // For non-video, go directly to blueprint selection
                    setCurrentStep(3);
                  }
                }}
                disabled={selectedIdeas.length === 0 && !selectedIdea}
                className={`bg-gradient-to-r ${selectedPipelineType ? pipelineTypes[selectedPipelineType as keyof typeof pipelineTypes].gradient : 'from-slate-600 to-slate-500'} text-white rounded-xl shadow-lg`}
              >
                Continue with {selectedIdeas.length > 0 ? `${selectedIdeas.length} ${selectedIdeas.length === 1 ? 'idea' : 'ideas'}` : selectedIdea ? '1 idea' : 'ideas'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Configure Video Settings (Video Only) OR Choose Blueprint (Non-Video) */}
        {currentStep === 3 && selectedPipelineType && !isVideoPipeline(selectedPipelineType as PipelineType) && (
          <div className="space-y-6">
            {!selectedBlueprint ? (
              <>
                <div>
                  <h2 className="text-slate-900 mb-2">Choose Blueprint</h2>
                  <p className="text-slate-600">Select a blueprint for your {selectedPipelineType ? pipelineTypes[selectedPipelineType as keyof typeof pipelineTypes].name : 'content'}</p>
                </div>

                {/* Search & Filters */}
                <div className="flex gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                      placeholder="Search blueprints..."
                      value={blueprintSearch}
                      onChange={(e) => setBlueprintSearch(e.target.value)}
                      className="pl-12 h-12 bg-white border-slate-200 rounded-xl shadow-sm"
                    />
                  </div>
                </div>

                {/* Blueprints Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredBlueprints.map((blueprint) => {
                    const pipelineType = pipelineTypes[blueprint.pipelineType as keyof typeof pipelineTypes];
                    return (
                      <Card
                        key={blueprint.id}
                        className="group border-slate-200/60 hover:border-slate-300 shadow-lg hover:shadow-xl transition-all cursor-pointer"
                        onClick={() => {
                          setSelectedBlueprint(blueprint);
                          // Pre-fill variables from selected ideas if available
                          if (selectedIdeas.length > 0) {
                            const firstIdea = selectedIdeas[0];
                            setVariables(firstIdea.variables);
                          }
                        }}
                      >
                        <CardContent className="p-6">
                          <div className="flex gap-4">
                            {/* Icon */}
                            <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${pipelineType.gradient} flex items-center justify-center text-2xl flex-shrink-0 shadow-lg`}>
                              {pipelineType.icon}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between mb-2">
                                <h3 className="text-slate-900 mb-1">{blueprint.name}</h3>
                                <Badge className={`${pipelineType.bg} ${pipelineType.text} ${pipelineType.border} ml-2 whitespace-nowrap`}>
                                  {pipelineType.name}
                                </Badge>
                              </div>
                              <p className="text-sm text-slate-600 mb-3">{blueprint.description}</p>

                              <div className="space-y-2">
                                <div className="flex items-center gap-2 text-xs text-slate-500">
                                  <Settings className="w-3 h-3" />
                                  <span>Variables: {blueprint.variables.map(v => `{{${v}}}`).join(', ')}</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-slate-500">
                                  <Sparkles className="w-3 h-3" />
                                  <span>AI: {blueprint.llmModel} + {blueprint.mediaModel}</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-slate-500">
                                  <TrendingUp className="w-3 h-3" />
                                  <span>Used {blueprint.usageCount} times • Last: {blueprint.lastUsed}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                {filteredBlueprints.length === 0 && (
                  <Card className="border-slate-200/60 shadow-sm">
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                        <Search className="w-8 h-8 text-slate-400" />
                      </div>
                      <h3 className="text-lg text-slate-900 mb-2">No blueprints found</h3>
                      <p className="text-sm text-slate-500 text-center max-w-md">
                        Try adjusting your search or filter criteria
                      </p>
                    </CardContent>
                  </Card>
                )}

                <div className="flex justify-between pt-6">
                  <Button variant="outline" onClick={() => setCurrentStep(2)} className="rounded-xl">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                </div>
              </>
            ) : (
              <>
                {/* Blueprint Selected - Show Variable Configuration */}
                <div>
                  <h2 className="text-slate-900 mb-2">Configure Variables</h2>
                  <p className="text-slate-600">Review and fill in all required variables for your blueprint</p>
                </div>

                {/* Selected Blueprint Info */}
                <Card className="border-slate-200/60 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${pipelineTypes[selectedBlueprint.pipelineType as keyof typeof pipelineTypes].gradient} flex items-center justify-center text-2xl shadow-lg`}>
                          {pipelineTypes[selectedBlueprint.pipelineType as keyof typeof pipelineTypes].icon}
                        </div>
                        <div>
                          <CardTitle>{selectedBlueprint.name}</CardTitle>
                          <CardDescription>{selectedBlueprint.description}</CardDescription>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => setSelectedBlueprint(null)}>
                        Change Blueprint
                      </Button>
                    </div>
                  </CardHeader>
                </Card>

                {/* Blueprint Prompt Template */}
                <Collapsible open={showBlueprintPrompt} onOpenChange={setShowBlueprintPrompt}>
                  <Card className="border-indigo-200 bg-gradient-to-br from-indigo-50 to-purple-50 shadow-lg">
                    <CollapsibleTrigger className="w-full" disabled={isEditingBlueprint}>
                      <CardHeader className="cursor-pointer hover:bg-white/50 transition-colors rounded-t-lg">
                        <div className="flex items-center justify-between">
                          <CardTitle className="flex items-center gap-2 text-indigo-900">
                            <FileText className="w-5 h-5" />
                            Blueprint Prompt Template
                          </CardTitle>
                          {!isEditingBlueprint && (
                            <ChevronDown className={`w-5 h-5 text-indigo-600 transition-transform ${showBlueprintPrompt ? 'rotate-180' : ''}`} />
                          )}
                        </div>
                        <CardDescription className="text-indigo-700 text-left">
                          {isEditingBlueprint ? 'Editing prompt and models' : 'View and edit the prompt template and model configuration'}
                        </CardDescription>
                      </CardHeader>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <CardContent className="space-y-4">
                        {!isEditingBlueprint ? (
                          <>
                            {/* Model Configuration - View Mode */}
                            <div className="flex items-center justify-between">
                              <div className="grid grid-cols-2 gap-3 flex-1">
                                <div className="p-3 bg-white rounded-lg border border-indigo-200">
                                  <div className="text-xs text-slate-600 mb-1">LLM Model</div>
                                  <div className="text-sm text-slate-900 flex items-center gap-2">
                                    <Sparkles className="w-4 h-4 text-indigo-600" />
                                    {selectedBlueprint.llmModel}
                                  </div>
                                </div>
                                <div className="p-3 bg-white rounded-lg border border-indigo-200">
                                  <div className="text-xs text-slate-600 mb-1">Media Model</div>
                                  <div className="text-sm text-slate-900 flex items-center gap-2">
                                    <Sparkles className="w-4 h-4 text-purple-600" />
                                    {selectedBlueprint.mediaModel}
                                  </div>
                                </div>
                              </div>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={handleEditBlueprint}
                                className="ml-3"
                              >
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                              </Button>
                            </div>

                            {/* Prompt Template - View Mode */}
                            <div>
                              <Label className="text-indigo-900 mb-2">Prompt Template:</Label>
                              <div className="p-4 bg-slate-900 rounded-lg text-slate-100 text-sm font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">
                                {selectedBlueprint.promptTemplate.split(/(\{\{[^}]+\}\})/).map((part, idx) => {
                                  if (part.match(/\{\{[^}]+\}\}/)) {
                                    const variable = part.replace(/\{\{|\}\}/g, '');
                                    const hasValue = selectedIdeas.some(idea => idea.variables[variable]) || variables[variable];
                                    return (
                                      <span
                                        key={idx}
                                        className={`${
                                          hasValue
                                            ? 'bg-green-500 text-white'
                                            : 'bg-amber-500 text-white'
                                        } px-1.5 py-0.5 rounded font-semibold`}
                                      >
                                        {part}
                                      </span>
                                    );
                                  }
                                  return <span key={idx}>{part}</span>;
                                })}
                              </div>
                              <div className="flex items-start gap-2 mt-2 text-xs">
                                <div className="flex items-center gap-1.5">
                                  <div className="w-3 h-3 rounded bg-green-500"></div>
                                  <span className="text-slate-600">Filled</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <div className="w-3 h-3 rounded bg-amber-500"></div>
                                  <span className="text-slate-600">Missing</span>
                                </div>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            {/* Model Configuration - Edit Mode */}
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <Label htmlFor="llm-model" className="text-indigo-900 mb-2">LLM Model</Label>
                                <Select value={editedLlmModel} onValueChange={setEditedLlmModel}>
                                  <SelectTrigger id="llm-model" className="h-11 bg-white">
                                    <SelectValue placeholder="Select LLM model..." />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {llmModels.map(model => (
                                      <SelectItem key={model} value={model}>{model}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label htmlFor="media-model" className="text-indigo-900 mb-2">Media Model</Label>
                                <Select value={editedMediaModel} onValueChange={setEditedMediaModel}>
                                  <SelectTrigger id="media-model" className="h-11 bg-white">
                                    <SelectValue placeholder="Select media model..." />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {mediaModels.map(model => (
                                      <SelectItem key={model} value={model}>{model}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>

                            {/* Prompt Template - Edit Mode */}
                            <div>
                              <Label htmlFor="prompt-template" className="text-indigo-900 mb-2">Prompt Template:</Label>
                              <Textarea
                                id="prompt-template"
                                value={editedPrompt}
                                onChange={(e) => setEditedPrompt(e.target.value)}
                                className="min-h-[300px] bg-white font-mono text-sm"
                                placeholder="Enter your prompt template..."
                              />
                              <p className="text-xs text-slate-600 mt-2">
                                Use <code className="bg-slate-200 px-1 py-0.5 rounded">{"{{variable_name}}"}</code> syntax for dynamic variables
                              </p>
                            </div>

                            {/* Edit Actions */}
                            <div className="flex gap-2 justify-end pt-2">
                              <Button variant="outline" onClick={handleCancelBlueprintEdits}>
                                Cancel
                              </Button>
                              <Button onClick={handleSaveBlueprintEdits} className="bg-indigo-600 text-white hover:bg-indigo-700">
                                <Check className="w-4 h-4 mr-2" />
                                Save Changes
                              </Button>
                            </div>
                          </>
                        )}
                      </CardContent>
                    </CollapsibleContent>
                  </Card>
                </Collapsible>

                {/* Variables from Ideas */}
                {selectedIdeas.length > 0 && (
                  <Card className="border-green-200 bg-green-50 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-green-900">
                        <Check className="w-5 h-5" />
                        Variables from Selected Ideas
                      </CardTitle>
                      <CardDescription className="text-green-700">
                        These variables will be used from your {selectedIdeas.length} selected {selectedIdeas.length === 1 ? 'idea' : 'ideas'}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {selectedIdeas.map((idea) => (
                          <div key={idea.id} className="p-3 bg-white rounded-lg border border-green-200">
                            <div className="text-sm text-slate-900 mb-2">{idea.name}</div>
                            <div className="flex flex-wrap gap-2">
                              {Object.entries(idea.variables).map(([key, value]) => (
                                <div key={key} className="text-xs">
                                  <code className="bg-green-100 px-2 py-0.5 rounded text-green-700">{`{{${key}}}`}</code>
                                  <span className="text-slate-600 ml-1">= {value}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Fill Missing Variables */}
                {selectedBlueprint && (() => {
                  // Check which variables are missing across all selected ideas
                  const allIdeaVariables = selectedIdeas.flatMap(idea => Object.keys(idea.variables));
                  const missingVariables = selectedBlueprint.variables.filter(v => !allIdeaVariables.includes(v));
                  
                  if (missingVariables.length > 0) {
                    return (
                      <Card className="border-amber-200 bg-amber-50 shadow-lg">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-amber-900">
                            <Info className="w-5 h-5" />
                            Fill Missing Variables
                          </CardTitle>
                          <CardDescription className="text-amber-700">
                            These variables are required by the blueprint but not provided by your ideas
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {missingVariables.map((variable) => (
                            <div key={variable}>
                              <Label htmlFor={variable} className="flex items-center gap-2 mb-2">
                                <code className="bg-white px-2 py-0.5 rounded text-amber-600">{`{{${variable}}}`}</code>
                                <span className="text-slate-700 capitalize">{variable}</span>
                                <span className="text-red-500">*</span>
                              </Label>
                              
                              {variable === 'product' && (
                                <Select value={variables[variable] || ''} onValueChange={(v) => setVariables({...variables, [variable]: v})}>
                                  <SelectTrigger className="h-11 bg-white">
                                    <SelectValue placeholder="Select product..." />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {mockAssets.products.map(item => (
                                      <SelectItem key={item.id} value={item.name}>{item.name}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              )}
                              
                              {variable === 'angle' && (
                                <Select value={variables[variable] || ''} onValueChange={(v) => setVariables({...variables, [variable]: v})}>
                                  <SelectTrigger className="h-11 bg-white">
                                    <SelectValue placeholder="Select angle..." />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {mockAssets.angles.map(item => (
                                      <SelectItem key={item.id} value={item.name}>{item.name}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              )}
                              
                              {variable === 'voice' && (
                                <Select value={variables[variable] || ''} onValueChange={(v) => setVariables({...variables, [variable]: v})}>
                                  <SelectTrigger className="h-11 bg-white">
                                    <SelectValue placeholder="Select voice..." />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {mockAssets.voices.map(item => (
                                      <SelectItem key={item.id} value={item.name}>{item.name}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              )}

                              {variable === 'character' && (
                                <Select value={variables[variable] || ''} onValueChange={(v) => setVariables({...variables, [variable]: v})}>
                                  <SelectTrigger className="h-11 bg-white">
                                    <SelectValue placeholder="Select character..." />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {mockAssets.characters.map(item => (
                                      <SelectItem key={item.id} value={item.name}>{item.name}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              )}

                              {variable === 'story' && (
                                <Select value={variables[variable] || ''} onValueChange={(v) => setVariables({...variables, [variable]: v})}>
                                  <SelectTrigger className="h-11 bg-white">
                                    <SelectValue placeholder="Select story element..." />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {mockAssets.stories.map(item => (
                                      <SelectItem key={item.id} value={item.name}>{item.name}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              )}

                              {!['product', 'angle', 'voice', 'character', 'story'].includes(variable) && (
                                <Input
                                  id={variable}
                                  value={variables[variable] || ''}
                                  onChange={(e) => setVariables({...variables, [variable]: e.target.value})}
                                  placeholder={`Enter ${variable}...`}
                                  className="h-11 bg-white"
                                />
                              )}
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                    );
                  }
                  
                  return null;
                })()}

                {/* All Variables Ready */}
                {selectedBlueprint && (() => {
                  const allIdeaVariables = selectedIdeas.flatMap(idea => Object.keys(idea.variables));
                  const missingVariables = selectedBlueprint.variables.filter(v => !allIdeaVariables.includes(v));
                  const allVariablesFilled = missingVariables.every(v => variables[v]);
                  
                  if (allVariablesFilled || missingVariables.length === 0) {
                    return (
                      <Card className="border-green-200 bg-green-50 shadow-lg">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-green-900">
                            <Check className="w-5 h-5" />
                            All Variables Ready
                          </CardTitle>
                          <CardDescription className="text-green-700">
                            Everything is configured. Ready to generate!
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="text-sm text-green-800">
                            ✨ {selectedIdeas.length} {selectedIdeas.length === 1 ? 'piece' : 'pieces'} of content will be generated using {selectedBlueprint.name}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  }
                  
                  return null;
                })()}

                <div className="flex justify-between pt-6">
                  <Button variant="outline" onClick={() => setSelectedBlueprint(null)} className="rounded-xl">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Change Blueprint
                  </Button>
                  <Button
                    onClick={handleQueueJobs}
                    disabled={selectedBlueprint && (() => {
                      const allIdeaVariables = selectedIdeas.flatMap(idea => Object.keys(idea.variables));
                      const missingVariables = selectedBlueprint.variables.filter(v => !allIdeaVariables.includes(v));
                      return !missingVariables.every(v => variables[v]);
                    })()}
                    className={`bg-gradient-to-r ${selectedPipelineType ? pipelineTypes[selectedPipelineType as keyof typeof pipelineTypes].gradient : 'from-slate-600 to-slate-500'} text-white rounded-xl shadow-lg px-8`}
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Queue {selectedIdeas.length} {selectedIdeas.length === 1 ? 'Job' : 'Jobs'}
                  </Button>
                </div>
              </>
            )}
          </div>
        )}

        {/* Step 3: Configure Generation Settings (Video Pipelines Only) */}
        {currentStep === 3 && selectedPipelineType && isVideoPipeline(selectedPipelineType as PipelineType) && (
          <div className="space-y-6">
            <div>
              <h2 className="text-slate-900 mb-2">Configure Generation Settings</h2>
              <p className="text-slate-600">Fine-tune your video generation parameters for optimal results</p>
            </div>

            {/* Main Configuration Card */}
            <Card className="border-slate-200/60 shadow-lg">
              <CardHeader className="border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${pipelineTypes[selectedPipelineType as keyof typeof pipelineTypes].gradient} flex items-center justify-center text-2xl shadow-lg`}>
                    <Settings className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle>Advanced Video Settings</CardTitle>
                    <CardDescription>Control video length, scenes, quality, and more</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-8 pt-6">
                
                {/* Video Duration */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <Label className="text-slate-900">Video Duration</Label>
                  </div>
                  <div className="grid grid-cols-7 gap-2">
                    {[
                      { value: 15, label: '15s' },
                      { value: 30, label: '30s' },
                      { value: 60, label: '60s' },
                      { value: 90, label: '90s' },
                      { value: 180, label: '3min' },
                      { value: 300, label: '5min' },
                    ].map(preset => (
                      <Button
                        key={preset.value}
                        type="button"
                        variant={generationSettings.videoDuration === preset.value ? 'default' : 'outline'}
                        onClick={() => {
                          setGenerationSettings({ ...generationSettings, videoDuration: preset.value });
                          setCustomDuration('');
                        }}
                        className={`h-12 ${
                          generationSettings.videoDuration === preset.value 
                            ? 'bg-blue-600 text-white hover:bg-blue-700' 
                            : 'hover:border-blue-300 hover:bg-blue-50'
                        }`}
                      >
                        {preset.label}
                      </Button>
                    ))}
                    <div className="relative">
                      <Input
                        type="number"
                        placeholder="Custom"
                        value={customDuration}
                        onChange={(e) => {
                          setCustomDuration(e.target.value);
                          const val = parseInt(e.target.value);
                          if (val > 0) {
                            setGenerationSettings({ ...generationSettings, videoDuration: val });
                          }
                        }}
                        className="h-12 text-center"
                      />
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-slate-400 pointer-events-none">s</div>
                    </div>
                  </div>
                  <p className="text-sm text-slate-500">
                    Current: <span className="text-slate-900">{generationSettings.videoDuration || 60} seconds</span>
                  </p>
                </div>

                {/* Number of Scenes */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Layers className="w-5 h-5 text-purple-600" />
                    <Label className="text-slate-900">Number of Scenes</Label>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {[3, 5, 7, 10].map(preset => (
                      <Button
                        key={preset}
                        type="button"
                        variant={generationSettings.numberOfScenes === preset ? 'default' : 'outline'}
                        onClick={() => {
                          setGenerationSettings({ ...generationSettings, numberOfScenes: preset });
                          setCustomScenes('');
                        }}
                        className={`h-12 ${
                          generationSettings.numberOfScenes === preset 
                            ? 'bg-purple-600 text-white hover:bg-purple-700' 
                            : 'hover:border-purple-300 hover:bg-purple-50'
                        }`}
                      >
                        {preset}
                      </Button>
                    ))}
                    <Input
                      type="number"
                      placeholder="Custom"
                      value={customScenes}
                      onChange={(e) => {
                        setCustomScenes(e.target.value);
                        const val = parseInt(e.target.value);
                        if (val > 0) {
                          setGenerationSettings({ ...generationSettings, numberOfScenes: val });
                        }
                      }}
                      className="h-12 text-center"
                    />
                  </div>
                  <p className="text-sm text-slate-500">
                    Current: <span className="text-slate-900">{generationSettings.numberOfScenes || 5} scenes</span>
                    {generationSettings.videoDuration && generationSettings.numberOfScenes && (
                      <span className="ml-2">
                        (~{Math.round(generationSettings.videoDuration / generationSettings.numberOfScenes)}s per scene)
                      </span>
                    )}
                  </p>
                </div>

                {/* Aspect Ratio */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Maximize className="w-5 h-5 text-green-600" />
                    <Label className="text-slate-900">Aspect Ratio</Label>
                  </div>
                  <div className="grid grid-cols-4 gap-3">
                    {[
                      { value: '9:16', label: '9:16', description: 'TikTok, Reels' },
                      { value: '16:9', label: '16:9', description: 'YouTube' },
                      { value: '1:1', label: '1:1', description: 'Instagram' },
                      { value: '4:5', label: '4:5', description: 'Feed Posts' },
                    ].map(ratio => (
                      <Button
                        key={ratio.value}
                        type="button"
                        variant={generationSettings.aspectRatio === ratio.value ? 'default' : 'outline'}
                        onClick={() => setGenerationSettings({ ...generationSettings, aspectRatio: ratio.value as any })}
                        className={`h-16 flex-col items-center justify-center ${
                          generationSettings.aspectRatio === ratio.value 
                            ? 'bg-green-600 text-white hover:bg-green-700' 
                            : 'hover:border-green-300 hover:bg-green-50'
                        }`}
                      >
                        <div>{ratio.label}</div>
                        <div className="text-xs opacity-75">{ratio.description}</div>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Audio Settings */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Voiceover Speed */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Volume2 className="w-5 h-5 text-orange-600" />
                      <Label className="text-slate-900">Voiceover Speed</Label>
                    </div>
                    <Select 
                      value={generationSettings.voiceoverSpeed || 'normal'} 
                      onValueChange={(v) => setGenerationSettings({ ...generationSettings, voiceoverSpeed: v as any })}
                    >
                      <SelectTrigger className="h-11 bg-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="slow">Slow (0.85x)</SelectItem>
                        <SelectItem value="normal">Normal (1.0x)</SelectItem>
                        <SelectItem value="fast">Fast (1.2x)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Background Music */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Music className="w-5 h-5 text-pink-600" />
                      <Label className="text-slate-900">Background Music</Label>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200 h-11">
                      <span className="text-sm text-slate-700">Include Music</span>
                      <Switch 
                        checked={generationSettings.includeMusic ?? true}
                        onCheckedChange={(checked) => setGenerationSettings({ ...generationSettings, includeMusic: checked })}
                      />
                    </div>
                  </div>

                  {/* Sound Effects */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Radio className="w-5 h-5 text-indigo-600" />
                      <Label className="text-slate-900">Sound Effects</Label>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200 h-11">
                      <span className="text-sm text-slate-700">Include SFX</span>
                      <Switch 
                        checked={generationSettings.includeSFX ?? false}
                        onCheckedChange={(checked) => setGenerationSettings({ ...generationSettings, includeSFX: checked })}
                      />
                    </div>
                  </div>
                </div>

                {/* Quality & Resolution */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Quality */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-amber-600" />
                      <Label className="text-slate-900">Quality Preset</Label>
                    </div>
                    <Select 
                      value={generationSettings.quality || 'standard'} 
                      onValueChange={(v) => setGenerationSettings({ ...generationSettings, quality: v as any })}
                    >
                      <SelectTrigger className="h-11 bg-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft (Fast, Lower Quality)</SelectItem>
                        <SelectItem value="standard">Standard (Balanced)</SelectItem>
                        <SelectItem value="high">High (Slower, Better Quality)</SelectItem>
                        <SelectItem value="ultra">Ultra (Slowest, Best Quality)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Resolution */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Film className="w-5 h-5 text-red-600" />
                      <Label className="text-slate-900">Resolution</Label>
                    </div>
                    <Select 
                      value={generationSettings.resolution || '1080p'} 
                      onValueChange={(v) => setGenerationSettings({ ...generationSettings, resolution: v as any })}
                    >
                      <SelectTrigger className="h-11 bg-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="720p">720p HD</SelectItem>
                        <SelectItem value="1080p">1080p Full HD</SelectItem>
                        <SelectItem value="4K">4K Ultra HD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

              </CardContent>
            </Card>

            {/* Scene Validation Mode */}
            <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-900">
                  <Zap className="w-5 h-5" />
                  Scene Validation Mode
                </CardTitle>
                <CardDescription className="text-purple-700">
                  Control how jobs handle scene generation in the queue
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start justify-between p-4 bg-white rounded-lg border-2 border-purple-200">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="text-slate-900">Automated Mode</div>
                      {generationSettings.automatedMode && (
                        <Badge className="bg-purple-500 text-white">Fast Track</Badge>
                      )}
                    </div>
                    <div className="text-sm text-slate-600">
                      {generationSettings.automatedMode 
                        ? 'Jobs will auto-generate all scenes without pausing. Faster but uses more tokens.'
                        : `Jobs will pause after scene breakdown for your review. ${selectedPipelineType === 'storyboard-video' ? 'Each scene has 4 sub-stages (T2I → I2V → T2S → Voice) you can validate.' : 'Validate each scene\'s T2V generation.'}`
                      }
                    </div>
                  </div>
                  <Switch 
                    checked={generationSettings.automatedMode ?? false}
                    onCheckedChange={(checked) => setGenerationSettings({ ...generationSettings, automatedMode: checked })}
                    className="ml-4"
                  />
                </div>

                {!generationSettings.automatedMode && (
                  <div className="flex items-start gap-2 p-3 bg-amber-50 rounded-lg border border-amber-200">
                    <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-amber-800">
                      <div className="font-medium mb-1">💰 Cost Control Benefits</div>
                      {selectedPipelineType === 'storyboard-video' ? (
                        <>
                          <strong>Storyboard Video:</strong> Each job pauses after "Scene Breakdown". Review prompts, then approve scenes. 
                          Each scene generates: Image (T2I) → Video (I2V) → Speech Script (T2S) → Voice. 
                          All 4 can be validated individually before final assembly.
                        </>
                      ) : (
                        <>
                          <strong>Faceless Video:</strong> Each job pauses after "Scene Breakdown". Review & approve scene prompts. 
                          Then each scene generates directly to video (T2V). Validate outputs before assembly.
                        </>
                      )}
                    </div>
                  </div>
                )}

                {generationSettings.automatedMode && (
                  <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <Zap className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-800">
                      <div className="font-medium mb-1">⚡ Fully Automated</div>
                      Jobs run through all stages automatically without pausing. Perfect for trusted blueprints when you need speed over cost optimization.
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Summary Card */}
            <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-900">
                  <Info className="w-5 h-5" />
                  Generation Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <div className="text-slate-600 mb-1">Duration</div>
                    <div className="text-slate-900">{generationSettings.videoDuration || 60}s</div>
                  </div>
                  <div>
                    <div className="text-slate-600 mb-1">Scenes</div>
                    <div className="text-slate-900">{generationSettings.numberOfScenes || 5}</div>
                  </div>
                  <div>
                    <div className="text-slate-600 mb-1">Aspect Ratio</div>
                    <div className="text-slate-900">{generationSettings.aspectRatio || '9:16'}</div>
                  </div>
                  <div>
                    <div className="text-slate-600 mb-1">Resolution</div>
                    <div className="text-slate-900">{generationSettings.resolution || '1080p'}</div>
                  </div>
                  <div>
                    <div className="text-slate-600 mb-1">Quality</div>
                    <div className="text-slate-900 capitalize">{generationSettings.quality || 'standard'}</div>
                  </div>
                  <div>
                    <div className="text-slate-600 mb-1">Voice Speed</div>
                    <div className="text-slate-900 capitalize">{generationSettings.voiceoverSpeed || 'normal'}</div>
                  </div>
                  <div>
                    <div className="text-slate-600 mb-1">Music</div>
                    <div className="text-slate-900">{generationSettings.includeMusic ? 'Yes' : 'No'}</div>
                  </div>
                  <div>
                    <div className="text-slate-600 mb-1">SFX</div>
                    <div className="text-slate-900">{generationSettings.includeSFX ? 'Yes' : 'No'}</div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-blue-200">
                  <div className="text-sm text-blue-800">
                    ✨ {selectedIdeas.length} {selectedIdeas.length === 1 ? 'video' : 'videos'} will be generated with these settings
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between pt-6">
              <Button variant="outline" onClick={() => setCurrentStep(2)} className="rounded-xl">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Ideas
              </Button>
              <Button
                onClick={() => setCurrentStep(4)}
                className={`bg-gradient-to-r ${selectedPipelineType ? pipelineTypes[selectedPipelineType as keyof typeof pipelineTypes].gradient : 'from-slate-600 to-slate-500'} text-white rounded-xl shadow-lg px-8`}
              >
                Continue to Blueprint
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Choose Blueprint (Video Pipelines) */}
        {currentStep === 4 && selectedPipelineType && isVideoPipeline(selectedPipelineType as PipelineType) && (
          <div className="space-y-6">
            {!selectedBlueprint ? (
              <>
                <div>
                  <h2 className="text-slate-900 mb-2">Choose Blueprint</h2>
                  <p className="text-slate-600">Select a blueprint optimized for {generationSettings.videoDuration}s videos in {generationSettings.aspectRatio} format</p>
                </div>

                {/* Search & Filters */}
                <div className="flex gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                      placeholder="Search blueprints..."
                      value={blueprintSearch}
                      onChange={(e) => setBlueprintSearch(e.target.value)}
                      className="pl-12 h-12 bg-white border-slate-200 rounded-xl shadow-sm"
                    />
                  </div>
                </div>

                {/* Blueprints Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredBlueprints.map((blueprint) => {
                    const pipelineType = pipelineTypes[blueprint.pipelineType as keyof typeof pipelineTypes];
                    return (
                      <Card
                        key={blueprint.id}
                        className="group border-slate-200/60 hover:border-slate-300 shadow-lg hover:shadow-xl transition-all cursor-pointer"
                        onClick={() => {
                          setSelectedBlueprint(blueprint);
                          // Pre-fill variables from selected ideas if available
                          if (selectedIdeas.length > 0) {
                            const firstIdea = selectedIdeas[0];
                            setVariables(firstIdea.variables);
                          }
                        }}
                      >
                        <CardContent className="p-6">
                          <div className="flex gap-4">
                            {/* Icon */}
                            <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${pipelineType.gradient} flex items-center justify-center text-2xl flex-shrink-0 shadow-lg`}>
                              {pipelineType.icon}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between mb-2">
                                <h3 className="text-slate-900 mb-1">{blueprint.name}</h3>
                                <Badge className={`${pipelineType.bg} ${pipelineType.text} ${pipelineType.border} ml-2 whitespace-nowrap`}>
                                  {pipelineType.name}
                                </Badge>
                              </div>
                              <p className="text-sm text-slate-600 mb-3">{blueprint.description}</p>

                              <div className="space-y-2">
                                <div className="flex items-center gap-2 text-xs text-slate-500">
                                  <Settings className="w-3 h-3" />
                                  <span>Variables: {blueprint.variables.map(v => `{{${v}}}`).join(', ')}</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-slate-500">
                                  <Sparkles className="w-3 h-3" />
                                  <span>AI: {blueprint.llmModel} + {blueprint.mediaModel}</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-slate-500">
                                  <TrendingUp className="w-3 h-3" />
                                  <span>Used {blueprint.usageCount} times • Last: {blueprint.lastUsed}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                {filteredBlueprints.length === 0 && (
                  <Card className="border-slate-200/60 shadow-sm">
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                        <Search className="w-8 h-8 text-slate-400" />
                      </div>
                      <h3 className="text-lg text-slate-900 mb-2">No blueprints found</h3>
                      <p className="text-sm text-slate-500 text-center max-w-md">
                        Try adjusting your search or filter criteria
                      </p>
                    </CardContent>
                  </Card>
                )}

                <div className="flex justify-between pt-6">
                  <Button variant="outline" onClick={() => setCurrentStep(3)} className="rounded-xl">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Configuration
                  </Button>
                </div>
              </>
            ) : (
              <>
                {/* Blueprint Selected - Show Variable Configuration */}
                <div>
                  <h2 className="text-slate-900 mb-2">Configure Variables</h2>
                  <p className="text-slate-600">Review and fill in all required variables for your blueprint</p>
                </div>

                {/* Selected Blueprint Info */}
                <Card className="border-slate-200/60 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${pipelineTypes[selectedBlueprint.pipelineType as keyof typeof pipelineTypes].gradient} flex items-center justify-center text-2xl shadow-lg`}>
                          {pipelineTypes[selectedBlueprint.pipelineType as keyof typeof pipelineTypes].icon}
                        </div>
                        <div>
                          <CardTitle>{selectedBlueprint.name}</CardTitle>
                          <CardDescription>{selectedBlueprint.description}</CardDescription>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => setSelectedBlueprint(null)}>
                        Change Blueprint
                      </Button>
                    </div>
                  </CardHeader>
                </Card>

                {/* Video Configuration Summary */}
                <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-blue-900">
                      <Settings className="w-5 h-5" />
                      Video Configuration
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                      <div>
                        <div className="text-slate-600 mb-1">Duration</div>
                        <div className="text-slate-900">{generationSettings.videoDuration}s</div>
                      </div>
                      <div>
                        <div className="text-slate-600 mb-1">Scenes</div>
                        <div className="text-slate-900">{generationSettings.numberOfScenes}</div>
                      </div>
                      <div>
                        <div className="text-slate-600 mb-1">Aspect Ratio</div>
                        <div className="text-slate-900">{generationSettings.aspectRatio}</div>
                      </div>
                      <div>
                        <div className="text-slate-600 mb-1">Resolution</div>
                        <div className="text-slate-900">{generationSettings.resolution}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Blueprint Prompt Template */}
                <Collapsible open={showBlueprintPrompt} onOpenChange={setShowBlueprintPrompt}>
                  <Card className="border-indigo-200 bg-gradient-to-br from-indigo-50 to-purple-50 shadow-lg">
                    <CollapsibleTrigger className="w-full" disabled={isEditingBlueprint}>
                      <CardHeader className="cursor-pointer hover:bg-white/50 transition-colors rounded-t-lg">
                        <div className="flex items-center justify-between">
                          <CardTitle className="flex items-center gap-2 text-indigo-900">
                            <FileText className="w-5 h-5" />
                            Blueprint Prompt Template
                          </CardTitle>
                          {!isEditingBlueprint && (
                            <ChevronDown className={`w-5 h-5 text-indigo-600 transition-transform ${showBlueprintPrompt ? 'rotate-180' : ''}`} />
                          )}
                        </div>
                        <CardDescription className="text-indigo-700 text-left">
                          {isEditingBlueprint ? 'Editing prompt and models' : 'View and edit the prompt template and model configuration'}
                        </CardDescription>
                      </CardHeader>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <CardContent className="space-y-4">
                        {!isEditingBlueprint ? (
                          <>
                            {/* Model Configuration - View Mode */}
                            <div className="flex items-center justify-between">
                              <div className="grid grid-cols-2 gap-3 flex-1">
                                <div className="p-3 bg-white rounded-lg border border-indigo-200">
                                  <div className="text-xs text-slate-600 mb-1">LLM Model</div>
                                  <div className="text-sm text-slate-900 flex items-center gap-2">
                                    <Sparkles className="w-4 h-4 text-indigo-600" />
                                    {selectedBlueprint.llmModel}
                                  </div>
                                </div>
                                <div className="p-3 bg-white rounded-lg border border-indigo-200">
                                  <div className="text-xs text-slate-600 mb-1">Media Model</div>
                                  <div className="text-sm text-slate-900 flex items-center gap-2">
                                    <Sparkles className="w-4 h-4 text-purple-600" />
                                    {selectedBlueprint.mediaModel}
                                  </div>
                                </div>
                              </div>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={handleEditBlueprint}
                                className="ml-3"
                              >
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                              </Button>
                            </div>

                            {/* Prompt Template - View Mode */}
                            <div>
                              <Label className="text-indigo-900 mb-2">Prompt Template:</Label>
                              <div className="p-4 bg-slate-900 rounded-lg text-slate-100 text-sm font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">
                                {selectedBlueprint.promptTemplate.split(/(\\{\\{[^}]+\\}\\})/).map((part, idx) => {
                                  if (part.match(/\\{\\{[^}]+\\}\\}/)) {
                                    const variable = part.replace(/\\{\\{|\\}\\}/g, '');
                                    const hasValue = selectedIdeas.some(idea => idea.variables[variable]) || variables[variable];
                                    return (
                                      <span
                                        key={idx}
                                        className={`${
                                          hasValue
                                            ? 'bg-green-500 text-white'
                                            : 'bg-amber-500 text-white'
                                        } px-1.5 py-0.5 rounded font-semibold`}
                                      >
                                        {part}
                                      </span>
                                    );
                                  }
                                  return <span key={idx}>{part}</span>;
                                })}
                              </div>
                              <div className="flex items-start gap-2 mt-2 text-xs">
                                <div className="flex items-center gap-1.5">
                                  <div className="w-3 h-3 rounded bg-green-500"></div>
                                  <span className="text-slate-600">Filled</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <div className="w-3 h-3 rounded bg-amber-500"></div>
                                  <span className="text-slate-600">Missing</span>
                                </div>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            {/* Model Configuration - Edit Mode */}
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <Label htmlFor="llm-model" className="text-indigo-900 mb-2">LLM Model</Label>
                                <Select value={editedLlmModel} onValueChange={setEditedLlmModel}>
                                  <SelectTrigger id="llm-model" className="h-11 bg-white">
                                    <SelectValue placeholder="Select LLM model..." />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {llmModels.map(model => (
                                      <SelectItem key={model} value={model}>{model}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label htmlFor="media-model" className="text-indigo-900 mb-2">Media Model</Label>
                                <Select value={editedMediaModel} onValueChange={setEditedMediaModel}>
                                  <SelectTrigger id="media-model" className="h-11 bg-white">
                                    <SelectValue placeholder="Select media model..." />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {mediaModels.map(model => (
                                      <SelectItem key={model} value={model}>{model}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>

                            {/* Prompt Template - Edit Mode */}
                            <div>
                              <Label htmlFor="prompt-template" className="text-indigo-900 mb-2">Prompt Template:</Label>
                              <Textarea
                                id="prompt-template"
                                value={editedPrompt}
                                onChange={(e) => setEditedPrompt(e.target.value)}
                                className="min-h-[300px] bg-white font-mono text-sm"
                                placeholder="Enter your prompt template..."
                              />
                              <p className="text-xs text-slate-600 mt-2">
                                Use <code className="bg-slate-200 px-1 py-0.5 rounded">{"{variable_name}"}</code> syntax for dynamic variables
                              </p>
                            </div>

                            {/* Edit Actions */}
                            <div className="flex gap-2 justify-end pt-2">
                              <Button variant="outline" onClick={handleCancelBlueprintEdits}>
                                Cancel
                              </Button>
                              <Button onClick={handleSaveBlueprintEdits} className="bg-indigo-600 text-white hover:bg-indigo-700">
                                <Check className="w-4 h-4 mr-2" />
                                Save Changes
                              </Button>
                            </div>
                          </>
                        )}
                      </CardContent>
                    </CollapsibleContent>
                  </Card>
                </Collapsible>

                {/* Variables from Ideas */}
                {selectedIdeas.length > 0 && (
                  <Card className="border-green-200 bg-green-50 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-green-900">
                        <Check className="w-5 h-5" />
                        Variables from Selected Ideas
                      </CardTitle>
                      <CardDescription className="text-green-700">
                        These variables will be used from your {selectedIdeas.length} selected {selectedIdeas.length === 1 ? 'idea' : 'ideas'}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {selectedIdeas.map((idea) => (
                          <div key={idea.id} className="p-3 bg-white rounded-lg border border-green-200">
                            <div className="text-sm text-slate-900 mb-2">{idea.name}</div>
                            <div className="flex flex-wrap gap-2">
                              {Object.entries(idea.variables).map(([key, value]) => (
                                <div key={key} className="text-xs">
                                  <code className="bg-green-100 px-2 py-0.5 rounded text-green-700">{`{{${key}}}`}</code>
                                  <span className="text-slate-600 ml-1">= {value}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Fill Missing Variables */}
                {selectedBlueprint && (() => {
                  // Check which variables are missing across all selected ideas
                  const allIdeaVariables = selectedIdeas.flatMap(idea => Object.keys(idea.variables));
                  const missingVariables = selectedBlueprint.variables.filter(v => !allIdeaVariables.includes(v));
                  
                  if (missingVariables.length > 0) {
                    return (
                      <Card className="border-amber-200 bg-amber-50 shadow-lg">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-amber-900">
                            <Info className="w-5 h-5" />
                            Fill Missing Variables
                          </CardTitle>
                          <CardDescription className="text-amber-700">
                            These variables are required by the blueprint but not provided by your ideas
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {missingVariables.map((variable) => (
                            <div key={variable}>
                              <Label htmlFor={variable} className="flex items-center gap-2 mb-2">
                                <code className="bg-white px-2 py-0.5 rounded text-amber-600">{`{{${variable}}}`}</code>
                                <span className="text-slate-700 capitalize">{variable}</span>
                                <span className="text-red-500">*</span>
                              </Label>
                              
                              {variable === 'product' && (
                                <Select value={variables[variable] || ''} onValueChange={(v) => setVariables({...variables, [variable]: v})}>
                                  <SelectTrigger className="h-11 bg-white">
                                    <SelectValue placeholder="Select product..." />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {mockAssets.products.map(item => (
                                      <SelectItem key={item.id} value={item.name}>{item.name}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              )}
                              
                              {variable === 'angle' && (
                                <Select value={variables[variable] || ''} onValueChange={(v) => setVariables({...variables, [variable]: v})}>
                                  <SelectTrigger className="h-11 bg-white">
                                    <SelectValue placeholder="Select angle..." />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {mockAssets.angles.map(item => (
                                      <SelectItem key={item.id} value={item.name}>{item.name}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              )}
                              
                              {variable === 'voice' && (
                                <Select value={variables[variable] || ''} onValueChange={(v) => setVariables({...variables, [variable]: v})}>
                                  <SelectTrigger className="h-11 bg-white">
                                    <SelectValue placeholder="Select voice..." />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {mockAssets.voices.map(item => (
                                      <SelectItem key={item.id} value={item.name}>{item.name}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              )}

                              {variable === 'character' && (
                                <Select value={variables[variable] || ''} onValueChange={(v) => setVariables({...variables, [variable]: v})}>
                                  <SelectTrigger className="h-11 bg-white">
                                    <SelectValue placeholder="Select character..." />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {mockAssets.characters.map(item => (
                                      <SelectItem key={item.id} value={item.name}>{item.name}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              )}

                              {variable === 'story' && (
                                <Select value={variables[variable] || ''} onValueChange={(v) => setVariables({...variables, [variable]: v})}>
                                  <SelectTrigger className="h-11 bg-white">
                                    <SelectValue placeholder="Select story element..." />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {mockAssets.stories.map(item => (
                                      <SelectItem key={item.id} value={item.name}>{item.name}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              )}

                              {!['product', 'angle', 'voice', 'character', 'story'].includes(variable) && (
                                <Input
                                  id={variable}
                                  value={variables[variable] || ''}
                                  onChange={(e) => setVariables({...variables, [variable]: e.target.value})}
                                  placeholder={`Enter ${variable}...`}
                                  className="h-11 bg-white"
                                />
                              )}
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                    );
                  }
                  
                  return null;
                })()}

                {/* All Variables Ready */}
                {selectedBlueprint && (() => {
                  const allIdeaVariables = selectedIdeas.flatMap(idea => Object.keys(idea.variables));
                  const missingVariables = selectedBlueprint.variables.filter(v => !allIdeaVariables.includes(v));
                  const allVariablesFilled = missingVariables.every(v => variables[v]);
                  
                  if (allVariablesFilled || missingVariables.length === 0) {
                    return (
                      <Card className="border-green-200 bg-green-50 shadow-lg">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-green-900">
                            <Check className="w-5 h-5" />
                            All Variables Ready
                          </CardTitle>
                          <CardDescription className="text-green-700">
                            Everything is configured. Ready to generate!
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="text-sm text-green-800">
                            ✨ {selectedIdeas.length} {selectedIdeas.length === 1 ? 'video' : 'videos'} will be generated using {selectedBlueprint.name}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  }
                  
                  return null;
                })()}

                <div className="flex justify-between pt-6">
                  <Button variant="outline" onClick={() => setSelectedBlueprint(null)} className="rounded-xl">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Change Blueprint
                  </Button>
                  <Button
                    onClick={handleQueueJobs}
                    disabled={selectedBlueprint && (() => {
                      const allIdeaVariables = selectedIdeas.flatMap(idea => Object.keys(idea.variables));
                      const missingVariables = selectedBlueprint.variables.filter(v => !allIdeaVariables.includes(v));
                      return !missingVariables.every(v => variables[v]);
                    })()}
                    className={`bg-gradient-to-r ${selectedPipelineType ? pipelineTypes[selectedPipelineType as keyof typeof pipelineTypes].gradient : 'from-slate-600 to-slate-500'} text-white rounded-xl shadow-lg px-8`}
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Queue {selectedIdeas.length} {selectedIdeas.length === 1 ? 'Job' : 'Jobs'}
                  </Button>
                </div>
              </>
            )}
          </div>
        )}

        {/* Step 4: Jobs Queued Confirmation (Non-Video) */}
        {currentStep === 4 && selectedBlueprint && !isVideoPipeline(selectedPipelineType as PipelineType) && (
          <div className="space-y-6">
            <Card className="border-slate-200/60 shadow-xl">
              <CardContent className="p-12">
                <div className="max-w-2xl mx-auto text-center space-y-6">
                  <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${getStepColor()} flex items-center justify-center text-white mx-auto shadow-2xl`}>
                    <Check className="w-10 h-10" />
                  </div>
                  <div>
                    <h2 className="text-slate-900 mb-2">Jobs Successfully Queued! 🎉</h2>
                    <p className="text-slate-600">
                      {selectedIdeas.length} {selectedIdeas.length === 1 ? 'job has' : 'jobs have'} been added to the queue and will be processed asynchronously
                    </p>
                  </div>

                  <Card className="border-green-200 bg-gradient-to-br from-green-50 to-white text-left">
                    <CardHeader>
                      <CardTitle className="text-green-900 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5" />
                        Queue Summary
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">Jobs Queued:</span>
                        <span className="text-slate-900">{selectedIdeas.length}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">Pipeline Type:</span>
                        <Badge className={`${pipelineTypes[selectedPipelineType as keyof typeof pipelineTypes].bg} ${pipelineTypes[selectedPipelineType as keyof typeof pipelineTypes].text}`}>
                          {pipelineTypes[selectedPipelineType as keyof typeof pipelineTypes].name}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">Blueprint:</span>
                        <span className="text-slate-900">{selectedBlueprint.name}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">LLM Model:</span>
                        <span className="text-slate-900 flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-indigo-600" />
                          {selectedBlueprint.llmModel}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">Media Model:</span>
                        <span className="text-slate-900 flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-purple-600" />
                          {selectedBlueprint.mediaModel}
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="pt-4 text-sm text-slate-600">
                    Redirecting to Jobs page in 3 seconds...
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 5: Jobs Queued Confirmation (Video) */}
        {currentStep === 5 && selectedBlueprint && isVideoPipeline(selectedPipelineType as PipelineType) && (
          <div className="space-y-6">
            <Card className="border-slate-200/60 shadow-xl">
              <CardContent className="p-12">
                <div className="max-w-2xl mx-auto text-center space-y-6">
                  <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${getStepColor()} flex items-center justify-center text-white mx-auto shadow-2xl`}>
                    <Check className="w-10 h-10" />
                  </div>
                  <div>
                    <h2 className="text-slate-900 mb-2">Jobs Successfully Queued! 🎉</h2>
                    <p className="text-slate-600">
                      {selectedIdeas.length} {selectedIdeas.length === 1 ? 'job has' : 'jobs have'} been added to the queue and will be processed asynchronously
                    </p>
                  </div>

                  <Card className="border-green-200 bg-gradient-to-br from-green-50 to-white text-left">
                    <CardHeader>
                      <CardTitle className="text-green-900 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5" />
                        Queue Summary
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">Jobs Queued:</span>
                        <span className="text-slate-900">{selectedIdeas.length}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">Pipeline Type:</span>
                        <Badge className={`${pipelineTypes[selectedPipelineType as keyof typeof pipelineTypes].bg} ${pipelineTypes[selectedPipelineType as keyof typeof pipelineTypes].text}`}>
                          {pipelineTypes[selectedPipelineType as keyof typeof pipelineTypes].name}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">Blueprint:</span>
                        <span className="text-slate-900">{selectedBlueprint.name}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">LLM Model:</span>
                        <span className="text-slate-900 flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-indigo-600" />
                          {selectedBlueprint.llmModel}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">Media Model:</span>
                        <span className="text-slate-900 flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-purple-600" />
                          {selectedBlueprint.mediaModel}
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="pt-4 text-sm text-slate-600">
                    Redirecting to Jobs page in 3 seconds...
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}