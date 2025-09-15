// 技术栈配置 - 根据技术栈选型对照图

// 技术栈接口定义
export interface TechStack {
  id: string
  name: string
  category: string
  description: string
}

export interface ClientTechStack {
  clientId: string
  clientName: string
  frontendFrameworks: TechStack[]
  backendFrameworks: TechStack[]
  databases: TechStack[]
  deployment: TechStack[]
  additionalTools: TechStack[]
}

// 前端技术栈
const frontendTechs: TechStack[] = [
  // Web版
  { id: 'react', name: 'React+Next.js', category: 'frontend', description: 'React 18 + Next.js 14 + TypeScript，现代化Web开发框架' },
  { id: 'vue', name: 'Vue.js+Vite', category: 'frontend', description: 'Vue.js 3 + Vite + TypeScript，渐进式前端框架' },
  { id: 'html_css_js', name: 'HTML+CSS+JavaScript', category: 'frontend', description: 'HTML5 + CSS3 + ES6+ JavaScript，原生Web技术' },
  
  // 手机H5
  { id: 'vue_uniapp', name: 'Vue.js+UniApp', category: 'frontend', description: 'Vue.js 3 + UniApp，跨端开发框架' },
  
  // 浏览器插件
  { id: 'browser_extension', name: '浏览器插件开发', category: 'frontend', description: 'Chrome Extension API + Manifest V3，浏览器扩展开发' },
  
  // 小程序
  { id: 'wechat_miniprogram', name: '小程序', category: 'frontend', description: '微信小程序原生开发框架' },
  
  // 安卓APP
  { id: 'flutter', name: 'Flutter跨平台SDK库', category: 'frontend', description: 'Flutter + Dart，跨平台移动应用开发' },
  
  // 苹果iOS
  { id: 'swift', name: 'Swift', category: 'frontend', description: 'Swift + iOS SDK，苹果原生开发' },
  
  // 鸿蒙OS
  { id: 'arkts', name: 'ArkTS', category: 'frontend', description: 'ArkTS + HarmonyOS SDK，鸿蒙原生开发' },
  
  // 桌面PC版
  { id: 'electron', name: 'Electron跨平台打包', category: 'frontend', description: 'Electron + Web技术，跨平台桌面应用' },
  
  // Web3版
  { id: 'ethers_hardhat', name: 'ethers.js+Hardhat', category: 'frontend', description: 'ethers.js + Hardhat + Solidity，Web3 DApp开发' }
]

// 后端技术栈
const backendTechs: TechStack[] = [
  // Node.js
  { id: 'nodejs_express', name: 'node-Express', category: 'backend', description: 'Node.js + Express，JavaScript后端开发' },
  { id: 'nodejs_fastify', name: 'node-Fastify', category: 'backend', description: 'Node.js + Fastify，高性能Web框架' },
  { id: 'nextjs_api', name: 'Next.js', category: 'backend', description: 'Next.js API Routes，全栈React框架' },
  
  // Python
  { id: 'django_flask', name: 'Django', category: 'backend', description: 'Django Web框架，Python企业级开发' },
  { id: 'python_fastapi', name: 'FastAPI', category: 'backend', description: 'FastAPI，现代异步Python框架' },
  { id: 'scrapy_pytorch', name: 'Scrapy', category: 'backend', description: 'Scrapy + PyTorch，数据采集与AI' },
  { id: 'pytorch_tensorflow', name: 'PyTorch+TensorFlow', category: 'backend', description: 'PyTorch/TensorFlow，机器学习框架' },
  
  // Go
  { id: 'gin_echo', name: 'Gin', category: 'backend', description: 'Gin Web框架，Go语言高性能开发' },
  { id: 'go_zero', name: 'Go-Zero', category: 'backend', description: 'Go-Zero微服务框架' },
  { id: 'go_micro', name: 'Go-Micro', category: 'backend', description: 'Go-Micro分布式开发框架' },
  { id: 'go_ethere_cosmos', name: 'Ethere+Cosmos-SDK', category: 'backend', description: 'Go + Ethereum + Cosmos，区块链开发' },
  
  // Java
  { id: 'spring_boot', name: 'Spring Boot', category: 'backend', description: 'Spring Boot，Java企业级开发' },
  { id: 'hadoop_spark', name: 'Hadoop+Spark', category: 'backend', description: 'Hadoop + Spark，大数据处理平台' },
  
  // PHP
  { id: 'laravel_think', name: 'Laravel+ThinkPHP', category: 'backend', description: 'Laravel/ThinkPHP，PHP现代框架' },
  { id: 'lumen_slim', name: 'Lumen+Slim+Swooft', category: 'backend', description: 'Lumen + Slim + Swoole，PHP微服务' }
]

