# 인사말 프로그램의 유지보수 설정과 0.2.0 릴리스

## 제출 마감 및 push 권한 안내

제출 마감은 **2026년 11월 9일(월) 14:50 (한국시간, KST)**이다. 마감까지 `greet-release` 저장소에 GitHub Release `v0.2.0`을 게시하고, 수업 개인 저장소에 `Week10/release_url.txt`를 push한다. **14:50부터 push가 차단되며, 14:51에 수강생 개인 저장소의 push 권한을 일괄 회수**한다. 마감 시각에 `release_url.txt`가 가리키는 Release와 `v0.2.0` 태그의 커밋을 기록해 두며, 마감 뒤 태그를 옮기거나 Release를 고쳐도 기록한 커밋과 Release가 채점 기준이다.

- 서술형 문제는 **다음 수업 시작 10분 후 전원이 함께** 응시한다. 마감 시점에 `Week10/release_url.txt`가 가리키는 GitHub Release `v0.2.0`의 태그 커밋에 있는 `greet-release` 코드가 문제와 채점의 기준이다.
- 서술형 평가 대상: 그 태그 커밋의 `.github/dependabot.yml`, `.github/workflows/ci.yml`, `pyproject.toml`, `CHANGELOG.md`, `greet.py`, `.gitignore`와 Release `v0.2.0`의 본문·첨부 파일, Dependabot 업데이트 PR 기록이다. `uv.lock`과 `README.md`는 대상이 아니다. 줄이나 키 이름을 외울 필요는 없고, 각 파일이 하는 일과 0.2.0 공개 절차(업데이트 PR 병합, 변경 기록 작성, 번호 올리기, 태그 붙이기, Release 게시)를 자기 저장소에 비추어 설명할 수 있으면 된다.
- push 권한은 마감부터 다음 수업의 서술형 응시와 평가가 끝날 때까지 닫혀 있다.
- 권한이 닫혀 있는 동안 다음 실습 코드는 로컬에 commit만 해 두고, 권한이 열리면 push한다.
- 서술형 시작 시각 전에 UCheck 출석 또는 지각 기록이 없으면 응시하더라도 0점이다.

문제를 처음 연 순간부터 5분 이내에 답안 제출을 완료해야 합니다. 제한시간이 지나면 문제 화면이 자동으로 사라지고 제출할 수 없습니다. 시간 내 제출하지 않으면 해당 서술형 문항은 0점 처리됩니다.

## 완성할 산출물

본인 GitHub 계정에 이 실습 전용 **public 저장소** `greet-release`를 새로 만든다. 저장소에는 인사말 프로그램 `greet.py`, uv 프로젝트 설정, pytest를 실행하는 CI, Dependabot 버전 업데이트 설정 `.github/dependabot.yml`, 변경 기록 `CHANGELOG.md`를 둔다.

진행 순서는 0.1.0 공개 → Dependabot 업데이트 PR 병합 → 빈 이름 수정과 `punctuation` 인수 추가 → 0.2.0 릴리스다. GitHub Release `v0.2.0`의 본문이 `CHANGELOG.md`의 `[0.2.0]` 절과 같고 0.2.0 배포 파일 두 개가 첨부되어 있으면 완료다.

버전 전략은 유의적 버전(Semantic Versioning)이다. `CHANGELOG.md` 머리말에 유의적 버전을 따른다는 문장으로 선언한다.

이 README를 바탕으로 직접 구현한다. 별도 시작 코드는 없다. 강의의 `hello-open-source`는 유지보수와 릴리스 절차를 설명하는 시연 예제이며, 이 실습의 제출 시작 파일이 아니다.

## 입력과 환경

로컬에서는 uv·Git을 사용한다. CI는 uv 0.8.14로 Python 3.11과 3.12에서 실행한다. 기본 브랜치는 `main`이다.

Python 소스는 저장소 루트의 `greet.py` 한 개이며 빈 줄·주석을 포함해 100줄 이내로 한다. `greet.py`에는 `greet` 함수, 실행 진입점 `main() -> int`, `test_`로 시작하는 테스트 함수, `if __name__ == "__main__":` 아래의 `raise SystemExit(main())`을 둔다. 테스트를 같은 파일에 두는 이유는 Python 소스를 한 개로 유지하기 위해서이며, pytest는 `greet.py`를 직접 지정해 실행한다.

