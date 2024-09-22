function rec_exceed(n){
    if (n==0){
        return 
    }
    rec_exceed(n-1)
}

function rec_not_exceed(n){
    if (n==0){
        return 
    }
    process.nextTick(()=>{
        rec_not_exceed(n-1)
    })
}
rec_not_exceed(10000)
