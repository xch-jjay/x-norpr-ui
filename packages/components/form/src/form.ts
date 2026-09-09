import type { ComputedRef, InjectionKey, PropType } from 'vue'

export type FormModel = Record<string, unknown>
export type FormSize = 'small' | 'default' | 'large'

export interface FormRule {
  required?: boolean
  message?: string
  min?: number
  max?: number
  pattern?: RegExp
  validator?: (value: unknown, model: FormModel) => string | void | Promise<string | void>
}

export type FormRules = Record<string, FormRule | FormRule[]>

export interface FormItemContext {
  validate: () => Promise<boolean>
  reset: () => void
}

export interface FormContext {
  model: ComputedRef<FormModel>
  rules: ComputedRef<FormRules>
  labelWidth: ComputedRef<string>
  size: ComputedRef<FormSize>
  disabled: ComputedRef<boolean>
  registerItem: (prop: string, item: FormItemContext) => void
  unregisterItem: (prop: string) => void
  resetField: (prop: string) => void
  validateField: (prop: string) => Promise<boolean>
  validate: () => Promise<boolean>
  resetFields: () => void
}

export const formKey: InjectionKey<FormContext> = Symbol('z-form')

export const formProps = {
  model: {
    type: Object as PropType<FormModel>,
    required: true,
  },
  rules: {
    type: Object as PropType<FormRules>,
    default: () => ({}),
  },
  labelWidth: {
    type: String,
    default: '100px',
  },
  size: {
    type: String as PropType<FormSize>,
    default: 'default',
  },
  disabled: Boolean,
} as const

export const formItemProps = {
  prop: {
    type: String,
    required: true,
  },
  label: String,
  required: Boolean,
  showMessage: {
    type: Boolean,
    default: true,
  },
} as const

export function normalizeRules(rule: FormRule | FormRule[] | undefined): FormRule[] {
  if (!rule) return []
  return Array.isArray(rule) ? rule : [rule]
}

function isEmptyValue(value: unknown) {
  return value === undefined
    || value === null
    || value === ''
    || (Array.isArray(value) && value.length === 0)
}

export async function validateValue(value: unknown, rules: FormRule[], model: FormModel) {
  for (const rule of rules) {
    if (rule.required && isEmptyValue(value)) return rule.message || '该字段为必填项'
    if (isEmptyValue(value)) continue

    const length = typeof value === 'string' || Array.isArray(value) ? value.length : undefined
    if (typeof rule.min === 'number' && (typeof value === 'number' ? value < rule.min : length !== undefined && length < rule.min)) {
      return rule.message || `最小值为 ${rule.min}`
    }
    if (typeof rule.max === 'number' && (typeof value === 'number' ? value > rule.max : length !== undefined && length > rule.max)) {
      return rule.message || `最大值为 ${rule.max}`
    }
    if (rule.pattern && !rule.pattern.test(String(value))) return rule.message || '格式不正确'

    if (rule.validator) {
      try {
        const result = await rule.validator(value, model)
        if (typeof result === 'string' && result) return result
      } catch (error) {
        return error instanceof Error ? error.message : (rule.message || '校验失败')
      }
    }
  }

  return undefined
}

