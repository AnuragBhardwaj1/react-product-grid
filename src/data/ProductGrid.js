ProductGrid = function() {
  this.container = $('#right-container');
  this.leftContainer = $('#left-container');
  this.imgblueprint = $("<img>", {class: 'imgfloat'});;
  this.resultJsonData  = '';
  this.visibleElement = [];                                     // this.hiddenElement = [];
  this.selectorOption = $('<input type="checkbox"></input>');
  this.selectorArray = [];
  this.selectorValue = [];
  this.brandArray = [];
  this.colorArray = [];
  this.brandValue = [];
  this.colorValue = [];
  this.availableCheckbox = '';
  this.availableFlag = false;
  this.avlStr = "";
  this.availableOption = false;                         //this.currentVisibleElement = $('.right-container div:visible'); console.log(this.currentVisibleElement);
}

ProductGrid.prototype.init = function() {
  this.loadData();



}

ProductGrid.prototype.loadData = function() {   //load Json data about image
  var _this = this;
  $.ajax({
    url : ' ./data/product.json',
    type : 'GET' ,
    dataType : 'json',

    success : function(resultJson){
      _this.resultJsonData = resultJson;          // console.log(_this.resultJsonData[0]['url']);
      _this.loadImage();
      // console.log(_this.resultJsonData);
    },
    // what if it fails
    error: function(){
      console.log("could not load data, Please Try again");
      alert("could not load data, Please Try again");
    }
  });
}


ProductGrid.prototype.loadImage = function(){
  var _this = this;
  $(this.resultJsonData).each(function(index, element){
    var urlValue = "./product_data/images/" + this.url;
    var imgClone = _this.imgblueprint.clone().attr({
      "src":urlValue,
      "data-name":this.name,
      "data-brand":this.brand,
      "data-color":this.color,
      "data-sold_out":this.sold_out,
    });
    _this.visibleElement.push(imgClone.appendTo(_this.container));
    // _this.visibleElement[index].data(this);
  })
  this.addSelector();
  this.bindSelector();
}

ProductGrid.prototype.addSelector = function(){  // create selectors and append them to html
  var _this = this;
  this.availableCheckbox = this.selectorOption.clone().attr({"value": "available", "text": "Available", "name": "Available"});
  this.availableCheckbox.appendTo(_this.leftContainer.append($('<h3>Availablity</h3><span>Available</span>')));

  this.leftContainer.append($('<h3>Brands</h3>'));
  // console.log(Object.keys(this.resultJsonData[0])[2]);
  var propertyBrand = Object.keys(this.resultJsonData[0])[3];
  var propertyColor = Object.keys(this.resultJsonData[0])[2]
  var typeOfBrand   = this.resultJsonData[0][propertyBrand];


  this.createBrandSelector("BRAND A","Brand A",propertyBrand);
  this.createBrandSelector("BRAND B","Brand B",propertyBrand);
  this.createBrandSelector("BRAND C","Brand C",propertyBrand);
  this.createBrandSelector("BRAND D","Brand D",propertyBrand);


  this.leftContainer.append($('<h3>Colors</h3>'));
  this.createColorSelector("Yellow","YELLOW",propertyColor);
  this.createColorSelector("Red","RED",propertyColor);
  this.createColorSelector("Green","GREEN",propertyColor);
  this.createColorSelector("Blue","BLUE",propertyColor);



  this.selectorArray = this.brandArray;
  $.merge(this.selectorArray, this.colorArray);          // console.log(this.selectorArray);
  $.merge(this.selectorArray, this.availableCheckbox);
}


ProductGrid.prototype.createBrandSelector = function(valu,nam,ofType) {
  var  selector = this.selectorOption.clone().attr({"value": valu ,"name": nam ,"ofType": ofType});
  this.brandArray.push($(selector).appendTo(this.leftContainer.append($('<br><span>' + nam + '</span>'))));
}

ProductGrid.prototype.createColorSelector = function(valu, nam,ofType) {
  var  selector = this.selectorOption.clone().attr({"value": valu ,"name": nam ,"ofType": ofType});
  this.colorArray.push($(selector).appendTo(this.leftContainer.append($('<br><span>' + nam + '</span>'))));
}

ProductGrid.prototype.bindSelector = function(){
  var _this = this;

  $(this.selectorArray).each(function(index,element){
    this.brandValue = [];
    this.selectorValue = [];

    $(this).on('change',function(){
      if($(element).is(':checked')){
        if ($(element).attr('ofType') == 'brand') {
          _this.brandValue.push($(element).val());
        }
        else if($(element).attr('ofType') == 'color'){
          _this.colorValue.push($(element).val());
        }
        else {
          _this.availableFlag = true;
          _this.avlStr = "img[data-sold_out=0]";
        }

      }
      else {
        if ($(element).attr('ofType') == 'brand') {
          _this.brandValue.splice(_this.brandValue.indexOf($(element).val()), 1);
        }
        else if($(element).attr('ofType') == 'color'){
          _this.colorValue.splice(_this.colorValue.indexOf($(element).val()), 1);
        }
        else {
          _this.avlStr = "";
          _this.availableFlag = false;
        }
      }
      _this.displaySelected();
    });
  });
}


ProductGrid.prototype.displaySelected = function(){
  var _this = this;
  var imgElements = $("#right-container img");
  // console.log(imgElements);
  var selector = _this.selectorGenerator();



  imgElements.hide();
  imgElements.filter(selector).show();
}

ProductGrid.prototype.selectorGenerator = function() {
  var filterArray = [];
  var selectorString = "";
  // console.log(this.brandValue.length);
  // console.log(this.colorValue.length);
  // console.log(this.colorValue.length && !this.brandValue.length);
  if(this.brandValue.length && this.colorValue.length){
    for (var i = 0; i < this.brandValue.length; i++) {
      for (var j = 0; j < this.colorValue.length; j++) {
        selectorString = "img[data-brand=" + "'" + this.brandValue[i] + "'" + "][data-color=" + this.colorValue[j] + "]";
        if(this.availableFlag){
          selectorString += "[data-sold_out=0]";
        }
        filterArray.push(selectorString);
      }
    }
  } else if(this.brandValue.length && !this.colorValue.length) {
    for (var i = 0; i < this.brandValue.length; i++) {
      selectorString = "img[data-brand=" + "'" + this.brandValue[i] + "'" + "]";
      if(this.availableFlag){
          selectorString += "[data-sold_out=0]";
        }
      filterArray.push(selectorString);
    }
  } else if(!this.brandValue.length && this.colorValue.length) {
    console.log("hii");
    for (var j = 0; j < this.colorValue.length; j++) {
      selectorString = "img[data-color="+ "'" + this.colorValue[j] + "'"+ "]";
      if(this.availableFlag){
          selectorString += "[data-sold_out=0]";
        }
      filterArray.push(selectorString);
    }
  } else{
    if(this.availableFlag){
          selectorString = "img[data-sold_out=0]";
        }else{
          selectorString = "img";
        }
    filterArray.push(selectorString);
  }
  //console.log(filterArray);
  selectorString = filterArray.join();
  console.log(selectorString)
  return selectorString;
}

var productloader = new ProductGrid();
productloader.init();



// $('#container').filter('img').hide()
// $('#container').filter('fadsjfdkjfkdsajfjdskfjlksjfdsakjfdskjfkls').show()
