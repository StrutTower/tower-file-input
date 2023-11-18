(function () {
    this.twrFileInput = function (input, options) {
        let defaults = {
            showFileList: true,
            showImgPreview: true,
            iconClass: null,
            imgPreviewClass: ''
        };

        this.element = input;
        this.settings = (options && typeof options === 'object') ? extendDefaults(defaults, options) : defaults;

        this.init = function () {
            this.element.addEventListener('change', inputChanged);
            this.element.settings = this.settings;

            let container = this.element.closest('.twr-file');
            createElements(container, this.settings.imgPreviewClass);

            let label = container.querySelector('label');
            label.dataset.defaultHtml = label.innerHTML;

            let clearButton = container.querySelector('.twr-file-clear');
            if (clearButton !== null) {
                clearButton.disabled = true;
                clearButton.addEventListener('click', clearButtonClicked);
            }
        }

        function inputChanged(e) {
            let settings = e.currentTarget.settings;
            let container = this.closest('.twr-file');
            let label = container.querySelector('label');
            let clearButton = container.querySelector('.twr-file-clear');
            var details = container.querySelector('.twr-file-details');
            var fileList = container.querySelector('.twr-file-list');
            var img = container.querySelector('img');
            var imgContainer = container.querySelector('.twr-img-preview-container');

            var files = this.files;

            let iconHtml = '';
            if (settings.iconClass !== null && settings.iconClass.length > 0) {
                iconHtml = '<span class="' + settings.iconClass + '"></span>';
            }

            if (files.length === 1) {
                // One file selected
                var file = files[0];
                label.innerHTML = iconHtml + file.name;
                fileList.classList.add('hidden');

                if (clearButton !== null) clearButton.disabled = false;

                if (file.type.match('image.*') && settings.showImgPreview) {
                    details.classList.remove('hidden');
                    imgContainer.classList.remove('hidden');
                    showImgPreview(file, img);
                } else {
                    details.classList.add('hidden');
                    img.src = '';
                }
            } else if (files.length > 1) {
                // Multiple files selected
                img.src = '';
                label.innerHTML = iconHtml + files.length + ' Files Selected';
                if (clearButton !== null) clearButton.disabled = false;

                if (settings.showFileList) {
                    fileList.innerHTML = '';

                    for (let i = 0; i < files.length; i++) {
                        let li = document.createElement('li');
                        li.innerText = files[i].name;
                        fileList.appendChild(li);
                    }

                    details.classList.remove('hidden');
                    fileList.classList.remove('hidden');
                    imgContainer.classList.add('hidden');
                } else {
                    details.classList.add('hidden');
                    fileList.classList.add('hidden');
                    imgContainer.classList.add('hidden');
                }
            } else {
                // No files selected
                img.src = '';
                details.classList.add('hidden');
                label.innerHTML = label.dataset.defaultHtml;
                clearButton.disabled = true
            }
        }

        function showImgPreview(file, img) {
            var reader = new FileReader();

            reader.onload = function (e) {
                img.src = reader.result;
            }
            reader.readAsDataURL(file);
        }

        function clearButtonClicked() {
            let container = this.closest('.twr-file');
            let label = container.querySelector('label');
            let input = container.querySelector('input[type="file"]');
            var details = container.querySelector('.twr-file-details');
            let clearButton = container.querySelector('.twr-file-clear');
            var imgContainer = container.querySelector('.twr-img-preview-container');

            input.value = '';
            label.innerHTML = label.dataset.defaultHtml;

            imgContainer.classList.add('hidden');
            details.classList.add('hidden');
            clearButton.disabled = true
        }

        function createElements(container, imgPreviewClass) {
            var details = container.querySelector('.twr-file-details');
            if (details === null) {
                details = document.createElement('div');
                details.classList.add('twr-file-details');
                details.classList.add('hidden');
                container.appendChild(details);
            }

            var img = container.querySelector('img');
            var imgContainer = container.querySelector('.twr-img-preview-container');

            if (img == null) {
                img = document.createElement('img');

                imgContainer = document.createElement('div');
                imgContainer.classList.add('twr-img-preview-container');
                imgContainer.classList.add('hidden');

                if (imgPreviewClass !== null && imgPreviewClass.length > 0) {
                    img.classList.add(imgPreviewClass);
                }

                imgContainer.appendChild(img);
                details.appendChild(imgContainer);
            }

            var fileList = container.querySelector('.twr-file-list');
            if (fileList === null) {
                fileList = document.createElement('ul');
                fileList.classList.add('twr-file-list');
                details.appendChild(fileList);
            }
        }

        function extendDefaults(defaults, properties) {
            Object.keys(properties).forEach(property => {
                if (properties.hasOwnProperty(property)) {
                    defaults[property] = properties[property];
                }
            });
            return defaults;
        }

        this.init();
    }
}());