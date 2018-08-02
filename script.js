var link = "<a href='https://webix.com/'>https://webix.com/.</a>"

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
    id:"side_list",
    scroll:false,
    id:"side_list",
    data:["Dashbors", "Users", "Products", "Locations"],
    css:"side_style"
  },
  {template:"<span class='webix_icon fa-check'>Connected</span>",height:40,css:"side_style"},
]  
};

var dataTable = {
  view:"datatable",
  id:"mydata",
  autoConfig:"true",
  css:"data_table",
  gravity: 3,
  columns:[
      { id:"title",   header:"Title",      width:250},
      { id:"year",    header:"Released",   width:130},
      { id:"votes",   header:"Votes",      width:130},
      { id:"rating",  header:"Rating",     width:130},
      { id:"rank",    header:"Rank",       width:130},
  ],
  areaselect: true,        
  data: small_film_set,
};

var form = {
  view:"form", 
  id:"myform", 
  elements: [
    { template:"edit films", type: "section" },
    { view:"text", label:"Title",name:"title",invalidMessage:"'title' must be filled in"},
    { view:"text", label:"Year",name:"year",invalidMessage:"'year' should be between 1970 and current "},
    { view:"text", label:"Rating",name:"rating",invalidMessage:"Enter year between 1990 and 2015"},
    { view:"text", label:"Votes",name:"votes",invalidMessage:"must be less than 100000"},
    { margin:3, 
      cols:
      [
        { view:"button", value:"Add new", type:"form", click:function() {
          if($$('myform').validate()){
            var item = $$('myform').getValues();
            $$('mydata').add(item);
            webix.message("All is correct");
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
    { view: "spacer"}
  ],
  rules:{
    title: webix.rules.isNotEmpty,
    year: function(value) {
      return value > 1970;
    },
    rating: function(value) {
      return value < 100000;
    },
    votes: function(value) {
      return value !=0 && webix.rules.isNotEmpty(value)
    }
  },
};

var main = {
  cols: [side, { view:"resizer"}, dataTable, form]
};

var footer = {
  template:"The software is provided by" + ' ' + link + ' ' + "All rights reserved(c).",
  css:"style_template",
  id: "footer",
  height: 100
};

webix.ui({
  rows: [header, main, footer]
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