function ImageSliderFactory(options) {
    this.elements = document.querySelectorAll(options.selector);
    this.sliders = [];

    this.selectors = {
        item: 'item-wrapper',
        text: 'content-wrapper'
    };
    this.elements.forEach(function (ele) {
        this.sliders.push(new ImageSlider(ele, this.selectors));
    }.bind(this));
}

function ImageSlider(element, selectors) {
    this.element = element;
    this.selectors = selectors;
    this.images = this.element.querySelectorAll('.' + this.selectors.item);
    this.texts = this.element.querySelectorAll('.' + this.selectors.text);

    this.images.forEach(function(imgContainer, index) {
        imgContainer.addEventListener("click", function() {
            this.setCurrentItem(index);
        }.bind(this));
        this.texts[index].addEventListener('transitionend', showElement.bind(this, this.texts[index]));
    }.bind(this));
    this.setCurrentItem(0);
}

ImageSlider.prototype.setCurrentItem = function (val) {
    var parent = this.texts[val].parentElement;
    var ele = this.texts[val];
    this.images.forEach(function (container, index) {
        container.className = this.selectors.item;

    }.bind(this));

    this.texts.forEach(function (container) {
        container.className = this.selectors.text;
    }.bind(this));

    if (parent.clientHeight <= ele.clientHeight) {
        parent.style.height = ele.clientHeight + 'px';
    }

    this.images[val].className = this.selectors.item + ' selected';
    ele.className = this.selectors.text + ' visible';
};

function showElement(ele) {
    if (ele.className !== this.selectors.text + ' visible') return;
    if (ele.parentElement.clientHeight > ele.clientHeight) {
        ele.parentElement.style.height = ele.clientHeight + 'px';
    }
    if (!isWholeElementInViewport(ele)) {
        ele.scrollIntoView({ block: 'end', inline: 'nearest', behavior: 'smooth' });
    }
}

function isWholeElementInViewport (el) {
    var rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.top + rect.height  <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
        rect.right + rect.width  <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
    );
}

new ImageSliderFactory({
    selector: '.image-slider'
});