// 数据库技术栈（仅保留三种）
const databaseTechs: TechStack[] = [
  { id: 'mysql', name: 'MySQL', category: 'database', description: 'MySQL关系型数据库' },
  { id: 'postgresql', name: 'PostgreSQL', category: 'database', description: 'PostgreSQL关系型数据库' },
  { id: 'mongodb', name: 'MongoDB', category: 'database', description: 'MongoDB文档型数据库' }
]

// 部署运维技术栈（简化）
const deploymentTechs: TechStack[] = [
  { id: 'docker', name: 'Docker容器化', category: 'deployment', description: 'Docker容器化部署' },
  { id: 'cloud_server', name: '云服务器', category: 'deployment', description: '阿里云/腾讯云/AWS云服务器' }
]

// 客户端技术栈配置
export const clientTechStacks: ClientTechStack[] = [
  {
    clientId: 'web_h5_desktop',
    clientName: 'Web版',
    frontendFrameworks: [
      frontendTechs.find(t => t.id === 'react')!,
      frontendTechs.find(t => t.id === 'vue')!,
      frontendTechs.find(t => t.id === 'html_css_js')!,
      frontendTechs.find(t => t.id === 'vue_uniapp')!,
      frontendTechs.find(t => t.id === 'electron')!
    ],
    backendFrameworks: [
      backendTechs.find(t => t.id === 'nodejs_express')!,
      backendTechs.find(t => t.id === 'nodejs_fastify')!,
      backendTechs.find(t => t.id === 'nextjs_api')!,
      backendTechs.find(t => t.id === 'django_flask')!,
      backendTechs.find(t => t.id === 'gin_echo')!,
      backendTechs.find(t => t.id === 'spring_boot')!,
      backendTechs.find(t => t.id === 'laravel_think')!
    ],
    databases: [
      databaseTechs.find(t => t.id === 'mysql')!,
      databaseTechs.find(t => t.id === 'postgresql')!,
      databaseTechs.find(t => t.id === 'mongodb')!
    ],
    deployment: [
      deploymentTechs.find(t => t.id === 'docker')!,
      deploymentTechs.find(t => t.id === 'cloud_server')!
    ],
    additionalTools: []
  },
  {
    clientId: 'mini_program',
    clientName: '手机App版',
    frontendFrameworks: [
      frontendTechs.find(t => t.id === 'vue_uniapp')!,
      frontendTechs.find(t => t.id === 'flutter')!,
      frontendTechs.find(t => t.id === 'swift')!,
      frontendTechs.find(t => t.id === 'arkts')!
    ],
    backendFrameworks: [
      backendTechs.find(t => t.id === 'nodejs_express')!,
      backendTechs.find(t => t.id === 'python_fastapi')!,
      backendTechs.find(t => t.id === 'gin_echo')!,
      backendTechs.find(t => t.id === 'spring_boot')!
    ],
    databases: [
      databaseTechs.find(t => t.id === 'mysql')!,
      databaseTechs.find(t => t.id === 'postgresql')!,
      databaseTechs.find(t => t.id === 'mongodb')!
    ],
    deployment: [
      deploymentTechs.find(t => t.id === 'docker')!,
      deploymentTechs.find(t => t.id === 'cloud_server')!
    ],
    additionalTools: []
  },
  {
    clientId: 'browser_plugin',
    clientName: '桌面PC版',
    frontendFrameworks: [
      frontendTechs.find(t => t.id === 'electron')!
    ],
    backendFrameworks: [
      backendTechs.find(t => t.id === 'nodejs_express')!,
      backendTechs.find(t => t.id === 'spring_boot')!,
      backendTechs.find(t => t.id === 'hadoop_spark')!
    ],
    databases: [
      databaseTechs.find(t => t.id === 'mysql')!,
      databaseTechs.find(t => t.id === 'postgresql')!,
      databaseTechs.find(t => t.id === 'mongodb')!
    ],
    deployment: [
      deploymentTechs.find(t => t.id === 'docker')!,
      deploymentTechs.find(t => t.id === 'cloud_server')!
    ],
    additionalTools: []
  },
  {
    clientId: 'mobile_app',
    clientName: 'Web3版',
    frontendFrameworks: [
      frontendTechs.find(t => t.id === 'ethers_hardhat')!,
      frontendTechs.find(t => t.id === 'react')!,
      frontendTechs.find(t => t.id === 'vue')!
    ],
    backendFrameworks: [
      backendTechs.find(t => t.id === 'go_ethere_cosmos')!,
      backendTechs.find(t => t.id === 'lumen_slim')!
    ],
    databases: [
      databaseTechs.find(t => t.id === 'mysql')!,
      databaseTechs.find(t => t.id === 'postgresql')!,
      databaseTechs.find(t => t.id === 'mongodb')!
    ],
    deployment: [
      deploymentTechs.find(t => t.id === 'docker')!,
      deploymentTechs.find(t => t.id === 'cloud_server')!
    ],
    additionalTools: []
  }
]

