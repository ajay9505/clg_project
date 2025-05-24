// Function to handle menu clicks and show the corresponding gallery
document.querySelectorAll('.menu ul li a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent default link behavior

        // Remove active class from all links and galleries
        document.querySelectorAll('.menu ul li a').forEach(a => a.classList.remove('active'));
        document.querySelectorAll('.gallery').forEach(gallery => gallery.classList.remove('active'));

        // Add active class to the clicked link and corresponding gallery
        this.classList.add('active');
        const target = this.getAttribute('href');
        document.querySelector(target).classList.add('active');
    });
});
// Show the home gallery by default on page load
window.onload = function () {
    document.querySelector('#home').classList.add('active');
    document.querySelector('.menu ul li a[href="#home"]').classList.add('active');
}
