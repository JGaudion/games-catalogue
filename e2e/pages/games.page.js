var gamesPage = Object.create({}, {
    navigate: { value: navigate },
    heading: { get: getHeading }
});

module.exports = gamesPage;

function navigate() {
    browser.get('/games');
}

function getHeading() {
    return element(by.tagName('h1')).getText();
}