export default (config, _env, _helpers) => {
  if (config.devServer) {
    // eslint-disable-next-line no-param-reassign
    config.devServer.proxy = [
      {
        path: '/api/**',
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
        changeHost: true,
        pathRewrite: function pathRewrite(path, _request) {
          // eslint-disable-next-line prefer-template
          const newPath = path.replace(/^\/[^/]+\//, '');
          return `/${newPath}`;
        },
      },
    ];
  }
};
