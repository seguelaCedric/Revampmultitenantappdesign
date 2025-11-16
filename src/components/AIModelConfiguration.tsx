import { Sparkles, Zap, Image, Video, Mic } from 'lucide-react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { Slider } from './ui/slider';
import { useState } from 'react';

export function AIModelConfiguration() {
  const [temperature, setTemperature] = useState([0.7]);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white/60 backdrop-blur-xl border-b border-slate-200/60 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-gradient-to-br from-purple-600 to-purple-500 text-white shadow-lg shadow-purple-500/25">
              <Sparkles className="w-5 h-5" />
              <span>ContentAI</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
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
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-8 py-8">
        {/* Title Section */}
        <div className="mb-8">
          <h1 className="text-slate-900 mb-2">AI Model Configuration</h1>
          <p className="text-slate-600">Select which AI models to use for generating content</p>
        </div>

        {/* Text Generation (LLM) Card */}
        <div className="bg-white rounded-2xl border border-slate-200/60 shadow-xl shadow-slate-900/5 overflow-hidden mb-6">
          <div className="border-b border-slate-200/60 bg-gradient-to-br from-slate-50 to-white px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/25">
                <Zap className="w-4 h-4" />
              </div>
              <h2 className="text-slate-900">Text Generation (LLM)</h2>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <Label htmlFor="model" className="text-slate-700 mb-2">
                  Model
                </Label>
                <Select defaultValue="claude">
                  <SelectTrigger className="bg-slate-50 border-slate-200 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="claude">Claude 3.5 Sonnet</SelectItem>
                    <SelectItem value="gpt4">GPT-4 Turbo</SelectItem>
                    <SelectItem value="gemini">Gemini Pro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="max-tokens" className="text-slate-700 mb-2">
                  Max Tokens
                </Label>
                <Input
                  id="max-tokens"
                  type="number"
                  defaultValue="2000"
                  className="bg-slate-50 border-slate-200 focus:border-purple-500 focus:ring-purple-500/20 rounded-xl"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <Label className="text-slate-700">Temperature: {temperature[0]}</Label>
                <span className="text-sm text-slate-500">Balanced</span>
              </div>
              <Slider
                value={temperature}
                onValueChange={setTemperature}
                max={1}
                step={0.1}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* AI Generation Models Grid */}
        <div className="grid grid-cols-2 gap-6">
          {/* Text-to-Image */}
          <div className="bg-white rounded-2xl border border-slate-200/60 shadow-xl shadow-slate-900/5 overflow-hidden hover:shadow-2xl hover:shadow-slate-900/10 transition-all">
            <div className="border-b border-slate-200/60 bg-gradient-to-br from-blue-50 to-white px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/25">
                  <Image className="w-4 h-4" />
                </div>
                <h3 className="text-slate-900">Text-to-Image</h3>
              </div>
            </div>
            <div className="p-6">
              <Select defaultValue="flux">
                <SelectTrigger className="bg-slate-50 border-slate-200 rounded-xl mb-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="flux">Flux Pro v1.1 Ultra</SelectItem>
                  <SelectItem value="midjourney">Midjourney v6</SelectItem>
                  <SelectItem value="dalle">DALL-E 3</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-slate-500 mt-2">Highest quality image generation</p>
            </div>
          </div>

          {/* Text-to-Video */}
          <div className="bg-white rounded-2xl border border-slate-200/60 shadow-xl shadow-slate-900/5 overflow-hidden hover:shadow-2xl hover:shadow-slate-900/10 transition-all">
            <div className="border-b border-slate-200/60 bg-gradient-to-br from-pink-50 to-white px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center text-white shadow-lg shadow-pink-500/25">
                  <Video className="w-4 h-4" />
                </div>
                <h3 className="text-slate-900">Text-to-Video</h3>
              </div>
            </div>
            <div className="p-6">
              <Select defaultValue="kling">
                <SelectTrigger className="bg-slate-50 border-slate-200 rounded-xl mb-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kling">Kling Video v2.5 Turbo Pro</SelectItem>
                  <SelectItem value="runway">Runway Gen-3</SelectItem>
                  <SelectItem value="pika">Pika Labs</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-slate-500 mt-2">Fast, professional video generation</p>
            </div>
          </div>

          {/* Image-to-Video */}
          <div className="bg-white rounded-2xl border border-slate-200/60 shadow-xl shadow-slate-900/5 overflow-hidden hover:shadow-2xl hover:shadow-slate-900/10 transition-all">
            <div className="border-b border-slate-200/60 bg-gradient-to-br from-orange-50 to-white px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white shadow-lg shadow-orange-500/25">
                  <Video className="w-4 h-4" />
                </div>
                <h3 className="text-slate-900">Image-to-Video</h3>
              </div>
            </div>
            <div className="p-6">
              <Select defaultValue="kling-i2v">
                <SelectTrigger className="bg-slate-50 border-slate-200 rounded-xl mb-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kling-i2v">Kling Video v2.5 Turbo Pro (I2V)</SelectItem>
                  <SelectItem value="stable-video">Stable Video Diffusion</SelectItem>
                  <SelectItem value="runway-i2v">Runway Gen-3 (I2V)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-slate-500 mt-2">Animate still images into videos</p>
            </div>
          </div>

          {/* Text-to-Speech */}
          <div className="bg-white rounded-2xl border border-slate-200/60 shadow-xl shadow-slate-900/5 overflow-hidden hover:shadow-2xl hover:shadow-slate-900/10 transition-all">
            <div className="border-b border-slate-200/60 bg-gradient-to-br from-green-50 to-white px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white shadow-lg shadow-green-500/25">
                  <Mic className="w-4 h-4" />
                </div>
                <h3 className="text-slate-900">Text-to-Speech</h3>
              </div>
            </div>
            <div className="p-6">
              <Select defaultValue="multilingual">
                <SelectTrigger className="bg-slate-50 border-slate-200 rounded-xl mb-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="multilingual">Multilingual V2</SelectItem>
                  <SelectItem value="elevenlabs">ElevenLabs Turbo</SelectItem>
                  <SelectItem value="azure">Azure Neural TTS</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-slate-500 mt-2">Natural, expressive voices in multiple languages</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-8">
          <Button
            variant="outline"
            className="rounded-xl px-6 border-slate-200 hover:bg-slate-50"
          >
            Cancel
          </Button>
          <Button className="rounded-xl px-8 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white shadow-lg shadow-purple-500/30">
            <Sparkles className="w-4 h-4 mr-2" />
            Create Blueprint
          </Button>
        </div>
      </div>
    </div>
  );
}
