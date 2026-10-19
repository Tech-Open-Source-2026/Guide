# 인사말 프로그램의 GitHub Actions CI 구성

## 제출 마감 및 push 권한 안내

제출 마감은 **2026년 10월 19일(월) 14:30 (한국시간, KST)**이다. 마감까지 수업 개인 저장소에 `Week07/ci_run.txt`를 push한다. **14:30부터 push가 차단되며, 14:31에 수강생 개인 저장소의 push 권한을 일괄 회수**한다.

- 서술형 문제는 **다음 수업 시작 10분 후 전원이 함께** 응시한다. 마감 시점에 개인 저장소에 push된 `Week07/ci_run.txt`가 가리키는 CI 실행의 커밋이 문제와 채점의 기준이다.
- push 권한은 마감부터 다음 수업의 서술형 응시와 평가가 끝날 때까지 닫혀 있다.
- 권한이 닫혀 있는 동안 다음 실습 코드는 로컬에 commit만 해 두고, 권한이 열리면 push한다.
- 서술형 시작 시각 전에 UCheck 출석 또는 지각 기록이 없으면 응시하더라도 0점이다.

문제를 처음 연 순간부터 5분 이내에 답안 제출을 완료해야 합니다. 제한시간이 지나면 문제 화면이 자동으로 사라지고 제출할 수 없습니다. 시간 내 제출하지 않으면 해당 서술형 문항은 0점 처리됩니다.

## 완성할 산출물

본인 GitHub 계정에 이 실습 전용 **public 저장소** `greet-ci`를 새로 만든다. 저장소 루트에 인사말 프로그램 `greet.py`, uv 프로젝트 설정, `.github/workflows/ci.yml`을 둔다. 기능 브랜치에서 main으로 병합 요청(PR)을 열면 네 환경의 테스트, 품질 검사, 패키지 빌드와 artifact 보관이 자동으로 실행된다. 여섯 작업이 모두 성공한 PR을 main에 병합하고, 병합 뒤 main에서 성공한 CI 실행의 링크를 수업 개인 저장소에 제출하면 완료다.

CI는 수업 개인 저장소가 아니라 본인 public 저장소에서 실행한다. GitHub는 public 저장소의 표준 runner 실행 시간을 차감하지 않으므로 Windows 작업을 포함해도 수업 조직의 Actions 한도에 영향을 주지 않는다. 수업 개인 저장소에는 실행 링크 한 줄만 둔다.

이 README를 바탕으로 직접 구현한다. 별도 시작 코드는 없다. 강의의 `hello-open-source`는 CI 구성을 설명하는 시연 예제이며, 이 실습의 제출 시작 파일이 아니다.

## 입력과 환경

로컬에서는 uv·Git을 사용하고, CI에서는 uv 0.8.14와 Python 3.11·3.12를 사용한다. `greet-ci` 저장소의 기본 브랜치는 `main`이다. 이름은 명령행의 첫 번째 인수로 받는다. 인수가 없으면 `world`를 사용한다. 출력은 한 줄이며 끝에 줄바꿈 하나가 있다.

| 실행 (`greet-ci` 루트에서) | 표준 출력 |
|---|---|
| `uv run --locked python greet.py Hee` | `Hello, Hee!` |
| `uv run --locked python greet.py` | `Hello, world!` |

`greet.py` 안에 `greet(name: str) -> str`, 실행 진입점, `test_greet`를 작성한다. 테스트는 `greet("Hee") == "Hello, Hee!"`를 단언한다. `if __name__ == "__main__":` 아래에서 실행 진입점을 호출해 pytest가 파일을 import할 때 인사말이 출력되지 않게 한다. Python 소스는 `greet.py` 한 개이며 빈 줄·주석을 포함해 100줄 이내로 한다.

## 저장소 배치

두 저장소를 사용한다. `greet-ci`는 코드와 CI를 두는 본인 public 저장소이고, 수업 개인 저장소는 실행 링크만 제출하는 곳이다.

```text
https://github.com/<본인ID>/greet-ci   (public, 본인 계정)
├── .github/
│   └── workflows/
│       └── ci.yml
├── greet.py
├── pyproject.toml
├── uv.lock
├── .flake8
├── .gitignore
└── README.md

수업 개인 저장소 (기존)
└── Week07/
    └── ci_run.txt
```

GitHub는 저장소 루트의 `.github/workflows/` 안에 있는 파일만 workflow로 읽는다. `greet-ci`는 이 실습 전용 저장소이므로 프로젝트 파일도 루트에 두고, 모든 명령을 루트에서 실행한다.

