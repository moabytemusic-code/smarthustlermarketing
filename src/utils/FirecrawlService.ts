const API_KEY_STORAGE_KEY = 'firecrawl_api_key';

export class FirecrawlService {
  static saveApiKey(apiKey: string): void {
    localStorage.setItem(API_KEY_STORAGE_KEY, apiKey);
  }

  static getApiKey(): string | null {
    return localStorage.getItem(API_KEY_STORAGE_KEY);
  }

  static clearApiKey(): void {
    localStorage.removeItem(API_KEY_STORAGE_KEY);
  }

  static async scrapeUrl(
    url: string
  ): Promise<{ success: boolean; error?: string; data?: any }> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      return { success: false, error: 'API key not found' };
    }

    try {
      const response = await fetch('https://api.firecrawl.dev/v1/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          url,
          formats: ['markdown', 'html'],
          onlyMainContent: true,
          waitFor: 2000,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return { 
          success: false, 
          error: errorData.message || `HTTP ${response.status}` 
        };
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Scrape failed',
      };
    }
  }
}

export const parseAmazonBookData = (
  html: string,
  markdown: string,
  url: string
): { title: string; author: string; coverUrl: string; description: string } | null => {
  try {
    // Parse title from HTML
    let title = '';
    const titleMatch = html.match(/<span[^>]*id="productTitle"[^>]*>([^<]+)<\/span>/i);
    if (titleMatch) {
      title = titleMatch[1].trim();
    } else {
      // Fallback: try to get from markdown
      const mdTitleMatch = markdown.match(/^#\s*(.+)$/m);
      if (mdTitleMatch) {
        title = mdTitleMatch[1].trim();
      }
    }

    // Parse author
    let author = '';
    const authorMatch = html.match(/class="author[^"]*"[^>]*>[\s\S]*?<a[^>]*>([^<]+)<\/a>/i);
    if (authorMatch) {
      author = authorMatch[1].trim();
    } else {
      const byLineMatch = html.match(/bylineInfo[^>]*>[\s\S]*?<a[^>]*>([^<]+)<\/a>/i);
      if (byLineMatch) {
        author = byLineMatch[1].trim();
      } else {
        // Markdown fallback
        const mdAuthorMatch = markdown.match(/by\s+\[?([^\]\n]+)\]?/i);
        if (mdAuthorMatch) {
          author = mdAuthorMatch[1].replace(/\[|\]/g, '').trim();
        }
      }
    }

    // Parse cover image URL - try multiple patterns
    let coverUrl = '';
    
    // Try landing image first (main product image)
    const landingImgMatch = html.match(/<img[^>]*id="landingImage"[^>]*src="([^"]+)"/i) ||
                            html.match(/id="landingImage"[^>]*src="([^"]+)"/i);
    if (landingImgMatch) {
      coverUrl = landingImgMatch[1];
    }
    
    // Try imgBlkFront (common for book covers)
    if (!coverUrl) {
      const blkFrontMatch = html.match(/<img[^>]*id="imgBlkFront"[^>]*src="([^"]+)"/i) ||
                            html.match(/id="imgBlkFront"[^>]*src="([^"]+)"/i);
      if (blkFrontMatch) {
        coverUrl = blkFrontMatch[1];
      }
    }
    
    // Try ebooksImgBlkFront for Kindle books
    if (!coverUrl) {
      const ebookMatch = html.match(/<img[^>]*id="ebooksImgBlkFront"[^>]*src="([^"]+)"/i);
      if (ebookMatch) {
        coverUrl = ebookMatch[1];
      }
    }
    
    // Try data-a-dynamic-image attribute (contains JSON with image URLs)
    if (!coverUrl) {
      const dynamicImgMatch = html.match(/data-a-dynamic-image="([^"]+)"/i);
      if (dynamicImgMatch) {
        try {
          const decoded = dynamicImgMatch[1].replace(/&quot;/g, '"');
          const imgObj = JSON.parse(decoded);
          const urls = Object.keys(imgObj);
          // Get the largest image (usually last in the object)
          if (urls.length > 0) {
            coverUrl = urls[urls.length - 1] || urls[0];
          }
        } catch (e) {
          // JSON parse failed, continue to next pattern
        }
      }
    }
    
    // Try markdown image pattern
    if (!coverUrl) {
      const mdImgMatch = markdown.match(/!\[.*?\]\((https:\/\/[^\s)]+(?:amazon|media-amazon)[^\s)]+\.(?:jpg|jpeg|png|webp)[^\s)]*)\)/i);
      if (mdImgMatch) {
        coverUrl = mdImgMatch[1];
      }
    }
    
    // Fallback: find any Amazon media image URL
    if (!coverUrl) {
      const amazonImgMatch = html.match(/(?:src|href)="(https:\/\/(?:m\.media-amazon|images-na\.ssl-images-amazon|images-eu\.ssl-images-amazon)\.com\/images\/[^"]+\.(?:jpg|jpeg|png|webp)[^"]*)"/i);
      if (amazonImgMatch) {
        coverUrl = amazonImgMatch[1];
      }
    }
    
    // Clean up the URL - decode HTML entities
    if (coverUrl) {
      coverUrl = coverUrl
        .replace(/&amp;/g, '&')
        .replace(/&#x27;/g, "'")
        .replace(/&quot;/g, '"');
    }

    // Parse description
    let description = '';
    const descMatch = html.match(/bookDescription_feature_div[^>]*>[\s\S]*?<span[^>]*>[\s\S]*?<span[^>]*>([\s\S]*?)<\/span>/i);
    if (descMatch) {
      description = descMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 500);
    } else {
      // Markdown fallback - get first substantial paragraph
      const mdDescMatch = markdown.match(/(?:^|\n)(?!#)(.{50,300})/);
      if (mdDescMatch) {
        description = mdDescMatch[1].trim();
      }
    }

    if (!title && !author && !coverUrl) {
      return null;
    }

    return {
      title: title || 'Unknown Title',
      author: author || 'Unknown Author',
      coverUrl: coverUrl || '',
      description: description || '',
    };
  } catch (error) {
    console.error('Error parsing Amazon data:', error);
    return null;
  }
};
