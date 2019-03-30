export class Anforderung {
    id: number;
    name: string;
    prio: number;

    constructor(id: number, name: string, prio: number) {
        this.id = id;
        this.name = name;
        this.prio = prio;
    }
}
