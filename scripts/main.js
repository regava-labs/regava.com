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
                // Update consent to 'granted' when user accepts
                gtag('consent', 'update', {
                    'ad_storage': 'granted',
                    'analytics_storage': 'granted'
                });
                loadGoogleAnalytics();
            } else {
                // Update consent to 'denied' when user declines
                gtag('consent', 'update', {
                    'ad_storage': 'denied',
                    'analytics_storage': 'denied'
                });
            }
            updateToggle();
        }
    });
});


// Fallback definition for gtag to avoid "gtag is not defined" error before Google Analytics script loads
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }

function loadGoogleAnalytics() {
    // Set default consent state to 'denied'
    gtag('consent', 'default', {
        'ad_storage': 'denied',
        'analytics_storage': 'denied'
    });

    // Load Google Analytics script
    var gtagScript = document.createElement('script');
    gtagScript.src = "https://www.googletagmanager.com/gtag/js?id=G-R9DMF2SQTV";
    gtagScript.async = true;
    document.head.appendChild(gtagScript);

    gtagScript.onload = function () {
        gtag('js', new Date());
        gtag('config', 'G-R9DMF2SQTV'); // Add this line

        // If user has consented, update the consent state
        if (cookieConsentInstance && cookieConsentInstance.hasConsented()) {
            gtag('consent', 'update', {
                'ad_storage': 'granted',
                'analytics_storage': 'granted'
            });
        }
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

gtagScript.onload = function () {
    console.log('GA script loaded');
    gtag('js', new Date());
    gtag('config', 'G-R9DMF2SQTV');
    console.log('GA initialized');
};