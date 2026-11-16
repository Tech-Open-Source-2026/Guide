# 기여 안내를 갖춘 인사말 패키지 프로젝트 템플릿

## 제출 마감 및 push 권한 안내

제출 마감은 **2026년 11월 16일(월) 14:50 (한국시간, KST)**이다. 마감까지 본인 계정의 public 저장소 `greet-template`·`greet-community`와 `add-usage` → `main` PR을 준비하고, 수업 개인 저장소에 `Week11/community_url.txt`를 push한다. **14:50부터 push가 차단되며, 14:51에 수강생 개인 저장소의 push 권한을 일괄 회수**한다. 마감 시각에 `community_url.txt`가 가리키는 `greet-template`의 최신 커밋과 `greet-community`의 PR을 기록해 두며, 마감 뒤 두 저장소나 PR을 고쳐도 기록한 커밋과 PR이 채점 기준이다.

- 서술형 문제는 **다음 수업 시작 후 교수자가 정한 시각에 전원이 함께** 응시한다(응시 시각은 이 절에 추가 공지). 마감 시점에 `Week11/community_url.txt`가 가리키는 `greet-template`의 커밋과 `greet-community`의 PR이 문제와 채점의 기준이다.
- 서술형 평가 대상: 그 커밋의 `cookiecutter.json`, `{{cookiecutter.package_distribution_name}}/` 안의 `pyproject.toml`·`CONTRIBUTING.md`·`README.md`·`.gitignore`·`src/{{cookiecutter.package_import_name}}/__init__.py`, `greet-community`의 `add-usage` → `main` PR과 `Week11/community_url.txt`이다. 줄이나 키 이름을 외울 필요는 없고, 각 파일이 하는 일과 틀에서 프로젝트가 만들어지는 과정, `CONTRIBUTING.md`의 기여 절차를 자기 저장소에 비추어 설명할 수 있으면 된다.
- push 권한은 마감부터 다음 수업의 서술형 응시와 평가가 끝날 때까지 닫혀 있다.
- 권한이 닫혀 있는 동안 다음 실습 코드는 로컬에 commit만 해 두고, 권한이 열리면 push한다.
- 서술형 시작 시각 전에 UCheck 출석 또는 지각 기록이 없으면 응시하더라도 0점이다.

문제를 처음 연 순간부터 5분 이내에 답안 제출을 완료해야 합니다. 제한시간이 지나면 문제 화면이 자동으로 사라지고 제출할 수 없습니다. 시간 내 제출하지 않으면 해당 서술형 문항은 0점 처리됩니다.

## 완성할 산출물

- 본인 GitHub 계정의 이 실습 전용 **public 저장소 두 개**
  - `greet-template`: cookiecutter 프로젝트 템플릿(틀). 저장소 맨 위에 `cookiecutter.json`과 새 프로젝트가 될 폴더 `{{cookiecutter.package_distribution_name}}/`
  - `greet-community`: 이 틀로 만든 인사말 패키지. 틀에서 함께 만들어진 기여 안내 `CONTRIBUTING.md` 포함
- 완료 조건: 틀에서 기본값으로 만든 프로젝트에 `CONTRIBUTING.md`와 `src/greet_community/__init__.py`가 생기고 자리표시자 `{{`가 남은 줄이 0개이며, `greet-community` 저장소에 **`CONTRIBUTING.md`의 `Send a change` 절차대로 연 PR 한 개**가 있는 상태
- 시작 코드 없음. 강의의 `python-package-template`·`geometry-lines`는 시연 예제이며 이 실습의 제출 시작 파일이 아님. 강의 덱의 파일 구성을 참고해 AI로 초안을 작성해도 되며, 아래 실행 결과가 표와 맞는지는 직접 확인

## 입력과 환경

- 로컬: uv·Git, cookiecutter 2.7.1(`uv tool install cookiecutter==2.7.1`), Python 3.11 이상 가상환경(2주차 방식)
- Python 소스: 틀의 `{{cookiecutter.package_distribution_name}}/src/{{cookiecutter.package_import_name}}/__init__.py` **한 개**. `greet-community`의 같은 파일은 이 파일을 cookiecutter가 채운 결과라 따로 세지 않음
- `__init__.py`에 둘 것

| 대상 | 요구 |
|---|---|
| 첫 줄 docstring | `"""{{ cookiecutter.package_description }}."""` (자리표시자 사용) |
| `greet(name: str) -> str` | `Hello, <name>!` 반환. 앞뒤 공백을 지운 이름이 비면 `world` 사용 |

| 확인 명령(가상환경 활성화, `greet-community` 폴더에서 `python -m pip install -e .` 뒤) | 표준 출력 |
|---|---|
| `python -c "from greet_community import greet; print(greet('Hee'))"` | `Hello, Hee!` |
| `python -c "from greet_community import greet; print(greet(' '))"` | `Hello, world!` |

