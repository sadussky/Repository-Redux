/*
 * Copyright (c) 1992-2010 by Sadu.Stephen.  ALL RIGHTS RESERVED.
 * Consult your license regarding permissions and restrictions.
 * @date 2017/04/14
 * @since v1.0.0,build,33889
 * github: https://github.com/sadussky
 * web : http:www.sadussky.com
 */

function render() {

    const {loadProvince, loadCity, loadArea} = this.props;
    const {}
    const LOG_TAG = 'Address';
    let defProvinceCode = '0000';
    let defCityCode = '0000';
    let defAreaCode = '0000';
    let mixedAddressObj = {
        curPCode: defProvinceCode,  //默认勾选的省份代码
        curCCode: defCityCode,//默认勾选的市代码
        curACode: defAreaCode,//默认勾选的区代码
        provinceArray: loadProvince(),
        cityArray: [],
        areaArray: []
    }
    // onUpdateProvinceData(mixedAddressObj);//初始化城市数据
    console.log(`TEST##${LOG_TAG}`,
        `mixedAddressObj=${JSON.stringify(mixedAddressObj)},`
    )

}


const mapStateToProps = (state, ownProps) => {
    return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {}
}