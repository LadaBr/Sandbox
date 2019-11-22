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
    this.currentItem = null;

    this.images.forEach(function(imgContainer, index) {
        imgContainer.addEventListener("click", function() {
            this.setCurrentItem(index);
        }.bind(this));
    }.bind(this));
    this.setCurrentItem(0);
}

ImageSlider.prototype.setCurrentItem = function (val) {
    this.currentItem = val;

    this.images.forEach(function (container, index) {
        container.className = this.selectors.item;
    }.bind(this));

    this.texts.forEach(function (container, index) {
        container.className = this.selectors.text;
    }.bind(this));

    this.images[val].className = this.selectors.item + ' selected';
    this.texts[val].className = this.selectors.text + ' visible';
};


var slider = new ImageSliderFactory({
    selector: '.image-slider'
});
