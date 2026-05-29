import { urlForImage } from './url-for-image.ts';

export function renderImageBlock(block: any) {
  if (!block || !block.image) {
    console.warn('Missing image in block:', block);
    return '';
  }

  try {
    const imageUrl = urlForImage(block.image)
      .width(800)
      .quality(80)
      .url();

    const caption = block.caption ? `<figcaption>${block.caption}</figcaption>` : '';

    return `
      <figure class="my-8">
        <img 
          src="${imageUrl}" 
          alt="${block.altText || ''}"
          class="w-full h-auto rounded"
        />
        ${caption}
      </figure>
    `;
  } catch (error) {
    console.error('Error rendering image block:', error, block);
    return '';
  }
}