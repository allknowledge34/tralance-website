"use client";

import * as React from "react";
import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Link as LinkIcon,
  Image as ImageIcon,
  Code,
  Eye,
  RotateCcw,
  Monitor,
  Smartphone,
  ExternalLink,
  Check,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmojiPicker } from "@/components/ui/emoji-picker";
import { sanitizeEmailHtml, isValidImageUrl } from "@/lib/sanitize";

interface EmailComposerProps {
  initialHtml: string;
  onChange: (html: string) => void;
  defaultTemplate: string;
}

export function EmailComposer({ initialHtml, onChange, defaultTemplate }: EmailComposerProps) {
  const [htmlContent, setHtmlContent] = React.useState(initialHtml);
  const [activeTab, setActiveTab] = React.useState<"visual" | "html">("visual");
  const [previewMode, setPreviewMode] = React.useState<"desktop" | "mobile">("desktop");

  // Image modal state
  const [isImageModalOpen, setIsImageModalOpen] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState("");
  const [imageAlt, setImageAlt] = React.useState("");
  const [imageWidth, setImageWidth] = React.useState("100%");
  const [imageAlign, setImageAlign] = React.useState<"center" | "left" | "right">("center");
  const [imageError, setImageError] = React.useState<string | null>(null);

  // Link modal state
  const [isLinkModalOpen, setIsLinkModalOpen] = React.useState(false);
  const [linkUrl, setLinkUrl] = React.useState("https://www.tralance.pro");
  const [linkText, setLinkText] = React.useState("Learn more");

  // Reset confirm
  const [isResetConfirmOpen, setIsResetConfirmOpen] = React.useState(false);

  // Synchronize internal state with parent
  const handleHtmlChange = (newHtml: string) => {
    setHtmlContent(newHtml);
    onChange(newHtml);
  };

  // Insert HTML snippet into the active editor
  const insertSnippet = (snippet: string) => {
    handleHtmlChange(htmlContent + snippet);
  };

  // Formatting helpers
  const applyHeading = (level: 1 | 2) => {
    const tag = level === 1 ? "h1" : "h2";
    const fontSize = level === 1 ? "24px" : "18px";
    insertSnippet(
      `\n<${tag} style="color: #0f172a; font-size: ${fontSize}; font-weight: 700; margin: 24px 0 12px 0;">Heading Text</${tag}>\n`
    );
  };

  const applyParagraph = () => {
    insertSnippet(`\n<p style="margin: 0 0 16px 0; line-height: 1.6; color: #334155;">Enter paragraph text here...</p>\n`);
  };

  const applyButton = () => {
    insertSnippet(
      `\n<div style="text-align: center; margin: 28px 0;">\n  <a href="https://www.tralance.pro" style="background-color: #0f172a; color: #ffffff; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px; display: inline-block;">Get Started</a>\n</div>\n`
    );
  };

  const applyList = (ordered = false) => {
    if (ordered) {
      insertSnippet(
        `\n<ol style="margin: 16px 0; padding-left: 24px; color: #334155; line-height: 1.6;">\n  <li>Step one item</li>\n  <li>Step two item</li>\n</ol>\n`
      );
    } else {
      insertSnippet(
        `\n<ul style="margin: 16px 0; padding-left: 24px; color: #334155; line-height: 1.6;">\n  <li>Feature highlight one</li>\n  <li>Feature highlight two</li>\n</ul>\n`
      );
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!["image/png", "image/jpeg", "image/webp", "image/gif"].includes(file.type)) {
      setImageError("Please upload a PNG, JPEG, WEBP, or GIF image.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setImageError("Image file size must be under 2MB for fast email loading.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result as string);
      setImageError(null);
    };
    reader.readAsDataURL(file);
  };

  const insertImage = () => {
    if (!imageUrl) {
      setImageError("Please provide an image URL or upload a file.");
      return;
    }

    if (!imageUrl.startsWith("data:") && !isValidImageUrl(imageUrl)) {
      setImageError("Image URL must use a secure HTTPS link.");
      return;
    }

    const alt = imageAlt || "Email announcement illustration";
    const widthStyle = imageWidth.includes("%") ? `width: ${imageWidth}; max-width: 100%;` : `width: ${imageWidth}; max-width: 100%;`;
    const snippet = `\n<div style="text-align: ${imageAlign}; margin: 24px 0;">\n  <img src="${imageUrl}" alt="${alt}" style="${widthStyle} height: auto; border-radius: 8px; display: inline-block;" />\n</div>\n`;

    insertSnippet(snippet);
    setIsImageModalOpen(false);
    setImageUrl("");
    setImageAlt("");
    setImageError(null);
  };

  const insertLink = () => {
    if (!linkUrl) return;
    const snippet = ` <a href="${linkUrl}" style="color: #2563eb; text-decoration: underline; font-weight: 500;">${linkText || linkUrl}</a> `;
    insertSnippet(snippet);
    setIsLinkModalOpen(false);
    setLinkText("Learn more");
  };

  const handleResetTemplate = () => {
    handleHtmlChange(defaultTemplate);
    setIsResetConfirmOpen(false);
  };

  const sanitizedPreviewHtml = sanitizeEmailHtml(htmlContent);

  return (
    <div className="space-y-4">
      {/* Top Controls Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2 rounded-xl bg-slate-100 dark:bg-neutral-800/80 border border-slate-200 dark:border-neutral-700/80">
        <div className="flex items-center gap-1 flex-wrap">
          <div className="flex bg-white dark:bg-[#161618] rounded-lg p-0.5 border border-slate-200/80 dark:border-neutral-700">
            <button
              type="button"
              onClick={() => setActiveTab("visual")}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                activeTab === "visual"
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs"
                  : "text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Composer</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("html")}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                activeTab === "html"
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs"
                  : "text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>HTML Source</span>
            </button>
          </div>

          <div className="h-4 w-px bg-slate-300 dark:bg-neutral-700 mx-1" />

          {/* Formatting buttons */}
          <button
            type="button"
            onClick={() => insertSnippet(`<strong>Bold text</strong>`)}
            className="p-1.5 text-slate-600 dark:text-neutral-300 hover:bg-white dark:hover:bg-neutral-700 rounded-lg transition-colors"
            title="Bold"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertSnippet(`<em>Italic text</em>`)}
            className="p-1.5 text-slate-600 dark:text-neutral-300 hover:bg-white dark:hover:bg-neutral-700 rounded-lg transition-colors"
            title="Italic"
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => applyHeading(1)}
            className="p-1.5 text-slate-600 dark:text-neutral-300 hover:bg-white dark:hover:bg-neutral-700 rounded-lg transition-colors"
            title="Heading 1"
          >
            <Heading1 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => applyHeading(2)}
            className="p-1.5 text-slate-600 dark:text-neutral-300 hover:bg-white dark:hover:bg-neutral-700 rounded-lg transition-colors"
            title="Heading 2"
          >
            <Heading2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => applyParagraph()}
            className="px-2 py-1 text-xs font-medium text-slate-600 dark:text-neutral-300 hover:bg-white dark:hover:bg-neutral-700 rounded-lg transition-colors"
            title="Add Paragraph"
          >
            Paragraph
          </button>
          <button
            type="button"
            onClick={() => applyList(false)}
            className="p-1.5 text-slate-600 dark:text-neutral-300 hover:bg-white dark:hover:bg-neutral-700 rounded-lg transition-colors"
            title="Bullet List"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => applyList(true)}
            className="p-1.5 text-slate-600 dark:text-neutral-300 hover:bg-white dark:hover:bg-neutral-700 rounded-lg transition-colors"
            title="Numbered List"
          >
            <ListOrdered className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setIsLinkModalOpen(true)}
            className="p-1.5 text-slate-600 dark:text-neutral-300 hover:bg-white dark:hover:bg-neutral-700 rounded-lg transition-colors"
            title="Insert Link"
          >
            <LinkIcon className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setIsImageModalOpen(true)}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:text-neutral-200 bg-white dark:bg-[#161618] hover:bg-slate-50 dark:hover:bg-neutral-700 border border-slate-200 dark:border-neutral-700 rounded-lg transition-colors shadow-xs"
            title="Insert Image"
          >
            <ImageIcon className="w-3.5 h-3.5 text-blue-500" />
            <span>Image</span>
          </button>
          <button
            type="button"
            onClick={() => applyButton()}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:text-neutral-200 bg-white dark:bg-[#161618] hover:bg-slate-50 dark:hover:bg-neutral-700 border border-slate-200 dark:border-neutral-700 rounded-lg transition-colors shadow-xs"
            title="Add Call to Action Button"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span>CTA Button</span>
          </button>

          {/* Emoji Picker for email body */}
          <EmojiPicker
            buttonLabel="Emoji"
            onSelect={(emoji) => insertSnippet(` ${emoji} `)}
          />
        </div>

        {/* Reset Template */}
        <div>
          <button
            type="button"
            onClick={() => setIsResetConfirmOpen(true)}
            className="flex items-center gap-1 text-xs text-slate-500 hover:text-red-600 dark:hover:text-red-400 p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
            title="Reset to Tralance default template"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Two Column Layout: Editor & Live Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left Column: Editor */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-700 dark:text-neutral-300">
              {activeTab === "visual" ? "Email Content Composer" : "Raw HTML Source"}
            </label>
            <span className="text-[11px] text-slate-400">
              {htmlContent.length} characters
            </span>
          </div>

          <textarea
            required
            rows={16}
            value={htmlContent}
            onChange={(e) => handleHtmlChange(e.target.value)}
            placeholder="Type your email content or use the toolbar above..."
            className="w-full font-mono text-xs p-3.5 bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-xl text-slate-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-neutral-700 resize-y leading-relaxed"
          />
        </div>

        {/* Right Column: Live Email Preview (Always Clean White Canvas) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-700 dark:text-neutral-300">
              Live Recipient Preview
            </span>
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-neutral-800 p-0.5 rounded-lg text-xs">
              <button
                type="button"
                onClick={() => setPreviewMode("desktop")}
                className={`flex items-center gap-1 px-2 py-1 rounded transition-colors ${
                  previewMode === "desktop"
                    ? "bg-white dark:bg-[#161618] text-slate-900 dark:text-white shadow-xs font-semibold"
                    : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Desktop</span>
              </button>
              <button
                type="button"
                onClick={() => setPreviewMode("mobile")}
                className={`flex items-center gap-1 px-2 py-1 rounded transition-colors ${
                  previewMode === "mobile"
                    ? "bg-white dark:bg-[#161618] text-slate-900 dark:text-white shadow-xs font-semibold"
                    : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mobile</span>
              </button>
            </div>
          </div>

          {/* Email Preview Frame — Preserves authentic email background & contrast */}
          <div className="bg-slate-200/70 dark:bg-neutral-900 p-4 rounded-xl border border-slate-200 dark:border-neutral-800 flex justify-center overflow-x-auto min-h-[360px] max-h-[460px] overflow-y-auto">
            <div
              style={{ backgroundColor: "#ffffff", color: "#1e293b" }}
              className={`rounded-xl shadow-lg overflow-hidden transition-all text-left border border-slate-200/80 my-auto ${
                previewMode === "mobile" ? "w-[340px]" : "w-full max-w-[560px]"
              }`}
            >
              <div
                className="p-5 text-sm select-text"
                dangerouslySetInnerHTML={{ __html: sanitizedPreviewHtml }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Image Insertion Modal */}
      {isImageModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#18181b] rounded-2xl p-6 max-w-md w-full border border-slate-200 dark:border-neutral-800 shadow-2xl space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-neutral-800">
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                Insert Image into Email
              </h3>
              <button
                type="button"
                onClick={() => setIsImageModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-neutral-200"
              >
                ✕
              </button>
            </div>

            {imageError && (
              <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 rounded-xl text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{imageError}</span>
              </div>
            )}

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-neutral-300 mb-1">
                  Upload Image File (PNG, JPG, WEBP, GIF &lt; 2MB)
                </label>
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/gif"
                  onChange={handleImageUpload}
                  className="w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-slate-900 file:text-white dark:file:bg-white dark:file:text-slate-900 cursor-pointer"
                />
              </div>

              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-slate-200 dark:border-neutral-800" />
                <span className="flex-shrink mx-3 text-slate-400 text-[11px]">OR VIA HTTPS URL</span>
                <div className="flex-grow border-t border-slate-200 dark:border-neutral-800" />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-neutral-300 mb-1">
                  Hosted Image URL (Must start with https://)
                </label>
                <input
                  type="url"
                  placeholder="https://example.com/images/banner.png"
                  value={imageUrl.startsWith("data:") ? "" : imageUrl}
                  onChange={(e) => {
                    setImageUrl(e.target.value);
                    setImageError(null);
                  }}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-xl text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-neutral-300 mb-1">
                  Alt Text (for accessibility & email filters)
                </label>
                <input
                  type="text"
                  placeholder="e.g. October Feature Banner"
                  value={imageAlt}
                  onChange={(e) => setImageAlt(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-xl text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-neutral-300 mb-1">
                    Image Width
                  </label>
                  <select
                    value={imageWidth}
                    onChange={(e) => setImageWidth(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-xl text-slate-900 dark:text-white"
                  >
                    <option value="100%">Full Width (100%)</option>
                    <option value="80%">80% Width</option>
                    <option value="50%">50% Width</option>
                    <option value="400px">Fixed 400px</option>
                    <option value="250px">Fixed 250px</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-neutral-300 mb-1">
                    Alignment
                  </label>
                  <select
                    value={imageAlign}
                    onChange={(e) => setImageAlign(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-xl text-slate-900 dark:text-white"
                  >
                    <option value="center">Centered</option>
                    <option value="left">Left Aligned</option>
                    <option value="right">Right Aligned</option>
                  </select>
                </div>
              </div>

              {/* Preview uploaded / linked image */}
              {imageUrl && (
                <div className="p-2 border border-slate-200 dark:border-neutral-800 rounded-xl bg-slate-50 dark:bg-neutral-900 flex justify-center max-h-32 overflow-hidden">
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="max-h-28 object-contain rounded"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-neutral-800">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsImageModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="button" size="sm" onClick={insertImage}>
                Insert into Email
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Link Insertion Modal */}
      {isLinkModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#18181b] rounded-2xl p-6 max-w-sm w-full border border-slate-200 dark:border-neutral-800 shadow-2xl space-y-4">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              Insert Link
            </h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-neutral-300 mb-1">
                  Destination URL
                </label>
                <input
                  type="url"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://www.tralance.pro/pricing"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-xl text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 dark:text-neutral-300 mb-1">
                  Link Anchor Text
                </label>
                <input
                  type="text"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  placeholder="Learn more"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-xl text-slate-900 dark:text-white"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-neutral-800">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsLinkModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="button" size="sm" onClick={insertLink}>
                Add Link
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Reset Template Confirmation Modal */}
      {isResetConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#18181b] rounded-2xl p-6 max-w-sm w-full border border-slate-200 dark:border-neutral-800 shadow-2xl space-y-3 text-sm">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              Reset Template?
            </h3>
            <p className="text-xs text-slate-500 dark:text-neutral-400">
              This will overwrite your current draft with the standard Tralance announcement email template.
            </p>
            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-neutral-800">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsResetConfirmOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="danger"
                size="sm"
                onClick={handleResetTemplate}
              >
                Reset to Default
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
