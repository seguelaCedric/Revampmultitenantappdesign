import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Mic, Plus, X, Sparkles, Zap, Info } from 'lucide-react';

interface CreateBrandVoiceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: any) => void;
}

export function CreateBrandVoiceModal({ open, onOpenChange, onSubmit }: CreateBrandVoiceModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    tone: '',
    style_guidelines: '',
    preferred_model: 'Anthropic: Claude Sonnet 4.5',
  });

  const [examples, setExamples] = useState<Array<{ title: string; content: string }>>([]);
  const [exampleTitle, setExampleTitle] = useState('');
  const [exampleContent, setExampleContent] = useState('');

  const [dos, setDos] = useState<string[]>([]);
  const [doInput, setDoInput] = useState('');

  const [donts, setDonts] = useState<string[]>([]);
  const [dontInput, setDontInput] = useState('');
  
  const [aiInput, setAiInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAIGenerate = async () => {
    if (!aiInput.trim()) return;
    
    setIsGenerating(true);
    // Simulate AI generation - in real app, this would call your backend
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Mock data population
    setFormData({
      name: 'Tesla Brand Voice',
      description: 'Bold, innovative, and aspirational voice focused on sustainability and cutting-edge technology',
      tone: 'Confident, visionary, forward-thinking',
      style_guidelines: 'Use active voice, short punchy sentences, emphasize innovation and environmental impact. Avoid jargon, speak directly to the future.',
      preferred_model: 'Anthropic: Claude Sonnet 4.5',
    });
    setExamples([
      {
        title: 'Product Launch Announcement',
        content: 'The future of energy is here. Our new solar roof doesn\'t just power your home—it transforms it into a clean energy powerhouse.'
      },
      {
        title: 'Mission Statement',
        content: 'We\'re accelerating the world\'s transition to sustainable energy. Every vehicle, every solar panel, every battery brings us closer to a cleaner planet.'
      }
    ]);
    setDos([
      'Emphasize environmental impact',
      'Use powerful, action-oriented language',
      'Focus on innovation and the future',
      'Be direct and confident'
    ]);
    setDonts([
      'Don\'t use traditional marketing fluff',
      'Avoid complex technical jargon',
      'Don\'t downplay environmental benefits',
      'Avoid passive voice'
    ]);
    
    setIsGenerating(false);
  };

  const handleAddExample = () => {
    if (exampleTitle.trim() && exampleContent.trim()) {
      setExamples([...examples, { title: exampleTitle.trim(), content: exampleContent.trim() }]);
      setExampleTitle('');
      setExampleContent('');
    }
  };

  const handleRemoveExample = (index: number) => {
    setExamples(examples.filter((_, i) => i !== index));
  };

  const handleAddDo = () => {
    if (doInput.trim()) {
      setDos([...dos, doInput.trim()]);
      setDoInput('');
    }
  };

  const handleRemoveDo = (index: number) => {
    setDos(dos.filter((_, i) => i !== index));
  };

  const handleAddDont = () => {
    if (dontInput.trim()) {
      setDonts([...donts, dontInput.trim()]);
      setDontInput('');
    }
  };

  const handleRemoveDont = (index: number) => {
    setDonts(donts.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      ...formData,
      examples: examples.map(ex => ({ title: ex.title, content: ex.content })),
      dos: dos.map(d => ({ text: d })),
      donts: donts.map(d => ({ text: d })),
    };
    onSubmit?.(data);
    onOpenChange(false);
  };

  const models = [
    'Anthropic: Claude Sonnet 4.5',
    'OpenAI: GPT-4',
    'OpenAI: GPT-4 Turbo',
    'Google: Gemini Pro',
    'Meta: Llama 3',
  ];

  const tones = [
    'Professional',
    'Casual',
    'Friendly',
    'Authoritative',
    'Conversational',
    'Inspirational',
    'Educational',
    'Humorous',
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center text-white shadow-lg shadow-pink-500/25">
              <Mic className="w-5 h-5" />
            </div>
            <div>
              <DialogTitle>Create Brand Voice</DialogTitle>
              <DialogDescription>
                Define a brand voice for consistent content creation
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Quick Start: AI Generate Brand Voice */}
          <div className="p-5 bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl border border-pink-200">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center text-white shadow-lg shadow-pink-500/25 flex-shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-slate-900 mb-1">Quick Start: Analyze Brand Voice with AI</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Enter a brand name, website URL, or paste sample content to extract brand voice characteristics
                </p>
                
                <div className="flex gap-2">
                  <Input
                    value={aiInput}
                    onChange={(e) => setAiInput(e.target.value)}
                    placeholder="e.g., 'Tesla', 'https://nike.com', or paste brand content"
                    className="flex-1 bg-white border-pink-200 focus:border-pink-400"
                    disabled={isGenerating}
                  />
                  <Button 
                    type="button" 
                    onClick={handleAIGenerate}
                    disabled={!aiInput.trim() || isGenerating}
                    className="bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600 text-white shadow-lg shadow-pink-500/30 px-6"
                  >
                    {isGenerating ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Analyze Voice
                      </>
                    )}
                  </Button>
                </div>

                <div className="flex items-start gap-2 mt-3 text-sm text-slate-500">
                  <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <p>
                    AI will extract: tone, style guidelines, content examples, do's and don'ts. Perfect for replicating brand voices.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Voice Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Professional Expert, Friendly Guide"
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
                placeholder="Describe the brand voice and when to use it..."
                rows={3}
                className="mt-1.5"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="tone">Tone</Label>
                <Select
                  value={formData.tone}
                  onValueChange={(value) => setFormData({ ...formData, tone: value })}
                >
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                  <SelectContent>
                    {tones.map(tone => (
                      <SelectItem key={tone} value={tone}>{tone}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="preferred_model">Preferred AI Model</Label>
                <Select
                  value={formData.preferred_model}
                  onValueChange={(value) => setFormData({ ...formData, preferred_model: value })}
                >
                  <SelectTrigger className="mt-1.5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {models.map(model => (
                      <SelectItem key={model} value={model}>{model}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="style_guidelines">Style Guidelines</Label>
              <Textarea
                id="style_guidelines"
                value={formData.style_guidelines}
                onChange={(e) => setFormData({ ...formData, style_guidelines: e.target.value })}
                placeholder="Overall guidelines for writing style, formatting, language use..."
                rows={4}
                className="mt-1.5"
              />
            </div>
          </div>

          {/* Examples */}
          <div className="p-4 bg-pink-50 rounded-lg border border-pink-200 space-y-4">
            <h3 className="text-sm text-pink-900">Voice Examples</h3>
            
            <div className="space-y-2">
              <Input
                value={exampleTitle}
                onChange={(e) => setExampleTitle(e.target.value)}
                placeholder="Example title (e.g., 'Social Media Post')"
              />
              <Textarea
                value={exampleContent}
                onChange={(e) => setExampleContent(e.target.value)}
                placeholder="Example content demonstrating this voice..."
                rows={3}
              />
              <Button type="button" onClick={handleAddExample} size="sm" className="w-full bg-pink-600 hover:bg-pink-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Example
              </Button>
            </div>

            {examples.length > 0 && (
              <div className="space-y-2">
                {examples.map((example, index) => (
                  <div key={index} className="p-3 bg-white rounded border border-pink-100">
                    <div className="flex items-start justify-between mb-1">
                      <span className="text-sm text-slate-900">{example.title}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveExample(index)}
                        className="text-slate-400 hover:text-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-sm text-slate-600">{example.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Do's and Don'ts */}
          <div className="grid grid-cols-2 gap-4">
            {/* Do's */}
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <Label>Do's</Label>
              <div className="flex gap-2 mt-1.5">
                <Input
                  value={doInput}
                  onChange={(e) => setDoInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddDo())}
                  placeholder="Add a do..."
                  className="text-sm"
                />
                <Button type="button" onClick={handleAddDo} size="sm" className="bg-green-600 hover:bg-green-700 flex-shrink-0">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              {dos.length > 0 && (
                <div className="space-y-1 mt-2">
                  {dos.map((item, index) => (
                    <div key={index} className="flex items-start gap-2 p-2 bg-white rounded text-sm">
                      <span className="text-green-600 flex-shrink-0">✓</span>
                      <span className="text-slate-700 flex-1">{item}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveDo(index)}
                        className="text-slate-400 hover:text-red-600 flex-shrink-0"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Don'ts */}
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <Label>Don'ts</Label>
              <div className="flex gap-2 mt-1.5">
                <Input
                  value={dontInput}
                  onChange={(e) => setDontInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddDont())}
                  placeholder="Add a don't..."
                  className="text-sm"
                />
                <Button type="button" onClick={handleAddDont} size="sm" className="bg-red-600 hover:bg-red-700 flex-shrink-0">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              {donts.length > 0 && (
                <div className="space-y-1 mt-2">
                  {donts.map((item, index) => (
                    <div key={index} className="flex items-start gap-2 p-2 bg-white rounded text-sm">
                      <span className="text-red-600 flex-shrink-0">✗</span>
                      <span className="text-slate-700 flex-1">{item}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveDont(index)}
                        className="text-slate-400 hover:text-red-600 flex-shrink-0"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600 text-white shadow-lg shadow-pink-500/30">
              <Sparkles className="w-4 h-4 mr-2" />
              Create Brand Voice
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}