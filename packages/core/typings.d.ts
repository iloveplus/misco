export declare type SchemaType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'integer'
  | 'object'
  | 'array'
  | null;

export declare type SchemaEnum = Array<
  string | number | { label: string; value: any; [key: string]: any }
>;

export declare type SchemaItems<DecoratorProps, ComponentProps> = any;

export declare type Stringify<
  P extends {
    [key: string]: any;
  },
> = {
  [key in keyof P]?: P[key] | string;
};

export declare type SchemaProperties<DecoratorProps, ComponentProps> = Record<
  string,
  ISchema<DecoratorProps, ComponentProps>
>;

export declare type ISchema<DecoratorProps = any, ComponentProps = any> = Stringify<{
  $ref?: string;
  $schema?: string;
  title?: string;
  description?: string;
  default?: any;
  readOnly?: boolean;
  whiteOnly?: boolean;
  type?: SchemaType;
  enum?: SchemaEnum;
  enumNames?: SchemaEnum;
  const?: any;
  multipleOf?: number;
  maximum?: number;
  exclusiveMaximum?: number;
  minimum?: number;
  exclusiveMinimum?: number;
  maxLength?: number;
  minLength?: number;
  pattern?: string | RegExp;
  maxItems?: number;
  minItems?: number;
  uniqueItems?: boolean;
  maxContains?: number;
  minContains?: number;
  maxProperties?: number;
  minProperties?: number;
  required?: string[] | boolean | string;
  format?: string;

  definitions?: SchemaProperties<DecoratorProps, ComponentProps>;
  properties?: SchemaProperties<DecoratorProps, ComponentProps>;
  items?: SchemaProperties<DecoratorProps, ComponentProps>;
  additionalItems?: SchemaProperties<DecoratorProps, ComponentProps>;
  patternProperties?: SchemaProperties<DecoratorProps, ComponentProps>;
  additionalProperties?: SchemaProperties<DecoratorProps, ComponentProps>;
  oneOf?: ISchema<DecoratorProps, ComponentProps>[];
  anyOf?: ISchema<DecoratorProps, ComponentProps>[];
  allOf?: ISchema<DecoratorProps, ComponentProps>[];
  if?: ISchema<DecoratorProps, ComponentProps>;
  then?: ISchema<DecoratorProps, ComponentProps>;
  else?: ISchema<DecoratorProps, ComponentProps>;

  // 非标准
  widgets?: string;
  props?: ComponentProps;
  decoratorProps?: DecoratorProps;
  hidden?: boolean | string;
}>;

export declare type IFormRender<DecoratorProps, ComponentProps> = {
  field?: any;
  layout?: Record<string, any>;
  schema?: ISchema<DecoratorProps, ComponentProps>;
  isPreview?: boolean;
  disabled?: boolean;
  urlChecked?: boolean | { reg: RegExp; errText: string };
  metaKey?: string[];
  colSpan?: number;
  schemaUi?: Record<string, any>;
  onFinish?: (values: any) => void;
  onChange?: () => void;
};

export interface IObjectField<DecoratorProps, ComponentProps>
  extends Exclude<ISchema, 'required'>,
    IFormRender<DecoratorProps, ComponentProps> {
  required: boolean | string[];
  children?: any[];
}
