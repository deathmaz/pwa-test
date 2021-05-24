## General info
- The config uses `style-loader` instead of `vue-style-loader`;
- Uses `dart-sass`

The config assumes that the source code located in `src` directory. If not you 
need to do:
- aliases in webpack config and in tsconfig should be aligned
- change linting directory in lint script if needed

## Keep in mind
- change id of the vue app in `app.ejs`
- change `title` in `app.ejs`

## Edge cases
`vue-style-loader` doesn't work with `css-loader` v4 by default, see
[this](https://github.com/vuejs/vue-style-loader/issues/42#issuecomment-664999080).
[Possible Solution](https://github.com/vuejs/vue-style-loader/issues/46#issuecomment-670624576)

## TODO
`vue-style-loader` claims to be `ssr` compatible and official docs for `vue-loader`
still use it, is it needed in projects without ssr and do we need it in general?
Could it be replaced with `style-loader`?
