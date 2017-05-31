export class DrawableAlgorithm {

    public isDone: boolean = false;
    public result: any = null;

    public constructor(private algorithm: any) {
        this.algorithm.init();
    }

    public start(): void {
        this.iteration();
    }

    public stop(): void {
        this.isDone = true;
    }

    public iteration(): any {
        if (this.isDone) return;
        this.result = this.algorithm.run();
    }

}