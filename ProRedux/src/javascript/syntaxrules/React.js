/*
 * Copyright (c) 1992-2010 by Sadu.Stephen.  ALL RIGHTS RESERVED.
 * Consult your license regarding permissions and restrictions.
 * @date 2017/04/14
 * @since v1.0.0,build,33889
 * github: https://github.com/sadussky
 * web : http:www.sadussky.com
 */


class TestReact {


    /**
     * Transferring with Underscore
     * If you don't use JSX, you can use a library to achieve the same pattern.
     * Underscore supports _.omit to filter out properties
     * and _.extend to copy properties onto a new object.
     */
    FancyCheckbox(props) {
        var checked = props.checked;
        var other = _.omit(props, 'checked');
        var fancyClass = checked ? 'FancyChecked' : 'FancyUnchecked';
        return (
            React.DOM.div(_.extend({}, other, {className: fancyClass}))
        );
    }


    /**
     * Consuming and Transferring the Same Prop
     If your component wants to consume a property
     but also wants to pass it along, you can repass
     it explicitly with checked={checked}. This is
     preferable to passing the full props object since it's easier to refactor and lint.
     */
    FancyCheckbox(props) {
        var {checked, title, ...other} = props;
        var fancyClass = checked ? 'FancyChecked' : 'FancyUnchecked';
        var fancyTitle = checked ? 'X ' + title : 'O ' + title;
        return (
            <label>
                <input {...other}
                    checked={checked}
                    className={fancyClass}
                    type="checkbox"
                />
                {fancyTitle}
            </label>
        );
    }

}