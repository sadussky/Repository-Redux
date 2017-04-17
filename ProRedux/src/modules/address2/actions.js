import  * as  apiAddress from '../address/api/apiAddress';

const address = {
    //当前操作类型，1表示添加，2表示编辑
    operation: 1,
    //当前待添加的或者编辑的地址对象
    addressObject: {
        province: '湖北省',
        provinceId: 12121,
        city: '黄冈市',
        cityId: 12121,
        area: '浠水县',
        areaId: 12121,
        street: '汪岗镇高家畈',
        zipCode: '510000',
        phone: '18613178131',
        user: '11231',
        status: 1,
        isDefault: 1,
        userName: '张三'
    },

    //获取的我的地址列表
    items: [],
    //地址联动选择器里面的省
    provinceArray: [],
    //地址联动选择器里面的市
    cityArray: [],
    //地址联动选择器里面的区
    areaArray: [],
    //地址联动当前选中的省代码
    provinceId: null,
    //地址联动当前选中的市代码
    cityId: null,
    //地址联动当前选中的区代码
    areaId: null,
}

const PLCH_ADDRESS = 'address'; //保存在state里面的属性的字段名字
const ACTION_TYPE_ADDRESS_DEFAULT = 'ACTION_TYPE_ADDRESS_DEFAULT';//初始化address对象
const ACTION_TYPE_ADDRESS_LIST = 'ACTION_TYPE_ADDRESS_LIST';//获取地址列表
const ACTION_TYPE_ADDRESS_ADD = 'ACTION_TYPE_ADDRESS_ADD';//添加地址
const ACTION_TYPE_ADDRESS_DEL = 'ACTION_TYPE_ADDRESS_DEL';//删除
const ACTION_TYPE_ADDRESS_EDIT_BEFORE = 'ACTION_TYPE_ADDRESS_EDIT_BEFORE';//编辑地址之前
const ACTION_TYPE_ADDRESS_EDIT_UPDATE = 'ACTION_TYPE_ADDRESS_EDIT_UPDATE';//编辑地址之前
const ACTION_TYPE_ADDRESS_SELECT_PROVINCE = 'ACTION_TYPE_ADDRESS_SELECT_PROVINCE';//联动选择省
const ACTION_TYPE_ADDRESS_SELECT_CITY = 'ACTION_TYPE_ADDRESS_SELECT_CITY';//联动选择市
const ACTION_TYPE_ADDRESS_SELECT_AREA = 'ACTION_TYPE_ADDRESS_SELECT_AREA';//联动选择区


//action,初始化address对象
function actionAddressDefault(provinceId, cityId, areaId) {
    return {
        type: ACTION_TYPE_ADDRESS_DEFAULT,
        provinceId,
        cityId,
        areaId,
    }
}


//action,获取地址列表
function actionAddressList(userId) {
    return {
        type: ACTION_TYPE_ADDRESS_LIST,
        userId
    }
}

//action,添加地址
function actionAddressAdd(userId, address) {
    return {
        type: ACTION_TYPE_ADDRESS_ADD,
        userId,
        address
    }
}

//action, 删除地址
function actionAddressDelete(userId, address) {
    return {
        type: ACTION_TYPE_ADDRESS_DEL,
        userId,
        address
    }
}


//action, 编辑地址之前
function actionAddressEditBefore(userId, address) {
    return {
        type: ACTION_TYPE_ADDRESS_EDIT_BEFORE,
        userId,
        address
    }
}

//action, 编辑地址-编辑之后执行更新地址
function actionAddressEditUpdate(userId, address) {
    return {
        type: ACTION_TYPE_ADDRESS_EDIT_UPDATE,
        userId,
        address
    }
}


function onUpdateProvinceData(obj) {
    if (obj.provinceArray
        && obj.provinceArray instanceof Array
        && obj.provinceArray.length > 0) {
        //Do Nothing
    } else {
        obj.provinceArray = apiAddress.fetchProvince();
    }
    obj.provinceId = obj.provinceId ? obj.provinceId : obj.provinceArray[0].code;
    obj.cityArray = apiAddress.fetchCity(obj.provinceId);
    if (obj.cityArray && obj.cityArray.length > 0) {
        obj.cityId = obj.cityId ? obj.cityId : obj.cityArray[0].code;
        obj.areaArray = apiAddress.fetchArea(obj.cityId);
        if (obj.areaArray && obj.areaArray.length > 0) {
            obj.areaId = obj.areaId ? obj.areaId : obj.areaArray[0].code;
        } else {
            obj.areaArray = [];
            obj.areaId = '';
        }
    } else {
        obj.cityArray = [];
        obj.cityId = '';
        obj.areaArray = [];
        obj.areaId = '';
    }
    return obj;
}


