import React, { useRef, useEffect } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css'; // Quill 스타일시트

// 커스텀 스타일 추가
const customStyles = {
  quillContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column' as const,
  },
  editor: {
    fontFamily: '맑은 고딕, 굴림, 돋움, 바탕, sans-serif',
    height: '100%',
    flex: '1 1 auto',
    border: 'none', // 테두리 제거
  },
  // 하단 줄 제거를 위한 스타일
  customClass: {
    '& .ql-container.ql-snow': {
      borderBottom: 'none',
      borderLeft: 'none',
      borderRight: 'none',
    },
    '& .ql-toolbar.ql-snow': {
      borderTop: 'none',
      borderLeft: 'none',
      borderRight: 'none',
      borderBottom: '1px solid #ccc',
    }
  }
};

interface MailQuillEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export const MailQuillEditor: React.FC<MailQuillEditorProps> = ({
  content,
  onChange
}) => {
  const quillRef = useRef<ReactQuill>(null);

  // 한글 입력 최적화를 위한 설정
  useEffect(() => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      
      // 에디터 DOM 요소에 접근
      const editorElement = editor.root;
      
      // 한글 입력 모드 설정
      editorElement.setAttribute('style', 'ime-mode: active;');
      
      // 조합 이벤트 처리
      editorElement.addEventListener('compositionstart', () => {
        console.log('한글 조합 시작');
      });
      
      editorElement.addEventListener('compositionend', () => {
        console.log('한글 조합 종료');
        // 필요시 추가 처리
      });
    }
  }, []);

  // Quill 에디터 모듈 설정
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      ['link', 'image']
      ],
    keyboard: {
      bindings: {
        // 한글 입력 관련 키보드 바인딩 설정
        // 필요시 추가 가능
      }
    }
  };

  // Quill 에디터 포맷 설정
  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list',
    'indent',
    'link', 'image',
    'color', 'background',
    'align'
    ];

  return (
    <div className="mail-editor h-full flex flex-col" style={{
      ...customStyles.quillContainer
    }}>
      <style>{`
      .ql-container.ql-snow{
        border-bottom: none;
        border-left: none;
        border-right: none;
      }
      .ql-toolbar.ql-snow{
        border-top: none;
        border-left: none;
        border-right: none;
        border-bottom: 1px solid #ccc;
      }
      `}</style>
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={content || ''}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder="내용을 입력하세요..."
        style={customStyles.editor}
      />
    </div>
  );
};