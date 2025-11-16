import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Users, Plus, X, Sparkles, Zap, Info } from 'lucide-react';

interface CreateCharacterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: any) => void;
}

export function CreateCharacterModal({ open, onOpenChange, onSubmit }: CreateCharacterModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    character_type: '',
    visual_style: '',
    gender: '',
    age_range: '',
    build: '',
    ethnicity: '',
    hair_description: '',
    typical_clothing: '',
    voice_selection: '',
    overall_tone: '',
    speaking_style: '',
  });

  const [personalityTraits, setPersonalityTraits] = useState<string[]>([]);
  const [traitInput, setTraitInput] = useState('');

  const [expertise, setExpertise] = useState<string[]>([]);
  const [expertiseInput, setExpertiseInput] = useState('');

  const [accessories, setAccessories] = useState<string[]>([]);
  const [accessoryInput, setAccessoryInput] = useState('');

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
      name: 'Dr. Maya Chen',
      description: 'A brilliant tech entrepreneur and AI ethics researcher who combines cutting-edge innovation with deep philosophical insight.',
      character_type: 'Presenter',
      visual_style: 'Professional Modern',
      gender: 'Female',
      age_range: '30-40',
      build: 'Athletic',
      ethnicity: 'Asian',
      hair_description: 'Short black bob, professional styled',
      typical_clothing: 'Smart business casual - blazers, turtlenecks, minimalist jewelry',
      voice_selection: 'Professional Female',
      overall_tone: 'Confident, thoughtful, inspiring',
      speaking_style: 'Clear articulation, uses analogies, pauses for emphasis',
    });
    
    setPersonalityTraits([
      'Innovative thinker',
      'Empathetic leader',
      'Data-driven decision maker',
      'Calm under pressure',
      'Curious learner'
    ]);
    
    setExpertise([
      'Artificial Intelligence',
      'Tech Ethics',
      'Product Development',
      'Public Speaking',
      'Business Strategy'
    ]);
    
    setAccessories([
      'Smart watch',
      'Minimalist pendant necklace',
      'Designer glasses',
      'Leather portfolio'
    ]);
    
    setTags(['tech', 'innovation', 'AI', 'entrepreneur', 'thought-leader']);
    
    setIsGenerating(false);
  };

  const handleAddTrait = () => {
    if (traitInput.trim()) {
      setPersonalityTraits([...personalityTraits, traitInput.trim()]);
      setTraitInput('');
    }
  };

  const handleRemoveTrait = (index: number) => {
    setPersonalityTraits(personalityTraits.filter((_, i) => i !== index));
  };

  const handleAddExpertise = () => {
    if (expertiseInput.trim()) {
      setExpertise([...expertise, expertiseInput.trim()]);
      setExpertiseInput('');
    }
  };

  const handleRemoveExpertise = (index: number) => {
    setExpertise(expertise.filter((_, i) => i !== index));
  };

  const handleAddAccessory = () => {
    if (accessoryInput.trim()) {
      setAccessories([...accessories, accessoryInput.trim()]);
      setAccessoryInput('');
    }
  };

  const handleRemoveAccessory = (index: number) => {
    setAccessories(accessories.filter((_, i) => i !== index));
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
      personality_traits: personalityTraits.map(t => ({ trait: t })),
      expertise: expertise.map(e => ({ area: e })),
      accessories: accessories.map(a => ({ item: a })),
      tags,
    };
    onSubmit?.(data);
    onOpenChange(false);
  };

  const characterTypes = ['Narrator', 'Expert', 'Host', 'Teacher', 'Influencer', 'Avatar', 'Mascot'];
  const visualStyles = ['Realistic', 'Animated', '3D', 'Cartoon', 'Stylized', 'Photorealistic'];
  const ageRanges = ['18-25', '26-35', '36-45', '46-55', '56-65', '65+'];
  const builds = ['Slim', 'Athletic', 'Average', 'Muscular', 'Plus-size'];
  const genders = ['Male', 'Female', 'Non-binary'];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white shadow-lg shadow-green-500/25">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <DialogTitle>Create Character</DialogTitle>
              <DialogDescription>
                Define a character for your content
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Quick Start: AI Generate Character */}
          <div className="p-5 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white shadow-lg shadow-green-500/25 flex-shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-slate-900 mb-1">Quick Start: Generate Character with AI</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Describe the character you need and AI will create a complete profile
                </p>
                
                <div className="flex gap-2">
                  <Input
                    value={aiInput}
                    onChange={(e) => setAiInput(e.target.value)}
                    placeholder="e.g., 'female tech entrepreneur, 30s, professional and innovative'"
                    className="flex-1 bg-white border-green-200 focus:border-green-400"
                    disabled={isGenerating}
                  />
                  <Button 
                    type="button" 
                    onClick={handleAIGenerate}
                    disabled={!aiInput.trim() || isGenerating}
                    className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white shadow-lg shadow-green-500/30 px-6"
                  >
                    {isGenerating ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Generate Character
                      </>
                    )}
                  </Button>
                </div>

                <div className="flex items-start gap-2 mt-3 text-sm text-slate-500">
                  <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <p>
                    AI will create: name, description, physical appearance, personality traits, expertise, voice characteristics, and accessories.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Character Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Dr. Sarah Johnson"
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
                placeholder="Brief description of the character..."
                rows={3}
                className="mt-1.5"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="character_type">Character Type</Label>
                <Select
                  value={formData.character_type}
                  onValueChange={(value) => setFormData({ ...formData, character_type: value })}
                >
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {characterTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="visual_style">Visual Style</Label>
                <Select
                  value={formData.visual_style}
                  onValueChange={(value) => setFormData({ ...formData, visual_style: value })}
                >
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Select style" />
                  </SelectTrigger>
                  <SelectContent>
                    {visualStyles.map(style => (
                      <SelectItem key={style} value={style}>{style}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Physical Appearance */}
          <div className="p-4 bg-green-50 rounded-lg border border-green-200 space-y-4">
            <h3 className="text-sm text-green-900">Physical Appearance</h3>
            
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="gender">Gender</Label>
                <Select
                  value={formData.gender}
                  onValueChange={(value) => setFormData({ ...formData, gender: value })}
                >
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {genders.map(gender => (
                      <SelectItem key={gender} value={gender}>{gender}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="age_range">Age Range</Label>
                <Select
                  value={formData.age_range}
                  onValueChange={(value) => setFormData({ ...formData, age_range: value })}
                >
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {ageRanges.map(range => (
                      <SelectItem key={range} value={range}>{range}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="build">Build</Label>
                <Select
                  value={formData.build}
                  onValueChange={(value) => setFormData({ ...formData, build: value })}
                >
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {builds.map(build => (
                      <SelectItem key={build} value={build}>{build}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="ethnicity">Ethnicity</Label>
              <Input
                id="ethnicity"
                value={formData.ethnicity}
                onChange={(e) => setFormData({ ...formData, ethnicity: e.target.value })}
                placeholder="e.g., Hispanic, Asian, Caucasian"
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="hair_description">Hair Description</Label>
              <Input
                id="hair_description"
                value={formData.hair_description}
                onChange={(e) => setFormData({ ...formData, hair_description: e.target.value })}
                placeholder="e.g., Long brown hair, short curly black hair"
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="typical_clothing">Typical Clothing</Label>
              <Input
                id="typical_clothing"
                value={formData.typical_clothing}
                onChange={(e) => setFormData({ ...formData, typical_clothing: e.target.value })}
                placeholder="e.g., Business suit, casual t-shirt and jeans"
                className="mt-1.5"
              />
            </div>

            <div>
              <Label>Accessories</Label>
              <div className="flex gap-2 mt-1.5">
                <Input
                  value={accessoryInput}
                  onChange={(e) => setAccessoryInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddAccessory())}
                  placeholder="Add accessory..."
                />
                <Button type="button" onClick={handleAddAccessory} size="sm" className="bg-green-600 hover:bg-green-700">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              {accessories.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {accessories.map((accessory, index) => (
                    <Badge key={index} className="bg-green-100 text-green-700 border-green-200 pl-2 pr-1 py-1 gap-1">
                      <span>{accessory}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveAccessory(index)}
                        className="hover:bg-green-200 rounded-full p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Voice & Personality */}
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 space-y-4">
            <h3 className="text-sm text-blue-900">Voice & Personality</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="voice_selection">Voice Selection</Label>
                <Input
                  id="voice_selection"
                  value={formData.voice_selection}
                  onChange={(e) => setFormData({ ...formData, voice_selection: e.target.value })}
                  placeholder="Voice ID or description"
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="overall_tone">Overall Tone</Label>
                <Input
                  id="overall_tone"
                  value={formData.overall_tone}
                  onChange={(e) => setFormData({ ...formData, overall_tone: e.target.value })}
                  placeholder="e.g., Warm, Professional"
                  className="mt-1.5"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="speaking_style">Speaking Style</Label>
              <Textarea
                id="speaking_style"
                value={formData.speaking_style}
                onChange={(e) => setFormData({ ...formData, speaking_style: e.target.value })}
                placeholder="Describe how this character speaks..."
                rows={2}
                className="mt-1.5"
              />
            </div>

            <div>
              <Label>Personality Traits</Label>
              <div className="flex gap-2 mt-1.5">
                <Input
                  value={traitInput}
                  onChange={(e) => setTraitInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTrait())}
                  placeholder="Add personality trait..."
                />
                <Button type="button" onClick={handleAddTrait} size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              {personalityTraits.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {personalityTraits.map((trait, index) => (
                    <Badge key={index} className="bg-blue-100 text-blue-700 border-blue-200 pl-2 pr-1 py-1 gap-1">
                      <span>{trait}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTrait(index)}
                        className="hover:bg-blue-200 rounded-full p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div>
              <Label>Areas of Expertise</Label>
              <div className="flex gap-2 mt-1.5">
                <Input
                  value={expertiseInput}
                  onChange={(e) => setExpertiseInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddExpertise())}
                  placeholder="Add expertise area..."
                />
                <Button type="button" onClick={handleAddExpertise} size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              {expertise.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {expertise.map((exp, index) => (
                    <Badge key={index} className="bg-indigo-100 text-indigo-700 border-indigo-200 pl-2 pr-1 py-1 gap-1">
                      <span>{exp}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveExpertise(index)}
                        className="hover:bg-indigo-200 rounded-full p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Tags */}
          <div>
            <Label>Tags</Label>
            <div className="flex gap-2 mt-1.5">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                placeholder="Add tags..."
              />
              <Button type="button" onClick={handleAddTag} size="sm" className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag, index) => (
                  <Badge key={index} className="bg-slate-100 text-slate-700 border-slate-200 pl-2 pr-1 py-1 gap-1">
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(index)}
                      className="hover:bg-slate-200 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white shadow-lg shadow-green-500/30">
              <Sparkles className="w-4 h-4 mr-2" />
              Create Character
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}