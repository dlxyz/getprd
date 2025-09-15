'use client'

import React from 'react'
import { BusinessCapability, BusinessType } from '@/types/business'
import { businessCapabilities } from '@/lib/data/business-config'

interface BusinessTypeSelectorProps {
  selectedType: BusinessType | null
  onTypeSelect: (type: BusinessType) => void
  className?: string
}

export default function BusinessTypeSelector({
  selectedType,
  onTypeSelect,
  className = ''
}: BusinessTypeSelectorProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          你的业务内容：
        </h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {businessCapabilities.map((capability) => (
          <div
            key={capability.id}
            onClick={() => onTypeSelect(capability.type)}
            className={`
              relative p-6 rounded-lg border-2 cursor-pointer transition-all duration-200
              hover:shadow-lg hover:scale-105
              ${
                selectedType === capability.type
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-md'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }
            `}
          >
            {/* 选中状态指示器 */}
            {selectedType === capability.type && (
              <div className="absolute bottom-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-lg z-20">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
            
            {/* 占比标识 - 右上角徽章风格 */}
            <div className="absolute top-2 right-2 z-10">
              {capability.type === 'web_app' && (
                <div className="relative">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 rounded-full shadow-lg">
                    <div className="flex items-center space-x-1">
                      <span className="text-xs font-bold">80%</span>
                      <div className="w-1.5 h-1.5 bg-white rounded-full opacity-80"></div>
                    </div>
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                </div>
              )}
              {capability.type === 'quantitative_trading' && (
                <div className="relative">
                  <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded-full shadow-lg">
                    <div className="flex items-center space-x-1">
                      <span className="text-xs font-bold">10%</span>
                      <div className="w-1.5 h-1.5 bg-white rounded-full opacity-80"></div>
                    </div>
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                </div>
              )}
              {capability.type === 'web3_blockchain' && (
                <div className="relative">
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-3 py-1 rounded-full shadow-lg">
                    <div className="flex items-center space-x-1">
                      <span className="text-xs font-bold">10%</span>
                      <div className="w-1.5 h-1.5 bg-white rounded-full opacity-80"></div>
                    </div>
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                </div>
              )}
            </div>
            
            {/* 图标 */}
            <div className="text-3xl mb-3 mt-2">{capability.icon}</div>
            
            {/* 标题 */}
            <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              {capability.name}
            </h4>
            
            {/* 描述 */}
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {capability.description}
            </p>
            
            {/* 客户端数量提示 */}
            <div className="mt-4 text-xs text-gray-500 dark:text-gray-500">
              {capability.clients.length} 种客户端选项
            </div>
          </div>
        ))}
      </div>
      
      {/* 提示信息 */}
      {!selectedType && (
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-4">
          请选择一个业务类型以继续配置
        </p>
      )}
    </div>
  )
}