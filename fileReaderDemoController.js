({
    upload: function (component, event, helper) {
        var fileTypes = ['csv', 'xls', 'xlsx'];
        
        var file = component.get('v.FileList')[0];
        var extension = file.name.split('.').pop().toLowerCase();
        var fileName = file.name.split('.')[0];
        
        if (fileTypes.indexOf(extension) == -1) {
            console.log('File format not correct');
            return;
        }
        
        var reader = new FileReader();
        reader.onload = function (e) {
            var binary = '';
            var bytes = new Uint8Array(e.target.result);
            var length = bytes.byteLength;
            
            for (var i = 0; i < length; i++) {
                binary += String.fromCharCode(bytes[i]);
            }
            
            var workbook = XLSX.read(binary, { type: 'binary', raw: true });
            var sheet_name_list = workbook.SheetNames;
            var csvData = XLSX.utils.sheet_to_csv(workbook.Sheets[sheet_name_list[0]]);
            var stringArray = csvData.split('\n');
            
            console.log('fullFileName '+fileName + '.' + extension);
            console.log('fileType '+extension);
            console.log('fileName '+fileName);
            console.log('fileBody '+stringArray);
            console.table(stringArray);
            
            component.set('v.fileBody', stringArray);
            component.set('v.fileName', fileName);
            component.set('v.fileType', extension);
            component.set('v.fullFileName', fileName + '.' + extension);
            
        };
        
        reader.readAsArrayBuffer(file);
    },
})
