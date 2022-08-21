import { IField } from 'typings';

// 转换enum为选择器等组件属性options
export function transformEnumToOptions<DecoratorProps, ComponentProps>(props: IField<DecoratorProps, ComponentProps>) {
  const { enum: enumList, enumNames, props: compProps = {} } = props;
  // 兼容fusion组件转换
  if (compProps.dataSource) {
    return compProps.dataSource;
  }

  if (enumList?.length) {
    if (enumNames?.length) {
      return (enumList as string[]).map((item, index) => ({
        label: enumNames[index],
        value: item,
      }));
    } else {
      return enumList;
    }
  }

  return null;
}

// 兼容xRender写法
export function compatXRenderSchema(type: string, format: string, widget: string, fieldProps: any = {}) {
  const options = transformEnumToOptions(fieldProps);
  if (options) {
    fieldProps.props.options = options;

    if (!widget && !format) {
      return 'select';
    }
  }

  // 升级调用方法
  if (widget === 'quarterPicker' || format === 'quarter') {
    fieldProps.props.picker = 'quarter';
    return 'dataPicker';
  }

  if (format) {
    const widgetMap = {
      textarea: 'textarea',
      color: 'color',
      upload: 'upload',
      date: 'dataPicker',
      year: 'yearPicker',
      month: 'monthPicker',
      week: 'weekPicker',
    };

    if (format === 'dateTime') {
      fieldProps.props.showTime = true;
      return type === 'range' ? 'rangePicker' : 'dataPicker';
    }

    if (format === 'time') {
      return type === 'range' ? 'timeRangePicker' : 'timePicker';
    }

    return widgetMap[format];
  }

  if (widget === 'multiSelect') {
    fieldProps.props.mode = 'multiple';
    return 'select';
  }

  if (widget === 'checkboxes') {
    return 'checkbox';
  }

  return widget;
}
