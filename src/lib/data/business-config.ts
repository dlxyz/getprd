import { BusinessCapability, BusinessType, ClientType } from '@/types/business'

// 通用客户端类型 - 四大类
const universalClients: ClientType[] = [
  {
    id: 'web_h5_desktop',
    name: 'web网页与h5或桌面',
    description: 'PC网页、移动H5、桌面应用等'
  },
  {
    id: 'mini_program',
    name: '国内小程序',
    description: '微信小程序、支付宝小程序、百度小程序等'
  },
  {
    id: 'browser_plugin',
    name: '浏览器插件',
    description: 'Chrome插件、Firefox扩展、Edge插件等'
  },
  {
    id: 'mobile_app',
    name: '各种手机app',
    description: 'Android APP、iOS APP、鸿蒙APP等'
  }
]

// 量化交易专用客户端类型 - 只有一种（web网页与h5或桌面）
const tradingClients: ClientType[] = [
  {
    id: 'web_h5_desktop',
    name: 'web网页与h5或桌面',
    description: 'PC网页、移动H5、桌面应用等'
  }
]

// web3区块链专用客户端类型 - 两种（web网页与h5或桌面、dapp应用）
const web3Clients: ClientType[] = [
  {
    id: 'web_h5_desktop',
    name: 'web网页与h5或桌面',
    description: 'PC网页、移动H5、桌面应用等'
  },
  {
    id: 'dapp_application',
    name: 'dapp应用',
    description: '去中心化应用、智能合约交互、Web3钱包集成等'
  }
]

// 业务能力配置数据
export const businessCapabilities: BusinessCapability[] = [
  {
    id: 'web_app_tools',
    name: 'web应用与工具',
    description: '传统互联网应用、工具软件、企业系统等',
    type: BusinessType.WEB_APP,
    clients: universalClients,
    icon: '🌐',
    color: 'bg-blue-500'
  },
  {
    id: 'quantitative_trading_crawler',
    name: '量化交易或爬虫',
    description: '金融量化交易系统、数据爬虫、自动化工具等',
    type: BusinessType.QUANTITATIVE_TRADING,
    clients: tradingClients,
    icon: '📈',
    color: 'bg-green-500'
  },
  {
    id: 'web3_blockchain_project',
    name: 'web3区块链项目',
    description: 'DApp、DeFi、NFT、智能合约等区块链应用',
    type: BusinessType.WEB3_BLOCKCHAIN,
    clients: web3Clients,
    icon: '⛓️',
    color: 'bg-purple-500'
  }
]

// 根据业务类型获取客户端选项
export function getClientsByBusinessType(businessType: BusinessType): ClientType[] {
  const capability = businessCapabilities.find(cap => cap.type === businessType)
  return capability?.clients || []
}

// 根据ID获取业务能力配置
export function getBusinessCapabilityById(id: string): BusinessCapability | undefined {
  return businessCapabilities.find(cap => cap.id === id)
}

// 根据客户端ID获取客户端信息
export function getClientById(clientId: string): ClientType | undefined {
  for (const capability of businessCapabilities) {
    const client = capability.clients.find(c => c.id === clientId)
    if (client) return client
  }
  return undefined
}