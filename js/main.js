(function () {
    'use strict';

    var csInterface = new CSInterface();
    var lib = new localStorageDB("library", localStorage);
    var tableName = '';

    $(document).ready(function () {
        csInterface.evalScript('documentID()', setDocumetID);

        function setDocumetID(docId) {
            var docName = docId.split('.')[0];
            docName = docName.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');

            tableName = 'presets' + docName;
            if (!lib.tableExists(tableName)) {
                lib.createTable(tableName, ["name", "x", "y", "border", "default"]);
            }
            init();
        }
    });

    function init() {
        PresetManager.loadDefault();


        themeManager.init();
        PresetManager.reloadList();
        var y, x, border

        $('#add_padding').on('click', function () {
            y = $('#padding_y').val();
            x = $('#padding_x').val();
            border = $('#border').val();

            if (!y) {
                y = x;
            } else if (!x) {
                x = y;
            }
            csInterface.evalScript('padding(' + y + ',' + x + ',' + border + ')');
        })

        $('#save').on('click', function () {
            PresetManager.save();
            PresetManager.reloadList();
        })

        $('#delete').on('click', function () {
            if (confirm('Are you sure you want to delete this Preset?')) {
                PresetManager.delete($('#presets').val())
                PresetManager.reloadList();
            }
        })

        $('#set_default').on('click', function () {
            PresetManager.setAsDefault($('#presets').val())
            PresetManager.reloadList();
            PresetManager.loadDefault();

        })

        $('#presets').on('change', function () {
            var val = $('#presets').val();
            if (!val) {
                return;
            }
            PresetManager.load($('#presets').val())
        })
    }


    var PresetManager = {

        /**
         * Reloads the complete list and sorts by default
         */
        reloadList: function () {
            var test = lib.queryAll(tableName, {
                sort: [["default", "DESC"]]
            });
            var presetList = $('#presets');
            presetList.find('option').remove().end();
            $.each(test, function (index, val) {
                presetList.append('<option value="' + test[index].ID + '">' + test[index].name + '</option>');
            });
        },

        /**
         * @wip
         * Sets the current Active preset as Deault
         * @param id
         */
        setAsDefault: function (id) {
            lib.update(tableName, {default: true}, function (row) {
                row.default = false;
                return row;
            });
            lib.commit();

            lib.update(tableName, {ID: id}, function (row) {
                console.log(row);
                row.default = true;
                return row;
            });
            lib.commit();

        },
        /**
         * Todo: find a unique way.. for the document ID
         * Saves the a new Preset on the current Document ID //
         */
        save: function () {
            var name = prompt('Enter a name');
            if (name === null) {
                return false;
            }

            var x = $('#padding_x').val();
            var y = $('#padding_y').val();
            var border = $('#border').val();
            lib.insert(tableName,
                {
                    name: name + ' [' + y + '-' + x + '-' + border + ' ]',
                    y: y,
                    x: x,
                    border: border,
                    default: false
                });
            lib.commit();
        },

        /**
         * Deletes the current selected preset
         * @param id
         */
        delete: function (id) {
            lib.deleteRows(tableName, {ID: id});
            lib.commit();
        },


        loadDefault: function () {
            var preset = lib.queryAll(tableName, {query: {default: true}})[0]
            if (!preset) {
                return;
            }
            $('#padding_x').val(preset.x)
            $('#padding_y').val(preset.y)
            $('#border').val(preset.border)
        },

        /**
         * Loads the Select Preset
         * @param id
         */
        load: function (id) {
            var preset = lib.queryAll(tableName, {query: {ID: id}})[0]
            $('#padding_x').val(preset.x)
            $('#padding_y').val(preset.y)
            $('#border').val(preset.border)
        }
    }
}());
