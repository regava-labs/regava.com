window.addEventListener("load", function () {
    window.cookieconsent.initialise({
        "palette": {
            "popup": {
                "background": "#0B0C10",  // Matches the website's dark background color
                "text": "#C5C6C7"         // Matches the light text color used in your design
            },
            "button": {
                "background": "#a4522f",  // Matches the button color on your site
                "text": "#ffffff"         // White text for readability on button
            }
        },
        "theme": "classic",
        "type": "opt-in",  // Requires explicit consent before running Google Analytics
        "content": {
            "message": "We use cookies and similar technologies to deliver and improve our services.",
            "dismiss": "Got it!",
            "allow": "Allow cookies",
            "deny": "Decline",
            "link": "Learn more.",
            "href": "privacy-policy.html" // Update with your privacy policy link
        },
        "elements": {
            "messagelink": "<span id='cookieconsent:desc' style='text-align: center; font-size: 12px;' class='cc-message'>{{message}} <a aria-label='learn more about cookies' tabindex='0' href='{{href}}' target='_blank' class='cc-link'>{{link}}</a></span>",
            "dismiss": "<a aria-label='dismiss cookie message' tabindex='0' class='cc-btn cc-dismiss btn-primary' style='border-radius: 20px; font-size:10px;'>{{dismiss}}</a>",
            "allow": "<a aria-label='allow cookies' tabindex='0' class='cc-btn cc-allow' style='border-radius: 20px; font-size:10px;'>{{allow}}</a>",
            "deny": "<a aria-label='deny cookies' tabindex='0' class='cc-btn cc-deny' style='border-radius: 20px; font-size:10px;'>{{deny}}</a>"
        },
        "onInitialise": function (status) {
            var didConsent = this.hasConsented();
            if (didConsent) {
                loadGoogleAnalytics();  // Load Google Analytics if consent is given
            }
        },
        "onStatusChange": function (status, chosenBefore) {
            var didConsent = this.hasConsented();
            if (didConsent) {
                loadGoogleAnalytics();  // Load Google Analytics when consent is granted
            }
        }
    });
    AOS.init();
});

// Load Google Analytics (gtag.js) only if user consents
function loadGoogleAnalytics() {
    // Google Tag Manager Script
    var gtagScript = document.createElement('script');
    gtagScript.src = "https://www.googletagmanager.com/gtag/js?id=G-R9DMF2SQTV";  // Replace with your GA ID
    gtagScript.async = true;
    document.head.appendChild(gtagScript);

    // Initialize Google Analytics after loading the script
    gtagScript.onload = function () {
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', 'G-R9DMF2SQTV');  // Replace with your GA ID
    };
}