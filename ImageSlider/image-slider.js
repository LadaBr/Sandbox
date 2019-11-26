function ImageSliderFactory(options) {
    this.elements = document.querySelectorAll(options.selector);
    this.sliders = [];

    this.selectors = {
        item: 'item-wrapper',
        text: 'text-wrapper'
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
        var relativeText = this.texts[index];
        imgContainer.addEventListener("click", function() {
            this.setCurrentItem(index);
            if (!isWholeElementInViewport(relativeText)) {
                relativeText.scrollIntoView({ block: 'end', inline: 'nearest', behavior: 'smooth' });
            }
        }.bind(this));
    }.bind(this));
    this.setCurrentItem(0);
}

ImageSlider.prototype.setCurrentItem = function (val) {
    this.images.forEach(function (container) {
        container.className = this.selectors.item;
    }.bind(this));

    this.texts.forEach(function (container) {
        container.className = this.selectors.text;
    }.bind(this));

    this.images[val].className = this.selectors.item + ' selected';
    this.texts[val].className = this.selectors.text + ' visible';
};

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
