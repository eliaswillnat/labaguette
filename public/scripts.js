import {
    FAVICON_URL,
    INTRO_VIDEO_URL,
    LOGO_WHITE_URL
} from './blobAssets.js';

// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
    const faviconLink = document.getElementById('favicon-link');
    const logoImage = document.getElementById('logo-image');
    const videoSource = document.getElementById('background-video-source');
    const backgroundVideo = document.getElementById('background-video');
    const kontaktButton = document.getElementById('kontakt-button');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const desktopScrollThreshold = 100; // Desktop devices
    const mobileScrollThreshold = 200;  // Mobile devices
    const videoLoopDelay = 2000;         // Delay in milliseconds (2000ms = 2 seconds)

    if (faviconLink) {
        faviconLink.href = FAVICON_URL;
    }

    if (logoImage) {
        logoImage.src = LOGO_WHITE_URL;
    }

    if (videoSource) {
        videoSource.src = INTRO_VIDEO_URL;
        if (backgroundVideo) {
            backgroundVideo.load();
        }
    }

    // Function to determine the current scroll threshold based on screen width
    const getScrollThreshold = () => {
        if (window.matchMedia("(max-width: 768px)").matches) {
            return mobileScrollThreshold; // Mobile devices
        } else {
            return desktopScrollThreshold; // Desktop devices
        }
    };

    let scrollThreshold = getScrollThreshold();

    // Function to handle scroll
    const handleScroll = () => {
        if (!kontaktButton) {
            return;
        }

        if (window.scrollY > scrollThreshold) {
            kontaktButton.classList.add('scrolled');
            if (scrollIndicator) {
                scrollIndicator.classList.add('hidden');
            }
        } else {
            kontaktButton.classList.remove('scrolled');
            if (scrollIndicator) {
                scrollIndicator.classList.remove('hidden');
            }
        }
    };

    // Function to handle screen resize
    const handleResize = () => {
        // Update the scroll threshold based on the new screen size
        scrollThreshold = getScrollThreshold();
        // Optionally, you can trigger the scroll handler to update the button state immediately
        handleScroll();
    };

    // Function to handle video loop with delay
    const handleVideoLoop = () => {
        setTimeout(() => {
            backgroundVideo.currentTime = 0; // Reset video to start
            backgroundVideo.play();           // Play the video
        }, videoLoopDelay);
    };

    // Listen to the scroll event
    if (kontaktButton) {
        // Listen to the scroll event
        window.addEventListener('scroll', handleScroll);
        // Listen to the resize event
        window.addEventListener('resize', handleResize);
    }

    if (backgroundVideo) {
        // Listen to the video ended event
        backgroundVideo.addEventListener('ended', handleVideoLoop);
    }
});
