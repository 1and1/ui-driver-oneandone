define('ui/components/machine/driver-%%DRIVERNAME%%/component',
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

			driverName: '%%DRIVERNAME%%',
			model: null,
			'%%DRIVERNAME%%Config': Ember.computed.alias('model.%%DRIVERNAME%%Config'),
			sizes: sizes,
			datacenters: datacenters,
			images: images,

			bootstrap () {
				let config = this.get('store').createRecord({
                    type: '%%DRIVERNAME%%Config'
                });

				let type = 'host';
                if (!this.get('useHost')) {
                type = 'machine';
                }

                this.set('model', this.get('store').createRecord({
                    type: type,
                    '%%DRIVERNAME%%Config': config
                }));
				this.set('editing', false);
			},

			validate () {
				this._super();

				let errors 		= this.get('errors') || [],
					model 		= this.get('model.%%DRIVERNAME%%Config'),
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
					this.set('model.%%DRIVERNAME%%Config.datacenter', datacenter);
				},
				selectOS (os) {
					this.set('model.%%DRIVERNAME%%Config.os', os);
				},
				selectSize (size) {
					this.set('model.%%DRIVERNAME%%Config.size', size);
				},
				create () {
                    // console.log(this.get('model.%%DRIVERNAME%%Config'));
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
);