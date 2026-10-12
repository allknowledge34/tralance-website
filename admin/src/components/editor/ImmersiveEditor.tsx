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
  
  useEffect(() => {
    if (!isSlugManuallyEdited && title && initialStatus !== "PUBLISHED") {
      const generated = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      setSlug(generated);
    }
  }, [title, isSlugManuallyEdited, initialStatus]);

  const [lastSaved, setLastSaved] = useState({ title: initialTitle, content: initialContent, slug: initialSlug, excerpt: initialExcerpt, coverImage: initialCoverImage });
  useEffect(() => {
    if (initialStatus === "PUBLISHED") return;

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
          const res = await saveDraft({ id: blogId, title: title || "Untitled", content: content || " ", slug: slug || undefined, excerpt, coverImage });
          if (res.success && res.data) {
            setLastSaved({ title, content, slug: res.data.slug, excerpt: res.data.excerpt, coverImage: res.data.coverImage });
            setSaveStatus("Saved just now");
          }
        }
      } catch {}
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [title, content, slug, excerpt, coverImage, blogId, initialStatus, lastSaved]);

  const handlePublish = async () => {
    if (!title.trim()) {
      showToast("Title is required to publish");
      return;
    }
    
    setSaveStatus(initialStatus === "PUBLISHED" ? "Updating..." : "Publishing...");
    let currentId = blogId;
    
    if (title !== lastSaved.title || content !== lastSaved.content || slug !== lastSaved.slug || excerpt !== lastSaved.excerpt || coverImage !== lastSaved.coverImage) {
      if (!currentId) {
        const res = await createBlog({ title: title || "Untitled", content: content || " ", slug: slug || undefined, excerpt, coverImage });
        if (res.success && res.data) {
           currentId = res.data.id;
           setBlogId(currentId);
           setLastSaved({ title, content, slug: res.data.slug, excerpt: res.data.excerpt, coverImage: res.data.coverImage });
        }
      } else {
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
    <div className="min-h-screen relative bg-[#FFFDF5] dark:bg-[#121214] text-[#171717] dark:text-[#F5F5F5] pb-40"
      onFocus={() => setIsFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsFocused(false);
        }
      }}
    >
      <motion.header 
        animate={{ opacity: isFocused && wordCount > 20 ? 0.2 : 1 }}
        whileHover={{ opacity: 1 }}
        className="fixed top-0 inset-x-0 z-40 p-6 flex items-center justify-between pointer-events-none transition-opacity duration-300"
      >
        <div className="flex items-center gap-4 pointer-events-auto">
          <Link href="/blogs" className="w-10 h-10 rounded-md border-2 border-[#171717] dark:border-[#383838] bg-[#FFE52E] text-[#171717] shadow-[2px_2px_0px_0px_#171717] flex items-center justify-center hover:bg-[#FFD900] active:translate-x-[1px] active:translate-y-[1px] transition-all cursor-pointer">
            <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
          </Link>
          <div className="hidden md:flex flex-col">
            <span className="text-xs font-black text-[#525252] dark:text-[#A3A3A3] uppercase tracking-wider">
              {wordCount} words • {Math.ceil(wordCount / 200)} min read
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 pointer-events-auto">
          <span className="text-xs font-extrabold text-[#525252] dark:text-[#A3A3A3] uppercase tracking-wider mr-2">
            {saveStatus}
          </span>
          <button 
            onClick={() => setIsPreviewMode(!isPreviewMode)}
            className="w-10 h-10 rounded-md border-2 border-[#171717] dark:border-[#383838] bg-[#FFFDF5] dark:bg-[#18181B] text-[#171717] dark:text-[#F5F5F5] shadow-[2px_2px_0px_0px_#171717] hover:bg-[#FFE52E] flex items-center justify-center active:translate-x-[1px] active:translate-y-[1px] transition-all cursor-pointer"
            title={isPreviewMode ? "Edit" : "Preview"}
          >
            {isPreviewMode ? <Edit3 className="w-4 h-4 stroke-[2.5]" /> : <Eye className="w-4 h-4 stroke-[2.5]" />}
          </button>
          <button 
            onClick={() => setShowMetadata(!showMetadata)}
            className={`w-10 h-10 rounded-md border-2 border-[#171717] dark:border-[#383838] shadow-[2px_2px_0px_0px_#171717] flex items-center justify-center active:translate-x-[1px] active:translate-y-[1px] transition-all cursor-pointer ${
              showMetadata
                ? "bg-[#FFE52E] text-[#171717]"
                : "bg-[#FFFDF5] dark:bg-[#18181B] text-[#171717] dark:text-[#F5F5F5] hover:bg-[#FFE52E]"
            }`}
          >
            <Settings2 className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </motion.header>

      <main className="max-w-3xl mx-auto pt-40 px-6">
        <TextareaAutosize
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isPreviewMode}
          className="w-full bg-transparent border-none p-0 text-5xl md:text-6xl font-black focus:outline-none focus:ring-0 placeholder:text-[#A3A3A3] resize-none mb-8 text-[#171717] dark:text-white disabled:opacity-90"
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
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 p-2 flex items-center gap-2 rounded-md border-2 border-[#171717] dark:border-[#383838] bg-[#FFFDF5] dark:bg-[#18181B] shadow-[4px_4px_0px_0px_#171717] dark:shadow-[4px_4px_0px_0px_#000000] pointer-events-auto"
      >
        <button 
          onClick={handlePublish}
          disabled={saveStatus === "Publishing..." || saveStatus === "Updating..."}
          className="px-6 py-2.5 bg-[#FFE52E] text-[#171717] hover:bg-[#FFD900] border-2 border-[#171717] rounded shadow-[2px_2px_0px_0px_#171717] font-black text-sm flex items-center gap-2 disabled:opacity-50 active:translate-x-[1px] active:translate-y-[1px] transition-all cursor-pointer"
        >
          <Sparkles className="w-4 h-4 stroke-[2.5]" />
          {initialStatus === "PUBLISHED" ? "Update" : "Publish"}
        </button>
        <div className="w-0.5 h-6 bg-[#171717] dark:bg-[#383838] mx-1" />
        <button className="w-10 h-10 flex items-center justify-center rounded border border-transparent hover:border-[#171717] hover:bg-[#FFE52E] text-[#171717] dark:text-white transition-all cursor-pointer">
          <MoreHorizontal className="w-4 h-4 stroke-[2.5]" />
        </button>
      </motion.div>

      <AnimatePresence>
        {showMetadata && (
          <motion.div 
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-24 right-6 w-80 p-6 z-50 border-2 border-[#171717] dark:border-[#383838] bg-[#FFFDF5] dark:bg-[#18181B] shadow-[6px_6px_0px_0px_#171717] dark:shadow-[6px_6px_0px_0px_#000000] rounded-md origin-top-right pointer-events-auto"
          >
            <h3 className="text-xs font-black uppercase tracking-wider text-[#171717] dark:text-white mb-6">Article Settings</h3>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#171717] dark:text-[#E5E5E5]">URL Slug</label>
                <input 
                  type="text" 
                  value={slug}
                  onChange={(e) => {
                    setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, '-'));
                    setIsSlugManuallyEdited(true);
                  }}
                  placeholder="/your-title-here"
                  className="w-full bg-[#FFFDF5] dark:bg-[#121214] border-2 border-[#171717] dark:border-[#383838] rounded-md px-3.5 py-2.5 text-sm text-[#171717] dark:text-white placeholder:text-[#A3A3A3] focus:outline-none focus:ring-2 focus:ring-[#FFE52E] font-mono shadow-[2px_2px_0px_0px_#171717]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#171717] dark:text-[#E5E5E5]">Cover Image</label>
                
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/jpeg, image/png, image/webp"
                  className="hidden"
                />

                {coverImage ? (
                  <div className="relative group/img w-full h-32 rounded-md overflow-hidden border-2 border-[#171717] shadow-[2px_2px_0px_0px_#171717]">
                    <img src={coverImage} alt="Cover" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-[#171717]/60 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-4">
                      <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="text-white text-xs font-black underline"
                      >
                        Replace
                      </button>
                      <button 
                        onClick={() => setCoverImage("")}
                        className="text-[#FF6B6B] text-xs font-black underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="w-full h-32 border-2 border-dashed border-[#171717] dark:border-[#383838] bg-[#FFF9D2]/30 dark:bg-[#18181B] rounded-md flex flex-col items-center justify-center text-[#171717] dark:text-white hover:bg-[#FFE52E]/30 transition-all gap-2 group relative overflow-hidden cursor-pointer"
                  >
                    {isUploading ? (
                      <span className="text-xs font-bold animate-pulse">Uploading securely...</span>
                    ) : (
                      <>
                        <ImageIcon className="w-6 h-6 stroke-[2.5]" />
                        <span className="text-xs font-bold uppercase tracking-wider">Upload Image (Max 5MB)</span>
                      </>
                    )}
                  </button>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#171717] dark:text-[#E5E5E5]">Excerpt</label>
                <textarea 
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Brief summary..."
                  className="w-full bg-[#FFFDF5] dark:bg-[#121214] border-2 border-[#171717] dark:border-[#383838] rounded-md px-3.5 py-2.5 text-sm text-[#171717] dark:text-white placeholder:text-[#A3A3A3] focus:outline-none focus:ring-2 focus:ring-[#FFE52E] resize-none h-24 shadow-[2px_2px_0px_0px_#171717]"
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
            className="fixed bottom-24 left-1/2 z-50 px-4 py-2 bg-[#FFE52E] text-[#171717] border-2 border-[#171717] font-black text-xs uppercase tracking-wider rounded-md shadow-[3px_3px_0px_0px_#171717]"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
