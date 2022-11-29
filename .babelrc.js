module.exports =({env}) => ({
  presets: [
    [
      '@babel/preset-env',
      {
        modules: env('test') ? 'auto' : false,
        exclude: ['transform-typeof-symbol']
      }
    ],
    [
      '@babel/preset-react',
      {
        development: !env('production'),
        useBuiltIns: true
      }
    ]
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties'
  ]
});
