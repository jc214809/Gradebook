var oFileIn;

$(function() {
  oFileIn = document.getElementById('my_file_input');
  if (oFileIn.addEventListener) {
    oFileIn.addEventListener('change', filePicked, false);
  }
});


function filePicked(oEvent) {
  // Get The File From The Input
  var oFile = oEvent.target.files[0];
  var sFilename = oFile.name;
  // Create A File Reader HTML5
  var reader = new FileReader();

  // Ready The Event For When A File Gets Selected
  reader.onload = function(e) {
    var data = e.target.result;
    var cfb = XLSX.read(data, { type: 'binary' });
    var wb = cfb;
    var json_object = null;
    // Loop Over Each Sheet
    wb.SheetNames.forEach(function(sheetName) {
      // Obtain The Current Row As CSV
      //var sCSV = XLSX.utils.make_csv(wb.Sheets[sheetName]);
      //var oJS = XLSX.utils.sheet_to_row_object_array(wb.Sheets[sheetName]);
      var XL_row_object = XLSX.utils.sheet_to_row_object_array(wb.Sheets[sheetName]);
      json_object += JSON.stringify(XL_row_object);
      //console.log(json_object);
      //console.log(oJS)
    });
      $("#my_file_output").html(json_object);
  };

  // Tell JS To Start Reading The File.. You could delay this if desired
  reader.readAsBinaryString(oFile);
}

var ExcelToJSON = function() {

  this.parseExcel = function(file) {
    var reader = new FileReader();

    reader.onload = function(e) {
      var data = e.target.result();
      var workbook = XLSX.read(data, { type: 'binary' });

      workbook.SheetNames.forEach(function(sheetName) {
        // Here is your object
        var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
        var json_object = JSON.stringify(XL_row_object);
        console.log(json_object);

      })

    };

    reader.onerror = function(ex) {
      console.log(ex);
    };

    reader.readAsBinaryString(file);
  };
};
