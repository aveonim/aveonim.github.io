// 다국어 (i18n) 사전 정의
const I18N = {
  ko: {
    appSubtitle: '스모키 글라스 감성의 고해상도 코드 캡처',
    labelTitle: '제목',
    placeholderTitle: '예: config.yaml, server.js',
    labelWindowHeader: '상단 헤더(제목 표시줄) 포함',
    labelLanguage: '언어 및 형식',
    labelLineNumbers: '줄 번호 표시',
    labelBackground: '배경 스타일',
    labelWindowStyle: '윈도우 스타일',
    styleNone: '없음',
    labelTheme: '코드 테마',
    labelWidth: '창 너비 (Width)',
    labelAutoWidth: '내용에 맞게 너비 자동 조절 (Auto)',
    autoWidthIndicator: '자동 (Auto)',
    labelPadding: '외부 여백 (Padding)',
    labelFontSize: '글자 크기 (Font Size)',
    labelFormat: '저장 포맷 및 품질',
    btnCopy: '복사',
    btnExportJpeg: '저장 (JPEG)',
    btnExportPng: '저장 (PNG)',
    barTitleEditor: '텍스트 입력',
    clearText: '지우기',
    placeholderEditor: '여기에 소스코드나 텍스트를 입력하세요...',
    barTitlePreview: '미리보기 (저장 대상)',
    previewGuide: '아래 렌더링 영역이 그대로 이미지로 생성됩니다.',
    emptyCodePlaceholder: '// 텍스트 또는 코드를 입력하면 여기에 표시됩니다.',
    noticeGenerating: '이미지 생성 중...',
    noticeDownloadDone: (ext, q) => `${ext.toUpperCase()} (품질 ${q}%) 다운로드가 완료되었습니다.`,
    noticeDownloadDonePng: 'PNG 다운로드가 완료되었습니다.',
    noticeCopyDone: '클립보드에 이미지가 복사되었습니다.',
    noticeCopyFail: '클립보드 복사 실패',
    noticeCopyPermError: '클립보드 권한 오류: 이미지 저장을 이용해주세요.',
    noticeGenFail: (err) => '이미지 생성에 실패했습니다: ' + err,
    formatJpeg80: 'JPEG (80% - 권장, 초경량)',
    formatJpeg90: 'JPEG (90% - 고화질)',
    formatPng: 'PNG (무손실 / 투명 지원)',
    langAuto: '자동 감지 (Auto Detect)',
    langPlain: '일반 텍스트 (Plain Text)'
  },
  en: {
    appSubtitle: 'High-resolution code capture with smoky glass aesthetics',
    labelTitle: 'Title',
    placeholderTitle: 'e.g. config.yaml, server.js',
    labelWindowHeader: 'Include window title bar',
    labelLanguage: 'Language & Format',
    labelLineNumbers: 'Show line numbers',
    labelBackground: 'Background Style',
    labelWindowStyle: 'Window Style',
    styleNone: 'None',
    labelTheme: 'Code Theme',
    labelWidth: 'Window Width',
    labelAutoWidth: 'Auto-fit content width',
    autoWidthIndicator: 'Auto',
    labelPadding: 'Padding',
    labelFontSize: 'Font Size',
    labelFormat: 'Export Format & Quality',
    btnCopy: 'Copy',
    btnExportJpeg: 'Export (JPEG)',
    btnExportPng: 'Export (PNG)',
    barTitleEditor: 'Text Input',
    clearText: 'Clear',
    placeholderEditor: 'Type or paste your code / text here...',
    barTitlePreview: 'Preview (Capture Target)',
    previewGuide: 'The rendered pane below will be captured as an image.',
    emptyCodePlaceholder: '// Type or paste code here to see preview.',
    noticeGenerating: 'Generating image...',
    noticeDownloadDone: (ext, q) => `${ext.toUpperCase()} (Quality ${q}%) download completed.`,
    noticeDownloadDonePng: 'PNG download completed.',
    noticeCopyDone: 'Image copied to clipboard.',
    noticeCopyFail: 'Failed to copy to clipboard',
    noticeCopyPermError: 'Clipboard permission denied: Please use export button.',
    noticeGenFail: (err) => 'Failed to generate image: ' + err,
    formatJpeg80: 'JPEG (80% - Recommended, Lightweight)',
    formatJpeg90: 'JPEG (90% - High Quality)',
    formatPng: 'PNG (Lossless / Transparent)',
    langAuto: 'Auto Detect',
    langPlain: 'Plain Text'
  }
};

