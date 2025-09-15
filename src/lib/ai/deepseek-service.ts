import { UserSelection } from '@/types/business'
import { getTemplateByBusinessType } from '@/lib/templates/prd-templates'
import { getClientsByBusinessType, getClientById } from '@/lib/data/business-config'
import { generateTechStackDescription } from '@/lib/data/tech-stack-config'
import { generateScaffoldInstructions } from '@/lib/data/scaffold-config'
import { generateDirectoryStructureDoc } from '@/lib/data/directory-structure'

// DeepSeek API配置
interface DeepSeekConfig {
  apiKey: string
  baseURL: string
  model: string
}

// API响应接口
interface DeepSeekResponse {
  choices: {
    message: {
      content: string
    }
  }[]
}

// PRD生成服务类
export class DeepSeekService {
  private config: DeepSeekConfig

  constructor() {
    this.config = {
      apiKey: process.env.DEEPSEEK_API_KEY || '',
      baseURL: process.env.DEEPSEEK_API_URL || 'https://api.deepseek.com/v1',
      model: 'deepseek-chat'
    }
  }

  // 验证API配置
  private validateConfig(): void {
    if (!this.config.apiKey) {
      throw new Error('DeepSeek API Key未配置，请检查环境变量DEEPSEEK_API_KEY')
    }
  }

  // 构建PRD生成提示词
  private buildPrompt(selection: UserSelection): string {
    if (!selection.businessType) {
      throw new Error('业务类型未选择')
    }

    const template = getTemplateByBusinessType(selection.businessType)
    if (!template) {
      throw new Error('未找到对应的PRD模板')
    }

    // 获取选中的客户端类型信息
    const clientFields = [selection.firstClient, selection.secondClient, selection.thirdClient, selection.fourthClient]
    const selectedClientIds = clientFields.filter(clientId => clientId && clientId.trim() !== '')
    const selectedClients = selectedClientIds
      .map(clientId => getClientById(clientId))
      .filter(client => client !== undefined)
      .map((client, index) => `- 第${index + 1}客户端 ${client!.name}: ${client!.description}`)
      .join('\n')
    
    // 生成技术栈描述
    const techStackDetails = generateTechStackDescription(selectedClientIds)
    
    // 生成脚手架说明
    const scaffoldInstructions = generateScaffoldInstructions(selectedClientIds)
    
    // 生成目录结构文档
    const directoryStructure = generateDirectoryStructureDoc(selectedClientIds)

    // 构建业务类型描述
    const businessTypeMap = {
      'web_app': 'Web应用与工具',
      'quantitative_trading': '量化交易或爬虫系统',
      'web3_blockchain': 'Web3区块链项目'
    }

    const businessDescription = businessTypeMap[selection.businessType] || '未知业务类型'

    const prompt = `
你是一位资深的产品经理，请根据以下用户需求信息，生成一份详细的产品需求文档(PRD)。

## 用户需求信息：
- **业务类型**: ${businessDescription}
- **目标用户**: ${selection.targetUsers}
- **核心功能**: ${selection.coreFeatures}
- **用户画像**: ${selection.userProfile || '待补充'}
- **客户端类型**: 
${selectedClients}
- **额外需求**: ${selection.additionalRequirements || '无'}

## 生成要求：
1. 请使用专业的产品经理语言和思维
2. 内容要详细、具体、可执行
3. 结构清晰，逻辑严谨
4. 包含技术实现建议
5. 考虑用户体验和商业价值
6. 根据业务类型特点进行针对性设计
7. 文档结构控制在7个章节以内，避免冗余内容
8. 文档末尾只需包含文件版本信息和生成时间

## 技术栈信息：
${techStackDetails}

## 项目初始化指南：
${scaffoldInstructions}

## 项目结构规范：
${directoryStructure}

## PRD模板参考：
${template.template}

请基于以上信息和模板，生成一份完整的产品需求文档。注意要结合具体的用户需求和技术栈信息，不要只是填充模板，而是要有针对性的分析和设计。在技术架构部分，请详细说明所选择的技术栈如何支撑业务需求。

## 文档结构要求：
请严格按照以下结构生成PRD文档，不要添加额外章节：
1. 产品概述
2. 功能需求 
3. 技术架构
4. 项目初始化
5. 项目结构
6. 用户体验设计
7. 实施计划

文档末尾请添加：
---
**文档版本**: v1.0  
**生成时间**: ${new Date().toLocaleString('zh-CN')}
`

    return prompt
  }

  // 生成PRD文档（流式版本）
  async generatePRDStream(selection: UserSelection, onContent?: (content: string) => void): Promise<string> {
    this.validateConfig()

    const prompt = this.buildPrompt(selection)

    try {
      const response = await fetch(`${this.config.baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`
        },
        body: JSON.stringify({
          model: this.config.model,
          messages: [
            {
              role: 'system',
              content: '你是一位经验丰富的产品经理，擅长编写详细、专业的产品需求文档(PRD)。请保持内容简洁而专业。'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 4000,
          temperature: 0.05,
          stream: true
        })
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(`DeepSeek API请求失败: ${response.status} ${response.statusText}. ${JSON.stringify(errorData)}`)
      }

      // 处理流式响应
      if (!response.body) {
        throw new Error('响应体为空')
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let content = ''

      try {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value, { stream: true })
          const lines = chunk.split('\n')

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6)
              if (data === '[DONE]') continue
              
              try {
                const parsed = JSON.parse(data)
                if (parsed.choices && parsed.choices[0] && parsed.choices[0].delta && parsed.choices[0].delta.content) {
                  content += parsed.choices[0].delta.content
                  // 实时回调内容更新
                  if (onContent) {
                    onContent(content)
                  }
                }
              } catch (e) {
                // 忽略解析错误的数据块
              }
            }
          }
        }
      } finally {
        reader.releaseLock()
      }

      if (!content) {
        throw new Error('未收到有效的响应内容')
      }

      return content
    } catch (error) {
      console.error('DeepSeek API调用失败:', error)
      
      if (error instanceof Error) {
        throw new Error(`PRD生成失败: ${error.message}`)
      }
      
      throw new Error('PRD生成失败: 未知错误')
    }
  }

  // 调用DeepSeek API生成PRD（原版本保持兼容）
  async generatePRD(selection: UserSelection): Promise<string> {
    return this.generatePRDStream(selection)
  }

  // 验证用户选择是否完整
  validateSelection(selection: UserSelection): { isValid: boolean; errors: string[] } {
    const errors: string[] = []

    if (!selection.businessType) {
      errors.push('请选择业务类型')
    }

    // 检查是否至少选择了一个客户端
    const hasSelectedClient = selection.firstClient || 
                             selection.secondClient || 
                             selection.thirdClient || 
                             selection.fourthClient
    
    if (!hasSelectedClient) {
      errors.push('请至少选择一个客户端类型')
    }

    if (!selection.targetUsers || selection.targetUsers.trim().length < 10) {
      errors.push('请填写目标用户群体(至少10个字符)')
    }

    if (!selection.coreFeatures || selection.coreFeatures.trim().length < 20) {
      errors.push('请详细描述核心功能(至少20个字符)')
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  }

  // 获取生成预估时间
  getEstimatedGenerationTime(): number {
    // 预估生成时间(秒)
    return 30
  }
}

// 导出单例实例
export const deepSeekService = new DeepSeekService()