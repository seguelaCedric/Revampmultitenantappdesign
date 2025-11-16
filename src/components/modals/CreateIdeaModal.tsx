import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Lightbulb, Plus, X, Sparkles, Zap, Search, Info } from 'lucide-react';

interface CreateIdeaModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: any) => void;
}

export function CreateIdeaModal({ open, onOpenChange, onSubmit }: CreateIdeaModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    content_type: '',
    topic: '',
    hook: '',
    cta: '',
    content_framework: '',
    hook_structure: '',
    priority: 0,
  });

  const [keywords, setKeywords] = useState<string[]>([]);
  const [keywordInput, setKeywordInput] = useState('');
  const [talkingPoints, setTalkingPoints] = useState<string[]>([]);
  const [talkingPointInput, setTalkingPointInput] = useState('');
  const [emotionalTriggers, setEmotionalTriggers] = useState<string[]>([]);
  const [emotionalTriggerInput, setEmotionalTriggerInput] = useState('');
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [aiInput, setAiInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAIGenerate = async () => {
    if (!aiInput.trim()) return;
    
    setIsGenerating(true);
    // Simulate AI generation - in real app, this would call your backend
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock data population
    setFormData({
      title: 'The Hidden Psychology Behind Viral Content: What TikTok Doesn\'t Want You to Know',
      description: 'Explore the psychological triggers and content patterns that make videos go viral across social platforms.',
      content: 'Deep dive into the neuroscience and behavioral patterns that drive viral content success.',
      content_type: 'Video',
      topic: 'Content Psychology & Virality',
      hook: 'Ever wonder why some videos get millions of views while others flop? The secret isn\'t luck...',
      cta: 'Download our free viral content checklist to apply these principles to your next post',
      content_framework: 'PAS',
      hook_structure: 'Pattern Interrupt',
      priority: 8,
    });
    setKeywords(['viral content', 'content psychology', 'social media', 'TikTok algorithm', 'engagement']);
    setTalkingPoints([
      'The 3-second rule: Why the first 3 seconds determine everything',
      'Pattern interrupts: Breaking viewer expectations',
      'Emotional progression: The journey from curiosity to action',
      'Social proof triggers: Why we follow the crowd'
    ]);
    setEmotionalTriggers(['curiosity', 'FOMO', 'surprise', 'inspiration']);
    setPlatforms(['TikTok', 'Instagram', 'YouTube']);
    
    setIsGenerating(false);
  };

  const handleAddKeyword = () => {
    if (keywordInput.trim()) {
      setKeywords([...keywords, keywordInput.trim()]);
      setKeywordInput('');
    }
  };

  const handleRemoveKeyword = (index: number) => {
    setKeywords(keywords.filter((_, i) => i !== index));
  };

  const handleAddTalkingPoint = () => {
    if (talkingPointInput.trim()) {
      setTalkingPoints([...talkingPoints, talkingPointInput.trim()]);
      setTalkingPointInput('');
    }
  };

  const handleRemoveTalkingPoint = (index: number) => {
    setTalkingPoints(talkingPoints.filter((_, i) => i !== index));
  };

  const handleAddEmotionalTrigger = () => {
    if (emotionalTriggerInput.trim()) {
      setEmotionalTriggers([...emotionalTriggers, emotionalTriggerInput.trim()]);
      setEmotionalTriggerInput('');
    }
  };

  const handleRemoveEmotionalTrigger = (index: number) => {
    setEmotionalTriggers(emotionalTriggers.filter((_, i) => i !== index));
  };

  const togglePlatform = (platform: string) => {
    setPlatforms(prev => 
      prev.includes(platform) ? prev.filter(p => p !== platform) : [...prev, platform]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      ...formData,
      keywords,
      key_talking_points: talkingPoints,
      emotional_triggers: emotionalTriggers,
      platforms,
    };
    onSubmit?.(data);
    onOpenChange(false);
  };

  const platformOptions = ['YouTube', 'TikTok', 'Instagram', 'LinkedIn', 'Twitter', 'Facebook'];
  const contentTypes = ['Video', 'Blog Post', 'Social Media', 'Email', 'Podcast', 'Infographic'];
  const frameworks = ['AIDA', 'PAS', 'BAB', 'FAB', 'Storytelling', '4Ps', 'Hero\'s Journey'];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/25">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div>
              <DialogTitle>Create Content Idea</DialogTitle>
              <DialogDescription>
                Add a new content idea to your ideas bank
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Quick Start: AI Generate from Topic/URL */}
          <div className="p-5 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl border border-purple-200">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/25 flex-shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-slate-900 mb-1">Quick Start: Generate Idea with AI</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Enter a topic, keyword, or trending URL to automatically generate a complete content idea
                </p>
                
                <div className="flex gap-2">
                  <Input
                    value={aiInput}
                    onChange={(e) => setAiInput(e.target.value)}
                    placeholder="e.g., 'viral content psychology' or paste article URL"
                    className="flex-1 bg-white border-purple-200 focus:border-purple-400"
                    disabled={isGenerating}
                  />
                  <Button 
                    type="button" 
                    onClick={handleAIGenerate}
                    disabled={!aiInput.trim() || isGenerating}
                    className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white shadow-lg shadow-purple-500/30 px-6"
                  >
                    {isGenerating ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Generate Idea
                      </>
                    )}
                  </Button>
                </div>

                <div className="flex items-start gap-2 mt-3 text-sm text-slate-500">
                  <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <p>
                    AI will create: title, hook, CTA, talking points, emotional triggers, keywords, and content framework. You can refine any field after generation.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter a compelling title for your content idea"
                required
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description of the content idea..."
                rows={3}
                className="mt-1.5"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="content_type">Content Type</Label>
                <Select
                  value={formData.content_type}
                  onValueChange={(value) => setFormData({ ...formData, content_type: value })}
                >
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {contentTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="topic">Topic</Label>
                <Input
                  id="topic"
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  placeholder="Main topic"
                  className="mt-1.5"
                />
              </div>
            </div>
          </div>

          {/* Hook & CTA */}
          <div className="space-y-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
            <h3 className="text-sm text-purple-900">Hook & Call-to-Action</h3>
            
            <div>
              <Label htmlFor="hook">Hook *</Label>
              <Textarea
                id="hook"
                value={formData.hook}
                onChange={(e) => setFormData({ ...formData, hook: e.target.value })}
                placeholder="The opening hook that grabs attention..."
                rows={2}
                required
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="cta">Call-to-Action (CTA) *</Label>
              <Textarea
                id="cta"
                value={formData.cta}
                onChange={(e) => setFormData({ ...formData, cta: e.target.value })}
                placeholder="The closing call-to-action..."
                rows={2}
                required
                className="mt-1.5"
              />
            </div>
          </div>

          {/* Content Framework */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="content_framework">Content Framework</Label>
              <Select
                value={formData.content_framework}
                onValueChange={(value) => setFormData({ ...formData, content_framework: value })}
              >
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Select framework" />
                </SelectTrigger>
                <SelectContent>
                  {frameworks.map(framework => (
                    <SelectItem key={framework} value={framework}>{framework}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="hook_structure">Hook Structure</Label>
              <Input
                id="hook_structure"
                value={formData.hook_structure}
                onChange={(e) => setFormData({ ...formData, hook_structure: e.target.value })}
                placeholder="Pattern or structure for the hook"
                className="mt-1.5"
              />
            </div>
          </div>

          {/* Keywords */}
          <div>
            <Label>Keywords</Label>
            <div className="flex gap-2 mt-1.5">
              <Input
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddKeyword())}
                placeholder="Add keywords..."
              />
              <Button type="button" onClick={handleAddKeyword} size="sm" className="bg-purple-600 hover:bg-purple-700">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            {keywords.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {keywords.map((keyword, index) => (
                  <Badge key={index} className="bg-purple-100 text-purple-700 border-purple-200 pl-2 pr-1 py-1 gap-1">
                    <span>{keyword}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveKeyword(index)}
                      className="hover:bg-purple-200 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Key Talking Points */}
          <div>
            <Label>Key Talking Points</Label>
            <div className="flex gap-2 mt-1.5">
              <Input
                value={talkingPointInput}
                onChange={(e) => setTalkingPointInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTalkingPoint())}
                placeholder="Add talking point..."
              />
              <Button type="button" onClick={handleAddTalkingPoint} size="sm" className="bg-purple-600 hover:bg-purple-700">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            {talkingPoints.length > 0 && (
              <div className="space-y-1.5 mt-2">
                {talkingPoints.map((point, index) => (
                  <div key={index} className="flex items-start gap-2 p-2 bg-slate-50 rounded border border-slate-200">
                    <span className="text-sm text-slate-700 flex-1">{point}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTalkingPoint(index)}
                      className="text-slate-400 hover:text-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Emotional Triggers */}
          <div>
            <Label>Emotional Triggers</Label>
            <div className="flex gap-2 mt-1.5">
              <Input
                value={emotionalTriggerInput}
                onChange={(e) => setEmotionalTriggerInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddEmotionalTrigger())}
                placeholder="Add emotional trigger..."
              />
              <Button type="button" onClick={handleAddEmotionalTrigger} size="sm" className="bg-purple-600 hover:bg-purple-700">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            {emotionalTriggers.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {emotionalTriggers.map((trigger, index) => (
                  <Badge key={index} className="bg-pink-100 text-pink-700 border-pink-200 pl-2 pr-1 py-1 gap-1">
                    <span>{trigger}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveEmotionalTrigger(index)}
                      className="hover:bg-pink-200 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Platforms */}
          <div>
            <Label>Target Platforms</Label>
            <div className="flex flex-wrap gap-2 mt-1.5">
              {platformOptions.map(platform => (
                <button
                  key={platform}
                  type="button"
                  onClick={() => togglePlatform(platform)}
                  className={`px-3 py-1.5 rounded-lg border text-sm transition-colors ${
                    platforms.includes(platform)
                      ? 'bg-purple-100 border-purple-300 text-purple-700'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-purple-200'
                  }`}
                >
                  {platform}
                </button>
              ))}
            </div>
          </div>

          {/* Content Body */}
          <div>
            <Label htmlFor="content">Content Body</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Full content or outline..."
              rows={6}
              className="mt-1.5"
            />
          </div>

          {/* Priority */}
          <div>
            <Label htmlFor="priority">Priority (0-10)</Label>
            <Input
              id="priority"
              type="number"
              min="0"
              max="10"
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) || 0 })}
              className="mt-1.5"
            />
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white shadow-lg shadow-purple-500/30">
              <Sparkles className="w-4 h-4 mr-2" />
              Create Idea
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}