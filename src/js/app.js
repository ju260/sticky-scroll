class Parallax {
    constructor(dataEle) {
        this.ele = document.querySelectorAll(dataEle);

        let scrollIntervalID = setInterval(() => { this.onRightColScroll(); }, 0);
    }
    onRightColScroll() {
        this.screenOffsetTop = window.scrollY;
        this.screenHeight = window.outerHeight;

        Array.from(this.ele).forEach((ele, index) => {
            let recTop = ele.getBoundingClientRect().top;
            let recHeight = ele.getBoundingClientRect().height;
            let visibleOnScreen = recHeight + recTop;
            let pourcentVisible = (visibleOnScreen / recHeight) * 100;

            if (visibleOnScreen > 0) {
                //let eleO = ele.offsetTop === 0 ? 1 : ele.offsetTop;
                let posBg = this.screenHeight / ele.offsetTop;
                let delta = ele.dataset.parallaxDelta;
                //ele.style.backgroundPositionY = `${pourcentVisible}px`;

                if (ele.dataset.parallaxAction === "translate") {
                    if (ele.dataset.translateMiddle !== undefined) {
                        // ele.style.transform = `translate(-50% , calc(50% + ${pourcentVisible/delta}px))`;
                        ele.style.marginTop = `${pourcentVisible/delta}px`;
                    } else {
                        ele.style.transform = `translateY(-${pourcentVisible/delta}px)`;
                    }
                }
                if (ele.dataset.parallaxAction === "bg") {
                    ele.style.backgroundPosition = `center ${pourcentVisible/delta}px`;
                }


            }
        });

    }
}

window.addEventListener("load", function(event) {
    let parallax = new Parallax('[data-parallax]');
});



class Sticky {
    constructor(id) {
        this.ele = document.getElementById(id);

        this.eleHeight = this.ele.offsetHeight;
        this.navHeight = document.getElementsByClassName('nav')[0].offsetHeight;

        this.aside = document.getElementById('rightCol');
        this.asideOffsetTop = this.aside.offsetTop;
        this.asideHeight = this.aside.offsetHeight;

        this.ScreenTopStop = this.asideOffsetTop + (this.asideHeight - this.eleHeight - this.navHeight);

        let scrollIntervalID2 = setInterval(() => { this.onRightColScroll(); }, 0);
    }
    onRightColScroll() {
        this.screenOffsetTop = window.scrollY;

        if (this.screenOffsetTop < this.ScreenTopStop) {
            this.ele.classList.remove('fixedBottom');
            this.ele.style.marginTop = `0px`;
            if (this.screenOffsetTop > this.asideOffsetTop) {
                this.ele.classList.add('abs');
                let marg = this.screenOffsetTop - this.asideOffsetTop + this.navHeight;
                this.ele.style.marginTop = `${marg}px`;
            } else {
                this.ele.classList.remove('abs');
            }
        } else {
            this.ele.classList.add('fixedBottom');
        }
    }
};
window.addEventListener("load", function(event) {
    let sticky = new Sticky("add");
});
window.onresize = function() { let sticky = new Sticky("add"); }