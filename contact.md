---
layout: small
title: Pravox Networks - Contact
permalink: /contact
---
<div id="main">
<div id="editable">
<div class="mz_component mz_wysiwyg mz_editable"> <div class="moze-wysiwyg-editor" markdown="1">
# CONTACT US
<div class="mz_component mz_editable mz_form"><script>
var webformSubmitFx = function (form) {
// Data gathering.
this.gatherData = function ()
{
    var result = {};
    $(form).find('[name^="moze-webform-ctrl-"]').each(function () {
        if ($(this).attr('type') == 'checkbox') {
            result[$(this).attr('name')] = $(this).is(':checked') ? 1 : 0;
        }
        else {
            result[$(this).attr('name')] = $.trim($(this).val());
        }
    });
    return result;
};

// Form validation.

this.validateForm = function ()
{
    var requiredCtrls = form.find('[data-required]');
    var result = true;

    requiredCtrls.removeClass('moze-formerror');

    $.each(requiredCtrls, function () {

        var subresult;
        var validator = $(this).data('required');

        switch (validator) {

            case 'textbox':
                subresult = $(this).val() !== '';
                break;

            case 'multiline':
                subresult = $(this).val() !== '';
                break;

            case 'checkbox':
                subresult = $(this).is(':checked');
                break;

            case 'combobox':
                subresult = $(this).val() !== '';
                break;

            case 'email':
                subresult = $.trim($(this).val()).match(/^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/i) !== null;
                break;
        }

        if (subresult === false) {
            $(this).addClass('moze-formerror');
        }
        result = result && subresult;

    });

    return result;
};

// Submits the form.

if (this.validateForm())
{
    mozLive({
        src: {id: '5726249'},
        dest: null,
        action: 'webform-submit',
        task: 'redirect',
        parameters: {
            data: this.gatherData(),
            href: '/contact/params/submitted/1/'
        },
        errors: {
            maintenance: 'We can not process your request right now. Please try again later.'
        }
    });
}
else
{
    alert($(form).data('failuremsg'));
}

return false;

};
</script>
<form action="javascript:void(0);" class="moze-form" method="post" data-failuremsg = "Please fill-in all required fields." onsubmit="javascript:webformSubmitFx($(this))">
<label>Name</label><span title="Required">*</span><br/><input name="moze-webform-ctrl-569757" type="text" data-required="textbox"/><br/>
<label>E-mail</label><span title="Required">*</span><br/><input name="moze-webform-ctrl-569758" type="text" data-required="email"/><br/>
<label>Message</label><span title="Required">*</span><br/><textarea name="moze-webform-ctrl-569760" data-required="multiline"></textarea><br/>
<input class="mz_notforhumans" name="moze-webform-ctrl-slazds" tabindex="-1" type="text" />
<input class="moze-formbutton" type="submit" value="Submit" />
</form>
</div></div></div>
<br class="clear">
</div></div>
