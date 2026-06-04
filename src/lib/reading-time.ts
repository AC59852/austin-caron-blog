/**
 * src/lib/reading-time.ts
 *
 * Estimates reading time from Sanity pageBlocks at build time.
 *
 * WHY THIS IS AN SEO CONCERN:
 * Reading time improves dwell time — users who know how long a post takes are
 * more likely to commit to reading it and less likely to bounce. Dwell time
 * is an indirect ranking signal: Google uses time-on-page as a proxy for
 * whether the content satisfied the searcher's intent.
 *
 * The result is also passed to JSON-LD as `timeRequired` (ISO 8601 duration),
 * which some content aggregators and Google's Knowledge Graph use to surface
 * content appropriate for a reader's available time.
 */

const WORDS_PER_MINUTE = 238; // Widely-cited average adult reading speed

// Each image block adds ~12 seconds of viewing time.
// Modelled as 48 word-equivalents at the average reading speed.
const IMAGE_WORD_EQUIVALENT = 48;

export interface ReadingTimeResult {
  /** Rounded-up minutes. Minimum 1. */
  minutes: number;
  /** Raw word count (excluding image equivalents). */
  words: number;
  /** ISO 8601 duration string for use in JSON-LD timeRequired. e.g. "PT4M" */
  iso: string;
}

/**
 * Estimates reading time from an array of Sanity pageBlocks.
 *
 * Supported block types:
 *  - textBlock  → counts words in all portable-text children
 *  - imageBlock → adds IMAGE_WORD_EQUIVALENT per image
 *  - heroBlock  → counted via its title/subtitle strings
 *
 * @param pageBlocks - The pageBlocks array from the Sanity post query
 */
export function estimateReadingTime(pageBlocks: any[]): ReadingTimeResult {
  let wordCount = 0;
  let imageEquivalents = 0;

  for (const block of pageBlocks ?? []) {
    switch (block._type) {
      case "textBlock": {
        if (!block.content) break;
        for (const contentBlock of block.content) {
          if (contentBlock._type === "block" && contentBlock.children) {
            for (const child of contentBlock.children) {
              if (typeof child.text === "string") {
                wordCount += child.text.trim().split(/\s+/).filter(Boolean).length;
              }
            }
          }
        }
        break;
      }

      case "imageBlock": {
        // Count the image itself plus caption/altText word contributions
        imageEquivalents += IMAGE_WORD_EQUIVALENT;
        if (typeof block.caption === "string") {
          wordCount += block.caption.trim().split(/\s+/).filter(Boolean).length;
        }
        break;
      }

      case "heroBlock": {
        // Hero title and subtitle contribute to overall read length
        if (typeof block.title === "string") {
          wordCount += block.title.trim().split(/\s+/).filter(Boolean).length;
        }
        if (typeof block.subtitle === "string") {
          wordCount += block.subtitle.trim().split(/\s+/).filter(Boolean).length;
        }
        break;
      }
    }
  }

  const totalWords = wordCount + imageEquivalents;
  const minutes = Math.max(1, Math.ceil(totalWords / WORDS_PER_MINUTE));

  return {
    minutes,
    words: wordCount,
    iso: `PT${minutes}M`,
  };
}