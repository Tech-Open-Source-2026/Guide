# GitHub 저장소와 AI 코딩 에이전트 작업 흐름

> [!IMPORTANT]
> **13:00에 제출을 마감하며, 이후에는 저장소 push 권한이 비활성화됩니다. 작업 내용을 13:00 전에 commit하고 push해 주세요.**

## 목표

**실습 목표: 본인 GitHub 저장소를 clone하고 AI 코딩 에이전트 하나를 설치·실행한 뒤, 저장소 근거로 문서를 만들고 검증·수정하여 원격 저장소에 push한다.**

Antigravity, Claude Code, Codex 중 하나만 선택한다. 도구의 종류는 평가하지 않는다. `clone → 저장소 확인 → AI 초안 → 학생 검증·수정 → diff 검사 → commit → push → GitHub 확인`의 전체 흐름을 평가한다.

## 제출 구조

```text
Week03/
├── README.md
├── docs/
│   └── repository_overview.md
└── evidence/
    ├── environment.txt
    ├── clone_state.txt
    ├── ai_prompt.md
    ├── ai_initial.md
    ├── verification.md
    ├── diff_check.txt
    └── content_commit.txt
```

계정 비밀번호, API key, access token, 브라우저 인증 코드와 인증 화면은 제출하지 않는다.

## 1단계 · Git과 GitHub 연결 확인

본인에게 배정된 GitHub 저장소 URL을 복사한다. 터미널의 작업 폴더에서 다음 명령을 실행한다.

```bash
git --version
STUDENT_REPO_URL="GitHub에서 복사한 본인 저장소 HTTPS URL"
git clone "$STUDENT_REPO_URL"
cd "clone으로 생성된 폴더명"
git remote -v
git branch --show-current
git status --short --branch
```

| 명령 | 실행 이유 | 바뀌는 파일·상태 | 성공 기준 |
|---|---|---|---|
| `git --version` | Git 실행 가능 여부를 확인한다. | 변경 없음 | 버전 문자열 출력 |
| `git clone` | 원격 저장소의 커밋과 파일을 로컬에 복제한다. | 새 로컬 저장소 폴더 생성 | `Cloning into...` 뒤 오류 없이 종료 |
| `git remote -v` | 현재 폴더가 본인 원격 저장소를 가리키는지 확인한다. | 변경 없음 | fetch와 push URL이 본인 저장소와 일치 |
| `git branch --show-current` | commit할 현재 branch를 확인한다. | 변경 없음 | 수업 저장소의 기본 branch 출력 |
| `git status --short --branch` | branch와 변경 상태를 함께 확인한다. | 변경 없음 | 예상 branch가 첫 줄에 표시 |

인증 오류가 나면 비밀번호나 token을 문서에 적지 말고 GitHub 로그인 상태와 저장소 접근 권한을 확인한다. 빈 폴더에 직접 파일을 만든 뒤 나중에 원격을 연결하는 방식으로 `clone` 실패를 숨기지 않는다.

다음 명령의 출력을 `Week03/evidence/clone_state.txt`에 저장한다.

```bash
mkdir -p Week03/docs Week03/evidence
git remote -v > Week03/evidence/clone_state.txt
git branch --show-current >> Week03/evidence/clone_state.txt
git status --short --branch >> Week03/evidence/clone_state.txt
```

## 2단계 · AI 코딩 에이전트 하나 설치

세 도구는 대안 관계다. 하나만 설치하고 실행한다. 이미 설치되어 있다면 재설치하지 않고 버전과 실행 여부만 확인한다.

### 선택 A · Antigravity

공식 다운로드 페이지 <https://antigravity.google/download>에서 운영체제에 맞는 Antigravity IDE를 설치한다. IDE에서 clone한 폴더를 열고 Agent 패널을 사용한다. 버전은 About 화면에서 확인해 `environment.txt`에 직접 기록한다. 공식 설치 파일이 아닌 검색 광고나 제3자 배포 파일을 사용하지 않는다.

### 선택 B · Claude Code

Node.js 18 이상을 확인한 뒤 공식 패키지를 설치한다.

```bash
node --version
npm install -g @anthropic-ai/claude-code
claude --version
claude
```

### 선택 C · Codex

Node.js와 npm을 사용할 수 있으면 공식 npm 패키지를 설치한다.

```bash
node --version
npm install -g @openai/codex
codex --version
codex
```

첫 실행에서 각 도구가 제공하는 공식 로그인 절차를 따른다. 로그인 정보와 token은 저장소 파일에 기록하지 않는다. 설치 권한 오류가 나면 `sudo npm install -g ...`로 우회하지 말고 교수자에게 알리거나 다른 선택 도구를 사용한다.

선택한 도구만 기록한다.

```text
# Week03/evidence/environment.txt
OS: <운영체제와 버전>
Git: <git --version 결과>
Selected agent: <Antigravity | Claude Code | Codex>
Agent version: <버전 또는 About 화면의 버전>
Launch result: <저장소 폴더에서 정상 실행 여부>
```

## 3단계 · AI로 저장소 설명 문서 생성

선택한 에이전트를 반드시 clone한 저장소 루트에서 실행한다. 다음 요청을 `Week03/evidence/ai_prompt.md`에 먼저 저장한 뒤 같은 내용을 에이전트에 전달한다.

```text
이 저장소의 실제 파일을 먼저 읽어라. 추측으로 파일이나 기능을 만들지 마라.
Week03/docs/repository_overview.md를 만들고 다음을 작성하라.
1. 저장소의 목적
2. 주요 디렉터리와 파일의 역할
3. 현재 확인 가능한 실행 또는 사용 방법
4. 파일에서 확인할 수 없는 정보와 추가 확인이 필요한 점
각 주장 뒤에 근거가 된 실제 파일 경로를 적어라.
다른 파일은 수정하지 마라.
```

