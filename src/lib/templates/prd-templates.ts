import { BusinessType } from '@/types/business'
import { generateTechStackDescription } from '@/lib/data/tech-stack-config'

// PRD模板接口
export interface PRDTemplate {
  id: string
  name: string
  businessType: BusinessType
  template: string
  variables: string[]
}

// Web应用PRD模板
const webAppTemplate = `
# {{productName}} 产品需求文档

## 1. 产品概述
{{productName}} 是面向 {{targetUsers}} 的 {{businessDescription}}。

**目标用户**: {{targetUsers}}
**核心价值**: {{valueProposition}}

## 2. 功能需求
{{coreFeatures}}

**客户端支持**: {{clientTypes}}

## 3. 技术架构
{{techStackDetails}}

{{scaffoldInstructions}}

{{directoryStructure}}

{{additionalRequirements}}
`

// 量化交易PRD模板
const tradingTemplate = `
# {{productName}} 量化交易系统需求文档

## 1. 系统概述
{{productName}} 是面向 {{targetUsers}} 的量化交易系统，提供 {{businessDescription}} 功能。

**目标用户**: {{targetUsers}}
**核心价值**: 自动化交易执行、策略回测、风险控制

## 2. 功能需求
{{coreFeatures}}

**交易类型**: {{clientTypes}}

## 3. 技术架构
{{techStackDetails}}

{{scaffoldInstructions}}

{{directoryStructure}}

{{additionalRequirements}}
`

// Web3区块链PRD模板
const web3Template = `
# {{productName}} Web3项目需求文档

## 1. 项目概述
{{productName}} 是基于区块链技术的 {{businessDescription}}，面向 {{targetUsers}} 提供去中心化服务。

**目标用户**: {{targetUsers}}
**核心价值**: 去中心化解决方案、资产自主控制

## 2. 功能需求
{{coreFeatures}}

**支持平台**: {{clientTypes}}

## 3. 技术架构
{{techStackDetails}}

{{scaffoldInstructions}}

{{directoryStructure}}

## 4. 代币经济
**代币名称**: {{tokenName}}
**总供应量**: {{totalSupply}}
**分发机制**: {{distributionMechanism}}

{{additionalRequirements}}
`

// 导出所有模板
export const prdTemplates: PRDTemplate[] = [
  {
    id: 'web_app_template',
    name: 'Web应用PRD模板',
    businessType: BusinessType.WEB_APP,
    template: webAppTemplate,
    variables: [
      'productName', 'targetUsers', 'businessDescription', 'problemStatement',
      'userProfile', 'usageScenarios', 'valueProposition', 'painPoints',
      'userValue', 'coreFeatures', 'p0Features', 'p1Features', 'p2Features',
      'clientTypes', 'techStackDetails', 'scaffoldInstructions', 'directoryStructure',
      'concurrentUsers', 'additionalRequirements'
    ]
  },
  {
    id: 'trading_template',
    name: '量化交易系统PRD模板',
    businessType: BusinessType.QUANTITATIVE_TRADING,
    template: tradingTemplate,
    variables: [
      'productName', 'targetUsers', 'businessDescription', 'userProfile',
      'coreFeatures', 'clientTypes', 'techStackDetails', 'scaffoldInstructions',
      'directoryStructure', 'additionalRequirements'
    ]
  },
  {
    id: 'web3_template',
    name: 'Web3项目PRD模板',
    businessType: BusinessType.WEB3_BLOCKCHAIN,
    template: web3Template,
    variables: [
      'productName', 'targetUsers', 'businessDescription', 'userProfile',
      'coreFeatures', 'clientTypes', 'techStackDetails', 'scaffoldInstructions',
      'directoryStructure', 'tokenName', 'totalSupply', 'distributionMechanism',
      'additionalRequirements'
    ]
  }
]

// 根据业务类型获取模板
export function getTemplateByBusinessType(businessType: BusinessType): PRDTemplate | undefined {
  return prdTemplates.find(template => template.businessType === businessType)
}