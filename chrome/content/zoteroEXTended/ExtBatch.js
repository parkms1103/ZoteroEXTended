Zotero.ExtBatch = {
	
	/**
	* Return an array of Zotero items that have a tag with value tag
	* @param {String} items - list of entries you want to add the tag to
	*/
	findIdsByTag: function(tag) {
		// Initiliaze the search object and set the condition 
		var s = new Zotero.Search();
		s.addCondition('tag', 'is', tag);
		// Execute the search, results is an array of id's
		var results = s.search();
		// Return a list of Zotero items
		var items = Zotero.Items.get(results);
		// if not items were found it will be false, so replace it by an empty list
		if (items == false)
			items = [];
		return items;
	},
	
	/**
	* Add tag to the given Zotero entries
	* @param {Zotero.Item[]} items - list of entries you want to add the tag to
	* @param {String} tag - the tag you want to add
	*/
	addTags: function(items, tag) {
		// Loop through each item and add the tag to it
		items.forEach(function(entry) {
			entry.addTag(tag);
		});
	},
	
	/**
	* Remove given tags from all entries in Zotero
	* @param {String[]} tags - list of tags you want to remove
	*/
	removeTags: function(tags) {
		var ids = []; // List of the ids of the tags we want to remove
		var allTags = Zotero.Tags.search();
		tags = tags.map(tag => tag.toLowerCase());
		// Loop through all the tags
		for (var id in allTags) {
			// If the tag is one of the ones we want to remove, add its id to ids
			if (tags.indexOf(allTags[id].name.toLowerCase()) != -1) {
			  ids.push(id);
			}
		}
		Zotero.DB.beginTransaction();
		Zotero.Tags.erase(ids); // erase the ID's
		Zotero.Tags.purge();
		Zotero.DB.commitTransaction();
		Zotero.zoteroEXTended.loadTags(); // reload tags in all 3 tabs
	},
	
	/**
	* Renames the given tag to newName
	* @param {String} tag - the tag you want to rename
	* @param {String} newName - the new name of the tag
	*/
	renameTag: function(tag, newName) {
		// Get a list of all the items with that tag
		var items = this.findIdsByTag(tag);
		// Remove the tag from all items
		this.removeTags([tag]);
		// Add the new tag to the items that had tag
		this.addTags(items, newName);
	},
	
	/**
	* Renames the given tag to newName
	*/
	//detectChanges: function() {
	//	var tags = //Zotero.zoteroEXTended.getChangedTags('edit-tag-list');
		
	//},
	
	/**
	* Merge given tags tags to newName
	*/
	mergeTags: function() {
		var tags = Zotero.zoteroEXTended.getSelectedTags('merge-tag-list');
		var newName = Zotero.zoteroEXTended.ZEXTwindow.prompt("Please enter the new tag name");
		
		// backup items that have checked tags
		
		var items = []
		for(var i =0; i < tags.length; i++){
			items = items.concat(this.findIdsByTag(tags[i]));
		}
		
		if(newName != '' && newName != null) {
			this.removeTags(tags); // remove checked tags
			this.addTags(items, newName); // add new tag to backed up items
		}
		
		Zotero.zoteroEXTended.loadTags(); // reload tags in all 3 tabs
		//Reset select all box
		Zotero.zoteroEXTended.ZEXTwindow.document.getElementById('merge-tag-select').checked=false;
		Zotero.zoteroEXTended.ZEXTwindow.document.getElementById('merge-tag-select').label="Select All";
	}
};