## 저장소 배치

```text
https://github.com/<본인ID>/greet-template   (public, 본인 계정) = 틀
├── README.md                                   ← 틀 사용법(cookiecutter 명령 한 줄)
├── cookiecutter.json
└── {{cookiecutter.package_distribution_name}}/
    ├── .gitignore
    ├── CONTRIBUTING.md
    ├── LICENSE
    ├── README.md
    ├── pyproject.toml
    └── src/
        └── {{cookiecutter.package_import_name}}/
            └── __init__.py

https://github.com/<본인ID>/greet-community  (public, 본인 계정) = 틀로 만든 프로젝트
└── (위 {{cookiecutter.package_distribution_name}}/ 안의 구성이 채워진 결과, src/greet_community/)

수업 개인 저장소 (기존)
└── Week11/
    └── community_url.txt
```

- `greet-template` 맨 위의 `README.md`는 틀 저장소 설명용 파일로, cookiecutter가 새 프로젝트에 복사하지 않음(새 프로젝트에는 `{{cookiecutter.package_distribution_name}}/` 안의 파일만 생김)
- public 저장소이므로 코드·문서·커밋에 학번·전화번호를 넣지 않음. `package_author_name`에는 공개해도 되는 이름만 사용

## 파일 요구사항

`cookiecutter.json`(키 순서 그대로, 값은 모두 문자열 기본값):

| 키 | 기본값 |
|---|---|
| `package_distribution_name` | `"greet-community"` |
| `package_import_name` | `"greet_community"` |
| `package_description` | 한 줄 설명 문자열 |
| `package_author_name` | 작성자 이름 문자열 |

틀 안의 파일:

| 파일 | 요구 |
|---|---|
| `pyproject.toml` | `[build-system]` `requires = ["setuptools>=77"]`·`build-backend = "setuptools.build_meta"`, `[project]`의 `name`·`description`·`authors`(이름)를 자리표시자로, `version = "0.1.0"`, `license = "MIT"`, `license-files = ["LICENSE"]`, `requires-python = ">=3.11"`, `[tool.setuptools.packages.find]` `where = ["src"]` |
| `LICENSE` | MIT 원문. 저작권자 줄에 `{{ cookiecutter.package_author_name }}` |
| `CONTRIBUTING.md` | 제목 `# Contributing to {{ cookiecutter.package_distribution_name }}`과 세 절: `## Set up for development`(`python -m pip install -e .`), `## Run the tests`(확인 명령 `python -c "from {{ cookiecutter.package_import_name }} import greet; print(greet('Hee'))"`와 기대 출력 `Hello, Hee!`), `## Send a change`(`main`에서 브랜치 만들고 커밋 → 브랜치 push → `main`으로 PR) |
| `README.md`, `.gitignore` | README에 배포 이름·설명 자리표시자와 설치 명령, `.gitignore`에 `.venv/`·`__pycache__/`·`*.egg-info/`·`dist/`·`build/` |

## 수행 순서

1. `uv tool install cookiecutter==2.7.1` → `cookiecutter --version`으로 2.7.1 확인
2. 작업 폴더에 `greet-template/`을 만들고 `cookiecutter.json`과 위 구조의 파일 작성
3. 기본값으로 프로젝트 생성: `greet-template/`이 있는 폴더에서 `cookiecutter greet-template` → 질문 4개마다 Enter(괄호 안 기본값, 강의 5장) → `greet-community/` 생성 확인(`tree -a --noreport greet-community`), `grep -rn '{{' greet-community | wc -l`이 `0`인지 확인(강의 6장). 다시 만들 때는 이전 `greet-community/`를 지운 뒤 실행
4. 가상환경을 활성화하고 `greet-community/CONTRIBUTING.md`의 `Set up for development`·`Run the tests`를 그대로 따라 실행 → `입력과 환경`의 두 확인 명령 결과 확인
5. 다른 답 확인: `cookiecutter greet-template`을 다시 실행해 [1/4]에 `greet-other`, [2/4]에 `greet_other`를 입력하고 나머지는 Enter → `greet-other/pyproject.toml`의 `name`, `greet-other/src/` 아래 폴더 이름, `CONTRIBUTING.md` 첫 줄 확인 → 확인 뒤 `greet-other/` 삭제(제출하지 않음)
6. GitHub에서 **New repository → Owner: 본인 계정, Repository name: `greet-template`, Public, README 추가 없음 → Create repository** → 로컬 `greet-template/`에서 `git init` → 커밋 → `git branch -M main` → `git remote add origin https://github.com/<본인ID>/greet-template.git` → `git push -u origin main`
7. 같은 방식으로 public 저장소 `greet-community`를 만들고 3단계에서 만든 `greet-community/` 폴더를 push(`main` 브랜치)
8. `greet-community/CONTRIBUTING.md`의 `Send a change`대로 변경 하나 보내기: `main`에서 브랜치 `add-usage` 생성 → `README.md`의 `## Use` 절에 `Run the tests`의 확인 명령과 기대 출력 `Hello, Hee!`를 한 줄씩 추가해 커밋 → 브랜치 push → GitHub에서 `add-usage` → `main` PR 열기(병합하지 않아도 됨)

