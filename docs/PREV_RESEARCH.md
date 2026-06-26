# Issue
Our defaults declared in doc tags in d.ts are inconsistent through the codebase. In some cases we use `null` in others - `undefined`.
For options with `null` default value we face ts errors in code if in type declaration there is no `null` in union.
It is also not clear whether it is necessary to add `| undefined` to optional options if we set default to `undefined`.

# Frameworks behavior
## Native JS
In JavaScript, null and undefined both represent the absence of a value, but with different meanings:
- `undefined`: A variable has been declared but not assigned a value, or a property does not exist.
- `null`: An explicit assignment indicating "no value" or "empty".

So native approach would be to use
- `undefined`: for cases when it means that option not assigned - like event callbacks, hints, etc.
- `null`: for cases when we want to set some nullish value - for example, value in DateBox, ColorBox

## React
### Native behavior
In React, there are important differences between undefined and null for prop values:

`undefined` props:
- React treats `undefined` props as if they weren't passed at all
- The prop is omitted from the component's props object
- Default prop values will be used if defined

`null` props:
- React passes `null` as an explicit value
- The prop exists in the component's props object with value `null`
- Default prop values are not used

### Generator behavior
Removing `| undefined` from event handler type in d.ts causes type change in generated component
Removing `| undefined` from option type in d.ts NOT causes type change in generated component

### Competitors types
[MUI](https://github.com/mui/material-ui/blob/master/packages/mui-material/src/ButtonBase/ButtonBase.d.ts)
[kendo](https://www.telerik.com/kendo-react-ui/components/inputs/api/checkboxprops#value)
[syncfusion](https://ej2.syncfusion.com/react/documentation/api/check-box/checkBoxModel/) - examine dts in stackblitz
- Do not add `| undefined` to types
- Use `null` as nullish value
- All props are optional
- Set default values only for defined options

## Vue
### Native behavior
Same native behavior as for React

### Generator behavior
Removing `| undefined` from event handler type in d.ts NOT causes type change in generated component
Removing `| undefined` from option type in d.ts NOT causes type change in generated component

### Competitors types
[kendo](https://www.telerik.com/kendo-vue-ui/components/inputs/checkbox)
[syncfusion](https://ej2.syncfusion.com/vue/documentation/api/check-box/)
Same as for react packages
- Do not add `| undefined` to types
- Use `null` as nullish value
- All props are optional
- Set default values only for defined options

## Angular
### Native behavior
### Generator behavior
We already faced an issue when type doesn't have `undefined` in types, but it set to default: https://isc.devexpress.com/internal/ticket/details/T1093403
To solve this issue we've added `| undefined` to property type where it has `indefined` default value.

Removing `| undefined` from option type in d.ts causes `@Input()` and `@Output()` property decorators change in generated component
Removing `| undefined` from event handler type in d.ts NOT causes type change in generated component

### Competitors types
[Material Angular](https://material.angular.dev/components/checkbox/api)
[kendo](https://www.telerik.com/kendo-angular-ui/components/inputs/checkbox)
[syncfusion](https://ej2.syncfusion.com/angular/documentation/api/check-box/checkBoxModel/)
- Do not add `| undefined` to types
- Use `null` as nullish value

## .NET
.NET doesn't have `undefined` values, only `null`. So for all options that can have nullish value `null` should be added to types to support .NET wrappers.

# Conclusions
## What issues we solve
- Typing consistency through all components
- Aligning types and default values to remove multiple `@ts-expect-error` from our code

We DO NOT cover cases:
- Providing customers with unified value to reset value to our default
- Providing customers with unified value to reset value to component's nullish value

## What issues we may face when change default values for events callbacks and options?
- Multiple BCs in types

## What should be the default value for events callbacks and options - `null` or `undefined`?
> We decided to use `null` as default value, and set nulllish default value only where it has some meaning
{.is-success}

Default option value should be meaningfull, i.e. it should be set to `null` or `undefined` only if it has some affect on the component (example: value in Checkbox or DateBox). Otherwise default value is excessive - it is `indefined` by js native behavior and optional type.
It is better to use `null` as it is native type for nullish values in js. It also exists in .NET.
```
/**
 * @docid
 * @default null
 * @public
*/
value?: Date | string | number | null;
```

## Should we explicitly set default to `undefined` with doc tag?
> NO, @default doc tag used only for docs generation to add description on site. So the correct approach is to define this tag only for options with meaningfull default values (not undefined)
{.is-info}

Default option value should be meaningfull, i.e. we should not add `@default undefined` or `@default null` just to show that option has no default value.
```
/**
 * @docid
 * @type_function_param1 e:{ui/chat:MessageEnteredEvent}
 * @action
 * @public
*/
onMessageEntered?: (e: MessageEnteredEvent) => void;
```

## When shoud we add `| undefined` to option type?
> We do not need it - ts in non strict mode allows to set undefined | null value to any type, while in strict mode it adds `| undefined` to signature for all optional properties
{.is-info}

Option type should tell customer which values are valid for component option. It is not good practice to add additional types just to support our defaults with not-defined meaning.
It doesn't look correct to add `| undefined` or `| null` to event handlers, as it makes no sence.
Our options are already optional, this means, that customer may not define them or set them to be undefined.