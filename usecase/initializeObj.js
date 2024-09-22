class DbConnector {
    constructor() {}

    setType(type) {
        // possible values: redis, postgres
        this.type = type;
    }
    setConnectionUrl(url) {
        this.url = url;
    }

    connect() {
        if (this.type === "redis") {
            // use redis package to connect
        } else if (this.type === "postgres") {
            // use postgres to connect
        }
    }
}

export let db = undefined;
function main() {
    db = DbConnector();
    // do something after initializing an object
    process.nextTick(() => {
        db.connect();
    });

    db.setType("redis");
    db.setConnectionUrl("redis:://...");
    // more stuffs that happens to the instance
}
main();