## 실행과 확인

```bash
cookiecutter greet-template          # 질문 4개 모두 Enter
tree -a --noreport greet-community
grep -rn '{{' greet-community | wc -l
cd greet-community
python -m pip install -e .
python -c "from greet_community import greet; print(greet('Hee'))"
python -c "from greet_community import greet; print(greet(' '))"
```

- 예시 구현(`__init__.py` 7줄)의 결과: 트리에 `.gitignore`·`CONTRIBUTING.md`·`LICENSE`·`README.md`·`pyproject.toml`·`src/greet_community/__init__.py`, 남은 자리표시자 줄 수 `0`, `CONTRIBUTING.md`의 절 `## Set up for development`·`## Run the tests`·`## Send a change`, 인사말 `Hello, Hee!`·`Hello, world!`
- 다른 답(수행 순서 5): `pyproject.toml`의 `name = "greet-other"`, `src/greet_other/`, `CONTRIBUTING.md` 첫 줄 `# Contributing to greet-other`

## 제출

수업 개인 저장소의 `Week11/community_url.txt`에 두 줄만 적어 커밋·push:

```text
https://github.com/<본인ID>/greet-template
https://github.com/<본인ID>/greet-community/pull/1
```

- 첫 줄: 틀 저장소 주소. 둘째 줄: `Send a change` 절차로 연 PR 주소(번호는 실제 번호)
- 확인 방법: 브라우저에서 두 주소가 열리고, PR 화면에 `add-usage` → `main`과 `README.md` 변경이 보이는 상태
- 제출물: 두 public 저장소의 최신 커밋과 그 PR. 저장소를 비공개로 바꾸거나 PR을 닫고 브랜치를 지우면 확인 불가로 미제출 처리
- 고찰·수정 이력·추가 개선 과제는 요구하지 않음

## 평가기준

1. 제출한 Python 소스가 .py 파일 한 개이고, 직접 작성한 소스·설정·문서의 합계가 100줄 이내인가?
2. `greet-template`을 내려받아 `cookiecutter greet-template`을 실행해 질문 4개에 모두 Enter(기본값)로 생성하면 `greet-community/`에 `CONTRIBUTING.md`(세 절 `Set up for development`·`Run the tests`·`Send a change`)와 `src/greet_community/__init__.py`가 생기고 `{{`가 남은 줄이 0개이며, 배포 이름·import 이름 답을 `greet-other`·`greet_other`로 주면 `pyproject.toml`의 `name`과 `src/` 아래 폴더 이름이 그 값으로 바뀌는가?
3. `greet-community`에 `main`이 아닌 브랜치에서 `main`으로 연 PR이 있고, 그 저장소의 `CONTRIBUTING.md` `Run the tests` 명령을 `Set up for development` 뒤 실행하면 `Hello, Hee!`가 출력되는가?

산출물 완성 여부와 별도로 개인 이해도는 다음 수업 시작 후 교수자 감독 아래 Discord 비공개 서술형 문항 하나로 확인.

## 전체 작성량 기준

- 직접 작성한 Python 소스·설정·문서·제출 주소 파일을 모두 합쳐 빈 줄·주석 포함 100줄 이내
- 제외 대상: 제공 README·제공 데이터·자동 생성 파일·외부 라이선스 원문·실행 결과 이미지
- 템플릿과 생성 결과는 중복 집계하지 않고 직접 작성한 틀 원본만 집계
- Python 소스는 한 개 유지, 줄 수를 줄이기 위한 읽기 어려운 압축은 불필요

## 예시 구현의 작성량

| 집계 파일 | 실제 줄 수 |
|---|---:|
| `cookiecutter.json` | 6 |
| `README.md` | 7 |
| `{{cookiecutter.package_distribution_name}}/.gitignore` | 5 |
| `{{cookiecutter.package_distribution_name}}/CONTRIBUTING.md` | 21 |
| `{{cookiecutter.package_distribution_name}}/pyproject.toml` | 16 |
| `{{cookiecutter.package_distribution_name}}/README.md` | 15 |
| `{{cookiecutter.package_distribution_name}}/src/{{cookiecutter.package_import_name}}/__init__.py` | 7 |
| `Week11/community_url.txt` | 2 |
| `greet-community/README.md` 생성 후 직접 추가한 부분 | 2 |
| **합계** | **81** |