public 저장소는 누구나 볼 수 있다. 코드·커밋·README에 이름·학번·연락처를 넣지 않는다. GitHub 계정 ID는 수업 등록 정보와 대조하는 용도로만 쓴다.

## 프로젝트 설정

`pyproject.toml`에는 다음 표를 둔다.

| 표 | 키와 값 |
|---|---|
| `[build-system]` | `requires = ["setuptools>=77"]`, `build-backend = "setuptools.build_meta"` |
| `[project]` | `name = "greet-week07"`, `version = "0.1.0"`, `requires-python = ">=3.11"` |
| `[tool.black]` | `line-length = 88`, `target-version = ["py311"]` |
| `[dependency-groups]` | `dev = ["black==25.1.0", "flake8==7.3.0", "flake8-bugbear==24.12.12", "mypy==1.18.2", "pytest==8.4.2"]` |

루트에 Python 모듈이 `greet.py` 하나뿐이므로 setuptools가 이 모듈을 찾아 배포 파일에 넣는다. dev 그룹은 `uv run`이 기본으로 설치한다. `.flake8`의 `[flake8]`에는 `max-line-length = 88`, `extend-ignore = E203`을 둔다.

루트에서 `uv lock`을 실행하면 `uv.lock`이 생긴다. `pyproject.toml`과 `uv.lock`을 함께 커밋한다. CI의 `uv run --locked`는 두 파일이 맞지 않으면 lock을 고치지 않고 실패한다.

## workflow 요구사항

`.github/workflows/ci.yml`은 다음 표를 모두 충족한다.

| 위치 | 요구 |
|---|---|
| `name` | `CI` |
| `on` | `push`와 `pull_request` 각각 `branches: [main]` |
| `permissions` | `contents: read` |
| `jobs.tests` | `name: Tests (${{ matrix.os }}, ${{ matrix.python }})`, `runs-on: ${{ matrix.os }}`, `strategy.fail-fast: false`, `matrix.os: [ubuntu-latest, windows-latest]`, `matrix.python: ["3.11", "3.12"]` |
| `jobs.tests.steps` | `actions/checkout@v7` → `astral-sh/setup-uv@v7`(`version: "0.8.14"`, `python-version: ${{ matrix.python }}`) → `Run pytest`: `uv run --locked pytest -q greet.py` |
| `jobs.quality` | `name: Quality`, `runs-on: ubuntu-latest` |
| `jobs.quality.steps` | checkout → setup-uv(`"0.8.14"`, `"3.12"`) → `Check formatting`: `uv run --locked black --check greet.py` → `Check lint`: `uv run --locked flake8 greet.py` → `Check types`: `uv run --locked mypy greet.py` |
| `jobs.build` | `name: Build package`, `needs: [tests, quality]`, `runs-on: ubuntu-latest` |
| `jobs.build.steps` | checkout → setup-uv(`"0.8.14"`, `"3.12"`) → `Build distributions`: `uv build` → `Save distributions`: `actions/upload-artifact@v7`(`name: greet-dist`, `path: dist/*`, `if-no-files-found: error`) |

성공한 실행에는 tests 4개, quality 1개, build 1개로 모두 여섯 작업이 있다.

## 수행 순서

1. GitHub에서 **New repository → Owner: 본인 계정, Repository name: `greet-ci`, Public, Add a README file 선택 → Create repository**로 저장소를 만든다. README를 함께 만들면 첫 커밋이 있는 `main`이 생긴다.
2. 저장소를 내려받고 기능 브랜치를 만든다. `switch -c`는 새 브랜치를 만든 뒤 이동하며 main은 바뀌지 않는다.

   ```bash
   git clone https://github.com/<본인ID>/greet-ci.git
   cd greet-ci
   git switch -c week07-ci
   ```

