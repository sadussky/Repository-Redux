/**
 * Created by mac on 2017/3/28.
 */


import {connect} from 'react-redux'
import {setVisibilityFilter} from '../modules/todos/reducers/reducers'
import Link from '../modules/todos/components/Link'

const mapStateToProps = (state, ownProps) => {
    return {
        active: ownProps.filter === state.visibilityFilter
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onClick: () => {
            dispatch(setVisibilityFilter(ownProps.filter))
        }
    }
}

const FilterLink = connect(
    mapStateToProps,
    mapDispatchToProps
)(Link)

export default FilterLink;