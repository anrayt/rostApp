let regions = [];
let inputData = [];

fetch('input-data.json')
    .then(res => res.json())
    .then(proceedJson)
    .catch(err => { throw err });


function proceedJson(json) {
    inputData = json;
    regions = json.map(item => item['location code'])
        .filter((value, index, self) => self.indexOf(value) === index);
    document.getElementById("available-variants").textContent = regions.join('\n');
}

document.getElementById("main-form").addEventListener("submit", function(e){
    let region = document.getElementById("region").value;
    if(regions.includes(region)) {
        proceedWithRegion(region);
    } else {
        alert('You are trying to search for unsupported region');
    }
    e.preventDefault();
});


function proceedWithRegion(reg) {
    let filtered = inputData.filter(v => v["location code"] === reg);
    let map = groupBy(filtered, r => r.nighname);
    document.getElementById("result").textContent = JSON.stringify(map, (key, value) => (value instanceof Map ? [...value] : value));
}


function groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
            map.set(key, [item]);
        } else {
            collection.push(item);
        }
    });
    return map;
}
