import { 
  Lightbulb, 
  Users, 
  Search as SearchIcon, 
  FileText,
  Plus,
  Filter,
  Table as TableIcon,
  Grid3x3,
  MoreVertical,
  Play,
  FileEdit,
  BookOpen,
  Trash2,
  Copy,
  ExternalLink,
  ChevronRight,
  Sparkles,
  X,
  List,
  Wand2,
  Calendar,
  Globe,
  TrendingUp
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useState } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { CreateIdeaModal } from './modals';

interface BaseAsset {
  id: string;
  name: string;
  description?: string;
  category: string;
  status: 'verified' | 'unknown' | 'draft' | 'active' | 'archived';
  lastUpdated?: string;
  color: string;
}

interface Idea extends BaseAsset {
  title: string;
  source: string;
  keyPoints: string[];
}

interface Creator extends BaseAsset {
  platform: string;
  followers: string;
  engagement: string;
  niche: string;
}

interface SearchTerm extends BaseAsset {
  term: string;
  volume: string;
  difficulty: string;
  trend: 'up' | 'down' | 'stable';
}

interface ScrapedContent extends BaseAsset {
  url: string;
  wordCount: number;
  scrapedDate: string;
}

export function Ideas() {
  const [activeTab, setActiveTab] = useState('ideas-bank');
  const [viewMode, setViewMode] = useState<'list' | 'table'>('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  
  // Modal states
  const [showIdeaModal, setShowIdeaModal] = useState(false);

  // Mock data for all tabs
  const ideas: Idea[] = [
    {
      id: '1',
      name: 'Multi-Step AI Agents: Why Most Companies Are Getting It Wrong',
      title: 'Multi-Step AI Agents: Why Most Companies Are Getting It Wrong',
      source: 'n8n.io',
      status: 'verified',
      category: 'Automation',
      keyPoints: [
        'Model-first AI development leads to limited flexibility',
        'Workflow-first approach delivers better scalability',
        'Multi-step orchestration capabilities are crucial'
      ],
      lastUpdated: '15/1/2025',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: '2',
      name: 'Open Source vs. Proprietary Automation: The Truth About Vendor Lock-in',
      title: 'Open Source vs. Proprietary Automation: The Truth About Vendor Lock-in',
      source: 'n8n.io',
      status: 'verified',
      category: 'Business Strategy',
      keyPoints: [
        'Source-available platforms offer freedom',
        'Vendor lock-in represents long-term risks',
        'Customization through code enables innovation'
      ],
      lastUpdated: '14/1/2025',
      color: 'from-purple-500 to-violet-600'
    },
    {
      id: '3',
      name: 'Why Your Automation Breaks Every Monday - And How to Fix It',
      title: 'Why Your Automation Breaks Every Monday - And How to Fix It',
      source: 'n8n.io',
      status: 'verified',
      category: 'Technical',
      keyPoints: [
        'Workflow fragility stems from architectural issues',
        'Built-in error handling and retry mechanisms help',
        'Custom code capabilities enable robust solutions'
      ],
      lastUpdated: '12/1/2025',
      color: 'from-pink-500 to-rose-600'
    },
    {
      id: '4',
      name: 'The Hidden Cost of No-Code: When Simplicity Becomes a Limitation',
      title: 'The Hidden Cost of No-Code: When Simplicity Becomes a Limitation',
      source: 'Unknown',
      status: 'unknown',
      category: 'Product Comparison',
      keyPoints: [
        'Pure no-code solutions hit scalability walls',
        'Hybrid approaches offer best of both worlds',
        'Long-term flexibility requires code access'
      ],
      lastUpdated: '10/1/2025',
      color: 'from-orange-500 to-red-600'
    },
    {
      id: '5',
      name: 'AI Content Generation: Beyond ChatGPT',
      title: 'AI Content Generation: Beyond ChatGPT',
      source: 'Unknown',
      status: 'draft',
      category: 'AI & ML',
      keyPoints: [
        'Multi-model approach yields better results',
        'Context management is crucial for quality',
        'Fine-tuning beats prompt engineering'
      ],
      lastUpdated: '08/1/2025',
      color: 'from-emerald-500 to-teal-600'
    }
  ];

  const creators: Creator[] = [
    {
      id: '1',
      name: 'Alex Hormozi',
      description: 'Business growth and entrepreneurship expert',
      platform: 'YouTube',
      followers: '2.1M',
      engagement: '8.5%',
      niche: 'Business',
      category: 'Business Growth',
      status: 'active',
      lastUpdated: '20/1/2025',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      id: '2',
      name: 'Ali Abdaal',
      description: 'Productivity and personal development content creator',
      platform: 'YouTube',
      followers: '5.2M',
      engagement: '6.2%',
      niche: 'Productivity',
      category: 'Productivity',
      status: 'active',
      lastUpdated: '19/1/2025',
      color: 'from-purple-500 to-indigo-600'
    },
    {
      id: '3',
      name: 'Gary Vaynerchuk',
      description: 'Marketing and social media strategist',
      platform: 'Instagram',
      followers: '10.8M',
      engagement: '4.1%',
      niche: 'Marketing',
      category: 'Digital Marketing',
      status: 'active',
      lastUpdated: '18/1/2025',
      color: 'from-pink-500 to-rose-600'
    }
  ];

  const searchTerms: SearchTerm[] = [
    {
      id: '1',
      name: 'AI automation tools',
      term: 'AI automation tools',
      volume: '22.5K',
      difficulty: 'Medium',
      trend: 'up',
      category: 'Automation',
      status: 'active',
      lastUpdated: '15/1/2025',
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: '2',
      name: 'workflow automation software',
      term: 'workflow automation software',
      volume: '18.3K',
      difficulty: 'High',
      trend: 'up',
      category: 'Software',
      status: 'active',
      lastUpdated: '14/1/2025',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: '3',
      name: 'no-code platforms',
      term: 'no-code platforms',
      volume: '15.7K',
      difficulty: 'Medium',
      trend: 'stable',
      category: 'Development',
      status: 'active',
      lastUpdated: '13/1/2025',
      color: 'from-purple-500 to-violet-600'
    }
  ];

  const scrapedContent: ScrapedContent[] = [
    {
      id: '1',
      name: 'The Future of AI Automation in 2025',
      url: 'https://example.com/ai-automation-2025',
      description: 'Comprehensive analysis of emerging AI automation trends and their impact on business operations.',
      wordCount: 2450,
      scrapedDate: '22/1/2025',
      category: 'Research',
      status: 'verified',
      lastUpdated: '22/1/2025',
      color: 'from-orange-500 to-red-600'
    },
    {
      id: '2',
      name: 'Best Practices for Workflow Optimization',
      url: 'https://example.com/workflow-optimization',
      description: 'Guide to implementing efficient workflows using modern automation tools.',
      wordCount: 1890,
      scrapedDate: '21/1/2025',
      category: 'Guide',
      status: 'verified',
      lastUpdated: '21/1/2025',
      color: 'from-cyan-500 to-blue-600'
    }
  ];

  // Get current data based on active tab
  const getCurrentData = () => {
    switch(activeTab) {
      case 'ideas-bank': return ideas;
      case 'creators': return creators;
      case 'search-terms': return searchTerms;
      case 'scraped-content': return scrapedContent;
      default: return [];
    }
  };

  const currentData = getCurrentData();
  const allCategories = Array.from(new Set(currentData.map(item => item.category)));

  // Filter data
  const filteredData = currentData.filter(item => {
    const matchesSearch = searchQuery === '' || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
    
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
      case 'ideas-bank':
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
          label: 'Idea'
        };
      case 'creators':
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
          label: 'Creator'
        };
      case 'search-terms':
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
          label: 'Search Term'
        };
      case 'scraped-content':
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
          label: 'Content'
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
      case 'ideas-bank': return Lightbulb;
      case 'creators': return Users;
      case 'search-terms': return SearchIcon;
      case 'scraped-content': return FileText;
      default: return Lightbulb;
    }
  };

  const TabIcon = getTabIcon();

  // Get available statuses based on tab
  const getAvailableStatuses = () => {
    switch(activeTab) {
      case 'ideas-bank':
        return ['verified', 'unknown', 'draft'];
      case 'creators':
      case 'search-terms':
      case 'scraped-content':
        return ['active', 'archived', 'draft'];
      default:
        return ['active', 'draft'];
    }
  };

  const availableStatuses = getAvailableStatuses();

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

  const renderListView = () => {
    if (activeTab === 'ideas-bank') {
      return (
        <div className="space-y-4">
          {filteredData.map((item) => {
            const idea = item as Idea;
            return (
              <Card key={idea.id} className={`group border-slate-200/60 hover:${colors.filterBorder} shadow-lg hover:shadow-xl transition-all`}>
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    {/* Left: Icon */}
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${idea.color} flex items-center justify-center flex-shrink-0`}>
                      <Lightbulb className="w-7 h-7 text-white" />
                    </div>

                    {/* Middle: Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-slate-900 mb-2">{idea.title}</h3>
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge 
                              className={
                                idea.status === 'verified'
                                  ? 'bg-green-50 text-green-600 border-green-200 text-xs'
                                  : idea.status === 'draft'
                                  ? 'bg-orange-50 text-orange-600 border-orange-200 text-xs'
                                  : 'bg-slate-50 text-slate-600 border-slate-200 text-xs'
                              }
                            >
                              {idea.source}
                            </Badge>
                            <Badge variant="outline" className="text-xs border-slate-200 text-slate-600">
                              {idea.category}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      {/* Key Points */}
                      <div className="mb-4">
                        <div className="text-xs text-slate-500 mb-2">Key Points:</div>
                        <ul className="space-y-1.5">
                          {idea.keyPoints.map((point, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                              <ChevronRight className={`w-4 h-4 mt-0.5 ${colors.filterText} flex-shrink-0`} />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <Button size="sm" className={`bg-gradient-to-r ${colors.gradient} hover:${colors.hoverGradient} text-white rounded-lg shadow-md ${colors.shadow}`}>
                          <Play className="w-3.5 h-3.5 mr-1.5" />
                          Cinema Video
                        </Button>
                        <Button size="sm" variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50 rounded-lg">
                          <FileEdit className="w-3.5 h-3.5 mr-1.5" />
                          Script
                        </Button>
                        <Button size="sm" variant="outline" className="border-green-200 text-green-600 hover:bg-green-50 rounded-lg">
                          <BookOpen className="w-3.5 h-3.5 mr-1.5" />
                          Blog
                        </Button>
                        <Button size="sm" variant="outline" className={`${colors.filterBorder} ${colors.filterText} hover:${colors.filterBg} rounded-lg`}>
                          <FileText className="w-3.5 h-3.5 mr-1.5" />
                          Content
                        </Button>
                      </div>
                    </div>

                    {/* Right: More Actions */}
                    <div className="flex items-start">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem>
                            <ExternalLink className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="w-4 h-4 mr-2" />
                            Duplicate
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
            );
          })}
        </div>
      );
    }

    // Generic list view for other tabs
    return (
      <div className="space-y-4">
        {filteredData.map((item) => (
          <Card key={item.id} className={`group border-slate-200/60 hover:${colors.filterBorder} shadow-lg hover:shadow-xl transition-all`}>
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
                      {item.description && (
                        <p className="text-sm text-slate-600 line-clamp-2">{item.description}</p>
                      )}
                    </div>
                    <Badge className="ml-4 bg-white text-slate-700 border border-slate-200 capitalize">
                      {item.status}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-4 mt-3">
                    <Badge variant="secondary" className={`${colors.chipBg} ${colors.chipText} ${colors.chipBorder}`}>
                      {item.category}
                    </Badge>
                    {item.lastUpdated && (
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Calendar className="w-4 h-4" />
                        <span>{item.lastUpdated}</span>
                      </div>
                    )}
                    {activeTab === 'creators' && 'followers' in item && (
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Users className="w-4 h-4" />
                        <span>{(item as Creator).followers} followers</span>
                      </div>
                    )}
                    {activeTab === 'search-terms' && 'volume' in item && (
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <TrendingUp className="w-4 h-4" />
                        <span>{(item as SearchTerm).volume}/mo</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" className="rounded-lg">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem>
                        <Copy className="w-4 h-4 mr-2" />
                        Duplicate
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
  };

  const renderTableView = () => {
    if (activeTab === 'ideas-bank') {
      return (
        <Card className="border-slate-200/60 shadow-xl shadow-slate-900/5 overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gradient-to-br from-slate-50 to-white border-b border-slate-200">
                  <TableHead className="w-[50px]"></TableHead>
                  <TableHead className="min-w-[300px] text-slate-900">Title</TableHead>
                  <TableHead className="w-[140px] text-slate-900">Source</TableHead>
                  <TableHead className="w-[140px] text-slate-900">Category</TableHead>
                  <TableHead className="min-w-[300px] text-slate-900">Key Points</TableHead>
                  <TableHead className="w-[200px] text-slate-900">Actions</TableHead>
                  <TableHead className="w-[60px] text-right text-slate-900"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item) => {
                  const idea = item as Idea;
                  return (
                    <TableRow 
                      key={idea.id} 
                      className={`border-b border-slate-100 hover:${colors.filterBg}/30 transition-colors group`}
                    >
                      <TableCell>
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${idea.color} flex items-center justify-center flex-shrink-0`}>
                          <Lightbulb className="w-5 h-5 text-white" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-slate-900">{idea.title}</div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          className={
                            idea.status === 'verified'
                              ? 'bg-green-50 text-green-600 border-green-200 text-xs whitespace-nowrap'
                              : idea.status === 'draft'
                              ? 'bg-orange-50 text-orange-600 border-orange-200 text-xs whitespace-nowrap'
                              : 'bg-slate-50 text-slate-600 border-slate-200 text-xs whitespace-nowrap'
                          }
                        >
                          {idea.source}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={`${colors.chipBg} ${colors.chipText} ${colors.chipBorder} text-xs whitespace-nowrap`}>
                          {idea.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <ul className="space-y-1">
                          {idea.keyPoints.slice(0, 2).map((point, idx) => (
                            <li key={idx} className="flex items-start gap-1 text-xs text-slate-600">
                              <ChevronRight className={`w-3 h-3 mt-0.5 ${colors.filterText} flex-shrink-0`} />
                              <span className="line-clamp-1">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 flex-wrap">
                          <Button size="sm" variant="outline" className="h-7 px-2 text-xs border-purple-200 text-purple-600 hover:bg-purple-50 rounded">
                            <Play className="w-3 h-3 mr-1" />
                            Video
                          </Button>
                          <Button size="sm" variant="outline" className="h-7 px-2 text-xs border-blue-200 text-blue-600 hover:bg-blue-50 rounded">
                            <FileEdit className="w-3 h-3 mr-1" />
                            Script
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem>
                              <ExternalLink className="w-4 h-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="w-4 h-4 mr-2" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </Card>
      );
    }

    // Generic table view for other tabs
    return (
      <Card className="border-slate-200/60 shadow-xl shadow-slate-900/5 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gradient-to-br from-slate-50 to-white border-b border-slate-200">
                <TableHead className="w-[50px]"></TableHead>
                <TableHead className="min-w-[250px] text-slate-900">Name</TableHead>
                <TableHead className="min-w-[180px] text-slate-900">Category</TableHead>
                <TableHead className="w-[100px] text-slate-900">Status</TableHead>
                {activeTab === 'creators' && <TableHead className="w-[140px] text-slate-900">Followers</TableHead>}
                {activeTab === 'search-terms' && <TableHead className="w-[100px] text-slate-900">Volume</TableHead>}
                {activeTab === 'scraped-content' && <TableHead className="w-[100px] text-slate-900">Words</TableHead>}
                <TableHead className="w-[140px] text-slate-900">Last Updated</TableHead>
                <TableHead className="w-[80px] text-right text-slate-900">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item) => (
                <TableRow 
                  key={item.id} 
                  className={`border-b border-slate-100 hover:${colors.filterBg}/30 transition-colors group`}
                >
                  <TableCell>
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0`}>
                      <TabIcon className="w-5 h-5 text-white" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="text-slate-900 mb-1">{item.name}</div>
                      {item.description && (
                        <div className="text-sm text-slate-500 line-clamp-1">{item.description}</div>
                      )}
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
                        item.status === 'active' || item.status === 'verified'
                          ? 'bg-green-50 text-green-600 border-green-200 text-xs capitalize' 
                          : item.status === 'draft'
                          ? 'bg-orange-50 text-orange-600 border-orange-200 text-xs capitalize'
                          : 'bg-slate-50 text-slate-600 border-slate-200 text-xs capitalize'
                      }
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                  {activeTab === 'creators' && 'followers' in item && (
                    <TableCell>
                      <div className="text-slate-900 whitespace-nowrap">{(item as Creator).followers}</div>
                    </TableCell>
                  )}
                  {activeTab === 'search-terms' && 'volume' in item && (
                    <TableCell>
                      <div className="text-slate-900 whitespace-nowrap">{(item as SearchTerm).volume}</div>
                    </TableCell>
                  )}
                  {activeTab === 'scraped-content' && 'wordCount' in item && (
                    <TableCell>
                      <div className="text-slate-900 whitespace-nowrap">{(item as ScrapedContent).wordCount.toLocaleString()}</div>
                    </TableCell>
                  )}
                  <TableCell>
                    {item.lastUpdated && (
                      <div className="flex items-center gap-2 text-sm text-slate-500 whitespace-nowrap">
                        <Calendar className="w-4 h-4 flex-shrink-0" />
                        <span>{item.lastUpdated}</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem>
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="w-4 h-4 mr-2" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
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
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white/60 backdrop-blur-xl border-b border-slate-200/60 sticky top-0 z-10">
        <div className="max-w-[1600px] mx-auto px-8 h-16 flex items-center justify-end gap-4">
          <button className="relative p-2 rounded-lg hover:bg-slate-100 transition-all">
            <div className="w-2 h-2 bg-purple-500 rounded-full absolute top-2 right-2 animate-pulse"></div>
            <svg className="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-sm text-slate-900">Cedric Segueia</div>
              <div className="text-xs text-slate-500">cedric@growth-consulting.io</div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-purple-500 text-white flex items-center justify-center shadow-lg shadow-purple-500/25">
              <span>C</span>
            </div>
          </div>
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
                <h1 className="text-slate-900">Ideas</h1>
                <p className="text-slate-600">Manage your content ideas, creators, search terms, and scraped content</p>
              </div>
            </div>
            <Button 
              className={`h-12 bg-gradient-to-r ${colors.gradient} hover:${colors.hoverGradient} text-white shadow-lg ${colors.shadow} rounded-xl`}
              onClick={() => setShowIdeaModal(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add {colors.label}
            </Button>
          </div>
        </div>

        {/* Tabs Navigation */}
        <Tabs defaultValue="ideas-bank" className="space-y-6" onValueChange={handleTabChange}>
          <div className="bg-white rounded-xl border border-slate-200/60 shadow-sm">
            <TabsList className="w-full justify-start gap-1 bg-transparent p-2 h-auto overflow-x-auto">
              <TabsTrigger 
                value="ideas-bank" 
                className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-purple-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg transition-all px-4 py-2.5 whitespace-nowrap"
              >
                <Lightbulb className="w-4 h-4 mr-2" />
                Ideas Bank
              </TabsTrigger>
              <TabsTrigger 
                value="creators"
                className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg transition-all px-4 py-2.5 whitespace-nowrap"
              >
                <Users className="w-4 h-4 mr-2" />
                Creators
              </TabsTrigger>
              <TabsTrigger 
                value="search-terms"
                className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-pink-500 data-[state=active]:to-pink-600 data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg transition-all px-4 py-2.5 whitespace-nowrap"
              >
                <SearchIcon className="w-4 h-4 mr-2" />
                Search Terms
              </TabsTrigger>
              <TabsTrigger 
                value="scraped-content"
                className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-orange-500 data-[state=active]:to-orange-600 data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg transition-all px-4 py-2.5 whitespace-nowrap"
              >
                <FileText className="w-4 h-4 mr-2" />
                Scraped Content
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Shared Tab Content */}
          {['ideas-bank', 'creators', 'search-terms', 'scraped-content'].map((tab) => (
            <TabsContent key={tab} value={tab} className="space-y-6">
              {/* Search & Controls */}
              <div className="flex gap-4">
                {/* Search Bar */}
                <div className="flex-1 relative">
                  <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
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
                          {availableStatuses.map(status => (
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
                                  status === 'verified' || status === 'active'
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

      {/* Modal */}
      <CreateIdeaModal
        open={showIdeaModal}
        onOpenChange={setShowIdeaModal}
      />
    </div>
  );
}