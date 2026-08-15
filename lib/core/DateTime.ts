export class DateTime {
    timestamp: number;

    private constructor(
        timestamp: number,
    ) {
        this.timestamp = timestamp;
    }

    static now(): DateTime {
        return new DateTime(
            Date.now()
        );
    }

    static from(
        day: number,
        month: number,
        year: number
    ): DateTime {
        return new DateTime(
            new Date(year, month - 1, day).getTime()
        );
    }
}