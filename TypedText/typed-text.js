function TypedText(selector) {
    this.elements = document.querySelectorAll(selector);
    this.elements.forEach(function (ele) {
        var text = ele.innerText;
        this.render(ele, text);
    }.bind(this));
}

TypedText.prototype.render = function (ele, text) {

    var txtContainer = document.createElement('span');
    ele.innerHTML = '';
    ele.appendChild(txtContainer);
    var currentIndex = 0;
    var interval = setInterval(function () {
        if (currentIndex >= text.length) {
            clearInterval(interval);
            if (ele.dataset.eraseSpeed)
                setTimeout(this.erase.bind(this, ele, text, txtContainer), parseFloat(ele.dataset.interval));
            return;
        }
        txtContainer.innerHTML += text[currentIndex];
        currentIndex++;
    }.bind(this), parseFloat(ele.dataset.speed));
};

TypedText.prototype.erase = function (ele, text, txtContainer) {
    var interval = setInterval(function () {
        if (txtContainer.innerHTML.length <= 0) {
            clearInterval(interval);
            this.render(ele, text);
            return;
        }
        txtContainer.innerHTML = txtContainer.innerHTML.substring(0, txtContainer.innerHTML.length - 1);
    }.bind(this), parseFloat(ele.dataset.eraseSpeed));
};



var typedText = new TypedText('.typed-text');
