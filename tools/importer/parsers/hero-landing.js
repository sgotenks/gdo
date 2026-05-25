/* eslint-disable */
/* global WebImporter */

/**
 * Parser: hero-landing
 * Base block: hero
 * Source: https://www.conad.it/hey-conad
 * Selector: #rc100-hero-4606449
 * Generated: 2026-05-25
 *
 * UE Model fields:
 *   - image (reference) -> Row 1
 *   - imageAlt (collapsed into image - no separate row)
 *   - text (richtext) -> Row 2: heading + description + CTAs
 */
export default function parse(element, { document }) {
  // Extract image from hero right section
  const image = element.querySelector('.rt100-hero__right img, .rt100-hero__image img, picture img');

  // Extract heading from hero title area
  const heading = element.querySelector('.rt100-hero__title h1, .rt100-hero__title h2, .rt100-hero__left h1, .rt100-hero__left h2');

  // Extract description text
  const description = element.querySelector('.rt100-hero__text, .rt100-hero__left .rt001-richtext:not(.rt100-hero__title)');

  // Extract CTA links (may be empty)
  const ctaLinks = Array.from(element.querySelectorAll('.rt100-hero__ctaArea a, .rt100-hero__left a.cta, .rt100-hero__left a.button'));

  // Build cells matching UE model: 2 rows (image, text)
  const cells = [];

  // Row 1: image field
  if (image) {
    const imageFragment = document.createDocumentFragment();
    imageFragment.appendChild(document.createComment(' field:image '));
    imageFragment.appendChild(image);
    cells.push([imageFragment]);
  } else {
    cells.push(['']);
  }

  // Row 2: text field (richtext combining heading + description + CTAs)
  const textFragment = document.createDocumentFragment();
  textFragment.appendChild(document.createComment(' field:text '));
  if (heading) textFragment.appendChild(heading);
  if (description) textFragment.appendChild(description);
  if (ctaLinks.length > 0) {
    ctaLinks.forEach((link) => textFragment.appendChild(link));
  }
  cells.push([textFragment]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-landing', cells });
  element.replaceWith(block);
}
