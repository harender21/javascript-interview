class AsyncTaskQueue {
    constructor(concurrency) {
        this.concurrency = concurrency;
        this.queue = [];
        this.running = 0;
    }

    queueTask(task) {
        this.queue.push(task);
        this.runNext();
    }

    runNext() {
        // While we can run more tasks
        while (this.running < this.concurrency && this.queue.length > 0) {
            const task = this.queue.shift();
            this.running++;

            Promise.resolve()
                .then(() => task())
                .catch(() => {
                    // silently ignore errors
                })
                .finally(() => {
                    this.running--;
                    this.runNext(); // trigger next task
                });
        }
    }
}

const queue = new AsyncTaskQueue(2);

const task1 = () =>
    new Promise((resolve) =>
        setTimeout(() => {
            console.log("Task 1 done");
            resolve();
        }, 1000)
    );

const task2 = () =>
    new Promise((resolve, reject) =>
        setTimeout(() => {
            console.log("Task 2 failed");
            reject();
        }, 500)
    );

const task3 = () =>
    new Promise((resolve) =>
        setTimeout(() => {
            console.log("Task 3 done");
            resolve();
        }, 200)
    );

queue.queueTask(task1);
queue.queueTask(task2);
queue.queueTask(task3);