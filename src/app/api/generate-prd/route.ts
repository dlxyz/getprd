import { NextRequest, NextResponse } from 'next/server'
import { deepSeekService } from '@/lib/ai/deepseek-service'
import { UserSelection } from '@/types/business'

// POST请求处理PRD生成
export async function POST(request: NextRequest) {
  try {
    // 确保正确处理UTF-8编码
    const text = await request.text()
    const body = JSON.parse(text)
    const selection: UserSelection = body.selection

    if (!selection) {
      return NextResponse.json(
        { error: '缺少用户选择数据' },
        { status: 400 }
      )
    }

    // 验证用户选择数据
    const validation = deepSeekService.validateSelection(selection)
    if (!validation.isValid) {
      return NextResponse.json(
        { 
          error: '用户选择数据不完整',
          details: validation.errors
        },
        { status: 400 }
      )
    }

    // 创建流式响应
    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      async start(controller) {
        try {
          // 发送开始信号
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'start', message: '开始分析用户需求...', progress: 10 })}\n\n`))
          
          // 快速进度更新
          setTimeout(() => {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'progress', message: '正在构建PRD模板...', progress: 25 })}\n\n`))
          }, 200)
          
          setTimeout(() => {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'progress', message: '正在生成文档内容...', progress: 50 })}\n\n`))
          }, 800)
          
          // 使用流式生成，实时发送内容更新
        const prdContent = await deepSeekService.generatePRDStream(selection, (content) => {
          // 实时发送内容更新
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ 
            type: 'content', 
            data: content
          })}\n\n`))
        })
        
        // 快速完成后续步骤
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'progress', message: '正在优化文档格式...', progress: 75 })}\n\n`))
        
        setTimeout(() => {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'progress', message: '即将完成...', progress: 90 })}\n\n`))
        }, 100)
        
        setTimeout(() => {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ 
            type: 'complete', 
            data: {
              content: prdContent,
              generatedAt: new Date().toISOString(),
              selection: selection
            }
          })}\n\n`))
          
          // 结束流
          controller.enqueue(encoder.encode('data: [DONE]\n\n'))
          controller.close()
        }, 200)
        } catch (error) {
          // 发送错误信息
          const errorMessage = error instanceof Error ? error.message : '未知错误'
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ 
            type: 'error', 
            error: 'PRD生成失败',
            details: errorMessage
          })}\n\n`))
          controller.close()
        }
      }
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })

  } catch (error) {
    console.error('PRD生成API错误:', error)
    
    // 返回错误信息
    const errorMessage = error instanceof Error ? error.message : '未知错误'
    
    return NextResponse.json(
      { 
        error: 'PRD生成失败',
        details: errorMessage
      },
      { status: 500 }
    )
  }
}

// GET请求返回API信息
export async function GET() {
  return NextResponse.json({
    name: 'PRD生成API',
    version: '1.0.0',
    description: '基于DeepSeek AI的产品需求文档生成服务',
    endpoints: {
      'POST /api/generate-prd': '生成PRD文档',
    },
    estimatedTime: `${deepSeekService.getEstimatedGenerationTime()}秒`
  })
}