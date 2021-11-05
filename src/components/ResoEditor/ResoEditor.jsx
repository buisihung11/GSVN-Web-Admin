/* eslint-disable @typescript-eslint/no-invalid-this */
import spinnerPath from '@/assets/images/spinner.svg';
import firebaseStorageService from '@/services/firebaseStorage';
import ImageResize from 'quill-image-resize-module-react';
import { forwardRef, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

Quill.register('modules/imageResize', ImageResize);

// Add fonts to whitelist
// var fonts = ['sofia', 'roboto'];
// var Font = Quill.import('formats/font');
// Font.whitelist = fonts;
// Quill.register(Font, true);

// Handle Inline module Align not working
const Align = Quill.import('attributors/style/align');

Quill.register(Align, true);

function imageUpload() {
  const input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.setAttribute('accept', 'image/*');
  input.click();
  input.onchange = async () => {
    const file = input.files[0];

    // Save current cursor state
    const range = this.quill.getSelection(true);

    // Insert temporary loading placeholder image
    this.quill.insertEmbed(range.index, 'image', spinnerPath);

    // Move cursor to right side of image (easier to continue typing)
    this.quill.setSelection(range.index + 1);

    const res = await firebaseStorageService.uploadFile(file);
    // Remove placeholder image
    this.quill.deleteText(range.index, 1);

    // Insert uploaded image
    // this.quill.insertEmbed(range.index, 'image', res);
    this.quill.insertEmbed(range.index, 'image', res);
  };
}

const ResoEditor = forwardRef((props, ref) => {
  const [, setEditorHtml] = useState('');
  const handleChange = (html) => setEditorHtml(html);

  const modules = {
    toolbar: {
      container: [
        [{ font: [] }],
        [{ size: ['small', false, 'large', 'huge'] }, { color: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ background: [] }],
        [
          { list: 'ordered' },
          { list: 'bullet' },
          { indent: '-1' },
          { indent: '+1' },
          { align: [] },
        ],
        ['link', 'image'],
        ['clean'],
      ],
      handlers: { image: imageUpload },
    },
    clipboard: { matchVisual: false },
    imageResize: {
      parchment: Quill.import('parchment'),
      modules: ['Resize', 'DisplaySize'],
    },
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'size',
    'color',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'align',
    'background',
    'font',
    'width',
  ];

  return (
    <ReactQuill
      theme="snow"
      modules={modules}
      formats={formats}
      {...props}
      ref={ref}
      onchange={handleChange}
    />
  );
});

export default ResoEditor;
