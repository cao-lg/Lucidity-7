# 清醒度层级测试网站部署指南

## 1. GitHub 推送（手动执行）

由于 SSL 证书问题，请在本地终端执行以下命令：

```bash
cd e:\solo
git push https://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@github.com/cao-lg/Lucidity-7.git master
```

## 2. Cloudflare Pages 部署

### 方法一：从 GitHub 自动部署（推荐）

1. **访问 Cloudflare Dashboard**
   - 打开 https://dash.cloudflare.com/
   - 登录你的 Cloudflare 账号

2. **创建新项目**
   - 点击 "Workers & Pages"
   - 点击 "Create application"
   - 选择 "Pages" 选项卡
   - 点击 "Connect to Git"

3. **连接 GitHub**
   - 选择 `cao-lg/Lucidity-7` 仓库
   - 授权 Cloudflare 访问你的仓库

4. **配置部署**
   - **Project name**: `lucidity-test` (或你喜欢的名称)
   - **Production branch**: `master`
   - **Build settings**:
     - **Framework preset**: `Vite`
     - **Build command**: `npm run build`
     - **Build output directory**: `dist`
   - **Environment variables** (可选):
     - `NODE_VERSION`: `18`

5. **部署**
   - 点击 "Save and Deploy"
   - 等待构建完成
   - 获得免费域名: `https://lucidity-test.pages.dev`

### 方法二：手动上传 dist 文件夹

1. **本地构建**
   ```bash
   cd e:\solo
   npm run build
   ```

2. **创建 Cloudflare Pages 项目**
   - 访问 https://dash.cloudflare.com/
   - 创建新 Pages 项目
   - 选择 "Direct Upload" 选项
   - 将 `dist` 文件夹拖拽上传

## 3. 验证部署

部署成功后，访问 Cloudflare 提供的 URL，例如：
- `https://lucidity-test.pages.dev`

## 4. 自定义域名（可选）

如果你有自定义域名：

1. 在 Cloudflare Pages 项目设置中
2. 点击 "Custom domains"
3. 添加你的域名（如 `test.example.com`）
4. Cloudflare 会自动配置 SSL 证书

## 5. 持续部署

每次推送到 GitHub 的 `master` 分支，Cloudflare Pages 会自动重新部署。

```bash
# 本地提交并推送更新
git add .
git commit -m "更新内容"
git push https://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@github.com/cao-lg/Lucidity-7.git master
```

## 常见问题

**Q: 部署失败怎么办？**
- 检查 Build command 是否正确：`npm run build`
- 检查 Build output directory 是否为：`dist`
- 查看 Cloudflare 构建日志排查错误

**Q: 如何回滚到之前的版本？**
- 在 Cloudflare Pages 的 Deployments 页面
- 选择之前的部署，点击 "Promote to production"

**Q: 域名显示不安全？**
- 确保证书状态为 "Active"
- 等待几分钟让证书生效

## 项目信息

- **仓库**: https://github.com/cao-lg/Lucidity-7
- **技术栈**: React + TypeScript + Vite + Tailwind CSS
- **无需后端**: 纯静态网站
