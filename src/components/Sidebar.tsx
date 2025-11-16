import { FileText, Briefcase, Zap, Package, Lightbulb, Settings, ChevronDown, Sparkles, ChevronLeft, ChevronRight, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import { useState, useEffect } from 'react';
import { Badge } from './ui/badge';

interface SidebarProps {
  onNavigate: (view: 'blueprint' | 'ai-config' | 'assets' | 'ideas' | 'generate' | 'jobs') => void;
  currentView: string;
  onCollapsedChange?: (collapsed: boolean) => void;
  processingJobsCount?: number;
}

export function Sidebar({ onNavigate, currentView, onCollapsedChange, processingJobsCount = 0 }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Load collapsed state from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('sidebar-collapsed');
    if (saved !== null) {
      const collapsed = saved === 'true';
      setIsCollapsed(collapsed);
      onCollapsedChange?.(collapsed);
    }
  }, []);

  // Toggle and save to localStorage
  const toggleCollapsed = () => {
    const newCollapsed = !isCollapsed;
    setIsCollapsed(newCollapsed);
    localStorage.setItem('sidebar-collapsed', String(newCollapsed));
    onCollapsedChange?.(newCollapsed);
  };

  const navItems = [
    { icon: FileText, label: 'Content', id: 'content' },
    { icon: Briefcase, label: 'Workspace', id: 'workspace' },
    { icon: Zap, label: 'Blueprints', id: 'blueprints', active: true },
    { icon: Package, label: 'Assets', id: 'assets' },
    { icon: Lightbulb, label: 'Ideas', id: 'ideas' },
  ];

  return (
    <div className={`bg-white/80 backdrop-blur-xl border-r border-slate-200/60 flex flex-col transition-all duration-300 ease-in-out ${isCollapsed ? 'w-[60px]' : 'w-[200px]'}`}>
      {/* Workspace Selector */}
      <div className={`border-b border-slate-200/60 ${isCollapsed ? 'p-2' : 'p-4'}`}>
        {isCollapsed ? (
          <button 
            className="w-full flex items-center justify-center p-2 rounded-xl bg-slate-50 hover:bg-slate-100 transition-all border border-slate-200"
            title="Growth Consulting"
          >
            <div className="w-6 h-6 rounded bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xs flex-shrink-0">
              GC
            </div>
          </button>
        ) : (
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-900 transition-all border border-slate-200">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xs flex-shrink-0">
              GC
            </div>
            <span className="flex-1 text-left text-sm whitespace-nowrap overflow-hidden text-ellipsis">Growth Consulting</span>
            <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
          </button>
        )}
      </div>

      {/* Quick Create Button */}
      <div className={`border-b border-slate-200/60 ${isCollapsed ? 'p-2' : 'p-4'}`}>
        {isCollapsed ? (
          <Button 
            onClick={() => onNavigate('generate')}
            className="w-full h-10 p-0 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white shadow-lg shadow-purple-500/30"
            title="Generate Content (⌘K)"
          >
            <Sparkles className="w-4 h-4" />
          </Button>
        ) : (
          <Button 
            onClick={() => onNavigate('generate')}
            className="w-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white shadow-lg shadow-purple-500/30"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Generate
            <kbd className="ml-auto px-1.5 py-0.5 text-xs bg-white/20 rounded">⌘K</kbd>
          </Button>
        )}
      </div>

      {/* Navigation */}
      <nav className={`flex-1 ${isCollapsed ? 'p-2' : 'p-3'}`}>
        {!isCollapsed && <div className="text-xs text-slate-500 px-3 mb-2">NAVIGATE</div>}
        <div className="space-y-1">
          {navItems.map((item) => {
            const isActive = 
              (item.id === 'blueprints' && currentView === 'blueprint') ||
              (item.id === 'assets' && currentView === 'assets') ||
              (item.id === 'ideas' && currentView === 'ideas');

            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === 'blueprints') onNavigate('blueprint');
                  if (item.id === 'assets') onNavigate('assets');
                  if (item.id === 'ideas') onNavigate('ideas');
                }}
                className={`w-full flex items-center rounded-lg transition-all ${
                  isCollapsed ? 'justify-center p-2.5' : 'gap-3 px-3 py-2.5'
                } ${
                  isActive
                    ? 'bg-purple-50 text-purple-600'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
                title={isCollapsed ? item.label : undefined}
              >
                <item.icon className="w-4 h-4 flex-shrink-0" />
                {!isCollapsed && <span className="text-sm">{item.label}</span>}
              </button>
            );
          })}

          {/* Jobs Link */}
          <button
            onClick={() => onNavigate('jobs')}
            className={`w-full flex items-center rounded-lg transition-all relative ${
              isCollapsed ? 'justify-center p-2.5' : 'gap-3 px-3 py-2.5'
            } ${
              currentView === 'jobs'
                ? 'bg-purple-50 text-purple-600'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
            title={isCollapsed ? 'Jobs' : undefined}
          >
            <TrendingUp className="w-4 h-4 flex-shrink-0" />
            {!isCollapsed && <span className="text-sm">Jobs</span>}
            {processingJobsCount > 0 && (
              <Badge className="ml-auto bg-blue-500 text-white h-5 min-w-5 px-1.5 text-xs">
                {processingJobsCount}
              </Badge>
            )}
            {isCollapsed && processingJobsCount > 0 && (
              <div className="absolute -top-1 -right-1 bg-blue-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
                {processingJobsCount}
              </div>
            )}
          </button>
        </div>
      </nav>

      {/* Settings & Toggle */}
      <div className={`border-t border-slate-200/60 ${isCollapsed ? 'p-2' : 'p-3'}`}>
        <button 
          className={`w-full flex items-center rounded-lg text-slate-600 hover:bg-slate-50 transition-all ${
            isCollapsed ? 'justify-center p-2.5 mb-2' : 'gap-3 px-3 py-2.5 mb-2'
          }`}
          title={isCollapsed ? 'Settings' : undefined}
        >
          <Settings className="w-4 h-4 flex-shrink-0" />
          {!isCollapsed && <span className="text-sm">Settings</span>}
        </button>
        
        {/* Collapse Toggle */}
        <button
          onClick={toggleCollapsed}
          className={`w-full flex items-center rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all ${
            isCollapsed ? 'justify-center p-2.5' : 'gap-3 px-3 py-2.5'
          }`}
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <>
              <ChevronLeft className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm">Collapse</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}