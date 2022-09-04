---
  title: demo
  order: 1
  toc: content
  sidemenu: false
---

```jsx
import React from 'react';
import SchemaRender, { useForm } from '@misco/core';

const Demo = () => {
  const schema = {
    type: 'object',
    properties: {
      allBoolean: {
        title: 'boolean类',
        type: 'array',
        items: {
          type: 'object',
          properties: {
            radio: {
              title: '是否通过',
              type: 'boolean',
              hidden: '{{rootValue.switch === true}}',
            },
            switch: {
              title: '开关控制',
              type: 'boolean',
              widget: 'switch',
            },
            textarea: {
              title: '简单文本编辑框',
              type: 'string',
              format: 'textarea',
            },
          },
        },
      },
      AllString: {
        title: 'string类',
        type: 'object',
        properties: {
          input: {
            title: '简单输入框',
            description: '这是描述信息',
            type: 'string',
            placeholder: '昵称',
            format: 'image()',
            default:
              'https://gw.alicdn.com/imgextra/i4/325900186/O1CN0136oOJw1DFENPllQ8C_!!0-saturn_solar.jpg_300x300q90.jpg',
          },
          textarea: {
            title: '简单文本编辑框',
            type: 'string',
            format: 'textarea',
          },
          color: {
            title: '颜色选择',
            type: 'string',
            format: 'color',
          },
          image: {
            title: '图片展示',
            type: 'string',
            format: 'image',
            default:
              'https://gw.alicdn.com/bao/uploaded/i4/4203127928/O1CN01xWDywE28R4mG2LP9X_!!0-item_pic.jpg_300x300q90.jpg',
          },
          uploader: {
            title: '上传文件',
            type: 'string',
            format: 'upload',
            props: {
              action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            },
          },
          treeSelect: {
            title: '树形选择',
            type: 'string',
            widget: 'treeSelect',
            props: {
              treeDefaultExpandAll: true,
              treeData: [
                {
                  title: 'Node1',
                  value: '0-0',
                  key: '0-0',
                  children: [
                    {
                      title: 'Child Node1',
                      value: '0-0-1',
                      key: '0-0-1',
                    },
                    {
                      title: 'Child Node2',
                      value: '0-0-2',
                      key: '0-0-2',
                    },
                  ],
                },
                {
                  title: 'Node2',
                  value: '0-1',
                  key: '0-1',
                },
              ],
            },
          },
        },
      },
      allDate: {
        title: '时间类',
        type: 'object',
        properties: {
          date: {
            title: '日期选择',
            type: 'string',
            format: 'date',
          },
          dateTime: {
            title: '日期时间选择',
            type: 'string',
            format: 'dateTime',
          },
          time: {
            title: '时间选择',
            type: 'string',
            format: 'time',
          },
          dateRange: {
            title: '日期范围',
            type: 'range',
            format: 'dateTime',
            placeholder: ['开始时间', '结束时间'],
          },
          timeRange: {
            title: '时间范围',
            type: 'range',
            format: 'time',
          },
          year: {
            title: '年份选择',
            type: 'string',
            format: 'year',
          },
          month: {
            title: '月份选择',
            type: 'string',
            format: 'month',
          },
          week: {
            title: '周选择',
            type: 'string',
            format: 'week',
          },
          quarter: {
            title: '季度选择',
            type: 'string',
            format: 'quarter',
          },
        },
      },
      allNumber: {
        title: 'number类',
        type: 'object',
        props: {
          canFold: true,
        },
        properties: {
          number1: {
            title: '数字输入框',
            description: '1 - 1000',
            type: 'number',
            min: 1,
            max: 1000,
          },
          number2: {
            title: '带滑动条',
            type: 'number',
            widget: 'slider',
          },
          rate: {
            title: '评价',
            type: 'number',
            widget: 'rate',
          },
        },
      },
      allEnum: {
        title: '选择类',
        type: 'object',
        properties: {
          select: {
            title: '单选',
            type: 'string',
            enum: ['a', 'b', 'c'],
            enumNames: ['早', '中', '晚'],
            default: 'a',
            widget: 'select',
          },
          radio: {
            title: '单选',
            type: 'string',
            enum: ['a', 'b', 'c'],
            enumNames: ['早', '中', '晚'],
            widget: 'radio',
          },
          multiSelect: {
            title: '多选',
            description: '下拉多选',
            type: 'array',
            items: {
              type: 'string',
            },
            enum: ['A', 'B', 'C', 'D'],
            enumNames: ['杭州', '武汉', '湖州', '贵阳'],
            widget: 'multiSelect',
          },
          boxes: {
            title: '多选',
            description: 'checkbox',
            type: 'array',
            items: {
              type: 'string',
            },
            enum: ['A', 'B', 'C', 'D'],
            enumNames: ['杭州', '武汉', '湖州', '贵阳'],
            widget: 'checkboxes',
          },
        },
      },
      listName2: {
        title: '对象数组',
        description: '对象数组嵌套功能',
        type: 'array',
        min: 2,
        max: 8,
        items: {
          type: 'object',
          properties: {
            name: {
              title: '简单输入框',
              type: 'string',
            },
            // name1: {
            //   title: '简单输入框',
            //   type: 'string',
            // },
            // name2: {
            //   title: '简单输入框',
            //   type: 'string',
            // },
            // name3: {
            //   title: '简单输入框',
            //   type: 'string',
            // },
            select1: {
              title: '单选',
              type: 'string',
              enum: ['a', 'b', 'c'],
              enumNames: ['早', '中', '晚'],
            },
          },
        },
        props: {
          mode: 'drawer',
          titleType: 'name',
          // sort: false,
        },
      },
    },
  };

  const field = useForm({
    expandExclusion: true,
    watch: {
      'AllString.input': (v, k) => console.log('watch', k, v),
      'AllString.color': console.log,
    },
  });
  // console.log(field, '======');

  return <SchemaRender schema={schema} field={field} hasSubmitBtn onFinish={console.log} />;
};

export default Demo;
```
