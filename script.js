    function openVideo() {
        document.getElementById('videoModal').style.display = 'flex';
        document.getElementById('videoPlayer').play();
    }

    function closeVideo() {
        document.getElementById('videoModal').style.display = 'none';
        document.getElementById('videoPlayer').pause();
    }

	// Initialize Swiper
const swiper = new Swiper('.swiper', {
    // Your Swiper options here
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    // Add these options to prevent slider from stopping
    allowTouchMove: true,
    noSwiping: false,
    noSwipingClass: 'swiper-slide',
});

function playVideo(button) {
    const container = button.closest('.video-container');
    const video = container.querySelector('.testimonial-video');
    const pauseButton = container.querySelector('.pause-button');
    
    video.play();
    button.style.display = "none";
    pauseButton.style.display = "flex";
    
    // Temporarily disable Swiper autoplay while video is playing
    swiper.autoplay.stop();
}

function pauseVideo(button) {
    const container = button.closest('.video-container');
    const video = container.querySelector('.testimonial-video');
    const playButton = container.querySelector('.play-button');
    
    video.pause();
    button.style.display = "none";
    playButton.style.display = "flex";
    
    // Restart Swiper autoplay when video is paused
    swiper.autoplay.start();
}

// Add event listeners to handle video ending
document.querySelectorAll('.testimonial-video').forEach(video => {
    video.addEventListener('ended', function() {
        const container = this.closest('.video-container');
        const playButton = container.querySelector('.play-button');
        const pauseButton = container.querySelector('.pause-button');
        
        playButton.style.display = "flex";
        pauseButton.style.display = "none";
        
        // Restart Swiper autoplay when video ends
        swiper.autoplay.start();
    });
});

	function pauseVideo(button) {
		const video = button.previousElementSibling.previousElementSibling; // Get the video element
		const playButton = button.previousElementSibling; // Get the play button

		video.pause();
		button.style.display = "none"; // Hide pause button
		playButton.style.display = "flex"; // Show play button
	}


    document.addEventListener("DOMContentLoaded", function () {
        const counters = document.querySelectorAll(".counter");

        const animateCounters = () => {
            counters.forEach(counter => {
                const updateCount = () => {
                    const target = +counter.getAttribute("data-target");
                    const count = +counter.innerText;
                    const increment = target / 100; // Adjust speed

                    if (count < target) {
                        counter.innerText = Math.ceil(count + increment);
                        setTimeout(updateCount, 20); // Adjust delay for smooth effect
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCount();
            });
        };

        // Start animation when the section is visible
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                }
            });
        }, { threshold: 0.5 });

        observer.observe(document.querySelector(".home-contact-us"));
    });

function doPost(e) {
  var sheet = SpreadsheetApp.openById('YOUR_SHEET_ID').getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  
  var row = [
    new Date(),
    data.name,
    data.email,
    data.phone,
    data.date,
    data.specialty
  ];
  
  sheet.appendRow(row);
  
  return ContentService.createTextOutput(JSON.stringify({result: 'success'}))
    .setMimeType(ContentService.MimeType.JSON);
}