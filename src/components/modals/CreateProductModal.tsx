import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Package, Plus, X, Sparkles, Zap, Search, Info } from 'lucide-react';

interface Product {
  id?: string;
  name: string;
  description: string;
  category: string;
  price?: number;
  currency?: string;
  tags?: string[];
  [key: string]: any;
}

interface CreateProductModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: any) => void;
  editingItem?: Product | null;
}

export function CreateProductModal({ open, onOpenChange, onSubmit, editingItem }: CreateProductModalProps) {
  const isEditMode = !!editingItem;
  
  const [formData, setFormData] = useState({
    name: editingItem?.name || '',
    description: editingItem?.description || '',
    category: editingItem?.category || '',
    price: editingItem?.price?.toString() || '',
    currency: editingItem?.currency || 'USD',
    brand: '',
    sku: '',
  });

  const [features, setFeatures] = useState<string[]>(editingItem && 'features' in editingItem ? (editingItem.features as string[]) : []);
  const [featureInput, setFeatureInput] = useState('');
  
  const [specifications, setSpecifications] = useState<Array<{ name: string; value: string }>>([]);
  const [specName, setSpecName] = useState('');
  const [specValue, setSpecValue] = useState('');
  
  const [affiliateLinks, setAffiliateLinks] = useState<Array<{ platform: string; url: string }>>([]);
  const [affilPlatform, setAffilPlatform] = useState('');
  const [affilUrl, setAffilUrl] = useState('');
  
  const [tags, setTags] = useState<string[]>(editingItem?.tags || []);
  const [tagInput, setTagInput] = useState('');
  
  const [scrapeUrl, setScrapeUrl] = useState('');
  const [isScrapingProduct, setIsScrapingProduct] = useState(false);
  
  // Marketing Intelligence
  const [icp, setIcp] = useState('');
  const [marketingAngles, setMarketingAngles] = useState<string[]>([]);
  const [affiliateStrategy, setAffiliateStrategy] = useState('');

  const handleScrapeProduct = async () => {
    if (!scrapeUrl.trim()) return;
    
    setIsScrapingProduct(true);
    // Simulate AI scraping - in real app, this would call your backend
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Mock data population
    setFormData({
      name: 'Apple AirPods Pro (2nd Generation)',
      description: 'Premium wireless earbuds with active noise cancellation, adaptive transparency, and personalized spatial audio.',
      category: 'Audio Equipment',
      price: '249.99',
      currency: 'USD',
      brand: 'Apple',
      sku: 'MTJV3AM/A',
    });
    
    setFeatures([
      'Active Noise Cancellation with Adaptive Audio',
      'Personalized Spatial Audio with dynamic head tracking',
      'Up to 6 hours listening time with ANC enabled',
      'MagSafe charging case',
      'IPX4 sweat and water resistant',
      'Touch control for music and calls'
    ]);
    
    setSpecifications([
      { name: 'Weight (earbuds)', value: '5.3g each' },
      { name: 'Weight (case)', value: '50.8g' },
      { name: 'Battery Life', value: '6 hours (30 with case)' },
      { name: 'Connectivity', value: 'Bluetooth 5.3' },
      { name: 'Chip', value: 'Apple H2' },
      { name: 'Water Resistance', value: 'IPX4' }
    ]);
    
    setAffiliateLinks([
      { platform: 'Amazon', url: 'https://amazon.com/apple-airpods-pro' },
      { platform: 'Apple Store', url: 'https://apple.com/airpods-pro' },
      { platform: 'Best Buy', url: 'https://bestbuy.com/airpods-pro' }
    ]);
    
    setTags(['tech', 'audio', 'wireless', 'premium', 'apple', 'noise-cancelling']);
    
    // Marketing Intelligence
    setIcp(`**Demographics:**
• Age: 25-45 years old
• Income: $75k-150k+ annually
• Tech-savvy professionals and creatives
• Urban dwellers with active lifestyles

**Pain Points:**
• Tired of cheap earbuds that break or sound poor
• Need to focus in noisy environments (coffee shops, open offices, commutes)
• Want seamless integration with Apple ecosystem
• Struggle with uncomfortable earbuds during workouts

**Desires:**
• Premium audio quality for music and calls
• Effortless connectivity and switching between devices
• Status symbol that reflects their success
• Long battery life for all-day use`);
    
    setMarketingAngles([
      'Focus Anywhere: Highlight ANC for productivity in noisy spaces',
      'Seamless Apple Ecosystem: Emphasize instant pairing and device switching',
      'Premium Audio Experience: Target audiophiles and music lovers',
      'Active Lifestyle: Show sweat resistance for gym and running',
      'Professional Edge: Position as executive accessory for calls',
      'Gift for Success: Market as aspirational gift for achievers'
    ]);
    
    setAffiliateStrategy(`**Content Strategy:**
1. **Comparison Content**: "AirPods Pro vs Sony WF-1000XM5" - High intent buyers
2. **Use Case Reviews**: "Best Earbuds for Working from Coffee Shops"
3. **Ecosystem Content**: "Why AirPods Pro Are Perfect for Mac Users"

**Traffic Sources:**
• YouTube reviews and unboxing (high conversion)
• Tech blogs and comparison articles
• Reddit audiophile communities
• LinkedIn for professional use cases

**Conversion Tactics:**
• Emphasize current deals and bundles
• Create urgency with limited-time promotions
• Include real user testimonials
• Show before/after audio quality comparisons`);
    
    setIsScrapingProduct(false);
    
    // Log full data to console
    console.log('🎯 AI Product Analysis Complete:', {
      product: 'Apple AirPods Pro',
      icp,
      marketingAngles,
      affiliateStrategy
    });
  };

  const handleAddFeature = () => {
    if (featureInput.trim()) {
      setFeatures([...features, featureInput.trim()]);
      setFeatureInput('');
    }
  };

  const handleRemoveFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };
  
  const handleAddSpecification = () => {
    if (specName.trim() && specValue.trim()) {
      setSpecifications([...specifications, { name: specName.trim(), value: specValue.trim() }]);
      setSpecName('');
      setSpecValue('');
    }
  };
  
  const handleRemoveSpecification = (index: number) => {
    setSpecifications(specifications.filter((_, i) => i !== index));
  };
  
  const handleAddAffiliateLink = () => {
    if (affilPlatform.trim() && affilUrl.trim()) {
      setAffiliateLinks([...affiliateLinks, { platform: affilPlatform.trim(), url: affilUrl.trim() }]);
      setAffilPlatform('');
      setAffilUrl('');
    }
  };
  
  const handleRemoveAffiliateLink = (index: number) => {
    setAffiliateLinks(affiliateLinks.filter((_, i) => i !== index));
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
      price: parseFloat(formData.price) || 0,
      features,
      tags,
    };
    onSubmit?.(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/25">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <DialogTitle>{isEditMode ? 'Edit Product' : 'Create Product'}</DialogTitle>
              <DialogDescription>
                {isEditMode ? 'Update product details with AI assistance' : 'Add a new product to your content library'}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Quick Start: Scrape Product from URL */}
          <div className="p-5 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl border border-purple-200">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/25 flex-shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-slate-900 mb-1">Quick Start: Scrape Product from URL</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Paste any product page URL to automatically extract details, ICP, and marketing angles
                </p>
                
                <div className="flex gap-2">
                  <Input
                    value={scrapeUrl}
                    onChange={(e) => setScrapeUrl(e.target.value)}
                    placeholder="https://example.com/product-page"
                    className="flex-1 bg-white border-purple-200 focus:border-purple-400"
                    disabled={isScrapingProduct}
                  />
                  <Button 
                    type="button" 
                    onClick={handleScrapeProduct}
                    disabled={!scrapeUrl.trim() || isScrapingProduct}
                    className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white shadow-lg shadow-purple-500/30 px-6"
                  >
                    {isScrapingProduct ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Search className="w-4 h-4 mr-2" />
                        Scrape & Analyze
                      </>
                    )}
                  </Button>
                </div>

                <div className="flex items-start gap-2 mt-3 text-sm text-slate-500">
                  <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <p>
                    AI will extract: product details, specifications, ideal customer profile (demographics, pain points), marketing angles, emotional triggers, and affiliate strategy recommendations. Check browser console for full insights.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Product Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter product name"
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
                placeholder="Describe your product..."
                rows={4}
                className="mt-1.5"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="Product category"
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="brand">Brand</Label>
                <Input
                  id="brand"
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  placeholder="Brand name"
                  className="mt-1.5"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="sku">SKU</Label>
                <Input
                  id="sku"
                  value={formData.sku}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                  placeholder="Stock keeping unit"
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="price">Price</Label>
                <div className="flex gap-2 mt-1.5">
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="0.00"
                    className="flex-1"
                  />
                  <Input
                    value={formData.currency}
                    onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                    placeholder="USD"
                    className="w-24"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <Label>Product Features</Label>
            <div className="flex gap-2 mt-1.5">
              <Input
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddFeature())}
                placeholder="Add a feature..."
              />
              <Button type="button" onClick={handleAddFeature} size="sm" className="bg-purple-600 hover:bg-purple-700">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            {features.length > 0 && (
              <div className="space-y-1.5 mt-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2 p-2 bg-white rounded border border-purple-100">
                    <span className="text-sm text-slate-700 flex-1">{feature}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveFeature(index)}
                      className="text-slate-400 hover:text-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Specifications */}
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <Label>Product Specifications</Label>
            <div className="flex gap-2 mt-1.5">
              <Input
                value={specName}
                onChange={(e) => setSpecName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSpecification())}
                placeholder="Add specification name..."
              />
              <Input
                value={specValue}
                onChange={(e) => setSpecValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSpecification())}
                placeholder="Add specification value..."
              />
              <Button type="button" onClick={handleAddSpecification} size="sm" className="bg-purple-600 hover:bg-purple-700">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            {specifications.length > 0 && (
              <div className="space-y-1.5 mt-3">
                {specifications.map((spec, index) => (
                  <div key={index} className="flex items-start gap-2 p-2 bg-white rounded border border-purple-100">
                    <span className="text-sm text-slate-700 flex-1">{spec.name}: {spec.value}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSpecification(index)}
                      className="text-slate-400 hover:text-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Affiliate Links */}
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <Label>Affiliate Links</Label>
            <div className="flex gap-2 mt-1.5">
              <Input
                value={affilPlatform}
                onChange={(e) => setAffilPlatform(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddAffiliateLink())}
                placeholder="Add platform..."
              />
              <Input
                value={affilUrl}
                onChange={(e) => setAffilUrl(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddAffiliateLink())}
                placeholder="Add URL..."
              />
              <Button type="button" onClick={handleAddAffiliateLink} size="sm" className="bg-purple-600 hover:bg-purple-700">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            {affiliateLinks.length > 0 && (
              <div className="space-y-1.5 mt-3">
                {affiliateLinks.map((link, index) => (
                  <div key={index} className="flex items-start gap-2 p-2 bg-white rounded border border-purple-100">
                    <span className="text-sm text-slate-700 flex-1">{link.platform}: {link.url}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveAffiliateLink(index)}
                      className="text-slate-400 hover:text-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
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
              <Button type="button" onClick={handleAddTag} size="sm" className="bg-purple-600 hover:bg-purple-700">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag, index) => (
                  <Badge key={index} className="bg-purple-100 text-purple-700 border-purple-200 pl-2 pr-1 py-1 gap-1">
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(index)}
                      className="hover:bg-purple-200 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Marketing Intelligence */}
          <div className="p-5 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border-2 border-indigo-200 space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              <h3 className="text-slate-900">Marketing Intelligence</h3>
            </div>
            <p className="text-sm text-slate-600">AI-generated insights about your ideal customer and marketing strategy</p>
            
            {/* Ideal Customer Profile */}
            <div className="space-y-2">
              <Label htmlFor="icp">Ideal Customer Profile (ICP)</Label>
              {icp ? (
                <Textarea
                  id="icp"
                  value={icp}
                  onChange={(e) => setIcp(e.target.value)}
                  rows={8}
                  className="mt-1.5 bg-white font-mono text-sm"
                />
              ) : (
                <div className="p-4 bg-white rounded-lg border border-indigo-100 text-center">
                  <p className="text-sm text-slate-500">No ICP data yet. Use the scraper to auto-populate.</p>
                </div>
              )}
            </div>
            
            {/* Marketing Angles */}
            <div className="space-y-2">
              <Label>Marketing Angles</Label>
              {marketingAngles.length > 0 ? (
                <div className="space-y-2">
                  {marketingAngles.map((angle, index) => (
                    <div key={index} className="p-3 bg-white rounded-lg border border-indigo-100 text-sm text-slate-700">
                      {angle}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 bg-white rounded-lg border border-indigo-100 text-center">
                  <p className="text-sm text-slate-500">No marketing angles yet. Use the scraper to auto-populate.</p>
                </div>
              )}
            </div>
            
            {/* Affiliate Marketing Strategy */}
            <div className="space-y-2">
              <Label htmlFor="affiliateStrategy">Affiliate Marketing Strategy</Label>
              {affiliateStrategy ? (
                <Textarea
                  id="affiliateStrategy"
                  value={affiliateStrategy}
                  onChange={(e) => setAffiliateStrategy(e.target.value)}
                  rows={8}
                  className="mt-1.5 bg-white font-mono text-sm"
                />
              ) : (
                <div className="p-4 bg-white rounded-lg border border-indigo-100 text-center">
                  <p className="text-sm text-slate-500">No affiliate strategy yet. Use the scraper to auto-populate.</p>
                </div>
              )}
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white shadow-lg shadow-purple-500/30">
              <Sparkles className="w-4 h-4 mr-2" />
              {isEditMode ? 'Update Product' : 'Create Product'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}