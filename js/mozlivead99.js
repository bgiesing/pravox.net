/* MozLive */

function mozLive(settings) {

    var base = this;

    /**
     * Default settings.
     */
    base.defaults = {
        src: null,          // Source component.
        dest: 'self',       // Destination component (for output).
        action: '',         // Component-specific action to execute.
        task: 'replace',    // Post-task for the outpot (append, replace).
        tasktarget: null,   // Post-task specific target (jQuery selector).
        parameters: {},     // Additional parameters for the action.
        errors: {
            maintenance: 'We can not process your request right now. Please try again later.'
        },
    };

    base.processResult = function (response) {

        // Execute callback

        if (typeof base.options.parameters.callback !== 'undefined') {
            base.options.parameters.callback(response);
        }

        // Is it a refresh task?

        if (base.options.task === 'refresh') {
            window.location.href = '/m/refresh/';
            return;
        }

        // Is it a redirect task?

        if (base.options.task === 'redirect') {
            if (typeof base.options.parameters.href !== 'undefined') {
                window.location.href = base.options.parameters.href;
            }
            return;
        }

        if (base.options.task == 'redirect-response') {
            window.location.href = response;
            return;
        }

        if (base.options.task == 'replace-html') {
            var newDoc = document.open('text/html');
            newDoc.write(response);
            newDoc.close();
            return;
        }

        // It should be replace or append task.

        var updatable = null;
        var updatableJq = null;

        if (base.options.dest !== null && base.options.dest !== 'self') {
            updatable = base.options.dest;
        }
        if (base.options.dest === 'self') {
            updatable = base.options.src;
        }

        if (updatable != null) {
            if (typeof updatable.id !== 'undefined') {
                updatableJq = $('[data-cid="' + updatable.id + '"]');
            }
            else if (typeof updatable.name !== 'undefined') {
                updatableJq = $('[data-name="' + updatable.name + '"]');
            }
        }

        if (updatableJq != null) {
            switch (base.options.task)
            {
                case 'replace':
                    if (base.options.tasktarget == null) {
                        $(updatableJq).replaceWith(response);
                    }
                    else {
                        $(updatableJq).find(base.options.tasktarget).replaceWith(response);
                    }
                    break;
                    
                case 'append':
                    $(updatableJq).append(response);
                    break;
            }
        }

    };

    /**
     * Executes the function.
     */
    base.run = function () {

        var base = this;

        $.ajax({
            url: '/m/mozlive/',
            type: 'post',
            data: {
                action: base.options.action,
                url: window.location.pathname,
                src: base.options.src,
                parameters: base.options.parameters,
            },
            success: function (result) {
                if (result.error == true) {
                    if (result.reason == 'maintenance') {
                        alert(base.options.errors.maintenance);
                    }
                }
                else {
                    base.processResult(result);
                }
            }
        });

    };

    // Runs the MozLive.

    base.options = $.extend({}, this.defaults, settings);
    base.run();

    return false;
}

/* End */