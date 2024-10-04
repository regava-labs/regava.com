document.addEventListener("DOMContentLoaded", function() {
    AOS.init();
});

let cookieConsentInstance;

window.addEventListener("load", function () {
    window.cookieconsent.initialise({
        "palette": {
            "popup": {
                "background": "#0B0C10",
                "text": "#C5C6C7"
            },
            "button": {
                "background": "#a4522f",
                "text": "#ffffff"
            }
        },
        "theme": "classic",
        "type": "opt-in",
        "content": {
            "message": "We use cookies and similar technologies to deliver and improve our services.",
            "dismiss": "Got it!",
            "allow": "Allow cookies",
            "deny": "Decline",
            "link": "Learn more.",
            "href": "privacy-policy.html"
        },
        "elements": {
            "messagelink": "<span id='cookieconsent:desc' style='text-align: center; font-size: 12px;' class='cc-message'>{{message}} <a aria-label='learn more about cookies' tabindex='0' href='{{href}}' target='_blank' class='cc-link'>{{link}}</a></span>",
            "dismiss": "<a aria-label='dismiss cookie message' tabindex='0' class='cc-btn cc-dismiss btn-primary' style='border-radius: 20px; font-size:10px;'>{{dismiss}}</a>",
            "allow": "<a aria-label='allow cookies' tabindex='0' class='cc-btn cc-allow' style='border-radius: 20px; font-size:10px;'>{{allow}}</a>",
            "deny": "<a aria-label='deny cookies' tabindex='0' class='cc-btn cc-deny' style='border-radius: 20px; font-size:10px;'>{{deny}}</a>"
        },
        "onInitialise": function (status) {
            cookieConsentInstance = this;
            var didConsent = this.hasConsented();
            if (didConsent) {
                loadGoogleAnalytics();
            }
            initializeToggle();
        },
        "onStatusChange": function (status, chosenBefore) {
            var didConsent = this.hasConsented();
            if (didConsent) {
                loadGoogleAnalytics();
                // cookieConsentInstance.setStatus('allow');  // Ensure that it sets the consent status properly
            } else {
                // cookieConsentInstance.setStatus('deny');
            }
            updateToggle();
        }
    });
});

function loadGoogleAnalytics() {
    var gtagScript = document.createElement('script');
    gtagScript.src = "https://www.googletagmanager.com/gtag/js?id=G-R9DMF2SQTV";
    gtagScript.async = true;
    document.head.appendChild(gtagScript);
    gtagScript.onload = function () {
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', 'G-R9DMF2SQTV');
    };
}

function initializeToggle() {
    const cookieToggle = document.getElementById("cookieToggle");
    const cookieStatus = document.getElementById("cookieStatus");
    if (cookieToggle && cookieStatus && cookieConsentInstance) {
        cookieToggle.checked = cookieConsentInstance.hasConsented();
        updateStatusText(cookieStatus, cookieToggle.checked);
        cookieToggle.addEventListener("change", function () {
            if (this.checked) {
                cookieConsentInstance.setStatus('allow');
            } else {
                cookieConsentInstance.setStatus('deny');
            }
            updateStatusText(cookieStatus, this.checked);
        });
    }
}

function updateToggle() {
    const cookieToggle = document.getElementById("cookieToggle");
    const cookieStatus = document.getElementById("cookieStatus");
    if (cookieToggle && cookieStatus && cookieConsentInstance) {
        cookieToggle.checked = cookieConsentInstance.hasConsented();
        updateStatusText(cookieStatus, cookieToggle.checked);
    }
}

function updateStatusText(statusElement, isEnabled) {
    statusElement.innerHTML = isEnabled ? "Cookies are <strong>enabled</strong>." : "Cookies are <strong>disabled</strong>.";
}