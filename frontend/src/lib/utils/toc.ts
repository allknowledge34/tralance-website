export interface Heading {
  id: string;
  text: string;
  level: number;
}

export function generateId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

export function parseTOC(html: string): { htmlWithIds: string; headings: Heading[] } {
  const headings: Heading[] = [];
  
  // Regex to match <h2> and <h3> tags and extract their content
  // We use gi for global and case-insensitive
  const htmlWithIds = html.replace(/<(h[23])([^>]*)>(.*?)<\/\1>/gi, (match, tag, attributes, content) => {
    // Strip nested tags from content to get clean text for the TOC
    const cleanText = content.replace(/<[^>]+>/g, '').trim();
    
    // Generate a slug-like ID
    let id = generateId(cleanText);
    
    // Ensure unique IDs if there are duplicates
    let count = 1;
    const originalId = id;
    while (headings.find(h => h.id === id)) {
      id = `${originalId}-${count}`;
      count++;
    }

    headings.push({
      id,
      text: cleanText,
      level: parseInt(tag.charAt(1), 10),
    });

    // Check if attributes already contain an ID (rare but possible if Tiptap is customized)
    if (attributes.match(/id=['"]/i)) {
      return match; 
    }

    // Inject the ID into the heading tag
    return `<${tag}${attributes} id="${id}">${content}</${tag}>`;
  });

  return { htmlWithIds, headings };
}
