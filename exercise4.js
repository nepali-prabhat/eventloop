// import "./hook.js";

function recursiveOperation(n) {
  if (n === 0) return;
  // process.nextTick(() => {
    console.log(n);
    recursiveOperation(n - 1);
  // });
}

recursiveOperation(10000);  // Won't cause a stack overflow due to deferred execution

