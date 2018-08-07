var link = "<a href='https://webix.com/'>https://webix.com/.</a>"
var information = "#id#. " + "<strong>#name#</strong>" + " " + "from" + " " + "#country#";

var categories_collection = new webix.DataCollection({
  url: "data/categories.js"
});

var users_collection = new webix.DataCollection({
  url: "data/users.js"
});

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
    data:["Dashboard", "Users", "Products", "Admin"],
    css:"side_style"
  },
  { template:"<span class='webix_icon fa-check'>Connected</span>",height:40,css:"side_style" }
]  
};

var dataTable = {
  rows: [{
       view:"tabbar", 
        id:"tabbar",
        width:800,
        options:[ 
            { id:"all", value: "All" },
            { id:"old_button", value: "Old" },
            { id:"modern_button",value: "Modern" },
            { id:"new_button", value: "New" },
        ],
          on:{
            onChange:function() {
              $$("mydata").filterByAll();
            }
        },
      },
    {
      view:"datatable",
      id:"mydata",
      css:"data_table",
      save:"rest->https://docs.webix.com/samples/40_serverside/03_php_custom/server/datatable_rest.php",
      gravity: 4,
      url: "data/data.js",
      columns:[
      { id:"id",header:"", width:50,sort:"int",css:"style_id"},
      { id:"title",header:["Title",{content:"textFilter"}],width:110,sort:"string"},
      { id:"year",header:"Year",width:110,sort:"int"},
      { id:"rating",header:["Rating",{content:"numberFilter"}],width:110,sort:"int"},
      { id:"votes",header:["Votes",{content:"numberFilter"}],width:110,sort:"int"},
      { id:"rank",header:["Rank",{content:"numberFilter"}],width:110, sort:"int"},
      { id:"categoryId",header: "Category",collection: categories_collection,width: 110},
      { id:"icon",header:"",template: "{common.trashIcon()}"},
    ],
  hover:"myhover",
  select: true,
  editable:true,
  scheme: {
    $init:function(obj) {
      obj.votes = obj.votes.replace(/,/, '.');
      obj.categoryId = getRandom(1,5);
      },
  },
  onClick: {
  	"fa-trash":function(e, id) {
      webix.confirm({
        text:"Do you still want to clear field?",
        callback: function(result) {
          if(result) {
            $$("mydata").remove(id);
      	      return false;
           }
          }
        })
      }
    }
  }
 ],
};

var form = {
  view:"form", 
  id:"myform", 
  editable:true,
  select: true,
  elements: [
    { template:"edit films", type: "section" },
    { view:"text", label:"Title",name:"title",invalidMessage:"'title' must be filled in"},
    { view:"text", label:"Year",name:"year",invalidMessage:"'year' should be between 1970 and current "},
    { view:"text", label:"Rating",name:"rating",invalidMessage:"rating cannot be empty or 0"},
    { view:"text", label:"Votes",name:"votes",invalidMessage:"votes must be less than 100000"},
    { view:"richselect",label: "Category",name:"category",options:{data: categories_collection}},
    { margin:3, 
      rows: [
        { view:"button", value:"Save", type:"form", click:function() {
          var form = $$('myform');
          if (form.validate()) {
            form.save();
          }
          else {
            webix.message({ type:"error", text:"Form data is invalid" });
          }
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
    votes: (value) =>  value < 100000,
    rating: (value) => value !=0 && webix.rules.isNotEmpty(value)
  },
};

webix.protoUI({
  name:"editlist"
}, webix.EditAbility, webix.ui.list);

var users = {
  rows: [{
    cols:[
      { view:"text", placeholder:"Type to filter",id:"list_input"},
      { view:"button",value: "Sort asc",width: 100,click: function() {
        $$("list").sort('#age#',"asc");
      }},
      { view: "button",value: "Sort desc",width: 100,click: function() {
        $$("list").sort('#age#',"desc");
      }},
      { view: "button",value: "Add user",width: 100,id:"add_button",click: function() {
        $$("list").add({"name":"Alan Smith","age":57, "country":"USA"})
      }}

    ],
},
{ 
  view: "list",
  id: "list",
  view: "editlist",
  editable:true,
  select: true,
	editor:"text",
  editValue:"name",
  rules: {
    name:webix.rules.isNotEmpty,
  },
  select: true,
  template: information + "<span class='delete_button'>Delete</span>",
  onClick: {
    "delete_button":function(e,id) {
      webix.confirm({
        text: "Do you still want to clear field?",
        callback: function(result) {
          if(result) {
          $$("list").remove(id) 
            return false;
          }
        }
      })
    }
  },
  scheme: {
    $init:function(obj) {
      if(obj.age < 26) {
        obj.$css = "highlight";
      }
    },
  },
},
{ cols:[
    {
      view:"chart",
      type:"bar",
      id:"chart",
      value:"#age#",
      barWidth:35,
      xAxis:{template:"#country#"},
      yAxis:{
          start:0,
          end:10,
          step:2
      },
    },
  ],
}]
};

var products = {
  view: "treetable",
  id: "treetable",
  select: true,
  editable: true,
  columns: [
    { id:"id",  header:"", css:{"text-align":"right"},width:50},
    { id:"title",	header:"Title",	width:250,template:"{common.treetable()} #title#",fillspace:true,editor:"text"},
    { id:"price",	header:"Price",	width:200,editor:"text"}
  ],
  rules: {
    title: webix.rules.isNotEmpty,
    price: webix.rules.isNumber
  },
  url:"data/products.js",
};

var categories = {
  rows: [
    {
      editable: true,
      select: true,
      view: "datatable",
      id: "categories_table",
      columns: [
        { id:"id",header:""},
        { id:"value",header:"Title",editor:"text"},
      ]
    },
    { view: "button",value: "Add new",click: function() {
      categories_collection.add({
        value:"Biography",
      },0);
    }},
    { view: "button",value: "Delete selected",click: function() {
      var sel = $$("categories_table").getSelectedId();
          if(sel) categories_collection.remove(sel);
    }},
 ]
};

var main = {
  cells:[ 
  	{ id:"Dashboard", cols:[dataTable,form]},
    { id:"Users", cols:[users] },
    { id:"Products",cols:[products]},
    { id:"Admin", cols:[categories]},
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

$$("myform").bind($$("mydata"));

function getRandom(min, max) {
  var rand = Math.random() * (max - min) + min;
  return Math.floor(rand);
};

$$("chart").sync($$("list"),function() {
  this.group({
    by:"country",
    map:{
      age:[ "age", "count"]
    },
});
});

$$("mydata").registerFilter(
  $$("tabbar"), 
  { columnId:"year", compare:function(value, filter, item) {
    switch(filter) {
      case "old_button": return value < 1990;
      case "new_button": return value > 2010;
      case "modern_button": return value > 1990 && value < 2010;
      default: return value;
    }
   } 
  },
  { 
    getValue:function(node) {
      return node.getValue();
    },
    setValue:function(node, value){
      node.setValue(value);
    }
  }
);

$$("list").sync(users_collection);
$$("categories_table").sync(categories_collection);