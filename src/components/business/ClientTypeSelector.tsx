'use client'

import React from 'react'
import { ClientType, BusinessType, UserSelection } from '@/types/business'
import { getClientsByBusinessType } from '@/lib/data/business-config'

interface ClientTypeSelectorProps {
  businessType: BusinessType
  selection: UserSelection
  onSelectionChange: (selection: UserSelection) => void
  className?: string
}

export default function ClientTypeSelector({
  businessType,
  selection,
  onSelectionChange,
  className = ''
}: ClientTypeSelectorProps) {
  const availableClients = getClientsByBusinessType(businessType)
  
  if (!availableClients.length) {
    return null
  }

  // 处理客户端选择变化
  const handleClientChange = (clientPosition: 'firstClient' | 'secondClient' | 'thirdClient' | 'fourthClient', clientId: string) => {
    const newSelection = {
      ...selection,
      [clientPosition]: clientId
    }
    onSelectionChange(newSelection)
  }

  // 获取已选择的客户端ID列表
  const getSelectedClientIds = () => {
    return [selection.firstClient, selection.secondClient, selection.thirdClient, selection.fourthClient]
      .filter(clientId => clientId && clientId.trim() !== '')
  }

  // 创建下拉选项 - 首选客户端必选，其他可选
  const createSelectOptions = (isRequired: boolean = false, excludeCurrentSelection: string = '') => {
    const selectedIds = getSelectedClientIds()
    
    // 过滤掉已选择的客户端（但不过滤当前选择器的值）
    const filteredClients = availableClients.filter(client => 
      !selectedIds.includes(client.id) || client.id === excludeCurrentSelection
    )
    
    const baseOptions = filteredClients.map(client => ({
      value: client.id,
      label: `${client.name} - ${client.description}`
    }))
    
    if (isRequired) {
      return baseOptions // 必选项不包含空选项
    } else {
      return [
        { value: '', label: '请选择客户端类型（可选）' },
        ...baseOptions
      ]
    }
  }

  const requiredSelectOptions = createSelectOptions(true, selection.firstClient)
  const optionalSelectOptions = createSelectOptions(false)

  // 判断是否为量化交易业务类型
  const isQuantitativeTrading = businessType === BusinessType.QUANTITATIVE_TRADING
  
  // 判断是否为web3区块链业务类型
  const isWeb3Blockchain = businessType === BusinessType.WEB3_BLOCKCHAIN

  return (
    <div className={`space-y-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
        请选择应用终端或客户端呈现方式
      </h3>
      
      {/* 客户端选择器 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 量化交易业务类型显示固定选择，其他业务类型显示下拉选择器 */}
        {isQuantitativeTrading ? (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              客户端类型
            </label>
            <div className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
              {availableClients.find(c => c.id === selection.firstClient)?.name || 'web网页与h5或桌面'} - {availableClients.find(c => c.id === selection.firstClient)?.description || 'PC网页、移动H5、桌面应用等'}
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              首选客户端 <span className="text-red-500">*</span>
            </label>
            <select
              value={selection.firstClient}
              onChange={(e) => handleClientChange('firstClient', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              required
            >
              {!selection.firstClient && (
                <option value="" disabled>
                  请选择客户端类型（必选）
                </option>
              )}
              {requiredSelectOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* web3区块链业务类型显示次选客户端，其他非量化交易业务类型显示所有客户端选择器 */}
        {isWeb3Blockchain ? (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              次选客户端
            </label>
            <select
              value={selection.secondClient}
              onChange={(e) => handleClientChange('secondClient', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            >
              {createSelectOptions(false, selection.secondClient).map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        ) : (
          !isQuantitativeTrading && (
            <>
              {/* 第二客户端 - 可选 */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  第二客户端
                </label>
                <select
                  value={selection.secondClient}
                  onChange={(e) => handleClientChange('secondClient', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  {createSelectOptions(false, selection.secondClient).map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* 第三客户端 - 可选 */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  第三客户端
                </label>
                <select
                  value={selection.thirdClient}
                  onChange={(e) => handleClientChange('thirdClient', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  {createSelectOptions(false, selection.thirdClient).map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* 第四客户端 - 可选 */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  第四客户端
                </label>
                <select
                  value={selection.fourthClient}
                  onChange={(e) => handleClientChange('fourthClient', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  {createSelectOptions(false, selection.fourthClient).map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )
        )}
      </div>
      
      {/* 选择状态提示 */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          当前选择的客户端：
        </h4>
        <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
          {selection.firstClient && (
            <p>• 首选客户端: {availableClients.find(c => c.id === selection.firstClient)?.name}</p>
          )}
          {(isWeb3Blockchain || !isQuantitativeTrading) && selection.secondClient && (
            <p>• {isWeb3Blockchain ? '次选客户端' : '第二客户端'}: {availableClients.find(c => c.id === selection.secondClient)?.name}</p>
          )}
          {!isQuantitativeTrading && !isWeb3Blockchain && selection.thirdClient && (
            <p>• 第三客户端: {availableClients.find(c => c.id === selection.thirdClient)?.name}</p>
          )}
          {!isQuantitativeTrading && !isWeb3Blockchain && selection.fourthClient && (
            <p>• 第四客户端: {availableClients.find(c => c.id === selection.fourthClient)?.name}</p>
          )}
          {!selection.firstClient && (!isQuantitativeTrading ? (!selection.secondClient && !selection.thirdClient && !selection.fourthClient) : true) && (
            <p className="text-gray-500">暂未选择任何客户端</p>
          )}
        </div>
      </div>
    </div>
  )
}