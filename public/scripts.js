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
    const scrollStopDelay = 150;

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

    let isTicking = false;
    let scrollStopTimeout;

    // Function to handle scroll
    const handleScroll = () => {
        if (!kontaktButton) {
            return;
        }

        const isScrolled = window.scrollY > scrollThreshold;
        kontaktButton.classList.toggle('scrolled', isScrolled);
        if (scrollIndicator) {
            scrollIndicator.classList.toggle('hidden', isScrolled);
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

    const handleScrollVideoPerformance = () => {
        if (!backgroundVideo) {
            return;
        }

        if (!backgroundVideo.paused) {
            backgroundVideo.pause();
        }

        window.clearTimeout(scrollStopTimeout);
        scrollStopTimeout = window.setTimeout(() => {
            backgroundVideo.play();
        }, scrollStopDelay);
    };

    // Listen to the scroll event
    const handleScrollEvent = () => {
        if (!isTicking) {
            window.requestAnimationFrame(() => {
                handleScroll();
                isTicking = false;
            });
            isTicking = true;
        }

        handleScrollVideoPerformance();
    };

    if (kontaktButton) {
        // Listen to the scroll event
        window.addEventListener('scroll', handleScrollEvent, { passive: true });
        // Listen to the resize event
        window.addEventListener('resize', handleResize);
    }

    if (backgroundVideo) {
        // Listen to the video ended event
        backgroundVideo.addEventListener('ended', handleVideoLoop);
    }
});
