// 业务类型枚举
export enum BusinessType {
  WEB_APP = 'web_app',
  QUANTITATIVE_TRADING = 'quantitative_trading', 
  WEB3_BLOCKCHAIN = 'web3_blockchain'
}

// 客户端类型
export interface ClientType {
  id: string
  name: string
  description: string
  icon?: string
}

// 业务能力配置
export interface BusinessCapability {
  id: string
  name: string
  description: string
  type: BusinessType
  clients: ClientType[]
  icon?: string
  color?: string
}

// 用户选择的配置
export interface UserSelection {
  businessType: BusinessType | null
  firstClient: string
  secondClient: string
  thirdClient: string
  fourthClient: string
  userProfile: string
  coreFeatures: string
  targetUsers: string
  additionalRequirements?: string
}

// PRD生成配置
export interface PRDConfig {
  selection: UserSelection
  template: string
  generatedAt: Date
  version: string
}

// PRD文档结构
export interface PRDDocument {
  id: string
  title: string
  content: string
  config: PRDConfig
  createdAt: Date
  updatedAt: Date
  status: 'draft' | 'generated' | 'exported'
}