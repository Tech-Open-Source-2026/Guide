# 인사말 프로그램의 코드 품질 자동화

## 제출 마감 및 push 권한 안내

제출 마감은 **2026년 10월 12일(월) 14:30 (한국시간, KST)**이다. 마감까지 개인 저장소에 코드·설정·`verification.txt`를 push한다. **14:31에 수강생 개인 저장소의 push 권한을 일괄 회수**하며, 이 시각부터 push가 차단된다.

서술형 응시를 위해 **15:00까지 교수자 앞으로 나와야 한다.** 이 시각은 모든 학생의 서술형 풀이를 수업 종료에 맞춰 마치기 위한 응시 도착 기한이다.

서술형 퇴실 답변을 제출하면 일괄 회수 시각 전이라도 해당 학생의 push 권한이 즉시 개별 회수된다. 답변 전에 모든 제출물을 push한다.

문제를 처음 연 순간부터 5분 이내에 답안 제출을 완료해야 합니다. 제한시간이 지나면 문제 화면이 자동으로 사라지고 제출할 수 없습니다. 시간 내 제출하지 않으면 해당 서술형 문항은 0점 처리됩니다.

## 완성할 산출물

이름을 받아 인사말을 출력하는 `greet.py` 하나를 만들고, 실행 결과·타입·표기·코드 규칙을 tox로 검사한다. Git 커밋 전에 Black과 flake8이 실행되도록 연결한다. 동료가 저장소를 받아 같은 명령을 실행할 수 있는 것이 완료 기준이다.

이 README를 바탕으로 직접 구현한다. 별도 시작 코드는 없다.

## 입력과 환경

Python 3.12, Git, 가상환경을 사용한다. 이름은 명령행의 첫 번째 인수로 받는다. 인수가 없으면 `world`를 사용한다. 출력은 한 줄이며 끝에 줄바꿈 하나가 있다.

| 실행 | 표준 출력 |
|---|---|
| `python greet.py Hee` | `Hello, Hee!` |
| `python greet.py` | `Hello, world!` |

파일 안에 `greet(name: str) -> str`, 실행 진입점, `test_greet`를 작성한다. 테스트는 `greet("Hee") == "Hello, Hee!"`를 단언한다. Python 소스는 빈 줄·주석을 포함해 100줄 이내로 한다. `if __name__ == "__main__":` 아래에서 실행 진입점을 호출하여 pytest의 import 시 인사말 실행을 막는다.

## 수행 순서

1. 개인 작업 폴더의 가상환경에 tox 4.63.0과 pre-commit 4.6.2를 설치한다. `greet.py`를 작성하고 위 두 입력으로 결과를 확인한다. AI로 초안을 작성해도 되며 실제 출력이 계약과 맞는지는 직접 확인한다.
2. 같은 루트에 `tox.ini`를 작성한다. 기본 환경 목록은 `py, typecheck, format, lint`다. 패키지 빌드를 하지 않는 한 파일 프로그램이므로 `[testenv]`에 `skip_install = true`를 둔다. 환경별 도구와 명령은 아래 표에 맞춘다. 환경별 `deps`와 `commands`는 같은 키의 기본값을 대체한다.
3. `pyproject.toml`의 `[tool.black]`에 `line-length = 88`, `target-version = ["py310"]`을 둔다. `.flake8`의 `[flake8]`에는 `max-line-length = 88`, `extend-ignore = E203`을 둔다. 실행한 `tox`에서 오류가 나면 해당 파일·줄·규칙을 확인해 고친다.
4. `.pre-commit-config.yaml`에 Black과 flake8 hook을 선언한다. Black 저장소는 `https://github.com/psf/black`, rev는 `25.1.0`, id는 `black`이다. flake8 저장소는 `https://github.com/PyCQA/flake8`, rev는 `7.3.0`, id는 `flake8`이다. flake8 hook의 `additional_dependencies`에 `flake8-bugbear==24.12.12`를 넣는다.
5. Git 저장소에서 제출 파일을 `git add`한 뒤 `pre-commit install`로 로컬 hook을 설치한다. `pre-commit run --all-files`와 `tox`를 실행하고 결과를 확인한다. hook이 파일을 수정했다면 `git diff`를 확인하고 수정 파일을 다시 `git add`한 뒤 커밋한다.

