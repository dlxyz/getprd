// 脚手架配置 - 项目初始化命令和工具

export interface ScaffoldCommand {
  id: string;
  name: string;
  description: string;
  command: string;
  prerequisites?: string[];
  postInstall?: string[];
  notes?: string;
}

export interface ScaffoldConfig {
  techStackId: string;
  commands: ScaffoldCommand[];
  packageManager: 'npm' | 'yarn' | 'pnpm' | 'bun' | 'pip' | 'maven' | 'go' | 'flutter';
  nodeVersion?: string;
  additionalTools?: string[];
}

// 前端脚手架配置
export const frontendScaffolds: ScaffoldConfig[] = [
  {
    techStackId: 'react',
    packageManager: 'npm',
    nodeVersion: '18+',
    commands: [
      {
        id: 'create_react_vite',
        name: 'Vite + React + TypeScript',
        description: '使用 Vite 创建现代化 React 项目',
        command: 'npm create vite@latest my-react-app -- --template react-ts',
        postInstall: [
          'cd my-react-app',
          'npm install',
          'npm install -D tailwindcss postcss autoprefixer',
          'npx tailwindcss init -p'
        ],
        notes: '推荐使用 Vite 作为构建工具，支持热更新和快速构建'
      },
      {
        id: 'create_react_app',
        name: 'Create React App',
        description: '官方 React 脚手架（适合初学者）',
        command: 'npx create-react-app my-react-app --template typescript',
        postInstall: [
          'cd my-react-app',
          'npm install @types/node @types/react @types/react-dom'
        ]
      }
    ],
    additionalTools: ['ESLint', 'Prettier', 'Husky', 'lint-staged']
  },
  {
    techStackId: 'vue',
    packageManager: 'npm',
    nodeVersion: '18+',
    commands: [
      {
        id: 'create_vue',
        name: 'Vue 3 + Vite + TypeScript',
        description: '创建 Vue 3 项目',
        command: 'npm create vue@latest my-vue-app',
        postInstall: [
          'cd my-vue-app',
          'npm install'
        ],
        notes: '选择 TypeScript、Router、Pinia、ESLint 等选项'
      }
    ],
    additionalTools: ['Vue DevTools', 'Vetur/Volar']
  },
  {
    techStackId: 'nextjs',
    packageManager: 'npm',
    nodeVersion: '18+',
    commands: [
      {
        id: 'create_next_app',
        name: 'Next.js 14 + TypeScript',
        description: '创建 Next.js 全栈应用',
        command: 'npx create-next-app@latest my-next-app --typescript --tailwind --eslint --app',
        postInstall: [
          'cd my-next-app',
          'npm install @next/font'
        ],
        notes: '使用 App Router 和 Tailwind CSS'
      }
    ],
    additionalTools: ['Vercel CLI', 'Next.js DevTools']
  },
  {
    techStackId: 'angular',
    packageManager: 'npm',
    nodeVersion: '18+',
    commands: [
      {
        id: 'create_angular',
        name: 'Angular 17+',
        description: '创建 Angular 企业级应用',
        command: 'npm install -g @angular/cli && ng new my-angular-app --routing --style=scss --strict',
        postInstall: [
          'cd my-angular-app',
          'ng add @angular/material'
        ]
      }
    ],
    additionalTools: ['Angular DevTools', 'Angular Language Service']
  }
];

// 后端脚手架配置
export const backendScaffolds: ScaffoldConfig[] = [
  {
    techStackId: 'nodejs_express',
    packageManager: 'npm',
    nodeVersion: '18+',
    commands: [
      {
        id: 'express_typescript',
        name: 'Express + TypeScript',
        description: '创建 Express TypeScript 项目',
        command: 'mkdir my-express-app && cd my-express-app && npm init -y',
        postInstall: [
          'npm install express cors helmet morgan',
          'npm install -D @types/express @types/cors @types/morgan typescript ts-node nodemon',
          'npx tsc --init'
        ]
      }
    ],
    additionalTools: ['PM2', 'Jest', 'Supertest']
  },
  {
    techStackId: 'nodejs_fastify',
    packageManager: 'npm',
    nodeVersion: '18+',
    commands: [
      {
        id: 'fastify_typescript',
        name: 'Fastify + TypeScript',
        description: '创建高性能 Fastify 项目',
        command: 'npm create fastify@latest my-fastify-app -- --lang=ts',
        postInstall: [
          'cd my-fastify-app',
          'npm install'
        ]
      }
    ]
  },
  {
    techStackId: 'python_django',
    packageManager: 'pip',
    commands: [
      {
        id: 'django_project',
        name: 'Django 4.x',
        description: '创建 Django 项目',
        command: 'pip install django && django-admin startproject myproject',
        prerequisites: ['Python 3.9+', 'pip'],
        postInstall: [
          'cd myproject',
          'pip install djangorestframework django-cors-headers',
          'python manage.py startapp api'
        ]
      }
    ],
    additionalTools: ['Django Debug Toolbar', 'Celery', 'Redis']
  },
  {
    techStackId: 'python_fastapi',
    packageManager: 'pip',
    commands: [
      {
        id: 'fastapi_project',
        name: 'FastAPI + SQLAlchemy',
        description: '创建 FastAPI 项目',
        command: 'mkdir my-fastapi-app && cd my-fastapi-app',
        prerequisites: ['Python 3.9+', 'pip'],
        postInstall: [
          'pip install fastapi uvicorn sqlalchemy alembic pydantic',
          'pip install python-multipart python-jose[cryptography]'
        ]
      }
    ]
  },
  {
    techStackId: 'java_spring',
    packageManager: 'maven',
    commands: [
      {
        id: 'spring_boot',
        name: 'Spring Boot 3.x',
        description: '创建 Spring Boot 项目',
        command: 'curl https://start.spring.io/starter.zip -d dependencies=web,data-jpa,security,validation -d type=maven-project -d javaVersion=17 -o my-spring-app.zip && unzip my-spring-app.zip',
        prerequisites: ['Java 17+', 'Maven 3.6+']
      }
    ],
    additionalTools: ['Spring Boot DevTools', 'Actuator', 'Swagger']
  },
  {
    techStackId: 'go_gin',
    packageManager: 'go',
    commands: [
      {
        id: 'gin_project',
        name: 'Gin + GORM',
        description: '创建 Go Gin 项目',
        command: 'mkdir my-gin-app && cd my-gin-app && go mod init my-gin-app',
        prerequisites: ['Go 1.21+'],
        postInstall: [
          'go get github.com/gin-gonic/gin',
          'go get gorm.io/gorm gorm.io/driver/mysql',
          'go get github.com/golang-jwt/jwt/v5'
        ]
      }
    ]
  }
];

