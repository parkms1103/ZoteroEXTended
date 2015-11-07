Zotero.zoteroEXTended = {
	DB: null,
	
	init: function () {
		// Connect to (and create, if necessary) helloworld.sqlite in the Zotero directory
		this.DB = new Zotero.DBConnection('zoteroEXTended');
		
		if (!this.DB.tableExists('changes')) {
			this.DB.query("CREATE TABLE changes (num INT)");
			this.DB.query("INSERT INTO changes VALUES (0)");
		}
	},
	
	insertHello: function() {
		var data = {
			title: "Zotero",
			company: "Center for History and New Media",
			creators: [
				['Dan', 'Stillman', 'programmer'],
				['Simon', 'Kornblith', 'programmer']
			],
			version: '1.0.1',
			company: 'Center for History and New Media',
			place: 'Fairfax, VA',
			url: 'http://www.zotero.org'
		};
		Zotero.Items.add('computerProgram', data); // returns a Zotero.Item instance
	},
	
	openWindow: function(){
		var strWindowFeatures = "resizable=no,chrome=yes,centerscreen=yes";
		this.ZEXTwindow = window.openDialog('chrome://zoteroEXTended/content/ui.xul',
		'Zotero EXTended',strWindowFeatures);
		//win.getElementById('enter-new-tag-label').setAttribute("value","TESTESTEST");
	},
	
	addButtonClick: function() {
		var textbox = this.ZEXTwindow.document.getElementById('add-tag-textbox');
		if (textbox.value != ""){
			this.ZEXTwindow.alert(textbox.value);
			textbox.value = ""; //clear text box
		}
		else{
			textbox.placeholder = "You forgot to give a tag!";
		}
		this.insertHello();
		//Zotero.HelloWorldZotero.insertHello();
	},
	
	editButtonClick: function() {
                var textbox = this.ZEXTwindow.document.getElementById('edit-tag-textbox');
                if (textbox.value != ""){
                        alert(textbox.value);
                        this.ZEXTwindow.focus(); //regain focus after alert window
                        textbox.value = ""; //clear text box
                }
                else{
                        textbox.placeholder = "You forgot to give a tag!";
                }
                this.insertHello();
                //Zotero.HelloWorldZotero.insertHello();
        },
};

// Initialize the utility
window.addEventListener('load', function(e) { Zotero.zoteroEXTended.init(); }, false);
