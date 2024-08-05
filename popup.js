document.addEventListener('DOMContentLoaded', function () {
    var colorPicker = document.getElementById('colorPicker');
    var highlightLinksButton = document.getElementById('highlightLinksButton');
    var hideImagesButton = document.getElementById('hideImagesButton');
    var applyStylesButton = document.getElementById('applyStylesButton');
    var contrastSlider = document.getElementById('contrastSlider');



    hideImagesButton.addEventListener('click', function () {
        // Send a message to content.js to hide images
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            var activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, { action: 'hideImages' });
        });
    });

    highlightLinksButton.addEventListener('click', function () {
        var highlightColor = colorPicker.value;
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            var activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, { action: 'toggleHighlighting', color: highlightColor });
        });


    });


    applyStylesButton.addEventListener('click', function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            var activeTab = tabs[0];

            chrome.tabs.sendMessage(activeTab.id, { action: 'toggleFontStyles' }, function (response) {
            });
        });

    });

   
  
    contrastSlider.addEventListener('input', function () {
      var contrastValue = contrastSlider.value;
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, { action: 'changeContrast', value: contrastValue });
      });
    });
});
