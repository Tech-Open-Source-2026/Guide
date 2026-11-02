# 인사말 패키지의 Sphinx 문서 사이트 빌드

## 제출 마감 및 push 권한 안내

제출 마감은 **2026년 11월 2일(월) 14:50 (한국시간, KST)**이다. 마감까지 수업 개인 저장소에 `Week09/`를 push한다. **14:50부터 push가 차단되며, 14:51에 수강생 개인 저장소의 push 권한을 일괄 회수**한다.

- 서술형 문제는 **다음 수업 시작 10분 후 전원이 함께** 응시한다. 마감 시점에 개인 저장소에 push된 `Week09/`의 코드와 문서 원본이 문제와 채점의 기준이다.
- push 권한은 마감부터 다음 수업의 서술형 응시와 평가가 끝날 때까지 닫혀 있다.
- 권한이 닫혀 있는 동안 다음 실습 코드는 로컬에 commit만 해 두고, 권한이 열리면 push한다.
- 서술형 시작 시각 전에 UCheck 출석 또는 지각 기록이 없으면 응시하더라도 0점이다.

문제를 처음 연 순간부터 5분 이내에 답안 제출을 완료해야 합니다. 제한시간이 지나면 문제 화면이 자동으로 사라지고 제출할 수 없습니다. 시간 내 제출하지 않으면 해당 서술형 문항은 0점 처리됩니다.

## 완성할 산출물

수업 개인 저장소의 `Week09/`에 인사말 패키지 `greet-docs`와 Sphinx 문서 원본 `docs/`를 만든다. `Week09/`에서 `uv run sphinx-build -E -W -b html docs docs/_build`를 실행하면 경고 없이 빠른 시작·개발 안내·API 참조 페이지가 만들어지고, 브라우저로 `docs/_build/index.html`을 열어 세 페이지가 보이면 완료다.

문서의 독자는 `greet-docs` 명령을 처음 쓰는 사용자와 코드를 고치는 개발자다. 입력은 `docs/`의 `.rst` 파일과 패키지 코드의 docstring이고, 출력은 `docs/_build/`의 HTML 페이지다.

이 README를 바탕으로 직접 구현한다. 별도 시작 코드는 없다. 강의의 `hello-open-source`는 문서 구성을 설명하는 시연 예제이며, 이 실습의 제출 시작 파일이 아니다.

## 입력과 환경

uv·Git을 사용하고, 문서 도구는 Sphinx 9.0.4로 고정한다.

Python 소스는 패키지 코드 `src/greet_docs/__init__.py` 한 개이며 빈 줄·주석을 포함해 100줄 이내로 한다. `docs/conf.py`는 Sphinx 설정 파일이므로 Python 소스 개수에 넣지 않는다. `__init__.py`에는 다음 세 가지를 둔다.

| 대상 | 요구 |
|---|---|
| 모듈 docstring | 패키지가 하는 일을 한 문장으로 쓴다. |
| `greet(name: str) -> str` | `Hello, <name>!`을 반환한다. docstring에 `:param name:`과 `:returns:`를 쓴다. |
| `main() -> int` | 명령행 첫 번째 인수를 이름으로 받아 인사말을 한 줄 출력하고 0을 반환한다. 인수가 없으면 `world`를 사용한다. docstring을 쓴다. |

| 실행 (`Week09/`에서) | 표준 출력 |
|---|---|
| `uv run greet-docs Hee` | `Hello, Hee!` |
| `uv run greet-docs` | `Hello, world!` |

## 제출 배치

```text
수업 개인 저장소
└── Week09/
    ├── .gitignore
    ├── pyproject.toml
    ├── uv.lock
    ├── src/
    │   └── greet_docs/
    │       └── __init__.py
    └── docs/
        ├── conf.py
        ├── index.rst
        ├── quickstart.rst
        └── development.rst
```

모든 명령은 `Week09/`에서 실행한다. 빌드 결과 `docs/_build/`와 apidoc이 만드는 `docs/reference/`는 제출하지 않는다.

## 파일 요구사항

`pyproject.toml`에는 다음 표를 둔다.

| 표 | 키와 값 |
|---|---|
| `[build-system]` | `requires = ["setuptools>=77"]`, `build-backend = "setuptools.build_meta"` |
| `[project]` | `name = "greet-docs"`, `version = "0.1.0"`, `requires-python = ">=3.11"` |
| `[project.scripts]` | `greet-docs = "greet_docs:main"` |
| `[tool.setuptools.packages.find]` | `where = ["src"]` |
| `[dependency-groups]` | `dev = ["sphinx==9.0.4"]` |

