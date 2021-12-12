function test() {
    const elem = document.querySelector(".game-container");
    const connect = new ConnectGame(5, 5, elem);
    connect.initialize();
}

window.onload = test;
