let isExtensionEnabled = false;
var fontStylesEnabled = false;

function applyFontStyles() {
    if (fontStylesEnabled) {
        document.body.style.fontFamily = 'Arial, sans-serif'; // Change font style
        var currentSize = window.getComputedStyle(document.body, null).getPropertyValue('font-size');
        var newSize = parseFloat(currentSize) + 30.5;
        document.body.style.fontSize = newSize + 'px'; // Increase font size
        document.body.style.color = '#333'; // Change font color
        document.body.style.fontWeight = 'bold'; // Make text bold
    } else {
        // Reset styles if disabled
        document.body.style.cssText = '';
    }
}
// Receive messages from the popup and toggle link highlighting
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'toggleHighlighting') {
        isExtensionEnabled = !isExtensionEnabled;
        if (isExtensionEnabled) {
            highlightLinks(request.color);
        } else {
            removeHighlights();
        }
    }

    if (request.action === 'hideImages') {
        // Hide all images on the webpage
        var images = document.querySelectorAll('img');
        images.forEach(function (image) {
            image.style.display = 'none';
        });
    }

    if (request.action === 'toggleFontStyles') {
        fontStylesEnabled = !fontStylesEnabled;
        applyFontStyles();
    }

    if (request.action === 'changeContrast') {
        document.body.style.filter = `contrast(${request.value}%)`;
    }

});

function highlightLinks(color) {
    var links = document.querySelectorAll('a');
    links.forEach(function (link) {
        link.style.borderBottom = `2px solid ${color}`;
    });
}

function removeHighlights() {
    var links = document.querySelectorAll('a');
    links.forEach(function (link) {
        link.style.borderBottom = '';
    });
}
