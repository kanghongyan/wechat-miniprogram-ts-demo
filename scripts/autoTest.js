const automator = require('miniprogram-automator');
const path = require('path');

const miniProgram = automator.launch({
    projectPath: path.resolve('miniprogram'), // 项目文件地址
}).then(async miniProgram => {
    const page = await miniProgram.reLaunch('/pages/my/my')
    await page.waitFor(500)
    const element = await page.$('.kind-list-item-hd')
    console.log(await element.attribute('class'))
    await element.tap()

    await miniProgram.close()
})

miniProgram()
