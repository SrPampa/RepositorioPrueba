# -*- coding: utf-8 -*-
{
    'name': "Taller",

    'summary': """
                    Proyecto final para el taller""",

    'description': """
        Supuesto personal para superar SGE DAM2C
    """,

    'author': "Raúl",
    'website': "https://tallerroma20.negocio.site/",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/14.0/odoo/addons/base/data/ir_module_category_data.xml
    # for the full list
    'category': 'Taller mecánico',
    'version': '0.1',

    # any module necessary for this one to work correctly
    'depends': ['base'],

    # always loaded
    'data': [
        'views/views.xml',
        'views/vistas2.xml',
        #'views/templates.xml',
        'demo/demo.xml',
    ],
    # only loaded in demonstration mode
    'demo': [
        'demo/demo.xml',
    ],
    'instalation': True,
    'application': True,
}
