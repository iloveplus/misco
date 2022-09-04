// export function collectDependencies(_schema: any) {
//     const schema = cloneDeep(_schema);
//     Object.keys(schema).forEach(key => {
//       const value = schema[key];
//       if (isObject(value)) {
//         schema[key] = parseAllExpression(value, formData, dataPath);
//       } else if (isExpression(value)) {
//         schema[key] = parseSingleExpression(value, formData, dataPath);
//       } else if (
//         typeof key === 'string' &&
//         key.toLowerCase().indexOf('props') > -1
//       ) {
//         // 有可能叫 xxxProps
//         const propsObj = schema[key];
//         if (isObject(propsObj)) {
//           Object.keys(propsObj).forEach(k => {
//             schema[key][k] = parseSingleExpression(
//               propsObj[k],
//               formData,
//               dataPath
//             );
//           });
//         }
//       }
//     });
//     return schema;

// }
