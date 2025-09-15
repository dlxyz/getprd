// 文件目录架构配置 - 标准项目结构模板

export interface DirectoryItem {
  name: string;
  type: 'file' | 'directory';
  description?: string;
  children?: DirectoryItem[];
  content?: string; // 文件内容示例
}

export interface DirectoryStructure {
  techStackId: string;
  name: string;
  description: string;
  structure: DirectoryItem[];
  keyFeatures: string[];
}

// 前端项目目录结构
export const frontendStructures: DirectoryStructure[] = [
  {
    techStackId: 'react',
    name: 'React + TypeScript + Vite',
    description: '现代化 React 项目标准目录结构',
    keyFeatures: ['组件化开发', '类型安全', '模块化样式', '自动化测试'],
    structure: [
      {
        name: 'src',
        type: 'directory',
        description: '源代码目录',
        children: [
          {
            name: 'components',
            type: 'directory',
            description: '可复用组件',
            children: [
              {
                name: 'ui',
                type: 'directory',
                description: '基础UI组件',
                children: [
                  { name: 'Button.tsx', type: 'file', description: '按钮组件' },
                  { name: 'Input.tsx', type: 'file', description: '输入框组件' },
                  { name: 'Modal.tsx', type: 'file', description: '模态框组件' }
                ]
              },
              {
                name: 'business',
                type: 'directory',
                description: '业务组件',
                children: [
                  { name: 'UserProfile.tsx', type: 'file', description: '用户资料组件' },
                  { name: 'ProductCard.tsx', type: 'file', description: '产品卡片组件' }
                ]
              }
            ]
          },
          {
            name: 'pages',
            type: 'directory',
            description: '页面组件',
            children: [
              { name: 'Home.tsx', type: 'file', description: '首页' },
              { name: 'About.tsx', type: 'file', description: '关于页面' },
              { name: 'Login.tsx', type: 'file', description: '登录页面' }
            ]
          },
          {
            name: 'hooks',
            type: 'directory',
            description: '自定义 Hooks',
            children: [
              { name: 'useAuth.ts', type: 'file', description: '认证相关 Hook' },
              { name: 'useApi.ts', type: 'file', description: 'API 请求 Hook' }
            ]
          },
          {
            name: 'store',
            type: 'directory',
            description: '状态管理',
            children: [
              { name: 'index.ts', type: 'file', description: 'Store 入口' },
              { name: 'authSlice.ts', type: 'file', description: '认证状态' },
              { name: 'userSlice.ts', type: 'file', description: '用户状态' }
            ]
          },
          {
            name: 'services',
            type: 'directory',
            description: 'API 服务',
            children: [
              { name: 'api.ts', type: 'file', description: 'API 配置' },
              { name: 'auth.ts', type: 'file', description: '认证服务' },
              { name: 'user.ts', type: 'file', description: '用户服务' }
            ]
          },
          {
            name: 'utils',
            type: 'directory',
            description: '工具函数',
            children: [
              { name: 'helpers.ts', type: 'file', description: '通用工具函数' },
              { name: 'constants.ts', type: 'file', description: '常量定义' },
              { name: 'validators.ts', type: 'file', description: '验证函数' }
            ]
          },
          {
            name: 'types',
            type: 'directory',
            description: 'TypeScript 类型定义',
            children: [
              { name: 'index.ts', type: 'file', description: '类型导出' },
              { name: 'api.ts', type: 'file', description: 'API 类型' },
              { name: 'user.ts', type: 'file', description: '用户类型' }
            ]
          },
          {
            name: 'styles',
            type: 'directory',
            description: '样式文件',
            children: [
              { name: 'globals.css', type: 'file', description: '全局样式' },
              { name: 'variables.css', type: 'file', description: 'CSS 变量' }
            ]
          },
          { name: 'App.tsx', type: 'file', description: '应用根组件' },
          { name: 'main.tsx', type: 'file', description: '应用入口' }
        ]
      },
      {
        name: 'public',
        type: 'directory',
        description: '静态资源',
        children: [
          { name: 'favicon.ico', type: 'file', description: '网站图标' },
          { name: 'logo.svg', type: 'file', description: '应用Logo' }
        ]
      },
      {
        name: '__tests__',
        type: 'directory',
        description: '测试文件',
        children: [
          { name: 'components', type: 'directory', description: '组件测试' },
          { name: 'utils', type: 'directory', description: '工具函数测试' }
        ]
      },
      { name: 'package.json', type: 'file', description: '项目配置' },
      { name: 'tsconfig.json', type: 'file', description: 'TypeScript 配置' },
      { name: 'vite.config.ts', type: 'file', description: 'Vite 配置' },
      { name: 'tailwind.config.js', type: 'file', description: 'Tailwind CSS 配置' },
      { name: '.eslintrc.js', type: 'file', description: 'ESLint 配置' },
      { name: '.gitignore', type: 'file', description: 'Git 忽略文件' },
      { name: 'README.md', type: 'file', description: '项目说明文档' }
    ]
  },
  {
    techStackId: 'nextjs',
    name: 'Next.js 14 + App Router',
    description: 'Next.js 全栈应用目录结构',
    keyFeatures: ['App Router', '服务端渲染', 'API Routes', '文件路由'],
    structure: [
      {
        name: 'src',
        type: 'directory',
        children: [
          {
            name: 'app',
            type: 'directory',
            description: 'App Router 目录',
            children: [
              {
                name: 'api',
                type: 'directory',
                description: 'API 路由',
                children: [
                  { name: 'auth', type: 'directory' },
                  { name: 'users', type: 'directory' }
                ]
              },
              {
                name: '(dashboard)',
                type: 'directory',
                description: '路由组',
                children: [
                  { name: 'analytics', type: 'directory' },
                  { name: 'settings', type: 'directory' }
                ]
              },
              { name: 'globals.css', type: 'file' },
              { name: 'layout.tsx', type: 'file', description: '根布局' },
              { name: 'page.tsx', type: 'file', description: '首页' },
              { name: 'loading.tsx', type: 'file', description: '加载组件' },
              { name: 'error.tsx', type: 'file', description: '错误组件' }
            ]
          },
          {
            name: 'components',
            type: 'directory',
            children: [
              { name: 'ui', type: 'directory' },
              { name: 'forms', type: 'directory' },
              { name: 'layout', type: 'directory' }
            ]
          },
          {
            name: 'lib',
            type: 'directory',
            description: '工具库',
            children: [
              { name: 'auth.ts', type: 'file' },
              { name: 'db.ts', type: 'file' },
              { name: 'utils.ts', type: 'file' }
            ]
          }
        ]
      },
      { name: 'next.config.js', type: 'file', description: 'Next.js 配置' }
    ]
  }
];

