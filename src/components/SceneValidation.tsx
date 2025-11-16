import { 
  Check, 
  Trash2, 
  RefreshCw, 
  Edit, 
  GripVertical, 
  AlertCircle, 
  Layers,
  Clock,
  Zap,
  ChevronUp,
  ChevronDown,
  Sparkles,
  Image,
  Video,
  Mic,
  FileText
} from 'lucide-react';
import { Scene, PipelineType } from '../utils/pipelines';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';

interface SceneValidationProps {
  scenes: Scene[];
  pipelineType: PipelineType;
  validationStage: 'prompt' | 'generation'; // 'prompt' = validate scene prompts, 'generation' = validate generated content
  onApproveScene: (sceneId: string) => void;
  onApproveAll: () => void;
  onDeleteScene: (sceneId: string) => void;
  onRegenerateScene: (sceneId: string) => void;
  onEditScene: (sceneId: string) => void;
  onMoveScene: (sceneId: string, direction: 'up' | 'down') => void;
  editingSceneId: string | null;
  editedSceneDescription: string;
  onSaveSceneEdit: () => void;
  onCancelSceneEdit: () => void;
  onEditedDescriptionChange: (value: string) => void;
  // For storyboard sub-stage validation
  onApproveSubStage?: (sceneId: string, subStage: 't2i' | 'i2v' | 't2s' | 'voice') => void;
  onRegenerateSubStage?: (sceneId: string, subStage: 't2i' | 'i2v' | 't2s' | 'voice') => void;
}

export function SceneValidation({
  scenes,
  pipelineType,
  validationStage,
  onApproveScene,
  onApproveAll,
  onDeleteScene,
  onRegenerateScene,
  onEditScene,
  onMoveScene,
  editingSceneId,
  editedSceneDescription,
  onSaveSceneEdit,
  onCancelSceneEdit,
  onEditedDescriptionChange,
  onApproveSubStage,
  onRegenerateSubStage,
}: SceneValidationProps) {
  const approvedCount = scenes.filter(s => s.status === 'approved').length;
  const totalTokens = scenes.reduce((sum, s) => sum + s.estimatedTokens, 0);
  const approvedTokens = scenes.filter(s => s.status === 'approved').reduce((sum, s) => sum + s.estimatedTokens, 0);
  
  const isStoryboard = pipelineType === 'storyboard-video';
  const isGenerationStage = validationStage === 'generation';

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-slate-200/60 shadow-sm">
          <CardContent className="p-4">
            <div className="text-sm text-slate-600 mb-1">Total Scenes</div>
            <div className="text-2xl text-slate-900">{scenes.length}</div>
          </CardContent>
        </Card>
        <Card className="border-green-200 bg-green-50 shadow-sm">
          <CardContent className="p-4">
            <div className="text-sm text-green-700 mb-1">Approved</div>
            <div className="text-2xl text-green-900">{approvedCount}</div>
          </CardContent>
        </Card>
        <Card className="border-amber-200 bg-amber-50 shadow-sm">
          <CardContent className="p-4">
            <div className="text-sm text-amber-700 mb-1">Pending</div>
            <div className="text-2xl text-amber-900">{scenes.length - approvedCount}</div>
          </CardContent>
        </Card>
        <Card className="border-blue-200 bg-blue-50 shadow-sm">
          <CardContent className="p-4">
            <div className="text-sm text-blue-700 mb-1">Est. Tokens</div>
            <div className="text-2xl text-blue-900">{approvedTokens.toLocaleString()}</div>
            <div className="text-xs text-blue-600 mt-1">of {totalTokens.toLocaleString()} total</div>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      {approvedCount < scenes.length && (
        <Card className="border-green-200 bg-gradient-to-br from-green-50 to-white shadow-sm">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <div className="text-slate-900 mb-1">Quick Actions</div>
              <div className="text-sm text-slate-600">Approve all scenes to proceed</div>
            </div>
            <Button onClick={onApproveAll} className="bg-green-600 hover:bg-green-700 text-white">
              <Check className="w-4 h-4 mr-2" />
              Approve All
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Scenes List */}
      <div className="space-y-3">
        {scenes.map((scene, index) => (
          <Card 
            key={scene.id}
            className={`border-2 transition-all ${
              scene.status === 'approved' 
                ? 'border-green-200 bg-green-50/50' 
                : 'border-slate-200 bg-white'
            }`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start gap-3">
                {/* Drag Handle */}
                <div className="flex flex-col gap-1 pt-1">
                  <button
                    onClick={() => onMoveScene(scene.id, 'up')}
                    disabled={index === 0}
                    className="text-slate-400 hover:text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <GripVertical className="w-4 h-4 text-slate-300" />
                  <button
                    onClick={() => onMoveScene(scene.id, 'down')}
                    disabled={index === scenes.length - 1}
                    className="text-slate-400 hover:text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-purple-500 flex items-center justify-center text-white text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <div className="text-slate-900">Scene {index + 1}</div>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <Clock className="w-3 h-3" />
                          {scene.duration}s
                          <span className="mx-1">•</span>
                          <Sparkles className="w-3 h-3" />
                          ~{scene.estimatedTokens} tokens
                        </div>
                      </div>
                    </div>
                    <Badge className={
                      scene.status === 'approved' 
                        ? 'bg-green-100 text-green-700 border-green-300' 
                        : 'bg-slate-100 text-slate-600 border-slate-300'
                    }>
                      {scene.status === 'approved' ? '✓ Approved' : 'Pending'}
                    </Badge>
                  </div>

                  {editingSceneId === scene.id ? (
                    <div className="space-y-3">
                      <Textarea
                        value={editedSceneDescription}
                        onChange={(e) => onEditedDescriptionChange(e.target.value)}
                        className="min-h-[100px]"
                        placeholder="Edit scene description..."
                      />
                      <div className="flex gap-2">
                        <Button size="sm" onClick={onSaveSceneEdit} className="bg-green-600 hover:bg-green-700 text-white">
                          <Check className="w-4 h-4 mr-1" />
                          Save
                        </Button>
                        <Button size="sm" variant="outline" onClick={onCancelSceneEdit}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 mb-3">
                        <div className="text-sm text-slate-700 mb-2">{scene.description}</div>
                        <div className="text-xs text-slate-500 italic">{scene.prompt}</div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        {scene.status !== 'approved' ? (
                          <Button 
                            size="sm" 
                            onClick={() => onApproveScene(scene.id)}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            <Check className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                        ) : (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => onApproveScene(scene.id)}
                            className="border-green-600 text-green-700"
                          >
                            <Check className="w-4 h-4 mr-1" />
                            Approved
                          </Button>
                        )}
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => onEditScene(scene.id)}
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => onRegenerateScene(scene.id)}
                        >
                          <RefreshCw className="w-4 h-4 mr-1" />
                          Regenerate
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => onDeleteScene(scene.id)}
                          className="border-red-200 text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* Warning if no scenes approved */}
      {approvedCount === 0 && scenes.length > 0 && (
        <Card className="border-amber-200 bg-amber-50 shadow-sm">
          <CardContent className="p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-amber-900 mb-1">No Scenes Approved</div>
              <div className="text-sm text-amber-700">You must approve at least one scene to proceed with generation.</div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}