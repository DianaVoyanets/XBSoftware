var link = "<a href='https://webix.com/'>https://webix.com/.</a>"
var information = "#id#. " + "<strong>#name#</strong>" + " " + "from" + " " + "#country#";

var header = {
  view:"toolbar",
  elements: [
    { view:"label", label:"My App",id:"toolbar_label"},
    { view:"button", type:"icon", icon:"user", label:"Profile", width: 100, id:"toolbar_button",popup:"my_pop"},
  ] 
};

var side = {
  rows: [{
    view:"list",
    width: 250,
    id:"side_list",
    scroll:false,
    select:true,
      on:{
      	onAfterSelect:function(id) { 
        	$$(id).show();
        }
      },
    data:["Dashboard", "Users", "Products", "Locations"],
    css:"side_style"
  },
  { template:"<span class='webix_icon fa-check'>Connected</span>",height:40,css:"side_style" }
]  
};

var dataTable = {
  view:"datatable",
  id:"mydata",
  css:"data_table",
  select: true,
  gravity: 3,
  url: "data/data.js",
  columns:[
      { id:"title",   header:["Title",{content:"textFilter"}], width:250,sort:"string",css:"title"},
      { id:"year",    header:["Released",{content:"numberFilter"}],width:140,sort:"int"},
      { id:"votes",   header:["Votes",{content:"numberFilter"}],width:140,sort:"int"},
      { id:"rating",  header:["Rating",{content:"numberFilter"}],width:140,sort:"int"},
      { id:"rank",    header:["Rank",{content:"numberFilter"}], width:140,template:"#rank# {common.editIcon()} {common.trashIcon()}",sort:"int"},
  ],
  hover:"myhover",
  onClick:{
  	"fa-trash":function(e, id) {
    	this.remove(id);
      	return false;
    },
    "fa-pencil":function(e,id) {
      var item =  this.getItem(id);
      $$("myform").setValues(item);
        return true;
    }
  }
};

var form = {
  view:"form", 
  id:"myform", 
  elements: [
    { template:"edit films", type: "section" },
    { view:"text", label:"Title",name:"title",invalidMessage:"'title' must be filled in"},
    { view:"text", label:"Year",name:"year",invalidMessage:"'year' should be between 1970 and current "},
    { view:"text", label:"Rating",name:"rating",invalidMessage:"Enter year between 1990 and 2015"},
    { view:"text", label:"Votes",name:"votes",invalidMessage:"votes must be less than 100000"},
    { margin:3, 
      rows: [
        { view:"button", value:"Add new", type:"form", click:function() {
          if($$('myform').validate()) {
            var item = $$('myform').getValues();
            $$('mydata').add(item);
            webix.message("All is correct");
          }
          else {
            webix.message({ type:"error", text:"Form data is invalid" });
          }
        }},
        { view: "button",value: "Update", click: function() {
          var sel = $$("mydata").getSelectedId();
	        if(!sel) return;
	        var values = $$("myform").getValues();
	        $$("mydata").updateItem(sel, values);
        }},
        { view:"button", value:"Clear",click: function() {
          webix.confirm({
            text:"Do you still want to clear form?",
            callback:function(result) {
              if(result) {
                $$('myform').clear();
                $$('myform').clearValidation();
              }
            }
          });
         }
        },
      ]
    },
    {view: "spacer"}
  ],
  rules:{
    title: webix.rules.isNotEmpty,
    year: (value) => value > 1970,
    rating: (value) =>  value < 100000,
    votes: (value) => value !=0 && webix.rules.isNotEmpty(value)
  },
};

var users = {
  rows: [{
    cols:[
      { view:"text", placeholder:"Type to filter",id:"list_input"},
      { view:"button",value: "Sort asc",width: 120,click: function() {
        $$("list").sort('#age#',"asc");
      }},
      { view: "button",value: "Sort desc",width: 120,click: function() {
        $$("list").sort('#age#',"desc");
      }},
    ],
},
{ 
  view: "list",
  id: "list",
  select: true,
  url: "data/users.js",
  template: information + "<span class='delete_button'>Delete</span>",
  onClick: {
    "delete_button":function(e, id) {
    	this.remove(id);
      	return false;
    },
  },
}, 
  {cols:[
    {
      width: 700,
      view:"chart",
      type:"bar",
      value: "#age#",
      label:"#age#",
      barWidth:35,
      xAxis:{
        template:"#age#",
        title: "Year"
      },
      url: "data/users.js",
    },
  ],
}]
};

var products = {
  view: "treetable",
  id: "treetable",
  select: true,
  columns:[
    { id:"id",  header:"", css:{"text-align":"right"},width:50},
    { id:"title",	header:"Title",	width:250,template:"{common.treetable()} #title#",fillspace:true},
    { id:"price",	header:"Price",	width:200}
  ],
  url:"data/products.js",
};

var main = {
  cells:[ 
  	{ id:"Dashboard", cols:[dataTable,form]},
    { id:"Users", cols:[users] },
    { id:"Products",cols:[products]},
    { id:"Locations", template:"Locations view"},
  ]
};

var footer = {
  template:"The software is provided by" + ' ' + link + ' ' + "All rights reserved(c).",
  css:"style_template",
  id: "footer",
  height: 100
};

webix.ui({
  rows: [header, {cols:[side,main]}, footer]
});

webix.ui({
  view:"popup",
  id:"my_pop",
  head:"Submenu",
  width:300,
  body:{
    view:"list", 
    data:[
      {name:"Settings"},
      {name:"Log out"},
    ],
    template:"#name#",
    autoheight:true,
    select:true
  }
})

$$("list_input").attachEvent("onTimedKeyPress",function(){
  var value = this.getValue().toLowerCase();
  $$("list").filter(function(obj){
    return obj.name.toLowerCase().indexOf(value)==0;
  })
});
