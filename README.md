# dropdown-select

A group of dropdown select controls for React JS.

### Demo

Live Demo:
[https://ganapathy888.github.io/dropdown-select/]('https://ganapathy888.github.io/dropdown-select/')

### Examples

[Browse Examples](examples)

### Features

* Auto complete
* Async Options Select
* Can control using keyboard
* Works with [redux-form](https://github.com/erikras/redux-form/)

### Installation

Add package using Yarn or Npm.

```sh
yarn add dropdown-select
```

```sh
npm install dropdown-select
```

### Usage

Import dropdown select controls and its styles into your component.

```js
import { SimpleSelect, AsyncSelect, MultiSelect } from "dropdown-select";
import "dropdown-select/dist/css/dropdown-select.css";
```

Alternatively, you can import the styles form `.scss` files as follows:

```scss
@import "~dropdown-select/dist/css/dropdown-select.css";
```

Simple select control with array of string options:

```jsx
<SimpleSelect
  options={['option1', 'option2', ...]}
  />
```

Simple select control with array of object options:

```jsx
<SimpleSelect options={[{}, {}]} labelKey="nameKey" valueKey="valueKey" />;
```

Async Select: (Here the fetchOptions accepts a function that returns `Promise`)

```jsx
<AsyncSelect
  fetchOptions={this.fetchOptions}
  labelKey="nameKey"
  valueKey="valueKey"
/>;
```

Multi Select: (Checkbox Styled Options)

It accepts and returns array of options

```jsx
<MultiSelect options={[]} />;
```

Using simple select as custom component in redux-form

```jsx
renderSelectField(props) {
  const { meta: { touched, error } } = props;
  return (
    <div>
      <SimpleSelect
        {...props.input}
        options={props.options}
        labelKey="name"
        valueKey="id"
        />
      {touched && error && <span className="error">{error}</span>}
    </div>
  );
}

render() {
  const { handleSubmit } = this.props

  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="name"
        options={options}
        component={this.renderSelectField}
        />
      <button className="btn btn-primary mt-2" type="submit">Submit</button>
    </form>
  );
}
```

### Further Reading

For advanced use cases, please refer
[react-select](https://github.com/JedWatson/react-select)
