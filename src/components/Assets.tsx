import { useState } from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  Grid3x3, 
  List, 
  Plus, 
  MoreVertical,
  Package,
  MessageSquare,
  Mic,
  BookOpen,
  Users,
  Sparkles,
  ExternalLink,
  Edit,
  Trash2,
  Copy,
  Star,
  TrendingUp,
  Calendar,
  DollarSign,
  Tag,
  Filter,
  X,
  Table as TableIcon,
  Wand2,
  ChevronDown,
  Check,
  Settings,
  LogOut,
  Bell,
  Building2,
  Zap,
  Eye,
  FileText
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { 
  CreateProductModal,
  CreateContentAngleModal,
  CreateBrandVoiceModal,
  CreateStoryElementModal,
  CreateCharacterModal,
  CreateIdentityModal
} from './modals';

interface BaseAsset {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  status: 'active' | 'draft' | 'archived';
  lastUpdated: string;
  color: string;
}

interface Product extends BaseAsset {
  price: number;
  currency: string;
  features: string[];
  integrations?: string[];
}

export function Assets() {
  const [activeTab, setActiveTab] = useState('products');
  const [viewMode, setViewMode] = useState<'list' | 'table'>('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

  // Modal states
  const [showProductModal, setShowProductModal] = useState(false);
  const [showAngleModal, setShowAngleModal] = useState(false);
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const [showStoryModal, setShowStoryModal] = useState(false);
  const [showCharacterModal, setShowCharacterModal] = useState(false);
  const [showIdentityModal, setShowIdentityModal] = useState(false);

  // View modal state
  const [viewingItem, setViewingItem] = useState<BaseAsset | Product | null>(null);

  // Edit modal state
  const [editingItem, setEditingItem] = useState<BaseAsset | Product | null>(null);

  // Mock data for each tab
  const products: Product[] = [
    {
      id: '1',
      name: 'Yoga Burn Trim Core 2.0',
      description: 'Yoga Burn Trim Core 2.0 offers digital access to a comprehensive fitness program specifically designed for women.',
      category: 'Fitness/Wellness Digital Products',
      tags: ['Instant digital access', 'Focused on core strengthening'],
      price: 49,
      currency: 'USD',
      features: [
        'Specifically designed for women',
        'Instant digital access',
        'Focused on core strengthening'
      ],
      status: 'active',
      lastUpdated: '13/1/2025',
      color: 'from-pink-500 to-rose-600'
    },
    {
      id: '2',
      name: 'n8n.io',
      description: 'n8n is a versatile, free, and source-available workflow automation software that empowers users to create complex workflows.',
      category: 'Workflow Automation Software',
      tags: ['Software', 'Hybrid drag-and-drop', 'Extensive app integration'],
      price: 67,
      currency: 'USD',
      features: [
        'Hybrid drag-and-drop and code-based workflow creation',
        'Extensive app integration capabilities',
        'Strong community and open-source backing'
      ],
      integrations: ['Zapier', 'Slack', 'Google Workspace'],
      status: 'active',
      lastUpdated: '23/10/2025',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: '3',
      name: 'ACA (Xtreme)',
      description: 'ACA (Xtreme) is a comprehensive online educational platform offering advanced AI and automation tools.',
      category: 'Online education',
      tags: ['Skool', 'Advanced AI', 'Real-life proven monetization'],
      price: 67,
      currency: 'USD',
      features: [
        'Advanced AI and automation tools',
        'Exclusive n8n automations and templates',
        'Real-life proven monetization strategies'
      ],
      status: 'active',
      lastUpdated: '23/10/2025',
      color: 'from-purple-500 to-violet-600'
    }
  ];

  const angles: BaseAsset[] = [
    {
      id: '1',
      name: 'Problem-Solution Framework',
      description: 'Present a relatable problem your audience faces, then position your product/service as the ideal solution.',
      category: 'Educational',
      tags: ['Problem-solving', 'Value proposition', 'Pain points'],
      status: 'active',
      lastUpdated: '10/1/2025',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      id: '2',
      name: 'Before-After Transformation',
      description: 'Showcase dramatic transformations to illustrate the tangible results your audience can achieve.',
      category: 'Emotional',
      tags: ['Results', 'Transformation', 'Success stories'],
      status: 'active',
      lastUpdated: '08/1/2025',
      color: 'from-indigo-500 to-blue-600'
    }
  ];

  const voices: BaseAsset[] = [
    {
      id: '1',
      name: 'Expert Authority',
      description: 'Professional, knowledgeable tone that establishes credibility and expertise in the field.',
      category: 'Professional',
      tags: ['Authoritative', 'Credible', 'Informative'],
      status: 'active',
      lastUpdated: '15/1/2025',
      color: 'from-pink-500 to-rose-600'
    },
    {
      id: '2',
      name: 'Friendly Guide',
      description: 'Warm, approachable voice that feels like advice from a trusted friend.',
      category: 'Casual',
      tags: ['Conversational', 'Supportive', 'Relatable'],
      status: 'active',
      lastUpdated: '12/1/2025',
      color: 'from-purple-500 to-pink-600'
    }
  ];

  const stories: BaseAsset[] = [
    {
      id: '1',
      name: 'Hero\'s Journey',
      description: 'Classic narrative structure where the protagonist overcomes challenges to achieve transformation.',
      category: 'Narrative Arc',
      tags: ['Journey', 'Transformation', 'Challenge'],
      status: 'active',
      lastUpdated: '20/1/2025',
      color: 'from-orange-500 to-red-600'
    }
  ];

  const characters: BaseAsset[] = [
    {
      id: '1',
      name: 'Sarah - The Overwhelmed Entrepreneur',
      description: 'A busy small business owner struggling to balance growth with daily operations.',
      category: 'Persona',
      tags: ['Entrepreneur', 'Time-strapped', 'Growth-focused'],
      status: 'active',
      lastUpdated: '18/1/2025',
      color: 'from-green-500 to-emerald-600'
    }
  ];

  const identities: BaseAsset[] = [
    {
      id: '1',
      name: 'Innovation Leader',
      description: 'Brand identity positioned as a cutting-edge innovator pushing industry boundaries.',
      category: 'Brand Archetype',
      tags: ['Innovative', 'Forward-thinking', 'Disruptive'],
      status: 'active',
      lastUpdated: '25/1/2025',
      color: 'from-indigo-500 to-purple-600'
    }
  ];

  // Get current data based on active tab
  const getCurrentData = () => {
    switch(activeTab) {
      case 'products': return products;
      case 'angles': return angles;
      case 'voice': return voices;
      case 'story': return stories;
      case 'characters': return characters;
      case 'identities': return identities;
      default: return [];
    }
  };

  const currentData = getCurrentData();
  const allCategories = Array.from(new Set(currentData.map(item => item.category)));

  // Filter data
  const filteredData = currentData.filter(item => {
    const matchesSearch = searchQuery === '' || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategories.length === 0 || 
      selectedCategories.includes(item.category);
    
    const matchesStatus = selectedStatuses.length === 0 || 
      selectedStatuses.includes(item.status);
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const toggleStatus = (status: string) => {
    setSelectedStatuses(prev => 
      prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedStatuses([]);
  };

  // Reset filters when changing tabs
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSearchQuery('');
    setSelectedCategories([]);
    setSelectedStatuses([]);
    setShowFilters(false);
  };

  // Get color scheme based on active tab
  const getTabColors = () => {
    switch(activeTab) {
      case 'products':
        return {
          gradient: 'from-purple-600 to-purple-500',
          hoverGradient: 'from-purple-700 to-purple-600',
          bg: 'bg-purple-600',
          hoverBg: 'hover:bg-purple-700',
          filterBg: 'bg-purple-50',
          filterBorder: 'border-purple-200',
          filterText: 'text-purple-600',
          badgeBg: 'bg-purple-600',
          chipBg: 'bg-purple-100',
          chipText: 'text-purple-700',
          chipBorder: 'border-purple-200',
          chipHover: 'hover:bg-purple-200',
          shadow: 'shadow-purple-500/30',
          label: 'Product'
        };
      case 'angles':
        return {
          gradient: 'from-blue-600 to-blue-500',
          hoverGradient: 'from-blue-700 to-blue-600',
          bg: 'bg-blue-600',
          hoverBg: 'hover:bg-blue-700',
          filterBg: 'bg-blue-50',
          filterBorder: 'border-blue-200',
          filterText: 'text-blue-600',
          badgeBg: 'bg-blue-600',
          chipBg: 'bg-blue-100',
          chipText: 'text-blue-700',
          chipBorder: 'border-blue-200',
          chipHover: 'hover:bg-blue-200',
          shadow: 'shadow-blue-500/30',
          label: 'Content Angle'
        };
      case 'voice':
        return {
          gradient: 'from-pink-600 to-pink-500',
          hoverGradient: 'from-pink-700 to-pink-600',
          bg: 'bg-pink-600',
          hoverBg: 'hover:bg-pink-700',
          filterBg: 'bg-pink-50',
          filterBorder: 'border-pink-200',
          filterText: 'text-pink-600',
          badgeBg: 'bg-pink-600',
          chipBg: 'bg-pink-100',
          chipText: 'text-pink-700',
          chipBorder: 'border-pink-200',
          chipHover: 'hover:bg-pink-200',
          shadow: 'shadow-pink-500/30',
          label: 'Brand Voice'
        };
      case 'story':
        return {
          gradient: 'from-orange-600 to-orange-500',
          hoverGradient: 'from-orange-700 to-orange-600',
          bg: 'bg-orange-600',
          hoverBg: 'hover:bg-orange-700',
          filterBg: 'bg-orange-50',
          filterBorder: 'border-orange-200',
          filterText: 'text-orange-600',
          badgeBg: 'bg-orange-600',
          chipBg: 'bg-orange-100',
          chipText: 'text-orange-700',
          chipBorder: 'border-orange-200',
          chipHover: 'hover:bg-orange-200',
          shadow: 'shadow-orange-500/30',
          label: 'Story Element'
        };
      case 'characters':
        return {
          gradient: 'from-green-600 to-green-500',
          hoverGradient: 'from-green-700 to-green-600',
          bg: 'bg-green-600',
          hoverBg: 'hover:bg-green-700',
          filterBg: 'bg-green-50',
          filterBorder: 'border-green-200',
          filterText: 'text-green-600',
          badgeBg: 'bg-green-600',
          chipBg: 'bg-green-100',
          chipText: 'text-green-700',
          chipBorder: 'border-green-200',
          chipHover: 'hover:bg-green-200',
          shadow: 'shadow-green-500/30',
          label: 'Character'
        };
      case 'identities':
        return {
          gradient: 'from-indigo-600 to-indigo-500',
          hoverGradient: 'from-indigo-700 to-indigo-600',
          bg: 'bg-indigo-600',
          hoverBg: 'hover:bg-indigo-700',
          filterBg: 'bg-indigo-50',
          filterBorder: 'border-indigo-200',
          filterText: 'text-indigo-600',
          badgeBg: 'bg-indigo-600',
          chipBg: 'bg-indigo-100',
          chipText: 'text-indigo-700',
          chipBorder: 'border-indigo-200',
          chipHover: 'hover:bg-indigo-200',
          shadow: 'shadow-indigo-500/30',
          label: 'Identity'
        };
      default:
        return {
          gradient: 'from-purple-600 to-purple-500',
          hoverGradient: 'from-purple-700 to-purple-600',
          bg: 'bg-purple-600',
          hoverBg: 'hover:bg-purple-700',
          filterBg: 'bg-purple-50',
          filterBorder: 'border-purple-200',
          filterText: 'text-purple-600',
          badgeBg: 'bg-purple-600',
          chipBg: 'bg-purple-100',
          chipText: 'text-purple-700',
          chipBorder: 'border-purple-200',
          chipHover: 'hover:bg-purple-200',
          shadow: 'shadow-purple-500/30',
          label: 'Item'
        };
    }
  };

  const colors = getTabColors();

  // Get icon based on tab
  const getTabIcon = () => {
    switch(activeTab) {
      case 'products': return Package;
      case 'angles': return MessageSquare;
      case 'voice': return Mic;
      case 'story': return BookOpen;
      case 'characters': return Users;
      case 'identities': return Sparkles;
      default: return Package;
    }
  };

  const TabIcon = getTabIcon();

  // Render content component
  const renderContent = () => {
    if (filteredData.length === 0 && currentData.length === 0) {
      return (
        <Card className="border-slate-200/60 shadow-xl shadow-slate-900/5">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${colors.filterBg} ${colors.filterBorder} border-2 flex items-center justify-center mb-4`}>
              <TabIcon className={`w-8 h-8 ${colors.filterText}`} />
            </div>
            <h3 className="text-lg text-slate-900 mb-2">No {colors.label.toLowerCase()}s yet</h3>
            <p className="text-sm text-slate-500 text-center max-w-md mb-6">
              Create your first {colors.label.toLowerCase()} to get started.
            </p>
            <Button className={`bg-gradient-to-r ${colors.gradient} hover:${colors.hoverGradient} text-white shadow-lg ${colors.shadow} rounded-xl`}>
              <Plus className="w-4 h-4 mr-2" />
              Add {colors.label}
            </Button>
          </CardContent>
        </Card>
      );
    }

    if (filteredData.length === 0) {
      return (
        <Card className="border-slate-200/60 shadow-xl shadow-slate-900/5">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
              <TabIcon className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg text-slate-900 mb-2">No {colors.label.toLowerCase()}s found</h3>
            <p className="text-sm text-slate-500 text-center max-w-md">
              Try adjusting your search or filter criteria to find what you're looking for.
            </p>
            {(selectedStatuses.length > 0 || selectedCategories.length > 0) && (
              <Button
                onClick={clearFilters}
                variant="outline"
                className="mt-4 rounded-xl"
              >
                Clear all filters
              </Button>
            )}
          </CardContent>
        </Card>
      );
    }

    return viewMode === 'list' ? renderListView() : renderTableView();
  };

  const renderListView = () => (
    <div className="space-y-4">
      {filteredData.map((item) => (
        <Card 
          key={item.id} 
          onClick={() => setViewingItem(item)}
          className={`group border-slate-200/60 hover:${colors.filterBorder} shadow-lg hover:shadow-xl transition-all cursor-pointer`}
        >
          <CardContent className="p-6">
            <div className="flex gap-6">
              {/* Left: Color Indicator & Icon */}
              <div className={`w-20 h-20 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0`}>
                <TabIcon className="w-8 h-8 text-white" />
              </div>

              {/* Middle: Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-slate-900 mb-1">{item.name}</h3>
                    <p className="text-sm text-slate-600 line-clamp-2">{item.description}</p>
                  </div>
                  <Badge className="ml-4 bg-white text-slate-700 border border-slate-200 capitalize">
                    {item.status}
                  </Badge>
                </div>

                <div className="flex items-center gap-4 mt-3">
                  <Badge variant="secondary" className={`${colors.chipBg} ${colors.chipText} ${colors.chipBorder}`}>
                    {item.category}
                  </Badge>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Calendar className="w-4 h-4" />
                    <span>{item.lastUpdated}</span>
                  </div>
                  {'price' in item && (
                    <div className="flex items-center gap-2 text-sm text-slate-900">
                      <DollarSign className="w-4 h-4 text-slate-400" />
                      <span>{item.currency} {item.price}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 mt-3">
                  {item.tags.slice(0, 3).map((tag, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs border-slate-200 text-slate-600">
                      {tag}
                    </Badge>
                  ))}
                  {item.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs border-slate-200 text-slate-400">
                      +{item.tags.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>

              {/* Right: Actions */}
              <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={() => handleEditClick(item)}>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Copy className="w-4 h-4 mr-2" />
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderTableView = () => (
    <Card className="border-slate-200/60 shadow-xl shadow-slate-900/5 overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gradient-to-br from-slate-50 to-white border-b border-slate-200">
              <TableHead className="w-[50px]"></TableHead>
              <TableHead className="min-w-[250px] text-slate-900">Name</TableHead>
              <TableHead className="min-w-[180px] text-slate-900">Category</TableHead>
              <TableHead className="w-[100px] text-slate-900">Status</TableHead>
              {activeTab === 'products' && <TableHead className="w-[100px] text-slate-900">Price</TableHead>}
              <TableHead className="w-[140px] text-slate-900">Last Updated</TableHead>
              <TableHead className="w-[80px] text-right text-slate-900">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((item) => (
              <TableRow 
                key={item.id} 
                onClick={() => setViewingItem(item)}
                className={`border-b border-slate-100 hover:${colors.filterBg}/30 transition-colors group cursor-pointer`}
              >
                <TableCell>
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0`}>
                    <TabIcon className="w-5 h-5 text-white" />
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="text-slate-900 mb-1">{item.name}</div>
                    <div className="text-sm text-slate-500 line-clamp-1">{item.description}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className={`${colors.chipBg} ${colors.chipText} ${colors.chipBorder} text-xs whitespace-nowrap`}>
                    {item.category}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge 
                    className={
                      item.status === 'active' 
                        ? 'bg-green-50 text-green-600 border-green-200 text-xs capitalize' 
                        : item.status === 'draft'
                        ? 'bg-orange-50 text-orange-600 border-orange-200 text-xs capitalize'
                        : 'bg-slate-50 text-slate-600 border-slate-200 text-xs capitalize'
                    }
                  >
                    {item.status}
                  </Badge>
                </TableCell>
                {activeTab === 'products' && (
                  <TableCell>
                    {'price' in item && (
                      <div className="flex items-center gap-1 text-slate-900 whitespace-nowrap">
                        <span className="text-slate-400">$</span>
                        <span>{item.price}</span>
                      </div>
                    )}
                  </TableCell>
                )}
                <TableCell>
                  <div className="flex items-center gap-2 text-sm text-slate-500 whitespace-nowrap">
                    <Calendar className="w-4 h-4 flex-shrink-0" />
                    <span>{item.lastUpdated}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem onClick={() => handleEditClick(item)}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => {/* TODO: Duplicate logic */}}>
                        <Copy className="w-4 h-4 mr-2" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setViewingItem(item)}>
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600" onClick={() => {/* TODO: Delete logic */}}>
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );

  const handleAddClick = () => {
    if (activeTab === 'products') setShowProductModal(true);
    else if (activeTab === 'angles') setShowAngleModal(true);
    else if (activeTab === 'voice') setShowVoiceModal(true);
    else if (activeTab === 'story') setShowStoryModal(true);
    else if (activeTab === 'characters') setShowCharacterModal(true);
    else if (activeTab === 'identities') setShowIdentityModal(true);
  };

  const handleEditClick = (item: BaseAsset | Product) => {
    setEditingItem(item);
    if (activeTab === 'products') setShowProductModal(true);
    else if (activeTab === 'angles') setShowAngleModal(true);
    else if (activeTab === 'voice') setShowVoiceModal(true);
    else if (activeTab === 'story') setShowStoryModal(true);
    else if (activeTab === 'characters') setShowCharacterModal(true);
    else if (activeTab === 'identities') setShowIdentityModal(true);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-[1600px] mx-auto px-8 h-16 flex items-center justify-end gap-3">
          {/* Notifications */}
          <Button variant="ghost" size="sm" className="h-9 w-9 p-0 rounded-lg relative">
            <Bell className="w-4 h-4 text-slate-600" />
            <div className="w-2 h-2 bg-purple-500 rounded-full absolute top-1.5 right-1.5 ring-2 ring-white"></div>
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-9 px-2 gap-2 rounded-lg hover:bg-slate-50">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-600 to-purple-500 text-white flex items-center justify-center text-xs flex-shrink-0">
                  CS
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[240px]">
              <div className="px-3 py-2 border-b border-slate-100">
                <div className="text-sm text-slate-900">Cedric Segueia</div>
                <div className="text-xs text-slate-500">cedric@growth-consulting.io</div>
              </div>
              <DropdownMenuItem className="gap-2 py-2">
                <Settings className="w-4 h-4" />
                <span className="text-sm">Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2 py-2">
                <Building2 className="w-4 h-4" />
                <span className="text-sm">Workspace settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2 py-2 text-red-600">
                <LogOut className="w-4 h-4" />
                <span className="text-sm">Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto px-8 py-8">
        {/* Page Title & Description */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center text-white shadow-lg ${colors.shadow}`}>
                <TabIcon className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-slate-900">Assets</h1>
                <p className="text-slate-600">Manage your products, brand voices, characters, and story elements</p>
              </div>
            </div>
            <Button 
              className={`h-12 bg-gradient-to-r ${colors.gradient} hover:${colors.hoverGradient} text-white shadow-lg ${colors.shadow} rounded-xl`}
              onClick={handleAddClick}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add {colors.label}
            </Button>
          </div>
        </div>

        {/* Tabs Navigation */}
        <Tabs defaultValue="products" className="space-y-6" onValueChange={handleTabChange}>
          <div className="bg-white rounded-xl border border-slate-200/60 shadow-sm">
            <TabsList className="w-full justify-start gap-1 bg-transparent p-2 h-auto overflow-x-auto">
              <TabsTrigger 
                value="products" 
                className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-purple-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg transition-all px-4 py-2.5 whitespace-nowrap"
              >
                <Package className="w-4 h-4 mr-2" />
                Products
              </TabsTrigger>
              <TabsTrigger 
                value="angles"
                className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg transition-all px-4 py-2.5 whitespace-nowrap"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Content Angles
              </TabsTrigger>
              <TabsTrigger 
                value="voice"
                className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-pink-500 data-[state=active]:to-pink-600 data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg transition-all px-4 py-2.5 whitespace-nowrap"
              >
                <Mic className="w-4 h-4 mr-2" />
                Brand Voice
              </TabsTrigger>
              <TabsTrigger 
                value="story"
                className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-orange-500 data-[state=active]:to-orange-600 data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg transition-all px-4 py-2.5 whitespace-nowrap"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Story Elements
              </TabsTrigger>
              <TabsTrigger 
                value="characters"
                className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-green-500 data-[state=active]:to-green-600 data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg transition-all px-4 py-2.5 whitespace-nowrap"
              >
                <Users className="w-4 h-4 mr-2" />
                Characters
              </TabsTrigger>
              <TabsTrigger 
                value="identities"
                className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-indigo-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg transition-all px-4 py-2.5 whitespace-nowrap"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Identities
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Shared Tab Content */}
          {['products', 'angles', 'voice', 'story', 'characters', 'identities'].map((tab) => (
            <TabsContent key={tab} value={tab} className="space-y-6">
              {/* Search & Controls */}
              <div className="flex gap-4">
                {/* Search Bar */}
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    placeholder={`Search ${colors.label.toLowerCase()}s...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-12 bg-white border-slate-200 rounded-xl shadow-sm"
                  />
                </div>

                {/* View Toggle */}
                <div className="flex gap-1 bg-white rounded-xl border border-slate-200 shadow-sm p-1">
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    onClick={() => setViewMode('list')}
                    className={`h-10 w-10 p-0 ${viewMode === 'list' ? `${colors.bg} ${colors.hoverBg}` : ''}`}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'table' ? 'default' : 'ghost'}
                    onClick={() => setViewMode('table')}
                    className={`h-10 w-10 p-0 ${viewMode === 'table' ? `${colors.bg} ${colors.hoverBg}` : ''}`}
                  >
                    <TableIcon className="w-4 h-4" />
                  </Button>
                </div>

                {/* Filters Toggle */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className={`h-12 rounded-xl ${showFilters ? `${colors.filterBg} ${colors.filterBorder} ${colors.filterText}` : ''}`}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                  {(selectedStatuses.length > 0 || selectedCategories.length > 0) && (
                    <Badge className={`ml-2 ${colors.badgeBg} text-white hover:${colors.badgeBg} text-xs px-1.5 py-0 h-5 min-w-[20px]`}>
                      {selectedStatuses.length + selectedCategories.length}
                    </Badge>
                  )}
                </Button>
              </div>

              {/* Active Filters Chips */}
              {(selectedStatuses.length > 0 || selectedCategories.length > 0) && (
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm text-slate-600">Active filters:</span>
                  {selectedStatuses.map(status => (
                    <Badge 
                      key={status}
                      className={`${colors.chipBg} ${colors.chipText} ${colors.chipBorder} pl-2 pr-1 py-1 gap-1 ${colors.chipHover} transition-colors cursor-pointer`}
                      onClick={() => toggleStatus(status)}
                    >
                      <span className="capitalize">{status}</span>
                      <X className="w-3 h-3" />
                    </Badge>
                  ))}
                  {selectedCategories.map(category => (
                    <Badge 
                      key={category}
                      className={`${colors.chipBg} ${colors.chipText} ${colors.chipBorder} pl-2 pr-1 py-1 gap-1 ${colors.chipHover} transition-colors cursor-pointer`}
                      onClick={() => toggleCategory(category)}
                    >
                      <span>{category}</span>
                      <X className="w-3 h-3" />
                    </Badge>
                  ))}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className={`h-6 px-2 text-xs ${colors.filterText} hover:${colors.filterText} hover:${colors.filterBg}`}
                  >
                    Clear all
                  </Button>
                </div>
              )}

              {/* Filter Panel */}
              {showFilters && (
                <Card className={`${colors.filterBorder} ${colors.filterBg}/50 shadow-lg`}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Filter className={`w-4 h-4 ${colors.filterText}`} />
                        <h3 className="text-slate-900">Filters</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        {(selectedStatuses.length > 0 || selectedCategories.length > 0) && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={clearFilters}
                            className={`${colors.filterText} hover:${colors.filterText} ${colors.chipHover}`}
                          >
                            Clear All
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowFilters(false)}
                          className="h-8 w-8 p-0 text-slate-400 hover:text-slate-600 hover:bg-white/50"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      {/* Status Filter */}
                      <div>
                        <label className="text-sm text-slate-700 mb-3 block">Status</label>
                        <div className="space-y-2">
                          {['active', 'draft', 'archived'].map(status => (
                            <label key={status} className="flex items-center gap-2 cursor-pointer group">
                              <input
                                type="checkbox"
                                checked={selectedStatuses.includes(status)}
                                onChange={() => toggleStatus(status)}
                                className={`w-4 h-4 rounded border-slate-300 ${colors.filterText} focus:ring-${colors.filterText} cursor-pointer`}
                              />
                              <span className="text-sm text-slate-600 group-hover:text-slate-900 capitalize">
                                {status}
                              </span>
                              <Badge 
                                className={
                                  status === 'active'
                                    ? 'bg-green-50 text-green-600 border-green-200 text-xs ml-auto'
                                    : status === 'draft'
                                    ? 'bg-orange-50 text-orange-600 border-orange-200 text-xs ml-auto'
                                    : 'bg-slate-50 text-slate-600 border-slate-200 text-xs ml-auto'
                                }
                              >
                                {currentData.filter(p => p.status === status).length}
                              </Badge>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Category Filter */}
                      <div>
                        <label className="text-sm text-slate-700 mb-3 block">Category</label>
                        <div className="space-y-2">
                          {allCategories.map(category => (
                            <label key={category} className="flex items-center gap-2 cursor-pointer group">
                              <input
                                type="checkbox"
                                checked={selectedCategories.includes(category)}
                                onChange={() => toggleCategory(category)}
                                className={`w-4 h-4 rounded border-slate-300 ${colors.filterText} focus:ring-${colors.filterText} cursor-pointer`}
                              />
                              <span className="text-sm text-slate-600 group-hover:text-slate-900">
                                {category}
                              </span>
                              <Badge variant="outline" className="text-xs border-slate-200 text-slate-600 ml-auto">
                                {currentData.filter(p => p.category === category).length}
                              </Badge>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Content */}
              {renderContent()}

              {/* Results Summary */}
              {filteredData.length > 0 && (
                <div className="mt-6 text-center text-sm text-slate-500">
                  Showing {filteredData.length} of {currentData.length} {colors.label.toLowerCase()}s
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Modals */}
      <CreateProductModal
        open={showProductModal}
        onOpenChange={(open) => {
          setShowProductModal(open);
          if (!open) setEditingItem(null);
        }}
        editingItem={activeTab === 'products' ? editingItem as Product : null}
      />
      <CreateContentAngleModal
        open={showAngleModal}
        onOpenChange={setShowAngleModal}
        products={[
          { id: '1', name: 'Apple AirPods Pro (2nd Gen)' },
          { id: '2', name: 'Sony WH-1000XM5' },
          { id: '3', name: 'Bose QuietComfort Earbuds II' },
        ]}
      />
      <CreateBrandVoiceModal
        open={showVoiceModal}
        onOpenChange={setShowVoiceModal}
      />

      {/* View Asset Modal */}
      <Dialog open={!!viewingItem} onOpenChange={(open) => !open && setViewingItem(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {viewingItem && (
            <>
              <DialogHeader>
                <div className="flex items-start gap-4">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${viewingItem.color} flex items-center justify-center flex-shrink-0`}>
                    <TabIcon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <DialogTitle className="text-2xl text-slate-900 mb-2">{viewingItem.name}</DialogTitle>
                    <DialogDescription className="sr-only">
                      View details and manage {viewingItem.name}
                    </DialogDescription>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge 
                        className={
                          viewingItem.status === 'active' 
                            ? 'bg-green-50 text-green-600 border-green-200 capitalize' 
                            : viewingItem.status === 'draft'
                            ? 'bg-orange-50 text-orange-600 border-orange-200 capitalize'
                            : 'bg-slate-50 text-slate-600 border-slate-200 capitalize'
                        }
                      >
                        {viewingItem.status}
                      </Badge>
                      <Badge variant="secondary" className={`${colors.chipBg} ${colors.chipText} ${colors.chipBorder}`}>
                        {viewingItem.category}
                      </Badge>
                    </div>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6 pt-6">
                {/* Description */}
                <div>
                  <h3 className="text-sm text-slate-700 mb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Description
                  </h3>
                  <p className="text-slate-600 leading-relaxed">{viewingItem.description}</p>
                </div>

                {/* Product-specific fields */}
                {'price' in viewingItem && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm text-slate-700 mb-2 flex items-center gap-2">
                          <DollarSign className="w-4 h-4" />
                          Price
                        </h3>
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl text-slate-900">${viewingItem.price}</span>
                          <span className="text-slate-500">{viewingItem.currency}</span>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm text-slate-700 mb-2 flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Last Updated
                        </h3>
                        <p className="text-slate-600">{viewingItem.lastUpdated}</p>
                      </div>
                    </div>

                    {viewingItem.features && viewingItem.features.length > 0 && (
                      <div>
                        <h3 className="text-sm text-slate-700 mb-3 flex items-center gap-2">
                          <Star className="w-4 h-4" />
                          Features
                        </h3>
                        <div className="space-y-2">
                          {viewingItem.features.map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                              <span className="text-slate-600">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {viewingItem.integrations && viewingItem.integrations.length > 0 && (
                      <div>
                        <h3 className="text-sm text-slate-700 mb-3 flex items-center gap-2">
                          <Zap className="w-4 h-4" />
                          Integrations
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {viewingItem.integrations.map((integration, idx) => (
                            <Badge key={idx} variant="outline" className="border-slate-300 text-slate-700">
                              {integration}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}

                {/* Non-product items show last updated */}
                {!('price' in viewingItem) && (
                  <div>
                    <h3 className="text-sm text-slate-700 mb-2 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Last Updated
                    </h3>
                    <p className="text-slate-600">{viewingItem.lastUpdated}</p>
                  </div>
                )}

                {/* Tags */}
                {viewingItem.tags && viewingItem.tags.length > 0 && (
                  <div>
                    <h3 className="text-sm text-slate-700 mb-3 flex items-center gap-2">
                      <Tag className="w-4 h-4" />
                      Tags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {viewingItem.tags.map((tag, idx) => (
                        <Badge key={idx} variant="outline" className="border-slate-300 text-slate-700">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
                  <Button 
                    className={`flex-1 bg-gradient-to-r ${colors.gradient} hover:${colors.hoverGradient} text-white`}
                    onClick={() => {
                      handleEditClick(viewingItem);
                      setViewingItem(null);
                    }}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit {colors.label}
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Copy className="w-4 h-4 mr-2" />
                    Duplicate
                  </Button>
                  <Button variant="outline" size="icon" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}