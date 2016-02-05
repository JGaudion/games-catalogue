var gamesPage = Object.create({}, {
    navigate: { value: navigate },
    heading: { get: getHeading },
    games: { get: getGames }
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