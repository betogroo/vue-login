module.exports = {
  '*.{ts,js}': [() => 'npm run check-types', 'npm run lint', 'npm run format'],
  '*.vue': [() => 'npm run vue-check-types', 'npm run lint', 'npm run format'],
}
