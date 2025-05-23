// Live Clock
function updateDateTime() {
    const now = new Date();
    const datetimeElement = document.getElementById('datetime');
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    datetimeElement.innerHTML = now.toLocaleDateString('en-IN', options) + ' - ' + now.toLocaleTimeString();
}

setInterval(updateDateTime, 1000);
updateDateTime();

// Scroll Animation
const animatedItems = document.querySelectorAll('.scroll-animate');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2,
});

animatedItems.forEach(item => {
    observer.observe(item);
});
