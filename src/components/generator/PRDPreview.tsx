'use client'

import React, { useState } from 'react'
import { PRDDocument } from '@/types/business'

interface PRDPreviewProps {
  document: PRDDocument | null
  isGenerating: boolean
  onExport?: (format: 'markdown' | 'pdf' | 'word') => void
  onEdit?: () => void
  className?: string
}

export default function PRDPreview({
  document,
  isGenerating,
  onExport,
  onEdit,
  className = ''
}: PRDPreviewProps) {
  const [exportFormat, setExportFormat] = useState<'markdown' | 'pdf' | 'word'>('markdown')
  const [isExporting, setIsExporting] = useState(false)

  // 处理导出
  const handleExport = async () => {
    if (onExport && document && !isExporting) {
      setIsExporting(true)
      try {
        await new Promise(resolve => {
          onExport(exportFormat)
          // 给导出操作一些时间完成
          setTimeout(resolve, exportFormat === 'pdf' ? 1000 : 100)
        })
      } finally {
        setIsExporting(false)
      }
    }
  }

  // 复制到剪贴板
  const handleCopyToClipboard = async () => {
    if (document?.content) {
      try {
        await navigator.clipboard.writeText(document.content)
        // 这里可以添加成功提示
        alert('PRD内容已复制到剪贴板')
      } catch (error) {
        console.error('复制失败:', error)
        alert('复制失败，请手动选择复制')
      }
    }
  }

  // 生成中但没有文档内容时的加载状态
  if (isGenerating && (!document || !document.content)) {
    return (
      <div className={`bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 ${className}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
            正在生成PRD文档...
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            AI正在根据您的需求生成专业的产品需求文档，请稍候
          </p>
          <div className="mt-4 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div className="bg-blue-500 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
          </div>
        </div>
      </div>
    )
  }

  // 无文档状态
  if (!document) {
    return (
      <div className={`bg-gray-50 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 p-8 text-center ${className}`}>
        <div className="text-gray-400 dark:text-gray-500 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
          PRD文档预览
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          完成配置后点击生成按钮，PRD文档将在此处显示
        </p>
      </div>
    )
  }

  return (
    <div className={`bg-white dark:bg-gray-900 rounded-lg shadow-lg ${className}`}>
      {/* 文档头部操作栏 */}
      <div className="border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                {document.title || 'PRD文档'}
              </h3>
              {isGenerating && (
                <div className="flex items-center space-x-1 text-blue-600 dark:text-blue-400">
                  <div className="animate-spin rounded-full h-3 w-3 border border-blue-600 border-t-transparent"></div>
                  <span className="text-xs">实时生成中...</span>
                </div>
              )}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              生成时间: {new Date(document.createdAt).toLocaleString('zh-CN')}
              {isGenerating && <span className="ml-2 text-blue-600 dark:text-blue-400">• 内容实时更新</span>}
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* 导出格式选择 */}
            <select
              value={exportFormat}
              onChange={(e) => setExportFormat(e.target.value as 'markdown' | 'pdf' | 'word')}
              className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            >
              <option value="markdown">Markdown</option>
              <option value="pdf">PDF</option>
              <option value="word">Word</option>
            </select>
            
            {/* 操作按钮 */}
            <button
              onClick={handleCopyToClipboard}
              className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              复制
            </button>
            
            <button
              onClick={handleExport}
              disabled={isExporting}
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center space-x-1"
            >
              {isExporting && (
                <svg className="animate-spin h-3 w-3" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              <span>{isExporting ? '导出中...' : '导出'}</span>
            </button>
            
            <button
              onClick={() => handleExport()}
              disabled={isExporting}
              className="px-3 py-1 text-sm bg-green-500 text-white rounded-md hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center space-x-1"
            >
              {isExporting && (
                <svg className="animate-spin h-3 w-3" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              <span>{isExporting ? '保存中...' : '保存导出文档'}</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* 文档内容 */}
      <div className="p-6 bg-white dark:bg-gray-900">
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            {document.content}
          </pre>
        </div>
      </div>
      
      {/* 文档统计信息 */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-800">
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-4">
            <span>字符数: {document.content.length.toLocaleString()}</span>
            <span>行数: {document.content.split('\n').length}</span>
            <span>状态: {isGenerating ? '生成中' : (document.status === 'generated' ? '已生成' : '草稿')}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            {isGenerating ? (
              <>
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                <span>正在生成...</span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>文档已生成</span>
              </>
            )}
          </div>
        </div>
      </div>

    </div>
  )
}