0.1.0 단계의 동작과 테스트는 다음과 같다.

| 대상 | 요구 |
|---|---|
| `greet(name: str) -> str` | `Hello, <name>!`을 반환한다. |
| `main() -> int` | 명령행 첫 번째 인수를 이름으로 받아 인사말을 한 줄 출력하고 0을 반환한다. 인수가 없으면 `world`를 사용한다. |
| `test_greet` | `greet("Hee") == "Hello, Hee!"`를 단언한다. |

0.2.0 단계에서는 강의의 PATCH·MINOR 판정 예와 같은 두 변경을 더한다.

| 변경 | 요구 | 변경 기록 유형 |
|---|---|---|
| 빈 이름 수정 | 공백만 있거나 빈 이름이면 `world`를 사용한다. `greet(" ") == "Hello, world!"`를 단언하는 `test_greet_blank`를 추가한다. | Fixed |
| `punctuation` 인수 | `greet(name: str, punctuation: str = "!") -> str`로 바꾼다. `greet("Hee", ".") == "Hello, Hee."`를 단언하는 `test_greet_punctuation`을 추가한다. | Added |

| 실행 (`greet-release` 루트에서) | 0.2.0의 표준 출력 |
|---|---|
| `uv run --locked python greet.py Hee` | `Hello, Hee!` |
| `uv run --locked python greet.py` | `Hello, world!` |
| `uv run --locked python greet.py ''` | `Hello, world!` (0.1.0에서는 `Hello, !`) |

## 제출 배치

```text
https://github.com/<본인ID>/greet-release   (public, 본인 계정)
├── .github/
│   ├── dependabot.yml
│   └── workflows/
│       └── ci.yml
├── CHANGELOG.md
├── greet.py
├── pyproject.toml
├── uv.lock
├── .gitignore
└── README.md

수업 개인 저장소 (기존)
└── Week10/
    └── release_url.txt
```

`.github/dependabot.yml`은 workflow가 아니므로 `.github/workflows/` 밖에 둔다. 모든 명령은 `greet-release` 루트에서 실행한다. public 저장소는 누구나 볼 수 있으므로 코드·커밋·README·변경 기록에 이름·학번·연락처를 넣지 않는다.

## 파일 요구사항

`v0.2.0` 태그 커밋의 각 파일은 빈 줄·주석을 포함한 실제 줄 수가 다음 제한 이내다. `uv.lock`은 `uv lock`이 만드는 파일이라 제한하지 않는다.

| 파일 | 최대 줄 수 |
|---|---:|
| `greet.py` | 100 |
| `.github/workflows/ci.yml` | 30 |
| `CHANGELOG.md` | 40 |
| `pyproject.toml` | 20 |
| `README.md` | 20 |
| `.github/dependabot.yml` | 10 |
| `.gitignore` | 10 |

`pyproject.toml`에는 다음 표를 둔다.

| 표 | 키와 값 |
|---|---|
| `[build-system]` | `requires = ["setuptools>=77"]`, `build-backend = "setuptools.build_meta"` |
| `[project]` | `name = "greet-week10"`, `version = "0.1.0"`, `requires-python = ">=3.11"` |
| `[dependency-groups]` | `dev = ["pytest==8.4.2"]` |

`pytest==8.4.2`는 최신 버전보다 오래된 버전을 `==`로 고정한 것이다. Dependabot이 업데이트 PR을 만드는 대상이다. `uv lock`으로 만든 `uv.lock`을 함께 커밋한다.

`.github/workflows/ci.yml`은 다음을 충족한다.

| 위치 | 요구 |
|---|---|
| `name` | `CI` |
| `on` | `push`와 `pull_request` 각각 `branches: [main]` |
| `permissions` | `contents: read` |
| `jobs.tests` | `name: Tests (${{ matrix.python }})`, `runs-on: ubuntu-latest`, `strategy.fail-fast: false`, `matrix.python: ["3.11", "3.12"]` |
| `jobs.tests.steps` | `actions/checkout@v7` → `astral-sh/setup-uv@v7`(`version: "0.8.14"`, `python-version: ${{ matrix.python }}`) → 이름 `Run pytest`, 명령 `uv run --locked pytest -q greet.py` |

`.github/dependabot.yml`은 강의의 Dependabot 설정과 같은 내용이다.

