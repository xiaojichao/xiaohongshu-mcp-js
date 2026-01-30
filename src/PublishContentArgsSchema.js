import { z } from "zod";

export const PublishContentArgsSchema = z.object({
  title: z
    .string()
    .describe("内容标题（小红书限制：最多20个中文字或英文单词）"),

  content: z
    .string()
    .describe(
      "正文内容，不包含以#开头的标签内容，所有话题标签都用tags参数来生成和提供即可。"
    ),

  images: z
    .array(z.string())
    .min(1)
    .describe(
      "图片路径列表（至少需要1张图片）。支持两种方式：1. HTTP/HTTPS图片链接（自动下载）；2. 本地图片绝对路径"
    ),

  tags: z
    .array(z.string())
    .optional()
    .describe(
      "话题标签列表（可选参数），如 [#美食, #旅行, #生活]，最多3个，最少1个`"
    ),
});
