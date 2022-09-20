const {Builder, Capabilities, By} = require('selenium-webdriver')

require('chromedriver')

const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

beforeAll(async () => {
    await driver.get('http://127.0.0.1:5501/movieList/index.html')
})

afterAll(async () => {
    await driver.quit()
})



test('Crossing Off a Movie', async () => {
    // add Movie
    await driver.findElement(By.xpath('//input')).sendKeys('Interstellar\n')

    // cross off Movie
    const myMovie = await driver.findElement(By.xpath('//li/span'))
    await myMovie.click()
    await driver.sleep(1000)

    // check if element's class name is 'checked'
    const checkedClass = driver.findElement(By.className('checked'))

    expect(checkedClass).toBeTruthy()
})

test('Deleting a Movie', async () => {
    // add Movie
    await driver.findElement(By.xpath('//input')).sendKeys('Interstellar\n')

    // click delete button
    await driver.findElement(By.xpath('//li/button')).click()

    // check for a list element to exist
    let checkDeleted = false

    if (driver.findElement(By.xpath("//li"))) {
        checkDeleted = true
    }

    expect(checkDeleted).toBeTruthy()
})

test('Message Displayed', async () => {
    // add Movie
    await driver.findElement(By.xpath('//input')).sendKeys('Interstellar\n')

    // click delete button
    await driver.findElement(By.xpath('//li/button')).click()

    // check for aside element to contain message
    let checkMessage = await driver.findElement(By.xpath('//aside[contains(text(),"deleted!")]'))

    expect(checkMessage).toBeTruthy()
})
