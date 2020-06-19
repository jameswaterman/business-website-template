

// throttle

const throttle = (func, limit) => {
  let lastFunc
  let lastRan
  return function() {
    const context = this
    const args = arguments
    if (!lastRan) {
      func.apply(context, args)
      lastRan = Date.now()
    } else {
      clearTimeout(lastFunc)
      lastFunc = setTimeout(function() {
        if ((Date.now() - lastRan) >= limit) {
          func.apply(context, args)
          lastRan = Date.now()
        }
      }, limit - (Date.now() - lastRan))
    }
  }
}

// Highlight nav bar links

const highlightNav = () => {
	console.log('i fired');

	const links = document.querySelectorAll('.link');
	const section = document.querySelectorAll('.section');
	const minScrollBeforeHighlighting = 450;

	const clearAllActive = () => {links.forEach((link) => link.classList.remove('active'))};

	const changeLinkState = () => {
    	let index = section.length;

    	while(--index && window.scrollY + 470 < section[index].offsetTop) {};

    	clearAllActive();
    	links[index].classList.add('active');
    };

	if (window.scrollY < minScrollBeforeHighlighting) {
		clearAllActive();
	} else {
		changeLinkState();
	};
};

highlightNav();
window.addEventListener('scroll', throttle(highlightNav, 400));

// dropdown menu

const dropdown = () => {
  const smallNav = document.querySelector('.small-nav-nav');
  if (smallNav.classList.contains('expand')) {
    smallNav.classList.remove('expand');
    return;
  } else if (!smallNav.classList.contains('expand')) {
    smallNav.classList.add('expand')
    return;
  }
}

const closeDropdown = () => {
  document.querySelector('.small-nav-nav').classList.remove('expand');
};


document.querySelector('.burger').addEventListener('click', dropdown);
document.querySelectorAll('.small-link').forEach(link => link.addEventListener('click', closeDropdown));

// hide navbar on scroll

var prevScrollpos = window.pageYOffset;
window.onscroll = throttle(() => {
    if(window.pageYOffset > 100) {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
      document.querySelector(".nav-bar").style.top = "0";
    } else {
      document.querySelector(".nav-bar").style.top = "-100px";
    }
    prevScrollpos = currentScrollPos;
  } else {
    document.querySelector(".nav-bar").style.top = "0";
  }
}, 500);

















