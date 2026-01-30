
import { ExpressHttpStreamableMcpServer } from "./src/server_runner.js";
import { checkLoginStatus } from "./src/checkLoginStatus.js";
import { PublishContentArgsSchema } from "./src/publishContentArgsSchema.js";
import { handlePublishContent } from "./src/publish.js";

let isLoggedIn = true;

const server = ExpressHttpStreamableMcpServer(
  {
    name: "xiaohongshu-mcp-server",
    version: "1.0.0",
    description: "拆解 https://github.com/xpzouying/xiaohongshu-mcp",
    capabilities: {
      tools: true,
      resources: true,
      prompts: true,
    },
  },
  (server) => {
    server.registerTool(
      "check_login_status",
      {
        title: "检查小红书登录状态",
        description: "检查小红书登录状态",
      },
      async () => {
        await server.sendLoggingMessage({
          level: "info",
          data: `等待登录中...`,
        });
        const loginStatus = await checkLoginStatus();
        if (!loginStatus) {
          return {
            content: [
              {
                type: "text",
                text: `用户未登录`,
              },
            ],
          };
        }
        isLoggedIn = true;
        return {
          content: [
            {
              type: "text",
              text: `用户已登录, 登录状态: ${loginStatus}`,
            },
          ],
        };
      }
    );
    server.registerTool(
      "publish_content",
      {
        title: "发布内容到小红书",
        description: "发布内容到小红书",
        inputSchema: PublishContentArgsSchema,
      },
      async ({ title, content, images, tags }) => {
        if (!isLoggedIn) {
          return {
            content: [
              {
                type: "text",
                text: "请先登录",
              },
            ],
          };
        }
        await handlePublishContent(title, content, images, tags);
        return {
          content: [
            {
              type: "text",
              text: `发布成功: ${title}`,
            },
          ],
        };
      }
    );
  }
);
