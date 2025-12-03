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

    // Parse cover image URL
    let coverUrl = '';
    const imgMatch = html.match(/<img[^>]*id="landingImage"[^>]*src="([^"]+)"/i);
    if (imgMatch) {
      coverUrl = imgMatch[1];
    } else {
      const imgAltMatch = html.match(/<img[^>]*class="[^"]*frontImage[^"]*"[^>]*src="([^"]+)"/i);
      if (imgAltMatch) {
        coverUrl = imgAltMatch[1];
      } else {
        // Try to find any large book cover image
        const anyImgMatch = html.match(/src="(https:\/\/m\.media-amazon\.com\/images\/[^"]+\.jpg)"/i);
        if (anyImgMatch) {
          coverUrl = anyImgMatch[1];
        }
      }
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
