'use client'

import React, { useState } from 'react'
import { UserSelection, PRDDocument, BusinessType } from '@/types/business'
import BusinessCapabilitySelector from '@/components/business/BusinessCapabilitySelector'
import PRDPreview from '@/components/generator/PRDPreview'

export default function GeneratorPage() {
  // 用户选择状态
  const [selection, setSelection] = useState<UserSelection>({
    businessType: null,
    firstClient: '',
    secondClient: '',
    thirdClient: '',
    fourthClient: '',
    userProfile: '',
    coreFeatures: '',
    targetUsers: '',
    additionalRequirements: ''
  })

  // PRD文档状态
  const [prdDocument, setPrdDocument] = useState<PRDDocument | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationStatus, setGenerationStatus] = useState<string>('')
  const [generationProgress, setGenerationProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)

  // 当前步骤
  const [currentStep, setCurrentStep] = useState(1)

  // 验证是否可以进入下一步
  const canGeneratePRD = selection.businessType && selection.firstClient && selection.targetUsers.trim() && selection.coreFeatures.trim()

  // 生成PRD文档
  const handleGeneratePRD = async () => {
    if (!canGeneratePRD) {
      setError('请完善所有必填信息')
      return
    }

    setIsGenerating(true)
    setError(null)
    
    // 立即跳转到预览页面
    setCurrentStep(2)
    
    // 创建一个初始的空PRD文档用于显示
    const initialDocument: PRDDocument = {
      id: `prd_${Date.now()}`,
      title: `${selection.businessType === 'web_app' ? 'Web应用' : selection.businessType === 'quantitative_trading' ? '量化交易系统' : 'Web3项目'} PRD文档`,
      content: '',
      config: {
        selection,
        template: '',
        generatedAt: new Date(),
        version: '1.0.0'
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 'draft'
    }
    setPrdDocument(initialDocument)

    try {
      const response = await fetch('/api/generate-prd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ selection })
      })

      if (!response.ok) {
        throw new Error('PRD生成请求失败')
      }

      // 处理流式响应
      const reader = response.body?.getReader()
      if (!reader) {
        throw new Error('无法读取响应流')
      }

      const decoder = new TextDecoder()
      let buffer = ''

      try {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          buffer += decoder.decode(value, { stream: true })
          const lines = buffer.split('\n')
          buffer = lines.pop() || '' // 保留不完整的行

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6)
              if (data === '[DONE]') continue
              
              try {
                const parsed = JSON.parse(data)
                
                if (parsed.type === 'start') {
                   setGenerationStatus(parsed.message)
                   setGenerationProgress(parsed.progress || 10)
                   console.log('开始生成:', parsed.message)
                } else if (parsed.type === 'progress') {
                   setGenerationStatus(parsed.message || '正在生成中...')
                   setGenerationProgress(parsed.progress || 50)
                } else if (parsed.type === 'content') {
                   // 流式更新内容
                   setPrdDocument(prev => prev ? {
                     ...prev,
                     content: parsed.data || '',
                     updatedAt: new Date()
                   } : null)
                } else if (parsed.type === 'complete') {
                   setGenerationStatus('生成完成')
                   setGenerationProgress(100)
                   // 更新最终文档状态
                   setPrdDocument(prev => prev ? {
                     ...prev,
                     content: parsed.data.content || prev.content,
                     status: 'generated',
                     config: {
                       ...prev.config,
                       generatedAt: new Date(parsed.data.generatedAt || Date.now())
                     },
                     updatedAt: new Date(parsed.data.generatedAt || Date.now())
                   } : null)
                   setGenerationStatus('')
                } else if (parsed.type === 'error') {
                  throw new Error(parsed.details || parsed.error || 'PRD生成失败')
                }
              } catch (e) {
                console.warn('解析流数据失败:', e)
              }
            }
          }
        }
      } finally {
        reader.releaseLock()
      }
    } catch (error) {
      console.error('PRD生成失败:', error)
      setError(error instanceof Error ? error.message : '生成失败，请重试')
    } finally {
      setIsGenerating(false)
      setGenerationStatus('')
      setGenerationProgress(0)
    }
  }

  // 处理导出
  const handleExport = (format: 'markdown' | 'pdf' | 'word') => {
    if (!prdDocument) return

    const filename = `${prdDocument.title}_${new Date().toISOString().split('T')[0]}`
    
    if (format === 'markdown') {
      const blob = new Blob([prdDocument.content], { type: 'text/markdown' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${filename}.md`
      a.click()
      URL.revokeObjectURL(url)
    } else if (format === 'pdf') {
      // 直接生成HTML文件并下载
      const pdfContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>${prdDocument.title}</title>
          <meta charset="utf-8">
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 800px;
              margin: 0 auto;
              padding: 20px;
            }
            h1, h2, h3, h4, h5, h6 {
              color: #2c3e50;
              margin-top: 24px;
              margin-bottom: 12px;
            }
            h1 { font-size: 28px; border-bottom: 2px solid #3498db; padding-bottom: 8px; }
            h2 { font-size: 24px; border-bottom: 1px solid #bdc3c7; padding-bottom: 4px; }
            h3 { font-size: 20px; }
            p { margin-bottom: 12px; }
            ul, ol { margin-bottom: 12px; padding-left: 24px; }
            li { margin-bottom: 4px; }
            code {
              background-color: #f8f9fa;
              padding: 2px 4px;
              border-radius: 3px;
              font-family: 'Monaco', 'Consolas', monospace;
            }
            pre {
              background-color: #f8f9fa;
              padding: 12px;
              border-radius: 6px;
              overflow-x: auto;
              border-left: 4px solid #3498db;
            }
            blockquote {
              border-left: 4px solid #3498db;
              margin: 16px 0;
              padding-left: 16px;
              color: #666;
            }
            table {
              border-collapse: collapse;
              width: 100%;
              margin-bottom: 16px;
            }
            th, td {
              border: 1px solid #ddd;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f2f2f2;
              font-weight: bold;
            }
            .document-footer {
              margin-top: 40px;
              padding-top: 20px;
              border-top: 1px solid #ddd;
              color: #666;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #3498db; padding-bottom: 20px;">
            <h1 style="margin: 0; color: #2c3e50;">${prdDocument.title}</h1>
            <p style="margin: 8px 0 0 0; color: #7f8c8d; font-size: 14px;">生成时间: ${new Date(prdDocument.createdAt).toLocaleString('zh-CN')}</p>
          </div>
          <div style="white-space: pre-wrap; font-size: 14px;">${prdDocument.content.replace(/\n/g, '<br>')}</div>
          <div class="document-footer">
            <p><strong>文档结束</strong></p>
            <p>生成时间：${new Date(prdDocument.createdAt).toLocaleString('zh-CN')}</p>
            <p>导出时间：${new Date().toLocaleString('zh-CN')}</p>
            <p>文档版本：v1.0</p>
            <p>生成工具：PRD Generator</p>
          </div>
        </body>
        </html>
      `
      
      const pdfBlob = new Blob([pdfContent], { type: 'text/html' })
      const pdfUrl = URL.createObjectURL(pdfBlob)
      const pdfLink = document.createElement('a')
      pdfLink.href = pdfUrl
      pdfLink.download = `${filename}.html`
      pdfLink.click()
      URL.revokeObjectURL(pdfUrl)
    } else if (format === 'word') {
      // Word导出功能 - 使用HTML格式导出为.doc文件
      const htmlContent = `
        <!DOCTYPE html>
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word'>
        <head>
          <meta charset='utf-8'>
          <title>${prdDocument.title}</title>
          <style>
            body {
              font-family: 'Microsoft YaHei', Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              margin: 40px;
            }
            h1, h2, h3, h4, h5, h6 {
              color: #2c3e50;
              margin-top: 24px;
              margin-bottom: 12px;
            }
            h1 { font-size: 24px; border-bottom: 2px solid #3498db; padding-bottom: 8px; }
            h2 { font-size: 20px; border-bottom: 1px solid #bdc3c7; padding-bottom: 4px; }
            h3 { font-size: 18px; }
            p { margin-bottom: 12px; }
            ul, ol { margin-bottom: 12px; padding-left: 24px; }
            li { margin-bottom: 4px; }
            .document-footer {
              margin-top: 40px;
              padding-top: 20px;
              border-top: 1px solid #ddd;
              color: #666;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #3498db; padding-bottom: 20px;">
            <h1 style="margin: 0; color: #2c3e50;">${prdDocument.title}</h1>
            <p style="margin: 8px 0 0 0; color: #7f8c8d; font-size: 14px;">生成时间: ${new Date(prdDocument.createdAt).toLocaleString('zh-CN')}</p>
          </div>
          <div style="white-space: pre-wrap; font-size: 14px;">${prdDocument.content.replace(/\n/g, '<br>')}</div>
          <div class="document-footer">
            <p><strong>文档结束</strong></p>
            <p>生成时间：${new Date(prdDocument.createdAt).toLocaleString('zh-CN')}</p>
            <p>导出时间：${new Date().toLocaleString('zh-CN')}</p>
            <p>文档版本：v1.0</p>
            <p>生成工具：PRD Generator</p>
          </div>
        </body>
        </html>
      `
      
      const blob = new Blob([htmlContent], { type: 'application/msword' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${filename}.doc`
      a.click()
      URL.revokeObjectURL(url)
    }
  }

  // 重新生成
  const handleEdit = () => {
    setPrdDocument(null)
    setCurrentStep(1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            根据业务需求，一键生成您的产品需求文档
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            选择业务类型 → 填写需求信息 → AI智能生成专业PRD文档
          </p>
        </div>

        {/* 步骤指示器 */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
                  ${
                    currentStep >= step
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                  }
                `}>
                  {step}
                </div>
                {step < 2 && (
                  <div className={`w-16 h-1 mx-2 ${
                    currentStep > step ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-700'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 步骤标题 */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            {currentStep === 1 && '第一步：选择业务类型、客户端并填写需求信息'}
            {currentStep === 2 && '第二步：预览和导出PRD文档'}
          </h2>
        </div>

        {/* 错误提示 */}
        {error && (
          <div className="max-w-4xl mx-auto mb-6">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span className="text-red-700 dark:text-red-400">{error}</span>
              </div>
            </div>
          </div>
        )}

        {/* 主要内容区域 */}
        <div className="max-w-6xl mx-auto">
          {currentStep === 1 && (
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6">
              <BusinessCapabilitySelector
                selection={selection}
                onSelectionChange={setSelection}
              />
              
              {canGeneratePRD && (
                <div className="mt-8 text-center">
                  <div className="space-y-4">
                    <button
                      onClick={handleGeneratePRD}
                      disabled={isGenerating}
                      className="px-8 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
                    >
                      {isGenerating ? '生成中...' : '生成PRD文档'}
                    </button>
                    
                    {/* 生成状态提示 */}
                    {isGenerating && (
                      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                          <div className="flex-1">
                            <p className="text-base font-medium text-blue-800 dark:text-blue-200">
                              正在生成PRD文档
                            </p>
                            {generationStatus && (
                              <p className="text-sm text-blue-600 dark:text-blue-300 mt-1">
                                {generationStatus}
                              </p>
                            )}
                          </div>
                          <div className="text-right">
                            <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                              {generationProgress}%
                            </span>
                          </div>
                        </div>
                        
                        {/* 进度条 */}
                        <div className="relative">
                          <div className="bg-blue-200 dark:bg-blue-800 rounded-full h-3 overflow-hidden">
                            <div 
                              className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500 ease-out"
                              style={{width: `${generationProgress}%`}}
                            ></div>
                          </div>
                          
                          {/* 进度条上的动画效果 */}
                          <div 
                            className="absolute top-0 h-3 w-8 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full animate-pulse"
                            style={{left: `${Math.max(0, generationProgress - 8)}%`}}
                          ></div>
                        </div>
                        
                        {/* 生成步骤提示 */}
                         <div className="mt-4 grid grid-cols-4 gap-2 text-xs">
                           <div className={`text-center p-2 rounded ${generationProgress >= 25 ? 'bg-blue-100 dark:bg-blue-800/50 text-blue-800 dark:text-blue-200' : 'text-gray-500'}`}>
                             <div className={`w-2 h-2 rounded-full mx-auto mb-1 ${generationProgress >= 25 ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                             分析需求
                           </div>
                           <div className={`text-center p-2 rounded ${generationProgress >= 50 ? 'bg-blue-100 dark:bg-blue-800/50 text-blue-800 dark:text-blue-200' : 'text-gray-500'}`}>
                             <div className={`w-2 h-2 rounded-full mx-auto mb-1 ${generationProgress >= 50 ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                             生成内容
                           </div>
                           <div className={`text-center p-2 rounded ${generationProgress >= 75 ? 'bg-blue-100 dark:bg-blue-800/50 text-blue-800 dark:text-blue-200' : 'text-gray-500'}`}>
                             <div className={`w-2 h-2 rounded-full mx-auto mb-1 ${generationProgress >= 75 ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                             优化格式
                           </div>
                           <div className={`text-center p-2 rounded ${generationProgress >= 100 ? 'bg-blue-100 dark:bg-blue-800/50 text-blue-800 dark:text-blue-200' : 'text-gray-500'}`}>
                             <div className={`w-2 h-2 rounded-full mx-auto mb-1 ${generationProgress >= 100 ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                             完成生成
                           </div>
                         </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <PRDPreview
                document={prdDocument}
                isGenerating={isGenerating}
                onExport={handleExport}
                onEdit={handleEdit}
              />
              
              <div className="mt-6 text-center">
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => {
                      if (prdDocument) {
                        // 创建Word格式的导出
                        const element = document.createElement('a')
                        const file = new Blob([prdDocument.content], { type: 'application/msword' })
                        element.href = URL.createObjectURL(file)
                        element.download = `${prdDocument.title || 'PRD文档'}.doc`
                        document.body.appendChild(element)
                        element.click()
                        document.body.removeChild(element)
                      }
                    }}
                    disabled={!prdDocument}
                    className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                  >
                    保存导出PRD文档
                  </button>
                  <button
                    onClick={() => {
                      setCurrentStep(1)
                      setPrdDocument(null)
                      setSelection({
                        businessType: null,
                        firstClient: '',
                        secondClient: '',
                        thirdClient: '',
                        fourthClient: '',
                        userProfile: '',
                        coreFeatures: '',
                        targetUsers: '',
                        additionalRequirements: ''
                      })
                    }}
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    返回生成新PRD文档
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}