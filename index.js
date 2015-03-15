
var nothingToSeeHere = require('./lib/remove-build-flags');

module.exports = {
  name: 'ember-build-flags',
  included: function(app) {
    this._super.included.apply(this, arguments);

    app.registry.add('js', {
      name: 'ember-build-flags',
      ext: 'js',
      toTree: function(tree) {
        return nothingToSeeHere(tree);
      }
    });
  }
};
