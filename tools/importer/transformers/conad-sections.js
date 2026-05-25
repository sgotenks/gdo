/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: Conad section breaks and section metadata.
 * Inserts <hr> between sections and adds Section Metadata blocks for styled sections.
 * Runs only in afterTransform. Uses payload.template.sections from page-templates.json.
 *
 * Section selectors (from page-templates.json, validated against migration-work/cleaned.html):
 *   section-1: section.rl1-layout__item:has(#rc100-hero-4606449)
 *   section-2: section.rl1-layout__item:has(#rc137-strillo-app-429211653) [style: "accent"]
 *   section-3: section.rl1-layout__item:has(.rt138-richtext-section)
 *   section-4: section.rl1-layout__item:has(#rc104-service-banner-140342423)
 *   section-5: section.rl1-layout__item:has(#rc106-lancio-1497915825)
 *   section-6: section.rl1-layout__item:has(#rc106-lancio-299779392)
 *   section-7: section.rl1-layout__item:has(#rc106-lancio-2109453761)
 *   section-8: section.rl1-layout__item:has(#rc1-richtext-298676983)
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.afterTransform) {
    const sections = payload && payload.template && payload.template.sections;
    if (!sections || sections.length < 2) return;

    const document = element.ownerDocument;

    // Process sections in reverse order to avoid position shifts
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      const sectionEl = element.querySelector(section.selector);

      if (!sectionEl) continue;

      // Add Section Metadata block after the section element if it has a style
      if (section.style) {
        const sectionMetadata = WebImporter.Blocks.createBlock(document, {
          name: 'Section Metadata',
          cells: { style: section.style },
        });
        sectionEl.after(sectionMetadata);
      }

      // Insert <hr> before non-first sections to create section breaks
      if (i > 0) {
        const hr = document.createElement('hr');
        sectionEl.before(hr);
      }
    }
  }
}
