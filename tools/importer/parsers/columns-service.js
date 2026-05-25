/* eslint-disable */
/* global WebImporter */

/**
 * Parser for columns-service
 * Base block: columns
 * Source: https://www.conad.it/hey-conad
 * Generated: 2026-05-25
 *
 * Handles three source component types mapped to a 2-column Columns block:
 * - rt137-strillo-app: App download CTA (icon + title + text | store badge links)
 * - rt104-service-banner: Service banner (image | heading + text + CTA)
 * - rt106-lancio: Feature launch (heading + text + CTA | image)
 *
 * Columns blocks do NOT require field hint comments (per xwalk hinting rules).
 */
export default function parse(element, { document }) {
  const cells = [];

  // Detect which source component type we are dealing with
  const isStrilloApp = element.classList.contains('rt137-strillo-app');
  const isServiceBanner = element.classList.contains('rt104-service-banner');
  const isLancio = element.classList.contains('rt106-lancio');

  if (isStrilloApp) {
    // rt137-strillo-app: App download CTA
    // Column 1: Title + description text
    const col1 = [];
    const title = element.querySelector('.rt137-strillo-app__title');
    if (title) col1.push(title);
    const text = element.querySelector('.rt137-strillo-app__text');
    if (text) col1.push(text);

    // Column 2: App store badge links (images wrapped in links)
    const col2 = [];
    const ctaLinks = element.querySelectorAll('a.rt137-strillo-app__cta');
    ctaLinks.forEach((link) => col2.push(link));

    cells.push([col1, col2]);
  } else if (isServiceBanner) {
    // rt104-service-banner: Image left, text + CTA right
    // Column 1: Image
    const col1 = [];
    const image = element.querySelector('.rt104-service-banner__left img, .rt104-service-banner__image');
    if (image) col1.push(image);

    // Column 2: Heading + text + CTA
    const col2 = [];
    const heading = element.querySelector('.rt104-service-banner__title');
    if (heading) col2.push(heading);
    const text = element.querySelector('.rt104-service-banner__text');
    if (text) col2.push(text);
    const cta = element.querySelector('a.rt104-service-banner__cta, a.rt002-cta');
    if (cta) col2.push(cta);

    cells.push([col1, col2]);
  } else if (isLancio) {
    // rt106-lancio: Text + CTA left, image right
    // Column 1: Heading + text + CTA
    const col1 = [];
    const heading = element.querySelector('.rt106-lancio__titleText, .rt106-lancio__title .rt001-richtext');
    if (heading) col1.push(heading);
    const text = element.querySelector('.rt106-lancio__text');
    if (text) col1.push(text);
    const cta = element.querySelector('a.rt106-lancio__cta, .rt106-lancio__left a.rt002-cta');
    if (cta) col1.push(cta);

    // Column 2: Image
    const col2 = [];
    const image = element.querySelector('.rt106-lancio__image img, picture.rt106-lancio__image');
    if (image) col2.push(image);

    cells.push([col1, col2]);
  } else {
    // Fallback: generic 2-column split
    // Try to find image and text content
    const col1 = [];
    const col2 = [];

    const img = element.querySelector('img, picture');
    if (img) col1.push(img);

    const headingEl = element.querySelector('h1, h2, h3, h4');
    if (headingEl) col2.push(headingEl);
    const paraEl = element.querySelector('p');
    if (paraEl) col2.push(paraEl);
    const linkEl = element.querySelector('a');
    if (linkEl) col2.push(linkEl);

    cells.push([col1, col2]);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-service', cells });
  element.replaceWith(block);
}
