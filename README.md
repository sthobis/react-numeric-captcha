# react-numeric-captcha

React component for numeric captcha.

Note that in most cases you should consider [Google Recaptcha](https://www.google.com/recaptcha/intro/v3.html) instead of delivering custom solution.

## Feature

- [x] Canvas Image
- [x] Refresh Button
- [x] Play Button (Listen to Audio)

## Usage

```
npm install react-numeric-captcha
```

```jsx
<Canvas
  onChange={/* change handler function */}
  placeholder="Insert captcha" // optional
/>
```

## Styling

By default no style is included, you can style it using regular css. For example: [captcha.css](https://raw.githubusercontent.com/sthobis/react-numeric-captcha/master/src/captcha.css).
