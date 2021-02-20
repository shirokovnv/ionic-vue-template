export default function installPlugins(app: any) {
  // Load plugins dynamically.
  const requireContext = require.context('./install', true, /\.ts$/i);
  requireContext
    .keys()
    .map((file) => {
      return {
        name: file.replace(/(^.\/)|(\.ts$)/g, ''),
        instance: requireContext(file).instance,
      };
    })
    .forEach((plugin: any) => {
      // provide globally by the name of the plugin file
      app.provide(plugin['name'], plugin['instance']);
    });
}
