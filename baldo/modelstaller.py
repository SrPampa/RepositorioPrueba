#   modelo de las clases principales para las tablas del taller

from odoo import models, fields

class Vehiculo(models.Model):
    _name = 'taller.vehiculo'
    _description= 'Modelo para representar los vehiculos de los clientes'
    matricula=fields.Char('Matrícula', required=True, index=True)
    fecha_vehiculo = fields.Date('Fecha antigüedad')
    modelo = fields.Text(string='Modelo')
    marca = fields.Text(string='Marca')
    kilometros = fields.Integer('Kilómetros')
    imagen = fields.Binary(string='Imagen')
    clientes_ids = fields.One2many('taller.clientes', 'vehiculo_id', string='Clientes')



class Clientes(models.Model):
    _name = 'taller.clientes'
    _description = 'modelo para representar el cliente de cada coche'

    dni = fields.Char('DNI', required=True, index=True)
    email = fields.Char('Email')
    telefono = fields.Char('Número de teléfono')
    direccion = fields.Char('Dirección')
    nombre = fields.Char('Nombre', required=True)
    apellidos = fields.Char('Apellidos', required=True)

    vehiculo_id = fields.Many2one('taller.vehiculo', string='Vehiculo')

