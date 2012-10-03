    ;(function ( $, window, undefined ) {
        var pluginName = 'tableFreeSearch',
            document = window.document,
            defaults = {
                input_id: null,
                columns: [],
                min_query: 3
            };

        function Plugin( element, options ) {
            this.element = element;
            this.options = $.extend( {}, defaults, options) ;
            this._defaults = defaults;
            this._name = pluginName;
            this._search = $('#'+this.options.input_id);
            this.init();
        }

        Plugin.prototype.init = function () {
            var ref = this;
            var columns_search = '';
            $.each (  this.options.columns ,function( index, value) {
                columns_search = columns_search + 'td:nth-child('+value+'),'
            });
            columns_search = columns_search.slice(0,-1);

            this._search.bind('keyup', function(){
                var search = $(this).val()+'';
                search = search.toLowerCase();
                if ( search.length >= ref.options.min_query ) {
                    $(columns_search, ref.element ).each(function(){
                       var potential =   $(this).text();
                       if ( potential.toLowerCase().indexOf(search) !== -1  ) {
                           $(this).parent().show();
                       } else {
                           $(this).parent().hide();
                       }
                    });
                } else {
                    $('tr', ref.element).show();
                }
            });
        };
        $.fn[pluginName] = function ( options ) {
            return this.each(function () {
                if (!$.data(this, 'plugin_' + pluginName)) {
                    $.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
                }
            });
        }
    }(jQuery, window));
