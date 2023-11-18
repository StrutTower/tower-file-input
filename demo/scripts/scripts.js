Prism.hooks.add("before-highlight", function (env) {
    env.code = env.element.innerText;
});

document.querySelectorAll('[data-sample-url]').forEach(function (element) {
    fetch(element.dataset.sampleUrl)
        .then(data => data.text())
        .then(function (response) {

            element.innerText = response;
            Prism.highlightElement(element);
        });
});

document.querySelectorAll('.twr-toggle').forEach(function (element) {
    element.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(element.dataset.target).classList.toggle('hidden');
    });
});