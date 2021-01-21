# rollup-plugin-html-template
Allow using html file as a template for injecting chunks and assets  
Dead-simple implementation, if have any issues, feel free to raise and contribute!  
Or *roll* your own implementation, happy coding!

### Usage
```javascript
import htmlTemplate from '@tammle93/rollup-plugin-html-template'

htmlTemplate({
  input: 'src/index.template.html',
  css: 'bundle.css'
})
```


### Build
```
yarn run build
or
npm run build
```