| 환경 | deps에 설치할 도구 | commands에서 실행할 명령 |
|---|---|---|
| py | `pytest==9.1.1` | `python -m pytest greet.py -q` |
| typecheck | `mypy==1.20.2` | `mypy greet.py` |
| format | `black==25.1.0` | `black {posargs:--check --diff greet.py}` |
| lint | `flake8==7.3.0`, `flake8-bugbear==24.12.12` | `flake8 greet.py` |

`py` 환경은 `greet.py`를 명시하므로 그 안의 `test_greet`를 찾는다. 포맷을 실제로 바꿀 때는 `tox -e format -- greet.py`를 쓴다. 뒤의 인수가 `--check --diff greet.py` 전체를 대체하여 Black이 파일을 수정한다. 검사 옵션을 붙인 기본 format 실행은 소스를 수정하지 않는다.

## 실행과 확인

모든 명령은 제출 프로젝트 루트에서 실행한다. 다음 설치는 Linux·macOS 셸 예다. Windows에서는 `py -3.12 -m venv .venv`와 `.venv\Scripts\Activate.ps1`을 사용한다.

```bash
python3.12 -m venv .venv
source .venv/bin/activate
python -m pip install tox==4.63.0 pre-commit==4.6.2
python greet.py Hee
python greet.py
tox
pre-commit install
pre-commit run --all-files
```

`venv`는 로컬 `.venv/`를 만들고 활성화는 현재 셸의 명령 탐색 위치를 바꾼다. `pip`는 그 환경에 도구를 설치한다. `tox`는 `tox.ini`를 읽어 `.tox/` 안에 검사별 도구를 설치하고 실행한다. 패키지 설치만 생략하며 pytest·mypy·Black·flake8 설치는 생략하지 않는다.

`pre-commit install`은 로컬 `.git/hooks/pre-commit`을 만든다. `run --all-files`는 Git이 추적하는 파일 중 hook 조건과 맞는 파일을 검사한다. 새 파일이 미추적 상태이면 먼저 `git add`해야 한다. 커밋 때 hook이 수정한 작업 파일을 자동으로 stage에 올려 주지는 않는다.

완료 시 py는 `1 passed`, typecheck는 `Success`, format은 변경 불필요, lint는 진단 없음이며 네 환경 모두 종료 코드 0이어야 한다. hook도 Black·flake8 모두 Passed여야 한다. 시간·표현의 일부는 설치 환경에 따라 달라질 수 있다.

## 제출

`greet.py`, `tox.ini`, `pyproject.toml`, `.flake8`, `.pre-commit-config.yaml`, `README.md`를 제출한다. `.gitignore`에서 `.venv/`, `.tox/`, `__pycache__/`, `.mypy_cache/`, `.pytest_cache/`를 제외한다. README에는 설치·실행 명령만 기록하면 된다.

직접 실행한 두 인사말 출력, 최종 `tox` 결과, 최종 `pre-commit run --all-files` 결과를 텍스트 로그 `verification.txt`로 함께 제출한다. 고찰·수정 이력·추가 개선 과제는 요구하지 않는다.

## 평가기준

1. 제출한 Python 소스가 `.py` 파일 한 개이고 100줄 이내인가?
2. 이름 입력과 인수 생략에 대해 각각 `Hello, Hee!`, `Hello, world!`를 출력하고 `test_greet`가 실제 반환값을 단언하는가?
3. 설정과 제출 로그에서 네 tox 환경 및 두 hook 검사가 지정 파일에 실행되어 모두 통과했음을 확인할 수 있는가?

산출물 완성 여부와 별도로 개인 이해도는 실습 종료 후 교수자의 현장 확인 및 Discord 비공개 서술형 문항 하나로 확인한다.