`uv lock`으로 만든 `uv.lock`을 함께 커밋한다. 다른 사람이 `uv sync` 한 번으로 같은 패키지와 Sphinx를 설치할 수 있게 하기 위해서다.

`docs/` 파일은 다음을 충족한다. `uv run sphinx-quickstart docs`로 시작해도 되며, 그때 생기는 `Makefile`·`make.bat`·빈 `_static/`·`_templates/`와 `conf.py`의 `html_static_path`·`templates_path` 줄은 지운다. 빈 폴더는 Git에 기록되지 않아, 저장소를 새로 받아 빌드하면 경고가 되기 때문이다.

| 파일 | 요구 |
|---|---|
| `docs/conf.py` | `extensions = ['sphinx.ext.apidoc']`, `apidoc_modules`에 `'path': '../src/greet_docs'`와 `'destination': 'reference'` |
| `docs/index.rst` | 패키지 소개 한 문장과 toctree. 항목은 `quickstart`, `development`, `reference/modules` |
| `docs/quickstart.rst` | 튜토리얼 페이지. `uv sync` 설치 방법, `uv run greet-docs Hee`와 출력 `Hello, Hee!`를 담은 `.. code-block:: console`, 이름을 빼면 `world`를 쓴다는 문장 |
| `docs/development.rst` | 개발자 문서. 코드 위치(`src/greet_docs/__init__.py`)와 문서 빌드 명령 `uv run sphinx-build -E -W -b html docs docs/_build` |

`.gitignore`에서 `.venv/`, `__pycache__/`, `*.egg-info/`, `docs/_build/`, `docs/reference/`를 제외한다. `docs/reference/`는 apidoc 확장이 빌드마다 다시 만든다.

## 수행 순서

1. 수업 개인 저장소에 `Week09/`를 만들고 `pyproject.toml`과 `src/greet_docs/__init__.py`를 작성한 뒤 `uv lock`을 실행한다. AI로 초안을 작성해도 되며, 실제 출력이 위 표와 맞는지는 직접 확인한다.
2. `docs/`의 네 파일과 `.gitignore`를 작성한다.
3. 아래 `실행과 확인`의 명령이 모두 통과하는지 확인한다. 브라우저로 `docs/_build/index.html`을 열어 Quickstart·Development·`greet_docs package` 페이지가 목차에 보이는지, API 페이지에 `greet(name: str) → str`과 Parameters·Returns가 보이는지 확인한다.
4. `Week09/`를 커밋하고 push한다.

## 실행과 확인

```bash
uv lock
uv run greet-docs Hee
uv run greet-docs
uv run sphinx-build -E -W -b html docs docs/_build
```

정상 결과는 다음과 같다. 두 인사말이 위 표대로 출력된다. `sphinx-build`는 `Running apidoc`을 출력하고 경고 없이 `build succeeded.`로 끝나며 종료 코드는 0이다. `docs/_build/`에는 `index.html`, `quickstart.html`, `development.html`, `reference/modules.html`, `reference/greet_docs.html`이 생긴다.

`-E`를 빼면 바뀌지 않은 파일의 경고가 다시 나오지 않으므로 확인할 때는 항상 위 명령 그대로 실행한다. `-W`는 경고를 오류로 바꾸므로 경고가 하나라도 나오면 종료 코드가 1이 된다.

## 선택: Read the Docs 공개

채점하지 않는 선택 과제다. 강의의 Read the Docs 절차대로 본인 계정 public 저장소에 같은 파일을 루트에 두고 `.readthedocs.yaml`을 더해 등록하면, `main`에 push할 때마다 공개 주소의 문서가 다시 빌드된다. public 저장소와 공개 문서는 누구나 볼 수 있으므로 이름·학번·연락처를 넣지 않는다.

## 평가기준

세 기준은 모두 마감 시점 수업 개인 저장소의 고정 제출 커밋에 있는 `Week09/` 파일을 읽어 판정한다.

1. 제출한 Python 소스가 .py 파일 한 개이고 100줄 이내인가?
2. `docs/conf.py`·`index.rst`·`quickstart.rst`·`development.rst`가 위 `docs/` 요구사항 표를 충족하는가?
3. `src/greet_docs/__init__.py`에 모듈 docstring, `greet(name: str) -> str`과 `:param name:`·`:returns:`를 쓴 docstring, `main() -> int`와 docstring이 있고, `pyproject.toml`이 위 표를 충족하며 `uv.lock`이 함께 제출되었는가?

산출물 완성 여부와 별도로 개인 이해도는 다음 수업 시작 후 교수자 감독 아래 Discord 비공개 서술형 문항 하나로 확인한다.