// 后端项目目录结构
export const backendStructures: DirectoryStructure[] = [
  {
    techStackId: 'nodejs_express',
    name: 'Node.js + Express + TypeScript',
    description: 'Express 后端服务标准目录结构',
    keyFeatures: ['RESTful API', '中间件', '数据库集成', '认证授权'],
    structure: [
      {
        name: 'src',
        type: 'directory',
        children: [
          {
            name: 'controllers',
            type: 'directory',
            description: '控制器层',
            children: [
              { name: 'authController.ts', type: 'file' },
              { name: 'userController.ts', type: 'file' },
              { name: 'productController.ts', type: 'file' }
            ]
          },
          {
            name: 'models',
            type: 'directory',
            description: '数据模型',
            children: [
              { name: 'User.ts', type: 'file' },
              { name: 'Product.ts', type: 'file' },
              { name: 'Order.ts', type: 'file' }
            ]
          },
          {
            name: 'routes',
            type: 'directory',
            description: '路由定义',
            children: [
              { name: 'index.ts', type: 'file' },
              { name: 'auth.ts', type: 'file' },
              { name: 'users.ts', type: 'file' },
              { name: 'products.ts', type: 'file' }
            ]
          },
          {
            name: 'middleware',
            type: 'directory',
            description: '中间件',
            children: [
              { name: 'auth.ts', type: 'file' },
              { name: 'validation.ts', type: 'file' },
              { name: 'errorHandler.ts', type: 'file' },
              { name: 'logger.ts', type: 'file' }
            ]
          },
          {
            name: 'services',
            type: 'directory',
            description: '业务逻辑层',
            children: [
              { name: 'authService.ts', type: 'file' },
              { name: 'userService.ts', type: 'file' },
              { name: 'emailService.ts', type: 'file' }
            ]
          },
          {
            name: 'config',
            type: 'directory',
            description: '配置文件',
            children: [
              { name: 'database.ts', type: 'file' },
              { name: 'jwt.ts', type: 'file' },
              { name: 'env.ts', type: 'file' }
            ]
          },
          {
            name: 'utils',
            type: 'directory',
            description: '工具函数',
            children: [
              { name: 'helpers.ts', type: 'file' },
              { name: 'validators.ts', type: 'file' },
              { name: 'constants.ts', type: 'file' }
            ]
          },
          {
            name: 'types',
            type: 'directory',
            description: '类型定义',
            children: [
              { name: 'index.ts', type: 'file' },
              { name: 'express.d.ts', type: 'file' }
            ]
          },
          { name: 'app.ts', type: 'file', description: 'Express 应用配置' },
          { name: 'server.ts', type: 'file', description: '服务器启动文件' }
        ]
      },
      {
        name: 'tests',
        type: 'directory',
        description: '测试文件',
        children: [
          { name: 'unit', type: 'directory' },
          { name: 'integration', type: 'directory' },
          { name: 'setup.ts', type: 'file' }
        ]
      },
      {
        name: 'docs',
        type: 'directory',
        description: 'API 文档',
        children: [
          { name: 'api.md', type: 'file' },
          { name: 'swagger.yaml', type: 'file' }
        ]
      },
      { name: 'package.json', type: 'file' },
      { name: 'tsconfig.json', type: 'file' },
      { name: '.env.example', type: 'file' },
      { name: 'Dockerfile', type: 'file' },
      { name: 'docker-compose.yml', type: 'file' }
    ]
  },
  {
    techStackId: 'python_django',
    name: 'Django 4.x',
    description: 'Django 后端项目标准结构',
    keyFeatures: ['MVT架构', 'ORM', 'Admin后台', 'REST Framework'],
    structure: [
      {
        name: 'myproject',
        type: 'directory',
        children: [
          { name: '__init__.py', type: 'file' },
          { name: 'settings.py', type: 'file' },
          { name: 'urls.py', type: 'file' },
          { name: 'wsgi.py', type: 'file' },
          { name: 'asgi.py', type: 'file' }
        ]
      },
      {
        name: 'apps',
        type: 'directory',
        children: [
          {
            name: 'users',
            type: 'directory',
            children: [
              { name: 'models.py', type: 'file' },
              { name: 'views.py', type: 'file' },
              { name: 'serializers.py', type: 'file' },
              { name: 'urls.py', type: 'file' }
            ]
          },
          {
            name: 'products',
            type: 'directory',
            children: [
              { name: 'models.py', type: 'file' },
              { name: 'views.py', type: 'file' },
              { name: 'serializers.py', type: 'file' }
            ]
          }
        ]
      },
      { name: 'manage.py', type: 'file' },
      { name: 'requirements.txt', type: 'file' }
    ]
  }
];

