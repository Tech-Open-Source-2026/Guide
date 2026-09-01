(() => {
  const currentWeek = 1;
  const toolbar = document.createElement("div");
  toolbar.id = "lecture-toolbar";
  toolbar.setAttribute("aria-label", "강의 주차와 화면 제어");
  toolbar.innerHTML = `
    <a href="../../">주차 목록</a>
    <label><span class="lecture-sr-only">주차 선택</span>
      <select aria-label="주차 선택"><option value="1" selected>1주차 · 강의계획과 Git 기초</option></select>
    </label>`;

  const style = document.createElement("style");
  style.textContent = `#lecture-toolbar{position:fixed;right:18px;bottom:18px;z-index:9999;display:flex;gap:8px;align-items:center}#lecture-toolbar a,#lecture-toolbar select,#lecture-toolbar button{box-sizing:border-box;min-height:38px;border:1px solid #d7d4c8!important;border-radius:0!important;background:#faf9f5!important;color:#1b365d!important;padding:0 12px!important;font:700 15px/1 system-ui,sans-serif!important;text-decoration:none;cursor:pointer;box-shadow:0 3px 12px #11192333}#lecture-toolbar a,#lecture-toolbar button{display:flex;align-items:center;position:static!important;inset:auto!important}#lecture-toolbar a:hover,#lecture-toolbar select:hover,#lecture-toolbar button:hover,#lecture-toolbar a:focus-visible,#lecture-toolbar select:focus-visible,#lecture-toolbar button:focus-visible{background:#1b365d!important;color:#fffdf5!important;outline:2px solid #fffdf5;outline-offset:2px}.lecture-sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}@media print{#lecture-toolbar{display:none!important}}`;
  document.head.appendChild(style);

  const select = toolbar.querySelector("select");
  select.value = String(currentWeek);
  select.addEventListener("change", event => { location.href = `../Week${event.target.value}/`; });
  toolbar.addEventListener("keydown", event => event.stopPropagation());

  const fullscreen = document.querySelector("#fullscreen-button, #fullscreen");
  if (fullscreen) toolbar.appendChild(fullscreen);
  document.body.appendChild(toolbar);
})();
