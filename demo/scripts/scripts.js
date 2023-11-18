document.querySelectorAll('.twr-toggle').forEach(function (element) {
    element.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(element.dataset.target).classList.toggle('hidden');
    });
});