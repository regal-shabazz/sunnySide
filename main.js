const navMenu = document.querySelector('#nav-menu')
const hamburgerIcon = document.getElementById('hamburger-icon')
const arrowDown = document.querySelector('.arrow-down')
const body = document.querySelector('body')
const overlay = document.createElement('div')
overlay.setAttribute('class', 'overlay')
body.appendChild(overlay)

function openMenu() {
    navMenu.classList.toggle('active')
    if (navMenu.classList.contains('active')) {
        navMenu.style.overflow = `visible`
        overlay.style.display = `block`
    } else {
        navMenu.style.overflow = `hidden`
        overlay.style.display = `none`
    }

    overlay.addEventListener('click', () => {
        navMenu.classList.remove('active')
        overlay.style.display = `none`
    })
}

hamburgerIcon.addEventListener('click', openMenu)


let arrowAnimationTimeout;
let hamburgerAnimationTimeout;
let animationRunning = false;
let lastActivityTime = Date.now();


function startAnimation(element) {
    animationRunning = true;
    element.classList.add('active');
}

function stopAnimation(element) {
    animationRunning = false;
    element.classList.remove('active');
}

function resetAnimationTimeout() {
    clearInterval(arrowAnimationTimeout);
    clearInterval(hamburgerAnimationTimeout);

    arrowDown.style.visibility = `hidden`

    const currentTime = Date.now();
    const timeSinceLastActivity = currentTime - lastActivityTime;

    if (navMenu.classList.contains('active')) {
        arrowDown.style.visibility = `hidden`
        if (timeSinceLastActivity > 5000) {
            startAnimation(hamburgerIcon)
        } else {
            hamburgerAnimationTimeout = setInterval(() => {
                if (animationRunning) {
                    stopAnimation(hamburgerIcon)
                } else {
                    startAnimation(hamburgerIcon)
                };
            }, 5000 - timeSinceLastActivity);
        }
    } else {
        arrowAnimationTimeout = setInterval(() => {
            arrowDown.style.visibility = `visible`
            if (animationRunning) {
                stopAnimation(arrowDown);
            } else {
                startAnimation(arrowDown);
            }
        }, 4000);
        clearTimeout(hamburgerAnimationTimeout);
    }
}

function handleUserInteraction() {
    lastActivityTime = Date.now();
    arrowDown.style.visibility = `hidden`
    stopAnimation(arrowDown);
    stopAnimation(hamburgerIcon);
    resetAnimationTimeout();
}

window.addEventListener('scroll', handleUserInteraction);
window.addEventListener('touchstart', handleUserInteraction);
window.addEventListener('mousemove', handleUserInteraction);
window.addEventListener('click', handleUserInteraction);

resetAnimationTimeout();

const posts = document.querySelectorAll('.posts')

posts.forEach(post => {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.querySelector('article').classList.add('animate-article')
                // observer.disconnect()
            } else {
                entry.target.querySelector('article').classList.remove('animate-article')
            }
        })
    }, {
        threshold: 0.5
    })

    observer.observe(post)
})

