import {
  ArrowLeft,
  Sparkles,
  Plus,
  X,
  Search,
  Copy,
  Zap,
  Image,
  Video,
  Mic,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Badge } from "./ui/badge";
import { Slider } from "./ui/slider";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { useState, useRef } from "react";

interface PresetType {
  id: number;
  title: string;
  description: string;
  category: string;
  platform: string;
  prompt: string;
  tags: string[];
  preview: React.ReactNode;
}

export function CreateBlueprint() {
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [searchVariable, setSearchVariable] = useState("");
  const [promptText, setPromptText] = useState("");
  const [temperature, setTemperature] = useState([0.7]);
  const [activeTab, setActiveTab] = useState("idea");
  const [presetSearch, setPresetSearch] = useState("");
  const [selectedPresetCategory, setSelectedPresetCategory] =
    useState("all");
  const [isPresetModalOpen, setIsPresetModalOpen] =
    useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const presets: PresetType[] = [
    {
      id: 1,
      title: "Professional Blog Post",
      description:
        "Create engaging, SEO-optimized blog posts for business audiences",
      category: "Blog",
      platform: "Blog",
      prompt: `Write a professional blog post about \${idea.title}.

Title: \${idea.title}
Target Keywords: \${seo.primaryKeyword}, \${seo.secondaryKeywords}
Tone: \${brand_voice.tone}
Target Audience: \${idea.targetAudience}

Structure:
1. Compelling introduction that hooks the reader
2. Main content with 3-5 key sections
3. Practical examples and actionable insights
4. Strong conclusion with a call to action

SEO Requirements:
- Naturally incorporate keywords throughout
- Include meta description: \${seo.metaDescription}
- Optimize for search intent: \${seo.searchIntent}`,
      tags: ["SEO", "Long-form", "Professional"],
      preview: (
        <div className="space-y-3">
          <div className="text-lg text-slate-900">
            10 Proven Strategies to Boost Your SaaS Growth in
            2024
          </div>
          <div className="text-xs text-slate-500">
            By ContentAI • 5 min read • Marketing
          </div>
          <div className="text-xs text-slate-600 leading-relaxed">
            In today's competitive SaaS landscape, sustainable
            growth requires more than just a great product. As
            businesses face increasing customer acquisition
            costs and market saturation, the companies that
            thrive are those that implement strategic,
            data-driven approaches to growth...
          </div>
          <div className="flex gap-2">
            <span className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded">
              SaaS Growth
            </span>
            <span className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded">
              Marketing
            </span>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      title: "Viral Twitter Thread",
      description:
        "Craft attention-grabbing Twitter threads that drive engagement",
      category: "Social Media",
      platform: "Twitter",
      prompt: `Create a viral Twitter thread about \${idea.title}.

Topic: \${idea.description}
Brand Voice: \${brand_voice.personality}
Target Audience: \${audience.interests}

Thread Structure:
1. Hook tweet (mind-blowing stat or question)
2. 8-12 tweets with valuable insights
3. Use emojis strategically
4. End with a CTA: \${campaign.cta}

Style Guidelines:
- One idea per tweet
- Short, punchy sentences
- Include relevant hashtags
- Conversational tone`,
      tags: ["Viral", "Social", "Short-form"],
      preview: (
        <div className="space-y-2">
          <div className="p-3 bg-white rounded-lg border border-slate-200">
            <div className="text-xs text-slate-900">
              🧵 I spent $50K testing AI tools for content
              creation. Here's what actually works (and what's a
              waste of money):
            </div>
          </div>
          <div className="p-3 bg-white rounded-lg border border-slate-200">
            <div className="text-xs text-slate-900">
              1/ Most companies are using AI wrong. They think
              it's a replacement for humans. It's not. It's a
              force multiplier. 🚀
            </div>
          </div>
          <div className="p-3 bg-white rounded-lg border border-slate-200">
            <div className="text-xs text-slate-900">
              2/ The best AI-generated content comes from
              detailed prompts. Generic inputs = generic
              outputs. Specific inputs = gold. ✨
            </div>
          </div>
          <div className="text-xs text-slate-400 pl-3">
            + 9 more tweets
          </div>
        </div>
      ),
    },
    {
      id: 3,
      title: "LinkedIn Thought Leadership",
      description:
        "Position yourself as an industry expert with insightful LinkedIn posts",
      category: "Social Media",
      platform: "LinkedIn",
      prompt: `Write a LinkedIn thought leadership post about \${idea.title}.

Industry: \${org.industry}
Expertise Area: \${idea.keywords}
Brand Voice: \${brand_voice.tone}
Target Audience: \${audience.demographics}

Post Structure:
1. Personal story or observation (2-3 sentences)
2. Key insight or lesson learned
3. Industry implications
4. Actionable takeaway
5. Engaging question to drive comments

Tone: Professional yet personable, \${brand_voice.style}
Length: 150-300 words`,
      tags: ["Professional", "B2B", "Thought Leadership"],
      preview: (
        <div className="bg-white rounded-lg border border-slate-200 p-4 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-purple-500"></div>
            <div>
              <div className="text-xs text-slate-900">
                Sarah Chen
              </div>
              <div className="text-xs text-slate-500">
                VP of Marketing @ TechCorp
              </div>
            </div>
          </div>
          <div className="text-xs text-slate-700 leading-relaxed">
            After 10 years in B2B marketing, I've learned that
            the best campaigns don't feel like campaigns at all.
            <br />
            <br />
            Last quarter, we launched a "campaign" that
            generated 300+ qualified leads. No ads. No cold
            emails. Just valuable content consistently shared in
            the right places.
            <br />
            <br />
            The key? We stopped interrupting and started
            contributing...
          </div>
          <div className="flex gap-4 text-xs text-slate-500">
            <span>👍 234</span>
            <span>💬 45 comments</span>
            <span>🔄 12 reposts</span>
          </div>
        </div>
      ),
    },
    {
      id: 4,
      title: "Product Launch Announcement",
      description:
        "Announce new products with excitement and clarity",
      category: "Marketing",
      platform: "Blog",
      prompt: `Create a product launch announcement for \${product.name}.

Product: \${product.name}
Description: \${product.description}
Key Features: \${product.features}
Main Benefits: \${product.benefits}
Pricing: \${product.pricing}

Content Structure:
1. Exciting opening that builds anticipation
2. Problem statement (what pain points does this solve?)
3. Solution introduction (\${product.name})
4. Feature showcase with benefits
5. Social proof or early user testimonials
6. Clear call-to-action: \${campaign.cta}
7. Launch details and availability

Tone: \${brand_voice.tone}, energetic and persuasive`,
      tags: ["Product", "Launch", "Marketing"],
      preview: (
        <div className="space-y-3">
          <div className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
            🚀 New Launch
          </div>
          <div className="text-lg text-slate-900">
            Introducing ContentAI Pro: Your AI Content Team, Now
            10x Faster
          </div>
          <div className="text-xs text-slate-600 leading-relaxed">
            We've just launched the biggest update in ContentAI
            history. Say goodbye to writer's block and hello to
            unlimited, brand-perfect content at the click of a
            button.
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2 bg-blue-50 rounded-lg">
              <div className="text-xs text-blue-900">
                ⚡ 10x Faster
              </div>
            </div>
            <div className="p-2 bg-green-50 rounded-lg">
              <div className="text-xs text-green-900">
                🎯 AI-Powered
              </div>
            </div>
          </div>
          <button className="w-full text-xs py-2 bg-purple-600 text-white rounded-lg">
            Start Free Trial →
          </button>
        </div>
      ),
    },
    {
      id: 5,
      title: "Email Newsletter",
      description:
        "Engaging email newsletters that subscribers love to read",
      category: "Email",
      platform: "Email",
      prompt: `Write an engaging email newsletter about \${idea.title}.

Subject Line: Create 3 options (A/B test ready)
Brand: \${org.name}
Tone: \${brand_voice.tone}
Audience: \${audience.interests}

Newsletter Structure:
1. Personal greeting
2. Main story/update: \${idea.description}
3. Quick wins section (2-3 tips)
4. Featured content/product
5. Community spotlight
6. Clear CTA: \${campaign.cta}
7. Sign-off with personality

Design Notes:
- Use short paragraphs
- Include 1-2 relevant emojis
- Mobile-friendly formatting`,
      tags: ["Email", "Newsletter", "Engagement"],
      preview: (
        <div className="bg-white rounded-lg border-2 border-slate-200 overflow-hidden">
          <div className="bg-purple-600 text-white p-3 text-center">
            <div className="text-xs">📬 ContentAI Weekly</div>
          </div>
          <div className="p-4 space-y-3">
            <div className="text-xs text-slate-900">
              Hey there! 👋
            </div>
            <div className="text-xs text-slate-700 leading-relaxed">
              This week we discovered 3 AI tools that are
              absolute game-changers for content creators...
            </div>
            <div className="border-l-2 border-purple-600 pl-3 py-2 bg-purple-50">
              <div className="text-xs text-slate-900">
                💡 Quick Win: Use this prompt template to 10x
                your content output
              </div>
            </div>
            <button className="w-full text-xs py-2 bg-purple-600 text-white rounded">
              Read More →
            </button>
            <div className="text-xs text-slate-400 text-center">
              Sent with ❤️ from the ContentAI team
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 6,
      title: "Instagram Caption",
      description:
        "Captivating captions that boost engagement and reach",
      category: "Social Media",
      platform: "Instagram",
      prompt: `Write an Instagram caption for \${idea.title}.

Content Theme: \${idea.description}
Brand Personality: \${brand_voice.personality}
Target Audience: \${audience.demographics}

Caption Guidelines:
1. Hook in first line (emoji + compelling question/statement)
2. Story or value (2-4 lines)
3. Relatable moment
4. Call-to-action: \${campaign.cta}
5. Hashtag strategy (10-15 relevant hashtags)

Style: \${brand_voice.style}, conversational, use line breaks for readability
Emojis: Use 3-5 strategically placed emojis`,
      tags: ["Social", "Visual", "Short-form"],
      preview: (
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-500 to-orange-500"></div>
            <div className="text-xs text-slate-900">
              contentai_official
            </div>
          </div>
          <div className="text-xs text-slate-700 leading-relaxed space-y-2">
            <div>
              ✨ Ever feel like your content is getting lost in
              the noise?
            </div>
            <div>
              Here's the truth: Great content doesn't need to
              shout. It needs to resonate.
            </div>
            <div>
              We just helped 500+ creators find their voice
              using AI. Not to replace authenticity, but to
              amplify it. 🚀
            </div>
            <div className="text-blue-600">
              #ContentCreation #AITools #CreatorEconomy
              #ContentMarketing #SocialMediaTips
            </div>
          </div>
          <div className="flex gap-4 mt-3 text-xs text-slate-500">
            <span>❤️ 1,234</span>
            <span>💬 56</span>
            <span>📤 23</span>
          </div>
        </div>
      ),
    },
    {
      id: 7,
      title: "SEO Landing Page",
      description:
        "High-converting landing pages optimized for search and conversions",
      category: "Website",
      platform: "Website",
      prompt: `Create SEO-optimized landing page copy for \${product.name}.

Product/Service: \${product.name}
Value Proposition: \${product.benefits}
Target Keyword: \${seo.primaryKeyword}
Search Intent: \${seo.searchIntent}
Target Audience: \${audience.painPoints}

Page Structure:
1. Hero Section
   - Headline with \${seo.primaryKeyword}
   - Subheadline addressing pain point
   - Primary CTA: \${campaign.cta}

2. Problem/Solution Section
   - Audience pain points
   - How \${product.name} solves it

3. Features & Benefits
   - \${product.features}
   - Benefit-focused descriptions

4. Social Proof
   - Testimonials
   - Stats/results

5. Final CTA Section
   - Compelling offer
   - Clear next step

SEO: Optimize for \${seo.primaryKeyword}, include \${seo.secondaryKeywords}`,
      tags: ["SEO", "Conversion", "Website"],
      preview: (
        <div className="bg-gradient-to-br from-purple-50 to-white rounded-lg border border-purple-200 p-4 space-y-3">
          <div className="text-sm text-purple-900">
            Create Content 10x Faster with AI
          </div>
          <div className="text-xs text-slate-600">
            Stop struggling with writer's block. Generate
            high-quality, on-brand content in minutes.
          </div>
          <div className="flex gap-2">
            <button className="flex-1 text-xs py-2 bg-purple-600 text-white rounded-lg">
              Start Free Trial
            </button>
            <button className="flex-1 text-xs py-2 border border-purple-600 text-purple-600 rounded-lg">
              Watch Demo
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-purple-200">
            <div className="text-center">
              <div className="text-xs text-purple-900">
                500+
              </div>
              <div className="text-xs text-slate-500">
                Companies
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs text-purple-900">
                10M+
              </div>
              <div className="text-xs text-slate-500">
                Content Pieces
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs text-purple-900">
                4.9/5
              </div>
              <div className="text-xs text-slate-500">
                Rating
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 8,
      title: "Video Script",
      description:
        "Engaging video scripts for YouTube, TikTok, or marketing videos",
      category: "Video",
      platform: "YouTube",
      prompt: `Write a video script for \${idea.title}.

Video Topic: \${idea.description}
Duration: 3-5 minutes
Platform: YouTube/TikTok
Audience: \${audience.interests}
Brand Voice: \${brand_voice.personality}

Script Format:
[HOOK - First 5 seconds]
- Attention-grabbing opening

[INTRO - 10 seconds]
- Who you are
- What they'll learn

[MAIN CONTENT - 2-4 minutes]
Section 1: [Point/Tip]
Section 2: [Point/Tip]
Section 3: [Point/Tip]
- Visual cues
- B-roll suggestions

[CALL TO ACTION]
- Subscribe/Like/Comment
- \${campaign.cta}

[OUTRO]
- Recap value
- Next video tease

Tone: \${brand_voice.tone}, energetic and engaging`,
      tags: ["Video", "YouTube", "Script"],
      preview: (
        <div className="bg-slate-900 rounded-lg overflow-hidden">
          <div className="aspect-video bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-2">
                <div className="w-0 h-0 border-l-8 border-l-white border-t-4 border-t-transparent border-b-4 border-b-transparent ml-1"></div>
              </div>
              <div className="text-xs">3:24</div>
            </div>
          </div>
          <div className="p-3 space-y-2">
            <div className="text-xs text-white">
              5 AI Tools That Will Change Your Life in 2024
            </div>
            <div className="text-xs text-slate-400">
              [HOOK] "I tested 50 AI tools so you don't have
              to..."
              <br />
              [INTRO] Quick overview of what viewers will learn
              <br />
              [CONTENT] Deep dive into each tool with examples
            </div>
          </div>
        </div>
      ),
    },
  ];

  const filteredPresets = presets.filter((preset) => {
    const matchesSearch =
      presetSearch === "" ||
      preset.title
        .toLowerCase()
        .includes(presetSearch.toLowerCase()) ||
      preset.description
        .toLowerCase()
        .includes(presetSearch.toLowerCase()) ||
      preset.tags.some((tag) =>
        tag.toLowerCase().includes(presetSearch.toLowerCase()),
      );

    const matchesCategory =
      selectedPresetCategory === "all" ||
      preset.category === selectedPresetCategory;

    return matchesSearch && matchesCategory;
  });

  const presetCategories = [
    "all",
    ...Array.from(new Set(presets.map((p) => p.category))),
  ];

  const usePreset = (preset: PresetType) => {
    setPromptText(preset.prompt);
    setIsPresetModalOpen(false);
  };

  const variables = [
    {
      category: "Idea",
      items: [
        {
          name: "idea.title",
          description: "The main title of the content idea",
        },
        {
          name: "idea.description",
          description: "Detailed description of the idea",
        },
        {
          name: "idea.keywords",
          description: "Target keywords for SEO",
        },
        {
          name: "idea.targetAudience",
          description: "Who this content is for",
        },
        {
          name: "idea.contentType",
          description: "Type of content (blog, video, etc.)",
        },
      ],
    },
    {
      category: "Brand Voice",
      items: [
        {
          name: "brand_voice.tone",
          description:
            "Overall tone (professional, casual, etc.)",
        },
        {
          name: "brand_voice.style",
          description: "Writing style preferences",
        },
        {
          name: "brand_voice.personality",
          description: "Brand personality traits",
        },
        {
          name: "brand_voice.language",
          description: "Language complexity level",
        },
      ],
    },
    {
      category: "Product",
      items: [
        {
          name: "product.name",
          description: "Product or service name",
        },
        {
          name: "product.description",
          description: "What the product does",
        },
        {
          name: "product.features",
          description: "Key product features",
        },
        {
          name: "product.benefits",
          description: "Main customer benefits",
        },
        {
          name: "product.pricing",
          description: "Pricing information",
        },
        {
          name: "product.category",
          description: "Product category or niche",
        },
      ],
    },
    {
      category: "Audience",
      items: [
        {
          name: "audience.demographics",
          description: "Age, location, gender, etc.",
        },
        {
          name: "audience.interests",
          description: "Interests and hobbies",
        },
        {
          name: "audience.painPoints",
          description: "Problems they face",
        },
        {
          name: "audience.goals",
          description: "What they want to achieve",
        },
      ],
    },
    {
      category: "SEO",
      items: [
        {
          name: "seo.primaryKeyword",
          description: "Main keyword to target",
        },
        {
          name: "seo.secondaryKeywords",
          description: "Supporting keywords",
        },
        {
          name: "seo.metaDescription",
          description: "SEO meta description",
        },
        {
          name: "seo.searchIntent",
          description: "User search intent type",
        },
      ],
    },
    {
      category: "Campaign",
      items: [
        {
          name: "campaign.name",
          description: "Marketing campaign name",
        },
        {
          name: "campaign.goal",
          description: "Campaign objective",
        },
        {
          name: "campaign.cta",
          description: "Call to action text",
        },
        {
          name: "campaign.startDate",
          description: "Campaign start date",
        },
        {
          name: "campaign.endDate",
          description: "Campaign end date",
        },
      ],
    },
    {
      category: "Organization",
      items: [
        { name: "org.name", description: "Organization name" },
        {
          name: "org.industry",
          description: "Industry or sector",
        },
        {
          name: "org.mission",
          description: "Company mission statement",
        },
        {
          name: "org.values",
          description: "Core company values",
        },
      ],
    },
  ];

  const insertVariable = (varName: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const textBefore = promptText.substring(0, start);
    const textAfter = promptText.substring(end);
    const variableText = `\${${varName}}`;

    const newText = textBefore + variableText + textAfter;
    setPromptText(newText);

    // Set cursor position after the inserted variable
    setTimeout(() => {
      textarea.focus();
      const newPosition = start + variableText.length;
      textarea.setSelectionRange(newPosition, newPosition);
    }, 0);
  };

  const addTag = () => {
    if (tagInput.trim()) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

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
              <svg
                className="w-5 h-5 text-slate-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-sm text-slate-900">
                  Cedric Segueia
                </div>
                <div className="text-xs text-slate-500">
                  cedric@growth-consulting.io
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-purple-500 text-white flex items-center justify-center shadow-lg shadow-purple-500/25">
                <span>C</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-8 py-8">
        {/* Back Button */}
        <button className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors mb-6 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm">Back to Blueprints</span>
        </button>

        {/* Title Section */}
        <div className="mb-8">
          <h1 className="text-slate-900 mb-2">
            Create Blueprint
          </h1>
          <p className="text-slate-600">
            Design a reusable prompt template with dynamic
            variables
          </p>
        </div>

        {/* Main Form */}
        <div className="space-y-6">
          {/* Basic Information Card */}
          <div className="bg-white rounded-2xl border border-slate-200/60 shadow-xl shadow-slate-900/5 overflow-hidden">
            <div className="border-b border-slate-200/60 bg-gradient-to-br from-slate-50 to-white px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/25">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-slate-900">
                    Basic Information
                  </h2>
                  <p className="text-sm text-slate-500">
                    Define your blueprint's name and purpose
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <Label
                  htmlFor="blueprint-name"
                  className="text-slate-700 mb-2 flex items-center gap-2"
                >
                  Blueprint Name{" "}
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="blueprint-name"
                  placeholder="e.g., Professional Blog Post, Viral Twitter Thread"
                  className="bg-slate-50 border-slate-200 focus:border-purple-500 focus:ring-purple-500/20 rounded-xl"
                />
              </div>

              <div>
                <Label
                  htmlFor="description"
                  className="text-slate-700 mb-2"
                >
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe what this blueprint is for and when to use it..."
                  rows={4}
                  className="bg-slate-50 border-slate-200 focus:border-purple-500 focus:ring-purple-500/20 rounded-xl resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="platform"
                    className="text-slate-700 mb-2"
                  >
                    Target Platform (Optional)
                  </Label>
                  <Select>
                    <SelectTrigger className="bg-slate-50 border-slate-200 rounded-xl">
                      <SelectValue placeholder="None" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="twitter">
                        Twitter
                      </SelectItem>
                      <SelectItem value="linkedin">
                        LinkedIn
                      </SelectItem>
                      <SelectItem value="blog">Blog</SelectItem>
                      <SelectItem value="instagram">
                        Instagram
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label
                    htmlFor="tags"
                    className="text-slate-700 mb-2"
                  >
                    Tags
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="tags"
                      placeholder="Add a tag..."
                      value={tagInput}
                      onChange={(e) =>
                        setTagInput(e.target.value)
                      }
                      onKeyPress={(e) =>
                        e.key === "Enter" &&
                        (e.preventDefault(), addTag())
                      }
                      className="bg-slate-50 border-slate-200 focus:border-purple-500 focus:ring-purple-500/20 rounded-xl"
                    />
                    <Button
                      onClick={addTag}
                      variant="outline"
                      size="icon"
                      className="rounded-xl border-slate-200 hover:bg-purple-50 hover:text-purple-600 hover:border-purple-200"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="bg-purple-100 text-purple-700 hover:bg-purple-200 rounded-lg px-3 py-1"
                        >
                          {tag}
                          <X
                            className="w-3 h-3 ml-2 cursor-pointer"
                            onClick={() => removeTag(index)}
                          />
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Master Prompt Template Card */}
          <div className="bg-white rounded-2xl border border-slate-200/60 shadow-xl shadow-slate-900/5 overflow-hidden">
            <div className="border-b border-slate-200/60 bg-gradient-to-br from-slate-50 to-white px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/25">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-slate-900">
                      Master Prompt Template
                    </h2>
                    <p className="text-sm text-slate-500">
                      Write your prompt using variables like{" "}
                      <code className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-xs">
                        ${"{"}idea.title{"}"}
                      </code>
                      ,{" "}
                      <code className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-xs">
                        ${"{"}brand_voice.tone{"}"}
                      </code>
                      ,{" "}
                      <code className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-xs">
                        ${"{"}product.name{"}"}
                      </code>
                    </p>
                  </div>
                </div>
                <Dialog
                  open={isPresetModalOpen}
                  onOpenChange={setIsPresetModalOpen}
                >
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-xl border-slate-200 hover:bg-purple-50 hover:text-purple-600 hover:border-purple-200"
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      Browse Presets
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-[95vw] max-h-[92vh] overflow-hidden flex flex-col p-0">
                    <DialogHeader className="px-8 pt-6 pb-4">
                      <DialogTitle className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-purple-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/25">
                          <Sparkles className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-lg">
                            Prompt Library
                          </div>
                          <DialogDescription className="text-sm">
                            Choose a template to get started
                            quickly
                          </DialogDescription>
                        </div>
                      </DialogTitle>
                    </DialogHeader>

                    {/* Search and Filters */}
                    <div className="px-8 py-4 border-b border-slate-200 space-y-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                          placeholder="Search templates by name, platform, or tags..."
                          value={presetSearch}
                          onChange={(e) =>
                            setPresetSearch(e.target.value)
                          }
                          className="pl-10 bg-slate-50 border-slate-200 rounded-xl"
                        />
                      </div>

                      {/* Scrollable Category Buttons */}
                      <div className="relative">
                        <div className="overflow-x-auto scrollbar-hide">
                          <div className="flex gap-2 pb-2">
                            {presetCategories.map(
                              (category) => (
                                <Button
                                  key={category}
                                  onClick={() =>
                                    setSelectedPresetCategory(
                                      category,
                                    )
                                  }
                                  variant={
                                    selectedPresetCategory ===
                                    category
                                      ? "default"
                                      : "outline"
                                  }
                                  size="sm"
                                  className={`rounded-lg capitalize whitespace-nowrap flex-shrink-0 ${
                                    selectedPresetCategory ===
                                    category
                                      ? "bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/25"
                                      : "border-slate-200 hover:bg-slate-50"
                                  }`}
                                >
                                  {category}
                                </Button>
                              ),
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Presets Grid */}
                    <div className="flex-1 overflow-y-auto px-8 py-6">
                      <div className="grid grid-cols-2 gap-6">
                        {filteredPresets.map((preset) => (
                          <div
                            key={preset.id}
                            className="bg-white rounded-xl border border-slate-200 hover:border-purple-300 hover:shadow-xl transition-all overflow-hidden flex flex-col"
                          >
                            {/* Header */}
                            <div className="p-5 border-b border-slate-100">
                              <h3 className="text-slate-900 mb-2">
                                {preset.title}
                              </h3>
                              <p className="text-sm text-slate-600 mb-3">
                                {preset.description}
                              </p>
                              <Badge
                                variant="secondary"
                                className="bg-purple-50 text-purple-600 border-purple-200 rounded-md text-xs"
                              >
                                {preset.category}
                              </Badge>
                            </div>

                            {/* Preview */}
                            <div className="flex-1 bg-gradient-to-br from-slate-50 to-white p-5">
                              {preset.preview}
                            </div>

                            {/* Footer */}
                            <div className="p-4 bg-slate-50 border-t border-slate-100">
                              <Button
                                onClick={() =>
                                  usePreset(preset)
                                }
                                className="w-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white shadow-lg shadow-purple-500/25 rounded-lg"
                                size="sm"
                              >
                                <Sparkles className="w-4 h-4 mr-2" />
                                Use This Template
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>

                      {filteredPresets.length === 0 && (
                        <div className="text-center py-12">
                          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                            <Search className="w-8 h-8 text-slate-400" />
                          </div>
                          <h3 className="text-slate-900 mb-2">
                            No templates found
                          </h3>
                          <p className="text-sm text-slate-500">
                            Try adjusting your search or filter
                            criteria
                          </p>
                        </div>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <div className="p-6">
              {/* Variables - Simplified */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                  <Label className="text-slate-700">
                    Available Variables (click to insert)
                  </Label>
                  <div className="relative w-48">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400" />
                    <Input
                      placeholder="Search..."
                      value={searchVariable}
                      onChange={(e) =>
                        setSearchVariable(e.target.value)
                      }
                      className="pl-8 h-7 bg-white border-slate-200 rounded-lg text-xs"
                    />
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 max-h-[200px] overflow-y-auto">
                  {variables.map((group) => {
                    const filteredItems = group.items.filter(
                      (item) =>
                        searchVariable === "" ||
                        item.name
                          .toLowerCase()
                          .includes(
                            searchVariable.toLowerCase(),
                          ),
                    );

                    if (filteredItems.length === 0) return null;

                    return (
                      <div
                        key={group.category}
                        className="mb-3 last:mb-0"
                      >
                        <div className="text-xs text-slate-500 mb-2">
                          {group.category}
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {filteredItems.map((variable) => (
                            <button
                              key={variable.name}
                              onClick={() =>
                                insertVariable(variable.name)
                              }
                              className="px-2.5 py-1 bg-white hover:bg-purple-50 border border-slate-200 hover:border-purple-300 rounded-md text-xs text-purple-600 hover:text-purple-700 transition-all font-mono"
                              title={variable.description}
                            >
                              ${"{" + variable.name + "}"}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Textarea - Full Width */}
              <div>
                <Textarea
                  ref={textareaRef}
                  value={promptText}
                  onChange={(e) =>
                    setPromptText(e.target.value)
                  }
                  placeholder="Enter your master prompt template here...&#10;&#10;Use variables like ${idea.title}, ${brand_voice.tone}, ${product.name}"
                  rows={24}
                  className="bg-slate-50 border-slate-200 focus:border-purple-500 focus:ring-purple-500/20 rounded-xl resize-y font-mono text-sm min-h-[200px]"
                />
              </div>
            </div>
          </div>

          {/* LLM Model Configuration Card */}
          <div className="bg-white rounded-2xl border border-slate-200/60 shadow-xl shadow-slate-900/5 overflow-hidden">
            <div className="border-b border-slate-200/60 bg-gradient-to-br from-slate-50 to-white px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/25">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-slate-900">
                    Text Generation (LLM)
                  </h2>
                  <p className="text-sm text-slate-500">
                    Configure the AI model to generate your
                    content
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <Label
                    htmlFor="model"
                    className="text-slate-700 mb-2"
                  >
                    Model
                  </Label>
                  <Select defaultValue="claude">
                    <SelectTrigger
                      id="model"
                      className="bg-slate-50 border-slate-200 rounded-xl"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="claude">
                        Claude 3.5 Sonnet
                      </SelectItem>
                      <SelectItem value="gpt4">
                        GPT-4 Turbo
                      </SelectItem>
                      <SelectItem value="gpt4o">
                        GPT-4o
                      </SelectItem>
                      <SelectItem value="gemini">
                        Gemini 1.5 Pro
                      </SelectItem>
                      <SelectItem value="llama">
                        Llama 3.1 405B
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label
                    htmlFor="max-tokens"
                    className="text-slate-700 mb-2"
                  >
                    Max Tokens
                  </Label>
                  <Input
                    id="max-tokens"
                    type="number"
                    defaultValue="2000"
                    min="100"
                    max="8000"
                    step="100"
                    className="bg-slate-50 border-slate-200 focus:border-purple-500 focus:ring-purple-500/20 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <Label className="text-slate-700">
                    Temperature:{" "}
                    <span className="text-purple-600">
                      {temperature[0].toFixed(2)}
                    </span>
                  </Label>
                  <div className="flex gap-2">
                    <Badge
                      variant="outline"
                      className={`text-xs ${temperature[0] < 0.4 ? "bg-blue-50 text-blue-600 border-blue-200" : "text-slate-400 border-slate-200"}`}
                    >
                      Precise
                    </Badge>
                    <Badge
                      variant="outline"
                      className={`text-xs ${temperature[0] >= 0.4 && temperature[0] <= 0.8 ? "bg-purple-50 text-purple-600 border-purple-200" : "text-slate-400 border-slate-200"}`}
                    >
                      Balanced
                    </Badge>
                    <Badge
                      variant="outline"
                      className={`text-xs ${temperature[0] > 0.8 ? "bg-orange-50 text-orange-600 border-orange-200" : "text-slate-400 border-slate-200"}`}
                    >
                      Creative
                    </Badge>
                  </div>
                </div>
                <Slider
                  value={temperature}
                  onValueChange={setTemperature}
                  max={1}
                  step={0.01}
                  className="w-full"
                />
                <div className="flex justify-between mt-2 text-xs text-slate-500">
                  <span>0.0 - Deterministic</span>
                  <span>1.0 - Random</span>
                </div>
              </div>
            </div>
          </div>

          {/* Media Generation Models - Grid Layout */}
          <div className="grid grid-cols-2 gap-6">
            {/* Text-to-Image */}
            <div className="bg-white rounded-2xl border border-slate-200/60 shadow-xl shadow-slate-900/5 overflow-hidden hover:shadow-2xl hover:shadow-slate-900/10 transition-shadow">
              <div className="border-b border-slate-200/60 bg-gradient-to-br from-blue-50 to-white px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/25">
                    <Image className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-slate-900">
                      Text-to-Image
                    </h3>
                    <p className="text-xs text-slate-500">
                      Generate images from text prompts
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <Label
                  htmlFor="t2i-model"
                  className="text-slate-700 mb-2"
                >
                  Model
                </Label>
                <Select defaultValue="flux">
                  <SelectTrigger
                    id="t2i-model"
                    className="bg-slate-50 border-slate-200 rounded-xl"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="flux">
                      Flux Pro v1.1 Ultra
                    </SelectItem>
                    <SelectItem value="midjourney">
                      Midjourney v6
                    </SelectItem>
                    <SelectItem value="dalle">
                      DALL-E 3
                    </SelectItem>
                    <SelectItem value="stable-diffusion">
                      Stable Diffusion XL
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Text-to-Video */}
            <div className="bg-white rounded-2xl border border-slate-200/60 shadow-xl shadow-slate-900/5 overflow-hidden hover:shadow-2xl hover:shadow-slate-900/10 transition-shadow">
              <div className="border-b border-slate-200/60 bg-gradient-to-br from-pink-50 to-white px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center text-white shadow-lg shadow-pink-500/25">
                    <Video className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-slate-900">
                      Text-to-Video
                    </h3>
                    <p className="text-xs text-slate-500">
                      Create videos from text descriptions
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <Label
                  htmlFor="t2v-model"
                  className="text-slate-700 mb-2"
                >
                  Model
                </Label>
                <Select defaultValue="kling">
                  <SelectTrigger
                    id="t2v-model"
                    className="bg-slate-50 border-slate-200 rounded-xl"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kling">
                      Kling Video v2.5 Turbo Pro
                    </SelectItem>
                    <SelectItem value="runway">
                      Runway Gen-3 Alpha
                    </SelectItem>
                    <SelectItem value="pika">
                      Pika Labs v1.5
                    </SelectItem>
                    <SelectItem value="sora">
                      Sora (OpenAI)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Image-to-Video */}
            <div className="bg-white rounded-2xl border border-slate-200/60 shadow-xl shadow-slate-900/5 overflow-hidden hover:shadow-2xl hover:shadow-slate-900/10 transition-shadow">
              <div className="border-b border-slate-200/60 bg-gradient-to-br from-orange-50 to-white px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white shadow-lg shadow-orange-500/25">
                    <Video className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-slate-900">
                      Image-to-Video
                    </h3>
                    <p className="text-xs text-slate-500">
                      Animate still images into videos
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <Label
                  htmlFor="i2v-model"
                  className="text-slate-700 mb-2"
                >
                  Model
                </Label>
                <Select defaultValue="kling-i2v">
                  <SelectTrigger
                    id="i2v-model"
                    className="bg-slate-50 border-slate-200 rounded-xl"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kling-i2v">
                      Kling Video v2.5 Turbo Pro (I2V)
                    </SelectItem>
                    <SelectItem value="runway-i2v">
                      Runway Gen-3 (I2V)
                    </SelectItem>
                    <SelectItem value="stable-video">
                      Stable Video Diffusion
                    </SelectItem>
                    <SelectItem value="pika-i2v">
                      Pika Labs (I2V)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Text-to-Speech (ElevenLabs) */}
            <div className="bg-white rounded-2xl border border-slate-200/60 shadow-xl shadow-slate-900/5 overflow-hidden hover:shadow-2xl hover:shadow-slate-900/10 transition-shadow">
              <div className="border-b border-slate-200/60 bg-gradient-to-br from-green-50 to-white px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white shadow-lg shadow-green-500/25">
                    <Mic className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-slate-900">
                      Text-to-Speech
                    </h3>
                    <p className="text-xs text-slate-500">
                      Convert text to natural speech
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <Label
                    htmlFor="tts-provider"
                    className="text-slate-700 mb-2"
                  >
                    Provider
                  </Label>
                  <Select defaultValue="elevenlabs">
                    <SelectTrigger
                      id="tts-provider"
                      className="bg-slate-50 border-slate-200 rounded-xl"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="elevenlabs">
                        ElevenLabs
                      </SelectItem>
                      <SelectItem value="azure">
                        Azure Neural TTS
                      </SelectItem>
                      <SelectItem value="google">
                        Google Cloud TTS
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label
                    htmlFor="tts-voice"
                    className="text-slate-700 mb-2"
                  >
                    Voice
                  </Label>
                  <Select defaultValue="multilingual">
                    <SelectTrigger
                      id="tts-voice"
                      className="bg-slate-50 border-slate-200 rounded-xl"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="multilingual">
                        Multilingual V2
                      </SelectItem>
                      <SelectItem value="adam">
                        Adam (Deep, Mature)
                      </SelectItem>
                      <SelectItem value="rachel">
                        Rachel (Calm, Young)
                      </SelectItem>
                      <SelectItem value="domi">
                        Domi (Strong, Confident)
                      </SelectItem>
                      <SelectItem value="bella">
                        Bella (Soft, Expressive)
                      </SelectItem>
                      <SelectItem value="antoni">
                        Antoni (Well-Rounded)
                      </SelectItem>
                      <SelectItem value="josh">
                        Josh (Professional)
                      </SelectItem>
                      <SelectItem value="arnold">
                        Arnold (Crisp, Clear)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
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

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}