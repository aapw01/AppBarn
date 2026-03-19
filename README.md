# AppBarn

一个完全基于 Cloudflare 免费资源部署的独立开发者产品展示站：

- 用户可提交 `App`（名称、介绍、图片可选、App Store 链接）
- 用户可提交 `Website`（名称、介绍、图片可选、网站链接）
- 用户可提交 `System`（名称、介绍、图片可选、GitHub 链接）
- 管理后台支持审核开关（开：需审核；关：直接上线）

## 技术栈

- **Hono**：运行在 Cloudflare Workers 的轻量 Web 框架（SSR）
- **Cloudflare D1**：存储产品数据与站点设置
- **Cloudflare R2**：存储产品图片
- **Cloudflare Workers**：统一承载页面和 API

## 部署前准备

1. 安装 Node.js（建议 18+）
2. 有 Cloudflare 账号
3. 安装依赖后使用 `wrangler` 命令行

```bash
npm install
```

## Step by Step 部署（中文）

### Step 1：登录 Cloudflare

```bash
npx wrangler login
```

浏览器会弹出授权页面，完成授权即可。

### Step 2：创建 D1 数据库

```bash
npx wrangler d1 create appbarn-db
```

执行后会返回一个 `database_id`，复制下来，下一步要写入 `wrangler.toml`。

### Step 3：创建 R2 存储桶

```bash
npx wrangler r2 bucket create appbarn-images
```

### Step 4：更新 `wrangler.toml`

仓库默认只提交 `wrangler.toml.example`。先复制一份本地配置：

```bash
cp wrangler.toml.example wrangler.toml
```

再打开本地 `wrangler.toml`，把下面占位符：

```toml
database_id = "placeholder-replace-after-d1-create"
```

替换为你刚创建 D1 时得到的真实 `database_id`。这个本地 `wrangler.toml` 不会上传到 GitHub。

### Step 5：初始化数据库表结构

先初始化本地调试数据库（可选）：

```bash
npx wrangler d1 execute appbarn-db --local --file=schema.sql
```

再初始化线上数据库（必须）：

```bash
npx wrangler d1 execute appbarn-db --remote --file=schema.sql
```

如果你是在已有的 `App/System` 版本上升级到支持 `Website` 类型，还需要执行一次迁移：

```bash
npx wrangler d1 execute appbarn-db --remote --file=migrations/20260319_add_website_type.sql
```

### Step 6：配置管理员密钥

```bash
npx wrangler secret put ADMIN_TOKEN
```

终端会提示你输入管理员 Token（建议使用高强度随机字符串）。

### Step 7：本地运行验证

```bash
npm run dev
```

验证以下页面：

- `/` 首页
- `/apps` 表格列表页
- `/submit` 提交页（含图片上传）
- `/admin` 管理后台（输入 `ADMIN_TOKEN`）

### Step 8：部署到 Cloudflare Workers

```bash
npm run deploy
```

部署完成后会输出线上域名（`*.workers.dev`），访问即可。

## 上线后检查清单

1. 提交一个 App（可不传图片）是否成功
2. 提交一个 Website（可不传图片）是否成功
3. 提交一个 System（可不传图片）是否成功
4. 管理后台切换“审核开关”是否生效  
   - 开启审核：提交后应进入 `pending`  
   - 关闭审核：提交后应直接 `approved`
5. 图片链接是否可访问（`/api/images/:key`）

## 页面说明

| 路径 | 说明 |
|---|---|
| `/` | 首页（浅色高级风格，统计 + 最新产品表格） |
| `/apps` | 产品列表页（表格排版 + 筛选 + 搜索） |
| `/submit` | 用户提交页（App/Website/System + 可选图片） |
| `/admin` | 管理员后台（审核 + 审核开关） |

## 常见问题

### 1) `Unauthorized`（后台 401）

- 检查输入的 Token 是否与 `ADMIN_TOKEN` 一致
- 如需重置：再次执行 `npx wrangler secret put ADMIN_TOKEN`

### 2) 图片上传失败

- 检查 R2 bucket 是否创建成功并与本地 `wrangler.toml` 的 `bucket_name` 一致
- 检查文件大小是否超过 5MB，格式是否为常见图片格式

### 3) 数据库没有数据

- 确认已执行远端建表命令：  
  `npx wrangler d1 execute appbarn-db --remote --file=schema.sql`