// 移动端脚手架配置
export const mobileScaffolds: ScaffoldConfig[] = [
  {
    techStackId: 'react_native',
    packageManager: 'npm',
    nodeVersion: '18+',
    commands: [
      {
        id: 'react_native_cli',
        name: 'React Native CLI',
        description: '创建原生 React Native 项目',
        command: 'npx react-native@latest init MyReactNativeApp',
        prerequisites: ['Android Studio', 'Xcode (macOS)', 'Java 17+']
      },
      {
        id: 'expo_cli',
        name: 'Expo CLI',
        description: '创建 Expo 管理的项目',
        command: 'npx create-expo-app@latest MyExpoApp --template',
        postInstall: [
          'cd MyExpoApp',
          'npx expo install expo-router expo-constants'
        ]
      }
    ]
  },
  {
    techStackId: 'flutter',
    packageManager: 'flutter',
    commands: [
      {
        id: 'flutter_create',
        name: 'Flutter App',
        description: '创建 Flutter 项目',
        command: 'flutter create my_flutter_app',
        prerequisites: ['Flutter SDK', 'Dart SDK', 'Android Studio']
      }
    ]
  }
];

// 桌面端脚手架配置
export const desktopScaffolds: ScaffoldConfig[] = [
  {
    techStackId: 'electron',
    packageManager: 'npm',
    nodeVersion: '18+',
    commands: [
      {
        id: 'electron_forge',
        name: 'Electron Forge',
        description: '创建 Electron 桌面应用',
        command: 'npm create electron-app@latest my-electron-app -- --template=typescript',
        postInstall: [
          'cd my-electron-app',
          'npm install'
        ]
      }
    ]
  },
  {
    techStackId: 'tauri',
    packageManager: 'npm',
    commands: [
      {
        id: 'tauri_create',
        name: 'Tauri + React',
        description: '创建 Tauri 桌面应用',
        command: 'npm create tauri-app@latest my-tauri-app',
        prerequisites: ['Rust', 'Node.js 18+']
      }
    ]
  }
];

// 获取技术栈对应的脚手架配置
export function getScaffoldConfig(techStackId: string): ScaffoldConfig | undefined {
  const allScaffolds = [
    ...frontendScaffolds,
    ...backendScaffolds,
    ...mobileScaffolds,
    ...desktopScaffolds
  ];
  
  return allScaffolds.find(scaffold => scaffold.techStackId === techStackId);
}

// 生成脚手架命令说明
export function generateScaffoldInstructions(techStackIds: string[]): string {
  const instructions: string[] = [];
  
  techStackIds.forEach(techStackId => {
    const config = getScaffoldConfig(techStackId);
    if (config) {
      instructions.push(`\n## ${techStackId} 项目初始化\n`);
      
      config.commands.forEach(cmd => {
        instructions.push(`### ${cmd.name}\n`);
        instructions.push(`${cmd.description}\n`);
        
        if (cmd.prerequisites) {
          instructions.push(`**前置要求:**\n`);
          cmd.prerequisites.forEach(req => {
            instructions.push(`- ${req}\n`);
          });
        }
        
        instructions.push(`**创建命令:**\n\`\`\`bash\n${cmd.command}\n\`\`\`\n`);
        
        if (cmd.postInstall) {
          instructions.push(`**后续安装:**\n\`\`\`bash\n${cmd.postInstall.join('\n')}\n\`\`\`\n`);
        }
        
        if (cmd.notes) {
          instructions.push(`**注意事项:** ${cmd.notes}\n`);
        }
      });
      
      if (config.additionalTools) {
        instructions.push(`**推荐工具:** ${config.additionalTools.join(', ')}\n`);
      }
    }
  });
  
  return instructions.join('');
}