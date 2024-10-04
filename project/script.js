//counter 

document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.counter');
    const speed = 200; 

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;

            
            const increment = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 10);
            } else {
                counter.innerText = target; 
            }
        };

        const scrollCheck = () => {
            const sectionTop = counter.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (sectionTop < windowHeight - 50) {
                updateCount();
                window.removeEventListener('scroll', scrollCheck);
            }
        };

        window.addEventListener('scroll', scrollCheck);
    });
});

const hoverContents = document.querySelectorAll('.hover-content');
const timelineItems = document.querySelectorAll('.timeline-item');


let activeHoverContent = null;


function hideAllHoverContents() {
    hoverContents.forEach((content) => {
        content.style.opacity = '0'; 
        content.style.visibility = 'hidden'; 
    });
    activeHoverContent = null; 
}
function showHoverContent(hoverContent) {
    if (activeHoverContent !== hoverContent) {
        if (activeHoverContent) {
            hideAllHoverContents(); 
        }
        hoverContent.style.visibility = 'visible'; 
        setTimeout(() => {
            hoverContent.style.opacity = '1'; 
        }, 0); 
        activeHoverContent = hoverContent; 
    } else {
        hideAllHoverContents(); 
    }
}


timelineItems.forEach((item) => {
    item.addEventListener('click', () => {
        const hoverContent = item.querySelector('.hover-content');
        showHoverContent(hoverContent);
    });
});


document.addEventListener('click', (event) => {
    if (!event.target.closest('.timeline-item')) {
        hideAllHoverContents();
    }
});


window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.body.offsetHeight;


    if (scrollTop + windowHeight >= documentHeight) {
        hideAllHoverContents(); 
    }
});

//linechart

document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.counter');
    const speed = 200; 
    let chartInitialized = false; 

    
    let ctx = document.getElementById('lineChart').getContext('2d');
    let chart = null;

    
    const chartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'], 
        datasets: [{
            label: 'Progress Over Time',
            data: [0, 0, 0, 0, 0, 0], 
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderWidth: 2,
            fill: true,
        }]
    };

    
    const initChart = () => {
        if (!chartInitialized) {
            chart = new Chart(ctx, {
                type: 'line',
                data: chartData,
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            suggestedMax: 2000 
                        }
                    }
                }
            });
            chartInitialized = true;
        }
    };

    
    const updateChartData = (dataPoints) => {
        chartData.datasets[0].data = dataPoints;
        chart.update();
    };

    counters.forEach((counter, index) => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;

            const increment = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 10);

                
                const chartValues = chartData.datasets[0].data.map((value, i) => {
                    if (i <= index) return Math.ceil(count + increment); 
                    return value; 
                });
                updateChartData(chartValues);
            } else {
                counter.innerText = target;
            }
        };

        
        const scrollCheck = () => {
            const sectionTop = counter.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (sectionTop < windowHeight - 50) {
                updateCount(); 
                initChart();   
                window.removeEventListener('scroll', scrollCheck); 
            }
        };

        window.addEventListener('scroll', scrollCheck);
    });
}); 

//timeline
document.addEventListener('DOMContentLoaded', function() {
    const timeline = document.querySelector('.timeline');
    const items = document.querySelectorAll('.timeline-item');

    const throttle = (func, limit) => {
        let inThrottle;
        return function() {
            if (!inThrottle) {
                func.apply(this, arguments);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
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
    }, 100)); 
});
