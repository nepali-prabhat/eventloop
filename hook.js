import chalk from "chalk";
import { createHook } from "async_hooks";
import { writeSync, writeFileSync } from "fs";
import { Map, List } from "immutable";

let asyncIdTypeMap = {};
let asyncData = [List([])];

function getLastData() {
    return asyncData[asyncData.length - 1];
}
function updateState(asyncId, value) {
    const last = getLastData();
    for (let i = 0; i < last.size; i++) {
        let v = last.get(i);
        if (v && v.get("id") === asyncId) {
            const newD = v.set("state", value);
            asyncData.push(last.set(i, newD));
            break;
        }
    }
}

function pushAsyncData(data) {
    asyncData.push(asyncData[asyncData.length - 1].push(Map(data)));
}
const hook = createHook({
    init(asyncId, type, triggerAsyncId, resource) {
        const discardedTypes = ["TickObject"];
        if (!discardedTypes.includes(type)) {
            asyncIdTypeMap[asyncId] = `${type}`;
            pushAsyncData({
                id: asyncId,
                type: type,
                triggerAsyncId: triggerAsyncId,
                state: "init",
            });

            writeSync(
                1,
                chalk.bgGreen(chalk.black(`Init: ${type} - ${asyncId}\n`))
            );
        }
    },
    before(asyncId) {
        if (!asyncIdTypeMap[asyncId]) {
            return;
        }
        updateState(asyncId, "before");
        writeSync(
            1,
            chalk.bgBlue(
                chalk.black(`Before: ${asyncId}(${asyncIdTypeMap[asyncId]})\n`)
            )
        );
    },
    after(asyncId) {
        if (!asyncIdTypeMap[asyncId]) {
            return;
        }
        updateState(asyncId, "after");
        writeSync(
            1,
            chalk.bgYellow(
                chalk.black(`After: ${asyncId}(${asyncIdTypeMap[asyncId]})\n`)
            )
        );
    },
    destroy(asyncId) {
        if (!asyncIdTypeMap[asyncId]) {
            return;
        }
        updateState(asyncId, "destroy");
        writeSync(
            1,
            chalk.bgRed(
                chalk.black(`Destroy: ${asyncId}(${asyncIdTypeMap[asyncId]})\n`)
            )
        );
    },
});
hook.enable();

const stateStyle = {
    before: `fillcolor="green", style="filled", fontcolor="white"`,
    after: `fillcolor="blue", style="filled", fontcolor="white"`,
    destroy: `fillcolor="red", style="filled", fontcolor="white"`,
};

// Generate DOT format graph from asyncData
function generateDotGraph(asyncData) {
    let labels = [];
    let relations = [];

    asyncData
        .toArray()
        .map(v => v.toObject())
        .forEach(({ id, type, triggerAsyncId, state }) => {
            labels.push(
                `${id}[label="${type} (${id})" ,${stateStyle[state] || ""}]`
            );
            relations.push(`"${triggerAsyncId}" -> "${id}";`);
        });

    return `digraph AsyncGraph {
${labels.join("\n")}
${relations.join("\n")}
}`;
}

process.on("exit", function () {
    writeFileSync("./data.txt", JSON.stringify(asyncData.map(generateDotGraph)));
});
