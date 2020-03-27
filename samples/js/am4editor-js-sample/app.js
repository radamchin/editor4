var myLauncher = {

	/**
	 * Settings
	 */
	launcherModules: [ 'home', 'design', 'data', 'code' ],

	launcherThemes: [ {
		name: 'am4themes_animated',
		label: 'Animated'
	}, {
		name: 'am4themes_dark',
		label: 'Dark'
	} ],

	launcherSettings: {
		editorUrl: 'https://editor4.amcharts.com/am4editor/',
		target: {
			type: 'inline'
		},
		editorConfig: {
			enabledModules: [ 'home', 'design', 'data', 'code' ],
			engineConfig: {
				availableThemes: [ {
					name: 'am4themes_animated',
					label: 'Animated'
				}, {
					name: 'am4themes_dark',
					label: 'Dark'
				} ]
			}
		}
	},

	previewBackgroundColor: 'white',

	/**
	 * State properties
	 */
	currentPage: 'home',
	chart: null,
	launcher: null,

	/**
	 * Methods
	 */
	menuSwitch: function( page ) {

		// Already selected?
		if ( page == this.currentPage ) {
			return;
		}

		// Hide previous active page
		document.getElementById( this.currentPage ).style.display = "none";

		// Reveal new page
		this.currentPage = page;
		document.getElementById( this.currentPage ).style.display = "block";

		// Call code
		switch ( page ) {
			case "new-chart":
				this.newChart();
				break;
		}

		console.log( page );
		console.log( am4editor )
	},

	/**
	 * New chart
	 */
	newChart: function() {
		this.launcher = new am4editor.EditorLauncher();

		// create a copy of global launcherSettings so we don't modify them
		const config = JSON.parse( JSON.stringify( this.launcherSettings ) );
		config.editorConfig.allowDefaultTemplates = true;
		var tis = this;
		config.okCallback = function( chartConfig, appliedThemes ) {
			this.renderChart( chartConfig, appliedThemes );
		};
		config.cancelCallback = function() {
			if ( this.launcher ) {
				this.launcher.close();
			}
			if ( this.chart ) {
				chart.dispose();
			}
		};

		this.launcher.launch( config );
	},

	renderChart: function( chartConfig, appliedThemes ) {
		if ( this.launcher ) {
			this.launcher.close();
		}
		console.log( tis )

		if ( appliedThemes ) {
			this.applyChartThemes( appliedThemes );
		}

		if ( this.chart !== undefined ) {
			this.chart.dispose();
		}

		this.chart = am4core.createFromConfig(
			chartConfig,
			document.getElementById( "chartdiv" )
		);
	},

	applyChartThemes: function( themes ) {
		am4core.unuseAllThemes();

		// just a sampling of applying a couple of themes
		if ( themes ) {
			themes.forEach( function( t ) {
				// eslint-disable-next-line default-case
				switch ( t ) {
					case 'am4themes_animated':
						{
							am4core.useTheme( am4themes_animated );
							break;
						}
					case 'am4themes_dark':
						{
							am4core.useTheme( am4themes_dark );
							break;
						}
				}
			} );
		}

		// get background color from applied themes
		const interfaceColors = new am4core.InterfaceColorSet();
		this.previewBackgroundColor = interfaceColors.getFor( 'background' ).hex;
	}

};