import initialEditorArea from './initialEditorArea';

export default {
  value: initialEditorArea,
  language: 'javascript',
  theme: 'vs-dark',
  fontSize: window.innerWidth / 50,
  lineNumbers: 'off',
  automaticLayout: true,
  scrollbar: {
    vertical: 'hidden',
    horizontal: 'hidden',
  },
  minimap: {
    enabled: false,
  },
};
