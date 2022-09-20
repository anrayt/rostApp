let regions = [];

fetch('input-data.json')
    .then(res => res.json())
    .then(proceedJson)
    .catch(err => { throw err });


function proceedJson(json) {
    regions = json.map(item => item['location code'])
        .filter((value, index, self) => self.indexOf(value) === index);
    document.getElementById("available-variants").textContent = regions.join('\n');
}

document.getElementById("main-form").addEventListener("submit", function(e){
    let region = document.getElementById("region").value;
    if(regions.includes(region)) {
        alert('let me check for ' + region + ' .....');
    } else {
        alert('You are trying to search for unsupported region');
    }
    e.preventDefault();
});