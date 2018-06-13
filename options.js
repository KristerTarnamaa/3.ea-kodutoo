function saveOptions(e) {
     
  localStorage.setItem('Feed', document.querySelector("#Feed").value);
    e.preventDefault();
  }
  function restoreOptions() {
    var storageItem = browser.storage.managed.get('Feed');
    storageItem.then((res) => {
      document.querySelector("#Feed").value = res.Feed;
    });
  
    var gettingItem = browser.storage.sync.get('Feed');
    gettingItem.then((res) => {
      document.querySelector("#Feed").value = res.Feed || 'Null';
    });
  }
  
  document.addEventListener('DOMContentLoaded', restoreOptions);
  document.querySelector("form").addEventListener("submit", saveOptions);