// 브라우저 언어 자동 감지 (해외 접속자는 기본 영문 제공)
function detectInitialLanguage() {
  const saved = localStorage.getItem('codesnap_lang');
  if (saved && (saved === 'ko' || saved === 'en')) {
    return saved;
  }
  const browserLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
  if (browserLang.startsWith('ko')) {
    return 'ko';
  }
  return 'en';
}

let currentLang = detectInitialLanguage();

// DOM 요소 참조
const textInput = document.getElementById('text-input');
const linesContainer = document.getElementById('lines-container');
const languageSelect = document.getElementById('language-select');
const gradientPresets = document.getElementById('gradient-presets');
const themeSelect = document.getElementById('theme-select');
const windowStyleTabs = document.getElementById('window-style-tabs');
const titleInput = document.getElementById('title-input');
const windowTitle = document.getElementById('window-title');
const widthRange = document.getElementById('width-range');
const widthVal = document.getElementById('width-val');
const autoWidthToggle = document.getElementById('auto-width-toggle');
const paddingRange = document.getElementById('padding-range');
const paddingVal = document.getElementById('padding-val');
const fontSizeRange = document.getElementById('font-size-range');
const fontSizeVal = document.getElementById('font-size-val');
const lineNumbersToggle = document.getElementById('line-numbers-toggle');
const windowHeaderToggle = document.getElementById('window-header-toggle');
const captureContainer = document.getElementById('capture-container');
const windowBox = document.getElementById('window-box');
const windowHeader = document.getElementById('window-header');
const formatSelect = document.getElementById('format-select');
const exportBtn = document.getElementById('export-btn');
const exportBtnText = document.getElementById('export-btn-text');
const copyBtn = document.getElementById('copy-btn');
const statusMessage = document.getElementById('status-message');

// 언어 전환 버튼
const langBtnKo = document.getElementById('lang-btn-ko');
const langBtnEn = document.getElementById('lang-btn-en');

// 예제 버튼
const sampleYamlBtn = document.getElementById('sample-yaml-btn');
const sampleJsonBtn = document.getElementById('sample-json-btn');
const samplePyBtn = document.getElementById('sample-py-btn');
const clearTextBtn = document.getElementById('clear-text-btn');

// 샘플 데이터
const SAMPLES = {
  yaml: `version: "3.8"
services:
  web-service:
    image: nginx:alpine-production-enterprise-build-2026-v2-stable-mirror-registry
    ports:
      - "80:80"
    environment:
      NODE_ENV: production
      API_TIMEOUT: 5000
    volumes:
      - ./data:/var/www/html:ro
    restart: always`,
  json: `{
  "projectName": "text_to_image",
  "version": "1.0.0",
  "description": "플레인 텍스트 및 다양한 소스 코드를 줄바꿈 정렬이 완벽한 고해상도 이미지로 변환",
  "features": [
    "line-by-line-aligned-highlighting",
    "word-wrap-support",
    "retina-export"
  ]
}`,
  python: `def generate_image_stream(code_text: str, theme: str = "dark"):
    """
    텍스트 및 소스코드를 분석하여 각 줄(Line)과 번호를 1:1로 매핑함으로써
    창 너비를 넘어가는 긴 텍스트도 완벽하게 줄바꿈 정렬합니다.
    """
    lines = code_text.splitlines()
    print(f"Total lines processing: {len(lines)}")
    return {"status": "success", "count": len(lines)}`
};

// 동적 테마 관리
let currentThemeLink = null;

function setTheme(themeName) {
  if (currentThemeLink) {
    currentThemeLink.remove();
  }
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = `https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/${themeName}.min.css`;
  document.head.appendChild(link);
  currentThemeLink = link;

  // 창 배경색 조정 (Solid Glass 스모키 글라스 규격)
  if (themeName.includes('light')) {
    windowBox.style.backgroundColor = 'rgba(248, 250, 252, 0.95)';
    windowHeader.style.backgroundColor = 'rgba(0, 0, 0, 0.03)';
    windowHeader.style.borderColor = 'rgba(0, 0, 0, 0.06)';
    windowTitle.style.color = '#475569';
    document.querySelectorAll('.line-num').forEach(el => {
      el.style.color = '#94a3b8';
      el.style.borderColor = 'rgba(0, 0, 0, 0.08)';
    });
  } else {
    windowBox.style.backgroundColor = 'rgba(21, 24, 31, 0.94)';
    windowHeader.style.backgroundColor = 'rgba(255, 255, 255, 0.035)';
    windowHeader.style.borderColor = 'rgba(255, 255, 255, 0.07)';
    windowTitle.style.color = '#94a3b8';
    document.querySelectorAll('.line-num').forEach(el => {
      el.style.color = '#64748b';
      el.style.borderColor = 'rgba(255, 255, 255, 0.08)';
    });
  }
}

