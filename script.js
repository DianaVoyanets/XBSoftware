var link = "<a href='https://webix.com/'>https://webix.com/.</a>"

var header = {
  rows:[
    { view:"toolbar",
    cols:[
        { view: "label", label: "My App"},
        { view: "button", type:"icon", icon:"user", label:"Profile",width: 100 },
      ]
    }
  ]
};

var side = { 
  rows:[ 
    {
      view:"list",
      css: "side_style",
      scroll:false,
      width:200,
      height: 500,
      data:[ "Dashbors", "Users", "Products", "Locations"],
    },
  ]
};

var small_film_set = [
	{ id:1, title:"The Shawshank Redemption", year:1994, votes:678790, rating:9.2, rank:1},
	{ id:2, title:"The Godfather", year:1972, votes:511495, rating:9.2, rank:2},
	{ id:3, title:"The Godfather: Part II", year:1974, votes:319352, rating:9, rank:3},
	{ id:4, title:"The Good, the Bad and the Ugly", year:1966, votes:213030, rating:8.9, rank:4},
	{ id:5, title:"My Fair Lady", year:1964, votes:533848, rating:8.9, rank:5},
	{ id:6, title:"12 Angry Men", year:1957, votes:164558, rating:8.9, rank:6}
];

var dataTable = {
  view:"datatable",
  id:"table",
  autoConfig:"true",
  css:"data_table",
  columns:[
      { id:"title",   header:"Title",      width:250},
      { id:"year",    header:"Released",   width:130},
      { id:"votes",   header:"Votes",      width:130},
      { id:"rating",  header:"Rating",     width:130},
      { id:"rank",    header:"Rank",       width:130},
  ],
  areaselect: true,        
  data: small_film_set
};

var form = {
  view:"form",  
  width:300,
  rows: [
    { template: "EDIT FILMS", type: "section" },
    { view:"text", label:"Title",},
    { view:"text", label:"Year",},
    { view:"text", label:"Rating",},
    { view:"text", label:"Votes",},
    { margin:6, 
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
  css: "style_template",
  template: "The software is provided by" + ' ' + link + ' ' + "All rights reserved(c).",
};

webix.ui({
    rows: [header, main, footer]
});