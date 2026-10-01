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
  


  const htmlWithIds = html.replace(/<(h[23])([^>]*)>(.*?)<\/\1>/gi, (match, tag, attributes, content) => {

    const cleanText = content.replace(/<[^>]+>/g, '').trim();
    

    let id = generateId(cleanText);
    

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


    if (attributes.match(/id=['"]/i)) {
      return match; 
    }


    return `<${tag}${attributes} id="${id}">${content}</${tag}>`;
  });

  return { htmlWithIds, headings };
}
