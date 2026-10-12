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

  const [isImageModalOpen, setIsImageModalOpen] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState("");
  const [imageAlt, setImageAlt] = React.useState("");
  const [imageWidth, setImageWidth] = React.useState("100%");
  const [imageAlign, setImageAlign] = React.useState<"center" | "left" | "right">("center");
  const [imageError, setImageError] = React.useState<string | null>(null);

  const [isLinkModalOpen, setIsLinkModalOpen] = React.useState(false);
  const [linkUrl, setLinkUrl] = React.useState("https://www.tralance.pro");
  const [linkText, setLinkText] = React.useState("Learn more");

  const [isResetConfirmOpen, setIsResetConfirmOpen] = React.useState(false);

  const handleHtmlChange = (newHtml: string) => {
    setHtmlContent(newHtml);
    onChange(newHtml);
  };

  const insertSnippet = (snippet: string) => {
    handleHtmlChange(htmlContent + snippet);
  };

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
      <div className="flex flex-wrap items-center justify-between gap-2 p-2 rounded-md bg-[#FFFDF5] dark:bg-[#18181B] border-2 border-[#171717] dark:border-[#383838] shadow-[3px_3px_0px_0px_#171717] dark:shadow-[3px_3px_0px_0px_#000000]">
        <div className="flex items-center gap-1 flex-wrap">
          <div className="flex bg-[#FFF9D2] dark:bg-[#222226] rounded border-2 border-[#171717] dark:border-[#383838] p-0.5">
            <button
              type="button"
              onClick={() => setActiveTab("visual")}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded transition-all cursor-pointer ${
                activeTab === "visual"
                  ? "bg-[#FFE52E] text-[#171717] border border-[#171717] shadow-[1px_1px_0px_0px_#171717]"
                  : "text-[#525252] dark:text-[#A3A3A3] hover:text-[#171717] dark:hover:text-white"
              }`}
            >
              <Eye className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Composer</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("html")}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded transition-all cursor-pointer ${
                activeTab === "html"
                  ? "bg-[#FFE52E] text-[#171717] border border-[#171717] shadow-[1px_1px_0px_0px_#171717]"
                  : "text-[#525252] dark:text-[#A3A3A3] hover:text-[#171717] dark:hover:text-white"
              }`}
            >
              <Code className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>HTML Source</span>
            </button>
          </div>

          <div className="h-5 w-0.5 bg-[#171717] dark:bg-[#383838] mx-1" />

          <button
            type="button"
            onClick={() => insertSnippet(`<strong>Bold text</strong>`)}
            className="p-1.5 text-[#171717] dark:text-[#E5E5E5] hover:bg-[#FFE52E] rounded border border-transparent hover:border-[#171717] transition-all cursor-pointer"
            title="Bold"
          >
            <Bold className="w-4 h-4 stroke-[2.5]" />
          </button>
          <button
            type="button"
            onClick={() => insertSnippet(`<em>Italic text</em>`)}
            className="p-1.5 text-[#171717] dark:text-[#E5E5E5] hover:bg-[#FFE52E] rounded border border-transparent hover:border-[#171717] transition-all cursor-pointer"
            title="Italic"
          >
            <Italic className="w-4 h-4 stroke-[2.5]" />
          </button>
          <button
            type="button"
            onClick={() => applyHeading(1)}
            className="p-1.5 text-[#171717] dark:text-[#E5E5E5] hover:bg-[#FFE52E] rounded border border-transparent hover:border-[#171717] transition-all cursor-pointer"
            title="Heading 1"
          >
            <Heading1 className="w-4 h-4 stroke-[2.5]" />
          </button>
          <button
            type="button"
            onClick={() => applyHeading(2)}
            className="p-1.5 text-[#171717] dark:text-[#E5E5E5] hover:bg-[#FFE52E] rounded border border-transparent hover:border-[#171717] transition-all cursor-pointer"
            title="Heading 2"
          >
            <Heading2 className="w-4 h-4 stroke-[2.5]" />
          </button>
          <button
            type="button"
            onClick={() => applyParagraph()}
            className="px-2 py-1 text-xs font-bold text-[#171717] dark:text-[#E5E5E5] hover:bg-[#FFE52E] rounded border border-transparent hover:border-[#171717] transition-all cursor-pointer"
            title="Add Paragraph"
          >
            Paragraph
          </button>
          <button
            type="button"
            onClick={() => applyList(false)}
            className="p-1.5 text-[#171717] dark:text-[#E5E5E5] hover:bg-[#FFE52E] rounded border border-transparent hover:border-[#171717] transition-all cursor-pointer"
            title="Bullet List"
          >
            <List className="w-4 h-4 stroke-[2.5]" />
          </button>
          <button
            type="button"
            onClick={() => applyList(true)}
            className="p-1.5 text-[#171717] dark:text-[#E5E5E5] hover:bg-[#FFE52E] rounded border border-transparent hover:border-[#171717] transition-all cursor-pointer"
            title="Numbered List"
          >
            <ListOrdered className="w-4 h-4 stroke-[2.5]" />
          </button>
          <button
            type="button"
            onClick={() => setIsLinkModalOpen(true)}
            className="p-1.5 text-[#171717] dark:text-[#E5E5E5] hover:bg-[#FFE52E] rounded border border-transparent hover:border-[#171717] transition-all cursor-pointer"
            title="Insert Link"
          >
            <LinkIcon className="w-4 h-4 stroke-[2.5]" />
          </button>
          <button
            type="button"
            onClick={() => setIsImageModalOpen(true)}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold text-[#171717] dark:text-white bg-[#FFFDF5] dark:bg-[#18181B] hover:bg-[#FFE52E] border-2 border-[#171717] dark:border-[#383838] rounded-md shadow-[1.5px_1.5px_0px_0px_#171717] transition-all cursor-pointer"
            title="Insert Image"
          >
            <ImageIcon className="w-3.5 h-3.5 text-[#35B9F5] stroke-[2.5]" />
            <span>Image</span>
          </button>
          <button
            type="button"
            onClick={() => applyButton()}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold text-[#171717] dark:text-white bg-[#FFFDF5] dark:bg-[#18181B] hover:bg-[#FFE52E] border-2 border-[#171717] dark:border-[#383838] rounded-md shadow-[1.5px_1.5px_0px_0px_#171717] transition-all cursor-pointer"
            title="Add Call to Action Button"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FFE52E] stroke-[2.5]" />
            <span>CTA Button</span>
          </button>

          <EmojiPicker
            buttonLabel="Emoji"
            onSelect={(emoji) => insertSnippet(` ${emoji} `)}
          />
        </div>

        <div>
          <button
            type="button"
            onClick={() => setIsResetConfirmOpen(true)}
            className="flex items-center gap-1 text-xs font-bold text-[#171717] dark:text-[#FF6B6B] hover:bg-[#FF6B6B] hover:text-[#171717] p-1.5 rounded border border-transparent hover:border-[#171717] transition-all cursor-pointer"
            title="Reset to Tralance default template"
          >
            <RotateCcw className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-[#171717] dark:text-[#E5E5E5]">
              {activeTab === "visual" ? "Email Content Composer" : "Raw HTML Source"}
            </label>
            <span className="text-[11px] font-bold text-[#525252] dark:text-[#A3A3A3]">
              {htmlContent.length} characters
            </span>
          </div>

          <textarea
            required
            rows={16}
            value={htmlContent}
            onChange={(e) => handleHtmlChange(e.target.value)}
            placeholder="Type your email content or use the toolbar above..."
            className="w-full font-mono text-xs p-3.5 bg-[#FFFDF5] dark:bg-[#18181B] border-2 border-[#171717] dark:border-[#383838] rounded-md text-[#171717] dark:text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#FFE52E] shadow-[2px_2px_0px_0px_#171717] dark:shadow-[2px_2px_0px_0px_#000000] resize-y leading-relaxed"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#171717] dark:text-[#E5E5E5]">
              Live Recipient Preview
            </span>
            <div className="flex items-center gap-1 bg-[#FFFDF5] dark:bg-[#18181B] border-2 border-[#171717] dark:border-[#383838] p-0.5 rounded shadow-[1.5px_1.5px_0px_0px_#171717] text-xs font-bold">
              <button
                type="button"
                onClick={() => setPreviewMode("desktop")}
                className={`flex items-center gap-1 px-2 py-0.5 rounded transition-all cursor-pointer ${
                  previewMode === "desktop"
                    ? "bg-[#FFE52E] text-[#171717] border border-[#171717] font-black"
                    : "text-[#525252] dark:text-[#A3A3A3] hover:text-[#171717] dark:hover:text-white"
                }`}
              >
                <Monitor className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Desktop</span>
              </button>
              <button
                type="button"
                onClick={() => setPreviewMode("mobile")}
                className={`flex items-center gap-1 px-2 py-0.5 rounded transition-all cursor-pointer ${
                  previewMode === "mobile"
                    ? "bg-[#FFE52E] text-[#171717] border border-[#171717] font-black"
                    : "text-[#525252] dark:text-[#A3A3A3] hover:text-[#171717] dark:hover:text-white"
                }`}
              >
                <Smartphone className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Mobile</span>
              </button>
            </div>
          </div>

          <div className="bg-[#FFF9D2]/30 dark:bg-[#141416] p-4 rounded-md border-2 border-[#171717] dark:border-[#383838] shadow-[3px_3px_0px_0px_#171717] dark:shadow-[3px_3px_0px_0px_#000000] flex justify-center overflow-x-auto min-h-[360px] max-h-[460px] overflow-y-auto">
            <div
              style={{ backgroundColor: "#ffffff", color: "#1e293b" }}
              className={`rounded-md shadow-[4px_4px_0px_0px_#171717] overflow-hidden transition-all text-left border-2 border-[#171717] my-auto ${
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

      {isImageModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#171717]/60 dark:bg-black/80 animate-in fade-in duration-150">
          <div className="bg-[#FFFDF5] dark:bg-[#18181B] rounded-lg p-6 max-w-md w-full border-2 border-[#171717] dark:border-[#383838] shadow-[8px_8px_0px_0px_#171717] dark:shadow-[8px_8px_0px_0px_#000000] space-y-4">
            <div className="flex justify-between items-center pb-2 border-b-2 border-[#171717] dark:border-[#383838]">
              <h3 className="text-base font-extrabold text-[#171717] dark:text-white">
                Insert Image into Email
              </h3>
              <button
                type="button"
                onClick={() => setIsImageModalOpen(false)}
                className="p-1 rounded border border-[#171717] bg-[#FFE52E] text-[#171717] shadow-[1px_1px_0px_0px_#171717] cursor-pointer"
              >
                ✕
              </button>
            </div>

            {imageError && (
              <div className="p-3 bg-[#FF6B6B] border-2 border-[#171717] rounded-md text-[#171717] text-xs font-bold shadow-[2px_2px_0px_0px_#171717] flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 stroke-[2.5]" />
                <span>{imageError}</span>
              </div>
            )}

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold uppercase tracking-wider text-[#171717] dark:text-[#E5E5E5] mb-1">
                  Upload Image File (PNG, JPG, WEBP, GIF &lt; 2MB)
                </label>
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/gif"
                  onChange={handleImageUpload}
                  className="w-full text-xs font-semibold text-[#171717] dark:text-white file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-2 file:border-[#171717] file:text-xs file:font-black file:bg-[#FFE52E] file:text-[#171717] file:shadow-[1.5px_1.5px_0px_0px_#171717] cursor-pointer"
                />
              </div>

              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t-2 border-[#171717] dark:border-[#383838]" />
                <span className="flex-shrink mx-3 text-[#525252] dark:text-[#A3A3A3] text-[11px] font-black uppercase tracking-wider">OR VIA HTTPS URL</span>
                <div className="flex-grow border-t-2 border-[#171717] dark:border-[#383838]" />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-[#171717] dark:text-[#E5E5E5] mb-1">
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
                  className="w-full px-3 py-2 bg-[#FFFDF5] dark:bg-[#18181B] border-2 border-[#171717] dark:border-[#383838] rounded-md text-[#171717] dark:text-white font-medium shadow-[2px_2px_0px_0px_#171717] dark:shadow-[2px_2px_0px_0px_#000000]"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-[#171717] dark:text-[#E5E5E5] mb-1">
                  Alt Text (for accessibility & email filters)
                </label>
                <input
                  type="text"
                  placeholder="e.g. October Feature Banner"
                  value={imageAlt}
                  onChange={(e) => setImageAlt(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FFFDF5] dark:bg-[#18181B] border-2 border-[#171717] dark:border-[#383838] rounded-md text-[#171717] dark:text-white font-medium shadow-[2px_2px_0px_0px_#171717] dark:shadow-[2px_2px_0px_0px_#000000]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-[#171717] dark:text-[#E5E5E5] mb-1">
                    Image Width
                  </label>
                  <select
                    value={imageWidth}
                    onChange={(e) => setImageWidth(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FFFDF5] dark:bg-[#18181B] border-2 border-[#171717] dark:border-[#383838] rounded-md text-[#171717] dark:text-white font-bold shadow-[2px_2px_0px_0px_#171717] dark:shadow-[2px_2px_0px_0px_#000000]"
                  >
                    <option value="100%">Full Width (100%)</option>
                    <option value="80%">80% Width</option>
                    <option value="50%">50% Width</option>
                    <option value="400px">Fixed 400px</option>
                    <option value="250px">Fixed 250px</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-[#171717] dark:text-[#E5E5E5] mb-1">
                    Alignment
                  </label>
                  <select
                    value={imageAlign}
                    onChange={(e) => setImageAlign(e.target.value as any)}
                    className="w-full px-3 py-2 bg-[#FFFDF5] dark:bg-[#18181B] border-2 border-[#171717] dark:border-[#383838] rounded-md text-[#171717] dark:text-white font-bold shadow-[2px_2px_0px_0px_#171717] dark:shadow-[2px_2px_0px_0px_#000000]"
                  >
                    <option value="center">Centered</option>
                    <option value="left">Left Aligned</option>
                    <option value="right">Right Aligned</option>
                  </select>
                </div>
              </div>

              {imageUrl && (
                <div className="p-2 border-2 border-[#171717] dark:border-[#383838] rounded-md bg-[#FFF9D2] dark:bg-[#202024] flex justify-center max-h-32 overflow-hidden shadow-[2px_2px_0px_0px_#171717]">
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="max-h-28 object-contain rounded"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t-2 border-[#171717] dark:border-[#383838]">
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

      {isLinkModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#171717]/60 dark:bg-black/80 animate-in fade-in duration-150">
          <div className="bg-[#FFFDF5] dark:bg-[#18181B] rounded-lg p-6 max-w-sm w-full border-2 border-[#171717] dark:border-[#383838] shadow-[8px_8px_0px_0px_#171717] dark:shadow-[8px_8px_0px_0px_#000000] space-y-4">
            <h3 className="text-base font-extrabold text-[#171717] dark:text-white">
              Insert Link
            </h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold uppercase tracking-wider text-[#171717] dark:text-[#E5E5E5] mb-1">
                  Destination URL
                </label>
                <input
                  type="url"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://www.tralance.pro/pricing"
                  className="w-full px-3 py-2 bg-[#FFFDF5] dark:bg-[#18181B] border-2 border-[#171717] dark:border-[#383838] rounded-md text-[#171717] dark:text-white font-medium shadow-[2px_2px_0px_0px_#171717]"
                />
              </div>
              <div>
                <label className="block font-bold uppercase tracking-wider text-[#171717] dark:text-[#E5E5E5] mb-1">
                  Link Anchor Text
                </label>
                <input
                  type="text"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  placeholder="Learn more"
                  className="w-full px-3 py-2 bg-[#FFFDF5] dark:bg-[#18181B] border-2 border-[#171717] dark:border-[#383838] rounded-md text-[#171717] dark:text-white font-medium shadow-[2px_2px_0px_0px_#171717]"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-3 border-t-2 border-[#171717] dark:border-[#383838]">
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

      {isResetConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#171717]/60 dark:bg-black/80 animate-in fade-in duration-150">
          <div className="bg-[#FFFDF5] dark:bg-[#18181B] rounded-lg p-6 max-w-sm w-full border-2 border-[#171717] dark:border-[#383838] shadow-[8px_8px_0px_0px_#171717] dark:shadow-[8px_8px_0px_0px_#000000] space-y-3 text-sm">
            <h3 className="text-base font-extrabold text-[#171717] dark:text-white">
              Reset Template?
            </h3>
            <p className="text-xs font-medium text-[#525252] dark:text-[#A3A3A3]">
              This will overwrite your current draft with the standard Tralance announcement email template.
            </p>
            <div className="flex justify-end gap-2 pt-3 border-t-2 border-[#171717] dark:border-[#383838]">
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
