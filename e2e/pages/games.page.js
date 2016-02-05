var gamesPage = Object.create({}, {
    navigate: { value: navigate },
    heading: { get: getHeading },
    games: { get: getGames },
    noGamesMessage: { get: getNoGamesMessage },
    error: { get: getError }
});

module.exports = gamesPage;

function navigate() {
    browser.get('/games');
}

function getHeading() {
    return element(by.tagName('h1')).getText();
}

function getGames() {
    return element.all(by.exactRepeater('game in games.list')).getText();
}

function getError() {
    return element(by.className('alert-danger')).getText();
}

function getNoGamesMessage() {
    return element(by.className('no-games'));
}