// 根据客户端ID获取技术栈配置
export function getTechStackByClientId(clientId: string): ClientTechStack | undefined {
  return clientTechStacks.find(stack => stack.clientId === clientId)
}

// 根据多个客户端ID获取合并的技术栈
export function getMergedTechStacks(clientIds: string[]): {
  frontendFrameworks: TechStack[]
  backendFrameworks: TechStack[]
  databases: TechStack[]
  deployment: TechStack[]
  additionalTools: TechStack[]
} {
  const mergedStacks = {
    frontendFrameworks: [] as TechStack[],
    backendFrameworks: [] as TechStack[],
    databases: [] as TechStack[],
    deployment: [] as TechStack[],
    additionalTools: [] as TechStack[]
  }

  clientIds.forEach(clientId => {
    const techStack = getTechStackByClientId(clientId)
    if (techStack) {
      mergedStacks.frontendFrameworks.push(...techStack.frontendFrameworks)
      mergedStacks.backendFrameworks.push(...techStack.backendFrameworks)
      mergedStacks.databases.push(...techStack.databases)
      mergedStacks.deployment.push(...techStack.deployment)
      mergedStacks.additionalTools.push(...techStack.additionalTools)
    }
  })

  // 去重
  mergedStacks.frontendFrameworks = Array.from(new Set(mergedStacks.frontendFrameworks.map(t => t.id))).map(id => 
    mergedStacks.frontendFrameworks.find(t => t.id === id)!
  )
  mergedStacks.backendFrameworks = Array.from(new Set(mergedStacks.backendFrameworks.map(t => t.id))).map(id => 
    mergedStacks.backendFrameworks.find(t => t.id === id)!
  )
  mergedStacks.databases = Array.from(new Set(mergedStacks.databases.map(t => t.id))).map(id => 
    mergedStacks.databases.find(t => t.id === id)!
  )
  mergedStacks.deployment = Array.from(new Set(mergedStacks.deployment.map(t => t.id))).map(id => 
    mergedStacks.deployment.find(t => t.id === id)!
  )
  mergedStacks.additionalTools = Array.from(new Set(mergedStacks.additionalTools.map(t => t.id))).map(id => 
    mergedStacks.additionalTools.find(t => t.id === id)!
  )

  return mergedStacks
}

