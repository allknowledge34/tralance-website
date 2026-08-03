"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Settings2, MoreHorizontal, Image as ImageIcon, Sparkles, Eye, Edit3 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import TextareaAutosize from 'react-textarea-autosize';
import { TiptapEditor } from "./TiptapEditor";
import { createBlog, saveDraft, publishBlog, updateBlog } from "@/lib/actions/blog";

import { uploadCoverImage } from '@/lib/actions/upload';

export function ImmersiveEditor({ 
  initialId = "", 
  initialTitle = "", 
  initialContent = "", 
  initialSlug = "",
  initialStatus = "DRAFT",
  initialCoverImage = "",
  initialExcerpt = ""
}) {
  const [blogId, setBlogId] = useState(initialId);
  const [showMetadata, setShowMetadata] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const [slug, setSlug] = useState(initialSlug);
  const [content, setContent] = useState(initialContent);
  const [coverImage, setCoverImage] = useState(initialCoverImage);
  const [excerpt, setExcerpt] = useState(initialExcerpt);
  const [wordCount, setWordCount] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(!!initialSlug);
  
  const [isUploading, setIsUploading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(""), 3000);
  };
  
  // Auto-generate slug from title ONLY if it hasn't been manually edited
  useEffect(() => {
    if (!isSlugManuallyEdited && title && initialStatus !== "PUBLISHED") {
      const generated = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      setSlug(generated);
    }
  }, [title, isSlugManuallyEdited, initialStatus]);

  const [lastSaved, setLastSaved] = useState({ title: initialTitle, content: initialContent, slug: initialSlug, excerpt: initialExcerpt, coverImage: initialCoverImage });
  useEffect(() => {
    // Rule: Editing a published article must never modify the article automatically.
    if (initialStatus === "PUBLISHED") return;

    // Don't save if there are no changes or content is empty
    if (title === lastSaved.title && content === lastSaved.content && slug === lastSaved.slug && excerpt === lastSaved.excerpt && coverImage === lastSaved.coverImage) return;
    if (!title && !content) return;

    const timeoutId = setTimeout(async () => {
      setSaveStatus("Saving...");
      try {
        if (!blogId) {
          const res = await createBlog({ title: title || "Untitled", content: content || " ", slug: slug || undefined, excerpt, coverImage });
          if (res.success && res.data) {
            setBlogId(res.data.id);
            setLastSaved({ title, content, slug: res.data.slug, excerpt: res.data.excerpt, coverImage: res.data.coverImage });
            if (!slug) setSlug(res.data.slug);
            setSaveStatus("Saved just now");
          }
        } else {
          // Rule: Save Draft should only affect Draft articles.
          const res = await saveDraft({ id: blogId, title: title || "Untitled", content: content || " ", slug: slug || undefined, excerpt, coverImage });
          if (res.success && res.data) {
            setLastSaved({ title, content, slug: res.data.slug, excerpt: res.data.excerpt, coverImage: res.data.coverImage });
            setSaveStatus("Saved just now");
          }
        }
      } catch (e) {}
    }, 2000); // Debounce exactly 2s after typing stops

    return () => clearTimeout(timeoutId);
  }, [title, content, slug, excerpt, coverImage, blogId, initialStatus, lastSaved]);

  const handlePublish = async () => {
    if (!title.trim()) {
      showToast("Title is required to publish");
      return;
    }
    
    setSaveStatus(initialStatus === "PUBLISHED" ? "Updating..." : "Publishing...");
    let currentId = blogId;
    
    // Save changes if they exist
    if (title !== lastSaved.title || content !== lastSaved.content || slug !== lastSaved.slug || excerpt !== lastSaved.excerpt || coverImage !== lastSaved.coverImage) {
      if (!currentId) {
        const res = await createBlog({ title: title || "Untitled", content: content || " ", slug: slug || undefined, excerpt, coverImage });
        if (res.success && res.data) {
           currentId = res.data.id;
           setBlogId(currentId);
           setLastSaved({ title, content, slug: res.data.slug, excerpt: res.data.excerpt, coverImage: res.data.coverImage });
        }
      } else {
        // If it's a draft, use saveDraft. If published, use updateBlog to preserve published status.
        if (initialStatus === "DRAFT") {
          const res = await saveDraft({ id: currentId, title: title || "Untitled", content: content || " ", slug: slug || undefined, excerpt, coverImage });
          if (res.success && res.data) {
             setLastSaved({ title, content, slug: res.data.slug, excerpt: res.data.excerpt, coverImage: res.data.coverImage });
          }
        } else {
          const res = await updateBlog({ id: currentId, title: title || "Untitled", content: content || " ", slug: slug || undefined, excerpt, coverImage });
          if (res.success && res.data) {
             setLastSaved({ title, content, slug: res.data.slug, excerpt: res.data.excerpt, coverImage: res.data.coverImage });
          }
        }
      }
    }

    // Process state transition
    if (currentId) {
      if (initialStatus === "DRAFT") {
        const pubRes = await publishBlog(currentId);
        if (pubRes.success) {
          setSaveStatus("Published");
        }
      } else if (initialStatus === "PUBLISHED") {
        setSaveStatus("Updated");
      }
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    
    if (file.size > 5 * 1024 * 1024) {
      showToast("Image must be smaller than 5MB");
      return;
    }
    
    setIsUploading(true);
    
    try {
      const formData = new FormData();
      formData.append("file", file);
      
      const res = await uploadCoverImage(formData);
      
      if (res.success && res.url) {
        setCoverImage(res.url);
        showToast("Cover image uploaded");
      } else {
        throw new Error(res.error || "Upload failed");
      }
    } catch (err: any) {
      showToast(err.message || "Upload failed");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };
  
  return (
    <div className="min-h-screen relative bg-[var(--background)] selection:bg-foreground/20 pb-40"
      onFocus={() => setIsFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsFocused(false);
        }
      }}
    >
      
      <motion.header 
        animate={{ opacity: isFocused && wordCount > 20 ? 0.1 : 1 }}
        whileHover={{ opacity: 1 }}
        className="fixed top-0 inset-x-0 z-40 p-6 flex items-center justify-between pointer-events-none transition-opacity duration-700"
      >
        <div className="flex items-center gap-4 pointer-events-auto">
          <Link href="/blogs" className="w-10 h-10 rounded-full material-layer flex items-center justify-center hover:bg-[var(--layer-2)] transition-colors group shadow-md">
            <ArrowLeft className="w-4 h-4 text-subtle group-hover:text-[var(--foreground)] transition-colors" />
          </Link>
          <div className="hidden md:flex flex-col">
            <span className="text-xs font-medium text-subtle uppercase tracking-widest">
              {wordCount} words • {Math.ceil(wordCount / 200)} min read
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 pointer-events-auto">
          <span className="text-xs font-medium text-subtle uppercase tracking-widest mr-2 opacity-50 transition-opacity">
            {saveStatus}
          </span>
          <button 
            onClick={() => setIsPreviewMode(!isPreviewMode)}
            className={`w-10 h-10 rounded-full material-layer flex items-center justify-center transition-colors shadow-md hover:bg-[var(--layer-2)] text-subtle hover:text-[var(--foreground)]`}
            title={isPreviewMode ? "Edit" : "Preview"}
          >
            {isPreviewMode ? <Edit3 className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
          <button 
            onClick={() => setShowMetadata(!showMetadata)}
            className={`w-10 h-10 rounded-full material-layer flex items-center justify-center transition-colors shadow-md ${showMetadata ? 'bg-[var(--foreground)] text-[var(--background)]' : 'hover:bg-[var(--layer-2)] text-subtle hover:text-[var(--foreground)]'}`}
          >
            <Settings2 className="w-4 h-4" />
          </button>
        </div>
      </motion.header>

      <main className="max-w-3xl mx-auto pt-40 px-6">
        <TextareaAutosize
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isPreviewMode}
          className="w-full bg-transparent border-none p-0 text-5xl md:text-6xl editorial-title focus:outline-none focus:ring-0 placeholder:text-subtle font-medium resize-none mb-8 text-[var(--foreground)] disabled:opacity-90"
        />

        <div className="relative group editor-container">
          <TiptapEditor 
            content={content} 
            onChange={(html, text, wc) => {
              setContent(html);
              setWordCount(wc);
            }} 
            editable={!isPreviewMode}
          />
        </div>
      </main>

      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.1 }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 material-layer-elevated px-2 py-2 flex items-center gap-1 rounded-full shadow-2xl pointer-events-auto"
      >
        <button 
          onClick={handlePublish}
          disabled={saveStatus === "Publishing..." || saveStatus === "Updating..."}
          className="px-6 py-2.5 bg-[var(--foreground)] text-[var(--background)] hover:opacity-90 transition-opacity rounded-full font-medium text-sm flex items-center gap-2 disabled:opacity-50"
        >
          <Sparkles className="w-4 h-4" />
          {initialStatus === "PUBLISHED" ? "Update" : "Publish"}
        </button>
        <div className="w-px h-5 bg-[var(--border-strong)] mx-2" />
        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[var(--layer-2)] transition-colors group">
          <MoreHorizontal className="w-4 h-4 text-subtle group-hover:text-[var(--foreground)] transition-colors" />
        </button>
      </motion.div>

      <AnimatePresence>
        {showMetadata && (
          <motion.div 
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-24 right-6 w-80 material-layer-elevated p-6 z-50 shadow-2xl origin-top-right pointer-events-auto"
          >
            <h3 className="text-sm font-medium uppercase tracking-widest text-subtle mb-6">Article Settings</h3>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--foreground)] opacity-80">URL Slug</label>
                <input 
                  type="text" 
                  value={slug}
                  onChange={(e) => {
                    setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, '-'));
                    setIsSlugManuallyEdited(true);
                  }}
                  placeholder="/your-title-here"
                  className="w-full bg-[var(--layer-1)] border border-[var(--border-subtle)] rounded-xl px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-subtle focus:outline-none focus:border-[var(--border-strong)] transition-all font-mono"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--foreground)] opacity-80">Cover Image</label>
                
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/jpeg, image/png, image/webp"
                  className="hidden"
                />

                {coverImage ? (
                  <div className="relative group/img w-full h-32 rounded-xl overflow-hidden border border-[var(--border-strong)]">
                    <img src={coverImage} alt="Cover" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-4">
                      <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="text-white text-xs font-medium hover:underline"
                      >
                        Replace
                      </button>
                      <button 
                        onClick={() => setCoverImage("")}
                        className="text-red-400 text-xs font-medium hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="w-full h-32 material-layer border-dashed border-[var(--border-strong)] rounded-xl flex flex-col items-center justify-center text-subtle hover:text-[var(--foreground)] hover:bg-[var(--layer-2)] transition-colors gap-2 group relative overflow-hidden"
                  >
                    {isUploading ? (
                      <div className="absolute inset-0 bg-blue-500/10 flex flex-col items-center justify-center">
                        <div className="w-16 h-1 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden relative">
                          <div className="absolute inset-y-0 left-0 bg-blue-500 w-1/2 rounded-full animate-[pulse_1s_ease-in-out_infinite] shadow-[0_0_8px_rgba(59,130,246,0.5)]" style={{ animation: 'indeterminate 1.5s infinite linear', transformOrigin: 'left' }} />
                        </div>
                        <style>{`
                          @keyframes indeterminate {
                            0% { transform: translateX(-100%); }
                            100% { transform: translateX(200%); }
                          }
                        `}</style>
                        <span className="text-xs font-medium mt-2 animate-pulse">Uploading securely...</span>
                      </div>
                    ) : (
                      <>
                        <ImageIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-medium">Upload Image (Max 5MB)</span>
                      </>
                    )}
                  </button>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--foreground)] opacity-80">Excerpt</label>
                <textarea 
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Brief summary..."
                  className="w-full bg-[var(--layer-1)] border border-[var(--border-subtle)] rounded-xl px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-subtle focus:outline-none focus:border-[var(--border-strong)] transition-all resize-none h-24"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 50, x: "-50%" }}
            className="fixed bottom-24 left-1/2 z-50 px-4 py-2 bg-slate-900 text-white dark:bg-white dark:text-black font-medium text-sm rounded-full shadow-lg"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