// 상태 안내 메시지 표출
function showNotice(msg, duration = 2500) {
  statusMessage.textContent = msg;
  setTimeout(() => {
    if (statusMessage.textContent === msg) {
      statusMessage.textContent = '';
    }
  }, duration);
}

// 내보내기 버튼 라벨 갱신
function updateExportButtonText() {
  const dict = I18N[currentLang] || I18N.ko;
  const val = formatSelect.value;
  if (val.startsWith('jpeg')) {
    exportBtnText.textContent = dict.btnExportJpeg;
  } else {
    exportBtnText.textContent = dict.btnExportPng;
  }
}

// 언어 전환 처리
function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('codesnap_lang', lang);
  document.documentElement.lang = lang;

  // 캡슐 버튼 상태 업데이트
  if (lang === 'ko') {
    langBtnKo.classList.add('active');
    langBtnEn.classList.remove('active');
  } else {
    langBtnEn.classList.add('active');
    langBtnKo.classList.remove('active');
  }

  const dict = I18N[lang] || I18N.ko;

  // 일반 텍스트 갱신
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });

  // Placeholder 갱신
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const key = el.getAttribute('data-i18n-ph');
    if (dict[key]) {
      el.setAttribute('placeholder', dict[key]);
    }
  });

  // 옵션 텍스트 동기화
  const optAuto = languageSelect.querySelector('option[value="auto"]');
  if (optAuto) optAuto.textContent = dict.langAuto;
  const optPlain = languageSelect.querySelector('option[value="plaintext"]');
  if (optPlain) optPlain.textContent = dict.langPlain;

  const optJ80 = formatSelect.querySelector('option[value="jpeg-80"]');
  if (optJ80) optJ80.textContent = dict.formatJpeg80;
  const optJ90 = formatSelect.querySelector('option[value="jpeg-90"]');
  if (optJ90) optJ90.textContent = dict.formatJpeg90;
  const optPng = formatSelect.querySelector('option[value="png"]');
  if (optPng) optPng.textContent = dict.formatPng;

  // 너비 인디케이터
  if (autoWidthToggle.checked) {
    widthVal.textContent = dict.autoWidthIndicator;
  }

  updateExportButtonText();
  renderCode();
}

// 전체 코드 렌더링
function renderCode() {
  const dict = I18N[currentLang] || I18N.ko;
  const rawText = textInput.value;
  const lang = languageSelect.value;
  linesContainer.innerHTML = '';

  const textToProcess = rawText.trim() === '' 
    ? dict.emptyCodePlaceholder 
    : rawText;

  let highlightedHtml = '';

  if (lang === 'plaintext') {
    const div = document.createElement('div');
    div.textContent = textToProcess;
    highlightedHtml = div.innerHTML;
  } else if (lang === 'auto') {
    const res = hljs.highlightAuto(textToProcess);
    highlightedHtml = res.value;
  } else {
    try {
      const res = hljs.highlight(textToProcess, { language: lang, ignoreIllegals: true });
      highlightedHtml = res.value;
    } catch {
      const div = document.createElement('div');
      div.textContent = textToProcess;
      highlightedHtml = div.innerHTML;
    }
  }

  const lines = highlightedHtml.split('\n');
  const frag = document.createDocumentFragment();

  lines.forEach((lineHtml, index) => {
    const lineRow = document.createElement('div');
    lineRow.className = 'code-line';

    const numSpan = document.createElement('span');
    numSpan.className = 'line-num';
    numSpan.textContent = String(index + 1);

    const codeSpan = document.createElement('code');
    codeSpan.className = 'line-content hljs';
    codeSpan.innerHTML = lineHtml === '' ? '&nbsp;' : lineHtml;

    lineRow.appendChild(numSpan);
    lineRow.appendChild(codeSpan);
    frag.appendChild(lineRow);
  });

  linesContainer.appendChild(frag);

  const currentFontSize = `${fontSizeRange.value}px`;
  linesContainer.style.fontSize = currentFontSize;

  if (lineNumbersToggle.checked) {
    windowBox.classList.remove('hide-line-numbers');
  } else {
    windowBox.classList.add('hide-line-numbers');
  }
}