// 生成技术栈描述文本
export function generateTechStackDescription(clientIds: string[]): string {
  let description = '## 技术架构\n\n'
  
  // 技术架构概述
  description += '### 技术架构概述\n'
  description += '本项目采用现代化的技术架构，确保系统的可扩展性、稳定性和高性能。技术选型遵循业界最佳实践，兼顾开发效率和运维便利性。\n\n'
  
  // 为每个客户端生成单独的技术栈说明
  if (clientIds.length > 1) {
    description += '### 多端技术架构\n'
    description += '本项目支持多端部署，针对不同客户端采用相应的技术栈：\n\n'
    
    clientIds.forEach(clientId => {
      const clientStack = getTechStackByClientId(clientId)
      if (clientStack) {
        description += `#### ${clientStack.clientName}技术栈\n\n`
        
        if (clientStack.frontendFrameworks.length > 0) {
          description += '**前端技术**:\n'
          clientStack.frontendFrameworks.forEach(tech => {
            description += `- **${tech.name}**: ${tech.description}\n`
          })
          description += '\n'
        }
        
        if (clientStack.backendFrameworks.length > 0) {
          description += '**后端技术**:\n'
          clientStack.backendFrameworks.forEach(tech => {
            description += `- **${tech.name}**: ${tech.description}\n`
          })
          description += '\n'
        }
        
        description += '\n'
      }
    })
  } else {
    // 单一客户端的情况，使用原有逻辑
    const mergedStacks = getMergedTechStacks(clientIds)
    
    if (mergedStacks.frontendFrameworks.length > 0) {
      description += '### 前端技术栈\n'
      description += '**框架选择原则**: 优先选择成熟稳定、社区活跃、文档完善的前端框架\n\n'
      mergedStacks.frontendFrameworks.forEach(tech => {
        description += `- **${tech.name}**: ${tech.description}\n`
      })
      description += '\n'
    }
    
    if (mergedStacks.backendFrameworks.length > 0) {
      description += '### 后端技术栈\n'
      description += '**框架选择原则**: 选择高性能、易维护、生态丰富的后端框架\n\n'
      mergedStacks.backendFrameworks.forEach(tech => {
        description += `- **${tech.name}**: ${tech.description}\n`
      })
      description += '\n'
    }
  }
  
  // 共同的数据库和部署技术栈
  const mergedStacks = getMergedTechStacks(clientIds)
  
  if (mergedStacks.databases.length > 0) {
    description += '### 数据库技术栈\n'
    description += '**数据库选择原则**: 根据业务特点选择合适的数据库类型\n\n'
    mergedStacks.databases.forEach(tech => {
      description += `- **${tech.name}**: ${tech.description}\n`
    })
    description += '\n**数据库设计要求**:\n'
    description += '- 合理的数据库设计和索引优化\n'
    description += '- 数据备份和恢复策略\n'
    description += '- 读写分离和负载均衡\n'
    description += '- 数据安全和访问控制\n\n'
  }
  
  if (mergedStacks.deployment.length > 0) {
    description += '### 部署运维\n'
    description += '**部署原则**: 自动化部署，确保环境一致性和可靠性\n\n'
    mergedStacks.deployment.forEach(tech => {
      description += `- **${tech.name}**: ${tech.description}\n`
    })
    description += '\n**运维要求**:\n'
    description += '- 容器化部署，环境隔离\n'
    description += '- 自动化CI/CD流水线\n'
    description += '- 监控告警和日志管理\n'
    description += '- 安全防护和备份策略\n\n'
  }
  
  // 添加技术选型建议
  if (clientIds.length > 1) {
    description += '### 技术选型建议\n'
    description += '- **首选方案**: 根据项目需求和团队技术栈，优先选择团队熟悉的技术\n'
    description += '- **兼容性考虑**: 确保不同端的技术栈能够共享后端API和数据库\n'
    description += '- **维护成本**: 平衡功能需求与长期维护成本\n'
    description += '- **性能要求**: 根据用户量和性能要求选择合适的技术方案\n\n'
  }
  
  return description
}