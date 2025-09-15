'use client'

import React, { useState, useMemo } from 'react'
import { UserSelection } from '@/types/business'

interface UserInputFormProps {
  selection: UserSelection
  onSelectionChange: (selection: UserSelection) => void
  className?: string
}

export default function UserInputForm({
  selection,
  onSelectionChange,
  className = ''
}: UserInputFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({})

  // 验证表单
  // 使用useMemo缓存验证结果，避免每次渲染都重新计算
  const isFormValid = useMemo(() => {
    return selection.targetUsers.trim().length >= 10 && 
           selection.coreFeatures.trim().length >= 20
  }, [selection.targetUsers, selection.coreFeatures])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!selection.targetUsers.trim()) {
      newErrors.targetUsers = '请填写目标用户群体'
    }
    
    if (!selection.coreFeatures.trim()) {
      newErrors.coreFeatures = '请描述核心功能MVP'
    }
    
    if (selection.targetUsers.trim().length < 10) {
      newErrors.targetUsers = '目标用户描述至少需要10个字符'
    }
    
    if (selection.coreFeatures.trim().length < 20) {
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
    <div className={`space-y-6 ${className}`}>
      {/* 表单标题 */}
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
          请填写什么人群使用：
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          提示：年龄/性别/身份等详细信息有助于生成更精准的PRD文档
        </p>
      </div>

      {/* 目标用户群体输入 */}
      <div className="space-y-2">
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
      <div className="space-y-2">
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



      {/* 表单验证状态 */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${
            isFormValid ? 'bg-green-500' : 'bg-yellow-500'
          }`} />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {isFormValid ? '表单填写完整，可以生成PRD文档' : '请完善必填信息'}
          </span>
        </div>
      </div>
    </div>
  )
}