// 이벤트 리스너 등록
textInput.addEventListener('input', renderCode);

languageSelect.addEventListener('change', () => {
  renderCode();
});

themeSelect.addEventListener('change', (e) => {
  setTheme(e.target.value);
});

// 언어 스위치 클릭
langBtnKo.addEventListener('click', () => setLanguage('ko'));
langBtnEn.addEventListener('click', () => setLanguage('en'));

// 윈도우 스타일 탭 버튼 변경
windowStyleTabs.addEventListener('click', (e) => {
  const btn = e.target.closest('.style-tab-btn');
  if (!btn) return;
  document.querySelectorAll('.style-tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const style = btn.getAttribute('data-style');
  windowBox.classList.remove('style-windows', 'style-mac', 'style-none');
  windowBox.classList.add(`style-${style}`);
});

// 배경 그라디언트 클릭
gradientPresets.addEventListener('click', (e) => {
  const btn = e.target.closest('.preset-btn');
  if (!btn) return;
  document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const gradient = btn.getAttribute('data-gradient');
  captureContainer.style.background = gradient;
});

// 창 제목 변경
titleInput.addEventListener('input', (e) => {
  windowTitle.textContent = e.target.value || 'untitled';
});

// 창 너비 조절
widthRange.addEventListener('input', (e) => {
  autoWidthToggle.checked = false;
  const val = e.target.value;
  widthVal.textContent = `${val}px`;
  windowBox.style.width = `${val}px`;
});

// 자동 너비 조절 토글
autoWidthToggle.addEventListener('change', (e) => {
  const dict = I18N[currentLang] || I18N.ko;
  if (e.target.checked) {
    windowBox.style.width = 'auto';
    widthVal.textContent = dict.autoWidthIndicator;
  } else {
    const val = widthRange.value;
    windowBox.style.width = `${val}px`;
    widthVal.textContent = `${val}px`;
  }
});

// 패딩 조절
paddingRange.addEventListener('input', (e) => {
  const val = e.target.value;
  paddingVal.textContent = `${val}px`;
  captureContainer.style.padding = `${val}px`;
});

// 글자 크기 조절
fontSizeRange.addEventListener('input', (e) => {
  const val = e.target.value;
  fontSizeVal.textContent = `${val}px`;
  linesContainer.style.fontSize = `${val}px`;
});

// 줄 번호 토글
lineNumbersToggle.addEventListener('change', () => {
  if (lineNumbersToggle.checked) {
    windowBox.classList.remove('hide-line-numbers');
  } else {
    windowBox.classList.add('hide-line-numbers');
  }
});

// 창 헤더 토글
windowHeaderToggle.addEventListener('change', (e) => {
  windowHeader.style.display = e.target.checked ? 'flex' : 'none';
});

// 예제 버튼 이벤트
sampleYamlBtn.addEventListener('click', () => {
  textInput.value = SAMPLES.yaml;
  languageSelect.value = 'yaml';
  titleInput.value = 'docker-compose.yaml';
  windowTitle.textContent = 'docker-compose.yaml';
  renderCode();
});

sampleJsonBtn.addEventListener('click', () => {
  textInput.value = SAMPLES.json;
  languageSelect.value = 'json';
  titleInput.value = 'package.json';
  windowTitle.textContent = 'package.json';
  renderCode();
});

samplePyBtn.addEventListener('click', () => {
  textInput.value = SAMPLES.python;
  languageSelect.value = 'python';
  titleInput.value = 'render.py';
  windowTitle.textContent = 'render.py';
  renderCode();
});

clearTextBtn.addEventListener('click', () => {
  textInput.value = '';
  renderCode();
});

// 탭 키 입력 시 들여쓰기 2칸 처리
textInput.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    e.preventDefault();
    const start = textInput.selectionStart;
    const end = textInput.selectionEnd;
    textInput.value = textInput.value.substring(0, start) + '  ' + textInput.value.substring(end);
    textInput.selectionStart = textInput.selectionEnd = start + 2;
    renderCode();
  }
});

// 안전한 Blob 파일 다운로드 헬퍼
function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.style.display = 'none';
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  setTimeout(() => {
    if (link.parentNode) {
      link.parentNode.removeChild(link);
    }
    URL.revokeObjectURL(url);
  }, 1000);
}

