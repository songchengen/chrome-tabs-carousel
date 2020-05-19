let result = [], current, currentIndex = 0, timer;
const timeout = 10 * 1000;

const queryTabs = () => {
  chrome.tabs.query({}, data => {
    result = data;
    currentIndex = result.findIndex(({ active }) => active);
    current = result[currentIndex];
  
    window.dispatchEvent(
      new CustomEvent('query_tabs')
    )
  });
}

const changeTab = () => {

  const nextIndex = result.length <= (currentIndex + 1) ? 0 :  currentIndex + 1;
  const next = result[nextIndex];
  console.log(nextIndex, next);
  chrome.tabs.update(next.id, { active: true }, data => {
    current = data;
    currentIndex = nextIndex;
  });

  timer = setTimeout(changeTab, timeout)
}

window.addEventListener('query_tabs', () => {
  if(timer) clearTimeout(timer);
  changeTab();
});

queryTabs();

