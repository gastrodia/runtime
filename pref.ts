
var prefRecord: {
    [taskName: string]: {
        startTime?: number,
        endTime?: number,
        startUsedJSHeapSize?: number,
        endUsedJSHeapSize?: number
    }
} = {};



export function startTask(taskName) {
    prefRecord[taskName] = {
        startTime: performance.now(),
        startUsedJSHeapSize: (performance as any).memory.usedJSHeapSize,
    }
}

export function endTask(taskName) {
    var record = prefRecord[taskName]

    record.endTime = performance.now();
    record.endUsedJSHeapSize = (performance as any).memory.usedJSHeapSize

}

export function printPref(taskName) {
    var record = prefRecord[taskName]
    //spendMemory:${record.endUsedJSHeapSize - record.startUsedJSHeapSize}
    console.log(`#${taskName} spendTime:${Math.round(record.endTime - record.startTime)}`)
}