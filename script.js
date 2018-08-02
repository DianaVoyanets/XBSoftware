var link = "<a href='https://webix.com/'>https://webix.com/.</a>"

var header = {
  view:"toolbar",
  elements: [
    { view:"label", label:"My App",id:"toolbar_label"},
    { view:"button", type:"icon", icon:"user", label:"Profile", width: 100, id:"toolbar_button"},
  ] 
};

var side = { 
  view:"list",
  css:"side_style",
  scroll:false,
  gravity: 1,
  height:500,
  id:"side_list",
  data:["Dashbors", "Users", "Products", "Locations"],
};

var dataTable = {
  view:"datatable",
  id:"table",
  autoConfig:"true",
  autoheight: true,
  css:"data_table",
  gravity: 4,
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
  id:"form", 
  gravity: 1.5,
  rows: [
    { template:"EDIT FILMS", type: "section" },
    { view:"text", label:"Title",},
    { view:"text", label:"Year",},
    { view:"text", label:"Rating",},
    { view:"text", label:"Votes",},
    { margin:3, 
      cols:
      [
        { view:"button", value:"Add new" , type:"form"},
        { view:"button", value:"Clear"}
      ]
    }
  ]
};

var main = {
  cols: [side, { view:"resizer"}, dataTable, form]
};

var footer = {
  template:"The software is provided by" + ' ' + link + ' ' + "All rights reserved(c).",
  css:"style_template",
  id: "footer"
};

webix.ui({
  rows: [header, main, footer]
});