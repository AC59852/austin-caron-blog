import { toHTML } from '@portabletext/to-html';

export function renderPortableText(blocks: any[]) {
  return toHTML(blocks, {
    components: {
      block: {
        h1: ({ children }: any) => `<h1>${children}</h1>`,
        h2: ({ children }: any) => `<h2>${children}</h2>`,
        h3: ({ children }: any) => `<h3>${children}</h3>`,
        normal: ({ children }: any) => `<p>${children}</p>`,
        blockquote: ({ children }: any) => `<blockquote>${children}</blockquote>`,
      },
      marks: {
        strong: ({ children }: any) => `<strong>${children}</strong>`,
        em: ({ children }: any) => `<em>${children}</em>`,
        code: ({ children }: any) => `<code>${children}</code>`,
        underline: ({ children }: any) => `<u>${children}</u>`,
        'strike-through': ({ children }: any) => `<s>${children}</s>`,
        link: ({ children, value }: any) => `<a href="${value?.href}">${children}</a>`,
      },
      list: {
        bullet: ({ children }: any) => `<ul>${children}</ul>`,
        number: ({ children }: any) => `<ol>${children}</ol>`,
      },
      listItem: ({ children }: any) => `<li>${children}</li>`,
    },
  });
}