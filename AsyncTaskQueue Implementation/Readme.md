# Implement AsyncTaskQueue

- Design and implement an AsyncTaskQueue class that manages the execution of asynchronous tasks with a specified maximum concurrency limit. The queue should execute tasks in the order they are added (FIFO) and ensure that no more than the specified number of tasks run concurrently. If a task’s Promise rejects, the rejection should be silently ignored, allowing the queue to continue processing remaining tasks.

- This is a classic concurrency control + queue problem—very common in frontend/system design rounds.

- Let’s design it step by step 👇

🔹 Key Requirements
FIFO order → tasks execute in order added
Concurrency limit → max N tasks at a time
Async tasks → each task returns a Promise
Error handling → ignore rejected promises (don’t break queue)

🔹 Core Idea

We maintain:

queue → holds pending tasks
running → number of tasks currently executing
Flow:
Add task to queue
Try to execute tasks if running < concurrency
When a task finishes:
decrement running
start next task


🔥 Execution Flow (Important for Interview)
task1 & task2 start immediately (limit = 2)
task3 waits
task2 finishes first (500ms, even though rejected)
task3 starts
Queue continues smoothly
🧠 Key Interview Insights

1. Why while loop instead of if?

Ensures we fill all available concurrency slots immediately

2. Why Promise.resolve().then(task)?

Handles:

sync functions
async functions
Uniformly as promises

3. Why .finally()?

Guarantees:

cleanup (running--)
next task execution
even if task fails


4. FIFO Guarantee

Using:

this.queue.push(task)
this.queue.shift()