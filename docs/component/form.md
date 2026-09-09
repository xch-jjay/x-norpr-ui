# Form 表单

Form 和 FormItem 用于组织表单字段、展示标签和错误信息，并提供统一的校验、重置方法。

## 基础用法

```vue
<script setup lang="ts">
import { ref } from 'vue'

const formRef = ref()
const model = ref({ username: '' })
const rules = {
  username: { required: true, message: '请输入用户名' },
}

async function submit() {
  if (await formRef.value.validate()) {
    // 提交 model.value
  }
}
</script>

<template>
  <z-form ref="formRef" :model="model" :rules="rules">
    <z-form-item prop="username" label="用户名">
      <z-input v-model="model.username" placeholder="请输入用户名" />
    </z-form-item>
    <z-button type="primary" @click="submit">提交</z-button>
  </z-form>
</template>
```

## 常用规则

```ts
const rules = {
  username: [
    { required: true, message: '请输入用户名' },
    { min: 3, max: 20, message: '长度需要在 3 到 20 个字符之间' },
    { pattern: /^[a-zA-Z0-9_]+$/, message: '只能包含字母、数字和下划线' },
  ],
  password: {
    validator: (value: unknown) => value === 'z-ui' ? undefined : '密码不正确',
  },
}
```

规则支持 `required`、`min`、`max`、`pattern` 和异步 `validator`。字符串规则校验长度，数字规则校验数值范围。

## 重置表单

```ts
formRef.value.resetFields()
```

`resetFields` 会恢复 Form 初始化时的字段值，并清除 FormItem 的校验状态。

## 统一尺寸和禁用状态

`Form` 的 `size` 和 `disabled` 会通过上下文传递给 Input、InputNumber、Select、Checkbox、Radio、Switch 等表单控件。单个控件显式设置的非默认尺寸仍然优先：

```vue
<z-form :model="model" size="small" disabled>
  <z-input v-model="model.keyword" />
  <z-input-number v-model="model.count" size="large" />
</z-form>
```

上例中的输入框会继承小尺寸和禁用状态，数字输入会使用显式的大尺寸，但仍然继承禁用状态。

## API

### Form Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `model` | `Record<string, unknown>` | 必填 | 表单数据对象 |
| `rules` | `FormRules` | `{}` | 字段校验规则 |
| `labelWidth` | `string` | `'100px'` | 标签宽度 |
| `size` | `'small' \| 'default' \| 'large'` | `'default'` | 表单尺寸 |
| `disabled` | `boolean` | `false` | 是否禁用表单及其支持上下文的控件 |

### FormItem Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `prop` | `string` | 必填 | 对应 model 的字段名 |
| `label` | `string` | — | 字段标签 |
| `required` | `boolean` | `false` | 是否追加必填规则 |
| `showMessage` | `boolean` | `true` | 是否显示错误消息 |

### Exposes

| 方法 | 返回值 | 说明 |
| --- | --- | --- |
| `validate()` | `Promise<boolean>` | 校验所有已注册字段 |
| `validateField(prop)` | `Promise<boolean>` | 校验指定字段 |
| `resetFields()` | `void` | 恢复初始值并清除错误 |

