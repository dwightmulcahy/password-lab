export function injectPassphraseGenerator(html) {
  return html.replace(
    '<script src="assets/app.js" defer></script>',
    '<script src="assets/passphrase-generator.js" defer></script>\n<script src="assets/app.js" defer></script>'
  );
}