3. 루트에 `greet.py`, `pyproject.toml`, `.flake8`, `.gitignore`를 작성하고 `uv lock`을 실행한다. `README.md`에는 설치·실행 명령을 적는다. AI로 초안을 작성해도 되며, 실제 출력이 위 표와 맞는지는 직접 확인한다.
4. 루트에 `.github/workflows/ci.yml`을 작성한다.
5. 아래 로컬 확인 명령을 실행해 CI와 같은 명령이 통과하는지 확인한다.
6. 파일을 커밋하고 기능 브랜치를 push한다. push 필터가 main이므로 이 push만으로는 CI가 실행되지 않는다.
7. GitHub에서 **Pull requests → New pull request → base: `main`, compare: `week07-ci` → Create pull request**로 PR을 연다. **Actions → CI**에서 이 PR의 실행을 열고 여섯 작업이 모두 성공했는지, **Artifacts**에 `greet-dist`가 있는지 확인한다. 실패하면 실행 → job → step → 출력 순서로 원인을 찾는다. 고친 커밋을 같은 브랜치에 push하면 PR이 갱신되고 새 실행이 생긴다.
8. 여섯 작업이 모두 성공하면 **Merge pull request**로 main에 병합한다. 병합 커밋이 main에 push되므로 CI가 main에서 한 번 더 실행된다.
9. **Actions → CI**에서 병합 뒤 생긴 `main` 실행이 성공했는지 확인하고, 그 실행 페이지의 주소를 복사해 아래 `제출`대로 수업 개인 저장소에 올린다.

## 실행과 확인

로컬 확인은 `greet-ci` 루트에서 실행한다.

```bash
uv lock
uv run --locked python greet.py Hee
uv run --locked python greet.py
uv run --locked pytest -q greet.py
uv run --locked black --check greet.py
uv run --locked flake8 greet.py
uv run --locked mypy greet.py
uv build
```

`uv run --locked`는 `uv.lock`에 기록된 버전으로 `.venv/`를 만들고 명령을 실행한다. 정상 결과는 다음과 같다. 두 인사말이 출력되고, pytest는 `1 passed`, Black은 `1 file would be left unchanged.`, flake8은 진단 없음, mypy는 `Success: no issues found in 1 source file`이다. `uv build`는 `dist/`에 `greet_week07-0.1.0.tar.gz`와 `greet_week07-0.1.0-py3-none-any.whl`을 만든다. 모든 명령의 종료 코드는 0이다.

커밋과 push도 루트에서 실행한다.

```bash
git add .github/workflows/ci.yml greet.py pyproject.toml uv.lock .flake8 .gitignore README.md
git commit -m "Add CI workflow"
git push -u origin week07-ci
```

`.gitignore`에서 `.venv/`, `__pycache__/`, `.mypy_cache/`, `.pytest_cache/`, `dist/`, `build/`, `*.egg-info/`를 제외한다. `dist/`의 배포 파일은 커밋하지 않고 CI의 artifact로 확인한다.

## 제출

수업 개인 저장소의 `Week07/ci_run.txt`에 병합 뒤 `main`에서 성공한 CI 실행의 주소 한 줄만 적어 커밋·push한다.

```text
https://github.com/<본인ID>/greet-ci/actions/runs/<실행 번호>
```

PR 실행이나 실패한 실행의 주소는 인정하지 않는다. 주소가 맞는지는 브라우저에서 열어 실행 요약에 `Triggered via push`, 브랜치 `main`, 상태 `Success`가 보이고 여섯 작업이 모두 초록색 체크인지로 확인한다.

이 주소가 가리키는 실행의 커밋이 제출물이다. 이 커밋의 `greet-ci`에는 `.github/workflows/ci.yml`, `greet.py`, `pyproject.toml`, `uv.lock`, `.flake8`, `.gitignore`, `README.md`가 있어야 한다. 마감 뒤 `greet-ci`에 커밋을 더해도 제출한 실행의 커밋은 바뀌지 않는다. 제출한 실행을 삭제하거나 저장소를 비공개로 바꾸면 확인할 수 없으므로 미제출로 처리한다.

고찰·수정 이력·추가 개선 과제는 요구하지 않는다.

## 평가기준

세 기준은 모두 `Week07/ci_run.txt`가 가리키는 실행의 커밋을 기준으로 판정한다.

1. 제출한 Python 소스가 `.py` 파일 한 개이고 100줄 이내인가?
2. `ci.yml`이 main 대상 push·PR에서 실행되고, 2 OS × 2 Python matrix를 runner와 Python 선택에 연결한 tests, Black·flake8·mypy를 실행하는 quality, 두 작업의 성공 뒤 `uv build` 결과를 `if-no-files-found: error`로 보관하는 build를 구성하는가?
3. `Week07/ci_run.txt`의 주소가 본인 계정 저장소에서 마감 전에 `main` push로 실행되어 성공한 `.github/workflows/ci.yml` 실행을 가리키는가?

산출물 완성 여부와 별도로 개인 이해도는 다음 수업 시작 10분 후 교수자 감독 아래 Discord 비공개 서술형 문항 하나로 확인한다.
