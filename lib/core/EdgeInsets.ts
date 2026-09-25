export class EdgeInsets {
    l: number;
    r: number;
    t: number;
    b: number;

    private constructor(
        l: number,
        t: number,
        r: number,
        b: number
    ) {
        this.l = l;
        this.t = t;
        this.r = r;
        this.b = b;
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
        l: number,
        t: number,
        r: number,
        b: number
    ): EdgeInsets {
        return new EdgeInsets(
            l,
            r,
            t,
            b
        );
    }
}