// 移动端项目目录结构
export const mobileStructures: DirectoryStructure[] = [
  {
    techStackId: 'react_native',
    name: 'React Native',
    description: 'React Native 跨平台移动应用结构',
    keyFeatures: ['跨平台', '原生性能', '热更新', '组件化'],
    structure: [
      {
        name: 'src',
        type: 'directory',
        children: [
          {
            name: 'components',
            type: 'directory',
            children: [
              { name: 'common', type: 'directory' },
              { name: 'forms', type: 'directory' }
            ]
          },
          {
            name: 'screens',
            type: 'directory',
            children: [
              { name: 'HomeScreen.tsx', type: 'file' },
              { name: 'LoginScreen.tsx', type: 'file' }
            ]
          },
          {
            name: 'navigation',
            type: 'directory',
            children: [
              { name: 'AppNavigator.tsx', type: 'file' },
              { name: 'TabNavigator.tsx', type: 'file' }
            ]
          },
          { name: 'services', type: 'directory' },
          { name: 'store', type: 'directory' },
          { name: 'utils', type: 'directory' }
        ]
      },
      {
        name: 'android',
        type: 'directory',
        description: 'Android 原生代码'
      },
      {
        name: 'ios',
        type: 'directory',
        description: 'iOS 原生代码'
      }
    ]
  }
];

// 获取技术栈对应的目录结构
export function getDirectoryStructure(techStackId: string): DirectoryStructure | undefined {
  const allStructures = [
    ...frontendStructures,
    ...backendStructures,
    ...mobileStructures
  ];
  
  return allStructures.find(structure => structure.techStackId === techStackId);
}

// 生成目录结构文档
export function generateDirectoryStructureDoc(techStackIds: string[]): string {
  const docs: string[] = [];
  
  techStackIds.forEach(techStackId => {
    const structure = getDirectoryStructure(techStackId);
    if (structure) {
      docs.push(`\n## ${structure.name} 项目结构\n`);
      docs.push(`${structure.description}\n`);
      
      docs.push(`**核心特性:**\n`);
      structure.keyFeatures.forEach(feature => {
        docs.push(`- ${feature}\n`);
      });
      
      docs.push(`\n**目录结构:**\n\`\`\`\n`);
      docs.push(renderDirectoryTree(structure.structure, ''));
      docs.push(`\`\`\`\n`);
      
      docs.push(`\n**目录说明:**\n`);
      docs.push(renderDirectoryDescriptions(structure.structure, ''));
    }
  });
  
  return docs.join('');
}

// 渲染目录树
function renderDirectoryTree(items: DirectoryItem[], prefix: string): string {
  const lines: string[] = [];
  
  items.forEach((item, index) => {
    const isLast = index === items.length - 1;
    const connector = isLast ? '└── ' : '├── ';
    const itemName = item.type === 'directory' ? `${item.name}/` : item.name;
    
    lines.push(`${prefix}${connector}${itemName}\n`);
    
    if (item.children) {
      const childPrefix = prefix + (isLast ? '    ' : '│   ');
      lines.push(renderDirectoryTree(item.children, childPrefix));
    }
  });
  
  return lines.join('');
}

// 渲染目录说明
function renderDirectoryDescriptions(items: DirectoryItem[], prefix: string): string {
  const lines: string[] = [];
  
  items.forEach(item => {
    if (item.description) {
      const itemName = item.type === 'directory' ? `${item.name}/` : item.name;
      lines.push(`- **${prefix}${itemName}**: ${item.description}\n`);
    }
    
    if (item.children) {
      lines.push(renderDirectoryDescriptions(item.children, `${prefix}${item.name}/`));
    }
  });
  
  return lines.join('');
}