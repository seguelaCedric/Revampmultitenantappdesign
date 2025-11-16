import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Sparkles, Info, Zap, User } from 'lucide-react';

interface CreateIdentityModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: any) => void;
  brandVoices?: Array<{ id: string; name: string }>;
  characters?: Array<{ id: string; name: string }>;
}

export function CreateIdentityModal({ 
  open, 
  onOpenChange, 
  onSubmit,
  brandVoices = [],
  characters = []
}: CreateIdentityModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    brand_voice_id: '',
    character_id: '',
    delivery_speed: 'normal',
    emotion_level: 'medium',
    gesture_style: 'neutral',
  });
  
  const [aiInput, setAiInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAIGenerate = async () => {
    if (!aiInput.trim()) return;
    
    setIsGenerating(true);
    // Simulate AI generation - in real app, this would call your backend
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Mock data population
    setFormData({
      name: 'Energetic Tech Explainer',
      description: 'Fast-paced, enthusiastic presenter perfect for explaining complex tech concepts in an accessible way. Combines professional authority with friendly approachability.',
      brand_voice_id: brandVoices[0]?.id || '',
      character_id: characters[0]?.id || '',
      delivery_speed: 'fast',
      emotion_level: 'high',
      gesture_style: 'animated',
    });
    
    setIsGenerating(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      ...formData,
      delivery: {
        speed: formData.delivery_speed,
        emotion_level: formData.emotion_level,
        gesture_style: formData.gesture_style,
      },
    };
    onSubmit?.(data);
    onOpenChange(false);
  };

  const speedOptions = ['very slow', 'slow', 'normal', 'fast', 'very fast'];
  const emotionLevels = ['minimal', 'low', 'medium', 'high', 'intense'];
  const gestureStyles = ['minimal', 'subtle', 'neutral', 'expressive', 'animated'];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <DialogTitle>Create Identity</DialogTitle>
              <DialogDescription>
                Combine a brand voice and character into a complete content identity
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Quick Start: AI Generate Identity */}
          <div className="p-5 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border border-indigo-200">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 flex-shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-slate-900 mb-1">Quick Start: Generate Identity with AI</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Describe the type of presenter you need and AI will configure the complete identity
                </p>
                
                <div className="flex gap-2">
                  <Input
                    value={aiInput}
                    onChange={(e) => setAiInput(e.target.value)}
                    placeholder="e.g., 'energetic tech explainer', 'calm meditation coach'"
                    className="flex-1 bg-white border-indigo-200 focus:border-indigo-400"
                    disabled={isGenerating}
                  />
                  <Button 
                    type="button" 
                    onClick={handleAIGenerate}
                    disabled={!aiInput.trim() || isGenerating}
                    className="bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white shadow-lg shadow-indigo-500/30 px-6"
                  >
                    {isGenerating ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Generate Identity
                      </>
                    )}
                  </Button>
                </div>

                <div className="flex items-start gap-2 mt-3 text-sm text-slate-500">
                  <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <p>
                    AI will set: delivery speed, emotion level, gesture style, and suggest matching voice/character combinations.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Info Banner */}
          <div className="flex gap-3 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
            <Info className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-indigo-900 mb-1">What is an Identity?</p>
              <p className="text-sm text-indigo-700">
                An Identity combines a Brand Voice (how you sound) with a Character (who speaks) and Delivery settings (how they present) to create a complete content persona.
              </p>
            </div>
          </div>

          {/* Basic Information */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Identity Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Expert Educator, Friendly Coach"
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
                placeholder="Describe this identity and when to use it..."
                rows={3}
                className="mt-1.5"
              />
            </div>
          </div>

          {/* Voice & Character Selection */}
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-4">
            <h3 className="text-sm text-slate-900">Components</h3>
            
            <div>
              <Label htmlFor="brand_voice_id">Brand Voice * <span className="text-xs text-slate-500">(How it sounds)</span></Label>
              <Select
                value={formData.brand_voice_id}
                onValueChange={(value) => setFormData({ ...formData, brand_voice_id: value })}
              >
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Select brand voice" />
                </SelectTrigger>
                <SelectContent>
                  {brandVoices.length > 0 ? (
                    brandVoices.map(voice => (
                      <SelectItem key={voice.id} value={voice.id}>{voice.name}</SelectItem>
                    ))
                  ) : (
                    <SelectItem value="none" disabled>No brand voices available</SelectItem>
                  )}
                </SelectContent>
              </Select>
              {brandVoices.length === 0 && (
                <p className="text-xs text-amber-600 mt-1">
                  ⚠️ Please create a Brand Voice first
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="character_id">Character * <span className="text-xs text-slate-500">(Who speaks)</span></Label>
              <Select
                value={formData.character_id}
                onValueChange={(value) => setFormData({ ...formData, character_id: value })}
              >
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Select character" />
                </SelectTrigger>
                <SelectContent>
                  {characters.length > 0 ? (
                    characters.map(character => (
                      <SelectItem key={character.id} value={character.id}>{character.name}</SelectItem>
                    ))
                  ) : (
                    <SelectItem value="none" disabled>No characters available</SelectItem>
                  )}
                </SelectContent>
              </Select>
              {characters.length === 0 && (
                <p className="text-xs text-amber-600 mt-1">
                  ⚠️ Please create a Character first
                </p>
              )}
            </div>
          </div>

          {/* Delivery Settings */}
          <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200 space-y-4">
            <h3 className="text-sm text-indigo-900">Delivery Style</h3>
            <p className="text-xs text-indigo-700">
              Control how the content is presented and delivered
            </p>
            
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="delivery_speed">Speaking Speed</Label>
                <Select
                  value={formData.delivery_speed}
                  onValueChange={(value) => setFormData({ ...formData, delivery_speed: value })}
                >
                  <SelectTrigger className="mt-1.5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {speedOptions.map(speed => (
                      <SelectItem key={speed} value={speed} className="capitalize">{speed}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="emotion_level">Emotion Level</Label>
                <Select
                  value={formData.emotion_level}
                  onValueChange={(value) => setFormData({ ...formData, emotion_level: value })}
                >
                  <SelectTrigger className="mt-1.5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {emotionLevels.map(level => (
                      <SelectItem key={level} value={level} className="capitalize">{level}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="gesture_style">Gesture Style</Label>
                <Select
                  value={formData.gesture_style}
                  onValueChange={(value) => setFormData({ ...formData, gesture_style: value })}
                >
                  <SelectTrigger className="mt-1.5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {gestureStyles.map(style => (
                      <SelectItem key={style} value={style} className="capitalize">{style}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Preview Example */}
          <div className="p-4 bg-gradient-to-br from-slate-50 to-indigo-50 rounded-lg border border-indigo-100">
            <h3 className="text-sm text-slate-900 mb-2">Preview</h3>
            <div className="text-sm text-slate-600 space-y-2">
              <p><span className="text-slate-500">Voice:</span> {brandVoices.find(v => v.id === formData.brand_voice_id)?.name || 'Not selected'}</p>
              <p><span className="text-slate-500">Character:</span> {characters.find(c => c.id === formData.character_id)?.name || 'Not selected'}</p>
              <p><span className="text-slate-500">Delivery:</span> {formData.delivery_speed} speed, {formData.emotion_level} emotion, {formData.gesture_style} gestures</p>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={!formData.brand_voice_id || !formData.character_id}
              className="bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white shadow-lg shadow-indigo-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Create Identity
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}