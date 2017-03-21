define('ui/components/machine/driver-oneandone/component',
	[
		'exports',
		'ember',
		'ui/mixins/driver'
	],
	function(exports, _ember, _uiMixinsDriver) {

		const sizes = [
			{
				name: 'Cloud Server M',
				value: 'M',
				cores: 1,
				ram: '1GB RAM',
				disk: '40GB SSD'
			},
			{
				name: 'Cloud Server L',
				value: 'L',
				cores: 2,
				ram: '2GB RAM',
				disk: '80GB SSD'
			},
			{
				name: 'Cloud Server XL',
				value: 'XL',
				cores: 2,
				ram: '4GB RAM',
				disk: '120GB SSD'
			},
			{
				name: 'Cloud Server XXL',
				value: 'XXL',
				cores: 4,
				ram: '8GB RAM',
				disk: '160GB SSD'
			},
			{
				name: 'Cloud Server 3XL',
				value: '3XL',
				cores: 8,
				ram: '16GB RAM',
				disk: '240GB SSD'
			},
			{
				name: 'Cloud Server 4XL',
				value: '4XL',
				cores: 12,
				ram: '32GB RAM',
				disk: '360GB SSD'
			},
			{
				name: 'Cloud Server 5XL',
				value: '5XL',
				cores: 16,
				ram: '48GB RAM',
				disk: '500GB SSD'
			}
		];
		const datacenters = [
			{
				value: 'DE',
				name: 'Germany'
			},
			{
				value: 'ES',
				name: 'Spain'
			},
			{
				value: 'GB',
				name: 'United Kingdom'
			},
			{
				value: 'US',
				name: 'United States of America'
			}
		];
		const images = [
			{
				value: 'centos7-64min',
				name: 'CentOS 7 (64bit minimal)'
			},
			{
				value: 'centos7-64std',
				name: 'CentOS 7 (64bit standard)'
			},
			{
				value: 'centos7-64std+cpanel',
				name: 'CentOS 7 (64bit with CPanel)'
			},
			{
				value: 'centos7-64std+plesk12unlimited',
				name: 'CentOS 7 (64bit with Plesk 12)'
			},
			{
				value: 'centos7-64std+plesk12.5unlimited',
				name: 'CentOS 7 (64bit with Plesk 12.5)'
			},
			{
				value: 'debian8-64min',
				name: 'Debian 8 (64bit minimal)'
			},
			{
				value: 'debian8-64std',
				name: 'Debian 8 (64bit standard)'
			},
			{
				value: 'debian8-64std+plesk12.5unlimited',
				name: 'Debian 8 (64bit with Plesk 12.5)'
			},
			{
				value: 'ubuntu1204-64min',
				name: 'Ubuntu 12.04 (64bit minimal)'
			},
			{
				value: 'ubuntu1204-64std',
				name: 'Ubuntu 12.04 (64bit standard)'
			},
			{
				value: 'ubuntu1204-64std+plesk12unlimited',
				name: 'Ubuntu 12.04 (64bit with Plesk 12)'
			},
			{
				value: 'ubuntu1204-64std+plesk12.5unlimited',
				name: 'Ubuntu 12.04 (64bit with Plesk 12.5)'
			},
			{
				value: 'ubuntu1404-64min',
				name: 'Ubuntu 14.04 (64bit minimal)'
			},
			{
				value: 'ubuntu1404-64std',
				name: 'Ubuntu 14.04 (64bit standard)'
			},
			{
				value: 'ubuntu1404-64std+plesk12unlimited',
				name: 'Ubuntu 14.04 (64bit with Plesk 12)'
			},
			{
				value: 'ubuntu1604-64min',
				name: 'Ubuntu 16.04 (64bit minimal)'
			},
			{
				value: 'ubuntu1604-64std',
				name: 'Ubuntu 16.04 (64bit standard)'
			}
		];

		exports['default'] = _ember['default'].Component.extend(_uiMixinsDriver['default'], {

			driverName: 'oneandone',
			model: null,
			'oneandoneConfig': Ember.computed.alias('model.oneandoneConfig'),
			sizes: sizes,
			datacenters: datacenters,
			images: images,

			bootstrap () {
				let config = this.get('store').createRecord({
                    type: 'oneandoneConfig'
                });

				let type = 'host';
                if (!this.get('useHost')) {
                type = 'machine';
                }

                this.set('model', this.get('store').createRecord({
                    type: type,
                    'oneandoneConfig': config
                }));
				this.set('editing', false);
			},

			validate () {
				this._super();

				let errors 		= this.get('errors') || [],
					model 		= this.get('model.oneandoneConfig'),
					error_keys 	= {
						apiKey: '"API key" is required',
						datacenter: '"Location" is required',
						os: '"Operating system" is required',
						size: '"Size" is required'
					},
					valid = true;

				Object.keys(error_keys).forEach((error_key) => {
                    if(model[error_key] == null || model[error_key] === '') {
                        errors.push(error_keys[error_key])
                        valid = false;
                    }
                });

				if(!valid) this.set('errors', errors);

				return valid;
			},

			willDestroyElement () {
				this.set('errors', null);
			},

			actions: {
				selectDatacenter (datacenter) {
					this.set('model.oneandoneConfig.datacenter', datacenter);
				},
				selectOS (os) {
					this.set('model.oneandoneConfig.os', os);
				},
				selectSize (size) {
					this.set('model.oneandoneConfig.size', size);
				},
				create () {
                    // console.log(this.get('model.oneandoneConfig'));
                },
                cancel () {
                    // console.log('actions:cancel');
                }
			},
			
			init () {
				this._super(...arguments);
				console.log('called init()');
			}
		});
	}
);;
define("ui/components/machine/driver-oneandone/template",["exports","ember","ui/mixins/driver"],function(exports,_ember,_uiMixinsDriver){

exports["default"] = Ember.HTMLBars.template((function() {
  var child0 = (function() {
    return {
      meta: {
        "revision": "Ember@2.9.1",
        "loc": {
          "source": null,
          "start": {
            "line": 41,
            "column": 6
          },
          "end": {
            "line": 45,
            "column": 6
          }
        }
      },
      isEmpty: false,
      arity: 1,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("							");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("option");
        var el2 = dom.createTextNode("\n								");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n							");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element3 = dom.childAt(fragment, [1]);
        var morphs = new Array(3);
        morphs[0] = dom.createAttrMorph(element3, 'value');
        morphs[1] = dom.createAttrMorph(element3, 'selected');
        morphs[2] = dom.createMorphAt(element3,1,1);
        return morphs;
      },
      statements: [
        ["attribute","value",["concat",[["get","datacenter.value",["loc",[null,[42,24],[42,40]]],0,0,0,0]],0,0,0,0,0],0,0,0,0],
        ["attribute","selected",["subexpr","eq",[["get","datacenter.value",["loc",[null,[42,58],[42,74]]],0,0,0,0],["get","model.oneandoneConfig.datacenter",["loc",[null,[42,75],[42,107]]],0,0,0,0]],[],["loc",[null,[null,null],[42,109]]],0,0],0,0,0,0],
        ["content","datacenter.name",["loc",[null,[43,8],[43,27]]],0,0,0,0]
      ],
      locals: ["datacenter"],
      templates: []
    };
  }());
  var child1 = (function() {
    return {
      meta: {
        "revision": "Ember@2.9.1",
        "loc": {
          "source": null,
          "start": {
            "line": 57,
            "column": 6
          },
          "end": {
            "line": 61,
            "column": 6
          }
        }
      },
      isEmpty: false,
      arity: 1,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("							");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("option");
        var el2 = dom.createTextNode("\n								");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n							");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element2 = dom.childAt(fragment, [1]);
        var morphs = new Array(3);
        morphs[0] = dom.createAttrMorph(element2, 'value');
        morphs[1] = dom.createAttrMorph(element2, 'selected');
        morphs[2] = dom.createMorphAt(element2,1,1);
        return morphs;
      },
      statements: [
        ["attribute","value",["concat",[["get","image.value",["loc",[null,[58,24],[58,35]]],0,0,0,0]],0,0,0,0,0],0,0,0,0],
        ["attribute","selected",["subexpr","eq",[["get","image.value",["loc",[null,[58,53],[58,64]]],0,0,0,0],["get","model.oneandoneConfig.os",["loc",[null,[58,65],[58,89]]],0,0,0,0]],[],["loc",[null,[null,null],[58,91]]],0,0],0,0,0,0],
        ["content","image.name",["loc",[null,[59,8],[59,22]]],0,0,0,0]
      ],
      locals: ["image"],
      templates: []
    };
  }());
  var child2 = (function() {
    return {
      meta: {
        "revision": "Ember@2.9.1",
        "loc": {
          "source": null,
          "start": {
            "line": 73,
            "column": 5
          },
          "end": {
            "line": 79,
            "column": 5
          }
        }
      },
      isEmpty: false,
      arity: 1,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("						");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("optgroup");
        var el2 = dom.createTextNode("\n							");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("option");
        var el3 = dom.createTextNode("\n								");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" vCores | ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" | ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n							");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n						");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [1]);
        var element1 = dom.childAt(element0, [1]);
        var morphs = new Array(6);
        morphs[0] = dom.createAttrMorph(element0, 'label');
        morphs[1] = dom.createAttrMorph(element1, 'value');
        morphs[2] = dom.createAttrMorph(element1, 'selected');
        morphs[3] = dom.createMorphAt(element1,1,1);
        morphs[4] = dom.createMorphAt(element1,3,3);
        morphs[5] = dom.createMorphAt(element1,5,5);
        return morphs;
      },
      statements: [
        ["attribute","label",["concat",[["get","size.name",["loc",[null,[74,25],[74,34]]],0,0,0,0]],0,0,0,0,0],0,0,0,0],
        ["attribute","value",["concat",[["get","size.value",["loc",[null,[75,24],[75,34]]],0,0,0,0]],0,0,0,0,0],0,0,0,0],
        ["attribute","selected",["subexpr","eq",[["get","size.value",["loc",[null,[75,52],[75,62]]],0,0,0,0],["get","model.oneandoneConfig.size",["loc",[null,[75,63],[75,89]]],0,0,0,0]],[],["loc",[null,[null,null],[75,91]]],0,0],0,0,0,0],
        ["content","size.cores",["loc",[null,[76,8],[76,22]]],0,0,0,0],
        ["content","size.ram",["loc",[null,[76,32],[76,44]]],0,0,0,0],
        ["content","size.disk",["loc",[null,[76,47],[76,60]]],0,0,0,0]
      ],
      locals: ["size"],
      templates: []
    };
  }());
  return {
    meta: {
      "revision": "Ember@2.9.1",
      "loc": {
        "source": null,
        "start": {
          "line": 1,
          "column": 0
        },
        "end": {
          "line": 95,
          "column": 10
        }
      }
    },
    isEmpty: false,
    arity: 0,
    cachedFragment: null,
    hasRendered: false,
    buildFragment: function buildFragment(dom) {
      var el0 = dom.createDocumentFragment();
      var el1 = dom.createElement("section");
      dom.setAttribute(el1,"class","horizontal-form");
      var el2 = dom.createTextNode("\n	");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("form");
      var el3 = dom.createTextNode("\n		");
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("div");
      dom.setAttribute(el3,"class","container-fluid");
      var el4 = dom.createTextNode("\n\n			");
      dom.appendChild(el3, el4);
      var el4 = dom.createComment("");
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("\n		\n");
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("			");
      dom.appendChild(el3, el4);
      var el4 = dom.createElement("div");
      dom.setAttribute(el4,"class","over-hr r-mb20");
      var el5 = dom.createTextNode("\n				");
      dom.appendChild(el4, el5);
      var el5 = dom.createElement("span");
      var el6 = dom.createTextNode("\n					1&1 API key\n				");
      dom.appendChild(el5, el6);
      dom.appendChild(el4, el5);
      var el5 = dom.createTextNode("\n			");
      dom.appendChild(el4, el5);
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("\n			");
      dom.appendChild(el3, el4);
      var el4 = dom.createElement("div");
      dom.setAttribute(el4,"class","row form-group");
      var el5 = dom.createTextNode("\n				");
      dom.appendChild(el4, el5);
      var el5 = dom.createElement("div");
      dom.setAttribute(el5,"class","col-md-2 form-label");
      var el6 = dom.createTextNode("\n					");
      dom.appendChild(el5, el6);
      var el6 = dom.createElement("label");
      dom.setAttribute(el6,"class","form-control-static");
      var el7 = dom.createTextNode("\n						API key\n					");
      dom.appendChild(el6, el7);
      dom.appendChild(el5, el6);
      var el6 = dom.createTextNode("\n				");
      dom.appendChild(el5, el6);
      dom.appendChild(el4, el5);
      var el5 = dom.createTextNode("\n				");
      dom.appendChild(el4, el5);
      var el5 = dom.createElement("div");
      dom.setAttribute(el5,"class","col-md-8");
      var el6 = dom.createTextNode("\n					");
      dom.appendChild(el5, el6);
      var el6 = dom.createComment("");
      dom.appendChild(el5, el6);
      var el6 = dom.createTextNode("\n				");
      dom.appendChild(el5, el6);
      dom.appendChild(el4, el5);
      var el5 = dom.createTextNode("\n				");
      dom.appendChild(el4, el5);
      var el5 = dom.createElement("p");
      dom.setAttribute(el5,"class","help-block");
      var el6 = dom.createTextNode("\n					To get your 1&1 API key follow these ");
      dom.appendChild(el5, el6);
      var el6 = dom.createElement("a");
      dom.setAttribute(el6,"href","https://www.1and1.com/cloud-community/develop/11-cloud-server-api/displaying-the-api-key/");
      var el7 = dom.createTextNode("instructions");
      dom.appendChild(el6, el7);
      dom.appendChild(el5, el6);
      var el6 = dom.createTextNode(".\n				");
      dom.appendChild(el5, el6);
      dom.appendChild(el4, el5);
      var el5 = dom.createTextNode("\n			");
      dom.appendChild(el4, el5);
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("\n\n");
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("			");
      dom.appendChild(el3, el4);
      var el4 = dom.createElement("div");
      dom.setAttribute(el4,"class","over-hr r-mb20");
      var el5 = dom.createTextNode("\n				");
      dom.appendChild(el4, el5);
      var el5 = dom.createElement("span");
      var el6 = dom.createTextNode("\n					Location, Size and OS\n				");
      dom.appendChild(el5, el6);
      dom.appendChild(el4, el5);
      var el5 = dom.createTextNode("\n			");
      dom.appendChild(el4, el5);
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("\n			");
      dom.appendChild(el3, el4);
      var el4 = dom.createElement("div");
      dom.setAttribute(el4,"class","row form-group");
      var el5 = dom.createTextNode("\n				");
      dom.appendChild(el4, el5);
      var el5 = dom.createElement("div");
      dom.setAttribute(el5,"class","col-md-2 form-label");
      var el6 = dom.createTextNode("\n					");
      dom.appendChild(el5, el6);
      var el6 = dom.createElement("label");
      dom.setAttribute(el6,"class","form-control-static");
      var el7 = dom.createTextNode("\n						Location\n					");
      dom.appendChild(el6, el7);
      dom.appendChild(el5, el6);
      var el6 = dom.createTextNode("\n				");
      dom.appendChild(el5, el6);
      dom.appendChild(el4, el5);
      var el5 = dom.createTextNode("\n				");
      dom.appendChild(el4, el5);
      var el5 = dom.createElement("div");
      dom.setAttribute(el5,"class","col-md-8");
      var el6 = dom.createTextNode("\n					");
      dom.appendChild(el5, el6);
      var el6 = dom.createElement("select");
      dom.setAttribute(el6,"class","form-control");
      var el7 = dom.createTextNode("\n");
      dom.appendChild(el6, el7);
      var el7 = dom.createComment("");
      dom.appendChild(el6, el7);
      var el7 = dom.createTextNode("					");
      dom.appendChild(el6, el7);
      dom.appendChild(el5, el6);
      var el6 = dom.createTextNode("\n				");
      dom.appendChild(el5, el6);
      dom.appendChild(el4, el5);
      var el5 = dom.createTextNode("\n			");
      dom.appendChild(el4, el5);
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("\n			");
      dom.appendChild(el3, el4);
      var el4 = dom.createElement("div");
      dom.setAttribute(el4,"class","row form-group");
      var el5 = dom.createTextNode("\n				");
      dom.appendChild(el4, el5);
      var el5 = dom.createElement("div");
      dom.setAttribute(el5,"class","col-md-2 form-label");
      var el6 = dom.createTextNode("\n					");
      dom.appendChild(el5, el6);
      var el6 = dom.createElement("label");
      dom.setAttribute(el6,"class","form-control-static");
      var el7 = dom.createTextNode("\n						Operating system\n					");
      dom.appendChild(el6, el7);
      dom.appendChild(el5, el6);
      var el6 = dom.createTextNode("\n				");
      dom.appendChild(el5, el6);
      dom.appendChild(el4, el5);
      var el5 = dom.createTextNode("\n				");
      dom.appendChild(el4, el5);
      var el5 = dom.createElement("div");
      dom.setAttribute(el5,"class","col-md-8");
      var el6 = dom.createTextNode("\n					");
      dom.appendChild(el5, el6);
      var el6 = dom.createElement("select");
      dom.setAttribute(el6,"class","form-control");
      var el7 = dom.createTextNode("\n");
      dom.appendChild(el6, el7);
      var el7 = dom.createComment("");
      dom.appendChild(el6, el7);
      var el7 = dom.createTextNode("					");
      dom.appendChild(el6, el7);
      dom.appendChild(el5, el6);
      var el6 = dom.createTextNode("\n				");
      dom.appendChild(el5, el6);
      dom.appendChild(el4, el5);
      var el5 = dom.createTextNode("\n			");
      dom.appendChild(el4, el5);
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("\n			");
      dom.appendChild(el3, el4);
      var el4 = dom.createElement("div");
      dom.setAttribute(el4,"class","row form-group");
      var el5 = dom.createTextNode("\n				");
      dom.appendChild(el4, el5);
      var el5 = dom.createElement("div");
      dom.setAttribute(el5,"class","col-md-2 form-label");
      var el6 = dom.createTextNode("\n					");
      dom.appendChild(el5, el6);
      var el6 = dom.createElement("label");
      dom.setAttribute(el6,"class","form-control-static");
      var el7 = dom.createTextNode("\n						Size\n					");
      dom.appendChild(el6, el7);
      dom.appendChild(el5, el6);
      var el6 = dom.createTextNode("\n				");
      dom.appendChild(el5, el6);
      dom.appendChild(el4, el5);
      var el5 = dom.createTextNode("\n				");
      dom.appendChild(el4, el5);
      var el5 = dom.createElement("div");
      dom.setAttribute(el5,"class","col-md-8");
      var el6 = dom.createTextNode("\n					");
      dom.appendChild(el5, el6);
      var el6 = dom.createElement("select");
      dom.setAttribute(el6,"class","form-control");
      var el7 = dom.createTextNode("\n");
      dom.appendChild(el6, el7);
      var el7 = dom.createComment("");
      dom.appendChild(el6, el7);
      var el7 = dom.createTextNode("					");
      dom.appendChild(el6, el7);
      dom.appendChild(el5, el6);
      var el6 = dom.createTextNode("\n				");
      dom.appendChild(el5, el6);
      dom.appendChild(el4, el5);
      var el5 = dom.createTextNode("\n			");
      dom.appendChild(el4, el5);
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("\n		");
      dom.appendChild(el3, el4);
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n\n		");
      dom.appendChild(el2, el3);
      var el3 = dom.createComment("");
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n\n");
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("    ");
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("div");
      dom.setAttribute(el3,"class","footer-actions");
      var el4 = dom.createTextNode("\n      ");
      dom.appendChild(el3, el4);
      var el4 = dom.createElement("div");
      dom.setAttribute(el4,"class","row");
      var el5 = dom.createTextNode("\n        ");
      dom.appendChild(el4, el5);
      var el5 = dom.createComment("");
      dom.appendChild(el4, el5);
      var el5 = dom.createTextNode("\n      ");
      dom.appendChild(el4, el5);
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("\n      ");
      dom.appendChild(el3, el4);
      var el4 = dom.createComment("");
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("\n    ");
      dom.appendChild(el3, el4);
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n	");
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n");
      dom.appendChild(el1, el2);
      dom.appendChild(el0, el1);
      return el0;
    },
    buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
      var element4 = dom.childAt(fragment, [0, 1]);
      var element5 = dom.childAt(element4, [1]);
      var element6 = dom.childAt(element5, [11, 3, 1]);
      var element7 = dom.childAt(element5, [13, 3, 1]);
      var element8 = dom.childAt(element5, [15, 3, 1]);
      var element9 = dom.childAt(element4, [6]);
      var morphs = new Array(11);
      morphs[0] = dom.createMorphAt(element5,1,1);
      morphs[1] = dom.createMorphAt(dom.childAt(element5, [6, 3]),1,1);
      morphs[2] = dom.createAttrMorph(element6, 'onchange');
      morphs[3] = dom.createMorphAt(element6,1,1);
      morphs[4] = dom.createAttrMorph(element7, 'onchange');
      morphs[5] = dom.createMorphAt(element7,1,1);
      morphs[6] = dom.createAttrMorph(element8, 'onchange');
      morphs[7] = dom.createMorphAt(element8,1,1);
      morphs[8] = dom.createMorphAt(element4,3,3);
      morphs[9] = dom.createMorphAt(dom.childAt(element9, [1]),1,1);
      morphs[10] = dom.createMorphAt(element9,3,3);
      return morphs;
    },
    statements: [
      ["inline","partial",["host/add-common"],[],["loc",[null,[5,3],[5,32]]],0,0],
      ["inline","input",[],["type","password","name","apiKey","classNames","form-control","placeholder","Your 1&1 API key.","value",["subexpr","@mut",[["get","model.oneandoneConfig.apiKey",["loc",[null,[20,107],[20,135]]],0,0,0,0]],[],[],0,0]],["loc",[null,[20,5],[20,137]]],0,0],
      ["attribute","onchange",["subexpr","action",["selectDatacenter"],["value","target.value"],["loc",[null,[null,null],[40,93]]],0,0],0,0,0,0],
      ["block","each",[["get","datacenters",["loc",[null,[41,14],[41,25]]],0,0,0,0]],[],0,null,["loc",[null,[41,6],[45,15]]]],
      ["attribute","onchange",["subexpr","action",["selectOS"],["value","target.value"],["loc",[null,[null,null],[56,85]]],0,0],0,0,0,0],
      ["block","each",[["get","images",["loc",[null,[57,14],[57,20]]],0,0,0,0]],[],1,null,["loc",[null,[57,6],[61,15]]]],
      ["attribute","onchange",["subexpr","action",["selectSize"],["value","target.value"],["loc",[null,[null,null],[72,87]]],0,0],0,0,0,0],
      ["block","each",[["get","sizes",["loc",[null,[73,13],[73,18]]],0,0,0,0]],[],2,null,["loc",[null,[73,5],[79,14]]]],
      ["inline","partial",["host/add-options"],[],["loc",[null,[85,2],[85,32]]],0,0],
      ["inline","top-errors",[],["errors",["subexpr","@mut",[["get","errors",["loc",[null,[90,28],[90,34]]],0,0,0,0]],[],[],0,0]],["loc",[null,[90,8],[90,36]]],0,0],
      ["inline","save-cancel",[],["save","save","cancel","cancel"],["loc",[null,[92,6],[92,49]]],0,0]
    ],
    locals: [],
    templates: [child0, child1, child2]
  };
}()));;

});
