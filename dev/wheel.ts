

class Wheel extends gameobject {

    div: HTMLElement;

    constructor(superHTMLelement: HTMLElement, x: number, y: number) {
        super(superHTMLelement, "wheel", x, y)

        // het DOM element waar de div in geplaatst wordt:


    }
    public turn(speed: number): void {
        this.div.style.transform += "rotate(" + speed*10 + "deg)";
    }
}