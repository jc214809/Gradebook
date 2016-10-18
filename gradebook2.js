$(function() {
  var a = document.getElementById('hi');
  a.addEventListener('change', handleFile, false);
});

var X = XLSX;

function handleFile(e) {
  var files = e.target.files;
  var f = files[0];

  var reader = new FileReader();
  var name = f.name;
  reader.onload = function(e) {
    var data = e.target.result;
    var wb;
    var arr = fixdata(data);
    wb = X.read(btoa(arr), { type: 'base64' });
    $("#my_file_output").html(JSON.stringify(to_json(wb), 2, 2));
  }
  reader.readAsArrayBuffer(f);
}

function fixdata(data) {
  var o = "",
    l = 0,
    w = 10240;
  for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
  o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
  return o;
}

function to_json(workbook) {
  var viewData = {};
  viewData = {
    classes: []
  };
  workbook.SheetNames.forEach(function(sheetName) {
  	var obj = {};
  	obj[sheetName] =get_student_data(workbook, sheetName);
    viewData.classes.push(obj);
    //viewData.classes[sheetName] = [];
  });
  console.dir(viewData);
  return viewData;

}
function get_student_data(workbook, sheetName) {
	 var result = {};
	var students = [];
	var roa = X.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
    if (roa.length > 0) {
      result[sheetName] = roa;
      for (var i = 0; i < result[sheetName].length; i++) {
        students.push({
          'StudentName': result[sheetName][i].Name,
          'Assignments': result[sheetName][i]
        });
        delete students[i]['Assignments'].Name;
        //viewData.classes[sheetName][i]['Assignments'] = result[sheetName][i];
      }
    }
    return students;
}
//if (a.addEventListener) a.addEventListener('change', handleFile, false);
