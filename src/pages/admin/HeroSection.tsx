import { useState } from 'react';
import { useSections } from '../../context/SectionContext';
import { useDatabase } from '../../context/DatabaseContext';
import { useMedia } from '../../context/MediaContext';
import MediaImage from '../../components/MediaImage';
import MediaVideo from '../../components/MediaVideo';
import { PageSection } from '../../types';
import {
  Upload,
  Film,
  Image as ImageIcon,
  Eye,
  Save,
  UploadCloud,
  RotateCcw,
  Monitor,
  Tablet,
  Smartphone,
  Play,
  ArrowRight,
  Sliders,
  Sparkles,
  Layers,
  Check,
  AlertCircle,
  X
} from 'lucide-react';

export default function HeroSection() {
  const { sections, updateSection } = useSections();
  const { publish, isPublishing, saveDraft, restorePublished, hasUnsavedChanges, draftConfig, publishedConfig } = useDatabase();
  const { uploadDirectMedia } = useMedia();

  // Find the primary hero section
  const heroSection = sections.find(s => s.type === 'hero') || sections[0] || {
    id: 'hero-1',
    type: 'hero',
    title: 'CINEMATIC \nVISIONS',
    subtitle: 'Director & Cinematographer',
    layout: 'hero',
    background: 'transparent',
    spacing: 'normal',
    isHidden: false,
    projectSelection: { type: 'all', ids: [] },
    order: 0
  } as PageSection;

  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [activeTab, setActiveTab] = useState<'media' | 'content' | 'styling'>('media');
  const [uploadingDesktop, setUploadingDesktop] = useState(false);
  const [uploadingMobile, setUploadingMobile] = useState(false);
  const [uploadingFallback, setUploadingFallback] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

  const showNotification = (type: 'success' | 'error' | 'info', text: string) => {
    setNotification({ type, text });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleUpdate = (updates: Partial<PageSection>) => {
    updateSection(heroSection.id, updates);
  };

  // Upload handler for Desktop media
  const handleDesktopUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingDesktop(true);
    try {
      const isVideo = file.type.startsWith('video/') || file.name.match(/\.(mp4|webm|mov)$/i);
      const asset = await uploadDirectMedia(file, isVideo ? 'video' : 'image');
      handleUpdate({
        mediaUrl: asset.url,
        mediaType: isVideo ? 'video' : 'image'
      });
      showNotification('success', `Desktop ${isVideo ? 'video' : 'image'} uploaded successfully!`);
    } catch (err: any) {
      showNotification('error', err?.message || 'Failed to upload media.');
    } finally {
      setUploadingDesktop(false);
      e.target.value = '';
    }
  };

  // Upload handler for Mobile media
  const handleMobileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingMobile(true);
    try {
      const isVideo = file.type.startsWith('video/') || file.name.match(/\.(mp4|webm|mov)$/i);
      const asset = await uploadDirectMedia(file, isVideo ? 'video' : 'image');
      handleUpdate({
        mobileMediaUrl: asset.url,
        mobileMediaType: isVideo ? 'video' : 'image'
      });
      showNotification('success', `Mobile ${isVideo ? 'video' : 'image'} uploaded successfully!`);
    } catch (err: any) {
      showNotification('error', err?.message || 'Failed to upload mobile media.');
    } finally {
      setUploadingMobile(false);
      e.target.value = '';
    }
  };

  // Upload handler for Video fallback image
  const handleFallbackUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingFallback(true);
    try {
      const asset = await uploadDirectMedia(file, 'image');
      handleUpdate({ videoFallbackImage: asset.url });
      showNotification('success', 'Video poster/fallback image updated!');
    } catch (err: any) {
      showNotification('error', err?.message || 'Failed to upload fallback image.');
    } finally {
      setUploadingFallback(false);
      e.target.value = '';
    }
  };

  const handleSave = async () => {
    try {
      await saveDraft();
      showNotification('success', 'Hero section draft saved successfully.');
    } catch (e) {
      showNotification('error', 'Failed to save draft.');
    }
  };

  const handlePublish = async () => {
    try {
      await publish();
      showNotification('success', 'Hero section published live to public homepage!');
    } catch (e) {
      showNotification('error', 'Failed to publish changes.');
    }
  };

  const handleRestore = async () => {
    if (confirm('Revert all unsaved changes to the last published version?')) {
      try {
        await restorePublished();
        showNotification('info', 'Reverted to last published configuration.');
      } catch (e) {
        showNotification('error', 'Failed to revert changes.');
      }
    }
  };

  // Values with defaults
  const desktopMedia = heroSection.mediaUrl || "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80";
  const mobileMedia = heroSection.mobileMediaUrl || desktopMedia;
  const isVideo = heroSection.mediaType === 'video';
  const overlayOpacity = heroSection.overlayOpacity !== undefined ? heroSection.overlayOpacity : 0.85;
  const overlayColor = heroSection.overlayColor || 'cinema-dark';
  const mediaPosition = heroSection.mediaPosition || 'center';
  const textAlign = heroSection.textAlign || 'center';
  const showSubtitle = heroSection.showSubtitle !== false;
  const showPrimaryBtn = heroSection.showPrimaryButton !== false;
  const showSecondaryBtn = heroSection.showSecondaryButton !== false;
  const showScroll = heroSection.showScrollIndicator !== false;

  const currentPreviewMedia = previewDevice === 'mobile' ? mobileMedia : desktopMedia;
  const currentPreviewIsVideo = previewDevice === 'mobile'
    ? (heroSection.mobileMediaType === 'video' || isVideo)
    : isVideo;

  return (
    <div className="space-y-8 pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-serif text-white tracking-widest uppercase">Hero Section</h1>
          <p className="text-sm text-gray-400 mt-1">
            Manage the homepage hero showreel video, photography background, cinematic typography, and action buttons.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {publishedConfig && (
            <button
              type="button"
              onClick={handleRestore}
              className="flex items-center gap-1.5 px-3 py-2 bg-gray-900 hover:bg-gray-800 text-gray-300 border border-gray-700 rounded text-xs font-bold uppercase tracking-wider transition-colors"
              title="Discard draft changes and revert to published"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Revert
            </button>
          )}

          <button
            type="button"
            onClick={handleSave}
            disabled={!hasUnsavedChanges}
            className={`flex items-center gap-1.5 px-4 py-2 border rounded text-xs font-bold uppercase tracking-wider transition-colors ${
              hasUnsavedChanges
                ? 'bg-gray-800 hover:bg-gray-700 text-white border-gray-600'
                : 'bg-gray-900 text-gray-500 border-gray-800'
            }`}
          >
            <Save className="w-3.5 h-3.5" /> Save Draft
          </button>

          <button
            type="button"
            onClick={handlePublish}
            disabled={isPublishing}
            className="flex items-center gap-2 px-4 py-2 bg-cinema-red hover:bg-red-700 text-white rounded text-xs font-bold uppercase tracking-wider transition-colors disabled:opacity-50"
          >
            <UploadCloud className="w-4 h-4" />
            {isPublishing ? 'Publishing...' : 'Publish To Live'}
          </button>
        </div>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div
          className={`p-4 rounded-lg flex items-center justify-between border ${
            notification.type === 'success'
              ? 'bg-green-950/60 border-green-800 text-green-300'
              : notification.type === 'error'
                ? 'bg-red-950/60 border-red-800 text-red-300'
                : 'bg-blue-950/60 border-blue-800 text-blue-300'
          }`}
        >
          <div className="flex items-center gap-3 text-sm">
            {notification.type === 'success' ? (
              <Check className="w-4 h-4" />
            ) : (
              <AlertCircle className="w-4 h-4" />
            )}
            <span>{notification.text}</span>
          </div>
          <button onClick={() => setNotification(null)} className="opacity-70 hover:opacity-100">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Dedicated Interactive Hero Preview Panel */}
      <div className="bg-cinema-black border border-gray-800 rounded-xl overflow-hidden shadow-2xl">
        <div className="bg-gray-900/90 px-6 py-3 border-b border-gray-800 flex flex-wrap justify-between items-center gap-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-300">
            <Eye className="w-4 h-4 text-cinema-red" /> Dedicated Live Hero Preview
          </div>

          <div className="flex items-center gap-1 bg-gray-950 p-1 rounded-md border border-gray-800 text-xs">
            <button
              type="button"
              onClick={() => setPreviewDevice('desktop')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded transition-colors ${
                previewDevice === 'desktop' ? 'bg-cinema-red text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" /> Desktop
            </button>
            <button
              type="button"
              onClick={() => setPreviewDevice('tablet')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded transition-colors ${
                previewDevice === 'tablet' ? 'bg-cinema-red text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Tablet className="w-3.5 h-3.5" /> Tablet
            </button>
            <button
              type="button"
              onClick={() => setPreviewDevice('mobile')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded transition-colors ${
                previewDevice === 'mobile' ? 'bg-cinema-red text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" /> Mobile
            </button>
          </div>
        </div>

        {/* Viewport Frame */}
        <div className="bg-black/80 p-4 md:p-8 flex justify-center items-center overflow-hidden">
          <div
            className={`transition-all duration-300 relative overflow-hidden rounded-md border border-gray-800 shadow-2xl ${
              previewDevice === 'mobile'
                ? 'w-[360px] h-[580px]'
                : previewDevice === 'tablet'
                  ? 'w-[720px] h-[520px]'
                  : 'w-full max-w-5xl h-[460px]'
            }`}
          >
            {/* Background Layer inside preview */}
            <div className="absolute inset-0 z-0">
              {currentPreviewIsVideo ? (
                <div className="relative w-full h-full">
                  {heroSection.videoFallbackImage && (
                    <MediaImage
                      src={heroSection.videoFallbackImage}
                      alt="Poster Fallback"
                      className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale"
                    />
                  )}
                  <MediaVideo
                    src={currentPreviewMedia}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className={`w-full h-full object-cover opacity-40 grayscale mix-blend-luminosity ${
                      mediaPosition === 'top' ? 'object-top' : mediaPosition === 'bottom' ? 'object-bottom' : 'object-center'
                    }`}
                  />
                </div>
              ) : (
                <MediaImage
                  src={currentPreviewMedia}
                  alt="Hero Preview"
                  className={`w-full h-full object-cover opacity-40 grayscale mix-blend-luminosity ${
                    mediaPosition === 'top' ? 'object-top' : mediaPosition === 'bottom' ? 'object-bottom' : 'object-center'
                  }`}
                />
              )}

              {/* Overlay inside preview */}
              <div
                className={`absolute inset-0 bg-gradient-to-b ${
                  overlayColor === 'cinema-black'
                    ? 'from-black/95 via-black/70 to-black'
                    : overlayColor === 'cinema-red-burn'
                      ? 'from-black/90 via-cinema-red/20 to-black'
                      : 'from-cinema-dark/95 via-cinema-dark/65 to-cinema-dark'
                }`}
                style={{ opacity: overlayOpacity }}
              />
              <div className="absolute inset-0 bg-cinema-red/5 mix-blend-multiply" />
            </div>

            {/* Content inside preview */}
            <div
              className={`relative z-10 w-full h-full p-6 flex flex-col justify-center ${
                textAlign === 'left'
                  ? 'text-left items-start'
                  : textAlign === 'right'
                    ? 'text-right items-end'
                    : 'text-center items-center'
              }`}
            >
              {showSubtitle && heroSection.subtitle && (
                <p className="uppercase tracking-[0.25em] text-cinema-red-light text-[10px] md:text-xs font-semibold mb-3">
                  {heroSection.subtitle}
                </p>
              )}

              <h2
                className={`font-serif tracking-tighter text-white mb-6 leading-none whitespace-pre-line ${
                  previewDevice === 'mobile'
                    ? 'text-3xl'
                    : previewDevice === 'tablet'
                      ? 'text-5xl'
                      : 'text-5xl md:text-6xl'
                }`}
              >
                {heroSection.title || 'CINEMATIC \nVISIONS'}
              </h2>

              {(showPrimaryBtn || (showSecondaryBtn && heroSection.secondaryButtonText)) && (
                <div className="flex flex-wrap gap-2.5 items-center">
                  {showPrimaryBtn && (
                    <div className="inline-flex items-center gap-2 bg-cinema-red/90 text-white px-4 py-2 rounded text-[10px] uppercase font-bold tracking-widest">
                      <Play className="w-3 h-3 fill-current" />
                      <span>{heroSection.buttonText || 'Play Showreel'}</span>
                    </div>
                  )}
                  {showSecondaryBtn && heroSection.secondaryButtonText && (
                    <div className="inline-flex items-center gap-2 border border-gray-700 text-gray-300 px-4 py-2 rounded text-[10px] uppercase font-bold tracking-widest">
                      <span>{heroSection.secondaryButtonText}</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  )}
                </div>
              )}

              {showScroll && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-70">
                  <span className="text-[8px] uppercase tracking-widest text-gray-500 font-mono">Scroll</span>
                  <div className="w-[1px] h-4 bg-cinema-red" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Editing Controls Navigation Tabs */}
      <div className="flex border-b border-gray-800 gap-6">
        <button
          type="button"
          onClick={() => setActiveTab('media')}
          className={`pb-3 text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 ${
            activeTab === 'media'
              ? 'text-cinema-red border-b-2 border-cinema-red'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Film className="w-4 h-4" /> 1. Background Media
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('content')}
          className={`pb-3 text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 ${
            activeTab === 'content'
              ? 'text-cinema-red border-b-2 border-cinema-red'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Sliders className="w-4 h-4" /> 2. Hero Content & CTAs
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('styling')}
          className={`pb-3 text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 ${
            activeTab === 'styling'
              ? 'text-cinema-red border-b-2 border-cinema-red'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Layers className="w-4 h-4" /> 3. Overlay & Alignment
        </button>
      </div>

      {/* TAB 1: BACKGROUND MEDIA */}
      {activeTab === 'media' && (
        <div className="bg-cinema-black border border-gray-800 rounded-xl p-6 md:p-8 space-y-8">
          <div>
            <h2 className="text-lg font-serif text-white tracking-wider uppercase">Background Media</h2>
            <p className="text-xs text-gray-400 mt-1">
              Configure background video or high-resolution photography. Separate mobile backgrounds and video fallback images are supported.
            </p>
          </div>

          {/* Desktop Media Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4 border-t border-gray-800/60">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-200">
                  Desktop Background (Images & Videos)
                </label>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">
                  {heroSection.mediaType === 'video' ? 'Video Mode' : 'Image Mode'}
                </span>
              </div>

              {/* Media Type Switcher */}
              <div className="grid grid-cols-2 gap-2 bg-gray-950 p-1 rounded-lg border border-gray-800 text-xs">
                <button
                  type="button"
                  onClick={() => handleUpdate({ mediaType: 'image' })}
                  className={`py-2 rounded font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 ${
                    heroSection.mediaType !== 'video' ? 'bg-cinema-red text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" /> Image
                </button>
                <button
                  type="button"
                  onClick={() => handleUpdate({ mediaType: 'video' })}
                  className={`py-2 rounded font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 ${
                    heroSection.mediaType === 'video' ? 'bg-cinema-red text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Film className="w-3.5 h-3.5" /> Video
                </button>
              </div>

              {/* Upload Input & URL input */}
              <div className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={heroSection.mediaUrl || ''}
                    onChange={(e) => handleUpdate({ mediaUrl: e.target.value })}
                    placeholder={
                      heroSection.mediaType === 'video'
                        ? 'Enter video URL (.mp4, .webm) or click Upload'
                        : 'Enter image URL (.jpg, .png, .webp) or click Upload'
                    }
                    className="flex-1 bg-gray-900 border border-gray-700 rounded px-3 py-2 text-xs text-white focus:border-cinema-red outline-none"
                  />
                  {heroSection.mediaUrl && (
                    <button
                      type="button"
                      onClick={() => handleUpdate({ mediaUrl: '' })}
                      className="px-2.5 py-2 bg-gray-900 hover:bg-red-950 text-gray-400 hover:text-red-400 border border-gray-800 rounded text-xs"
                      title="Clear"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <label className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-gray-800 border border-gray-700 hover:border-gray-600 text-white rounded text-xs uppercase tracking-wider font-bold transition-colors cursor-pointer">
                    {uploadingDesktop ? (
                      <>
                        <span className="animate-spin h-3.5 w-3.5 border-2 border-white border-t-transparent rounded-full" />
                        <span>Uploading Media...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-3.5 h-3.5 text-cinema-red" />
                        <span>Upload Desktop File</span>
                      </>
                    )}
                    <input
                      type="file"
                      className="hidden"
                      accept={
                        heroSection.mediaType === 'video'
                          ? '.mp4,.webm,.mov'
                          : '.jpg,.jpeg,.png,.webp,.svg'
                      }
                      onChange={handleDesktopUpload}
                      disabled={uploadingDesktop}
                    />
                  </label>
                  <span className="text-[11px] text-gray-500">
                    {heroSection.mediaType === 'video' ? 'MP4 or WebM (up to 250MB)' : 'JPG, PNG, WebP (up to 25MB)'}
                  </span>
                </div>
              </div>
            </div>

            {/* Desktop Preview Card */}
            <div className="bg-gray-950 border border-gray-800 rounded-lg p-4 flex flex-col justify-between">
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-2">Desktop Asset Preview</span>
              <div className="aspect-video bg-black rounded overflow-hidden relative border border-gray-800/80 flex items-center justify-center">
                {heroSection.mediaType === 'video' ? (
                  <MediaVideo
                    src={desktopMedia}
                    muted
                    loop
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <MediaImage
                    src={desktopMedia}
                    alt="Desktop preview"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Mobile Media Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-6 border-t border-gray-800/60">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-200">
                  Mobile Background (Optional Smartphone Media)
                </label>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">
                  {heroSection.mobileMediaUrl ? 'Configured' : 'Using Desktop Fallback'}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={heroSection.mobileMediaUrl || ''}
                    onChange={(e) => handleUpdate({ mobileMediaUrl: e.target.value })}
                    placeholder="Enter mobile media URL or upload file"
                    className="flex-1 bg-gray-900 border border-gray-700 rounded px-3 py-2 text-xs text-white focus:border-cinema-red outline-none"
                  />
                  {heroSection.mobileMediaUrl && (
                    <button
                      type="button"
                      onClick={() => handleUpdate({ mobileMediaUrl: '' })}
                      className="px-2.5 py-2 bg-gray-900 hover:bg-red-950 text-gray-400 hover:text-red-400 border border-gray-800 rounded text-xs"
                      title="Clear"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <label className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-gray-800 border border-gray-700 hover:border-gray-600 text-white rounded text-xs uppercase tracking-wider font-bold transition-colors cursor-pointer">
                    {uploadingMobile ? (
                      <>
                        <span className="animate-spin h-3.5 w-3.5 border-2 border-white border-t-transparent rounded-full" />
                        <span>Uploading...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-3.5 h-3.5 text-cinema-red" />
                        <span>Upload Mobile Media</span>
                      </>
                    )}
                    <input
                      type="file"
                      className="hidden"
                      accept=".jpg,.jpeg,.png,.webp,.mp4,.webm"
                      onChange={handleMobileUpload}
                      disabled={uploadingMobile}
                    />
                  </label>
                  <span className="text-[11px] text-gray-500">Portrait 9:16 or mobile showreel</span>
                </div>
              </div>
            </div>

            {/* Video Fallback Poster Image */}
            <div className="space-y-4">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-200 block">
                Video Fallback / Poster Image
              </label>
              <p className="text-[11px] text-gray-500">
                Displayed while videos are buffering, on low-battery mobile devices, or in browsers restricting autoplay.
              </p>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={heroSection.videoFallbackImage || ''}
                  onChange={(e) => handleUpdate({ videoFallbackImage: e.target.value })}
                  placeholder="Poster image URL"
                  className="flex-1 bg-gray-900 border border-gray-700 rounded px-3 py-2 text-xs text-white focus:border-cinema-red outline-none"
                />
                <label className="px-3 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded text-xs font-bold uppercase tracking-wider cursor-pointer flex items-center gap-1">
                  {uploadingFallback ? '...' : <Upload className="w-3 h-3 text-cinema-red" />}
                  <span>Upload</span>
                  <input
                    type="file"
                    className="hidden"
                    accept=".jpg,.jpeg,.png,.webp"
                    onChange={handleFallbackUpload}
                    disabled={uploadingFallback}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: HERO CONTENT & CTAS */}
      {activeTab === 'content' && (
        <div className="bg-cinema-black border border-gray-800 rounded-xl p-6 md:p-8 space-y-8">
          <div>
            <h2 className="text-lg font-serif text-white tracking-wider uppercase">Hero Content & Buttons</h2>
            <p className="text-xs text-gray-400 mt-1">
              Customize the headline, multi-line typography, category subtitles, and interactive buttons.
            </p>
          </div>

          {/* Heading and Subtitle Inputs */}
          <div className="space-y-6 pt-4 border-t border-gray-800/60">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-300">
                  Main Headline (Multi-line supported)
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-gray-500">Heading Size:</span>
                  <select
                    value={heroSection.headingSize || 'default'}
                    onChange={(e) => handleUpdate({ headingSize: e.target.value as any })}
                    className="bg-gray-900 border border-gray-700 text-xs text-white rounded px-2 py-1 outline-none"
                  >
                    <option value="default">Default</option>
                    <option value="compact">Compact</option>
                    <option value="massive">Massive Cinematic</option>
                  </select>
                </div>
              </div>
              <textarea
                rows={3}
                value={heroSection.title}
                onChange={(e) => handleUpdate({ title: e.target.value })}
                placeholder="e.g. CINEMATIC \nVISIONS"
                className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:border-cinema-red outline-none font-serif text-lg"
              />
              <p className="text-[11px] text-gray-500 mt-1">
                Tip: Press Enter to create a stylish line break for cinematic impact.
              </p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-300">
                  Subtitle / Category Tagline
                </label>
                <label className="flex items-center gap-2 text-xs text-gray-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showSubtitle}
                    onChange={(e) => handleUpdate({ showSubtitle: e.target.checked })}
                    className="accent-cinema-red"
                  />
                  <span>Show Subtitle</span>
                </label>
              </div>
              <input
                type="text"
                value={heroSection.subtitle || ''}
                onChange={(e) => handleUpdate({ subtitle: e.target.value })}
                placeholder="e.g. Director & Cinematographer"
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:border-cinema-red outline-none text-sm"
              />
            </div>
          </div>

          {/* Primary CTA Button */}
          <div className="pt-6 border-t border-gray-800/60 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-200">
                Primary Call-To-Action Button
              </h3>
              <label className="flex items-center gap-2 text-xs text-gray-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showPrimaryBtn}
                  onChange={(e) => handleUpdate({ showPrimaryButton: e.target.checked })}
                  className="accent-cinema-red"
                />
                <span>Visible</span>
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-gray-400 mb-1">
                  Button Label
                </label>
                <input
                  type="text"
                  value={heroSection.buttonText || ''}
                  onChange={(e) => handleUpdate({ buttonText: e.target.value })}
                  placeholder="Play Showreel"
                  className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-xs text-white focus:border-cinema-red outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-gray-400 mb-1">
                  Destination Link
                </label>
                <input
                  type="text"
                  value={heroSection.buttonLink || heroSection.showreelUrl || ''}
                  onChange={(e) => handleUpdate({ buttonLink: e.target.value })}
                  placeholder="/work or https://vimeo.com/..."
                  className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-xs text-white focus:border-cinema-red outline-none"
                />
              </div>
            </div>
          </div>

          {/* Secondary CTA Button */}
          <div className="pt-6 border-t border-gray-800/60 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-200">
                Secondary Call-To-Action Button (Optional)
              </h3>
              <label className="flex items-center gap-2 text-xs text-gray-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showSecondaryBtn}
                  onChange={(e) => handleUpdate({ showSecondaryButton: e.target.checked })}
                  className="accent-cinema-red"
                />
                <span>Visible</span>
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-gray-400 mb-1">
                  Button Label
                </label>
                <input
                  type="text"
                  value={heroSection.secondaryButtonText || ''}
                  onChange={(e) => handleUpdate({ secondaryButtonText: e.target.value })}
                  placeholder="e.g. Explore Portfolio or Get in Touch"
                  className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-xs text-white focus:border-cinema-red outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-gray-400 mb-1">
                  Destination Link
                </label>
                <input
                  type="text"
                  value={heroSection.secondaryButtonLink || ''}
                  onChange={(e) => handleUpdate({ secondaryButtonLink: e.target.value })}
                  placeholder="/contact or /work"
                  className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-xs text-white focus:border-cinema-red outline-none"
                />
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="pt-6 border-t border-gray-800/60 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-gray-200 block">
                Scroll Down Indicator
              </span>
              <span className="text-[11px] text-gray-500">
                Displays the subtle animated vertical line at the bottom of the hero.
              </span>
            </div>
            <label className="flex items-center gap-2 text-xs text-gray-300 cursor-pointer">
              <input
                type="checkbox"
                checked={showScroll}
                onChange={(e) => handleUpdate({ showScrollIndicator: e.target.checked })}
                className="accent-cinema-red"
              />
              <span>Enabled</span>
            </label>
          </div>
        </div>
      )}

      {/* TAB 3: OVERLAY & ALIGNMENT */}
      {activeTab === 'styling' && (
        <div className="bg-cinema-black border border-gray-800 rounded-xl p-6 md:p-8 space-y-8">
          <div>
            <h2 className="text-lg font-serif text-white tracking-wider uppercase">Overlay & Alignment</h2>
            <p className="text-xs text-gray-400 mt-1">
              Fine-tune the contrast, color grading, background crop positioning, and typography alignment.
            </p>
          </div>

          {/* Text Alignment */}
          <div className="space-y-4 pt-4 border-t border-gray-800/60">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-300 block">
              Text Alignment & Positioning
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'left', label: 'Left Aligned' },
                { id: 'center', label: 'Centered (Default)' },
                { id: 'right', label: 'Right Aligned' }
              ].map(opt => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleUpdate({ textAlign: opt.id as any })}
                  className={`p-3 rounded-lg border text-xs font-bold uppercase tracking-wider transition-all ${
                    textAlign === opt.id
                      ? 'border-cinema-red bg-cinema-red/10 text-white ring-1 ring-cinema-red'
                      : 'border-gray-800 bg-gray-900/60 text-gray-400 hover:text-white'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Background Positioning */}
          <div className="space-y-4 pt-4 border-t border-gray-800/60">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-300 block">
              Background Crop & Vertical Anchor
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'top', label: 'Anchor Top' },
                { id: 'center', label: 'Anchor Center (Default)' },
                { id: 'bottom', label: 'Anchor Bottom' }
              ].map(opt => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleUpdate({ mediaPosition: opt.id as any })}
                  className={`p-3 rounded-lg border text-xs font-bold uppercase tracking-wider transition-all ${
                    mediaPosition === opt.id
                      ? 'border-cinema-red bg-cinema-red/10 text-white ring-1 ring-cinema-red'
                      : 'border-gray-800 bg-gray-900/60 text-gray-400 hover:text-white'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Overlay Color */}
          <div className="space-y-4 pt-4 border-t border-gray-800/60">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-300 block">
              Overlay Tint Color
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'cinema-dark', label: 'Cinema Dark (Charcoal Red)', desc: 'Standard deep burgundy tone' },
                { id: 'cinema-black', label: 'Pure Film Black', desc: 'Maximum contrast, minimal red' },
                { id: 'cinema-red-burn', label: 'Cinematic Red Burn', desc: 'Vibrant highlight burn' }
              ].map(opt => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleUpdate({ overlayColor: opt.id as any })}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    overlayColor === opt.id
                      ? 'border-cinema-red bg-cinema-red/10 text-white ring-1 ring-cinema-red'
                      : 'border-gray-800 bg-gray-900/60 text-gray-400 hover:text-white'
                  }`}
                >
                  <div className="text-xs font-bold text-white mb-1">{opt.label}</div>
                  <div className="text-[11px] text-gray-500">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Overlay Opacity Slider */}
          <div className="space-y-3 pt-4 border-t border-gray-800/60">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-300">
                Overlay Opacity & Vignette Density
              </label>
              <span className="font-mono text-xs text-cinema-red font-bold">
                {Math.round(overlayOpacity * 100)}%
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={overlayOpacity}
              onChange={(e) => handleUpdate({ overlayOpacity: parseFloat(e.target.value) })}
              className="w-full accent-cinema-red h-1.5 bg-gray-800 rounded appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-gray-500 uppercase font-mono">
              <span>0% (Full Media Visibility)</span>
              <span>100% (High Contrast Black)</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
