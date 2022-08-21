import {
  Input,
  Rate,
  Radio,
  Select,
  Slider,
  Switch,
  TimePicker,
  Transfer,
  TreeSelect,
  Upload,
  DatePicker,
  Cascader,
  Checkbox,
} from 'antd';

export const widgetMap: any = {
  // number
  rate: Rate,
  range: Slider,
  slider: Slider,

  // string
  textarea: Input.TextArea,
  password: Input.Password,
  color: Input,

  // boolean
  switch: Switch,

  // select
  select: Select,
  treeSelect: TreeSelect,
  cascaderSelect: Cascader,
  radio: Radio.Group,
  checkbox: Checkbox.Group,
  transfer: Transfer,

  // date
  rangePicker: DatePicker.RangePicker,
  quarterPicker: DatePicker.QuarterPicker,
  yearPicker: DatePicker.YearPicker,
  monthPicker: DatePicker.MonthPicker,
  weekPicker: DatePicker.WeekPicker,
  dataPicker: DatePicker,
  timePicker: TimePicker,
  timeRangePicker: TimePicker.RangePicker,

  // upload
  upload: Upload,
};
