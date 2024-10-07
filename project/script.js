//counter 

document.addEventListener('DOMContentLoaded', function () {
    const counters = [
        { element: document.getElementById('counter1'), startValue: 0, endValue: 16000 },
        { element: document.getElementById('counter2'), startValue: 0, endValue: 350 },
        { element: document.getElementById('counter3'), startValue: 0, endValue: 6 }
    ];
    
    const duration = 2000; 
    const incrementTime = 1; 

    function updateCounter(counter) {
        let startValue = counter.startValue;
        const incrementValue = counter.endValue / (duration / incrementTime);

        const counterInterval = setInterval(() => {
            startValue += incrementValue;
            if (startValue >= counter.endValue) {
                startValue = counter.endValue;
                clearInterval(counterInterval);
            }
            counter.element.innerText = Math.floor(startValue);
        }, incrementTime);
    }

    setTimeout(() => {
        counters.forEach(updateCounter);
    }, 1000); 
});

//transition control//

document.addEventListener('DOMContentLoaded', function() {
    const timeline = document.querySelector('.timeline');
    const items = document.querySelectorAll('.timeline-item');
    const timelineLine = timeline.querySelector('::before');

    const throttle = (func) => {
        let ticking = false;
        return function() {
            if (!ticking) {
                requestAnimationFrame(() => {
                    func();
                    ticking = false;
                });
                ticking = true;
            }
        };
    };
    

    const activateTimelineItems = () => {
        const triggerBottom = window.innerHeight * 0.8;
        items.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            if (itemTop < triggerBottom) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    };

    const darkenTimelineLine = () => {
        const scrollPosition = window.scrollY || window.pageYOffset;
        if (scrollPosition > 100) {
            timeline.classList.add('dark');
        } else {
            timeline.classList.remove('dark');
        }
    };

    activateTimelineItems();
    darkenTimelineLine();

    window.addEventListener('scroll', throttle(() => {
        activateTimelineItems();
        darkenTimelineLine();
    }, 10)); 
});


//timline line//
document.addEventListener('DOMContentLoaded', function() {
    const timeline = document.querySelector('.timeline');
    const items = document.querySelectorAll('.timeline-item');
    const timelineLine = document.createElement('div'); 
    timelineLine.classList.add('timeline-line'); 
    timeline.appendChild(timelineLine); 

    const throttle = (func) => {
        let ticking = false;
        return function() {
            if (!ticking) {
                requestAnimationFrame(() => {
                    func();
                    ticking = false;
                });
                ticking = true;
            }
        };
    };

    const activateTimelineItems = () => {
        const triggerBottom = window.innerHeight * 0.8;
        items.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            if (itemTop < triggerBottom) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    };

    const updateTimelineLine = () => {
        const scrollPosition = window.scrollY || window.pageYOffset;
        const documentHeight = document.body.scrollHeight - window.innerHeight;
        const scrolledPercentage = (scrollPosition / documentHeight) * 100;

        
        const maxHeight = timeline.scrollHeight;
        const newHeight = (scrolledPercentage / 100) * maxHeight;
        timelineLine.style.height = `${newHeight}px`;
    };

    const darkenTimelineLine = () => {
        const scrollPosition = window.scrollY || window.pageYOffset;
        if (scrollPosition > 100) {
            timelineLine.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'; // Darken the line
        } else {
            timelineLine.style.backgroundColor = 'rgba(0, 0, 0, 0.2)'; // Lighten the line
        }
    };

    window.addEventListener('scroll', throttle(() => {
        activateTimelineItems();
        updateTimelineLine();
        darkenTimelineLine();
    }, 5)); 
});
