import { rollup } from 'rollup'
import { builtinModules } from 'module'

async function build() {
  const bundle = await rollup({
    input: 'src/index.js',

    external: [...builtinModules]
  })


  await Promise.all([
    await bundle.write({
      output: {
        format: 'es',
        file: 'dist/index.es.js'
      }
    }),
    await bundle.write({
      output: {
        format: 'cjs',
        file: 'dist/index.cjs.js',
        exports: 'auto'
      }
    })
  ])

  await bundle.close()
  
  console.log('Bundled successfully!')
}

build()
