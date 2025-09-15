# PRD自动生成工具

一个基于Next.js和DeepSeek AI的智能产品需求文档(PRD)生成工具，帮助产品经理和开发者快速生成专业的PRD文档。

## 🚀 功能特性

- **多业务类型支持**: Web应用、量化交易系统、Web3区块链项目
- **多级联动选择**: 根据业务类型智能推荐客户端类型
- **AI智能生成**: 基于DeepSeek AI生成专业PRD文档
- **实时预览**: 支持文档实时预览和编辑
- **多格式导出**: 支持Markdown、PDF、Word格式导出
- **响应式设计**: 完美适配桌面端和移动端
- **深色模式**: 支持明暗主题切换

## 🛠️ 技术栈

- **前端框架**: Next.js 14 + React 18
- **样式方案**: TailwindCSS + CSS Modules
- **类型检查**: TypeScript
- **AI服务**: DeepSeek API
- **状态管理**: React Hooks
- **构建工具**: Turbopack

## 项目架构

### 系统架构图
```
用户界面层 (UI Layer)
├── 业务能力选择器 (Business Capability Selector)
├── 配置面板 (Configuration Panel)
├── 文档预览器 (Document Previewer)
└── 导出管理器 (Export Manager)

业务逻辑层 (Business Logic Layer)
├── 模板引擎 (Template Engine)
├── AI集成服务 (AI Integration Service)
├── 文档生成器 (Document Generator)
└── 配置管理器 (Configuration Manager)

数据层 (Data Layer)
├── PRD模板库 (PRD Templates)
├── 业务能力配置 (Business Capabilities)
└── 用户配置缓存 (User Config Cache)
```

### 核心模块设计

#### 1. 业务能力配置模块
- **用户管理**: 用户注册、登录、权限管理
- **电商系统**: 商品管理、订单处理、支付集成
- **内容管理**: 文章发布、媒体管理、SEO优化
- **数据分析**: 报表生成、用户行为分析、性能监控
- **社交功能**: 用户互动、评论系统、消息通知

#### 2. PRD模板系统
- **标准模板**: 产品概述、需求分析、功能规格
- **技术模板**: 架构设计、接口文档、数据库设计
- **项目模板**: 项目计划、里程碑、风险评估
- **自定义模板**: 用户可创建和编辑个性化模板

#### 3. AI生成引擎
- **提示词工程**: 针对不同业务场景的专业提示词
- **上下文管理**: 维护对话上下文，确保生成连贯性
- **质量控制**: 输出验证、格式化、错误处理
- **增量生成**: 支持分段生成和内容补充

## 安装和运行

### 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0
- DeepSeek API Key

### 环境配置

1. 克隆项目
```bash
git clone <repository-url>
cd getprd
```

2. 安装依赖
```bash
npm install
```

3. 配置环境变量
```bash
cp .env.example .env.local
# 编辑 .env.local 添加 DeepSeek API Key
DEEPSEEK_API_KEY=your_api_key_here
```

4. 运行开发服务器
```bash
npm run dev
```

5. 构建生产版本
```bash
npm run build
npm start
```

## 项目结构

```
getprd/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API路由
│   │   │   ├── generate/      # PRD生成接口
│   │   │   └── templates/     # 模板管理接口
│   │   ├── dashboard/         # 主控制台页面
│   │   ├── generator/         # 文档生成页面
│   │   └── layout.tsx         # 根布局
│   ├── components/            # React组件
│   │   ├── ui/               # 基础UI组件
│   │   ├── business/         # 业务组件
│   │   ├── templates/        # 模板组件
│   │   └── generator/        # 生成器组件
│   ├── lib/                  # 工具库
│   │   ├── ai/              # AI集成
│   │   ├── templates/       # 模板引擎
│   │   ├── export/          # 导出功能
│   │   └── utils/           # 通用工具
│   ├── types/               # TypeScript类型定义
│   ├── hooks/               # 自定义React Hooks
│   └── styles/              # 样式文件
├── public/                  # 静态资源
│   ├── templates/          # PRD模板文件
│   └── assets/             # 图片、图标等
├── docs/                   # 项目文档
├── .env.example           # 环境变量示例
├── next.config.js         # Next.js配置
├── tailwind.config.js     # TailwindCSS配置
└── package.json           # 项目依赖
```

## 开发计划

### Phase 1: 基础架构 (Week 1-2)
- [x] 项目初始化和环境配置
- [ ] Next.js项目搭建
- [ ] TailwindCSS样式系统
- [ ] 基础组件库开发
- [ ] 路由和页面结构

### Phase 2: 核心功能 (Week 3-4)
- [ ] 业务能力配置界面
- [ ] PRD模板系统
- [ ] DeepSeek API集成
- [ ] 文档生成引擎

### Phase 3: 高级功能 (Week 5-6)
- [ ] 实时预览功能
- [ ] 多格式导出
- [ ] 自定义模板编辑器
- [ ] 用户配置管理

### Phase 4: 优化部署 (Week 7-8)
- [ ] 性能优化
- [ ] 错误处理和日志
- [ ] 单元测试
- [ ] 生产环境部署

## 贡献指南

1. Fork 本仓库
2. 创建您的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的修改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 联系方式

- 作者：[您的姓名]
- 邮箱：[您的邮箱]
- 项目链接：[项目仓库地址]