import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { BookOpen, Plus, X, Sparkles, Zap, Info } from 'lucide-react';

interface CreateStoryElementModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: any) => void;
}

export function CreateStoryElementModal({ open, onOpenChange, onSubmit }: CreateStoryElementModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    element_type: '',
    content: '',
    context: '',
  });

  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  
  const [aiInput, setAiInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAIGenerate = async () => {
    if (!aiInput.trim()) return;
    
    setIsGenerating(true);
    // Simulate AI generation - in real app, this would call your backend
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Mock data population
    setFormData({
      name: 'The Midnight Code Review',
      element_type: 'Anecdote',
      content: 'It was 2 AM when I discovered a single line of code that had been crashing our production servers for weeks. The bug was hiding in plain sight—a race condition that only happened when traffic spiked. I remember staring at the screen, coffee gone cold, when suddenly it clicked. That moment taught me more about system design than any textbook ever could.',
      context: 'Use when discussing the importance of code reviews, debugging persistence, or learning from production issues. Perfect for technical content aimed at junior to mid-level developers.',
    });
    
    setTags(['programming', 'debugging', 'real-world-experience', 'tech-story']);
    
    setIsGenerating(false);
  };

  const handleAddTag = () => {
    if (tagInput.trim()) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      ...formData,
      tags,
    };
    onSubmit?.(data);
    onOpenChange(false);
  };

  const elementTypes = [
    'Anecdote',
    'Case Study',
    'Metaphor',
    'Conflict',
    'Resolution',
    'Character Arc',
    'Plot Point',
    'Setting',
    'Hook',
    'Twist',
    'Lesson',
    'Quote',
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white shadow-lg shadow-orange-500/25">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <DialogTitle>Create Story Element</DialogTitle>
              <DialogDescription>
                Add a reusable story element for your content
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Quick Start: AI Generate Story Element */}
          <div className="p-5 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border border-orange-200">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white shadow-lg shadow-orange-500/25 flex-shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-slate-900 mb-1">Quick Start: Generate Story Element with AI</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Describe the story, theme, or concept you need and AI will create a compelling narrative element
                </p>
                
                <div className="flex gap-2">
                  <Input
                    value={aiInput}
                    onChange={(e) => setAiInput(e.target.value)}
                    placeholder="e.g., 'debugging story at 2am', 'customer success transformation'"
                    className="flex-1 bg-white border-orange-200 focus:border-orange-400"
                    disabled={isGenerating}
                  />
                  <Button 
                    type="button" 
                    onClick={handleAIGenerate}
                    disabled={!aiInput.trim() || isGenerating}
                    className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white shadow-lg shadow-orange-500/30 px-6"
                  >
                    {isGenerating ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Generate Story
                      </>
                    )}
                  </Button>
                </div>

                <div className="flex items-start gap-2 mt-3 text-sm text-slate-500">
                  <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <p>
                    AI will create: engaging story content, usage context, and relevant tags. Perfect for anecdotes, case studies, and metaphors.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Element Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Hero's Journey, Origin Story"
                required
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="element_type">Element Type *</Label>
              <Select
                value={formData.element_type}
                onValueChange={(value) => setFormData({ ...formData, element_type: value })}
              >
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {elementTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="content">Content *</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="The actual story element content..."
                rows={8}
                required
                className="mt-1.5"
              />
              <p className="text-xs text-slate-500 mt-1">
                Write the story element that can be reused across multiple pieces of content
              </p>
            </div>

            <div>
              <Label htmlFor="context">Context / Usage Notes</Label>
              <Textarea
                id="context"
                value={formData.context}
                onChange={(e) => setFormData({ ...formData, context: e.target.value })}
                placeholder="When and how to use this story element..."
                rows={3}
                className="mt-1.5"
              />
              <p className="text-xs text-slate-500 mt-1">
                Provide guidance on when this element works best
              </p>
            </div>
          </div>

          {/* Tags */}
          <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
            <Label>Tags</Label>
            <p className="text-xs text-slate-500 mb-2">
              Add tags to help categorize and find this element later
            </p>
            <div className="flex gap-2 mt-1.5">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                placeholder="Add tags..."
              />
              <Button type="button" onClick={handleAddTag} size="sm" className="bg-orange-600 hover:bg-orange-700">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag, index) => (
                  <Badge key={index} className="bg-orange-100 text-orange-700 border-orange-200 pl-2 pr-1 py-1 gap-1">
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(index)}
                      className="hover:bg-orange-200 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Examples Section */}
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
            <h3 className="text-sm text-slate-700 mb-2">💡 Tips for Great Story Elements</h3>
            <ul className="text-sm text-slate-600 space-y-1">
              <li>• Keep elements modular so they can fit different contexts</li>
              <li>• Include emotional hooks that resonate with your audience</li>
              <li>• Use vivid, specific details that bring the story to life</li>
              <li>• Consider the beginning, middle, and end of your element</li>
            </ul>
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white shadow-lg shadow-orange-500/30">
              <Sparkles className="w-4 h-4 mr-2" />
              Create Story Element
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}