| 키 | 값 |
|---|---|
| `version` | `2` |
| `updates[0].package-ecosystem` | `"uv"` |
| `updates[0].directory` | `"/"` |
| `updates[0].schedule.interval` | `"weekly"` |

`CHANGELOG.md`는 다음을 충족한다.

- 형식은 Keep a Changelog 1.1.0이다.
- 머리말은 `# Changelog`, 변경 기록을 설명하는 한 문장, Keep a Changelog 형식과 유의적 버전을 따른다는 문장으로 구성한다. 강의의 `CHANGELOG.md` 머리말과 같은 구성이다.
- `## [Unreleased]` 절을 항상 맨 위에 둔다.
- 버전 절 제목은 `## [0.1.0] - YYYY-MM-DD`처럼 버전과 실제 공개 날짜로 쓴다.
- 0.1.0 절에는 `### Added` 아래에 `greet()`와 명령행 인사말을 한 항목으로 쓴다.
- 0.2.0 절에는 `### Added`에 `punctuation` 인수, `### Fixed`에 빈 이름 수정을 쓴다. 각 항목은 공개 API 이름과 이전 동작 → 새 동작이 드러나는 한 줄이다.
- 개발 도구 업데이트(Dependabot PR)는 사용자가 보는 동작을 바꾸지 않으므로 항목에 넣지 않는다.

`.gitignore`에서 `.venv/`, `__pycache__/`, `.pytest_cache/`, `dist/`, `build/`, `*.egg-info/`를 제외한다. `README.md`에는 설치·실행 명령과 버전 전략(유의적 버전) 한 줄을 쓴다.

## 수행 순서

1. GitHub에서 **New repository → Owner: 본인 계정, Repository name: `greet-release`, Public, Add a README file 선택 → Create repository**로 저장소를 만들고 내려받는다.

   ```bash
   git clone https://github.com/<본인ID>/greet-release.git
   cd greet-release
   ```

2. `greet.py`(0.1.0 단계), `pyproject.toml`, `.gitignore`, `README.md`를 작성하고 `uv lock`을 실행한다. 아래 `실행과 확인`의 0.1.0 단계 명령으로 출력을 확인한다. AI로 초안을 작성해도 되며, 실제 출력이 위 표와 맞는지는 직접 확인한다.
3. `.github/workflows/ci.yml`, `.github/dependabot.yml`, `CHANGELOG.md`(빈 `Unreleased`와 `[0.1.0]` 절)를 작성한다. 커밋 `Release 0.1.0`을 만들고 `git tag v0.1.0`으로 태그를 붙인 뒤 `git push origin main v0.1.0`으로 `main`과 태그를 보낸다.
4. **Actions → CI**에서 `main` 실행의 두 작업 `Tests (3.11)`·`Tests (3.12)`가 성공했는지 확인한다.
5. Dependabot 업데이트 PR을 처리한다. `dependabot.yml`이 기본 브랜치에 올라가면 Dependabot이 의존성을 확인해 PR을 만든다. **Pull requests**에서 `Bump pytest from 8.4.2 to <그 시점의 최신 버전>` PR(강의 측정일 2026-10-27의 최신 버전은 9.1.1)의 status check 두 개가 성공했는지 확인한 뒤 **Merge pull request**로 병합한다. 같은 방식으로 열린 다른 Dependabot PR(예: `[build-system]`의 setuptools 요구)도 status check가 성공하면 병합한다. Dependabot의 확인 상태는 **Insights → Dependency graph → Dependabot**에서 본다.
6. 로컬 `main`을 `git pull`로 GitHub의 `main`과 맞추고 기능 브랜치 `week10-changes`를 만든다. 빈 이름 수정과 `punctuation` 인수, 테스트 두 개를 추가하고 `CHANGELOG.md`의 `Unreleased`에 Added·Fixed 항목을 추가한다.
7. 기능 브랜치를 push하고 base `main`으로 PR을 만든다. status check 성공을 확인한 뒤 병합한다.
8. 로컬 `main`에서 `git pull`을 실행한다. `Unreleased`의 변경 유형(Added·Fixed) 중 가장 높은 자리인 MINOR를 올리기로 정하고 `uv version --bump minor`(0.1.0 → 0.2.0)를 실행한다. `CHANGELOG.md`의 `Unreleased` 바로 아래에 `## [0.2.0] - YYYY-MM-DD`를 넣고, 커밋 `Release 0.2.0`을 만들어 `main`에 push한다.
9. `git tag v0.2.0`으로 태그를 붙인다. 태그를 보내기 전에 아래 `실행과 확인`의 버전 일치를 확인한다. 태그·`pyproject.toml`·`CHANGELOG.md`·배포 파일의 번호가 모두 0.2.0이면 `git push origin v0.2.0`을 실행한다. 번호가 다르면 `git tag -d v0.2.0`으로 태그를 지우고 `Release 0.2.0` 커밋에서 `git tag v0.2.0`을 다시 붙인 뒤 다시 확인한다.
10. GitHub에서 **Releases → Draft a new release → 태그 `v0.2.0` 선택 → Release title `v0.2.0` → 본문에 `CHANGELOG.md`의 `[0.2.0]` 절(`### Added`부터 `### Fixed` 항목까지) 붙여 넣기 → `uv build`로 만든 `dist/`의 파일 두 개 첨부 → Publish release**로 게시한다.

