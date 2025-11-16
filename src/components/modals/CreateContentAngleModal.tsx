import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { MessageSquare, Plus, X, Sparkles, Zap, Info, Package } from 'lucide-react';
import { CreateProductModal } from './CreateProductModal';

interface CreateContentAngleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: any) => void;
  products?: Array<{ id: string; name: string }>;
}

export function CreateContentAngleModal({ open, onOpenChange, onSubmit, products = [] }: CreateContentAngleModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    product_id: '',
    angle_type: '',
    opening_hook: '',
    main_content: '',
    closing_cta: '',
    target_audience: '',
    difficulty: 'Medium',
    viral_score: 5,
  });

  const [painPoints, setPainPoints] = useState<string[]>([]);
  const [painPointInput, setPainPointInput] = useState('');

  const [desires, setDesires] = useState<string[]>([]);
  const [desireInput, setDesireInput] = useState('');

  const [emotionalTriggers, setEmotionalTriggers] = useState<string[]>([]);
  const [triggerInput, setTriggerInput] = useState('');

  const [platforms, setPlatforms] = useState<string[]>([]);
  
  const [aiInput, setAiInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [showProductModal, setShowProductModal] = useState(false);

  const handleAIGenerate = async () => {
    if (!aiInput.trim()) return;
    
    setIsGenerating(true);
    // Simulate AI generation - in real app, this would call your backend
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Mock data population
    setFormData({
      name: 'The "Hidden Cost" Angle',
      subject: 'Budget Smartphones',
      angle_type: 'Problem-Solution',
      opening_hook: 'You think you\'re saving money with that $200 smartphone, but here\'s what it\'s actually costing you...',
      main_content: 'Budget phones seem like a steal, but the hidden costs add up: slower processors mean wasted time, poor cameras mean missed memories, weak batteries mean constant charging anxiety. Over 2 years, you lose more in frustration and opportunity cost than you\'d spend on a quality device upfront.',
      closing_cta: 'Check out our tested mid-range picks that actually save you money in the long run (link in bio)',
      target_audience: 'Budget-conscious consumers aged 25-40 looking for value',
      difficulty: 'Easy',
      viral_score: 8,
    });
    
    setPainPoints([
      'Wasting money on cheap products that break',
      'Feeling frustrated with slow performance',
      'Missing important photos due to bad camera',
      'Constantly worried about battery dying'
    ]);
    
    setDesires([
      'Get real value for money',
      'Own a reliable device that lasts',
      'Feel confident in purchase decisions',
      'Stop wasting time on slow tech'
    ]);
    
    setEmotionalTriggers([
      'Fear of wasting money',
      'Regret over past bad purchases',
      'Desire for smart decisions',
      'FOMO on quality experiences'
    ]);
    
    setPlatforms(['TikTok', 'Instagram', 'YouTube Shorts']);
    
    setIsGenerating(false);
  };

  const handleAddPainPoint = () => {
    if (painPointInput.trim()) {
      setPainPoints([...painPoints, painPointInput.trim()]);
      setPainPointInput('');
    }
  };

  const handleRemovePainPoint = (index: number) => {
    setPainPoints(painPoints.filter((_, i) => i !== index));
  };

  const handleAddDesire = () => {
    if (desireInput.trim()) {
      setDesires([...desires, desireInput.trim()]);
      setDesireInput('');
    }
  };

  const handleRemoveDesire = (index: number) => {
    setDesires(desires.filter((_, i) => i !== index));
  };

  const handleAddTrigger = () => {
    if (triggerInput.trim()) {
      setEmotionalTriggers([...emotionalTriggers, triggerInput.trim()]);
      setTriggerInput('');
    }
  };

  const handleRemoveTrigger = (index: number) => {
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
      pain_points_addressed: painPoints,
      desires_targeted: desires,
      emotional_triggers: emotionalTriggers,
      platform_fit: platforms,
    };
    onSubmit?.(data);
    onOpenChange(false);
  };

  const angleTypes = [
    'Educational',
    'Emotional',
    'Problem-Solution',
    'Story-Based',
    'Comparison',
    'Behind-the-Scenes',
    'Trending Topic',
    'Contrarian',
  ];

  const difficulties = ['Easy', 'Medium', 'Hard'];
  const platformOptions = ['YouTube', 'TikTok', 'Instagram', 'LinkedIn', 'Twitter', 'Facebook'];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/25">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <DialogTitle>Create Content Angle</DialogTitle>
              <DialogDescription>
                Define a messaging strategy for your content
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Quick Start: AI Generate Content Angle */}
          <div className="p-5 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/25 flex-shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-slate-900 mb-1">Quick Start: Generate Content Angles with AI</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Enter a product, topic, or niche to automatically generate compelling content angles
                </p>
                
                <div className="flex gap-2">
                  <Input
                    value={aiInput}
                    onChange={(e) => setAiInput(e.target.value)}
                    placeholder="e.g., 'budget smartphones', 'fitness for busy professionals'"
                    className="flex-1 bg-white border-blue-200 focus:border-blue-400"
                    disabled={isGenerating}
                  />
                  <Button 
                    type="button" 
                    onClick={handleAIGenerate}
                    disabled={!aiInput.trim() || isGenerating}
                    className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-lg shadow-blue-500/30 px-6"
                  >
                    {isGenerating ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Generate Angles
                      </>
                    )}
                  </Button>
                </div>

                <div className="flex items-start gap-2 mt-3 text-sm text-slate-500">
                  <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <p>
                    AI will create: hook, main content, CTA, pain points, desires, emotional triggers, and platform recommendations.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Angle Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Problem-Solution Framework"
                required
                className="mt-1.5"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Main subject or theme"
                  required
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="angle_type">Angle Type *</Label>
                <Select
                  value={formData.angle_type}
                  onValueChange={(value) => setFormData({ ...formData, angle_type: value })}
                >
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {angleTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="product_id">Linked Product <span className="text-xs text-slate-500">(Optional)</span></Label>
                <Select
                  value={formData.product_id}
                  onValueChange={(value) => {
                    if (value === '__create_new__') {
                      setShowProductModal(true);
                    } else {
                      setFormData({ ...formData, product_id: value });
                    }
                  }}
                >
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Select product (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__create_new__" className="text-blue-600">
                      <div className="flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        <span>Create New Product</span>
                      </div>
                    </SelectItem>
                    {products.length > 0 ? (
                      <>
                        <SelectItem value="">None</SelectItem>
                        {products.map(product => (
                          <SelectItem key={product.id} value={product.id}>
                            <div className="flex items-center gap-2">
                              <Package className="w-4 h-4 text-slate-400" />
                              {product.name}
                            </div>
                          </SelectItem>
                        ))}
                      </>
                    ) : (
                      <SelectItem value="" disabled className="text-slate-400 text-sm">
                        No products available
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
                <p className="text-xs text-slate-500 mt-1">
                  Generate angles specifically for this product
                </p>
              </div>

              <div>
                <Label htmlFor="target_audience">Target Audience</Label>
                <Input
                  id="target_audience"
                  value={formData.target_audience}
                  onChange={(e) => setFormData({ ...formData, target_audience: e.target.value })}
                  placeholder="Describe your target audience"
                  className="mt-1.5"
                />
              </div>
            </div>
          </div>

          {/* Content Structure */}
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 space-y-4">
            <h3 className="text-sm text-blue-900">Content Structure</h3>
            
            <div>
              <Label htmlFor="opening_hook">Opening Hook *</Label>
              <Textarea
                id="opening_hook"
                value={formData.opening_hook}
                onChange={(e) => setFormData({ ...formData, opening_hook: e.target.value })}
                placeholder="The opening hook that grabs attention..."
                rows={3}
                required
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="main_content">Main Content *</Label>
              <Textarea
                id="main_content"
                value={formData.main_content}
                onChange={(e) => setFormData({ ...formData, main_content: e.target.value })}
                placeholder="The core message and content..."
                rows={5}
                required
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="closing_cta">Closing CTA *</Label>
              <Textarea
                id="closing_cta"
                value={formData.closing_cta}
                onChange={(e) => setFormData({ ...formData, closing_cta: e.target.value })}
                placeholder="The call-to-action that drives action..."
                rows={2}
                required
                className="mt-1.5"
              />
            </div>
          </div>

          {/* Pain Points & Desires */}
          <div className="grid grid-cols-2 gap-4">
            {/* Pain Points */}
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <Label>Pain Points Addressed</Label>
              <div className="flex gap-2 mt-1.5">
                <Input
                  value={painPointInput}
                  onChange={(e) => setPainPointInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddPainPoint())}
                  placeholder="Add pain point..."
                  className="text-sm"
                />
                <Button type="button" onClick={handleAddPainPoint} size="sm" className="bg-red-600 hover:bg-red-700 flex-shrink-0">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              {painPoints.length > 0 && (
                <div className="space-y-1.5 mt-2">
                  {painPoints.map((point, index) => (
                    <div key={index} className="flex items-start gap-2 p-2 bg-white rounded text-sm">
                      <span className="text-slate-700 flex-1">{point}</span>
                      <button
                        type="button"
                        onClick={() => handleRemovePainPoint(index)}
                        className="text-slate-400 hover:text-red-600 flex-shrink-0"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Desires */}
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <Label>Desires Targeted</Label>
              <div className="flex gap-2 mt-1.5">
                <Input
                  value={desireInput}
                  onChange={(e) => setDesireInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddDesire())}
                  placeholder="Add desire..."
                  className="text-sm"
                />
                <Button type="button" onClick={handleAddDesire} size="sm" className="bg-green-600 hover:bg-green-700 flex-shrink-0">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              {desires.length > 0 && (
                <div className="space-y-1.5 mt-2">
                  {desires.map((desire, index) => (
                    <div key={index} className="flex items-start gap-2 p-2 bg-white rounded text-sm">
                      <span className="text-slate-700 flex-1">{desire}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveDesire(index)}
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

          {/* Emotional Triggers */}
          <div>
            <Label>Emotional Triggers</Label>
            <div className="flex gap-2 mt-1.5">
              <Input
                value={triggerInput}
                onChange={(e) => setTriggerInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTrigger())}
                placeholder="Add emotional trigger..."
              />
              <Button type="button" onClick={handleAddTrigger} size="sm" className="bg-blue-600 hover:bg-blue-700">
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
                      onClick={() => handleRemoveTrigger(index)}
                      className="hover:bg-pink-200 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Platform Fit */}
          <div>
            <Label>Platform Fit</Label>
            <div className="flex flex-wrap gap-2 mt-1.5">
              {platformOptions.map(platform => (
                <button
                  key={platform}
                  type="button"
                  onClick={() => togglePlatform(platform)}
                  className={`px-3 py-1.5 rounded-lg border text-sm transition-colors ${
                    platforms.includes(platform)
                      ? 'bg-blue-100 border-blue-300 text-blue-700'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-blue-200'
                  }`}
                >
                  {platform}
                </button>
              ))}
            </div>
          </div>

          {/* Metadata */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="difficulty">Difficulty</Label>
              <Select
                value={formData.difficulty}
                onValueChange={(value) => setFormData({ ...formData, difficulty: value })}
              >
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {difficulties.map(diff => (
                    <SelectItem key={diff} value={diff}>{diff}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="viral_score">Viral Score (1-10)</Label>
              <Input
                id="viral_score"
                type="number"
                min="1"
                max="10"
                value={formData.viral_score}
                onChange={(e) => setFormData({ ...formData, viral_score: parseInt(e.target.value) || 5 })}
                className="mt-1.5"
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-lg shadow-blue-500/30">
              <Sparkles className="w-4 h-4 mr-2" />
              Create Content Angle
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
      
      {/* Create Product Modal */}
      <CreateProductModal 
        open={showProductModal} 
        onOpenChange={setShowProductModal}
        onSubmit={(productData) => {
          console.log('New product created:', productData);
          // In real app, this would create the product and set the product_id
          // For now, just close the modal
          setShowProductModal(false);
        }}
      />
    </Dialog>
  );
}