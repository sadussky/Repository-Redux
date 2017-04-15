/*
 * Copyright (c) 1992-2010 by Sadu.Stephen.  ALL RIGHTS RESERVED.
 * Consult your license regarding permissions and restrictions.
 * @date 2017/04/14
 * @since v1.0.0,build,33889
 * github: https://github.com/sadussky
 * web : http:www.sadussky.com
 */

import {connect} from 'react-redux';
import {TestSpinner3} from './TestSpinner3';
import * as Actions from  '../actions/actions';

const mapStateToProps = (state) => {
    return {
        mixAddressObject: state.handleAddressUpdate.address_modules_a_mixobj,
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        onInitMixAddressObject: (provinceCode, cityCode, areaCode) => {
            dispatch(Actions.onInitMixAddressObject(provinceCode, cityCode, areaCode));
        },
        onUpdateProvinceData: (provinceCode) => {
            dispatch(Actions.onUpdateProvinceData(provinceCode));
        },
        onUpdateCityData: (cityCode) => {
            dispatch(Actions.onUpdateCityData(cityCode));
        },
        onSelectProvince: (provinceCode) => {
            dispatch(Actions.onSelectProvince(provinceCode));
        },
        onSelectCity: (cityCode) => {
            dispatch(Actions.onSelectCity(cityCode));
        },
        onSelectArea: (areaCode) => {
            dispatch(Actions.onSelectArea(areaCode));
        },
    }
}


const VisibleTestSpinner3 = connect(
    mapStateToProps,
    mapDispatchToProps
)(TestSpinner3)

export default VisibleTestSpinner3;
