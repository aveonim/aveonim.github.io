# Text & Code to Image Generator

텍스트 및 다양한 프로그래밍/설정 언어(YAML, JSON, Python, Shell 등)를 문법 강조(Syntax Highlighting)가 적용된 이미지(JPEG 80% / PNG)로 변환해 주는 정적 웹 애플리케이션입니다.

GitHub Pages와 같은 정적 웹 호스팅 환경에서 별도의 백엔드 서버 없이 동작합니다.

---

## 주요 기능
- **솔리드 글라스(Solid Glass) UI**:
  - 중립 스모키 글라스 표면과 림 라이트가 적용된 제어 패널
  - 캡처 대상 윈도우 창은 그림자 번짐 없는 1px 단일 외곽선으로 정밀 렌더링
- **글로벌 다국어 (i18n) 지원**:
  - 한국어(`KR`) 및 영어(`EN`) 원클릭 실시간 전환
  - 해외 및 비한국어 브라우저 접속 시 기본 영문 자동 감지 (`navigator.language`)
  - 사용자 선택 언어 영구 저장 (`localStorage`)
- **문법 강조(Syntax Highlighting)**: 플레인 텍스트, YAML, JSON, Python, JavaScript, Bash 등 자동 감지 및 직접 선택 지원
- **안정적 고해상도 이미지 내보내기**:
  - `Blob` + `createObjectURL` 기반 대용량 이미지 다운로드 보장
  - 기본 **JPEG (품질 80%)** 초경량 압축, **JPEG (90%)**, **PNG (무손실 / 투명 배경)** 지원
  - 원클릭 클립보드 복사 지원
- **디자인 커스텀**:
  - Windows 스타일(`_ □ ✕`), macOS 스타일(`● ● ●`), 버튼 없는 심플 타이틀 탭 전환 지원
  - 옵시디언 글라스 기본 배경, 단색/그라디언트 및 투명 배경 프리셋 8종 제공
  - 창 너비(Width) 자동 맞춤 및 슬라이더 수동 조절 지원
  - 외부 여백(Padding, 기본 24px, 4px 단위), 글자 크기, 줄 번호, 헤더 포함 여부 커스텀
  - 코드 테마(One Dark, One Light, GitHub Dark 등) 실시간 전환
- **레이아웃 안정성**:
  - 긴 텍스트 입력 시 자동 줄바꿈(Word Wrap) 기본 내장 및 라인 번호 1:1 수직 정렬 보장
  - 상단 헤더 잘림 방지 뷰포트 레이아웃 적용

---

## GitHub Pages 배포 방법

1. 본 저장소의 코드를 GitHub 원격 저장소(`main` 또는 `gh-pages` 브랜치)에 푸시합니다.
2. GitHub 저장소 페이지의 **Settings > Pages** 메뉴로 이동합니다.
3. **Build and deployment > Source** 항목에서 `Deploy from a branch`를 선택합니다.
4. **Branch**를 `main` (또는 `gh-pages`), 폴더를 `/ (root)`로 지정하고 저장합니다.
5. 수 분 내로 발급되는 `https://<사용자이름>.github.io/<저장소이름>/` 주소로 접속하여 사용합니다.

---

## 로컬 실행 방법
별도의 빌드 과정 없이 정적 파일로 구성되어 있으므로, 브라우저에서 `index.html`을 바로 열거나 로컬 웹 서버로 확인할 수 있습니다.

```bash
# Python 내장 서버 예시
python -m http.server 3000
```
웹 브라우저에서 `http://localhost:3000` 접속