에이전트가 만든 최초 문서를 보존한다.

```bash
cp Week03/docs/repository_overview.md Week03/evidence/ai_initial.md
git diff -- Week03/docs/repository_overview.md
```

문서가 생성되지 않았으면 에이전트가 clone한 저장소가 아닌 다른 폴더를 보고 있지 않은지 먼저 확인한다. 실제로 없는 파일명이나 실행 명령을 썼다면 그대로 제출하지 않는다.

## 4단계 · AI 초안을 학생이 검증하고 수정

`repository_overview.md`의 주장을 최소 세 개 고른다. 각 주장을 실제 파일과 대조해 `Week03/evidence/verification.md`에 기록한다.

| AI의 주장 | 확인한 실제 경로 | 판정 | 학생의 수정 |
|---|---|---|---|
| 예: 프로젝트 실행은 `python app.py`다. | `README.md`, 저장소 파일 목록 | 불일치 | 확인되지 않은 실행 명령을 삭제하고 미확인으로 표시 |

다음 조건을 모두 지킨다.

- 서로 다른 실제 경로를 최소 두 개 확인한다.
- AI 초안에서 최소 한 곳을 수정한다. 오류가 없다면 근거 경로, 재현 단계 또는 미확인 항목 중 하나를 보강한다.
- `ai_initial.md`는 최초 결과 증거이므로 수정하지 않는다.
- 최종 `repository_overview.md`에는 확인한 사실과 확인하지 못한 내용을 구분한다.

수정 뒤 다음 검사를 실행한다.

```bash
git add -N Week03
git diff --check > Week03/evidence/diff_check.txt
git diff --stat >> Week03/evidence/diff_check.txt
git status --short >> Week03/evidence/diff_check.txt
```

`git add -N Week03`은 파일 내용을 commit하지 않고 새 파일도 diff에 보이게 표시한다. `git diff --check` 출력이 없다면 공백 오류가 없다는 뜻이다. 이어지는 stat과 status에서 `Week03/` 안의 예상 파일만 변경되었는지 확인한다. AI가 범위 밖 파일을 수정했다면 내용을 검토한 뒤 해당 변경을 제출에서 제외한다.

## 5단계 · 두 번의 commit과 push

먼저 문서와 검증 증거를 commit하고 push한다.

```bash
git add -- Week03/README.md Week03/docs Week03/evidence
git diff --cached --check
git diff --cached --name-status
git commit -m "Add Week 3 repository overview"
git push
```

`git diff --cached --name-status`에 `Week03/` 밖의 파일이 나오면 commit하지 말고 원인을 확인한다. 첫 push가 성공하면 그 content commit의 SHA를 기록하고 증거를 한 번 더 commit한다.

```bash
git rev-parse HEAD > Week03/evidence/content_commit.txt
git add -- Week03/evidence/content_commit.txt
git commit -m "Record Week 3 submission evidence"
git push
git status --short --branch
```

마지막 status에 변경 파일이 없고 현재 branch가 원격과 일치해야 한다. GitHub 웹에서 `Week03/docs/repository_overview.md`를 직접 열어 최종 수정 내용과 `content_commit.txt`의 SHA가 보이는지 확인한다.

## 제출 README

`Week03/README.md`에는 다음 제목을 순서대로 둔다.

1. `선택한 도구와 실행 환경`
2. `Clone과 원격 저장소 확인`
3. `AI 최초 결과와 한계`
4. `학생의 검증과 수정`
5. `Commit과 Push 결과`

마지막 절에는 GitHub에서 실제로 열리는 `Week03/docs/repository_overview.md` 링크를 넣는다. 로그인하지 않은 다른 학생에게 공개될 필요는 없지만, 본인 계정과 교수자 권한으로 열려야 한다.

## 쉬운 입력·출력 예제

- 입력: 저장소 루트에서 위의 공통 AI 요청 실행
- AI 최초 출력: 실제 파일을 바탕으로 생성된 `repository_overview.md`
- 학생 처리: 주장 세 개를 파일 경로로 대조하고 최소 한 곳 수정
- 최종 출력: 검증된 문서, 최초본, 검증표, diff 검사, content commit SHA
- 확인 방법: 로컬 status가 깨끗하고 GitHub에서 최종 문서와 SHA가 열림

## 완료 체크리스트

- [ ] 본인 저장소를 clone하고 선택한 AI 코딩 에이전트 하나의 버전과 저장소 안 실행 결과를 제출했다.
- [ ] AI 최초 문서를 보존하고 주장 세 개를 실제 파일로 검증해 최소 한 곳을 수정했다.
- [ ] 예상 파일만 두 번 commit·push하고 GitHub의 최종 문서와 content commit SHA를 직접 확인했다.

## 평가 — 통과 또는 미통과

1. **필수 이론 실행:** clone한 저장소, 원격 URL, branch, 선택한 에이전트 실행, commit·push의 연결이 증거 파일에서 확인되는가?
2. **개선 시도:** AI 최초본과 최종본 사이에 실제 저장소 근거를 사용한 학생 수정이 있는가?
3. **근거 기록:** 검증표, diff 검사, content commit SHA, GitHub 문서 링크로 수행 여부를 직접 판정할 수 있는가?

세 항목은 각각 통과 또는 미통과로 판정한다.

## 공식 설치 문서

- Antigravity: <https://antigravity.google/download>
- Claude Code: <https://docs.anthropic.com/en/docs/claude-code/getting-started>
- Codex CLI: <https://developers.openai.com/codex/cli>
