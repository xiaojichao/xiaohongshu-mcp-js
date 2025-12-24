// npm install playwright
import { chromium } from "playwright";

export async function checkLoginStatus() {
  // 启动浏览器
  const browser = await chromium.launchPersistentContext(
    ".chromiumTemp", // 将浏览器数据存储在当前目录下
    {
      headless: false, // 显示浏览器，便于调试
    }
  );
  const page = await browser.newPage();

  await page.goto("https://www.xiaohongshu.com/explore", { waitUntil: "load" });

  try {
    // 检查登录状态元素是否存在
    // const loginElement = await page.$(
    //   ".main-container .user .link-wrapper .channel"
    // );
    // 轮训 等待登录中...
    const loginElement = await page.waitForSelector(
      ".main-container .user .link-wrapper .channel",
      { timeout: 0 }
    );

    if (!loginElement) {
      await browser.close();
      throw new Error("login status element not found");
    }

    await browser.close();
    return true;
  } catch (err) {
    await browser.close();
    throw new Error("login status element not found");
  }
}
