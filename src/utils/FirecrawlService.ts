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
    
    // First, try to find the main product image by looking for data-a-image-name="landingImage"
    const mainImageMatch = html.match(/data-a-image-name="landingImage"[^>]*src="([^"]+)"/i) ||
                           html.match(/id="landingImage"[^>]*data-a-dynamic-image="([^"]+)"/i);
    if (mainImageMatch) {
      const match = mainImageMatch[1];
      // Check if it's a dynamic image JSON
      if (match.includes('&quot;') || match.startsWith('{')) {
        try {
          const decoded = match.replace(/&quot;/g, '"');
          const imgObj = JSON.parse(decoded);
          const urls = Object.keys(imgObj);
          // Get the largest image
          if (urls.length > 0) {
            // Sort by size and get the largest
            const sorted = urls.sort((a, b) => {
              const sizeA = imgObj[a]?.[0] || 0;
              const sizeB = imgObj[b]?.[0] || 0;
              return sizeB - sizeA;
            });
            coverUrl = sorted[0];
          }
        } catch (e) {
          coverUrl = match;
        }
      } else {
        coverUrl = match;
      }
    }
    
    // Try data-old-hires attribute for high-res image
    if (!coverUrl) {
      const hiresMatch = html.match(/id="landingImage"[^>]*data-old-hires="([^"]+)"/i);
      if (hiresMatch) {
        coverUrl = hiresMatch[1];
      }
    }
    
    // Try direct landingImage src
    if (!coverUrl) {
      const landingImgMatch = html.match(/id="landingImage"[^>]*src="([^"]+)"/i);
      if (landingImgMatch) {
        coverUrl = landingImgMatch[1];
      }
    }
    
    // Try imgBlkFront (common for book covers)
    if (!coverUrl) {
      const blkFrontMatch = html.match(/id="imgBlkFront"[^>]*src="([^"]+)"/i);
      if (blkFrontMatch) {
        coverUrl = blkFrontMatch[1];
      }
    }
    
    // Try ebooksImgBlkFront for Kindle books
    if (!coverUrl) {
      const ebookMatch = html.match(/id="ebooksImgBlkFront"[^>]*src="([^"]+)"/i);
      if (ebookMatch) {
        coverUrl = ebookMatch[1];
      }
    }
    
    // Try to find the main image container's dynamic image data
    if (!coverUrl) {
      const dynamicImgMatch = html.match(/id="main-image-container"[\s\S]*?data-a-dynamic-image="([^"]+)"/i);
      if (dynamicImgMatch) {
        try {
          const decoded = dynamicImgMatch[1].replace(/&quot;/g, '"');
          const imgObj = JSON.parse(decoded);
          const urls = Object.keys(imgObj);
          if (urls.length > 0) {
            coverUrl = urls[0];
          }
        } catch (e) {
          // JSON parse failed
        }
      }
    }
    
    // Fallback: find Amazon media image with book-cover-like dimensions
    if (!coverUrl) {
      const amazonImgMatch = html.match(/src="(https:\/\/m\.media-amazon\.com\/images\/I\/[A-Za-z0-9+]+L\.[^"]+)"/i);
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
