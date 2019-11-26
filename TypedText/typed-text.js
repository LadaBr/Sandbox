function TypedTextFactory(selector) {
    this.elements = document.querySelectorAll(selector);
    this.elements.forEach(function (ele) {
        new TypedText(ele);
    }.bind(this));
}

function TypedText(ele) {
    this.index = 0;
    this.texts = [];
    this.ele = ele;
    ele.querySelectorAll('span').forEach(function (value) {
        this.texts.push(value.innerHTML);
    }.bind(this));
    if (!this.texts.length) this.texts.push(ele.innerText);
    this.render();
}

TypedText.prototype.render = function () {
    var text = this.texts[this.index];
    var txtContainer = document.createElement('span');
    this.ele.innerHTML = '';
    this.ele.appendChild(txtContainer);
    var currentIndex = 0;
    var interval = setInterval(function () {
        if (currentIndex >= text.length) {
            clearInterval(interval);
            if (this.ele.dataset.eraseSpeed)
                setTimeout(this.erase.bind(this, txtContainer), parseFloat(this.ele.dataset.interval));
            return;
        }
        txtContainer.innerHTML += text[currentIndex];
        currentIndex++;
    }.bind(this), parseFloat(this.ele.dataset.speed));
};

TypedText.prototype.erase = function (txtContainer) {
    var interval = setInterval(function () {
        if (txtContainer.innerHTML.length <= 0) {
            this.index = this.index < this.texts.length - 1 ? this.index + 1 : 0;
            clearInterval(interval);
            this.render();
            return;
        }
        txtContainer.innerHTML = txtContainer.innerHTML.substring(0, txtContainer.innerHTML.length - 1);
    }.bind(this), parseFloat(this.ele.dataset.eraseSpeed));
};

new TypedTextFactory('.typed-text');
