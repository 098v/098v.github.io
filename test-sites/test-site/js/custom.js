// Navbar Colour Change
window.onscroll = () => {
	const header = document.querySelector('.mdl-layout__header');
	if (this.scrollY <= 10) nav.className = '';
	else header.className = 'scroll';
};
