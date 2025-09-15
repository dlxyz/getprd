'use client'

import React, { useState, useMemo } from 'react'
import { UserSelection } from '@/types/business'
import BusinessTypeSelector from './BusinessTypeSelector'
import ClientTypeSelector from './ClientTypeSelector'

interface BusinessCapabilitySelectorProps {
  selection: UserSelection
  onSelectionChange: (selection: UserSelection) => void
  className?: string
}

export default function BusinessCapabilitySelector({
  selection,
  onSelectionChange,
  className = ''
}: BusinessCapabilitySelectorProps) {
  const [errors, setErrors] = useState<Record<string, string>>({})

  // 验证表单
  const isFormValid = useMemo(() => {
    return selection.businessType && 
           selection.firstClient && 
           selection.targetUsers.trim().length >= 10 && 
           selection.coreFeatures.trim().length >= 20
  }, [selection.businessType, selection.firstClient, selection.targetUsers, selection.coreFeatures])

  // 当业务类型改变时，处理客户端选择
  const handleBusinessTypeSelect = (businessType: BusinessType) => {
    let firstClient = ''
    
    // 如果是量化交易业务类型，自动选择第一个客户端
    if (businessType === 'quantitative_trading') {
      firstClient = 'web_h5_desktop' // 默认选择第一个客户端
    }
    
    // 如果是web3区块链业务类型，自动选择第一个客户端
    if (businessType === 'web3_blockchain') {
      firstClient = 'web_h5_desktop' // 默认选择第一个客户端
    }
    
    const newSelection = {
      ...selection,
      businessType,
      firstClient,
      secondClient: '',
      thirdClient: '',
      fourthClient: ''
    }
    onSelectionChange(newSelection)
  }

  // 验证表单
  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!selection.targetUsers.trim()) {
      newErrors.targetUsers = '请填写目标用户群体'
    } else if (selection.targetUsers.trim().length < 10) {
      newErrors.targetUsers = '目标用户描述至少需要10个字符'
    }
    
    if (!selection.coreFeatures.trim()) {
      newErrors.coreFeatures = '请描述核心功能MVP'
    } else if (selection.coreFeatures.trim().length < 20) {
      newErrors.coreFeatures = '核心功能描述至少需要20个字符'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // 处理输入变化
  const handleInputChange = (field: keyof UserSelection, value: string) => {
    const newSelection = {
      ...selection,
      [field]: value
    }
    onSelectionChange(newSelection)
    
    // 清除对应字段的错误
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  return (
    <div className={`space-y-8 ${className}`}>
      {/* 业务类型选择 */}
      <BusinessTypeSelector
        selectedType={selection.businessType}
        onTypeSelect={handleBusinessTypeSelect}
      />
      
      {/* 客户端类型选择 - 只有选择了业务类型后才显示 */}
      {selection.businessType && (
        <div className="animate-fade-in">
          <ClientTypeSelector
            businessType={selection.businessType}
            selection={selection}
            onSelectionChange={onSelectionChange}
          />
        </div>
      )}
      


      {/* 用户需求信息表单 */}
      {selection.businessType && selection.firstClient && (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 animate-fade-in">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
            填写详细需求信息
          </h4>
          
          {/* 目标用户群体输入 */}
          <div className="space-y-2 mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              目标用户群体 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={selection.targetUsers}
              onChange={(e) => handleInputChange('targetUsers', e.target.value)}
              placeholder="例如：25-35岁的互联网从业者、大学生、企业管理者等"
              className={`
                w-full px-4 py-3 rounded-lg border transition-colors
                focus:outline-none focus:ring-2 focus:ring-blue-500
                dark:bg-gray-800 dark:text-gray-100
                ${
                  errors.targetUsers
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 dark:border-gray-600'
                }
              `}
            />
            {errors.targetUsers && (
              <p className="text-sm text-red-500">{errors.targetUsers}</p>
            )}
          </div>

          {/* 核心功能MVP描述 */}
          <div className="space-y-2 mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              简单描述核心功能MVP <span className="text-red-500">*</span>
            </label>
            <textarea
              value={selection.coreFeatures}
              onChange={(e) => handleInputChange('coreFeatures', e.target.value)}
              placeholder="请详细描述您产品的核心功能和主要特性，包括用户如何使用、解决什么问题等..."
              rows={6}
              className={`
                w-full px-4 py-3 rounded-lg border transition-colors resize-none
                focus:outline-none focus:ring-2 focus:ring-blue-500
                dark:bg-gray-800 dark:text-gray-100
                ${
                  errors.coreFeatures
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 dark:border-gray-600'
                }
              `}
            />
            {errors.coreFeatures && (
              <p className="text-sm text-red-500">{errors.coreFeatures}</p>
            )}
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>详细描述有助于生成更准确的PRD文档</span>
              <span>{selection.coreFeatures.length} 字符</span>
            </div>
          </div>

          {/* 其他补充需求（可选） */}
          <div className="space-y-2 mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              其他补充需求（可选）
            </label>
            <textarea
              value={selection.additionalRequirements}
              onChange={(e) => handleInputChange('additionalRequirements', e.target.value)}
              placeholder="其他特殊需求、技术要求、业务规则等..."
              rows={3}
              className="
                w-full px-4 py-3 rounded-lg border transition-colors resize-none
                focus:outline-none focus:ring-2 focus:ring-blue-500
                dark:bg-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-600
              "
            />
          </div>


        </div>
      )}
    </div>
  )
}