// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
    const kontaktButton = document.getElementById('kontakt-button');
    const backgroundVideo = document.getElementById('background-video');
    const desktopScrollThreshold = 100; // Desktop devices
    const mobileScrollThreshold = 200;  // Mobile devices
    const videoLoopDelay = 2000;         // Delay in milliseconds (2000ms = 2 seconds)

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
        if (window.scrollY > scrollThreshold) {
            kontaktButton.classList.add('scrolled');
        } else {
            kontaktButton.classList.remove('scrolled');
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
    window.addEventListener('scroll', handleScroll);
    // Listen to the resize event
    window.addEventListener('resize', handleResize);
    // Listen to the video ended event
    backgroundVideo.addEventListener('ended', handleVideoLoop);
});