## 실행과 확인

0.1.0 단계(`수행 순서` 2):

```bash
uv lock
uv run --locked python greet.py Hee
uv run --locked python greet.py
uv run --locked python greet.py ''
uv run --locked pytest -q greet.py
```

정상 결과는 `Hello, Hee!`, `Hello, world!`, `Hello, !`(0.2.0에서 고칠 결함), `1 passed`이며 종료 코드는 모두 0이다.

0.2.0 단계(`수행 순서` 6, 8, 9):

```bash
uv run --locked pytest -q greet.py
uv run --locked python greet.py ''
git status --short | wc -l
uv version
git describe --tags
uv build -q && ls dist
```

정상 결과는 `3 passed`, 인사말 `Hello, world!`, 커밋하지 않은 변경 파일 수 `0`이다. 버전 일치 확인의 정상 결과는 `greet-week10 0.2.0`, `v0.2.0`, `dist/`의 `greet_week10-0.2.0-py3-none-any.whl`·`greet_week10-0.2.0.tar.gz`, `CHANGELOG.md`의 `Unreleased` 바로 아래 제목 `## [0.2.0] - YYYY-MM-DD`다. `git describe --tags`가 `v0.2.0-1-g…`처럼 출력되면 태그가 지금 커밋이 아니라 앞 커밋에 붙은 것이므로 `수행 순서` 9의 방법으로 다시 붙인다.

## 제출

수업 개인 저장소의 `Week10/release_url.txt`에 GitHub Release 주소 한 줄만 적어 커밋·push한다.

```text
https://github.com/<본인ID>/greet-release/releases/tag/v0.2.0
```

- 제출 완료 확인: 브라우저에서 이 주소를 열었을 때 태그 `v0.2.0`, 본문의 Added·Fixed 항목, Assets의 0.2.0 파일 두 개가 보이는 상태
- 제출물: 이 Release가 가리키는 `v0.2.0` 태그의 커밋과 그 커밋까지의 PR 기록
- Release·태그를 삭제하거나 저장소를 비공개로 바꾸면 확인할 수 없으므로 미제출로 처리한다.
- 고찰·수정 이력·추가 개선 과제는 요구하지 않는다.

## 평가기준

세 기준은 모두 `Week10/release_url.txt`가 가리키는 Release와 그 `v0.2.0` 태그의 커밋을 기준으로 판정한다.

1. 제출한 Python 소스가 .py 파일 한 개이고 100줄 이내이며, `파일 요구사항`의 다른 파일도 줄 수 제한 이내인가?
2. `v0.2.0` 커밋에 `.github/dependabot.yml`(`uv`·`weekly`)과 pytest를 실행하는 CI가 있고, Dependabot의 pytest 업데이트 PR이 성공한 status check와 함께 병합되었으며, `CHANGELOG.md`의 `[0.2.0]` 절에 그 업데이트 항목이 없는가?
3. GitHub Release `v0.2.0`이 `pyproject.toml`의 `version = "0.2.0"`인 커밋을 가리키고, 본문이 `CHANGELOG.md`의 `[0.2.0]` 절(Added·Fixed 각 한 항목 이상)과 같으며, 0.2.0 배포 파일 두 개가 첨부되었는가?

산출물 완성 여부와 별도로 개인 이해도는 다음 수업 시작 후 교수자 감독 아래 Discord 비공개 서술형 문항 하나로 확인한다.
