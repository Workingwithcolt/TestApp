import { readAsStringAsync, EncodingType,StorageAccessFramework,writeAsStringAsync } from "expo-file-system"
export const blobToBase64 = async (blob) => {
    return new Promise((resolve, reject) => {
        var reader = new FileReader();

        reader.onloadend = function () {
            var pdfBase64Data = reader.result;
            resolve(pdfBase64Data);
        };

        reader.onerror = function (error) {
            reject(error);
        };

        reader.readAsDataURL(blob);
    });
};

export function deepCopyObject(fromObject) {
    return JSON.parse(JSON.stringify(fromObject));
}

export const getIndex = (obj) => {
    if (!obj || Object.keys(obj) === 0) {
        return 1;
    }
    return Object.keys(obj).length + 1;
}

export const ShowPdf = async (value) => {
    const r = await fetch(value);
    const blob = await r.blob();
    window.open(URL.createObjectURL(blob), "_blank");
}


export function getDateString(dateString) {
    var date = new Date(dateString);
    return date.toLocaleDateString();
}

export const ConvertBase64Format = async (data) => {
    let uri = data.assets[0]['uri'];
    let name = data.assets[0]['name']
    let content = await readAsStringAsync(uri, { encoding: EncodingType.Base64 });
    return { value: content, ContentType: data.assets[0]['mimeType'], fileName: name };
}