// 이미지 생성 공통 함수
async function generateCanvas() {
  const dict = I18N[currentLang] || I18N.ko;
  showNotice(dict.noticeGenerating);

  // 웹 폰트 로딩 대기
  if (document.fonts && document.fonts.ready) {
    await document.fonts.ready;
  }

  const totalHeight = captureContainer.scrollHeight;
  const totalWidth = captureContainer.scrollWidth;

  let optimalScale = window.devicePixelRatio > 1 ? 2 : 1.5;
  if (totalHeight > 4000) {
    optimalScale = 1;
  } else if (totalHeight > 2000) {
    optimalScale = 1.5;
  }

  const canvas = await html2canvas(captureContainer, {
    scale: optimalScale,
    useCORS: true,
    allowTaint: false,
    backgroundColor: null,
    logging: false,
    width: totalWidth,
    height: totalHeight,
    scrollX: 0,
    scrollY: 0
  });
  return canvas;
}

// 포맷 변경 시 버튼 텍스트 업데이트
formatSelect.addEventListener('change', updateExportButtonText);

// 이미지 저장
exportBtn.addEventListener('click', async () => {
  const dict = I18N[currentLang] || I18N.ko;
  try {
    const canvas = await generateCanvas();
    const format = formatSelect.value;
    const baseName = (titleInput.value.trim() || 'code-snap').replace(/\.[^/.]+$/, "");
    
    let mimeType = 'image/jpeg';
    let quality = 0.8;
    let ext = 'jpg';

    if (format === 'jpeg-80') {
      mimeType = 'image/jpeg';
      quality = 0.8;
      ext = 'jpg';
    } else if (format === 'jpeg-90') {
      mimeType = 'image/jpeg';
      quality = 0.9;
      ext = 'jpg';
    } else {
      mimeType = 'image/png';
      quality = 1.0;
      ext = 'png';
    }

    let exportCanvas = canvas;
    if (mimeType === 'image/jpeg') {
      const bgCanvas = document.createElement('canvas');
      bgCanvas.width = canvas.width;
      bgCanvas.height = canvas.height;
      const ctx = bgCanvas.getContext('2d');
      ctx.fillStyle = '#121418';
      ctx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);
      ctx.drawImage(canvas, 0, 0);
      exportCanvas = bgCanvas;
    }

    const filename = `${baseName}.${ext}`;

    // Blob 변환 및 다운로드 (실패 시 dataUrl fallback)
    if (exportCanvas.toBlob) {
      exportCanvas.toBlob((blob) => {
        if (blob) {
          downloadBlob(blob, filename);
        } else {
          // toBlob null 반환 시 Data URL fallback
          const dataUrl = exportCanvas.toDataURL(mimeType, quality);
          const link = document.createElement('a');
          link.style.display = 'none';
          link.href = dataUrl;
          link.download = filename;
          document.body.appendChild(link);
          link.click();
          setTimeout(() => {
            if (link.parentNode) link.parentNode.removeChild(link);
          }, 1000);
        }

        if (ext === 'jpg') {
          showNotice(dict.noticeDownloadDone(ext, Math.round(quality * 100)));
        } else {
          showNotice(dict.noticeDownloadDonePng);
        }
      }, mimeType, quality);
    } else {
      const dataUrl = exportCanvas.toDataURL(mimeType, quality);
      const link = document.createElement('a');
      link.style.display = 'none';
      link.href = dataUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        if (link.parentNode) link.parentNode.removeChild(link);
      }, 1000);

      if (ext === 'jpg') {
        showNotice(dict.noticeDownloadDone(ext, Math.round(quality * 100)));
      } else {
        showNotice(dict.noticeDownloadDonePng);
      }
    }
  } catch (err) {
    showNotice(dict.noticeGenFail(err.message));
  }
});

// 클립보드 복사
copyBtn.addEventListener('click', async () => {
  const dict = I18N[currentLang] || I18N.ko;
  try {
    const canvas = await generateCanvas();
    canvas.toBlob(async (blob) => {
      if (!blob) {
        showNotice(dict.noticeCopyFail);
        return;
      }
      try {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ]);
        showNotice(dict.noticeCopyDone);
      } catch (clipErr) {
        showNotice(dict.noticeCopyPermError);
      }
    }, 'image/png');
  } catch (err) {
    showNotice(dict.noticeCopyFail + ': ' + err.message);
  }
});

// 초기 구동 세팅
window.addEventListener('DOMContentLoaded', () => {
  setLanguage(currentLang);
  sampleYamlBtn.click();
});
