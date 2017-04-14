/*
 * Copyright (c) 1992-2010 by Sadu.Stephen.  ALL RIGHTS RESERVED.
 * Consult your license regarding permissions and restrictions.
 * @date 2017/04/14
 * @since v1.0.0,build,33889
 * github: https://github.com/sadussky
 * web : http:www.sadussky.com
 */

import jsonAddress from '../datas/jsonAddress';


function fetchProvince() {
    let provinces = [];
    jsonAddress.forEach((data, index) => {
        if (data.di == '00' && data.xian == '00') {
            provinces.push(data);
        }
    });
    return provinces;
}


function fetchCity(provinceCode) {
    let citys = [];
    jsonAddress.forEach((data, index) => {
        if (data.sheng != '00'
            && data.di != '00'
            && data.xian == '00'
            && data.sheng == provinceCode.substring(0, 2)) {
            citys.push(data);
        }
    });
    return citys;
}

function fetchArea(cityCode) {
    let areas = [];
    jsonAddress.forEach((data, index) => {
        if (data.sheng != '00'
            && data.di != '00'
            && data.xian != '00'
            && data.sheng == cityCode.substring(0, 2)
            && data.di == cityCode.substring(2, 4)) {
            areas.push(data);
        }
    });
    return areas;
}


export {
    fetchProvince,
    fetchCity,
    fetchArea
}