function getAddressObject(state) {
    if (state[PLCH_ADDRESS]) {
        return Object.assign({}, state[PLCH_ADDRESS]);
    }
    return Object.assign({}, address);
}


//reducers,初始化address对象
function updateAddressDefault(state, action) {
    let object = getAddressObject(state);
    object.provinceId = action.provinceId;
    object.cityId = action.cityId;
    object.areaId = action.areaId;
    onUpdateProvinceData(object);
    return Object.assign({}, state, {[PLCH_ADDRESS]: object});
}

//获取地址列表
function getAddressList(state, action) {
    let object = getAddressObject(state);
    let resultArray = [];  //获取地址列表
    object.items = resultArray;
    return Object.assign({}, state, {[PLCH_ADDRESS]: object});
}

//添加地址
function addAddress(state, action) {
    let object = getAddressObject(state);
    //添加地址
    //成功后获取地址列表
    let resultArray = [];
    object.items = resultArray;
    return Object.assign({}, state, {[PLCH_ADDRESS]: object});
}

//删除地址
function deleteAddress(state, action) {
    let object = getAddressObject(state);
    //删除地址
    //删除地址成功后获取地址列表
    let resultArray = [];
    object.items = resultArray;
    return Object.assign({}, state, {[PLCH_ADDRESS]: object});
}

//编辑地址-之前，先保存到state中
function editAddressBefore(state, action) {
    let object = getAddressObject(state);
    object.addressObject = action.address;
    return Object.assign({}, state, {[PLCH_ADDRESS]: object});
}

//编辑地址-编辑之后，更新地址
function editAddressUpdate(state, action) {
    let object = getAddressObject(state);
    //根据object.addressObject 对象来更新地址。
    //更新地址成功后，获取地址列表
    let resultArray = [];
    object.items = resultArray;
    return Object.assign({}, state, {[PLCH_ADDRESS]: object});
}


//联动-选择省
function onSelectProvince(state, action) {
    if (action.provinceId) {
        let object = getAddressObject(state);
        object.provinceId = action.provinceId;
        object.cityId = '';
        object.areaId = '';
        onUpdateProvinceData(object);
        Object.assign({}, state, {[PLCH_ADDRESS]: object});
    }
    return state;
}

//联动-选择市
function onSelectCity(state, action) {
    if (action.cityId) {
        let object = getAddressObject(state);
        object.cityId = action.cityId;
        object.areaId = '';
        onUpdateProvinceData(object);
        Object.assign({}, state, {[PLCH_ADDRESS]: object});
    }
    return state;
}

//联动-选择区
function onSelectArea(state, action) {
    if (action.areaId) {
        let object = getAddressObject(state);
        object.areaId = action.areaId;
        onUpdateProvinceData(object);
        Object.assign({}, state, {[PLCH_ADDRESS]: object});
    }
    return state;
}


function handleAddress(state = {}, action) {
    switch (action.type) {
        case  ACTION_TYPE_ADDRESS_DEFAULT:
            return updateAddressDefault(state, action);
        case  ACTION_TYPE_ADDRESS_LIST:
            return getAddressList(state, action);
        case  ACTION_TYPE_ADDRESS_ADD:
            return addAddress(state, action);
        case  ACTION_TYPE_ADDRESS_DEL:
            return deleteAddress(state, action);
        case  ACTION_TYPE_ADDRESS_EDIT_BEFORE:
            return editAddressBefore(state, action);
        case  ACTION_TYPE_ADDRESS_EDIT_UPDATE:
            return editAddressUpdate(state, action);
        case ACTION_TYPE_ADDRESS_SELECT_PROVINCE:
            return onSelectProvince(state, action);
        case ACTION_TYPE_ADDRESS_SELECT_CITY:
            return onSelectCity(state, action);
        case ACTION_TYPE_ADDRESS_SELECT_AREA:
            return onSelectArea(state, action);
    }
}






















