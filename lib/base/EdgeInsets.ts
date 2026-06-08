export class EdgeInsets {
    left: number;
    right: number;
    top: number;
    bottom: number;

    private constructor(
        left: number,
        top: number,
        right: number,
        bottom: number
    ) {
        this.left = left;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
    }

    static all(value: number): EdgeInsets {
        return new EdgeInsets(
            value,
            value,
            value,
            value,
        )
    }

    static fromLTRB(
        left: number,
        top: number,
        right: number,
        bottom: number
    ): EdgeInsets {
        return new EdgeInsets(
            left,
            right,
            top,
            bottom
        );
    }
}