---
name: Kami Academic Korean Lecture
source_template: kami-deck
source_snapshot: nexu-io/open-design@3af55e9f2243ebb92258f2f85efc4de814d6bb16
colors:
  parchment: "#F5F4ED"
  ivory: "#FAF9F5"
  warmSand: "#E8E6DC"
  inkBlue: "#1B365D"
  inkLight: "#B5C8DC"
  nearBlack: "#141413"
  darkWarm: "#3D3D3A"
  olive: "#504E49"
  stone: "#6B6A64"
typography:
  display:
    fontFamily: "Noto Serif KR, Source Serif 4, Georgia, serif"
    fontWeight: 500
    fontSize: 86px
    lineHeight: 1.12
  heading:
    fontFamily: "Noto Serif KR, Source Serif 4, Georgia, serif"
    fontWeight: 500
    fontSize: 52px
    lineHeight: 1.18
  body:
    fontFamily: "Pretendard, Noto Sans KR, system-ui, sans-serif"
    fontWeight: 400
    fontSize: 30px
    lineHeight: 1.45
  mono:
    fontFamily: "JetBrains Mono, D2Coding, monospace"
rounded:
  small: 4px
  medium: 8px
  large: 14px
spacing:
  slidePadX: 96px
  slidePadY: 80px
  gap: 32px
---

# Overview

Kami의 종이 같은 절제와 잉크 블루 단일 강조색을 한국어 대학 강의에 맞게 확장한다. 표지는 잉크 블루, 본문은 따뜻한 파치먼트로 구분하며 제목은 명조 계열, 긴 본문은 산세리프 계열을 사용한다.

## Colors

- 잉크 블루는 표지·마지막 장·섹션 번호·핵심 연결선에만 사용한다.
- 본문 슬라이드는 파치먼트 배경을 유지하고 순백색과 순검정을 사용하지 않는다.
- 두 번째 채도 높은 강조색과 장식용 그라디언트를 추가하지 않는다.

## Typography

- 한국어 제목은 `Noto Serif KR` 500을 우선한다. 이탤릭과 700 이상의 굵기를 사용하지 않는다.
- 본문은 투사 가독성을 위해 `Pretendard` 28–34px을 사용한다.
- 숫자, 주차, 평가 비율에는 `font-variant-numeric: tabular-nums`를 적용한다.
- 화면에는 긴 문단을 넣지 않고 핵심 문장과 짧은 근거만 남긴다.

## Layout

- 1920×1080 기준, 네 방향 여백은 80–96px이다.
- 한 장에는 하나의 학습 목표만 둔다.
- 카드보다 구분선, 번호, 여백을 우선한다. 카드는 비교나 그룹화가 필요한 경우에만 쓴다.
- 표지는 왼쪽 정렬, 섹션 장은 중앙 정렬, 본문 장은 2열 또는 흐름 레이아웃을 기본으로 한다.

## Elevation & Depth

- 기본은 평면과 1px 선이다.
- 필요한 이미지와 코드 블록에만 약한 그림자를 허용한다.
- 글래스모피즘, 강한 그림자, 광택 효과를 금지한다.

## Components

- 섹션 번호는 잉크 블루 명조체로 표시한다.
- 목록 표시는 잉크 블루 en dash를 쓴다.
- 평가 비율과 주차는 숫자를 크게 쓰되 색은 잉크 블루 하나로 제한한다.
- 슬라이드마다 상단 브랜드·주차, 하단 번호, 진행 바를 일관되게 유지한다.

## Do's and Don'ts

- 학생이 화면을 한 번 보고 핵심 질문을 말할 수 있게 구성한다.
- 원문의 평가 비율, 주차 순서, AI 사용 책임을 그대로 보존한다.
- 출처 없는 수치, 사례, 인용을 추가하지 않는다.
- 예제 템플릿의 연구 내용이나 기관명을 남기지 않는다.

## Attribution

Visual system adapted from Open Design `kami-deck`, inspired by `tw93/kami` (MIT). The course content comes only from `../1주차_배포용.md` and its referenced Venn diagram.
